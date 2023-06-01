import React, { useState } from "react";

import "./index.scss";
import ButtonLeft from "./ButtonLeft";

const SidebarLeft: React.FC = () => {
    const [sidebarLeftIsCollapsed, setSidebarLeftIsCollapsed] = useState(false);

    // collapse/expand left sidebar with button
    const handleButtonLeft = () => {
        setSidebarLeftIsCollapsed(!sidebarLeftIsCollapsed);

        if (sidebarLeftIsCollapsed) {
            document.body.classList.remove("collapse-left");
        } else {
            document.body.classList.add("collapse-left");
        }
    };

    // expand the sidebar when clicking on any area of the collapsed sidebar
    const expandSidebarLeft = () => {
        setSidebarLeftIsCollapsed(false);
        document.body.classList.remove("collapse-left");
    };

    return (
        <div>
            <ButtonLeft
                isCollapsed={sidebarLeftIsCollapsed}
                handleFunction1={handleButtonLeft}
                handleFunction2={expandSidebarLeft}
            />
        </div>
    );
};

export default SidebarLeft;
