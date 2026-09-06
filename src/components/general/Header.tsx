interface HeaderProps {
    title:string,
    as?:"h1" | "h2"
}

export default function Header({ title, as:Tag = "h1" }:HeaderProps) {
    const sizeClasses = {
        h1:"text-3xl md:text-4xl",
        h2:"text-2xl md:text-3xl"
    }
    return (
        <div className="py-14 md:py-20 flex justify-center">
            <Tag className={`font-bold tracking-wide text-transparent bg-clip-text bg-linear-to-r
            from-indigo-200 to-gray-300 ${sizeClasses[Tag]}`}>
                {title}
            </Tag>
        </div>
        
    )
}