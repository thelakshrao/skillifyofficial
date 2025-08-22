import { urlFor } from "../sanity";

export const myPortableTextComponentsLight = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-teal-600 mb-3 mt-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-teal-500 mb-2 mt-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 text-gray-700 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 text-gray-700 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-teal-700">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-600">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 text-teal-600 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset?._ref
        ? urlFor(value).url()
        : value?.asset?.url;

      return imageUrl ? (
        <img
          src={imageUrl}
          alt={value.alt || "Course image"}
          className="my-6 rounded-lg border border-gray-300 shadow-md w-full max-w-3xl mx-auto"
        />
      ) : null;
    },
    code: ({ value }) => (
      <div className="relative my-6 bg-gray-100 border border-gray-300 rounded-lg p-4 text-sm font-mono text-black overflow-x-auto">
        <button
          onClick={() => navigator.clipboard.writeText(value.code)}
          className="absolute top-2 right-2 bg-teal-600 hover:bg-teal-700 text-white px-2 py-1 rounded text-xs"
        >
          Copy
        </button>
        <pre className="whitespace-pre-wrap">{value.code}</pre>
      </div>
    ),
  },
};


export const myPortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-white mb-4 mt-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-teal-400 mb-3 mt-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-teal-300 mb-2 mt-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 text-gray-300 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 text-gray-300 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-teal-400">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-400">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-800 text-teal-400 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset?._ref
        ? urlFor(value).url()
        : value?.asset?.url;

      return imageUrl ? (
        <img
          src={imageUrl}
          alt={value.alt || "Course image"}
          className="my-6 rounded-lg border border-gray-700 shadow-lg w-full max-w-3xl mx-auto"
        />
      ) : null;
    },
    code: ({ value }) => (
      <div className="relative my-6 bg-[#1e1e2f] border border-gray-700 rounded-lg p-4 text-sm font-mono text-white overflow-x-auto">
        <button
          onClick={() => navigator.clipboard.writeText(value.code)}
          className="absolute top-2 right-2 bg-teal-600 hover:bg-teal-700 text-white px-2 py-1 rounded text-xs"
        >
          Copy
        </button>
        <pre className="whitespace-pre-wrap">{value.code}</pre>
      </div>
    ),
  },
};
