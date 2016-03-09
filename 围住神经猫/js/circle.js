function Polystar(){
    createjs.Shape.call(this);
    this.setPolystarType=function(type){
        switch (type){
            case Polystar.UNSELECTED:
                this.setColor('#cccccc');
                break;
            case Polystar.SELECTED:
                this.setColor('#ff6600');
                break;
            case Polystar.CAT:
                this.setColor('#00ff00');
                break;
        }

        this._PolystarType=type;
    }

    this.getPolystarType=function(){
        return this._PolystarType;
    }

    this.setColor=function(color){
        this.graphics.beginFill(color);
        this.graphics.drawPolyStar(0,0,25,6,0,30);
        this.graphics.endFill();
    }

    this.setPolystarType(Polystar.UNSELECTED);
}

Polystar.prototype=new createjs.Shape();
Polystar.UNSELECTED=0;
Polystar.SELECTED=1;
Polystar.CAT=2;