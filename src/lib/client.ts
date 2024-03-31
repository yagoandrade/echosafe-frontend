"use client";

export async function waitASecondBeforeCallingFunction(callback: () => void) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  callback();
}
