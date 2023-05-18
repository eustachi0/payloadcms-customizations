import { CollectionConfig } from 'payload/types';
import { text } from 'payload/dist/fields/validations';

const Products: CollectionConfig = {
  slug: 'products',
  // drafts
  access: {
    read: ({ req }) => {
      // If there is a user logged in,
      // let them retrieve all documents
      if (req.user) return true;

      // If there is no user,
      // restrict the documents that are returned
      // to only those where `_status` is equal to `published`
      return {
        _status: {
          equals: 'published',
        },
      };
    },
  },
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'productName'
  },
  fields: [
    // general information
    {
      label: 'Product Information',
      type: 'collapsible',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'productName',
              type: 'text',
              required: true,
              minLength: 1,
              admin: {
                width: '50%',
                description: 'a short name',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'feature',
              type: 'text',
              admin: {
                width: '100%',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              maxLength: 160,
              admin: {
                width: '100%',
                description: 'Give your product a short and clear description. 120-160 characters is the recommended length for search engines.'
              },
            },
            {
              name: 'discountable',
              type: 'checkbox',
              label: 'Discountable',
              admin: {
                description: 'When uncheck discounts will not be applied to this product.',
              }
            }
          ],
        },
      ],
    },
  ],
}

export default Products;