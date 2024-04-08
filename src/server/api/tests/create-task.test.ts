/**
 * Integration test for the `create` router
 */
import type { inferProcedureInput } from "@trpc/server";
import { createCaller, type AppRouter } from "@/server/api/root";
import { createContextInner } from "@/server/context";
import { faker } from "@faker-js/faker";
import { expect, test } from "vitest";

test("Create and retrieve a post", async () => {
  const ctx = await createContextInner({
    session: {
      user: {
        id: "clucyx0fq0000r43oxr3dn1nq",
        email: "tester_account-yQ$Yk4yM9ahDNR$s@tester-email.com",
        isOnboarded: true,
      },
      expires: "1",
    },
  });

  const caller = createCaller({ ...ctx, headers: new Headers() });

  const input: inferProcedureInput<AppRouter["post"]["create"]> = {
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
  };

  await caller.post.create(input);
  const tasks = await caller.post.getTasks();

  if (tasks.length === 0) {
    throw new Error("No tasks found");
  }

  expect({
    title: tasks[0]?.title,
    status: tasks[0]?.status,
    label: tasks[0]?.label,
    priority: tasks[0]?.priority,
  }).toEqual(input);
});
