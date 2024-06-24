import axios from "api/axios";
import Input from "components/global/Input";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setTotalBalance } from "store/userSlice";

const usersUrl = "/api/user/update-balance";
const WalletDetails = () => {
    const { totalBalance } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.admin);
    const params = useParams();
    const token = user?.token;
    const dispatch = useDispatch();
    // send updated data
    const updateWalletBalance = async () => {
        try {
            let response = await axios.put(
                `${usersUrl}/${params.id}`,
                { totalBalance },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const {
                data: {
                    data: {
                        doc: { wallet },
                    },
                },
            } = response;
            dispatch(setTotalBalance(wallet?.totalBalance));
            toast.success(response.data.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleUpdateBalance = (e) => {
        e.preventDefault();
        updateWalletBalance();
    };
    return (
        <div>
            <div className=" bg-pure rounded-md shadow-md">
                <div className="bg-primary text-center p-2 rounded-md">
                    <h2 className="text-pure font-bold text-lg">
                        Wallet Details
                    </h2>
                </div>
                <form
                    className="flex flex-col gap-3 p-4"
                    onSubmit={handleUpdateBalance}
                >
                    <Input
                        label="Wallet Balance"
                        type="number"
                        useStore={true}
                        data={totalBalance}
                        setData={setTotalBalance}
                    />
                    <button className="btn-primary text-pure font-semibold w-32">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WalletDetails;
