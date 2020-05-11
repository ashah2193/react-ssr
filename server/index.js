import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build'));

app.get('/*', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    const document = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
    return res.send(document);
  });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});