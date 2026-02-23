import { AiFillInfoCircle } from "react-icons/ai";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FormLogin from "../../Components/commons/organisms/FormLogin";
import AuthTemplate from "../../Components/commons/template/AuthTemplate";
// import { AspectRatio } from "@/components/ui/aspect-ratio"
import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Alert, AlertTitle } from "../../Components/ui/alert";
import { Info } from "lucide-react";
import { useSelector } from "react-redux";
import { isAuthentication } from "../../features/auth/authSlice";
import { AspectRatio } from "../../Components/ui/aspect-ratio";
// import Image from "next/image"

const PageLogin = ({ title }) => {
    const location = useLocation();
    const isAuth = useSelector(isAuthentication);
    const { handleLogin } = useAuth();

    const [messageSuccess, setMessageSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state?.reason === "SESSION_EXPIRED") {
            toast.error("Session expired, please login again");
            window.history.replaceState({}, document.title);
        }
    }, []);


    const hanldeOnSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            setIsLoading(true);
            setError(null);
            await handleLogin({ email, password });
        } catch (err) {
            setError(err?.message || "Email atau password salah");
        } finally {
            setIsLoading(false);
        }
    };


    if (isAuth) {
        return <Navigate to="/" replace />;
    }

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
                    <FormLogin onSubmit={hanldeOnSubmit} isLoading={isLoading} />
                </AuthTemplate>
            </div>
        </div>

    );
};


export default PageLogin