import axios from "api/axios";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import NormalSelectBox from "components/global/NormalSelectBox";
import EditPassword from "components/userManagement/EditPassword";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const usersUrl = "/api/user";
const EditUser = () => {
    // get id from url
    const params = useParams();
    // token
    const { user } = useSelector((state) => state.admin);
    const token = user?.token;

    // get single user
    const [editUserData, setEditUserData] = useState({
        username: "",
        role: "",
        phone: "",
        canBlockMembers: "",
        isActive: "",
        blockReason: "",
    });

    // get user data
    const editUser = async () => {
        try {
            let response = await axios.get(`${usersUrl}/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data.doc;
        } catch (error) {
            toast.error(error.message);
        }
    };
    // fetch by react-query
    const { data: doc, isLoading } = useQuery({
        queryKey: ["editUser"],
        queryFn: editUser,
    });

    // set user data in state
    useEffect(() => {
        if (doc) {
            setEditUserData({ ...doc });
        }
    }, [doc]);

    // send updated data
    const updateUser = async () => {
        delete editUserData.image;
        try {
            let response = await axios.put(
                `${usersUrl}/${params.id}`,
                editUserData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedUserData = response.data.data.doc;
            setEditUserData(updatedUserData);
            toast.success(response.data.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser();
    };

    return (
        <Layout>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <i className="uil uil-pen text-2xl text-primary"></i>
                            <DashboardHeader text="Edit User" />
                        </div>
                        <BackBtn />
                    </div>
                    <form
                        className="p-4 rounded-md shadow-md bg-pure"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-2 gap-8">
                            <Input
                                label="Username"
                                placeholder="TestUser"
                                type="text"
                                name="username"
                                data={editUserData}
                                setData={setEditUserData}
                            />

                            <NormalSelectBox
                                label="Role"
                                name="role"
                                options={[
                                    { value: "leader", label: "leader" },
                                    { value: "member", label: "member" },
                                ]}
                                data={editUserData}
                                setData={setEditUserData}
                            />
                            <NormalSelectBox
                                label="Can Block Members"
                                name="canBlockMembers"
                                options={[
                                    { value: "select--", label: "select--" },
                                    { value: false, label: "No" },
                                    { value: true, label: "Yes" },
                                ]}
                                data={editUserData}
                                setData={setEditUserData}
                            />
                            <NormalSelectBox
                                label="Account Status"
                                name="isActive"
                                options={[
                                    { value: "select--", label: "select--" },
                                    { value: true, label: "Active" },
                                    { value: false, label: "Block" },
                                ]}
                                data={editUserData}
                                setData={setEditUserData}
                            />
                            <div>
                                <Input
                                    label="Block Reason"
                                    placeholder="Not Defined Yet"
                                    type="text"
                                    name="blockReason"
                                    data={editUserData}
                                    setData={setEditUserData}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Phone Number"
                                    placeholder="03160680395"
                                    type="number"
                                    name="phone"
                                    data={editUserData}
                                    setData={setEditUserData}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 py-4">
                            {/* <EditPassword
                                label="Password"
                                placeholder="Change User Password"
                                autoComplete="off"
                                name="password"
                                data={password}
                                setData={setPassword}
                            /> */}

                            <button className="btn-primary w-32">Save</button>
                        </div>
                    </form>
                </>
            )}
        </Layout>
    );
};

export default EditUser;
