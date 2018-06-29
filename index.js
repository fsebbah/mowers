'use strict';
const fillContent = require('./readFile').fillContent;
const createBoard = require('./readFile').createBoard;
const ModelMower = require('./modelMower').ModelMower;

/**
 *  Lecture du fichier
 *  Définition des limites du tableaux
 * Définition des val max de l'axe des X et Y
 */
const [limitBoard, mowers] = fillContent();
/**
 * Remplissage du tableau
 */

let arrayBoard = createBoard(limitBoard);
//console.log(`arrayBoard 1 ${JSON.stringify(arrayBoard)}`);


for(const mower of mowers){
    /**
     * On positionne la tondeuse sur le board, on ne vérifie pas qu'il y en a 2 sur la même case sinon c'est plus cher ;-).
     * On lit caractere par caractére pour faire avancer la tondeuse
     * On vrifie que la case n'est pas déjà remplie
     * On checke la case
     */
    const mowerObject = new ModelMower(mower);
    console.log(`Ètapes : ${mowerObject.getSteps()}`);
    console.log(`Départ :  ${mowerObject.getDeparture()}`);
    mowerObject.moveMoverOnTheBoard();
    console.log(`Arrivée :  ${mowerObject.recalculetedPosition}`);
}
