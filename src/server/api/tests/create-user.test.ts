/**
 * Integration test for the `create` router
 */
import type { inferProcedureInput } from "@trpc/server";
import { createCaller, type AppRouter } from "@/server/api/root";
import { createContextInner } from "@/server/context";
import { faker } from "@faker-js/faker";
import { expect, test } from "vitest";
import { db } from "@/server/db";
import { validatePassword } from "util/server";

test("createUser creates a user with the correct name and email and valid password", async () => {
  const ctx = await createContextInner({
    session: null,
  });

  const caller = createCaller({ ...ctx, headers: new Headers() });

  // Generate random credentials, register them, and validate the user in the database
  const inputCredentials: inferProcedureInput<
    AppRouter["post"]["registerUser"]
  > = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await caller.post.registerUser(inputCredentials);

  const registeredUserInDB = await db.user.findUnique({
    where: {
      email: inputCredentials.email,
    },
  });

  if (!registeredUserInDB) throw new Error("User not found");
  if (!registeredUserInDB.password) throw new Error("User password not set");

  expect({
    name: registeredUserInDB.name,
    email: registeredUserInDB.email,
  }).toEqual({
    name: inputCredentials.name,
    email: inputCredentials.email,
  });

  // Validate the provided password against the user's password in the database
  const isPasswordValid = await validatePassword(
    inputCredentials.password,
    registeredUserInDB.password,
  );

  expect(isPasswordValid).toBe(true);
});
