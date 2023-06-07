import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (session.user) {
        const [fetchedUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, session.user?.email as string));
        return { ...session, user: fetchedUser };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //      const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        //      return user;
        if (
          (credentials?.email.length as number) > 2 &&
          (credentials?.password.length as number) > 2
        ) {
          const [user] = await db
            .insert(users)
            .values({
              email: credentials?.email as string,
              password: credentials?.password as string,
            })
            .onConflictDoNothing({ target: users.id })
            .returning();
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
