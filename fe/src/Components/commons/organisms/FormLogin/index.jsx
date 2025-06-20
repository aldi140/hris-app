import { Link } from "react-router-dom"
import { Button } from "../../../ui/button"
import InputForm from "../../moleculs/InputForm"

const FormLogin = ({onSubmit}) => {
    return (
        <>
            <form onSubmit={onSubmit} className="space-y-4">
                <InputForm label={"Email"} name={"email"} type={"email"} placeholder={"example@gmail.com"} required={true}/>
                <InputForm label={"Password"} name={"password"} type={"password"} placeholder={"*********"} required={true}/>
                <Button variant={"blue"} size={"default"} className={"w-full cursor-pointer"}>Sign In</Button>
            </form>
            <p className="text-gray-500 text-center mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-indigo-400 font-semibold">
                    Register
                </Link>
            </p>
        </>
    )
}

export default FormLogin