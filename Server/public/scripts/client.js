console.log('js')

$(document).ready(onReady);

let operator;

function onReady(){
    $('#plus').on('click', add);
    $('#minus').on('click', subtract);
    $('#times').on('click', multiply);
    $('#divide').on('click', divide);
    $('#clear').on('click', clear);
    $('#equals').on('click', equals);
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
    $('#numberInputOne').val('');
    $('#numberInputTwo').val('');
}

function equals(){
    
    let mathEquation = {
        operator: operator,
        numberInputOne: $('#numberInputOne').val(),
        numberInputTwo: $('#numberInputTwo').val()
    }
    console.log(mathEquation)

    $.ajax({
        url: '/calculator',
        method:'POST',
        data: total
    }).then(function(response){
        console.log('response from calculator:', response);
    })
}