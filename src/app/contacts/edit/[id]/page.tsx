import { notFound } from "next/navigation";
import EditForm from "../../../../../components/editForm";
import { getContactsById } from "../../../../../lib/data";

const UpdatecontactPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const contact = await getContactsById(id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <EditForm contact={contact} />
    </div>
  );
};

export default UpdatecontactPage;
