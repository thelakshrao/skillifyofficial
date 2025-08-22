export default {
  name: 'roadmap',
  title: 'Roadmap',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Roadmap Title',
      type: 'string',
    },
    {
      name: 'levels',
      title: 'Levels',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Level',
          fields: [
            {
              name: 'levelName',
              title: 'Level Name',
              type: 'string',
              options: {
                list: ['Beginner', 'Intermediate', 'Advanced'],
              },
            },
            {
              name: 'topics',
              title: 'Topics',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    },
  ],
};
