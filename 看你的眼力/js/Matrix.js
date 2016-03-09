var stage=new createjs.Stage('stage');
var gameView=new createjs.Container();
stage.addChild(gameView);
createjs.Ticker.setFPS(10);
createjs.Ticker.addEventListener('tick',stage);

var n=2;
var colorArr=['#142300','#843200','#912310','#210340','#273210','#598220',
    '#698230','#874640','#617210','#803410','#703210','#322430','#776620',
    '#764410','#881140','#677610','#993310','#192910','#762310','#666640',
    '#981710','#817720','#776210']
var gates=0;
var time=60;

function addRect(){
    var cl=parseInt(Math.random()*colorArr.length);
    var x=parseInt(Math.random()*n);
    var y=parseInt(Math.random()*n);
    for(var indx=0;indx<n;indx++){
        for(var indy=0;indy<n;indy++){
            var r=new Rect(n,colorArr[cl]);
            if(indx==x && indy==y){
                r.setRectType(2);
                r.addEventListener('click',function(){
                    ++n;
                    gates++;
                    gameView.removeAllChildren();
                    addRect();
                })
            }
            r.x=indx*400/n;
            r.y=indy*400/n;
            gameView.addChild(r);
        }
    }
}
addRect();

$(document).ready(function(){
    $(".time").html(time);
    var s=setInterval(function(){
        time--;
        $(".time").html(time);
        if(time<=0){
            clearInterval(s);
            alert("时间到！你一共闯过了【"+gates+"】关！");
            window.location.reload();
        }
    },1000);
})