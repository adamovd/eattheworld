import CountriesTable from "@/app/Components/CountriesTable";
import UsersTable from "@/app/Components/UsersTable";

const Dashboard = () => {
  return (
    <section className="flex flex-col mx-5 my-5 gap-5 h-screen">
      <h2>Added countries</h2>
      <div className="overflow-hidden h-1/2">
        <CountriesTable />
      </div>
      {/* <h2>Added users</h2>
      <div className="overflow-hidden h-1/2">
        <UsersTable />
      </div> */}
    </section>
  );
};

export default Dashboard;
