import { GlobalConfig } from "payload/types";

const Nav: GlobalConfig = {
    slug: "nav",
    fields: [
        {
            name: "items",
            type: "array",
            required: true,
            maxRows: 8,
            fields: [
                {
                    name: "page",
                    type: "relationship",
                    relationTo: "blogs", // "pages" is the slug of an existing collection
                    required: true,
                },
            ],
        },
    ],
};

export default Nav;
