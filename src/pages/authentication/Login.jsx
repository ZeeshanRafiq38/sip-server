
import { useNavigate } from "react-router-dom";
import Password from "components/global/Password";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "components/auth/PhoneInput";
import { LoginUser } from "store/loginSlice";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state?.admin);
    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });
    const [formValidation, setFormValidation] = useState({
        isPhoneValid: false,
        isPasswordValid: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log({ formData });
        dispatch(LoginUser({ formData, navigate }));
    };
    return (
        <div className="flex">
            <div className="flex-[2] bg-pure">
                <div className="flex justify-center mt-28">
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-primary text-2xl font-semibold">
                            Login To SIP
                        </h2>
                        <p className="text-center text-gray leading-tight">
                            Welcome to SIP, Sign in to access your account and
                            stay <br /> connected with your financial journey.
                            Your success begins <br /> here.
                        </p>
                        <img
                            src="https://fir-course-989a4.web.app/static/media/login.b096353cb9f855174488.png"
                            alt="login"
                            className="w-[700px]"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-slate-200 h-screen flex items-center  justify-center py-12 ">
                <div className=" bg-pure h-fit shadow-lg rounded-lg flex flex-col items-center">
                    <div className="bg-primary py-12 pb-16 rounded-lg flex justify-center w-[450px]">
                        <img
                            className="w-[200px]"
                            src="https://fir-course-989a4.web.app/static/media/whiteLogo.2edf299f21754afc9b096ebf9f6f8322.svg"
                            alt="login-image"
                        />
                    </div>
                    <div className="bg-pure p-6 w-[370px]  shadow-md  rounded-md -translate-y-[30px]">
                        <h3 className="text-center py-2 pb-4 font-semibold text-lg">
                            Welcome Back
                        </h3>
                        <form
                            className="flex flex-col gap-2"
                            onSubmit={handleSubmit}
                        >
                            <PhoneInput
                                data={formData}
                                setData={setFormData}
                                setIsValid={setFormValidation}
                                isValid={formValidation}
                            />
                            <div>
                                {/* <Password placeholder="Enter your Password" /> */}
                                <Password
                                    placeholder=" Password"
                                    required
                                    autoComplete="off"
                                    name="password"
                                    data={formData}
                                    setData={setFormData}
                                    setIsValid={setFormValidation}
                                    isValid={formValidation}
                                    validationFieldName={"isPasswordValid"}
                                />
                            </div>
                            {/* <Link to="/forgot-password">
                                    <div className="text-right underline text-primary font-medium cursor-pointer">
                                        <p>Forgot Password</p>
                                    </div>
                                </Link> */}

                            <div className="flex flex-col gap-2">
                                <button
                                    className="btn-primary w-full"
                                    disabled={!formValidation.isPhoneValid}
                                >
                                    {loading ? (
                                        <ClipLoader color="white" size={20} />
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center gap-2 pb-6">
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col gap-2 items-center">
                                <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
                                    <i className="uil uil-whatsapp text-pure text-2xl"></i>
                                </div>
                                <p className="text-primary text-center">
                                    Join Group
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
                                    <i className="uil uil-phone text-2xl text-pure"></i>
                                </div>
                                <p className="text-primary">Contact Us</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
