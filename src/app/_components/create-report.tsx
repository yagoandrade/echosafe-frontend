"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CreateReport() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createReport: ReturnType<typeof api.post.create.useMutation> =
    api.post.create.useMutation({
      onSuccess: () => {
        router.refresh();
        setTitle("");
        setDescription("");
      },
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createReport.mutate({
          title,
          description,
        });
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Report a case of bullying</CardTitle>
          <CardDescription>
            Your report will be made 100% anonymously and teachers,
            coordination, management and other classmates will not know that it
            was you who made this report through the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-1">
            <div className="grid gap-3">
              <Label>What kind of event took place?</Label>
              <Input
                id="title"
                type="text"
                className="w-full"
                placeholder="A case of racism, homophobia, etc."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Can you describe what happened in more detail?</Label>
              <Textarea
                id="description"
                className="w-full"
                placeholder="Please, describe what happened in detail. Remember that the more details you provide, the better we can help you."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* <div className="grid gap-3">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
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
              <Label>Label</Label>
              <Select value={label} onValueChange={(value) => setLabel(value)}>
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
              <Label>Priority</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value)}
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
            </div> */}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            variant="provider"
            disabled={createReport.isPending}
          >
            {createReport.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
