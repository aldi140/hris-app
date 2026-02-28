import { LucideArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PageHeader = ({ title, backTo }) => {
    return (
        <nav className="p-4 shadow-sm bg-white fixed top-0 lg:max-w-2xl w-full">
            <div className="flex items-center relative">
                <Link to={backTo} className="text-emerald-800 flex items-center absolute left-0"><LucideArrowLeft className="w-6 h-6 shrink-0" /></Link>
                <h1 className="text-md text-neutral-800 font-bold w-full text-center">{title}</h1>
            </div>
        </nav>
    )
}

export default PageHeader