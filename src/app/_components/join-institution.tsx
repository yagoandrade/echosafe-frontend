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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { roles } from "../(admin)/onboarding/components/util";
import { redirect } from "next/navigation";

export function JoinInstitution() {
  const [code, setCode] = useState("");
  const [role, setRole] = useState("");

  const JoinInstitution: ReturnType<
    typeof api.post.joinInstitution.useMutation
  > = api.post.joinInstitution.useMutation({
    onSuccess: () => {
      setCode("");
      setRole("");
      toast.success("You have successfully joined the institution!");
      redirect("/institutions");
    },
    onError: (error) => {
      if (error.message.includes("Unique constraint failed")) {
        toast.error("You are already a member of this institution.");
        return;
      }

      toast.error(
        "An error occurred while joining the institution. Please try again later.",
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        JoinInstitution.mutate({ institutionCode: code, role });
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Join a institution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-1">
            <div className="grid gap-3">
              <Label>Code</Label>
              <Input
                id="code"
                type="text"
                className="w-full"
                placeholder="Please insert the code of the institution..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>
                Please indicate which role best represents your position within
                your institution.
              </Label>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger id="status" aria-label="Select role...">
                  <SelectValue placeholder="Select role..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(roles).map((role) => (
                    <SelectItem value={role.value} key={role.value}>
                      {role.label}
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
            variant="primary"
            disabled={JoinInstitution.isPending}
          >
            {JoinInstitution.isPending ? "Joining..." : "Join Institution"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
