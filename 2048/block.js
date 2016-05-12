function Block(){
    this.position=function(x,y){
        this.x=x;
        this.y=y;
        this.block.style.marginLeft=x*(this.width+this.offset)+"px";
        this.block.style.marginTop=y*(this.height+this.offset)+"px";
    };
    this.create=function(x,y){
        var nwBlock=document.createElement("div");
        nwBlock.className="block";
        this.block=nwBlock;
        this.width=this.height=150;
        this.x=x;
        this.y=y;
        this.offset=7;
        this.transTime=50;
        this.position(x,y);
        this.setNumber();
        GAME.stage.appendChild(nwBlock);
    };
    this.translate=function(tx,ty) {
        if(tx>3 || ty>3) return;
        var ox=this.x,
            oy=this.y,
            that=this,
            offsetX = tx - ox,
            offsetY = ty - oy,
            speedX = offsetX / this.transTime,
            speedY = offsetY / this.transTime;
        var tran = setInterval(function () {
            ox += speedX;
            oy += speedY;
            that.position(ox,oy);
            if (ox >= tx && oy >= ty) {
                that.position(tx,ty);
                clearInterval(tran);
            }
        }, 1);
    };
    this.setNumber=function(){
        console.log(arguments[0])
        if(arguments[0]){
            return this.block.innerHTML=arguments[0];
        }
        var rand=Math.random();
        this.number=rand<=0.6?2:4;
        this.block.innerHTML=this.number;
    };
    this.setTransTime=function(time){
        this.transTime=time;
    };
}
