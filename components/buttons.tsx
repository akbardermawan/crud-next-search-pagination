"use client";
import React from "react";
import { IoAddSharp, IoPencil, IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteContact } from "../lib/actions";

export const CreateButton = () => {
  return (
    <div>
      <Link
        href="/contacts/create"
        className="flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 px-5 py-[9px] rounded-sm text-sm "
      >
        <IoAddSharp size={20} className="" />
        Create
      </Link>
    </div>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <div>
      <Link
        href={`/contacts/edit/${id}`}
        className="flex rounded-sm text-sm text-blue-500 hover:text-white hover:bg-blue-500 pl-1 pr-1 items-center"
      >
        Edit
        <IoPencil size={15} className="ml-1" />
      </Link>
    </div>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const deleteContactWithId = deleteContact.bind(null, id);
  return (
    <div>
      <button
        className="flex rounded-sm text-sm text-red-500 hover:text-white hover:bg-red-500 px-1 items-center"
        onClick={deleteContactWithId}
      >
        Delete
        <IoTrashOutline size={15} className="ml-1" />
      </button>
    </div>
  );
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  const className = clsx(
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full",
    {
      "opacity-50 cursor-progress": pending,
    }
  );
  return (
    <button type="submit" className={className} disabled={pending}>
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};
