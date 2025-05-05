const express = require('express');
const fs = require('fs');

const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT=3000;

function takeScreenshot() {
  const publicDir = path.join(__dirname,'public');
  const filepath = path.join(publicDir, 'screenshot.png');

  exec(`scrot --overwrite ${filepath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error taking screenshot: ${error.message}`);
    } else {
      console.log(`Screenshot saved to ${filepath}`);
    }
  });
}

setInterval(takeScreenshot, 2000);

app.use(express.static(path.join(__dirname,'public')));

// Home page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><meta http-equiv="refresh" content="2"></head>
      <body>
        <h1>Live Screenshot</h1>
        <img src="/screenshot.png" width="800"/>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

