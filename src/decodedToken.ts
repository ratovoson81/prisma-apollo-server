import jwt from "jsonwebtoken";
import { context } from "./context";
const APP_SECRET = "supersecret";

export function getTokenPayload(token: string) {
  return jwt.verify(token, APP_SECRET);
}

export function getUserId(req: any, authToken?: string) {
  if (req) {
    const authHeader = req.req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token found");
      }
      const userId = getTokenPayload(token);

      return userId as any;
    }
  } else if (authToken) {
    const userId = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not authenticated");
}

export function destroyToken(req: any) {
  if (req) {
    const authHeader = req.req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token found");
      }
      //destroy token
      console.log("ss", jwt.decode(token));
    }
  }
  throw new Error("Not authenticated");
}

export async function setConnected(token: string) {
  let user = {};
  if (token !== "nothing") {
    const decryptedToken = getTokenPayload(token) as any;
    user = await context.prisma.user.update({
      where: {
        id: decryptedToken.userId,
      },
      data: {
        isOnline: true,
      },
    });
  } else {
    console.log("connected! non authentified");
  }
  return user;
}

export async function setDisconnect(token: string) {
  let user = {};
  if (token !== "nothing") {
    const decryptedToken = getTokenPayload(token) as any;
    user = await context.prisma.user.update({
      where: {
        id: decryptedToken.userId,
      },
      data: {
        isOnline: false,
        connectedAt: new Date(),
      },
    });
  } else {
    console.log("connected! non authentified");
  }
  console.log("offline ok");
  return user;
}
