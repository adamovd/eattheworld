"use client";
import { useSession } from "next-auth/react";
import { Avatar } from "../Styles/Components/Avatar";
import Image from "next/image";
const UserAvatar = ({ width, height }: { width: number; height: number }) => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <Avatar width={width} height={height}>
      <Image
        src={user?.image as string}
        alt={`Profile picture of ${user?.firstname} ${user?.lastname}`}
        width={width}
        height={height}
      />
    </Avatar>
  );
};

export default UserAvatar;
