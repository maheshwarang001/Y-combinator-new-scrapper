// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const logfunction = require("./src/log");
const scrapeElements = require("./src/scrape");
const csv = require("./src/csv");

// Commands to run the code
// To install node modules - npm i 
// To run index.js - npm start

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try{

    //Navigate to source page
    //timeout after 2 minutes
    await page.goto("https://news.ycombinator.com", {timeout : 2 * 60 * 2000} ) ;

    //Log navigate successful
    logfunction("Page Navigated", "Link : https://news.ycombinator.com");

    //scape data from the page {title,url}
    const structured_data = await scrapeElements(page);
    logfunction(`Data scrapped ${structured_data.length}:`,structured_data);

    //save the scrapped data in CSV
    //install CSV viewer to view CSV file -> ./output.csv
    await csv(structured_data);


  }catch(err){

    //Log errors
    logfunction("Error Navigating", err);

  }
  finally{

    //close the browser
    await browser.close().then(logfunction("Exited", "Browswe Aborted"));

  }
  
}

(async () => {
  //initialise the Function
  await saveHackerNewsArticles();
})();
