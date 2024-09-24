import db from "@/mappings/db/db.json";
export const GET = async (
  _request: Request,
  {
    params,
  }: {
    params: { userDetails: string };
  }
) => {
  const { userDetails } = params;
  const userDetailsArr = userDetails.split("_");
  const username = userDetailsArr[0];
  const password = userDetailsArr[1];
  const role = userDetailsArr[2];

  const activeUser = db.users.find((user) => {
    if (user.username === username) {
      return user;
    }
  });
  console.log("ACTIVE USER: ", activeUser);
  return new Response(JSON.stringify({ activeUser }));
};
