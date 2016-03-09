function Rect(n,color){
    createjs.Shape.call(this);
    this.setRectType=function(type){
        this._rectType=type;
        switch(type){
            case 1:
                this.setColor(color);
                break;
            case 2:
                color=color.replace('#','');
                color=parseInt(color);
                color+=10;
                color='#'+color;
                console.log(color);
                this.setColor(color);
                break;
        }
    }

    this.setColor=function(color){
        this.graphics.beginFill(color);
        this.graphics.drawRect(0,0,400/n-5,400/n-5);
        this.graphics.endFill();
    }

    this.getRectType=function(){
        return this._rectType;
    }

    this.setRectType(1);
}

Rect.prototype=new createjs.Shape();
