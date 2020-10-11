// Require express - gives us a function
const express = require('express');
// require body-parser to parse through data
const bodyParser = require('body-parser');
// Create an instance of express by calling the function 
// returned above - gives us an object
const app = express();
const port = 5000;

// express static file serving - public is the folder name
app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

function calculation(numberInputOne, numberInputTwo){
    if(operator === "+"){
       total = Number(numberInputOne) + Number(numberInputTwo); 
    }else if(operator === "-"){
        total = Number(numberInputOne) - Number(numberInputTwo);
    }else if (operator === "*"){
        total = Number(numberInputOne) * Number(numberInputTwo);
    }else if (operator === "/"){
        total = Number(numberInputOne) / Number(numberInputTwo);
    }
}

app.listen(port, () => {
    console.log("Up and running on port: ", port);
});