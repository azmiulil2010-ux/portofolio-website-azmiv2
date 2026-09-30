export default function Footer() {
    return (
        <footer className="site-footer border-t border-slate-800 bg-slate-950/60 py-6 transition-colors duration-300">
            <div className="footer-copy px-4 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Azmi Developer Portofolio
            </div>
        </footer>
    )
}