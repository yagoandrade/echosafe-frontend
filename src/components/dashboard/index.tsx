import { api } from "@/trpc/server";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { CreateTask } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";

async function Dashboard() {
  const session = await getServerAuthSession();

  return (
    <div className="hidden h-full w-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome back, {session?.user.name}!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month:
          </p>
        </div>
      </div>
      {session?.user && <CrudShowcase />}
    </div>
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

export default Dashboard;
