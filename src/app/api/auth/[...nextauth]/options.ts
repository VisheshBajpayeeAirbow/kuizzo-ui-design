import { BASE_URL } from "./../../../../server/index";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const validateUserCredentials = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}auth/login`, {
      username,
      password,
    });

    let mainId;
    let apiResponse;
    if (response.status === 200) {
      if (response.data.user.role === "institution") {
        const instituteResponse = await axios.get(
          `${BASE_URL}/institution/get-institute-by-id/${response.data.user.detailsId}`,
          { headers: { Authorization: "allow" } }
        );
        mainId = instituteResponse.data.institute.id;
      }

      if (response.data.user.role === "instructor") {
        const instructorResponse = await axios.get(
          `${BASE_URL}/instructor/get-instructor-by-id/${response.data.user.detailsId}`,
          { headers: { Authorization: "allow" } }
        );
        mainId = instructorResponse.data.id;
        apiResponse = instructorResponse.data;
      }

      if (response.data.user.role === "student") {
        const studentResponse = await axios.get(
          `${BASE_URL}/student/get-student-by-id/${response.data.user.detailsId}`,
          { headers: { Authorization: "allow" } }
        );
        mainId = studentResponse.data.id;
        apiResponse = studentResponse.data;
      }
    }

    const activeUser = response.data.user;
    if (!activeUser) return null;

    const user = {
      id: mainId,
      name: activeUser.username,
      role: activeUser.role,
      picture: activeUser?.picture,
    };
    console.log("RESPONSE: ", apiResponse);
    // Set the mainId in a cookie

    return user;
  } catch (error) {
    console.error("Error validating user credentials:", error);
    return null;
  }
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const { username, password } = credentials;
        const user = await validateUserCredentials(username, password);
        if (!user) {
          throw new Error("Invalid username, password, or role");
        }
        return user;
      },
    }),

    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          role: profile.role ?? "institution",
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    AppleProvider({
      clientId: "com.kuizzo.kuizzo",
      clientSecret: "Kuizzo@123",
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.picture = user.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.picture = token.picture;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  events: {
    async signIn(message) {},
    async signOut(message) {},
    async createUser(message) {},
    async updateUser(message) {},
    async linkAccount(message) {},
    async session(message) {},
  },
};
