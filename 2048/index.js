var GAME={
    stage:document.getElementById("stage"),
    map:[],
    blkArr:[],
    init:function(){
        this.map=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        this.createBlock();
        this.createBlock();
        this.createBlock();
        window.onkeydown=function(event){
            var e=event||window.event;
            if(e){
                this.slide(e.keyCode);
            }
        }
    },
    createBlock:function(){
        var blk=new Block(),
            x,y;
        blkArr.push(blk);
        x=Math.floor(Math.random()*4);
        y=Math.floor(Math.random()*4);
        while(this.map[y][x]!=0 || x==4 || y==4){
            x=Math.floor(Math.random()*4);
            y=Math.floor(Math.random()*4);
        }
        blk.create(x,y);
        this.map[y][x]=blk;
    },
    merge:function(prevBlock,currBlock){
        var prev=prevBlock.innerHTML;
        var curr=currBlock.innerHTML;
        if(prev==curr){
            currBlock.setNumber(curr * 2);
            this.map[prevBlock.y][prevBlock.x]=0;
            this.stage.removeChild(prevBlock);
        }
    },
    slide:function(keycode){
        if(keycode==37){//Left

        }
        if(keycode==38){//Top

        }
        if(keycode==39){//Right

        }
        if(keycode==40){//Down

        }
    }
}
