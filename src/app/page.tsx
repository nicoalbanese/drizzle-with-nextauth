import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const revalidate = 0;
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Drizzle</h1>
      {session?.user ? (
        <div>
          <ul>
            <li>
              <Link href="/api/auth/signout">Sign out</Link>
            </li>
            <li>
              <Link href="/protected">Update Name</Link>
            </li>
          </ul>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <ul>
            <li>
              <Link href="/api/auth/signin">Sign in</Link>
            </li>
            <li>
              <Link href="protected">Protected Page</Link>
            </li>
          </ul>
        </div>
      )}
    </main>
  );
}
