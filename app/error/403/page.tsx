import PageWrapper from "@/app/Components/PageWrapper";
import { LoginButton } from "../../Components/Auth";
import React from "react";

const Custom403 = () => {
  return (
    <PageWrapper>
      <div className="container">
        <div className="grid place-content-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="my-4 text-center">
              <h1 className="text-2xl">Access Denied</h1>
              <p className="py-4">Please login as Admin</p>
            </div>
            <LoginButton bgcolor="--DarkGreen" textcolor="--Light" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Custom403;
