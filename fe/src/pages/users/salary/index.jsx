import ComingSoon from "../../comingSoon"

const PageSalary = ({ title }) => {
    return (
        <div>
            <div className="p-4 shadow-md bg-white text-center">
                <h1 className="text-md text-neutral-800 font-bold ">{title}</h1>
            </div>
            <div className="p-4">
                <ComingSoon />
            </div>
        </div>
    )
}

export default PageSalary