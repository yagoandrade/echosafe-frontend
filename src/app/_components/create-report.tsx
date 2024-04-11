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
