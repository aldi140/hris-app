import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import InputForm from "../../moleculs/InputForm";
import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { useAuth } from "../../../../hooks/useAuth";

const FormRegister = () => {
    const navigate = useNavigate();
    const { handleRegister } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const onHandleChange = (e) => {
        const { name, value } = e.target;

        const updatedForm = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedForm);

        const newErrors = {};

        // Validasi tiap field kosong
        if (!updatedForm.name.trim()) newErrors.name = "Full name is required";
        else if (!updatedForm.email.trim()) newErrors.email = "Email is required";
        else if (!updatedForm.email.includes("@")) newErrors.email = "Email is not valid";

        // Validasi password
        else {
            if (!updatedForm.password.trim()) {
                newErrors.password = ["Password is required"]
            } else {
                const passwordErrors = [];

                if (updatedForm.password.length < 8) {
                    passwordErrors.push("At least 8 characters");
                }
                if (!/\d/.test(updatedForm.password)) {
                    passwordErrors.push("Must include a number");
                }
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(updatedForm.password)) {
                    passwordErrors.push("Must include a symbol");
                }

                if (passwordErrors.length > 0) {
                    newErrors.password = passwordErrors;
                }
                else if (!updatedForm.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required";

                // Validasi password match
                else if (
                    updatedForm.password &&
                    updatedForm.confirmPassword &&
                    updatedForm.password !== updatedForm.confirmPassword
                ) {
                    newErrors.confirmPassword = "Confirm password do not match";
                }
            }
        }

        setErrors(newErrors);
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setErrors({});
    };

    // Cek apakah form valid: tidak ada error dan semua field terisi
    const isFormValid =
        formData.name &&
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        Object.keys(errors).length === 0


    const onSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const response = await handleRegister({ name, email, password });
            setTimeout(() => {
                navigate("/login", { state: { message: response.data.message } });
            }, 2000);

            resetForm()
        } catch (error) {
            console.log(error);
            const errorMessage = error.response.data.email[0];
            // console.log(errorMessage);
            navigate("/register", { state: { errorMessage } });
            // setError(error)
        }

    }

    // useEffect(() => {
    //     setErrors(errors);
    // }, [errors]);
    return (
        <>
            <form onSubmit={onSubmit} className="space-y-4">
                <InputForm
                    label="Fullname"
                    name="name"
                    type="text"
                    placeholder="Budi Setiawan"
                    value={formData.name}
                    autoComplete="off"
                    onChange={onHandleChange}
                    id="name"
                />
                {errors.name && <p className="text-red-500 text-xs font-semibold flex gap-2"><FiInfo /> {errors.name}</p>}

                <InputForm
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={onHandleChange}
                    id="email"
                />
                {errors.email && <p className="text-red-500 text-xs font-semibold flex gap-1 items-center"><FiInfo /> {errors.email}</p>}

                <div className="flex justify-between w-full gap-3">

                    <div className="flex flex-col">
                        <InputForm
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="*********"
                            value={formData.password}
                            onChange={onHandleChange}
                            id="password"
                        />
                        {Array.isArray(errors.password) ? (
                            <ul className="text-red-500 text-xs font-semibold space-y-1 mt-1">
                                {errors.password.map((err, idx) => (
                                    <li key={idx} className="flex items-center gap-1">
                                        <FiInfo className="shrink-0" /> {err}
                                    </li>
                                ))}
                            </ul>
                        ) : errors.password ? (
                            <p className="text-red-500 text-xs font-semibold flex gap-1 items-center mt-1">
                                <FiInfo /> {errors.password}
                            </p>
                        ) : null}
                    </div>


                    <div className="flex flex-col gap-1 ">
                        <InputForm
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="*********"
                            value={formData.confirmPassword}
                            onChange={onHandleChange}
                            id="confirmPassword"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs font-semibold flex gap-1 items-center"><FiInfo /> {errors.confirmPassword}</p>
                        )}
                    </div>

                </div>

                <Button
                    variant="secondary"
                    size="default"
                    className="w-full cursor-pointer"
                    onClick={resetForm}
                    type="reset"
                >
                    Reset
                </Button>

                <Button
                    variant="blue"
                    size="default"
                    className="w-full cursor-pointer"
                    type="submit"
                    disabled={!isFormValid}
                >
                    Sign Up
                </Button>
            </form>

            <p className="text-gray-500 text-center mt-4">
                Have an account?{" "}
                <Link to="/login" className="text-indigo-400 font-semibold">
                    Login
                </Link>
            </p>
        </>
    );
};

export default FormRegister;
