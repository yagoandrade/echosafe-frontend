import Link from "next/link";

import { CreateTask } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { UserNav } from "../components/user-nav";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2a2b3a] to-[#191a23] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="hidden h-full w-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {session ? (
                <UserNav user={session?.user} />
              ) : (
                <>
                  <Link
                    href={session ? "/api/auth/signout" : "/api/auth/register"}
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                  >
                    {session ? "Sign out" : "Sign up"}
                  </Link>
                  <Link
                    href={session ? "/api/auth/signout" : "/api/auth/signin"}
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                  >
                    {session ? "Sign out" : "Sign in"}
                  </Link>
                </>
              )}
            </div>
          </div>
          {session && <CrudShowcase />}
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const tasks = await api.post.getTasks();

  const formattedTasks = tasks.map((task) => ({
    ...task,
    id: task.id.toString(), // Convert the 'id' property to a string
  }));

  return (
    <div className="w-full space-y-4">
      <CreateTask />
      {formattedTasks.length > 0 ? (
        <DataTable data={formattedTasks} columns={columns} />
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
