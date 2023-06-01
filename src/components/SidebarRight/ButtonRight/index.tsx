import React from "react";

import "./index.scss";

// collapsed button
const CollapsedButton = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.63605 7.75735L7.05026 6.34314L12.7071 12L7.05029 17.6568L5.63608 16.2426L9.87869 12L5.63605 7.75735Z"
                fill="currentColor"
            />
            <path
                d="M12.7071 6.34314L11.2929 7.75735L15.5356 12L11.2929 16.2426L12.7072 17.6568L18.364 12L12.7071 6.34314Z"
                fill="currentColor"
            />
        </svg>
    );
};

// expanded button
const ExpandedButton = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18.3639 7.75735L16.9497 6.34314L11.2929 12L16.9497 17.6568L18.3639 16.2426L14.1213 12L18.3639 7.75735Z"
                fill="currentColor"
            />
            <path
                d="M11.2929 6.34314L12.7071 7.75735L8.46447 12L12.7071 16.2426L11.2929 17.6568L5.63605 12L11.2929 6.34314Z"
                fill="currentColor"
            />
        </svg>
    );
};

const ButtonRight: React.FC = ({
    isCollapsed,
    handleFunction1,
    handleFunction2,
}) => {
    return (
        <>
            <button
                className={
                    !isCollapsed
                        ? "collapse-button-right"
                        : "expand-button-right"
                }
                onClick={handleFunction1}
            >
                {!isCollapsed ? <CollapsedButton /> : <ExpandedButton />}
            </button>
            {isCollapsed ? (
                <div
                    className="collapse-right-hover"
                    onClick={handleFunction2}
                ></div>
            ) : null}
        </>
    );
};

export default ButtonRight;
