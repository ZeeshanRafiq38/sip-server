import axios from "api/axios";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import TextArea from "components/global/TextArea";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { createWebsiteSetup } from "store/WebsiteSlice";
import ReactLoading from "react-loading";

const websiteSettingUrl = "/api/setting";
const type = "balls";
const WebsiteSetup = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.admin);
    const token = user?.token;
    const [settingsData, setSettingsData] = useState({
        minWithdraw: 0,
        serviceCharges: 2,
        depositBonus: 0,
        contactSupport: "",
        whatsappGroupLink: "",
        withdrawStartTime: "",
        withdrawEndTime: "",
        howToDeposit: "",
        howToWithdraw: "",
    });
    const [referralCommission, setReferralCommission] = useState({
        level1: 0,
        level2: 0,
        level3: 0,
    });
    const fetchWebsiteData = async () => {
        try {
            let response = await axios.get(websiteSettingUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            // setUsers(response.data.data.docs)
            return response.data.data.doc;
        } catch (error) {
            console.log(error);
        }
    };
    const {
        isLoading,
        error,
        data: doc,
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchWebsiteData,
    });
    useEffect(() => {
        if (doc) {
            setSettingsData(doc);
        }
    }, [doc]);
    useEffect(() => {
        if (doc?.referralCommission) {
            setReferralCommission(doc?.referralCommission);
        }
    }, [doc?.referralCommission]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createWebsiteSetup({ settingsData, referralCommission }));
       console.log(settingsData)
    };
    return (
        <Layout>
            {!isLoading ? (
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <i className="uil uil-setting text-2xl text-primary"></i>
                            <DashboardHeader text="Website Setup" />
                        </div>
                        <BackBtn />
                    </div>
                    <div className="p-4 rounded-lg shadow-md border-slate-200 border bg-pure flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-8">
                            <Input
                                type="number"
                                label="Minimum Withdraw"
                                placeholder="1000"
                                name="minWithdraw"
                                data={settingsData}
                                setData={setSettingsData}
                            />
                            <Input
                                type="number"
                                label="Service Charges %"
                                placeholder="3"
                                name="serviceCharges"
                                data={settingsData}
                                setData={setSettingsData}
                            />
                        </div>
                        <div>
                            <Input
                                type="number"
                                label="Deposit Bonus %"
                                placeholder="0"
                                name="depositBonus"
                                data={settingsData}
                                setData={setSettingsData}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <Input
                                type="number"
                                label="Contact Support No"
                                placeholder="0388765889"
                                name="contactSupport"
                                data={settingsData}
                                setData={setSettingsData}
                            />
                            <Input
                                type="text"
                                label="Whatsapp Group Link"
                                placeholder="https://whatsapp.com"
                                name="whatsappGroupLink"
                                data={settingsData}
                                setData={setSettingsData}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col gap-1">
                                <Input
                                    type="time"
                                    label="Withdraw Start Time"
                                    placeholder="--:-- --"
                                    name="withdrawStartTime"
                                    data={settingsData}
                                    setData={setSettingsData}
                                />
                                <p className="text-gray text-sm">
                                    Current Withdraw Time :
                                    <span>
                                        {settingsData?.withdrawStartTime}
                                    </span>
                                    -
                                    <span>{settingsData?.withdrawEndTime}</span>
                                </p>
                            </div>
                            <Input
                                type="time"
                                label="Withdraw End Time"
                                name="withdrawEndTime"
                                data={settingsData}
                                setData={setSettingsData}
                            />
                        </div>

                        <TextArea
                            label="How To Deposit"
                            name="howToDeposit"
                            placeholder="Embedded deposit link"
                            data={settingsData}
                            setData={setSettingsData}
                        />
                        <TextArea
                            label="How To Withdraw"
                            name="howToWithdraw"
                            placeholder="Embedded withdraw link"
                            data={settingsData}
                            setData={setSettingsData}
                        />
                    </div>
                    <h2 className="text-primary font-semibold text-lg my-4">
                        Referral Commission
                    </h2>
                    <div className="p-4 shadow-md rounded-lg border-slate-200 border bg-pure flex flex-col ga-4">
                        <div className="grid grid-cols-2 gap-8">
                            <Input
                                type="number"
                                label="Level One Profit %"
                                placeholder="4.1"
                                name="level1"
                                data={referralCommission}
                                setData={setReferralCommission}
                            />
                            <Input
                                type="number"
                                label="Level two Profit %"
                                placeholder="3.1"
                                name="level2"
                                data={referralCommission}
                                setData={setReferralCommission}
                            />
                        </div>
                        <div>
                            <Input
                                type="number"
                                label="Level three Profit %"
                                placeholder="2.1"
                                name="level3"
                                data={referralCommission}
                                setData={setReferralCommission}
                            />
                        </div>
                    </div>
                    <div className="my-4">
                        <button className="btn-primary">Save</button>
                    </div>
                </form>
            ) : (
                <div className=" flex items-center justify-center">
                    <ReactLoading
                        type={type}
                        color="orange"
                        height={"10%"}
                        width={"10%"}
                    />
                </div>
            )}
        </Layout>
    );
};

export default WebsiteSetup;
