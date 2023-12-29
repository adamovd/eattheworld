"use client";
import CountriesTable from "@/app/Components/CountriesTable";
import UsersTable from "@/app/Components/UsersTable";
import Custom403 from "@/app/error/403/page";
import { useSession } from "next-auth/react";
import { Container } from "postcss";

const Dashboard = () => {
  const { data: session } = useSession();
  if (session?.user?.role === "admin") {
    return (
      <section className="flex flex-col mx-5 my-5 gap-5 h-screen">
        <h2>Added countries</h2>
        <div className="overflow-hidden h-1/2">
          <CountriesTable />
        </div>
      </section>
    );
  } else {
    return <Custom403 />;
  }
};

export default Dashboard;
