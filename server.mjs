import express from 'express';
import { resolve } from 'path';

const app = express();
const port = process.env.PORT || 3021;
const rootDir = process.argv[2] || 'public';

// Set public folder as root
app.use(`/`, express.static(resolve(rootDir)));

// Listen for HTTP requests on port 3008
app.listen(port, () => {
  console.log('\x1b[42m%s\x1b[0m', `                                      `);
  console.log('\x1b[42m%s\x1b[0m', `     App on http://localhost:${port}     `);
  console.log('\x1b[42m%s\x1b[0m', `                                      `);
});
