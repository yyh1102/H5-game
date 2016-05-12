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
                GAME.slide(e.keyCode);
            }
        }
    },
    createBlock:function(){
        var blk=new Block(),
            x,y;
        this.blkArr.push(blk);
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
        var prev=prevBlock.block.innerHTML;
        var curr=currBlock.block.innerHTML;
        if(prev==curr){
            currBlock.setNumber(curr * 2);
            this.map[prevBlock.y][prevBlock.x]=0;
            this.stage.removeChild(prevBlock.block);
        }
    },
    slide:function(keycode){
        var i, j, k;
        if(keycode==37){//Left
            for(i=0;i<4;i++){
                k=0;
                for(j=0;j<3;j++){
                    if(this.map[i][j]==0){
                        if(k==0) k=j+1;
                        while(this.map[i][k]==0 && k<4 && k++);
                        if(k==4) break;
                        this.map[i][k].translate(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
                for(j=0;j<3;j++){
                    if(this.map[i][j]!=0 && this.map[i][j+1]!=0){
                        this.merge(this.map[i][j+1],this.map[i][j]);
                    }
                }
            }
        }
        if(keycode==38){//Top
            for(j=0;j<4;j++){
                k=0;
                for(i=0;i<3;i++){
                    if(this.map[i][j]==0){
                        if(k==0) k=j+1;
                        while(this.map[i][k]==0 && k<4 && k++);
                        if(k==4) break;
                        this.map[i][k].translate(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
                for(i=0;i<3;i++){
                    if(this.map[i][j]!=0 && this.map[i+1][j]!=0){
                        this.merge(this.map[i+1][j],this.map[i][j]);
                    }
                }
            }
        }
        if(keycode==39){//Right

        }
        if(keycode==40){//Down

        }
        this.createBlock();
    }
};
GAME.init();

