interface PageLeadProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PageLead({ eyebrow, title, description }: PageLeadProps) {
  return (
    <section
      data-aos="fade-down"
      className="mx-auto w-[90%] max-w-5xl pt-28 pb-4 md:pt-36"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
        {eyebrow}
      </p>
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-200 to-gray-300 sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
        {description}
      </p>
      <div className="mt-7 h-px w-24 bg-linear-to-r from-cyan-400 to-indigo-500" />
    </section>
  );
}