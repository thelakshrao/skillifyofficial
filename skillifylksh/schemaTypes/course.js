export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'content',
      title: 'Course Pages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'page',
          title: 'Page',
          fields: [
            {
              name: 'title',
              title: 'Page Title',
              type: 'string',
            },
            {
              name: 'blocks',
              title: 'Page Content',
              type: 'array',
              of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } },
                { type: 'code' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'codeBlock',
      title: 'Code Block',
      type: 'code',
      options: {
        language: 'javascript',
        withFilename: false,
      },
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
    },
  ],
};
