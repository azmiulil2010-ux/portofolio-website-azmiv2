interface HeaderProps {
  title: string;
  as?: "h1" | "h2";
}

export default function Header({ title, as: Tag = "h1" }: HeaderProps) {
  const sizeClasses = {
    h1: "text-3xl md:text-5xl",
    h2: "text-2xl md:text-4xl",
  };

  return (
    <div className="section-header-root py-10 md:py-14 flex flex-col items-center justify-center text-center">
      <Tag
        className={`section-header-title font-black tracking-tight ${sizeClasses[Tag]}`}
      >
        {title}
      </Tag>
      <div className="mt-3.5 flex items-center gap-1.5">
        <span className="section-header-bar-long h-1 w-8 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
        <span className="section-header-bar-short h-1 w-2 rounded-full bg-amber-400" />
      </div>
    </div>
  );
}