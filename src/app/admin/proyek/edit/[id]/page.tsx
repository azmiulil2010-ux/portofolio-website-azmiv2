import { notFound } from "next/navigation";
import { getProjectById } from "@/services/projectService";
import EditProjectForm from "@/components/admin/EditProjectForm";

export const dynamic = "force-dynamic";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProjectPage({ params }: EditPageProps) {
  const { id } = await params;
  const project = await getProjectById(id, { includeUnpublished: true });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      <EditProjectForm project={project} />
    </div>
  );
}
