import React, { useState } from "react";
import Passwordsvg from "assets/svgs/Passwordsvg";
import ShowPassword from "assets/svgs/ShowPassword";
import HiddenPasswordSvg from "assets/svgs/HiddenPasswordSvg";

const Password = ({
    label = "",
    placeholder = "",
    id = "",
    name,
    data,
    setData,
    setIsValid,
    isValid,
    validationFieldName,
}) => {
    const [isVisible, setVisible] = useState(false);

    const toggle = () => {
        setVisible(!isVisible);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setIsValid((prev) => ({
            ...prev,
            [validationFieldName]: validateInput(value),
        }));
    };
    const validateInput = (value) => {
        const password = value;
        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
        return passwordRegex.test(password);
    };
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-semibold">
                    {label}
                </label>
                <div
                    className={`${
                        data[name]?.length > 0
                            ? isValid[validationFieldName]
                                ? "border-green-500 border"
                                : !isValid[validationFieldName]
                                ? "border-red-500 border"
                                : ""
                            : ""
                    } flex items-center justify-between gap-2 bg-slate-200 p-2 rounded-md`}
                >
                    <div className="flex items-center gap-2">
                        <Passwordsvg />
                        <input
                            type={!isVisible ? "password" : "text"}
                            className="bg-slate-200 outline-none w-full"
                            placeholder={placeholder}
                            id={id}
                            value={data[name]}
                            required
                            name={name}
                            onChange={handleChange}
                        />
                    </div>
                    <div onClick={toggle}>
                        {isVisible ? <ShowPassword /> : <HiddenPasswordSvg />}
                    </div>
                </div>
            </div>
            {data[name]?.length > 0 && !isValid[validationFieldName] && (
                <span className="text-xs text-red-500">
                    <span>{"Please enter valid Password"}</span>
                </span>
            )}
            {data[name]?.length > 0 && isValid[validationFieldName] && (
                <span className="text-xs text-green-500">
                    <span>{"Password is valid."}</span>
                </span>
            )}
        </div>
    );
};

export default Password;










// import React, { useState } from "react";
// import Passwordsvg from "assets/svgs/Passwordsvg";
// import ShowPassword from "assets/svgs/ShowPassword";
// import HiddenPasswordSvg from "assets/svgs/HiddenPasswordSvg";

// const Password = ({ label = "", placeholder = "" }) => {
//     const [isVisible, setVisible] = useState(false);

//     const toggle = () => {
//         setVisible(!isVisible);
//     };
//     return (
//         <div className="flex flex-col gap-2">
//             <label htmlFor="password" className="font-semibold">
//                 {label}
//             </label>
//             <div className="flex items-center justify-between bg-slate-200 p-2 rounded-md">
//                 <div className="flex items-center gap-2">
//                     <Passwordsvg />
//                     <input
//                         type={!isVisible ? "password" : "text"}
//                         className="bg-slate-200 outline-none w-full"
//                         placeholder={placeholder}
//                         id="password"
//                         required
//                     />
//                 </div>
//                 <div onClick={toggle}>
//                     {isVisible ? <ShowPassword /> : <HiddenPasswordSvg />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Password;
