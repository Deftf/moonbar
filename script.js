/* ---------------------------
   MoonBar V2 - script.js
   Render menu, audio logic,
   interactions y animaciones.
--------------------------- */

// -------------- DATOS (20 tragos) --------------
const drinks = [
  { name: "Piña Colada", desc: "Nacido en playas tropicales: ron blanco, crema de coco y jugo de piña, batido hasta sedosidad.", why: "Prueba esto si buscas escaparte al Caribe con una sola cuchara; cremoso y festivo.", img: "l1.jpg", price: "S/ 22", tag: "Tropical" },
  { name: "Mojito Clásico", desc: "Hierbabuena, limón, azúcar y ron: fresco, herbal y perfectamente equilibrado.", why: "Ideal para quienes quieren algo ligero y refrescante que nunca falla en calor.", img: "l2.jpg", price: "S/ 18", tag: "Refrescante" },
  { name: "Machu Picchu", desc: "Pisco con licor de menta, naranja y granadina en capas de color.", why: "Si buscas identidad local con estilo visual un brindis con raíces y sabor.", img: "l3.jpg", price: "S/ 20", tag: "Local" },
  { name: "Chilcano", desc: "Pisco y ginger ale, con limón y toque de amargo. Burbujas elegantes.", why: "Refrescante y fácil de beber; el favorito para empezar la noche sin complicaciones.", img: "l4.jpg", price: "S/ 15", tag: "Clásico" },
  { name: "Pisco Sour", desc: "Pisco, limón, jarabe, clara de huevo y amargo: textura aterciopelada.", why: "Para quienes valoran equilibrio y técnica; símbolo nacional con presencia.", img: "l5.jpg", price: "S/ 24", tag: "Imprescindible" },
  { name: "Daikiri de Fresa", desc: "Fresa natural, ron blanco y hielo: dulce y vibrante.", why: "Coctel frutal para momentos alegres; apto para el paladar joven y juguetón.", img: "l6.jpg", price: "S/ 18", tag: "Frutal" },
  { name: "Limonada Eléctrica", desc: "Vodka, curaçao azul y soda: ácido con actitud.", why: "Porque la noche necesita brillo y color; visual y sabroso a la vez.", img: "l7.jpg", price: "S/ 20", tag: "Vibrante" },
  { name: "Pantera Rosa", desc: "Vodka, leche evaporada y granadina: cremoso y seductor.", why: "Perfecto para quienes aman los sabores indulgentes y la estética retro.", img: "l8.jpg", price: "S/ 19", tag: "Dulce" },
  { name: "Cuba Libre", desc: "Ron oscuro, Coca-Cola y limón: simple y con carácter.", why: "Un clásico que nunca falla; la mezcla para bailar sin pensar mucho.", img: "l9.jpg", price: "S/ 16", tag: "Clásico" },
  { name: "Perú Libre", desc: "Pisco, Coca-Cola y limón: espíritu festivo con sello local.", why: "Si te gusta probar giros culturales sobre clásicos internacionales.", img: "l10.jpg", price: "S/ 16", tag: "Local" },
  { name: "Algarrobina", desc: "Pisco, jarabe de algarrobina, leche y canela: dulce y tradicional.", why: "El abrazo dulce del norte peruano en un vaso; ideal para terminar la noche.", img: "l11.jpg", price: "S/ 22", tag: "Tradicional" },
  { name: "Cholo Mule", desc: "Pisco con ginger beer y limón: fresco con un toque picante.", why: "Para quien quiere algo con chispa y personalidad sin complicaciones.", img: "l12.jpg", price: "S/ 18", tag: "Picante" },
  { name: "Pisco Punch", desc: "Pisco, piña y limón: dulce, cítrico y con mucha nostalgia.", why: "Sabor que evoca fiestas antiguas; ideal para compartir y recordar.", img: "l13.jpg", price: "S/ 20", tag: "Festivo" },
  { name: "Pisco Tonic", desc: "Pisco con agua tónica: seco, fresco y sofisticado.", why: "Si te gusta la limpieza del gin tonic pero con alma peruana.", img: "l14.jpg", price: "S/ 18", tag: "Sofisticado" },
  { name: "Capitán", desc: "Pisco y vermut rojo: intenso, herbáceo y con clase.", why: "Para amantes de los cócteles de autor y del sabor profundo.", img: "l15.jpg", price: "S/ 22", tag: "Elegante" },
  { name: "Maracuyá Sour", desc: "Pisco, maracuyá y clara: ácido, exótico y fragante.", why: "Sabor tropical con nervio; perfecto para paladares aventureros.", img: "l16.jpg", price: "S/ 22", tag: "Exótico" },
  { name: "Pisco Sunset", desc: "Pisco, naranja y granadina en un bello degradado.", why: "Para brindar al atardecer; bonito, suave y fácil de amar.", img: "l17.jpg", price: "S/ 18", tag: "Visual" },
  { name: "Frozen de Lúcuma", desc: "Lúcuma, leche y hielo: postre transformado en coctel.", why: "Si te gustan los postres en vaso: cremoso, denso y muy peruano.", img: "l18.jpg", price: "S/ 21", tag: "Postre" },
  { name: "Chicha Sour", desc: "Jarabe de chicha morada, limón y clara: frutal con toque especiado.", why: "Fusión ancestral-modernista; algo distinto que sorprende.", img: "l19.jpg", price: "S/ 20", tag: "Innovador" },
  { name: "Sours del Ande", desc: "Pisco con hierbas andinas y limón: fresco y herbal.", why: "Para quienes aman ingredientes locales y perfiles aromáticos.", img: "l20.jpg", price: "S/ 23", tag: "Andino" }
];

// -------------- RENDER MENU --------------
const menuEl = document.getElementById('menu');

function createCardHTML(d){
  return `
    <section class="card fade-up">
      <div class="card-media"><img loading="lazy" src="assets/images/${d.img}" alt="${d.name}"></div>
      <div class="card-body">
        <div class="card-title">
          <h3>${d.name}</h3>
          <div class="price">${d.price}</div>
        </div>
        <p class="desc">${d.desc}</p>
        <div class="try-reason"><strong>¿Por qué probarlo?</strong> ${d.why}</div>
        <div class="meta-row"><div class="tag">${d.tag}</div><div style="flex:1"></div></div>
      </div>
    </section>
  `;
}

menuEl.innerHTML = `<div class="grid">${drinks.map(d => createCardHTML(d)).join('')}</div>`;

/* ----------------------
   AUDIO LOGIC EXPERTO
---------------------- */
const audio = document.getElementById('bgMusic');
const ctrl = document.getElementById('musicControl');
const icon = document.getElementById('musicIcon');

let hasInteracted = false;
let isPlaying = false;

audio.volume = 0;
audio.play().catch(()=>{});

// PRIMER CLICK: activa música real
document.body.addEventListener('click', (ev) => {
  if (ev.target.closest && ev.target.closest('#musicControl')) return;
  if (!hasInteracted) {
    hasInteracted = true;
    audio.volume = 0.85;
    audio.play();
    isPlaying = true;
    icon.src = 'assets/icons/pause.png';
    ctrl.classList.add('playing');
  }
});

// CONTROL MANUAL
ctrl.addEventListener('click', (ev) => {
  ev.stopPropagation();
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    icon.src = 'assets/icons/pause.png';
    ctrl.classList.add('playing');
  } else {
    audio.pause();
    isPlaying = false;
    icon.src = 'assets/icons/play.webp';
    ctrl.classList.remove('playing');
  }
});

// ACCESSIBILIDAD
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    ctrl.click();
  }
});
