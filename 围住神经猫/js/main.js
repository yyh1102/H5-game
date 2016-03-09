var stage=new createjs.Stage("stage");
createjs.Ticker.setFPS(5);
createjs.Ticker.addEventListener('tick',stage);

var gameView=new createjs.Container();
stage.addChild(gameView);
gameView.x=30;
gameView.y=30;

var PolystarArr=[[],[],[],[],[],[],[],[],[]];
var MOVE_NONE=-1,MOVE_LEFT= 0,MOVE_LEFT_TOP=1,MOVE_RIGHT_TOP=2,MOVE_RIGHT=3,
    MOVE_RIGHT_BOTTOM=4,MOVE_LEFT_BOTTOM=5;
var currentCat;
var step=0;

function drawMap(){
    for (var indy=0;indy<9;indy++){
        for(var indx=0;indx<9;indx++) {
            var c = new Polystar();
            gameView.addChild(c);
            PolystarArr[indy][indx] = c;
            c.indx = indx;
            c.indy = indy;
            c.x = indy % 2 ? indx * 50 + 25 : indx * 50;
            c.y = indy * 45;

            if (indx == 4 && indy == 3) {
                c.setPolystarType(Polystar.CAT);
                currentCat=c;
            }else
            if(Math.random()<0.1){
                c.setPolystarType(Polystar.SELECTED);
            }

            c.addEventListener('click', clickHandle)
        }
    }
}

function clickHandle(e){
    if(e.target.getPolystarType()==Polystar.UNSELECTED){
        e.target.setPolystarType(Polystar.SELECTED);
    }
    else{
        return;
    }

    if(currentCat.indx==0 || currentCat.indy==0 || currentCat.indx==8 || currentCat.indy==8){
        alert('神经猫跑出去了，游戏结束~');
        window.location.reload();
        return;
    }

    var roadDir=findRoad();
    step++;
    switch (roadDir){
        case MOVE_LEFT:
            PolystarArr[currentCat.indy][currentCat.indx-1].setPolystarType(Polystar.CAT);
            PolystarArr[currentCat.indy][currentCat.indx].setPolystarType(Polystar.UNSELECTED);
            currentCat=PolystarArr[currentCat.indy][currentCat.indx-1];
            break;
        case MOVE_LEFT_TOP:
            PolystarArr[currentCat.indy-1][currentCat.indy%2==1?currentCat.indx:currentCat.indx-1].setPolystarType(Polystar.CAT);
            PolystarArr[currentCat.indy][currentCat.indx].setPolystarType(Polystar.UNSELECTED);
            currentCat=PolystarArr[currentCat.indy-1][currentCat.indy%2==1?currentCat.indx:currentCat.indx-1];
            break;
        case MOVE_RIGHT_TOP:
            PolystarArr[currentCat.indy-1][currentCat.indy%2==0?currentCat.indx:currentCat.indx+1].setPolystarType(Polystar.CAT);
            PolystarArr[currentCat.indy][currentCat.indx].setPolystarType(Polystar.UNSELECTED);
            currentCat=PolystarArr[currentCat.indy-1][currentCat.indy%2==0?currentCat.indx:currentCat.indx+1];
            break;
        case MOVE_RIGHT:
            PolystarArr[currentCat.indy][currentCat.indx+1].setPolystarType(Polystar.CAT);
            PolystarArr[currentCat.indy][currentCat.indx].setPolystarType(Polystar.UNSELECTED);
            currentCat=PolystarArr[currentCat.indy][currentCat.indx+1];
            break;
        case MOVE_RIGHT_BOTTOM:
            PolystarArr[currentCat.indy+1][currentCat.indy%2==0?currentCat.indx:currentCat.indx+1].setPolystarType(Polystar.CAT);
            PolystarArr[currentCat.indy][currentCat.indx].setPolystarType(Polystar.UNSELECTED);
            currentCat=PolystarArr[currentCat.indy+1][currentCat.indy%2==0?currentCat.indx:currentCat.indx+1];
            break;
        case MOVE_LEFT_BOTTOM:
            PolystarArr[currentCat.indy+1][currentCat.indy%2==1?currentCat.indx:currentCat.indx-1].setPolystarType(Polystar.CAT);
            PolystarArr[currentCat.indy][currentCat.indx].setPolystarType(Polystar.UNSELECTED);
            currentCat=PolystarArr[currentCat.indy+1][currentCat.indy%2==1?currentCat.indx:currentCat.indx-1];
            break;
        default :
            alert("你用【"+step+'】步围住了神经猫~');
            window.location.reload();
            break;

    }
}

