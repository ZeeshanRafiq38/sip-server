import { useDispatch } from "react-redux";

const Input = ({
    label,
    type = "text",
    name = "",
    placeholder,
    data,
    setData,
    useStore = false,
}) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (useStore) {
            dispatch(setData(value));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="flex flex-col gap-2 flex-1 w-full">
            <label className="font-semibold text-gray ">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="input w-full border-slate-200 border rounded-md p-3 text-gray outline-none"
                name={name}
                onChange={handleChange}
                value={useStore ? data : data[name]}
            />
        </div>
    );
};

export default Input;
