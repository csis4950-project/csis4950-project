import prismaClient from "@/utils/globalPrismaClient";
import { fetchHashPassword, toDate } from "@/utils/utils";

export async function findUserByEmail(email) {
  const user = await prismaClient.user.findUnique({
    where: {
      email: email
    }
  })

  return user;
}

export async function createUser(formData) {
  const hashedPassword = await fetchHashPassword(formData.get("password"));
  const newUser = await prismaClient.user.create({
    data: {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: hashedPassword
    }
  })

  return newUser;
}

export async function createOrganization(userId, organizationName) {
  const organization = await prismaClient.organization.create({
    data: {
      "ownerId": userId,
      "name": organizationName
    }
  })

  return organization;
}

export async function createDepartment(organizationId, departmentName) {
  const department = await prismaClient.department.create({
    data: {
      "organizationId": organizationId,
      "name": departmentName
    }
  })

  return department;
}

export async function createDepartmentMember(departmentId, userId, roleName = "user") {
  const role = await prismaClient.role.findUniqueOrThrow({
    where: {
      name: roleName
    }
  });

  const newDepartmentMember = await prismaClient.departmentMember.create({
    data: {
      departmentId: departmentId,
      memberId: userId,
      roleId: role.id
    }
  })

  return newDepartmentMember;
};

