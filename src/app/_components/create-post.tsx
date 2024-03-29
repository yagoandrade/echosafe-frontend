"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import { labels, priorities, statuses } from "@/data/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CreateTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [label, setLabel] = useState("");
  const [priority, setPriority] = useState("");

  const CreateTask: ReturnType<typeof api.post.create.useMutation> =
    api.post.create.useMutation({
      onSuccess: () => {
        router.refresh();
        setTitle("");
        setStatus("");
        setLabel("");
        setPriority("");
      },
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        CreateTask.mutate({ title, status, label, priority });
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Add a new task</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                className="w-full"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(e) => setStatus(e.target.value)}
              >
                <SelectTrigger id="status" aria-label="Select status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem value={status.value} key={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="label">Label</Label>
              <Select
                value={label}
                onValueChange={(e) => setLabel(e.target.value)}
              >
                <SelectTrigger id="label" aria-label="Select label">
                  <SelectValue placeholder="Select label" />
                </SelectTrigger>
                <SelectContent>
                  {labels.map((label) => (
                    <SelectItem value={label.value} key={label.value}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(e) => setPriority(e.target.value)}
              >
                <SelectTrigger id="priority" aria-label="Select priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem value={priority.value} key={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            variant="secondary"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
            disabled={CreateTask.isPending}
          >
            {CreateTask.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
