import React, { useRef, useEffect, useState } from "react";

import "./test.scss";

const AfterNavLinks: React.FC = () => {
    const [sideBarX, setSideBarX] = useState(null);
    useEffect(() => {
        setTimeout(() => {
            setSideBarX(
                document.querySelector(".collection-edit__sidebar-wrap")
            );
        }, 50);
    });
    const handleClick = () => {
        const sidebar = document.querySelector(
            ".collection-edit__sidebar-wrap"
        );
        // sidebar.className = "test";
        // sidebar.style.backgroundColor = "red"
        console.log(sidebar);
    };

    return (
        <div>
            {sideBarX !== null ? (
                <button onClick={handleClick}>Testing</button>
            ) : (
                ""
            )}

            <div>AfterNavLinks</div>
        </div>
    );
};

export default AfterNavLinks;