export async function getUserSessionData(email) {
  const userSessionData = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      memberId: {
        select: {
          department: {
            select: {
              id: true,
              name: true,
              organization: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          memberId: true,
          role: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  return userSessionData;
}

export async function getTagsByTagType(tagType) {
  const tags = await prismaClient.tag.findMany({
    where: {
      tagType: {
        name: tagType
      }
    },
    orderBy: {
      name: "asc"
    }
  });

  return tags;
}

export async function getAnnouncementsOfAffiliatedDepartments(currentOrg, departments) {
  const { id: currentOrgId } = currentOrg;
  const announcements = await findAnnouncementsByOrgId(currentOrgId);
  if (isOwner(currentOrgId, departments)) {
    return announcements;
  }

  return filterAnnouncementsByAffiliatedDepartments(announcements, departments);
}

function isOwner(currentOrgId, departments) {
  for (const department of departments) {
    if (department.role === "owner" && department.organizationId === currentOrgId) {
      return true;
    }
  }
  return false;
}

export async function findAnnouncementsByOrgId(orgId) {

  return await prismaClient.announcement.findMany({
    where: {
      deletedAt: null,
      announcedDepartment: {
        organizationId: orgId
      }
    },
    include: {
      announcedDepartment: true,
      announcementType: true
    },
    orderBy: {
      expirationTime: "asc"
    }
  })
}

function filterAnnouncementsByAffiliatedDepartments(announcements, departments) {
  const affiliatedDepartments = new Set();
  departments.forEach((department) => {
    affiliatedDepartments.add(department.departmentId);
  })

  const filteredAnnouncements = [];
  announcements.forEach((announcement) => {
    if (affiliatedDepartments.has(announcement.departmentId)) {
      filteredAnnouncements.push(announcement);
    }
  })

  return filteredAnnouncements;
};

export async function createAnnouncements(data) {
  const announcements = await prismaClient.announcement.createMany({ data: data });
  return announcements;
}

export async function deleteAnnouncementById(id) {
  await prismaClient.announcement.update({
    where: {
      id: id
    },
    data: {
      deletedAt: new Date()
    }
  })
}

export async function getShiftsByUserDepartments(departments) {
  const OrFilter = createOrFilterByDepartmentId(departments);
  const shifts = await prismaClient.shift.findMany({
    where: {
      deletedAt: null,
      OR: OrFilter,
    },
    select: {
      id: true,
      userId: true,
      departmentId: true,
      tagId: true,
      startTime: true,
      endTime: true,
      assignedUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true
        }
      },
      shiftDepartment: {
        select: {
          id: true,
          name: true,
        }
      },
      shiftTag: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  return shifts;
}

function createOrFilterByDepartmentId(departments) {
  const filters = [];
  departments.forEach(({ departmentName, departmentId }) => {
    if (!departmentName.startsWith("__")) {
      const filter = {
        departmentId: departmentId
      }
      filters.push(filter);
    }
  })

  return filters;
}

export async function getShiftsByUserId(userId) {
  const shifts = await prismaClient.shift.findMany({
    where: {
      userId: userId,
      deletedAt: null,
      startTime: {
        gte: new Date()
      },
    },
    select: {
      id: true,
      userId: true,
      departmentId: true,
      tagId: true,
      startTime: true,
      endTime: true,
      shiftDepartment: {
        select: {
          id: true,
          name: true,
        }
      },
      shiftTag: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      startTime: "asc"
    }
  })

  return shifts;
}


export async function getRequestsOfAffiliatedDepartments(currentOrg, departments) {
  const { id: currentOrgId } = currentOrg;
  if (isOwner(currentOrgId, departments)) {
    return await findRequestsByOrgId(currentOrgId);;
  }

  // return await findRequestsByDepartments(departments);
  return [];
}

export async function findRequestsByOrgId(orgId) {
  return await prismaClient.request.findMany({
    where: {
      deletedAt: null,
      requestDepartment: {
        organizationId: orgId
      }
    },
    select: {
      id: true,
      shiftId: true,
      startTime: true,
      endTime: true,
      detail: true,
      createdAt: true,
      requestOwner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        }
      },
      requestDepartment: {
        select: {
          id: true,
          name: true,
        }
      },
      shiftRequest: {
        select: {
          id: true,
          userId: true,
          departmentId: true,
          tagId: true,
          startTime: true,
          endTime: true,
          shiftTag: true,
          shiftDepartment: {
            select: {
              id: true,
              name: true
            }
          }
        }
      },
      requestType: {
        select: {
          id: true,
          name: true,
        }
      },
      status: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  })
}

export async function findRequestsByDepartments(departments) {

}

export async function createRequest(userInput) {
  const formattedRequest = await formatByRequestType(userInput);
  const createdRequest = await prismaClient.request.create({ data: formattedRequest })

  return createdRequest;
}

async function formatByRequestType(userInput) {
  const { typeName: requestType } = userInput;
  if (requestType === "cancel" || requestType === "offer-user") {
    return await createRequestObjectWithNoTime(userInput);
  }

  if (requestType === "change") {
    return await createRequestObject(userInput);
  }

  if (requestType === "vacation") {
    return await createRequestObjectWithNoShift(userInput);
  }

  if (requestType === "offer-admin") {
    if (userInput.shift) {
      return await createRequestObjectWithNoTime(userInput);
    } else {
      return await createRequestObjectWithNoShift(userInput);
    }
  }

  throw new Error("Invalid request type");
}

async function createRequestObject(userInput) {
  const pendingTag = await getTag("status", "pending");

  return {
    ownerId: userInput.userId,
    departmentId: userInput.department,
    typeTagId: userInput.type,
    statusTagId: pendingTag.id,
    shiftId: userInput.shift,
    startTime: toDate(userInput.startDate, userInput.startTime),
    endTime: toDate(userInput.endDate, userInput.endTime),
    detail: userInput.detail
  }
}

async function createRequestObjectWithNoShift(userInput) {
  const pendingTag = await getTag("status", "pending");
  let shift = null;
  if (userInput.typeName === "offer-admin") {
    shift = await createUnassignedShift(userInput);
  }

  return {
    ownerId: userInput.userId,
    departmentId: userInput.department,
    typeTagId: userInput.type,
    statusTagId: pendingTag.id,
    shiftId: shift?.id ?? null,
    startTime: toDate(userInput.startDate, userInput.startTime),
    endTime: toDate(userInput.endDate, userInput.endTime),
    detail: userInput.detail
  }
}

async function createUnassignedShift(userInput) {
  const { userId, department, startDate, startTime, endDate, endTime } = userInput;
  const unassignedTag = await getTag("shift", "unassigned");

  return await prismaClient.shift.create({
    data: {
      userId: userId,
      departmentId: department,
      tagId: unassignedTag.id,
      startTime: toDate(startDate, startTime),
      endTime: toDate(endDate, endTime)
    }
  })
}

async function createRequestObjectWithNoTime(userInput) {
  const pendingTag = await getTag("status", "pending");
  return {
    ownerId: userInput.userId,
    departmentId: userInput.department,
    typeTagId: userInput.type,
    statusTagId: pendingTag.id,
    shiftId: userInput.shift,
    startTime: null,
    endTime: null,
    detail: userInput.detail
  }
}

export async function updateRequestsWithDenyTag(requestId) {
  const deniedTag = await getTag("status", "denied");
  const pendingTag = await getTag("status", "pending");

  return await prismaClient.request.update({
    where: {
      id: requestId,
      statusTagId: pendingTag.id
    },
    data: {
      statusTagId: deniedTag.id
    }
  })
}

export async function updateUserOfferRequestsWithDenyTag(requestId) {
  const deniedTag = await getTag("status", "denied");
  const request = await prismaClient.request.findUnique({ where: { id: requestId } });

  return await prismaClient.request.updateMany({
    where: {
      shiftId: request.shiftId,
      requestType: {
        name: "offer-user"
      },
      status: {
        name: "pending"
      },
      deletedAt: null
    },
    data: {
      statusTagId: deniedTag.id
    }
  })
}

export async function updateRequestWithCancelTag(requestId) {
  const canceledTag = await getTag("status", "canceled");
  const pendingTag = await getTag("status", "pending");
  return await prismaClient.request.update({
    where: {
      id: requestId,
      statusTagId: pendingTag.id
    },
    data: {
      statusTagId: canceledTag.id
    }
  })
}

export async function updateRequestWithApproveTag(requestId) {
  const request = await getRequestById(requestId);
  const { requestType } = request;

  if (requestType.name === "cancel") {
    const canceledShift = await processCancelRequest(request);
  }

  if (requestType.name === "change") {
    const changedShift = await processChangeRequest(request);
  }

  if (requestType.name === "vacation") {
    const result = await processVacationRequest(request);
  }

  if (requestType.name === "offer-user") {
    await processOfferUserRequest(request);
  }

  if (requestType.name === "offer-admin") {
    throw new Error(`Request type:${typeName.name} is not able to process`);
  }

  const approvedTag = await getTag("status", "approved");
  return await prismaClient.request.update({
    where: {
      id: requestId
    },
    data: {
      statusTagId: approvedTag.id
    }
  })
}

export async function getRequestById(requestId) {
  return await prismaClient.request.findUnique({
    where: {
      id: requestId
    },
    select: {
      id: true,
      shiftId: true,
      startTime: true,
      endTime: true,
      detail: true,
      createdAt: true,
      requestOwner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        }
      },
      requestDepartment: {
        select: {
          id: true,
          name: true,
        }
      },
      shiftRequest: {
        select: {
          id: true,
          userId: true,
          departmentId: true,
          tagId: true,
          startTime: true,
          endTime: true,
          shiftTag: true
        }
      },
      requestType: {
        select: {
          id: true,
          name: true,
        }
      },
      status: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });
}

async function processCancelRequest(request) {
  return await prismaClient.shift.update({
    where: {
      id: request.shiftId
    },
    data: {
      deletedAt: new Date()
    }
  })
}

async function processChangeRequest(request) {
  return await prismaClient.shift.update({
    where: {
      id: request.shiftId
    },
    data: {
      startTime: request.startTime,
      endTime: request.endTime
    }
  })
}

async function processVacationRequest(request) {
  return await prismaClient.shift.updateMany({
    where: {
      startTime: {
        gte: request.startTime,
        lte: request.endTime
      }
    },
    data: {
      deletedAt: new Date()
    }
  })
}

async function processOfferUserRequest(request) {
  const otherTag = await getTag("shift", "other");
  const shift = await prismaClient.shift.update({
    where: {
      id: request.shiftId
    },
    data: {
      userId: request.ownerId,
      tagId: otherTag.id
    }
  })

  const approvedTag = await getTag("status", "approved");
  const approvedRequest = await prismaClient.request.update({
    where: {
      id: request.id
    },
    data: {
      statusTagId: approvedTag.id
    }
  });

  const offerAdminRequest = await prismaClient.request.updateMany({
    where: {
      shiftId: request.shiftId,
      requestType: {
        name: "offer-admin"
      },
      status: {
        name: "pending"
      },
      deletedAt: null
    },
    data: {
      statusTagId: approvedTag.id
    }
  })

  const deniedRequests = await updateUserOfferRequestsWithDenyTag(request.id);

  return {
    shift: shift,
    offerAdminRequest: offerAdminRequest,
    deniedRequests: deniedRequests
  }
}

async function getTag(tagType, tagName) {
  const tags = await getTagsByTagType(tagType);
  for (const tag of tags) {
    if (tag.name === tagName) {
      return tag;
    }
  }
}

export async function deleteUnassignedShift(requestId) {
  const request = await getRequestById(requestId);
  if (request.shiftRequest.shiftTag.name === "unassigned") {
    return await prismaClient.shift.update({
      where: {
        id: request.shiftId
      },
      data: {
        deletedAt: new Date()
      }
    })
  }
}