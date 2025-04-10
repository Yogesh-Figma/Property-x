const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000'); // Change this to your deployed URL
  await page.screenshot({ path: 'output.png' });

  await browser.close();
})();

