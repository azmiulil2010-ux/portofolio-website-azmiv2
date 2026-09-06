export default function Footer() {
    return (
        <footer className="border-t border-slate-800 py-10">
            <div className="px-4 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Azmi Developer Portofolio
            </div>
        </footer>
    )
}