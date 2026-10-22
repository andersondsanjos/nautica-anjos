// Vida marinha e sombras de caiaque desenhadas no próprio site: leves e sem arquivos externos.
function waterLife(id,mode){
  const canvas=document.getElementById(id); if(!canvas||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const ctx=canvas.getContext('2d'); let w,h,dpr,items=[];
  function resize(){dpr=Math.min(devicePixelRatio,2);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);items=Array.from({length:mode==='hero'?11:27},(_,i)=>({x:Math.random()*w,y:Math.random()*h,r:mode==='hero'?3+Math.random()*5:2+Math.random()*4,s:(.25+Math.random()*.75)*(i%2?1:-1),phase:Math.random()*7,fish:i%4!==0}));}
  function drawFish(o,t){ctx.save();ctx.translate(o.x,o.y+Math.sin(t*1.9+o.phase)*8);ctx.scale(o.s>0?1:-1,1);ctx.fillStyle=mode==='hero'?'rgba(204,251,245,.43)':'rgba(248,213,99,.72)';ctx.beginPath();ctx.ellipse(0,0,o.r*2.3,o.r,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-o.r*2,0);ctx.lineTo(-o.r*3,-o.r*1.35);ctx.lineTo(-o.r*3,o.r*1.35);ctx.fill();ctx.restore();}
  function drawKayak(o,t){ctx.save();ctx.translate(o.x,o.y);ctx.rotate(.05*Math.sin(t+o.phase));ctx.globalAlpha=.24;ctx.fillStyle='#001d2a';ctx.beginPath();ctx.ellipse(0,0,o.r*4.4,o.r*.95,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(0,24,35,.52)';ctx.lineWidth=Math.max(1,o.r*.32);ctx.beginPath();ctx.moveTo(-o.r*3,-o.r*2.15);ctx.lineTo(o.r*3,o.r*2.15);ctx.stroke();ctx.restore();}
  function frame(ms){const t=ms*.001;ctx.clearRect(0,0,w,h);items.forEach(o=>{o.x+=o.s*(mode==='hero'?1.35:.82);if(o.x>w+45)o.x=-45;if(o.x<-45)o.x=w+45;if(!o.fish)drawKayak(o,t)});requestAnimationFrame(frame)}
  resize();addEventListener('resize',resize,{passive:true});requestAnimationFrame(frame);
}
waterLife('hero-waterlife','hero');waterLife('lagoon-life','lagoon');

// Sombras de caiaques atravessam a água em camadas, para sugerir passeios ao redor da página.
document.body.insertAdjacentHTML('beforeend','<div class="kayak-shadows" aria-hidden="true"><i class="kayak-shadow-real one"></i><i class="kayak-shadow-real two"></i><i class="kayak-shadow-real three"></i></div>');
const fishAssets=['fish-yellow.png','fish-blue.png','fish-silver.png'];
const realSchool=document.createElement('div');realSchool.className='real-school';realSchool.setAttribute('aria-hidden','true');
for(let i=0;i<10;i++){const fish=document.createElement('img');fish.src=fishAssets[i%fishAssets.length];fish.alt='';fish.style.setProperty('--top',(9+i*8.4)+'vh');fish.style.setProperty('--size',(i%3===0?7:i%3===1?4.5:6.3)+(Math.random()*1.6)+'vw');fish.style.setProperty('--duration',(17+i*2.3)+'s');fish.style.setProperty('--delay',(-i*2.7)+'s');fish.style.setProperty('--rise',(-18+(i%4)*13)+'px');fish.style.setProperty('--flip',i%2?'scaleX(-1)':'scaleX(1)');realSchool.append(fish)}document.body.append(realSchool);

// O polvo muda de área conforme a pessoa percorre o conteúdo, como se estivesse explorando cada trecho.
const octopus=document.querySelector('.octopus-crawler');
const octoStops=[['#inicio','60vh','3vw'],['#experiencia','30vh','4vw'],['.underwater-split','66vh','74vw'],['#passeio','38vh','3vw'],['#localizacao','62vh','76vw'],['.final-cta','30vh','4vw']];
function moveOctopus(){if(!octopus)return;let best=octoStops[0],distance=Infinity;octoStops.forEach(stop=>{const el=document.querySelector(stop[0]);if(!el)return;const rect=el.getBoundingClientRect(),d=Math.abs(rect.top+rect.height/2-innerHeight/2);if(d<distance){distance=d;best=stop}});octopus.style.top=best[1];octopus.style.right=best[2];octopus.classList.toggle('scared',distance<80)}
moveOctopus();addEventListener('scroll',moveOctopus,{passive:true});addEventListener('resize',moveOctopus);

