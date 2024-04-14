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
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { labels } from "@/data/data";

export function CreateReport() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");

  const { data: session } = useSession();

  const supabase = createClient();

  const createReport: ReturnType<typeof api.post.create.useMutation> =
    api.post.create.useMutation({
      onSuccess: async (post) => {
        await supabase.from("channels").insert({
          id: post.id,
          slug: post.title,
          created_by: session?.user.email,
        });

        toast.success("Report submitted successfully!");
        router.push("/dashboard");
        setTitle("");
        setDescription("");
      },
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (
          title.length === 0 ||
          description.length === 0 ||
          label.length === 0
        ) {
          return toast.error("Please fill in all fields.");
        }

        createReport.mutate({
          title,
          description,
          label,
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
                required
              />
            </div>

            <div className="grid gap-3">
              <Label>Can you describe what happened in more detail?</Label>
              <Textarea
                id="description"
                className="w-full"
                placeholder="Please, describe what happened in detail. Remember that the more details you provide, the better we can help you."
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>How would you classify the incident?</Label>
              <Select
                value={label}
                onValueChange={(value) => setLabel(value)}
                required
              >
                <SelectTrigger
                  id="label"
                  aria-label="Select category of incident"
                >
                  <SelectValue placeholder="Select category of incident" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(labels).map((label) => (
                    <SelectItem value={label.value} key={label.value}>
                      {label.label}
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
