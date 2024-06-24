import React, { useState, useRef } from "react";
import defaultUser from "assets/images/default.png";
import Input from "./Input";

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        // Trigger the file input click event
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div className=" p-4 flex flex-col gap-12 shadow-lg rounded-lg">
            <div className="flex flex-col items-center gap-4">
                <div>
                    <img
                        src={selectedImage ? selectedImage : defaultUser}
                        alt="Preview"
                        style={{ maxWidth: "100%", maxHeight: "100px" }}
                        className="rounded-full"
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                />
                <button
                    className="btn-secondary text-center"
                    onClick={handleButtonClick}
                >
                    Upload Image
                </button>
            </div>
            <div className="flex items-center gap-4">
                <Input label="Username" type="text" placeholder="username" />
                <Input label="Phone" type="number" placeholder="phone number" />
            </div>
            <div className="text-end">
                <button className="btn-primary">Save</button>
            </div>
        </div>
    );
};

export default ImageUpload;
