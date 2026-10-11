"use client";

import Image from "next/image";
import Link from "next/link";
import PageLead from "@/components/general/PageLead";
import type { Project } from "@/types/project.types";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectDetailClientViewProps {
  project: Project;
}

export default function ProjectDetailClientView({ project }: ProjectDetailClientViewProps) {
  const { t } = useLanguage();

  return (
    <>
      <PageLead
        eyebrow={t("projectDetailEyebrow")}
        title={project.title}
        description={t("projectDetailDesc")}
      />
      <section className="relative z-10 mx-auto mt-8 flex w-[90%] max-w-5xl flex-col gap-6 pb-24 lg:mt-12 lg:gap-8">
        <div className="relative flex w-full items-start justify-center">
          <Image
            src={project.imagePath}
            alt={`Pratinjau project ${project.title}`}
            width={1000}
            height={750}
            sizes="(min-width: 1024px) 60vw, 90vw"
            className="block h-auto w-full rounded-2xl shadow-2xl shadow-slate-950/40"
            preload
          />
        </div>
        <div className="project-detail-surface rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm">
          <p className="text-lg leading-8 text-gray-300">{project.description}</p>
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.websiteUrl && project.websiteUrl !== "#" && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="project-live-link rounded-xl bg-linear-to-r from-blue-900 to-purple-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:from-blue-800 hover:to-purple-700"
              >
                {t("visitLiveProject")}
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                {t("githubRepo")}
              </a>
            )}
            <Link
              href="/#projects"
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-cyan-400 hover:text-cyan-300"
            >
              {t("backToProjects")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
