import { LoginButton } from "@/app/Components/Auth";
import Link from "next/link";

const Custom403 = () => {
  return (
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="my-4 text-center">
            <h1 className="text-2xl">Access Denied</h1>
            <p className="py-4">Please login as Admin</p>
          </div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Custom403;
