import AuthTemplate from "../../Components/commons/template/AuthTemplate";
import FormRegister from "../../Components/commons/organisms/FormRegister";
// import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "../../Components/ui/alert";
import { Info } from "lucide-react";
import { AspectRatio } from "../../Components/ui/aspect-ratio";




const PageRegister = ({ title }) => {
    const location = useLocation();
    const [error, setError] = useState(null);
    useEffect(() => {
        setError(location.state?.errorMessage);
    }, [location]);
    return (
        <div className="flex h-screen">
            <title>{title}</title>
            {/* Kolom kiri: Gambar */}
            <div
                className="hidden xl:block xl:w-1/2 bg-cover bg-center bg-muted rounded-lg"
            >
                <AspectRatio ratio={1} className=" flex items-center justify-center">
                    <img
                        src="/assets/img/illustration/login_illustration.svg"
                        alt="Login Illustration"
                        className="w-2/3 h-2/3 object-contain"
                    />
                </AspectRatio>
            </div>

            {/* Kolom kanan: Form Login */}
            <div className="w-full xl:w-1/2 flex items-center justify-center ">
                <AuthTemplate title="Register">
                    {error &&
                        <Alert variant={"destructive"} className={"mb-4"}>
                            <Info />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    }
                    <FormRegister />
                </AuthTemplate>
            </div>
        </div>

    );
};


export default PageRegister