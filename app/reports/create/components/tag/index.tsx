import { Badge } from "@/components/ui/badge";
import React from "react";
import type { ITag } from "./types";

const Tag: React.FC<ITag> = ({ tags, onRemoveTag, remove, cn = "" }) => {
  return (
    <div className="flex w-full flex-row flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge
          variant={"primary"}
          key={tag}
          className={"h-min gap-1 rounded-sm" + cn}
        >
          {tag}
          {!remove && (
            <button type="button" onClick={() => onRemoveTag(tag)}>
              X
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
};

export default Tag;
