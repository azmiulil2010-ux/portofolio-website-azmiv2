"use client";

import PageLead from "@/components/general/PageLead";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsPageLeadClient() {
  const { t } = useLanguage();

  return (
    <PageLead
      eyebrow={t("projectsLeadEyebrow")}
      title={t("projectsLeadTitle")}
      description={t("projectsLeadDesc")}
    />
  );
}
