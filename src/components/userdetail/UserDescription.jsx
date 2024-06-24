import axios from "api/axios";
import Input from "components/global/Input";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setDescription } from "store/userSlice";

const usersUrl = "/api/user";
const UserDescription = () => {
    const { description } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.admin);
    const params = useParams();
    const token = user?.token;
    const dispatch = useDispatch();
    // send updated data
    const updateDescription = async () => {
        try {
            let response = await axios.put(
                `${usersUrl}/${params.id}`,
                { description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const {
                data: {
                    data: { doc },
                },
            } = response;
            dispatch(setDescription(doc?.description));
            toast.success(response.data.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleUpdateDescription = (e) => {
        e.preventDefault();
        updateDescription();
    };
    return (
        <div className=" bg-pure rounded-md shadow-md">
            <div className="bg-primary text-center p-2 rounded-md">
                <h2 className="text-pure font-bold text-lg">
                    User Description
                </h2>
            </div>
            <form
                className="flex flex-col gap-3 p-4"
                onSubmit={handleUpdateDescription}
            >
                <Input
                    label="User Description"
                    placeholder="Enter short note about user"
                    name="description"
                    useStore={true}
                    data={description}
                    setData={setDescription}
                />
                <button className="btn-primary text-pure font-semibold w-32">
                    Save
                </button>
            </form>
        </div>
    );
};

export default UserDescription;
