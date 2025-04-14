import EditForm from "@/components/edit-form";
import { getImagesById } from "@/lib/data";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

const EditPage = async ({ params }: PageProps) => {
  const data = await getImagesById(params.id);
  if (!data) return notFound();
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-sm shadow">
        <h1 className="text-2xl font-bold mb-5">Update Image</h1>
        <EditForm data={data} />
      </div>
    </div>
  );
};

export default EditPage;
