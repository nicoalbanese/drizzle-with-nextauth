import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Drizzle</h1>
      {session?.user ? (
        <div>
          <div>
            <Link href="/api/auth/signout">Sign out</Link>
          </div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <Link href="/api/auth/signin">Sign in</Link>
        </div>
      )}
    </main>
  );
}
