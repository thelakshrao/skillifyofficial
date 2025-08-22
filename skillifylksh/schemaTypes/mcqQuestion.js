export default {
  name: 'mcqQuestion',
  title: 'MCQ Question',
  type: 'object',
  fields: [
    {
      name: 'question',
      title: 'Question Text',
      type: 'text',
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.length(4),
    },
    {
      name: 'correctAnswer',
      title: 'Correct Option (1 to 4)',
      type: 'number',
      validation: Rule => Rule.min(1).max(4),
    },
  ],
}
