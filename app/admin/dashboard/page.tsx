"use client";
import CountriesTable from "@/app/Components/CountriesTable";
import PageWrapper from "@/app/Components/PageWrapper";
import UsersTable from "@/app/Components/UsersTable";
import Custom403 from "@/app/error/403/page";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  if (session?.user?.role === "admin") {
    return (
      <PageWrapper>
        <section
          style={{ marginTop: "7rem" }}
          className="flex flex-col mx-5 my-5 gap-5 h-screen"
        >
          <h2>Added countries</h2>
          <div className="overflow-hidden h-1/2">
            <CountriesTable />
          </div>
          <h2>Users</h2>
          <div className="overflow-hidden h-1/2">
            <UsersTable />
          </div>
        </section>
      </PageWrapper>
    );
  } else {
    return <Custom403 />;
  }
};

export default Dashboard;
