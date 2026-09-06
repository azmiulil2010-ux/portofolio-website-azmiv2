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
        <div>
            <Icon aria-hidden="true" className="text-5xl text-indigo-400" />
            <h3 className="my-4 text-xl md:text-2xl font-bold text-gray-200">
                {name}
            </h3>
            <p className="text-gray-300">{description}</p>

        </div>
    )
}