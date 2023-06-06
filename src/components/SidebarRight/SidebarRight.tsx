import React, { useState, useRef, useEffect } from "react";

import "./index.scss";
import ButtonRight from "./ButtonRight";

const SidebarRight: React.FC = () => {
    const [sidebarRightIsCollapsed, setSidebarRightIsCollapsed] =
        useState(false);
    const [sidebarRightIsVisible, setSidebarRightIsVisible] = useState(false);

    // check when the form is visible as the payload right sidebar appears when the form is rendered (when editing or creating a doc), same for the account html and the form modal. This will control the visibility of the right button and the position of the colapsed right sidebar to be expanded on click
    const getFormHtmlElement = useRef(null);
    const getAccountHtmlElement = useRef(null);
    const getPayloadModalHtmlElement = useRef(null);

    useEffect(() => {
        getFormHtmlElement.current = document.querySelector("form");
        getAccountHtmlElement.current = document.querySelector(".account");
        getPayloadModalHtmlElement.current =
            document.querySelector(".drawer__content");

        console.log(getPayloadModalHtmlElement.current);

        // when the form or the account is rendered
        if (
            getFormHtmlElement.current !== null ||
            getAccountHtmlElement.current
        ) {
            setSidebarRightIsVisible(true);
        } else {
            setSidebarRightIsVisible(false);
        }

        // when payload modal is active
        if (
            getPayloadModalHtmlElement.current !== null &&
            sidebarRightIsCollapsed
        ) {
            document.body.classList.add("modal-is-active");
        } else {
            document.body.classList.remove("modal-is-active");
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
