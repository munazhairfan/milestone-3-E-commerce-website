import { defineType} from 'sanity'

export const schemaTypes = [
  defineType({
    name: 'art_supplies',
    title: 'Art supplies',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: (Rule) => Rule.required().min(3).max(100),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule) => Rule.required().positive(),
      },
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'stock',
        title: 'Stock Quantity',
        type: 'number',
        validation: (Rule) => Rule.required().min(0),
      },
      {
        name: 'available',
        title: 'Available for Sale',
        type: 'boolean',
        initialValue: true,
      },
    ],
  }),
  defineType({
    name: 'office_items',
    title: 'Office items',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: (Rule) => Rule.required().min(3).max(100),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule) => Rule.required().positive(),
      },
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'stock',
        title: 'Stock Quantity',
        type: 'number',
        validation: (Rule) => Rule.required().min(0),
      },
      {
        name: 'available',
        title: 'Available for Sale',
        type: 'boolean',
        initialValue: true,
      },
    ],
  }),
  defineType({
    name: 'school_essentials',
    title: 'School essentials',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: (Rule) => Rule.required().min(3).max(100),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule) => Rule.required().positive(),
      },
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'stock',
        title: 'Stock Quantity',
        type: 'number',
        validation: (Rule) => Rule.required().min(0),
      },
      {
        name: 'available',
        title: 'Available for Sale',
        type: 'boolean',
        initialValue: true,
      },
    ],
  }),
  defineType({
    name: 'adhesive',
    title: 'Adhesive',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: (Rule) => Rule.required().min(3).max(100),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule) => Rule.required().positive(),
      },
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'stock',
        title: 'Stock Quantity',
        type: 'number',
        validation: (Rule) => Rule.required().min(0),
      },
      {
        name: 'available',
        title: 'Available for Sale',
        type: 'boolean',
        initialValue: true,
      },
    ],
  }),
  defineType({
    name: 'calligraphy',
    title: 'Calligraphy',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: (Rule) => Rule.required().min(3).max(100),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule) => Rule.required().positive(),
      },
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'stock',
        title: 'Stock Quantity',
        type: 'number',
        validation: (Rule) => Rule.required().min(0),
      },
      {
        name: 'available',
        title: 'Available for Sale',
        type: 'boolean',
        initialValue: true,
      },
    ],
  }),
]
