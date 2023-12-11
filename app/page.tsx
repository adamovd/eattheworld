import User from "./Components/User";
import { LoginButton, LogoutButton } from "./Components/Auth";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Homepage</h1>

      <LoginButton />
      <LogoutButton />
      <h2>Server side</h2>

      <h2>Client side</h2>
      <User />
    </main>
  );
}
