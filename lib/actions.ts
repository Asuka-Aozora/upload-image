"use server";
import { z } from "zod";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getImagesById } from "@/lib/data";

const UploadSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "File must be an image",
    }),
  // .refine((file) => file.size < 4 * 1024 * 1024, {
  //   message: "Image size must be less than 4MB",
  // }),
});

const EditSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "File must be an image",
    })
    .optional(),
});

export const uploadImage = async (_: unknown, formData: FormData) => {
  const title = formData.get("title");
  const image = formData.get("image");

  // Validasi dengan zod
  const validatedFields = UploadSchema.safeParse({ title, image });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title: validTitle, image: validImage } = validatedFields.data;

  const { url } = await put(validImage.name, validImage as File, {
    access: "public",
    multipart: true,
  });

  try {
    await prisma.upload.create({
      data: {
        title: validTitle,
        image: url,
      },
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return { error: "Failed to upload image. File size may be too large." };
  }

  revalidatePath("/");
  redirect("/");
};

// update image
export const updateImage = async (
  id: string,
  _: unknown,
  formData: FormData
) => {
  const title = formData.get("title");
  const image = formData.get("image") as File | null;

  // Validasi dengan Zod
  const validatedFields = EditSchema.safeParse({ title, image });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = await prisma.upload.findUnique({
    where: { id },
  });

  if (!data) {
    return { message: "No Data Found" };
  }

  const { title: validTitle } = validatedFields.data;
  let imagePath: string;

  try {
    if (!image || image.size <= 0) {
      imagePath = data.image;
    } else {
      await del(data.image); // Hapus gambar lama
      const { url } = await put(image.name, image, {
        access: "public",
        multipart: true,
      });
      imagePath = url;
    }

    // Update data di Prisma
    await prisma.upload.update({
      where: { id },
      data: {
        title: validTitle,
        image: imagePath,
      },
    });
  } catch (error) {
    console.error("Update failed:", error);
    return { error: "Failed to update image. File size may be too large." };
  }

  revalidatePath("/");
  redirect("/");
};

// delete image
export const deleteImage2 = async (_: unknown, formData: FormData) => {
  const title = formData.get("title");
  const image = formData.get("image");

  // Validasi dengan zod
  const validatedFields = UploadSchema.safeParse({ title, image });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title: validTitle, image: validImage } = validatedFields.data;

  const { url } = await put(validImage.name, validImage as File, {
    access: "public",
    multipart: true,
  });

  try {
    await prisma.upload.create({
      data: {
        title: validTitle,
        image: url,
      },
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return { error: "Failed to upload image. File size may be too large." };
  }

  revalidatePath("/");
  redirect("/");
};

export const deleteImage = async (id: string) => {
  const data = await getImagesById(id);
  if (!data) return { message: "No data found" };
  await del(data.image);
  try {
    await prisma.upload.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting image", error);
    return { message: "Failed to delete image" };
  }
  revalidatePath("/");
};
