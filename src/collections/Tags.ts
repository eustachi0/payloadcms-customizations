import { CollectionConfig } from 'payload/types';
// import Users from './Users';

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tags'
  },
  fields: [
    {
      name: 'tags',
      type: 'text',
    },
  ],
}

export default Tags;