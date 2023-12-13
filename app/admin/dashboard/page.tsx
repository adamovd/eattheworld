import CountriesTable from "@/app/Components/CountriesTable";
import UsersTable from "@/app/Components/UsersTable";

const Dashboard = () => {
  return (
    <>
      <section className="flex flex-col gap-10 min-h-fit">
        <CountriesTable />
      </section>
      <section className="flex flex-col gap-10 min-h-full">
        <UsersTable />
      </section>
    </>
  );
};

export default Dashboard;
