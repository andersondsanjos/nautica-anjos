// Vídeo provisório: caiaques grandes e reconhecíveis; será trocado pelo material próprio da Náutica.
const heroVideo=document.querySelector('.hero-video');if(heroVideo){heroVideo.querySelector('source').src='https://www.pexels.com/download/video/4630716/';heroVideo.load();heroVideo.play().catch(()=>{});}
// Cardumes ficam presos a cada cenário da página: alinhados, próximos e com uma trajetória única.
const species=['fish-yellow.png','fish-blue.png','fish-silver.png'];
function createSchool(targetSelector, reverse=false){
  const target=document.querySelector(targetSelector);if(!target)return;
  const school=document.createElement('div');school.className='fish-school-page'+(reverse?' reverse':'');school.setAttribute('aria-hidden','true');
  const positions=[[0,54,84],[11,27,68],[24,63,73],[37,42,94],[49,18,60],[58,52,82],[70,31,72],[80,62,88],[90,42,64]];
  positions.forEach(([x,y,size],i)=>{const fish=document.createElement('span');fish.className='swim-fish';fish.style.setProperty('--x',x+'%');fish.style.setProperty('--y',y+'%');fish.style.setProperty('--s',size+'px');fish.style.setProperty('--d',(i%3)*-.12+'s');const body=document.createElement('i'),tail=document.createElement('i');body.className='fish-body';tail.className='fish-tail';const src=`url(${species[i%species.length]})`;body.style.backgroundImage=src;tail.style.backgroundImage=src;fish.append(body,tail);school.append(fish)});target.append(school);
}
createSchool('.underwater-split');createSchool('#experiencia',true);

// O polvo pertence ao cenário submarino e se move junto dele, nunca preso à janela do visitante.
const octopus=document.querySelector('.octopus-crawler');const reef=document.querySelector('.underwater-split');if(octopus&&reef){reef.append(octopus);octopus.classList.add('reef-octopus');}

// Sombras passam somente pela área do mar, por baixo do conteúdo.
document.querySelectorAll('.hero,.underwater-split,.final-cta').forEach((section,index)=>{const layer=document.createElement('div');layer.className='kayak-water-shadows';layer.setAttribute('aria-hidden','true');layer.innerHTML='<i></i><i></i>';section.append(layer);});

