import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_SESSION = "Session";
const COOKIE_SESSION_ERROR = "SessionError";

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

export async function getSession() {
  const session = cookies().get(COOKIE_SESSION)?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function setSession(payload) {
  const expires = new Date(Date.now() + (24 * 60 * 60 * 1000));
  const session = await createSession(payload, expires);
  cookies().set(COOKIE_SESSION, session, { expires, httpOnly: true });
}

export async function createSession(user, expires) {
  const payload = await createPayload(user);
  const session = await encrypt({ payload, expires });

  return session;
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

export async function updateSession(session) {
  session.expires = new Date(Date.now() + (24 * 60 * 60 * 1000));
  const response = NextResponse.next();
  response.cookies.set({
    name: COOKIE_SESSION,
    value: await encrypt(session),
    httpOnly: true,
    expires: session.expires,
  });

  return response;
}

export async function deleteSession() {
  cookies().set(COOKIE_SESSION, "", { expires: new Date(0) });
}

export async function getErrorSession() {
  const session = cookies().get(COOKIE_SESSION_ERROR)?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function setErrorSession(error) {
  const expires = new Date(Date.now() + (30 * 1000));
  const errorSession = await createErrorSession(error, expires);
  cookies().set(COOKIE_SESSION_ERROR, errorSession, { expires, httpOnly: true });
}

export async function createErrorSession(error, expires) {
  const payload = await createErrorPayload(error);
  const errorSession = await encrypt({ payload, expires });
  return errorSession;
}

export async function createErrorPayload(error) {
  const payload = error.cause ? error.cause : {}
  payload.message = error.message;

  return payload;
}

