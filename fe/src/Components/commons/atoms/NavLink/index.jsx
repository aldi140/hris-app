// import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom"
import { cn } from "../../../../lib/utils"


const NavLink = ({ active = false, to="#", title, icon: Icon, ...props }) => {
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
            'flex items-center gap-3 rounded-lg font-medium p-3 hover:bg-indigo-100 transition-all duration-200 cursor-pointer group',

        )}
       >
        <Icon className='w-4 h-4'/>
        <span className="group-hover:translate-x-1 transition-transform duration-200">{title}</span>
       </Link>
    )
}

export default NavLink