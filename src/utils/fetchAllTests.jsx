import sanityClient from "../lib/sanityClient";

const fetchAllTests = async () => {
  const query = `
    *[_type == "testSet"]{
      _id,
      title,
      subject,
      description,
      duration
    }
  `;
  const data = await sanityClient.fetch(query);
  return data;
};

export default fetchAllTests;
