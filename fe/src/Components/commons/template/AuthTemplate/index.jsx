import { Link } from "react-router-dom"

const AuthTemplate = ({ children, title }) => {
    return (
        <div className="w-full max-w-md p-8">
            <div className="mb-4">
                <Link to="/" className="text-indigo-600 font-bold text-lg block">HRIS APP</Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-700 mb-3">{title}</h1>
            <p className="text-gray-500 text-sm mb-6">
                Manage your workforce smarter. Log in to streamline attendance, performance, and more — all in one place.
            </p>
            {children}
        </div>
    )
}

export default AuthTemplate