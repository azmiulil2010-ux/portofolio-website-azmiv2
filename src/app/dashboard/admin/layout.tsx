import AdminLayout, { metadata } from "../../admin/layout";

export { metadata };

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}