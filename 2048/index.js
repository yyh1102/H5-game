var GAME={
    stage:document.getElementById("stage"),
    map:[],
    blkArr:[],
    maxNum:0,
    score:0,
    isKeyDown:0,
    init:function(){
        this.map=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        this.createBlock();
        this.createBlock();
        this.createBlock();
        window.onkeydown=function(event){
            if(GAME.isKeyDown) return;
            var e=event||window.event;
            if(e){
                GAME.isKeyDown=1;
                GAME.slide(e.keyCode);
            }
        };
        window.onkeyup=function(){
            GAME.isKeyDown=0;
        };
        setInterval(function(){
            var score=document.getElementById("score");
            score.innerHTML=GAME.score;
        })
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
        //console.log(prev,curr);
        if(prev==curr){
            var prevx=prevBlock.x,
                prevy=prevBlock.y;
            prevBlock.position(currBlock.x,currBlock.y);
            currBlock.setNumber(curr * 2);
            prevBlock.block.style.zIndex=-1;
            this.map[prevy][prevx]=0;
            this.score+=curr*2;
            setTimeout(function(){
                this.stage.removeChild(prevBlock.block);
                delete prevBlock;
            },300);
        }
    },
    slide:function(keycode){
        var i, j, k;
        if(keycode==37){//Left
            for(i=0;i<4;i++){
                k=0;
                for(j=0;j<3;j++){//所有块先移动
                    if(this.map[i][j]==0){
                        if(k==0) k=j+1;
                        while(k<4 && this.map[i][k]==0 && k++);
                        if(k==4) break;
                        this.map[i][k].position(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
                for(j=0;j<3;j++){//相邻等值块合并
                    if(this.map[i][j]!=0 && this.map[i][j+1]!=0) {
                        this.merge(this.map[i][j + 1], this.map[i][j]);
                    }
                }
                k=0;
                for(j=0;j<3;j++){//消除合并后可能产生的空块
                    if(this.map[i][j]==0){
                        if(k==0) k=j+1;
                        while(k<4 && this.map[i][k]==0 && k++);
                        if(k==4) break;
                        this.map[i][k].position(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
            }
        }
        if(keycode==38){//Top
            for(i=0;i<4;i++){
                k=0;
                for(j=0;j<3;j++){//所有块先移动
                    if(this.map[j][i]==0){
                        if(k==0) k=j+1;
                        while(k<4 && this.map[k][i]==0 && k++);
                        if(k==4) break;
                        this.map[k][i].position(i,j);
                        this.map[j][i]=this.map[k][i];
                        this.map[k][i]=0;
                    }
                }
                for(j=0;j<3;j++){//相邻等值块合并
                    if(this.map[j][i]!=0 && this.map[j+1][i]!=0) {
                        this.merge(this.map[j+1][i], this.map[j][i]);
                    }
                }
                k=0;
                for(j=0;j<3;j++){//消除合并后可能产生的空块
                    if(this.map[j][i]==0){
                        if(k==0) k=j+1;
                        while(k<4 && this.map[k][i]==0 && k++);
                        if(k==4) break;
                        this.map[k][i].position(i,j);
                        this.map[j][i]=this.map[k][i];
                        this.map[k][i]=0;
                    }
                }
            }
        }
        if(keycode==39){//Right
            for(i=0;i<4;i++){
                k=3;
                for(j=3;j>=1;j--){//所有块先移动
                    if(this.map[i][j]==0){
                        if(k==3) k=j-1;
                        while(k>=0 && this.map[i][k]==0 && k--);
                        if(k==-1) break;
                        this.map[i][k].position(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
                for(j=3;j>=1;j--){//相邻等值块合并
                    if(this.map[i][j]!=0 && this.map[i][j-1]!=0) {
                        this.merge(this.map[i][j-1], this.map[i][j]);
                    }
                }
                k=3;
                for(j=3;j>=1;j--){//消除合并后可能产生的空块
                    if(this.map[i][j]==0){
                        if(k==3) k=j-1;
                        while(k>=0 && this.map[i][k]==0 && k--);
                        if(k==-1) break;
                        this.map[i][k].position(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
            }
        }
        if(keycode==40){//Down
            for(i=0;i<4;i++){
                k=3;
                for(j=3;j>=1;j--){//所有块先移动
                    if(this.map[j][i]==0){
                        if(k==3) k=j-1;
                        while(k>=0 && this.map[k][i]==0 && k--);
                        if(k==-1) break;
                        this.map[k][i].position(i,j);
                        this.map[j][i]=this.map[k][i];
                        this.map[k][i]=0;
                    }
                }
                for(j=3;j>=1;j--){//相邻等值块合并
                    if(this.map[j][i]!=0 && this.map[j-1][i]!=0) {
                        this.merge(this.map[j-1][i], this.map[j][i]);
                    }
                }
                k=3;
                for(j=3;j>=1;j--){//消除合并后可能产生的空块
                    if(this.map[j][i]==0){
                        if(k==3) k=j-1;
                        while(k>=0 && this.map[k][i]==0 && k--);
                        if(k==-1) break;
                        this.map[k][i].position(i,j);
                        this.map[j][i]=this.map[k][i];
                        this.map[k][i]=0;
                    }
                }
            }
        }
        if(keycode<=40 && keycode>=36) {
            setTimeout(function () {
                GAME.createBlock();
                var numOfBlock = 0;
                for (i = 0; i < 4; i++) {
                    for (j = 0; j < 4; j++) {
                        if (GAME.map[i][j] != 0){
                            numOfBlock++;
                            if(GAME.map[i][j].block.innerHTML>GAME.maxNum){
                                GAME.maxNum=GAME.map[i][j].block.innerHTML
                            }
                        }
                    }
                }
                //console.log(numOfBlock)
                if (numOfBlock == 16) {
                    alert("游戏结束!");
                    window.location.reload();
                }
            }, 300)
        }
    }
};
GAME.init();

