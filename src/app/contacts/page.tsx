import React from "react";
import ContactTable from "../../../components/contactTable";
import Search from "../../../components/search";
import { CreateButton } from "../../../components/buttons";
import { getContactPages } from "../../../lib/data";
import Pagination from "../../../components/pagination";

const Contacts = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPage = await getContactPages(query);

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>

      <ContactTable query={query} currentPage={currentPage} />

      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPage} />
      </div>
    </div>
  );
};
export default Contacts;
