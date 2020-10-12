// Require express - gives us a function
const express = require('express');
// require body-parser to parse through data
const bodyParser = require('body-parser');
// Create an instance of express by calling the function 
// returned above - gives us an object
const app = express();
//this is the port where my server will live 
const port = 5000;
//global variable array 
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
//this is our app.get request
//we are sending our math array across to our client
app.get('/calculator', function(req, res){
    console.log('we are getting the GET /calculator', math.answer);
    res.send(math);
});

//app.post is sending back a response to the client
//we are pushing our latest math array into req.body so we can send it across to the lcient 
//then the calculation function is called 
//finally a status is sent of 201
app.post('/calculator', (req, res) => {
    let newestCalculation = req.body;
    console.log('here is the new calculation', newestCalculation);
    math.unshift(newestCalculation);
    calculation();
    console.log('after calculation', math);
    res.sendStatus(201);
});

//pass in the port, fire off an anonymous function, this will keep the port of 5000 open for us
app.listen(port, () => {
    console.log("Up and running on port: ", port);
});