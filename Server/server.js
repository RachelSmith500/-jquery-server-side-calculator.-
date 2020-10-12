// Require express - gives us a function
const express = require('express');
// require body-parser to parse through data
const bodyParser = require('body-parser');
// Create an instance of express by calling the function 
// returned above - gives us an object
const app = express();
const port = 5000;

let math = [];

// express static file serving - public is the folder name
app.use(express.static('server/public'));
//other half of the body-parser
app.use(bodyParser.urlencoded({extended: true}));

//this function is calculating our answers
function calculation(){
    //if our mathOperator is plus then take the index of 0 in the math array, 
    // specifically the numberInputOne plus the numberInput 2 that will be our answer 
    // that is hte first if the rest are the same just different math operators
    if(math[0].mathOperator === "+"){
       math[0].answer = Number(math[0].numberInputOne) + Number(math[0].numberInputTwo); 
    }else if(math[0].mathOperator === "-"){
        math[0].answer = Number(math[0].numberInputOne) - Number(math[0].numberInputTwo);
    }else if (math[0].mathOperator === "*"){
        math[0].answer = Number(math[0].numberInputOne) * Number(math[0].numberInputTwo);
    }else if (math[0].mathOperator === "/"){
        math[0].answer = Number(math[0].numberInputOne) / Number(math[0].numberInputTwo);
    }
}
//this is our app.get
app.get('/calculator', function(req, res){
    console.log('we are getting the GET /calculator', math.answer);
    res.send(math);
});

app.post('/calculator', (req, res) => {
    let newestCalculation = req.body;
  
    console.log('here is the new calculation', newestCalculation);
    math.unshift(newestCalculation);
    calculation();
    console.log('after calculation', math);
    res.sendStatus(201);
});

app.listen(port, () => {
    console.log("Up and running on port: ", port);
});