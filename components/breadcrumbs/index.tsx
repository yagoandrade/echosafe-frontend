"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import { ROUTES, generateBreadcrumbLinks } from "@/lib/utils";
import { Fragment } from "react";

export function Breadcrumbs() {
  const pathnames: string[] = generateBreadcrumbLinks(usePathname());
  const params = useSearchParams();

  const reportId = pathnames.includes("/report")
    ? params.toString().substring(1)
    : null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm font-medium"
    >
      <Link
        className="text-gray-500 transition-colors hover:underline"
        href="/dashboard"
      >
        Início
      </Link>
      {pathnames.map((pathname) => (
        <Fragment key={pathname}>
          <ChevronRightIcon className="size-4 text-gray-400" />

          <Link
            className="text-gray-500 transition-colors hover:underline"
            href={pathname + (reportId !== null ? "?=" + reportId : "")}
          >
            {ROUTES.get(pathname)}
            {reportId !== null && (
              <span className="text-gray-500 transition-colors hover:underline">
                {" "}
                #{reportId}
              </span>
            )}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
