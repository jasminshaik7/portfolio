const projects = [
  {id:1,title:"Snack Brand Reels",cat:"short",duration:18,src:"https://www.w3schools.com/html/mov_bbb.mp4",tags:["reel","snack"]},
  {id:2,title:"Mini‑Doc: Street Football",cat:"doc long",duration:240,src:"https://www.w3schools.com/html/movie.mp4",tags:["sports","doc"]},
  {id:3,title:"Gaming Montage #1",cat:"gaming",duration:35,src:"https://www.w3schools.com/html/mov_bbb.mp4",tags:["fps","montage"]},
  {id:4,title:"Brand Ad – Summer",cat:"ads",duration:30,src:"https://www.w3schools.com/html/movie.mp4",tags:["brand","ad"]},
  {id:5,title:"AMV – Neon Rush",cat:"anime",duration:28,src:"https://www.w3schools.com/html/mov_bbb.mp4",tags:["anime","amv"]}
];

const grid = document.querySelector('.grid');
const chipbar = document.querySelector('.chipbar');
const search = document.querySelector('#search');
const sortSel = document.querySelector('#sort');
const template = document.querySelector('#card-template');
const lightbox = document.querySelector('.lightbox');
const player = document.querySelector('.player');
const lbTitle = document.querySelector('#lb-title');
const closeBtn = document.querySelector('.close');

function fmtDur(s){ return s<60? `${s}s` : `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}` }

function createCard(item){
  const node = template.content.cloneNode(true);
  const card = node.querySelector('.card');
  card.querySelector('video').src=item.src;
  card.querySelector('.badge').textContent=item.cat;
  card.querySelector('.dur').textContent=fmtDur(item.duration);
  card.querySelector('.title').textContent=item.title;
  item.tags.forEach(t=>{
    const span=document.createElement('span'); span.className='tag'; span.textContent=t; card.querySelector('.tags').appendChild(span);
  });
  card.querySelector('.thumb').addEventListener('click',()=>openLightbox(item));
  return node;
}

function render(list){
  grid.innerHTML='';
  list.forEach(p=>grid.appendChild(createCard(p)));
}

function apply(){
  let list=projects.slice();
  const filter=document.querySelector('.chip.active').dataset.filter;
  if(filter!=='all') list=list.filter(p=>p.cat.includes(filter));
  if(search.value){list=list.filter(p=>p.title.toLowerCase().includes(search.value.toLowerCase()))}
  if(sortSel.value==='shortest') list.sort((a,b)=>a.duration-b.duration);
  if(sortSel.value==='longest') list.sort((a,b)=>b.duration-a.duration);
  if(sortSel.value==='az') list.sort((a,b)=>a.title.localeCompare(b.title));
  render(list);
}

chipbar.addEventListener('click',e=>{
  if(e.target.classList.contains('chip')){
    chipbar.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    apply();
  }
});

search.addEventListener('input',apply);
sortSel.addEventListener('change',apply);

function openLightbox(item){
  player.src=item.src; lbTitle.textContent=item.title; lightbox.classList.add('open');
}
function closeLightbox(){ lightbox.classList.remove('open'); player.pause(); }
closeBtn.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox) closeLightbox()});

render(projects);
document.querySelector('#yr').textContent=new Date().getFullYear();
