"use client";

import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { X } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";
import { priorities, statuses } from "@/data/data";
import { type TableName } from "types/data-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tableName: TableName;
}

const getTableTitle = (tableName: TableName) => {
  switch (tableName) {
    case "institution":
      return "Filter institutions...";
    case "report":
      return "Filter reports...";
  }
};

const getTableColumn = (tableName: TableName) => {
  switch (tableName) {
    case "institution":
      return "name";
    case "report":
      return "title";
  }
};

export function DataTableToolbar<TData>({
  table,
  tableName,
}: Readonly<DataTableToolbarProps<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={getTableTitle(tableName)}
          value={
            (table
              .getColumn(getTableColumn(tableName))
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(getTableColumn(tableName))
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {tableName === "report" && table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={Object.values(statuses)}
          />
        )}
        {tableName === "report" && table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={Object.values(priorities)}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 gap-x-1 px-2 lg:px-3"
          >
            <X size="1rem" />
            Reset
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
