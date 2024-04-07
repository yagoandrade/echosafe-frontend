import { api } from "@/trpc/server";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { getServerAuthSession } from "@/server/auth";

async function Dashboard() {
  const session = await getServerAuthSession();

  return (
    <div className="h-screen w-full flex-1 flex-col space-y-8 overflow-y-scroll bg-gradient-to-b from-[#fafafb] to-white p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            Welcome back, {session?.user.name}!
          </h3>
          <p className="text-muted-foreground">
            Here&apos;s what happened in your institution today.
          </p>
        </div>
        <div className="text-endz">
          <p className="text-xs font-light uppercase text-muted-foreground">
            Managing
          </p>
          <h3 className="font-semibold text-primary">Institute of Computing</h3>
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
      {formattedTasks.length > 0 ? (
        <DataTable data={formattedTasks} columns={columns} />
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}

export default Dashboard;
