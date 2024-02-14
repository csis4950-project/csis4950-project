import prismaClient from "@/utils/globalPrismaClient";
import { hashPassword } from "@/utils/utils";

export async function findUserByEmail(email) {
  const user = await prismaClient.user.findUnique({
    where: {
      email: email
    }
  })

  return user;
}

export async function createUser(formData) {
  const hashedPassword = await hashPassword(formData.get("password"));

  const newUser = await prismaClient.user.create({
    data: {
      firstName: formData.get("fName"),
      lastName: formData.get("lName"),
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

