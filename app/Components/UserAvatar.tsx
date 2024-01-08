"use client";
import { useSession } from "next-auth/react";
import { Avatar } from "../Styles/Components/Avatar";
const UserAvatar = ({ width, height }: { width: number; height: number }) => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <Avatar
      src={user?.image as string}
      alt={`Profile picture of ${user?.firstname} ${user?.lastname}`}
      width={width}
      height={height}
    />
  );
};

export default UserAvatar;
