// Vídeo provisório: caiaques grandes e reconhecíveis; será trocado pelo material próprio da Náutica.
const heroVideo=document.querySelector('.hero-video');if(heroVideo){heroVideo.querySelector('source').src='https://www.pexels.com/download/video/4630716/';heroVideo.load();heroVideo.play().catch(()=>{});}
// Cardumes ficam presos a cada cenário da página: alinhados, próximos e com uma trajetória única.
const species=['fish-yellow.png'];
function createSchool(targetSelector, reverse=false){
  const target=document.querySelector(targetSelector);if(!target)return;
  const school=document.createElement('div');school.className='fish-school-page'+(reverse?' reverse':'');school.setAttribute('aria-hidden','true');
  // O cardume não é uma coleção aleatória: todos seguem a mesma direção,
  // com vizinhos próximos e uma frente em formato de seta.
  const positions=[[0,50,45],[8,42,48],[8,58,48],[17,34,52],[17,50,55],[17,66,52],[28,27,58],[28,42,60],[28,58,60],[28,73,58],[41,35,64],[41,50,66],[41,65,64],[55,42,70],[55,58,70],[69,50,75]];
  positions.forEach(([x,y,size],i)=>{const fish=document.createElement('span');fish.className='swim-fish';fish.style.setProperty('--x',x+'%');fish.style.setProperty('--y',y+'%');fish.style.setProperty('--s',size+'px');fish.style.setProperty('--d',(i%3)*-.12+'s');const body=document.createElement('i'),tail=document.createElement('i');body.className='fish-body';tail.className='fish-tail';const src=`url(${species[i%species.length]})`;body.style.backgroundImage=src;tail.style.backgroundImage=src;fish.append(body,tail);school.append(fish)});target.append(school);
}
createSchool('.underwater-split');createSchool('#experiencia',true);

// O polvo pertence ao cenário submarino e se move junto dele, nunca preso à janela do visitante.
const octopus=document.querySelector('.octopus-crawler');const reef=document.querySelector('.underwater-split');if(octopus&&reef){reef.append(octopus);octopus.classList.add('reef-octopus');}

// Sombras passam somente pela área do mar, por baixo do conteúdo.
document.querySelectorAll('.hero,.underwater-split,.final-cta').forEach((section,index)=>{const layer=document.createElement('div');layer.className='kayak-water-shadows';layer.setAttribute('aria-hidden','true');layer.innerHTML='<i></i><i></i>';section.append(layer);});

// Atalho de revisão visual; não interfere na navegação normal do visitante.
if(new URLSearchParams(location.search).get('scene')==='underwater')document.querySelector('.underwater-split')?.scrollIntoView();

