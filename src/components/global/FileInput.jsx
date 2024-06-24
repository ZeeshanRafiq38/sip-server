
import Img1 from "assets/images/img1.jpg";
import { useRef, useState } from "react";
import isBase64 from "utils/isBase64";

const FileInput = ({ label, value, setValue }) => {
    const imgRef = useRef(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const result = reader.result;
                if (!isBase64(result)) {
                    setValue(result);
                } else {
                    setValue(result);
                }
            };
        }
    };

    return (
        <div>
            <div className="flex-1 flex flex-col gap-2">
                <label className="text-grayText font-semibold">{label}</label>
                <input
                    type="file"
                    ref={imgRef}
                    onChange={handleFileChange}
                    hidden
                />
                <div
                    className="flex items-center justify-between px-3 rounded-md cursor-pointer border-slate-200 border"
                    onClick={() => imgRef?.current?.click()}
                >
                    <div>Choose File</div>
                    <div className="py-3 px-6 border-l border-slate-200">
                        Browse
                    </div>
                </div>
            </div>
            <div className="mt-4 w-fit">
                <img
                    src={ value || Img1}
                    alt=""
                    className=" w-200px] h-[200px] object-cover"
                />
            </div>
        </div>
    );
};

export default FileInput;
