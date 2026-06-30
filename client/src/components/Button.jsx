import React from "react";

const Button = ({ type, child, colorSchema, className = "", ...props }) => {
    return (
        <button
            type={type}
            className={`${colorSchema} ${className} w-full py-3 font-medium font-secondary cursor-pointer duration-300 ease-in-out`}
        >
            {child}
        </button>
    );
};

export default Button;
