import prismaClient from "@/utils/globalPrismaClient";
import { fetchHashPassword } from "@/utils/utils";

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
  departments.forEach((department) => {
    if (!department.departmentName.startsWith("__")) {
      const filter = {
        departmentId: department.departmentId
      }
      filters.push(filter);
    }
  })

  return filters;
}