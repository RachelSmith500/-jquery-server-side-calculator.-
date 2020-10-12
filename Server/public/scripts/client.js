$(document).ready(onReady);
//global variable called operator
let operator;
//this is our onReady function. It runs everything on page load
//it contains all of our click listeners 
//it also calls our getTotal function 
function onReady(){
    console.log('jquery loaded')
    $('#plus').on('click', add);
    $('#minus').on('click', subtract);
    $('#times').on('click', multiply);
    $('#divide').on('click', divide);
    $('#clear').on('click', clear);
    $('#equals').on('click', equals);
    getTotal();
}
//our add operator function 
function add(){
    operator = "+";
}
//our subtract operator function 
function subtract(){
    operator ="-";
}
//our multiply function 
function multiply(){
    operator ="*";
}
//our divide function 
function divide(){
    operator ="/";
}
//our clear function - clears input values
function clear(){
    $('#numberInputOne').val(''),
    $('#numberInputTwo').val('')
}
//this is our equal function it grabs the input values and stores them in an object 
//it also assigns keys to the inputs 
//this function also contains our post route - 
//it will send our new data to the calculator url via the ajax method
function equals(){
    let mathEquation = {
        mathOperator: operator,
        numberInputOne: $('#numberInputOne').val(),
        numberInputTwo: $('#numberInputTwo').val(),
        answer: null
    }
    console.log(mathEquation)

    $.ajax({
        url: '/calculator',
        method:'POST',
        data: mathEquation
    }).then(function(response){
        console.log('response from calculator:', response);
        getTotal();
    }).catch(function(error){
        alert(error)
    })
}
//first getTotal is emptying out the dOM specifically where the equationOutput id is
//ajax method is telling the server to get the data that is at the /calculator address
//then a for loop is used to loop over the math array and append the equations to the DOM 
//Next the DOM is emptied of the answer id field
//then the answer alone is appended to the DOM 
//the .catch throws an error if there is one.
function getTotal(){
    $('#equationOutput').empty();
    $.ajax({
        method: 'GET',
        url:'/calculator'
    }).then(function(response){
        console.log('answer coming back from server', response.answer);
         for (let i = 0; i < response.length; i++) {
            let mathTotal = response[i];
            $('#equationOutput').append(`
                <ul>
                    <li>${mathTotal.numberInputOne} ${mathTotal.mathOperator} ${mathTotal.numberInputTwo} = ${mathTotal.answer}</li>
                </ul>    
            `);
        }
        $('#answer').empty();
        $('#answer').append(`<p>${response[0].answer}</p>`)
    }).catch(function(error){
        alert(error)
    })
}

