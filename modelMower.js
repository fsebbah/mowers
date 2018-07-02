'use strict';

class ModelBoard{
    constructor(limitBoard){
        this.limitBoard = limitBoard;
    }

    getlimitBoard(){
        return this.limitBoard;
    } 
    getRightBoard(){
        return this.topRightBoard;
    }

    getLeftBoard(){
        return this.topLeftBoard;
    }

    getBoard(){
        return this.arrayBoard;
    }

    setRightBoard(){
        return this.topRightBoard = this.getlimitBoard().split(' ')[1];;
    }

    setLeftBoard(){
        return this.topLeftBoard = this.getlimitBoard().split(' ')[0];
    }

    setCreateBoard(){        
        const [posX,posY] = this.getlimitBoard().split(' ');
        const tmpBoard = [];
        for (let x = 0; x <= posX ; x++){
            for (let y = 0 ; y <= posY ; y++){
                tmpBoard.push({x,y,isFilled:false});
            }
        }
        return tmpBoard;
    }

}

class ModelMower {

    constructor(mower){
        this.mower = mower;
        this.arrayDirection = ["N","E","S","O"];
        this.oldPosition = null;
        this.recalculetedPosition = null;
        this.minusLeftBoard = 0;
        this.minusRightBoard = 0;
    };

    getDeparture (){
        return this.mower.departure.split(' ');
    };

    setNewPosition (){
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
        return (this.posXofMover+1 <= this.leftBoard) ? this.posXofMover++ : this.posXofMover;         
    };
    
    setPositionXofMoverMinus (){
        return (this.posXofMover-1 >= this.minusLeftBoard) ? this.posXofMover-- : this.posXofMover;        
    };

    setPositionYofMoverAdd (){
        return (this.posYofMover+1 <= this.rightBoard) ? this.posYofMover++ : this.posYofMover;         
    };

    setPositionYofMoverMinus (){
        return (this.posYofMover-1 >= this.minusRightBoard) ? this.posYofMover-- : this.posYofMover;        
    };
    
    moveMoverOnTheBoard(){
        this.recalculetedPosition = this.getDeparture();
        for (const characterOfDirection of this.getSteps()){
            this.oldPosition = this.recalculetedPosition;
            this.recalculateMoving(characterOfDirection);
            this.changeStateofCase();
        }
    }

    recalculateMoving(characterOfDirection){
        this.setPositionXofMover(parseInt(this.recalculetedPosition[0]));
        this.setPositionYofMover(parseInt(this.recalculetedPosition[1]));
        this.setDirection(this.recalculetedPosition[2]);
            
        if(characterOfDirection === "G" || characterOfDirection === "D"){
                this.recalculatePosition(characterOfDirection);
                this.recalculetedPosition = this.setNewPosition();
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
        if (this.direction.toString() === "E") this.setPositionXofMoverAdd();
        if (this.direction.toString() === "O") this.setPositionXofMoverMinus();
        this.recalculetedPosition = this.setNewPosition();
        return true;
    }

    searchValueOfFillCurrent(){
        return this.arrayBoard
            .filter(x => x.x == this.getPositionXofMover())
            .filter(x => x.y == this.getPositionYofMover())
            .map(elt => elt.isFilled)
            .join()
    }

    searchValueOfFillOld(){
        return this.arrayBoard
            .filter(x => x.x == this.oldPosition[0])
            .filter(x => x.y == this.oldPosition[1])
            .map(elt => elt.isFilled)
        .join()
    }

    changeFilledofOldPosition(){
        this.arrayBoard[
            this.arrayBoard
            .findIndex(obj => obj.x == this.oldPosition[0] && obj.y == this.oldPosition[1])
        ].isFilled = false
    }

    changeFilledofCurrentPosition(){
        this.arrayBoard[
            this.arrayBoard
            .findIndex(obj => obj.x == this.recalculetedPosition[0] && obj.y == this.recalculetedPosition[1])
        ].isFilled = true
    }

    changeStateofCase(){
        this.changeFilledofOldPosition()
        if(this.searchValueOfFillCurrent() === "false"){
            this.changeFilledofCurrentPosition();
        }
        else{            
            while(this.searchValueOfFillCurrent() === "true"){
                console.log('Attente de liberation de la case');
            }
            this.changeFilledofCurrentPosition();
        }        
    }
}

module.exports = {
    ModelBoard: ModelBoard,
    ModelMower: ModelMower
}