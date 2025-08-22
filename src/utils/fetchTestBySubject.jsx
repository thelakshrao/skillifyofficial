// fetchTestBySubject.js
import sanityClient from "../lib/sanityClient";

const fetchTestBySubject = async (subject) => {
  const query = `
    *[_type == "testSet" && subject match $subject + "*"][0]{
      title,
      subject,
      description,
      duration,
      "mcqs": mcqs[0...100],
      "codingQuestions": codingQuestions[0...100]
    }
  `;

  const params = { subject };
  const data = await sanityClient.fetch(query, params);

  if (!data) {
    console.warn("No test found for subject:", subject);
    return null;
  }

  const shuffledMCQs = (data.mcqs || []).sort(() => 0.5 - Math.random()).slice(0, 25);
  const shuffledCoding = (data.codingQuestions || []).sort(() => 0.5 - Math.random()).slice(0, 5);

  return {
    ...data,
    mcqs: shuffledMCQs,
    codingQuestions: shuffledCoding,
  };
};

export default fetchTestBySubject;
