const logfunction = require("./log");
const fs = require('fs');


const csv = async(data)=>{

    try{

        //Set CSV content with header row
        let csvContent = 'Title,URL\n'; 

        //Iterate through data 
        data.forEach(item => {
            //insert item's title and URL to CSV content        
            csvContent += `"${item.title}","${item.url}"\n`;
        });

        // Write CSV string to file
        fs.writeFileSync('output.csv', csvContent);

        //Log
        logfunction("CSV " , "Saved in CSV.... /output.csv ")

    }catch(err){
        //throw error
        logfunction("CSV ERR", err);
        throw err;
    }

   

}

module.exports = csv;



 
