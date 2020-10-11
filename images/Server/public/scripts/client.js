console.log('js')

$(document).ready(onReady);

let operator;

function onReady(){
    $('#plus').on('click', add);
    $('#minus').on('click', subtract);
    $('#times').on('click', multiply);
    $('#divide').on('click', divide);
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