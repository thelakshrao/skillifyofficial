export default {
  name: 'topicNode',
  title: 'Topic Node',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Topic Title',
      type: 'string',
    },
    {
      name: 'children',
      title: 'Sub-Topics',
      type: 'array',
      of: [{ type: 'topicNode' }],
    },
  ],
};
