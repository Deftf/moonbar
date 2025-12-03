/* MoonBar Script – versión con selector por licor base */

const drinks = [
  { name:"Piña Colada", img:"l1.jpg", desc:"Nacido en playas tropicales: ron blanco, crema de coco y jugo de piña.", why:"Escápate al Caribe en un sorbo.", price_glass:12, price_disposable:9, tag:"Tropical", licor:"Ron" },
  { name:"Mojito Clásico", img:"l2.jpg", desc:"Hierbabuena, limón, azúcar y ron.", why:"Refrescante y equilibrado.", price_glass:10, price_disposable:8, tag:"Refrescante", licor:"Ron" },
  { name:"Machu Picchu", img:"l3.jpg", desc:"Pisco con licor de menta, naranja y granadina.", why:"Color e identidad peruana.", price_glass:10, price_disposable:8, tag:"Local", licor:"Pisco" },
  { name:"Chilcano", img:"l4.jpg", desc:"Pisco, ginger ale, limón y amargo.", why:"Clásico peruano para empezar suave.", price_glass:8, price_disposable:6, tag:"Clásico", licor:"Pisco" },
  { name:"Pisco Sour", img:"l5.jpg", desc:"Pisco, limón, jarabe, clara y amargo.", why:"El cóctel insignia del Perú.", price_glass:12, price_disposable:9, tag:"Imprescindible", licor:"Pisco" },
  { name:"Daikiri de Fresa", img:"l6.jpg", desc:"Fresa natural, ron blanco y mucho hielo.", why:"Dulce y alegre.", price_glass:10, price_disposable:8, tag:"Frutal", licor:"Ron" },
  { name:"Limonada Eléctrica", img:"l7.jpg", desc:"Vodka, curaçao azul y soda.", why:"Vibrante y refrescante.", price_glass:12, price_disposable:9, tag:"Vibrante", licor:"Vodka" },
  { name:"Pantera Rosa", img:"l8.jpg", desc:"Vodka, leche evaporada y granadina.", why:"Cremoso y seductor.", price_glass:12, price_disposable:9, tag:"Dulce", licor:"Vodka" },
  { name:"Cuba Libre", img:"l9.jpg", desc:"Ron, Coca-Cola y limón.", why:"Clásico para bailar sin pensar.", price_glass:8, price_disposable:6, tag:"Clásico", licor:"Ron" },
  { name:"Perú Libre", img:"l10.jpg", desc:"Pisco, Coca-Cola y limón.", why:"Versión peruana con actitud.", price_glass:8, price_disposable:6, tag:"Local", licor:"Pisco" },
  { name:"Algarrobina", img:"l11.jpg", desc:"Pisco, algarrobina, leche y canela.", why:"Postre líquido del norte.", price_glass:12, price_disposable:9, tag:"Tradicional", licor:"Pisco" },
  { name:"Cholo Mule", img:"l12.jpg", desc:"Pisco, ginger beer y limón.", why:"Fresco con chispa.", price_glass:10, price_disposable:8, tag:"Picante", licor:"Pisco" },
  { name:"Pisco Punch", img:"l13.jpg", desc:"Pisco, piña y limón.", why:"Nostalgia pura.", price_glass:12, price_disposable:9, tag:"Festivo", licor:"Pisco" },
  { name:"Pisco Tonic", img:"l14.jpg", desc:"Pisco y tónica.", why:"Limpio y elegante.", price_glass:10, price_disposable:8, tag:"Sofisticado", licor:"Pisco" },
  { name:"Capitán", img:"l15.jpg", desc:"Pisco y vermut rojo.", why:"Herbáceo y con clase.", price_glass:10, price_disposable:8, tag:"Elegante", licor:"Pisco" },
  { name:"Maracuyá Sour", img:"l16.jpg", desc:"Pisco, maracuyá y clara.", why:"Ácido y exótico.", price_glass:12, price_disposable:9, tag:"Exótico", licor:"Pisco" },
  { name:"Pisco Sunset", img:"l17.jpg", desc:"Pisco, naranja y granadina.", why:"Atardecer en un vaso.", price_glass:12, price_disposable:9, tag:"Visual", licor:"Pisco" },
  { name:"Frozen de Lúcuma", img:"l18.jpg", desc:"Lúcuma y leche.", why:"Postre hecho cóctel.", price_glass:12, price_disposable:9, tag:"Postre", licor:"Otros" },
  { name:"Chicha Sour", img:"l19.jpg", desc:"Chicha morada, limón y clara.", why:"Fusión sorprendente.", price_glass:12, price_disposable:9, tag:"Innovador", licor:"Pisco" },
  { name:"Sours del Ande", img:"l20.jpg", desc:"Pisco y hierbas andinas.", why:"Herbal y fresco.", price_glass:12, price_disposable:9, tag:"Andino", licor:"Pisco" }
];

const menuEl = document.getElementById("menu");
const categorySelect = document.getElementById("categorySelect");

/* Saber licores disponibles */
function getLiquors(){
  const l = new Set(drinks.map(d => d.licor));
  return ["Todas", ...l];
}

/* Tarjeta de cóctel */
function card(d){
  return `
  <section class="card fade-up">
    <div class="card-media">
      <img loading="lazy" src="assets/images/${d.img}" alt="${d.name}">
    </div>

    <div class="card-body">

      <h3>${d.name}</h3>

      <div class="price-block">
        <div class="price-item"><strong>Cristalería + garnish:</strong> S/ ${d.price_glass}</div>
        <div class="price-item"><strong>Descartable:</strong> S/ ${d.price_disposable}</div>
      </div>

      <p class="desc">${d.desc}</p>

      <div class="try-reason">
        <strong>¿Por qué probarlo?</strong> ${d.why}
      </div>

      <div class="meta-row">
        <div class="tag">${d.licor}</div>
        <div class="tag">${d.tag}</div>
      </div>

    </div>
  </section>`;
}

/* Render general */
function render(licor="Todas"){
  const filtered = licor === "Todas"
    ? drinks
    : drinks.filter(d => d.licor === licor);

  menuEl.innerHTML = `<div class="grid">${filtered.map(card).join("")}</div>`;
}

/* Inicializar */
function init(){
  categorySelect.innerHTML = getLiquors().map(c => `<option>${c}</option>`).join("");
  categorySelect.addEventListener("change", () => render(categorySelect.value));
  render();
}
init();

/* ---------------- AUDIO ---------------- */

const audio = document.getElementById("bgMusic");
const ctrl = document.getElementById("musicControl");
const icon = document.getElementById("musicIcon");

let playing = false;
let interacted = false;

audio.volume = 0;
audio.pause();

/* Primer clic en pantalla */
document.body.addEventListener("click", () => {
  if (!interacted){
    interacted = true;
    audio.volume = .85;
    audio.play();
    playing = true;
    icon.src = "assets/icons/play.webp";
  }
});

/* Botón de música */
ctrl.addEventListener("click", (ev)=>{
  ev.stopPropagation();
  if (!playing){
    audio.play();
    playing = true;
    icon.src = "assets/icons/play.webp";
  } else {
    audio.pause();
    playing = false;
    icon.src = "assets/icons/pause.png";
  }
});
