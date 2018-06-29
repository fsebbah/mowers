'use strict';

class ModelMower {

    constructor(mower){
        this.mower = mower;
        this.arrayDirection = ["N","E","S","O"];
        this.recalculetedPosition = null;
    };
    getDeparture (){
        return this.mower.departure.split(' ');
    };

    newPosition (){
        return [this.posXofMover,this.posYofMover,this.direction];
    };

    getSteps (){
        return this.mower.steps.split('');
    };

    getPositionXofMover (){
        return this.posXofMover;
    };

    getPositionYofMover (){
        return this.posYofMover;
    };

    getDirection (){
        return this.direction;
    };

    setPositionXofMover (newPositionX){
        this.posXofMover = newPositionX;
    };

    setPositionYofMover (newPositionY){
        this.posYofMover = newPositionY;
    };

    setDirection (newDirection){
        this.direction = newDirection;
    };

    setPositionXofMoverAdd (){        
        return (this.posXofMover+1 <=5) ? this.posXofMover++ : this.posXofMover;         
    };
    
    setPositionXofMoverMinus (){
        return (this.posXofMover-1 >=0) ? this.posXofMover-- : this.posXofMover;        
    };

    setPositionYofMoverAdd (){
        return (this.posYofMover+1 <=5) ? this.posYofMover++ : this.posYofMover;         
    };

    setPositionYofMoverMinus (){
        return (this.posYofMover-1 >=0) ? this.posYofMover-- : this.posYofMover;        
    };
    
    moveMoverOnTheBoard(){
        this.recalculetedPosition = this.getDeparture();
        for (const characterOfDirection of this.getSteps()){
            this.recalculateMoving(characterOfDirection);
        }
    }

    recalculateMoving(characterOfDirection){
        this.setPositionXofMover(parseInt(this.recalculetedPosition[0]));
        this.setPositionYofMover(parseInt(this.recalculetedPosition[1]));
        this.setDirection(this.recalculetedPosition[2]);
            
        if(characterOfDirection === "G" || characterOfDirection === "D"){
                this.recalculatePosition(characterOfDirection);
                this.recalculetedPosition = this.newPosition();
                return true;
        }
        
        else if (characterOfDirection === "A"){
            this.avancedPosition();
            return true;
        }        
    }
     
    recalculatePosition(word){
        if (word == "D" && this.direction == "O") return this.setDirection("N");
        if (word == "G" && this.direction == "N") return this.setDirection("O");
        return (word ==="G") ? this.setDirection(this.arrayDirection[this.arrayDirection.indexOf(this.direction)-1]) : this.setDirection(this.arrayDirection[this.arrayDirection.indexOf(this.direction)+1]);
    }

    avancedPosition(){
        if (this.direction.toString() === "N") this.setPositionYofMoverAdd();
        if (this.direction.toString() === "S") this.setPositionYofMoverMinus();
        if (this.direction.toString() === "E") {
            this.setPositionXofMoverAdd()
        };
        if (this.direction.toString() === "O") this.setPositionXofMoverMinus();
        this.recalculetedPosition = this.newPosition();
        return true;
    }        
}

module.exports = {
    ModelMower: ModelMower
}