import { AiFillInfoCircle } from "react-icons/ai";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FormLogin from "../../Components/commons/organisms/FormLogin";
import AuthTemplate from "../../Components/commons/template/AuthTemplate";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Alert, AlertTitle } from "../../Components/ui/alert";
import { Info } from "lucide-react";
// import Image from "next/image"

const PageLogin = ({title}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { handleLogin } = useAuth();

    const [messageSuccess, setMessageSuccess] = useState(null);
    const [error, setError] = useState(null); // Tambah ini

    const hanldeOnSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const result = await handleLogin({ email, password });
            console.log(result);
            localStorage.setItem("user", JSON.stringify(result.data.user));
            localStorage.setItem("token", result.data.api_token);
            navigate("/");
        } catch (error) {
            console.log(error);
            setError('Invalid email or password');
        }
    }
    useEffect(() => {
        setMessageSuccess(location.state?.message);
    }, [location]);

    // const successMessage = location.state?.success;




    return (
        <div className="flex h-screen">
            <title>{title}</title>
            {/* Kolom kiri: Gambar */}
            <div
                className="hidden xl:block xl:w-1/2 bg-cover bg-center bg-muted rounded-lg"
            >
                {/* <img src="/assets/img/illustration/login_illustration.svg" alt="" /> */}
                <AspectRatio ratio={1} className="flex items-center justify-center">
                    <img
                        src="/assets/img/illustration/login_illustration.svg"
                        alt="Login Illustration"
                        className="w-2/3 h-2/3 object-contain"
                    />
                </AspectRatio>

            </div>

            {/* Kolom kanan: Form Login */}
            <div className="w-full xl:w-1/2 flex flex-col items-center justify-center ">
                <AuthTemplate title="Login" >
                    {error &&
                        <Alert variant={"destructive"} className={"mb-4"}>
                            <Info />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    }
                    {messageSuccess &&
                        <div className="flex items-center gap-x-2 bg-green-200 border border-green-500 text-green-500 py-2 px-4 rounded-md mb-4">
                            <AiFillInfoCircle /> {messageSuccess}
                        </div>
                    }
                    <FormLogin onSubmit={hanldeOnSubmit} />
                </AuthTemplate>
            </div>
        </div>

    );
};


export default PageLogin