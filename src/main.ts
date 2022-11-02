import { createClient } from "contentful"

// This is a test integration and these tokens will be moved to ENV file.
const client = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "95q77usk8v4x",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "VjwnbCFa9o56oT8qL8O53hueE_5Vig35E_fhnP2EI6E"
});

client.getEntry('5KBaKfSYX4wm0OqOFmyRS1')
.then(entry => {
  console.log(entry);
});