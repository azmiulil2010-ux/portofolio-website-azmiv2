import Image from "next/image";
interface ProjectSectionProps {
  imagePath: string;
  title: string;
  description: string;
  websiteUrl: string;
}

export default function ProjectCard({
  imagePath,
  title,
  description,
  websiteUrl,
}: ProjectSectionProps) {
  return (
    <a href={websiteUrl} target="_blank" rel="noreferrer" className="block">
      <Image
        src={imagePath}
        alt={title}
        width={800}
        height={600}
        className="rounded-lg"
      />
      <p className="my-4 text-xl sm:text-2xl font-semibold text-gray-200">
        {title}
      </p>
        <p className="font-medium text-gray-400">
            {description}
        </p>
      </a>
  );
}
