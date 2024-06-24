import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import FileInput from "components/global/FileInput";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import TextArea from "components/global/TextArea";
import ToggleSwitch from "components/global/ToggleSwitch";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createPrizeSetup } from "store/PrizeSlice";

const AddNewPrize = () => {
    const dispatch = useDispatch();
    const [instruction, setInstruction] = useState([]);
    const [createPrize, setCreatePrize] = useState({
        title: "",
        videoLink: "",
        image: "",
        isActive: true,
        instructions: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createPrizeSetup({ ...createPrize, instructions: instruction })
        );
    };

    const addInstruction = (e) => {
        e.preventDefault();
        if (instruction) {
            setInstruction([
                ...instruction,
                { text: createPrize.instructions },
            ]);
        } else {
            setInstruction([{ text: createPrize.instructions }]);
        }
        setCreatePrize({
            ...createPrize,
            instructions: "",
        });
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Add Prize" />
                    <BackBtn />
                </div>
                <div className="p-4 rounded-md bg-pure shadow-md">
                    <div>
                        <div>
                            <Input
                                type="text"
                                label="Title"
                                placeholder="Enter Prize title"
                                name="title"
                                data={createPrize}
                                setData={setCreatePrize}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                label="Video Link"
                                placeholder="Enter Prize title"
                                name="videoLink"
                                data={createPrize}
                                setData={setCreatePrize}
                            />
                        </div>
                        <div>
                            <FileInput
                                label="Cover Image"
                                value={createPrize?.image}
                                setValue={(value) =>
                                    setCreatePrize({
                                        ...createPrize,
                                        image: value,
                                    })
                                }
                            />
                        </div>

                        <ToggleSwitch
                            label="Active"
                            checked={createPrize.isActive}
                            setChecked={(value) =>
                                setCreatePrize({
                                    ...createPrize,
                                    isActive: value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="p-4 rounded-md bg-pure shadow-md my-6">
                    <TextArea
                        label="Add Instruction"
                        name="instructions"
                        data={createPrize}
                        setData={setCreatePrize}
                    />
                    <div className="my-4">
                        <button
                            className="btn-secondary"
                            type="button"
                            onClick={addInstruction}
                        >
                            Add
                        </button>
                    </div>
                </div>
                {instruction?.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-md shadow-md bg-pure p-4 flex flex-col gap-6 my-4"
                    >
                        <h6>{item?.text}</h6>
                        <div className="flex items-center gap-4">
                            <div className="bg-green-500 rounded-full px-2 py-1 flex items-center justify-center">
                                <i className="uil uil-edit text-pure "></i>
                            </div>
                            <div className="bg-red-500 rounded-full px-2 py-1 flex items-center justify-center">
                                <i className="uil uil-trash-alt text-pure"></i>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="text-end py-6">
                    <button className="btn-primary">Save</button>
                </div>
            </form>
        </Layout>
    );
};

export default AddNewPrize;
