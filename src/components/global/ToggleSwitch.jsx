// ToggleSwitch.js

const ToggleSwitch = ({ checked, setChecked, label }) => {
    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div className="flex flex-col gap-2 mt-2">
            <label className="font-semibold">{label}</label>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-primary dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-primary peer-checked:bg-primary"></div>
            </label>
        </div>
    );
};

export default ToggleSwitch;
