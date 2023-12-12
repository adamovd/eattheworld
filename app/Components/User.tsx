"use client";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  console.log(session);

  return <h4>Hej {session?.user?.firstname}, välkommen hit!</h4>;
};

export default User;
