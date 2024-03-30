import { api } from "@/trpc/server";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { CreateTask } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import RecentReports from "../recent_reports";

async function Dashboard() {
  const session = await getServerAuthSession();

  return (
    <div className="h-full w-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            Welcome back, {session?.user.name}!
          </h3>
          <p className="text-muted-foreground">
            Here&apos;s a what happened in your institution today.
          </p>
        </div>
      </div>
      {session?.user && <CrudShowcase />}
      <RecentReports />
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
