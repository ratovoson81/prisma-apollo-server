import jwt from "jsonwebtoken";
const APP_SECRET = "supersecret";

export function getTokenPayload(token: String) {
  return jwt.verify(token, APP_SECRET);
}

export function getUserId(req: any, authToken?: String) {
  if (req) {
    const authHeader = req.req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token found");
      }
      const userId = getTokenPayload(token);

      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not authenticated");
}
