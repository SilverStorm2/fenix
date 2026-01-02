import { NextRequest } from "next/server";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "fallback-secret-key-change-in-production"
);

export interface AuthPayload {
  userId: string;
  email: string;
  role: string;
}

function isAuthPayload(
  payload: JWTPayload
): payload is AuthPayload & JWTPayload {
  return (
    typeof payload.userId === "string" &&
    typeof payload.email === "string" &&
    typeof payload.role === "string"
  );
}

export async function createToken(payload: AuthPayload): Promise<string> {
  const jwtPayload: JWTPayload = {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  };

  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyAuth(
  request: NextRequest
): Promise<AuthPayload | null> {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    if (isAuthPayload(payload)) {
      return payload;
    }
    return null;
  } catch {
    return null;
  }
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (isAuthPayload(payload)) {
      return payload;
    }
    return null;
  } catch {
    return null;
  }
}
