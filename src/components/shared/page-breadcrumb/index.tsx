"use client";

import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageBreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function PageBreadcrumb({ items }: Readonly<PageBreadcrumbProps>) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={`${item.href}-${index}`}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index + 1 < items.length && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
