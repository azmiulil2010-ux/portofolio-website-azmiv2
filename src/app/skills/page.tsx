import SkillSection from "@/components/skills/SkillSection";
import PageLead from "@/components/general/PageLead";
import SpaceDecorations from "@/components/general/SpaceDecorations";

export default function Skills() {
  return (
    <main className="relative overflow-hidden pt-18">
      <SpaceDecorations />
      <PageLead
        eyebrow="Toolkit"
        title="The tools I use to turn ideas into interfaces."
        description="A growing toolkit for building responsive products, connecting data, and shaping experiences that feel simple to use."
      />
      <SkillSection />
      <div className="mx-auto mb-16 grid w-[90%] max-w-4xl gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">01</p>
          <h2 className="mt-3 font-semibold text-gray-200">Interface first</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">Responsive layouts with attention to hierarchy and small details.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5" data-aos="fade-up" data-aos-delay="100">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">02</p>
          <h2 className="mt-3 font-semibold text-gray-200">Connected systems</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">Frontend, APIs, databases, and authentication working as one.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5" data-aos="fade-up" data-aos-delay="200">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">03</p>
          <h2 className="mt-3 font-semibold text-gray-200">Always learning</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">Exploring better patterns, cleaner code, and more useful products.</p>
        </div>
      </div>
    </main>
  );
}