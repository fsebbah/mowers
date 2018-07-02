'use strict';
const fillContent = require('./readFile').fillContent;
const ModelBoard = require('./modelMower').ModelBoard;
const ModelMower = require('./modelMower').ModelMower;

/**
 *  Lecture du fichier
 *  Définition des limites du tableaux
 * Définition des val max de l'axe des X et Y
 * Création de l'objet mowersObject
 */
const [limitBoard, mowers] = fillContent();
const modelBoard = new ModelBoard(limitBoard);
const arrayBoard = modelBoard.setCreateBoard();
modelBoard.setLeftBoard();
modelBoard.setRightBoard();
const leftBoard = modelBoard.setLeftBoard();
const rightBoard = modelBoard.setRightBoard();

/**
 * Remplissage du tableau des cases remplies ou non
 */
    /**
     * On positionne la tondeuse sur le board, on ne vérifie pas qu'il y en a 2 sur la même case sinon c'est plus cher ;-).
     * On lit caractere par caractére pour faire avancer la tondeuse
     * On vrifie que la case n'est pas déjà remplie
     * On checke la case
     */

for(const mower of mowers){
    const mowerObject = new ModelMower(mower);
    mowerObject.arrayBoard = arrayBoard;
    mowerObject.leftBoard = leftBoard;
    mowerObject.rightBoard = rightBoard;
    mowerObject.moveMoverOnTheBoard();

    console.log(`
        Départ mower : ${mowers.findIndex(obj => obj ==mower)} - position : ${mowerObject.getDeparture()}
        Ètapes : ${mowerObject.getSteps()}
        Arrivée mower : ${mowers.findIndex(obj => obj ==mower)} - position : ${mowerObject.recalculetedPosition}
    `);
}
