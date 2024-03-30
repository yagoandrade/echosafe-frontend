import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

const Search = () => {
  return (
    <form className="w-full flex-1 sm:flex-initial">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search reports..."
          className="w-full pl-8"
        />
      </div>
    </form>
  );
};

export default Search;
