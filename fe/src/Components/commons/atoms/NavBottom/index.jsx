// import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom"
import { cn } from "../../../../lib/utils"


const NavLinkBottom = ({ active = false, to = "#", title, icon: Icon, ...props }) => {
    return (
        <Link
            {...props}
            to={to}
            className={cn(
                active
                    ?
                    'bg-linear-to-r from-emerald-800 to-emerald-600 text-white transition-all duration-200 '
                    :
                    'text-muted-foreground ',
                ' text-xs  p-3 rounded-xl flex flex-row items-center gap-2  font-medium transition-all duration-200 cursor-pointer group',

            )}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <p className="transition-transform duration-200">{active ? title : null}</p>
        </Link>
    )
}

export default NavLinkBottom