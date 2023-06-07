import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UpdateName from "../components/UpdateName";

export default async function Protected() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Link href="/">Home</Link>
      <h1>Protected Route</h1>
      <p>This route is protected.</p>
      <UpdateName />
    </main>
  );
}
