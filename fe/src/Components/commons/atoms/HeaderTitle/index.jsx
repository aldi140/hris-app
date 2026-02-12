const HeaderTitle = ({ title, subtitle, icon: Icon }) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center gap-x-1">
                {Icon && <Icon />}
                <h1 className="text-xl font-bold text-neutral-800">{title}</h1>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
        </div>
    )
}

export default HeaderTitle