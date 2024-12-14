"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchComponent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : ""
    );
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex flex-1">
      <input
        type="text"
        className="w-full border border-gray-200 py-2 pl-8 text-sm outline-2 rounded-sm"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <IoSearch className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
    </div>
  );
}
