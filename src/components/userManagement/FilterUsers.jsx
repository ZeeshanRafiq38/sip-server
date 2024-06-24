import FromDate from "components/global/FromDate";
import NormalSelectBox from "components/global/NormalSelectBox";
import Search from "components/global/Search";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { setFrom, setKeyword, setSort, setTo } from "store/userSlice";

const FilterUsers = ({ refetch, isLoading }) => {
    const { from, to, sort } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const clearFilter = () => {
        dispatch(setFrom(""));
        dispatch(setTo(""));
        setTimeout(() => {
            refetch();
        }, 500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className=" grid grid-cols-2 gap-2 bg-pure p-4 py-8 rounded-lg shadow-md">
                    <Search
                        label="Search"
                        placeholder="search..."
                        name="keyword"
                        setFetcher={setKeyword}
                    />
                    <NormalSelectBox
                        label="Sort"
                        name="sort"
                        options={[
                            { value: "", label: "All" },
                            { value: "highDeposit", label: "Highest Deposit" },
                            { value: "lowDeposit", label: "Low Deposit" },
                        ]}
                        data={sort}
                        setData={setSort}
                        useStore={true}
                    />
                </div>
                <form
                    className="bg-pure p-4 py-6  rounded-lg shadow-md"
                    onSubmit={handleSubmit}
                >
                    <div className=" grid grid-cols-2 gap-8 ">
                        <FromDate
                            type="date"
                            label="From"
                            name="from"
                            data={from}
                            setData={setFrom}
                            useStore={true}
                        />
                        <FromDate
                            type="date"
                            label="To"
                            name="to"
                            data={to}
                            setData={setTo}
                            useStore={true}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-4 my-4">
                        <button
                            className="btn-secondary"
                            type="button"
                            onClick={clearFilter}
                        >
                            Clear Filters
                        </button>
                        <button className="btn-primary" type="submit">
                            {isLoading ? (
                                <ClipLoader color="white" size={20} />
                            ) : (
                                "Search"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FilterUsers;
