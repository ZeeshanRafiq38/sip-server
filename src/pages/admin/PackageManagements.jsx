import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import React, { useEffect } from "react";
import PackageTable from "components/packageManagement/PackageTable";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages, setPackages } from "store/PackageSlice";
import { useQuery } from "react-query";

const PackageManagements = () => {
    const { user } = useSelector((state) => state.admin);
    const token = user?.token;
    const dispatch = useDispatch();

    const { isLoading, data: docs } = useQuery({
        queryKey: ["packages"],
        queryFn: fetchPackages,
    });
    useEffect(() => {
        if (docs) {
            dispatch(setPackages(docs));
        }
    }, [docs]);
    return (
        <Layout>
            <div>
                <div>
                    <BackBtn />
                </div>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="All Packages" />
                    <Link to="/package-management/create-package">
                        <button className="btn-secondary">
                            Add New Package
                        </button>
                    </Link>
                </div>
                <div>
                    <PackageTable />
                </div>
            </div>
        </Layout>
    );
};

export default PackageManagements;
