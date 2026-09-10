import { IconType } from "react-icons"

interface ResumeCardProps {
    role:string,
    icon:IconType,
    date?:string,
    description:string
}

export default function ResumeCard({
    role,
    icon: Icon,
    date,
    description,
}: ResumeCardProps) {
    return (
        <div className="flex items-start space-x-6 bg-blue-950/20 p-4 rounded-md">
            <div className="resume-icon w-10 h-10 sm:w-14 sm:h-14 bg-blue-950 rounded-full grid place-items-center">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-200" />
            </div>
            <div className="flex-1">
                {date && (
                    <p className="mb-2 px-4 py-1 sm:py-1.5 rounded-full bg-gray-300
                    text-gray-700 w-fit text-sm sm:text-lg font-bold">
                        {date}
                    </p>
                )}
                <p className="text-gray-200 text-xl sm:text-2xl font-semibold tracking-wide">
                    {role}
                </p>
                <p className="text-sm sm:text-base mt-3 text-gray-400 tracking-wide">
                    {description}
                </p>
            </div>
        </div>
    )
}