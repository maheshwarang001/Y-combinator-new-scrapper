const logfunction = require("./log");


// function to scrape elements from a page
async function scrapeElements(page) {
    logfunction("Scape Element" , "Scrape function initiated");
  
    return await page.evaluate(() => {
      // Select all elements with the parent class 'athing'
      const items = document.querySelectorAll('.athing');
      let data = [];
    

      // Iterate over the first 10 elements and Covered edge case of elements less than 10
      for (let i = 0; i <= Math.min(items.length - 1, 9); i++) {
        const item = items[i];

        // find the element with the class 'titleline' within the current item
        const titleLineElement = item.querySelector('.titleline');

        // Find the anchor element
        const linkElement = titleLineElement.querySelector('a');

        //Extract the link from anchor element
        const url = linkElement.href;

        //Extract the title text from anchor element
        const title = linkElement.textContent.trim();

        // If both URL and title are not null -> add them as a object to the data array
        if (url !== null && title !== null) {
          data.push({title, url});
        }
      }
  
      return data;
    });
}

module.exports = scrapeElements;