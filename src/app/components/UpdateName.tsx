import { updateName } from "@/actions/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function UpdateName() {
  const session = await getServerSession(authOptions);
  return (
    <form className="border-t border-slate-300 my-4 pt-4" action={updateName}>
      <div>
        <h3>Update Name</h3>
      </div>
      <label
        htmlFor="name"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={session?.user?.name ?? ""}
        />
      </div>
      <div className="mt-2">
        <button
          type="submit"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Save
        </button>
      </div>
    </form>
  );
}
