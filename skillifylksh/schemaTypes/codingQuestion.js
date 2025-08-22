export default {
  name: 'codingQuestion',
  title: 'Coding Question',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Problem Description',
      type: 'text',
    },
    {
      name: 'inputFormat',
      title: 'Input Format (optional)',
      type: 'text',
    },
    {
      name: 'expectedOutput',
      title: 'Expected Output',
      type: 'text',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'js' },
          { title: 'Python', value: 'py' },
          { title: 'C++', value: 'cpp' },
        ],
      },
    },
  ],
}
