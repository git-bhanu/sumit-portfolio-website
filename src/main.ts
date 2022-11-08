import { createClient } from "contentful"

// This is a test integration and these tokens will be moved to ENV file.
const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE || '',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN || ''
});

client.getEntry('5KBaKfSYX4wm0OqOFmyRS1')
.then(entry => {
  console.log(entry);
});