function findRoad(){

    var distanceMap=[];
    var can;
    var x,y;

    can=true;
    //left
    x=currentCat.indx;
    y=currentCat.indy;
    while(1){
        if(PolystarArr[y][x].getPolystarType()==Polystar.SELECTED){
            can=false;
            distanceMap[MOVE_LEFT]=currentCat.indx-x;
            break;
        }
        x--;
        if(x<0){
            break;
        }
    }
    if(can){
        return MOVE_LEFT;
    }

    can=true;
    //left up
    x=currentCat.indx;
    y=currentCat.indy;
    while(1){
        if(PolystarArr[y][x].getPolystarType()==Polystar.SELECTED){
            can=false;
            distanceMap[MOVE_LEFT_TOP]=currentCat.indy-y;
            break;
        }
        if(y%2==0){
            x--;
        }
        y--;

        if(x<0 || y<0){
            break;
        }
    }
    if(can){
        return MOVE_LEFT_TOP;
    }

    can=true;
    //right up
    x=currentCat.indx;
    y=currentCat.indy;
    while(1){
        if(PolystarArr[y][x].getPolystarType()==Polystar.SELECTED){
            can=false;
            distanceMap[MOVE_RIGHT_TOP]=currentCat.indy-y;
            break;
        }
        if(y%2){
            x++;
        }
        y--;
        if(x>8 || y<0){
            break;
        }
    }
    if(can){
        return MOVE_RIGHT_TOP;
    }

    can=true;
    //right
    x=currentCat.indx;
    y=currentCat.indy;
    while(1){
        if(PolystarArr[y][x].getPolystarType()==Polystar.SELECTED){
            can=false;
            distanceMap[MOVE_RIGHT]=x-currentCat.indx;
            break;
        }
        x++;
        if(x>8){
            break;
        }
    }
    if(can){
        return MOVE_RIGHT;
    }

    can=true;
    //right bottom
    x=currentCat.indx;
    y=currentCat.indy;
    while(1){
        if(PolystarArr[y][x].getPolystarType()==Polystar.SELECTED){
            can=false;
            distanceMap[MOVE_RIGHT_BOTTOM]=y-currentCat.indy;
            break;
        }
        if(y%2){
            x++;
        }
        y++;
        if(x>8 || y>8){
            break;
        }
    }
    if(can){
        return MOVE_RIGHT_BOTTOM;
    }

    can=true;
    //left bottom
    x=currentCat.indx;
    y=currentCat.indy;
    while(1){
        if(PolystarArr[y][x].getPolystarType()==Polystar.SELECTED){
            can=false;
            distanceMap[MOVE_LEFT_BOTTOM]=y-currentCat.indy;
            break;
        }
        if(y%2==0){
            x--;
        }
        y++;
        if(x<0 || y>8){
            break;
        }
    }
    if(can){
        return MOVE_LEFT_BOTTOM;
    }

    //when cat are surronded by Polystars in six directions,
    //to find out the maximum distance between the cat and the Polystar
    var maxDir=-1,maxValue=-1;
    for(var dir=0;dir<distanceMap.length;dir++){
        if(distanceMap[dir]>maxValue){
            maxValue=distanceMap[dir];
            maxDir=dir;
        }
    }

    if(maxValue>1){
        return maxDir;
    }
    else{
        return MOVE_NONE;
    }

}

drawMap();

