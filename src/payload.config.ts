import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import Blogs from "./collections/Blogs";
import Tags from "./collections/Tags";
import Products from "./collections/Products";
import Orders from "./collections/Orders";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
// import AfterNavLinks from "./components/RightSidebar/RightSidebar";
// // import CollapsibleNav from "./components/CollapsibleNav";
// import AfterLeftNav from "./components/LeftSidebar/LeftSidebar";

export default buildConfig({
    serverURL: process.env.SERVER_URL,
    admin: {
        user: Users.slug,
        components: {
            // Nav: CollapsibleNav,
            afterNavLinks: [LeftSidebar, RightSidebar],
        },
    },
    collections: [Users, Products, Blogs, Tags, Orders],
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
