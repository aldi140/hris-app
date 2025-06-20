// import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom"
import { cn } from "../../../../lib/utils"


const NavLinkResponsive = ({ active = false, to="#", title, icon: Icon, ...props }) => {
    return (
       <Link 
        {...props}
        to={to}
        className={cn(
            active 
            ? 
            'bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-500 font-semibold text-white hover:text-white'
            :
            'text-muted-foreground hover:text-indigo-500',
            'flex items-center gap-3 rounded-lg p-2 font-medium transition-all',

        )}
       >
        <Icon className='w-4 h-4'/>
        {title}
       </Link>
    )
}

export default NavLinkResponsive