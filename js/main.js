/* Portafolio de Juan Camilo Giraldo Gómez · JavaScript sin librerías.
   Parte 1: modo claro/oscuro. Parte 2: intro, terminal, pila de tarjetas,
   animaciones al subir/bajar y navegación interna. */

(function(){
var root=document.documentElement,btn=document.getElementById("theme");
try{var t=localStorage.getItem("tema");if(t)root.setAttribute("data-theme",t)}catch(e){}
btn.addEventListener("click",function(){
var dark=root.getAttribute("data-theme")==="dark"||(!root.getAttribute("data-theme")&&matchMedia("(prefers-color-scheme: dark)").matches);
var n=dark?"light":"dark";root.setAttribute("data-theme",n);btn.setAttribute("aria-pressed",String(n==="dark"));
try{localStorage.setItem("tema",n)}catch(e){}
});
})();

(function(){
var root=document.documentElement;root.classList.add("js");
var main=document.querySelector("main"),secs=[].slice.call(document.querySelectorAll("main>section")),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
function setTops(){var vh=innerHeight;secs.forEach(function(x){x.style.top=Math.min(72,vh-x.offsetHeight-16)+"px"})}
setTops();addEventListener("resize",setTops);addEventListener("load",setTops);
if("ResizeObserver" in window){var ro=new ResizeObserver(setTops);secs.forEach(function(x){ro.observe(x)})}
/* hero: nombre escrito + terminal */
var hero=document.querySelector(".hero"),h1=hero.querySelector("h1"),tw=h1.querySelector(".tw"),caret=h1.querySelector(".caret"),full=h1.querySelector(".tw-full").textContent;
var out=document.getElementById("term-out"),live=document.getElementById("term-live"),tb=[].slice.call(document.querySelectorAll(".term-btns button")),tt,typing=root.classList.contains("typing");
var CMD={whoami:"Juan Camilo Giraldo Gómez\nDesarrollador de software · Backend\nMedellín, Colombia",skills:"Python · SQL · MySQL · PDO\nPHP y JavaScript (básico)\nJava (aprendiendo)\nPOO · HTML · CSS",proyectos:"Glowsmec · página web (PHP + MySQL)\nMi propio Pac-Man · MakeCode Arcade\nRiego inteligente · Micro:bit",hobbies:"Fútbol · Cocinar · Amigos · Series\nHomebrew en la Nintendo Wii",contacto:"gjuancamilo550@gmail.com\n313 459 0141\ngithub.com/gjuanccamilo"};
function run(c){clearTimeout(tt);tb.forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.cmd===c))});live.textContent=CMD[c].replace(/\n/g,". ");var t="$ "+c+"\n"+CMD[c];if(reduce){out.textContent=t;return}var i=0;(function st(){out.textContent=t.slice(0,i);if(i++<t.length)tt=setTimeout(st,14)})()}
document.querySelector(".term-btns").addEventListener("click",function(e){var b=e.target.closest("button");if(b)run(b.dataset.cmd)});
var he=[".avatar",".role",".btns",".term"].map(function(q){return hero.querySelector(q)}),hid=0;
he.forEach(function(el){el.classList.add("rv")});
function playHero(){var id=++hid;clearTimeout(tt);out.textContent="";tw.textContent="";tb.forEach(function(b){b.setAttribute("aria-pressed","false")});he.forEach(function(el){el.classList.remove("in")});he[0].classList.add("in");if(caret)caret.classList.remove("done");
function after(){if(id!==hid)return;he.slice(1).forEach(function(el,i){setTimeout(function(){if(id===hid)el.classList.add("in")},i*220)});setTimeout(function(){if(id===hid)run("whoami")},800);if(caret)setTimeout(function(){if(id===hid)caret.classList.add("done")},1800)}
if(!typing){after()}else{var k=0;(function t(){if(id!==hid)return;tw.textContent=full.slice(0,k);if(k++<full.length)setTimeout(t,65);else after()})()}}
function hideHero(){hid++;clearTimeout(tt);he.forEach(function(el){el.classList.remove("in")})}
/* tarjetas: aparecen al bajar y desaparecen al subir */
var sel="main>section>.ico,h2,.prose>p,.timeline>li,.box,.story,.ci",els=[];
secs.forEach(function(sec,si){if(sec===hero)return;[].slice.call(sec.querySelectorAll(sel)).forEach(function(el,i){el.classList.add("rv");el.style.setProperty("--d",Math.min(i,6)*90+"ms");els.push({el:el,i:si})})});
var away=false,tick=false;
function update(){tick=false;var vh=innerHeight;
var cov=secs.map(function(x,i){var n=secs[i+1];if(!n)return 0;var r=n.getBoundingClientRect().top,ns=parseFloat(n.style.top)||72;return Math.max(0,Math.min(1,(vh-r)/(vh-ns)))});
secs.forEach(function(x,i){x.style.transform=(!reduce&&cov[i]>.001)?"scale("+(1-.05*cov[i]).toFixed(4)+")":""});
if(reduce)return;
els.forEach(function(o){var r=o.el.getBoundingClientRect();o.el.classList.toggle("in",r.top<vh*.92&&r.bottom>0&&cov[o.i]<.25)});
if(!away&&cov[0]>.25){away=true;hideHero()}else if(away&&cov[0]<.15){away=false;playHero()}}
function req(){if(!tick){tick=true;requestAnimationFrame(update)}}
addEventListener("scroll",req,{passive:true});addEventListener("resize",req);
if(reduce){els.forEach(function(o){o.el.classList.add("in")})}
playHero();update();
/* navegación interna con tarjetas apiladas */
function natural(sec){var y=main.getBoundingClientRect().top+scrollY+parseFloat(getComputedStyle(main).paddingTop);for(var j=0;secs[j]!==sec;j++){y+=secs[j].offsetHeight+parseFloat(getComputedStyle(secs[j]).marginBottom)}return y}
document.addEventListener("click",function(ev){var a=ev.target.closest('a[href^="#"]');if(!a)return;var el=document.getElementById(a.getAttribute("href").slice(1));if(!el)return;var sec=el.closest("main>section");if(!sec)return;ev.preventDefault();var y,e=el,off=0;
if(el===sec){y=natural(sec)-(parseFloat(sec.style.top)||72)}else{while(e&&e!==sec){off+=e.offsetTop;e=e.offsetParent}y=natural(sec)+off-84}
scrollTo({top:Math.max(0,y),behavior:reduce?"auto":"smooth"})});
})();
