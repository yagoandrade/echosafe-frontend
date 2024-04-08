"use client";

import { type Table, type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type Statuses, priorities, statuses, Priorities } from "@/data/data";
import { DotSquare } from "lucide-react";
import { type Task } from "@/data/schema";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { type DataTableMetadata } from "types/data-table";

interface DataTableRowActionsProps<TData> {
  table: Table<TData>;
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  table,
  row,
}: Readonly<DataTableRowActionsProps<TData>>) {
  const task = row.original as Task;

  const updateReport = api.post.updateTask.useMutation();

  const handleUpdatePriority = async (newPriority: Priorities) => {
    try {
      updateReport.mutate({
        id: Number(task.id),
        priority: newPriority,
      });

      if (newPriority) {
        const tableMeta = table.options.meta as DataTableMetadata;
        tableMeta.updateData(row.index, "priority", newPriority);
      }

      toast.success(
        `Report priority updated to "${priorities[newPriority].label}"`,
      );
    } catch (error) {
      console.error("Error updating task priority:", error);
      toast.error("Failed to update task priority");
    }
  };

  const handleUpdateStatus = async (newStatus: Statuses) => {
    try {
      updateReport.mutate({
        id: Number(task.id),
        status: newStatus,
      });

      if (newStatus) {
        const tableMeta = table.options.meta as DataTableMetadata;
        tableMeta.updateData(row.index, "status", newStatus);
      }

      toast.success(`Report status updated to "${statuses[newStatus].label}"`);
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotSquare className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.status}>
              {Object.values(statuses).map((status) => (
                <DropdownMenuRadioItem
                  key={status.value}
                  value={status.value}
                  onClick={() => handleUpdateStatus(status.value)}
                >
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.priority}>
              {Object.values(priorities).map((priority) => (
                <DropdownMenuRadioItem
                  key={priority.value}
                  value={priority.value}
                  onClick={() => handleUpdatePriority(priority.value)}
                >
                  {priority.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
