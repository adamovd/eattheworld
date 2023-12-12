"use client";
import { useSession } from "next-auth/react";
import React from "react";

const User = () => {
  const { data: session } = useSession();
  console.log(session);

  return <h4>Hello {session?.user?.firstname} welcome to Eat the World!</h4>;
};

export default User;
