"use client";
import { updateImage } from "@/lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/button";

const CreateForm = () => {
  // const [imageUrl, setImageUrl] = useState("");
  const [state, formActions] = useActionState(updateImage, null);

  // const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   const res = await fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   if (!res.ok) {
  //     alert("Upload failed");
  //     return;
  //   }

  //   const { url } = await res.json();
  //   setImageUrl(url); // You can now save this URL to DB
  // };

  return (
    <form action={formActions}>
      <div className="mb-4 pt-2">
        <input
          type="text"
          name="title"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Title..."
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
        </div>
      </div>
      <div className="mb-4 pt-2">
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.image}</p>
        </div>
      </div>
      <div className="mb-4 pt-4">
        <SubmitButton label="upload" />
      </div>
      {/* {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="w-64 mt-2" />
        </div>
      )} */}
    </form>
  );
};

export default CreateForm;
