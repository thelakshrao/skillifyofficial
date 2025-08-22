import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "kx554dip",  
  dataset: "production", 
  useCdn: true,
  apiVersion: "2023-07-01",
});

export default sanityClient;
