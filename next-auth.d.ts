import { DefaultUser, DefaultSession } from "next-auth/jwt";
import { JWT, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
    picture?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
