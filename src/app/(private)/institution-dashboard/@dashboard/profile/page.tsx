import ProfilePage from "@/_pages/Dashboard/Institution/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
};

const Profile = () => {
  return (
    <>
      <ProfilePage />
    </>
  );
};

export default Profile;
