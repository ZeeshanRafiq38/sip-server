import { baseURL } from "api/axios";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import FileInput from "components/global/FileInput";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import TextArea from "components/global/TextArea";
import ToggleSwitch from "components/global/ToggleSwitch";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePrize, updatePrize } from "store/PrizeSlice";

const Edit = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { token } = useSelector((state) => state.admin.user);
    const [instruction, setInstruction] = useState([]);
    const [editInstruction, setEditInstruction] = useState(false);
    const [editPrize, setEditPrize] = useState({
        title: "",
        videoLink: "",
        image: "",
        isActive: true,
        instructions: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = { ...editPrize, instructions: instruction };
        if (body.image.includes(baseURL)) {
            delete body.image;
        }
        dispatch(updatePrize({ id, body, token }));
    };
    const generateUniqueId = () => {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    };
    const addInstruction = (e) => {
        e.preventDefault();
        if (instruction) {
            setInstruction([
                ...instruction,
                { text: editPrize.instructions, id: generateUniqueId() },
            ]);
        } else {
            setInstruction([
                { text: editPrize.instructions, id: generateUniqueId() },
            ]);
        }
        setEditPrize({
            ...editPrize,
            instructions: "",
        });
    };
    const { isLoading, data: data } = useQuery({
        queryKey: ["editPrize"],
        queryFn: () => getSinglePrize(id, token),
    });
    useEffect(() => {
        if (data) {
            const {
                data: {
                    data: { doc },
                },
            } = data;
            setEditPrize({
                ...doc,
                instructions: "",
                image: baseURL + doc?.image,
            });
            setInstruction(doc?.instructions);
        }
    }, [data]);
    const handleEdit = (id) => {
        setEditInstruction(true);
        const filter = instruction?.find(
            (item) => item.id === id
        );
        setEditPrize({ ...editPrize, instructions: filter.text });
        setInstruction(instruction.filter((items) => items.id !== filter.id));
    };
   
    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Edit Prize" />
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
                                data={editPrize}
                                setData={setEditPrize}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                label="Title"
                                placeholder="Enter Video Link"
                                name="videoLink"
                                data={editPrize}
                                setData={setEditPrize}
                            />
                        </div>
                        <div>
                            <FileInput
                                label="Cover Image"
                                value={editPrize?.image}
                                setValue={(value) =>
                                    setEditPrize({
                                        ...editPrize,
                                        image: value,
                                    })
                                }
                            />
                        </div>

                        <ToggleSwitch
                            label="Active"
                            checked={editPrize.isActive}
                            setChecked={(value) =>
                                setEditPrize({
                                    ...editPrize,
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
                        data={editPrize}
                        setData={setEditPrize}
                    />
                    <div className="my-2">
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
                        className="p-4 rounded-md shadow-md bg-pure my-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <i
                                    className="uil uil-pen bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white"
                                    onClick={() => handleEdit(item?.id)}
                                ></i>
                                <i className="uil uil-trash bg-red-500 w-8 h-8 rounded-full flex items-center justify-center text-white"></i>
                            </div>
                            <div>{item?.text}</div>
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

export default Edit;
