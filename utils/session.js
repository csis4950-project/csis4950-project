import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload) {

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(secretKey);
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, secretKey, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function createPayload(user) {
  const payload = {
    "userId": user.id,
    "firstName": user.firstName,
    "lastName": user.lastName,
    "email": user.email
  }
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(session) {
  session.expires = new Date(Date.now() + (24 * 60 * 60 * 1000));
  const response = NextResponse.next();
  response.cookies.set({
    name: "session",
    value: await encrypt(session),
    httpOnly: true,
    expires: session.expires,
  });

  return response;
}

export async function createSession(user, expires) {
  const payload = await createPayload(user);
  const session = await encrypt({ payload, expires });

  return session;
}