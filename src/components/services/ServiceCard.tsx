import type { IconType } from "react-icons";

interface ServiceCardProps {
    icon: IconType,
    name:string,
    description:string
}

export default function ServiceCard({
    icon,
    name,
    description,
}: ServiceCardProps) {
    const Icon = icon;

    return (
        <div className="service-card h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1">
            <Icon aria-hidden="true" className="text-4xl text-indigo-400" />
            <h3 className="my-4 text-xl font-bold text-gray-200 md:text-2xl">
                {name}
            </h3>
            <p className="text-gray-300">{description}</p>

        </div>
    )
}