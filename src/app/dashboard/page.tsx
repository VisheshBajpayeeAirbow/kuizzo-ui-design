import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { Button } from "@/components";
import Link from "next/link";
import { PATHS } from "@/constants";
import Image from "next/image";

const Dashboard = async () => {
  const session = await getServerSession(options);

  return (
    <div className="flex items-center gap-5">
      {session ? `WELCOME: ${session.user?.name}` : "Login"}
      <Image
        src={session?.user?.image as string}
        alt="profile"
        width={50}
        height={50}
      />
      <Link href={PATHS.homePage}>
        <Button btnColor="purple" variant={"default"}>
          Go Back to Home Page
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;
