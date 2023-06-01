import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import Blogs from "./collections/Blogs";
import Tags from "./collections/Tags";
import Products from "./collections/Products";
import Orders from "./collections/Orders";
import SidebarLeft from "./components/SidebarLeft/SidebarLeft";
import SidebarRight from "./components/SidebarRight/SidebarRight";
import Nav from "./globals/GlobalNav";
// import AfterNavLinks from "./components/RightSidebar/RightSidebar";
// // import CollapsibleNav from "./components/CollapsibleNav";
// import AfterLeftNav from "./components/LeftSidebar/LeftSidebar";

export default buildConfig({
    serverURL: process.env.SERVER_URL,
    admin: {
        user: Users.slug,
        components: {
            // Nav: CollapsibleNav,
            afterNavLinks: [SidebarLeft, SidebarRight],
        },
    },
    collections: [Users, Products, Blogs, Tags, Orders],
    globals: [Nav],
    localization: {
        locales: ["en"],
        defaultLocale: "en",
        fallback: true,
    },
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
    },
});
