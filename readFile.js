'use strict';
const fs = require('fs');
const path = require('path');
const file = 'input.txt';
let arrayBoard = [];
 
function fillContent(){
    let mowers = [];
    let mower = {};
    let i = 0;
    let j = 0;
    let dimensionArray;
    fs
    .readFileSync(path.join(__dirname,file))
    .toString()
    .split(/\r?\n/)
    .forEach(function(line){
        if(i===0) {
            dimensionArray = line;
        }
        else{
            (j===0) ? mower.departure = line : mower.steps = line;
            j++;            
        }
        i++;
        if(j === 2) {
            mowers.push(mower);
            mower = {};
            j = 0;
        }
    });
    return [dimensionArray,mowers];
}

function createBoard(limitBoard){
    const [posX,posY] = limitBoard.split(' ');
    for (let x = 0; x <= posX ; x++){
        for (let y = 0 ; y <= posY ; y++){
            arrayBoard.push({x,y,isFilled:false});
        }
    }
    return arrayBoard;
}

module.exports = {
    fillContent:fillContent,
    createBoard: createBoard    
}
