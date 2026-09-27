import { notFound } from "next/navigation";
import { getProjectById } from "@/services/projectService";
import DeleteProjectForm from "@/components/admin/DeleteProjectForm";

export const dynamic = "force-dynamic";

interface DeletePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminDeleteProjectPage({
  params,
}: DeletePageProps) {
  const { id } = await params;
  const project = await getProjectById(id, { includeUnpublished: true });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <DeleteProjectForm project={project} />
    </div>
  );
}
