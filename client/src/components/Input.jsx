import React, { useId } from "react";

const Input = ({ type, ref, error, label = "", placeholder = "", className = "", ...props }) => {
    const uid = useId();
    return (
        <div className="flex flex-col justify-center items-start w-full">
            {label && (
                <label
                    className="text-primary-black font-primary font-medium text-[15px] mb-2 mt-6"
                    htmlFor={uid}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                ref={ref ? ref : null}
                id={label ? uid : null}
                {...props}
                className="  h-10 w-full pl-3 focus:outline-0 placeholder-zinc-400 font-medium  border-2 rounded-2xl  border-gray-300 font-primary text-secondary-black"
            />
            {error && <p className="w-100 font-secondary text-red-800 mt-1">{error}</p>}
        </div>
    );
};

export default Input;
