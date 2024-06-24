import { debounce } from "lodash";
import { useDispatch } from "react-redux";

const Search = ({ label, placeholder, setFetcher }) => {
    const dispatch = useDispatch();
    const handleChange = debounce((e) => {
        const value = e.target.value;
        dispatch(setFetcher(value));
    }, 1500);

    return (
        <div className="flex flex-col gap-1">
            <label className="text-gray font-semibold text-md">{label}</label>
            <div className="border-slate-200 border rounded-md flex items-center gap-3 pl-4 text-xl bg-white w-[500px]">
                <i className="uil uil-search text-gray"></i>
                <input
                    type="text"
                    placeholder={placeholder}
                    className="text-gray py-[10px] outline-none w-full"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Search;
