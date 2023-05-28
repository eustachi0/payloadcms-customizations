import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useConfig } from "payload/components/utilities";
import { useAuth } from "payload/components/utilities";
import Chevron from "payload/dist/admin/components/icons/Chevron";
import Menu from "payload/dist/admin/components/icons/Menu";
import CloseMenu from "payload/dist/admin/components/icons/CloseMenu";
import Icon from "payload/dist/admin/components/graphics/Icon";
import Account from "payload/dist/admin/components/graphics/Account";
import Localizer from "payload/dist/admin/components/elements/Localizer";
import NavGroup from "payload/dist/admin/components/elements/NavGroup";
import Logout from "payload/dist/admin/components/elements/Logout";
import {
    EntityToGroup,
    EntityType,
    Group,
    groupNavItems,
} from "payload/dist/admin/utilities/groupNavItems";
import { getTranslation } from "payload/dist/utilities/getTranslation";

import "./index.scss";
import ButtonLeft from "./ButtonLeft";
import ButtonRight from "./ButtonRight";

let baseClass = "nav";

const DefaultNav = () => {
    const { permissions, user } = useAuth();
    const [menuActive, setMenuActive] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const history = useHistory();
    const { i18n } = useTranslation("general");
    const {
        collections,
        globals,
        routes: { admin },
        admin: {
            components: { beforeNavLinks, afterNavLinks },
        },
    } = useConfig();

    const classes = [baseClass, menuActive && `${baseClass}--menu-active`]
        .filter(Boolean)
        .join(" ");

    useEffect(() => {
        setGroups(
            groupNavItems(
                [
                    ...collections
                        .filter(
                            ({ admin: { hidden } }) =>
                                !(typeof hidden === "function"
                                    ? hidden({ user })
                                    : hidden)
                        )
                        .map((collection) => {
                            const entityToGroup: EntityToGroup = {
                                type: EntityType.collection,
                                entity: collection,
                            };

                            return entityToGroup;
                        }),
                    ...globals
                        .filter(
                            ({ admin: { hidden } }) =>
                                !(typeof hidden === "function"
                                    ? hidden({ user })
                                    : hidden)
                        )
                        .map((global) => {
                            const entityToGroup: EntityToGroup = {
                                type: EntityType.global,
                                entity: global,
                            };

                            return entityToGroup;
                        }),
                ],
                permissions,
                i18n
            )
        );
    }, [collections, globals, permissions, i18n, i18n.language, user]);

    useEffect(
        () =>
            history.listen(() => {
                setMenuActive(false);
            }),
        [history]
    );

    // collapsible Nav functionality
    const [sidebarLeftIsCollapsed, setSidebarLeftIsCollapsed] = useState(false);
    const [sidebarRightIsCollapsed, setSidebarRightIsCollapsed] =
        useState(false);
    const [sidebarRightIsVisible, setSidebarRightIsVisible] = useState("false");

    // collapse/expand left sidebar using the button left
    const handleButtonLeft = () => {
        setSidebarLeftIsCollapsed(!sidebarLeftIsCollapsed);

        if (sidebarLeftIsCollapsed) {
            baseClass = "nav";
            return baseClass;
        } else {
            baseClass = "collapse";
            return baseClass;
        }
    };

    // expand sidebar when clicking on the collapsed left sidebar area
    const handleExpandNav = () => {
        setSidebarLeftIsCollapsed(false);
        baseClass = "nav";

        return baseClass;
    };

    // check when the collection form is editing, this will control the visibility of the ButtonRight component
    const getIsEditingElement = useRef(null);

    useEffect(() => {
        getIsEditingElement.current = document.querySelector(
            ".collection-edit--is-editing"
        );
        getIsEditingElement.current = document.querySelector("form");

        if (getIsEditingElement.current !== null) {
            setSidebarRightIsVisible(true);
            if (sidebarRightIsCollapsed) {
                getIsEditingElement.current.classList.add("collapse-test");
            }
        } else {
            setSidebarRightIsVisible(false);
        }
    });

    // add/remove class to a DOM element
    // collapse/expand sidebar right using the button
    const handleButtonRight = () => {
        setSidebarRightIsCollapsed(!sidebarRightIsCollapsed);

        if (!sidebarRightIsCollapsed) {
            getIsEditingElement.current.classList.add("collapse-test");
        } else {
            getIsEditingElement.current.classList.remove("collapse-test");
        }
    };

    return (
        <>
            <ButtonLeft
                isCollapsed={sidebarLeftIsCollapsed}
                handleFunction={handleButtonLeft}
            />
            {sidebarRightIsVisible ? (
                <ButtonRight
                    isCollapsed={sidebarRightIsCollapsed}
                    handleFunction={handleButtonRight}
                />
            ) : null}

            <aside className={classes}>
                {sidebarLeftIsCollapsed ? (
                    <div
                        className={`${baseClass}__collapsed-sidebar`}
                        onClick={handleExpandNav}
                    ></div>
                ) : null}
                <header>
                    <Link to={admin} className={`${baseClass}__brand`}>
                        <Icon />
                    </Link>
                    <button
                        type="button"
                        className={`${baseClass}__mobile-menu-btn`}
                        onClick={() => setMenuActive(!menuActive)}
                    >
                        {menuActive && <CloseMenu />}
                        {!menuActive && <Menu />}
                    </button>
                </header>
                <div className={`${baseClass}__scroll`}>
                    <nav className={`${baseClass}__wrap`}>
                        {Array.isArray(beforeNavLinks) &&
                            beforeNavLinks.map((Component, i) => (
                                <Component key={i} />
                            ))}
                        {groups.map(({ label, entities }, key) => {
                            return (
                                <NavGroup {...{ key, label }}>
                                    {entities.map(({ entity, type }, i) => {
                                        let entityLabel: string;
                                        let href: string;
                                        let id: string;

                                        if (type === EntityType.collection) {
                                            href = `${admin}/collections/${entity.slug}`;
                                            entityLabel = getTranslation(
                                                entity.labels.plural,
                                                i18n
                                            );
                                            id = `nav-${entity.slug}`;
                                        }

                                        if (type === EntityType.global) {
                                            href = `${admin}/globals/${entity.slug}`;
                                            entityLabel = getTranslation(
                                                entity.label,
                                                i18n
                                            );
                                            id = `nav-global-${entity.slug}`;
                                        }

                                        return (
                                            <NavLink
                                                id={id}
                                                className={`${baseClass}__link`}
                                                activeClassName="active"
                                                key={i}
                                                to={href}
                                            >
                                                <Chevron />
                                                {entityLabel}
                                            </NavLink>
                                        );
                                    })}
                                </NavGroup>
                            );
                        })}
                        {Array.isArray(afterNavLinks) &&
                            afterNavLinks.map((Component, i) => (
                                <Component key={i} />
                            ))}
                    </nav>
                </div>
                <div className={`${baseClass}__controls`}>
                    <div>
                        <Localizer />
                    </div>
                    <Link
                        to={`${admin}/account`}
                        className={`${baseClass}__account`}
                    >
                        <Account />
                    </Link>
                    <Logout />
                </div>
            </aside>
        </>
    );
};

const CollapsibleNav: React.FC = () => {
    return <DefaultNav />;
};

export default CollapsibleNav;
