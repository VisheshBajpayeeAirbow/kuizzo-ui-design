import db from "@/mappings/db/db.json";
import { nanoid } from "nanoid";

export const POST = async (request: Request) => {
  const user = await request.json();
  const newUser = {
    id: nanoid(),
    ...user,
  };
  const users = db.users;
  users.push(newUser);
  return new Response(JSON.stringify(newUser), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
};

export const GET = async () => {
  return Response.json(db.users);
};
