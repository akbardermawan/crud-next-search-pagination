"use server";
import { z } from "zod";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ContainSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(11),
});

export const saveContact = async (prevSate: any, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const validateFields = ContainSchema.safeParse(data);
  if (!validateFields.success) {
    return {
      Error: validateFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.contact.create({
      data: {
        name: validateFields.data.name,
        phone: validateFields.data.phone,
      },
    });
  } catch (error) {
    return {
      message: "Failed to contact",
    };
  }
  revalidatePath("/contacts");
  redirect("/contacts");
};

export const updateContact = async (
  id: string,
  prevSate: any,
  formData: FormData
) => {
  const data = Object.fromEntries(formData.entries());
  const validateFields = ContainSchema.safeParse(data);
  if (!validateFields.success) {
    return {
      Error: validateFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.contact.update({
      data: {
        name: validateFields.data.name,
        phone: validateFields.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    return {
      message: "Failed to update contact",
    };
  }
  revalidatePath("/contacts");
  redirect("/contacts");
};

// delet
export const deleteContact = async (id: string) => {
  try {
    await prisma.contact.delete({
      where: { id },
    });
    revalidatePath("/contacts");
  } catch (error) {
    return {
      message: "Failed to delete contact",
    };
  }
};
