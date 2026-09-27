const DOORPASS_SECRET = process.env.ADMIN_DOORPASS || "";
export const DOORPASS_COOKIE_NAME = "admin_doorpass_session";
export const DOORPASS_PENDING_COOKIE_NAME = "admin_doorpass_entry";
export const DOORPASS_PENDING_USER_ID = "pending-admin-login";

export const DOORPASS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24, // 24 jam
};

export const DOORPASS_PENDING_COOKIE_OPTIONS = {
  ...DOORPASS_COOKIE_OPTIONS,
  maxAge: 60 * 5,
};

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  let hexString = "";
  for (let i = 0; i < byteArray.length; i++) {
    hexString += byteArray[i].toString(16).padStart(2, "0");
  }
  return hexString;
}

export async function createDoorpassToken(
  userId: string,
  expiresInSeconds = 60 * 60 * 24
): Promise<string> {
  if (!DOORPASS_SECRET) {
    throw new Error("ADMIN_DOORPASS environment variable is not configured.");
  }

  const expiresAt = Date.now() + 1000 * expiresInSeconds;
  const payload = `${userId}.${expiresAt}`;
  const key = await getHmacKey(DOORPASS_SECRET);
  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const signature = bufferToHex(signatureBuffer);

  return `${payload}.${signature}`;
}

export async function verifyDoorpassToken(
  token: string | undefined | null,
  userId: string
): Promise<boolean> {
  if (!token || !userId || !DOORPASS_SECRET) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [tokenUserId, expiresAtStr, signature] = parts;

  if (tokenUserId !== userId) {
    return false;
  }

  const expiresAt = Number(expiresAtStr);
  if (isNaN(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  const payload = `${tokenUserId}.${expiresAtStr}`;
  const key = await getHmacKey(DOORPASS_SECRET);
  const enc = new TextEncoder();
  const expectedSigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const expectedSig = bufferToHex(expectedSigBuffer);

  // Constant-time length and character check
  if (signature.length !== expectedSig.length) {
    return false;
  }

  let diff = 0;
  for (let i = 0; i < signature.length; i++) {
    diff |= signature.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }

  return diff === 0;
}
