import { api } from "@/trpc/server";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { CreateTask } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";

import Header from "@/components/header";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-white">
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
            </div>
            {session && <CrudShowcase />}
          </div>
        </div>
      </main>
    </>
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
