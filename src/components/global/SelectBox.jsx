import React, { useState } from "react";
import Select from "react-select";

const SelectBox = ({ option }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={option}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "" : "lightgray",
                        padding: "8px",
                    }),
                }}
            />
        </div>
    );
};

export default SelectBox;
