import React, { useEffect, useState } from "react";
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
    const [navIsCollapsed, setNavIsCollapsed] = useState(false);

    // collapse/expand sidebar using the button
    const handleCollapseNav = () => {
        setNavIsCollapsed(!navIsCollapsed);

        if (navIsCollapsed) {
            baseClass = "nav";
            return baseClass;
        } else {
            baseClass = "collapse";
            return baseClass;
        }
    };

    // expand sidebar when clicking on the collapsed sidebar area
    const handleExpandNav = () => {
        setNavIsCollapsed(false);
        baseClass = "nav";

        return baseClass;
    };

    return (
        <>
            <button
                className={
                    !navIsCollapsed
                        ? "collapse-sidebar-button"
                        : "expand-sidebar-button"
                }
                onClick={handleCollapseNav}
            >
                {!navIsCollapsed ? (
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
                ) : (
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
                )}
            </button>
            <aside className={classes}>
                {navIsCollapsed ? (
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
