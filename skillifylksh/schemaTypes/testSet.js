export default {
  name: 'testSet',
  title: 'Test Set',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Test Title',
      type: 'string',
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'duration',
      title: 'Duration (in minutes)',
      type: 'number',
    },
    {
      name: 'mcqs',
      title: 'MCQ Questions',
      type: 'array',
      of: [{ type: 'mcqQuestion' }],
    },
  ],
};
