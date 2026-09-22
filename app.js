const c=document.getElementById("robot"),ctx=c.getContext("2d");
const $=id=>document.getElementById(id);
const base=$("base"),shoulder=$("shoulder"),elbow=$("elbow"),grip=$("grip");
let demoTimer=null,saved=[]; const rad=d=>d*Math.PI/180;
function line(x1,y1,x2,y2,w=18,color="#55bfff"){ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
function joint(x,y,r=13){ctx.fillStyle="#f3f8ff";ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.fillStyle="#397fff";ctx.beginPath();ctx.arc(x,y,r/2,0,Math.PI*2);ctx.fill()}
function draw(){
 const b=+base.value,a1=+shoulder.value+b*.15,a2=+elbow.value;
 $("baseVal").textContent=b+"°";$("shoulderVal").textContent=shoulder.value+"°";$("elbowVal").textContent=elbow.value+"°";$("gripVal").textContent=grip.value+"%";
 ctx.clearRect(0,0,c.width,c.height);ctx.strokeStyle="#102038";ctx.lineWidth=1;
 for(let x=20;x<c.width;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,c.height);ctx.stroke()}
 for(let y=20;y<c.height;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(c.width,y);ctx.stroke()}
 const ox=360,oy=475,L1=190,L2=160,t1=rad(-a1),t2=rad(-(a1+a2));
 const x1=ox+L1*Math.cos(t1),y1=oy+L1*Math.sin(t1),x2=x1+L2*Math.cos(t2),y2=y1+L2*Math.sin(t2);
 ctx.fillStyle="#26354c";ctx.fillRect(275,482,170,28);ctx.fillRect(315,445,90,40);
 line(ox,oy,x1,y1,24);line(x1,y1,x2,y2,19);joint(ox,oy,17);joint(x1,y1,14);joint(x2,y2,10);
 const open=9+(+grip.value)*.24,nx=-Math.sin(t2),ny=Math.cos(t2),gx=Math.cos(t2),gy=Math.sin(t2),px=x2+18*gx,py=y2+18*gy;
 line(x2,y2,px,py,9);line(px+nx*open,py+ny*open,px+gx*34+nx*open,py+gy*34+ny*open,6);line(px-nx*open,py-ny*open,px+gx*34-nx*open,py+gy*34-ny*open,6);
 const X=x2-ox,Y=oy-y2;$("xPos").textContent=X.toFixed(1);$("yPos").textContent=Y.toFixed(1);$("reach").textContent=Math.hypot(X,Y).toFixed(1);
}
[base,shoulder,elbow,grip].forEach(e=>e.addEventListener("input",draw));
$("open").onclick=()=>{grip.value=100;draw()};$("close").onclick=()=>{grip.value=0;draw()};
$("reset").onclick=()=>{stopDemo();base.value=0;shoulder.value=55;elbow.value=55;grip.value=40;draw()};
function stopDemo(){if(demoTimer){clearInterval(demoTimer);demoTimer=null;$("demo").textContent="▶ Demo pokret"}}
$("demo").onclick=()=>{if(demoTimer){stopDemo();return} $("demo").textContent="■ Zaustavi demo";let t=0;demoTimer=setInterval(()=>{t+=.06;base.value=30*Math.sin(t*.7);shoulder.value=72+35*Math.sin(t);elbow.value=45+65*Math.sin(t*1.2);grip.value=50+45*Math.sin(t*.8);draw()},40)};
$("save").onclick=()=>{saved.push({b:+base.value,s:+shoulder.value,e:+elbow.value,g:+grip.value});renderSaved()};
function renderSaved(){const box=$("savedPositions");box.innerHTML="";saved.forEach((p,i)=>{const r=document.createElement("div");r.className="saved-row";r.innerHTML=`<span>Položaj ${i+1}: ${p.s}° / ${p.e}°</span><button>Učitaj</button>`;r.querySelector("button").onclick=()=>{base.value=p.b;shoulder.value=p.s;elbow.value=p.e;grip.value=p.g;draw()};box.appendChild(r)})}
draw();