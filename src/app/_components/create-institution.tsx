"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function CreateInstitution() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const CreateInstitution: ReturnType<
    typeof api.post.createInstitution.useMutation
  > = api.post.createInstitution.useMutation({
    onSuccess: () => {
      setName("");
      setLocation("");
      toast.success("Institution created successfully!");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        CreateInstitution.mutate({ name, location });
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Create a new institution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-1">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                placeholder="Please insert the name of the institution..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Location</Label>
              <Textarea
                id="location"
                className="w-full"
                placeholder="Please insert the location of the institution..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            variant="provider"
            disabled={CreateInstitution.isPending}
          >
            {CreateInstitution.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
