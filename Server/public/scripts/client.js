$(document).ready(onReady);

let operator;

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

function add(){
    operator = "+";
}

function subtract(){
    operator ="-";
}

function multiply(){
    operator ="*";
}

function divide(){
    operator ="/";
}

function clear(){
    $('#numberInputOne').val(''),
    $('#numberInputTwo').val('')
}

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

// ${mathTotal.answer}