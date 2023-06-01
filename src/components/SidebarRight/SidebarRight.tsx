import React, { useState, useRef, useEffect } from "react";

import "./index.scss";
import ButtonRight from "./ButtonRight";

const SidebarRight: React.FC = () => {
    const [sidebarRightIsCollapsed, setSidebarRightIsCollapsed] =
        useState(false);
    const [sidebarRightIsVisible, setSidebarRightIsVisible] = useState("false");

    // check when the form is visible as the payload right sidebar appears when the form is rendered (when editing or creating a doc). This will control the visibility of the right button
    const getFormHtmlElement = useRef(null);

    useEffect(() => {
        getFormHtmlElement.current = document.querySelector("form");

        if (getFormHtmlElement.current !== null) {
            setSidebarRightIsVisible(true);
        } else {
            setSidebarRightIsVisible(false);
        }
    });

    // collapse/expand right sidebar with button
    const handleButtonRight = () => {
        setSidebarRightIsCollapsed(!sidebarRightIsCollapsed);

        if (!sidebarRightIsCollapsed) {
            document.body.classList.add("collapse-right");
        } else {
            document.body.classList.remove("collapse-right");
        }
    };

    // expand the sidebar when clicking on any area of the collapsed sidebar
    const expandSidebarRight = () => {
        setSidebarRightIsCollapsed(false);
        document.body.classList.remove("collapse-right");
    };

    return (
        <div>
            {sidebarRightIsVisible ? (
                <ButtonRight
                    isCollapsed={sidebarRightIsCollapsed}
                    handleFunction1={handleButtonRight}
                    handleFunction2={expandSidebarRight}
                />
            ) : null}
        </div>
    );
};

export default SidebarRight;
