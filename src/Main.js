/**
 * Punto de entrada del juego.
 * Controla el cambio de escenas, inicializa al jugador
 * y coordina las rondas de batalla y la pantalla final.
 */

import { showScene, mostrarStats, reloadAnimation } from './Utils/utils.js';
import { jugador } from './Utils/constants.js';
import { selected, showCatalog, paintInventory } from './Modules/Mercado.js';
import { showBestiario, getRandomEnemy } from './Modules/Bestiario.js';
import { combat, paintBattle, playerContainer, enemyContainer } from './Modules/Batalla.js';
import { showPlayerStatus, getPlayerStatus } from './Modules/Ranking.js';
import { Jugador } from './Modules/Jugador.js';


// -------- Selectores de escenas y botones ------------------------------------

const goToScene2 = document.getElementById('goToScene2'); /* Escena 2: mercado */
const goToScene3 = document.getElementById('goToScene3'); /* Escena 3: jugador con inventario actualizado */
const goToScene4 = document.getElementById('goToScene4'); /* Escena 4: enemigos*/
const goToScene5 = document.getElementById('goToScene5'); /* Escena 5: batalla */
const goToScene6 = document.getElementById('goToScene6'); /* Escena 6: ranking */

const nextBattle = document.getElementById('nextBattle'); /* Botón para la siguiente batalla*/
const playAgain = document.getElementById('playAgain');   /* Botón para reiniciar el juego */


const form = document.getElementById('registro');
const nombre = document.getElementById('nombre');
const ataque = document.getElementById('ataque');
const defensa = document.getElementById('defensa');
const vida = document.getElementById('vida');
const crearJugador = document.getElementById('crearJugador');

const MAX_PUNTOS = 10;
const nombreRegex = /^[A-ZÁÉÍÓÚ]+[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,20}$/;
const numRegex = /^\d+$/;
let nuevo;



/* -------- Estado inicial -----------------------------------------------------*/
showScene('scene-0');
crearJugador.classList.add('disabled');
let nombreValid = false;
let ataqueValid = false;
let defensaValid = false;
let vidaValid = false;


nombre.addEventListener('blur', validateNombre);
ataque.addEventListener('blur', validateAtaque);
defensa.addEventListener('blur', validateDefensa);
vida.addEventListener('blur', validateVida);



function checkFullForm() {
  if (nombreValid && ataqueValid && defensaValid && vidaValid) {
    if (ataque.valueAsNumber + defensa.valueAsNumber + vida.valueAsNumber <= 110) {
      crearJugador.classList.remove('disabled');
    }
  }
}

function validateNombre() {
  nombreValid = nombreRegex.test(nombre.value.trim());
  checkFullForm();
}

function validateAtaque() {
  ataqueValid = numRegex.test(ataque.value) && ataque.valueAsNumber >= 0;
  checkFullForm();
}
function validateDefensa() {
  defensaValid = numRegex.test(defensa.value) && defensa.valueAsNumber >= 0;
  checkFullForm();
}

function validateVida() {
  vidaValid = numRegex.test(vida.value) && vida.valueAsNumber >= 100;
  checkFullForm();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { // Validación estándar de formulario
    form.reportValidity();
    return;
  }

  nuevo = new Jugador(nombre.value.trim(), ataque.value, defensa.value, './img/astronaut.png', vida.value);
  console.log(nuevo)
  showScene('scene-1');
  // mostrarStats(nuevo, 1);
   mostrarStats(jugador, 1);
});


const MAX_ROUND = 3; // Número máximo de batalla
let round = 0;       // Ronda de batalla actual. La declaramos a nivel global porque la necesitan tanto el listener del cambio
// de escena como el listener de avance de ronda. 


/* -------- Navegación entre escenas ------------------------------------------*/

// Escena 1 -> Escena 2 (mercado)
const dinero = document.getElementById('dinero');

goToScene2.addEventListener('click', () => {
  showScene('scene-2');
  showCatalog();
  dinero.textContent = jugador.dinero + "monedas";
});

// Escena 2 -> Escena 3 (jugador con inventario actualizado)
goToScene3.addEventListener('click', () => {
  // Generamos el inventario del jugador a partir de los productos seleccionados. 
  // Lo que usábamos antes (jugador.inventario = [...selected]) no clonaba los objetos, los copiaba manteniendo la referencia original.
  selected.forEach(p => jugador.aniadirProducto(p));

  showScene('scene-3');
  jugador.vida = jugador.vidaInicial; //Recalculamos la vida inicial una vez lleno el inventario.
  mostrarStats(jugador, 3);
  paintInventory(jugador.inventario); // SOLO ES NECESARIO PINTARLO UNA VEZ
});

// Escena 3 -> Escena 4 (bestiario de enemigos)
goToScene4.addEventListener('click', () => {
  showScene('scene-4');
  showBestiario();
});

// Escena 4 -> Escena 5 (batalla, primera ronda)
goToScene5.addEventListener('click', () => {
  showScene('scene-5');
  startNextRound();   // La primera ronda se ejecuta cuando la escena carga, y es dentro cuando la variable 'round' toma valor.
});

// Botón "Siguiente batalla" (siguientes rondas)
nextBattle.addEventListener('click', () => {
  startNextRound();
});

// Escena 5 -> Escena 6 (ranking)
goToScene6.addEventListener('click', () => {
  showScene('scene-6');
  showPlayerStatus(jugador, getPlayerStatus(jugador));
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  playAgain.addEventListener('click', () => {
    location.reload();
  });
});


/* -------- Lógica de rondas de batalla ---------------------------------------*/
// Esta función va aquí porque maneja escenas, no encaja con la lógica de batalla per se.
/**
 * Ejecuta una ronda de batalla:
 * - comprueba si se puede luchar,
 * - enfrenta al jugador con un enemigo aleatorio,
 * - actualiza animaciones y botones según el estado.
 */
function startNextRound() {
  // Habilitamos el botón de finalizar partida si no se puede hacer la ronda
  if (round >= MAX_ROUND || jugador.vida <= 0) {
    goToScene6.classList.remove('hidden');
    nextBattle.classList.add('hidden');
    return;
  }
  round += 1; // Si hacer una ronda más es posible, se ejecuta.

  const enemigo = getRandomEnemy();
  paintBattle(jugador, enemigo);
  combat(jugador, enemigo);
  // Recargamos las animaciones conforme se ejecutan, para tenerlas listas para el siguiente combate.
  reloadAnimation(playerContainer, 'enter');
  reloadAnimation(enemyContainer, 'enter');

  // Tras el combate, reevaluamos si las condiciones han cambiado, y por tanto debe hacerlo el botón disponible (antes de terminar la ejecución de la función).
  if (round >= MAX_ROUND || jugador.vida <= 0) {
    goToScene6.classList.remove('hidden');
    nextBattle.classList.add('hidden');
    return;
  }
}

/* Testing */
// jugador.inventario = [new Producto("Cuchilla de Plasma", 900, "Rara", "Arma", { ataque: 25 }, "./../img/knife.png"),
//     new Producto("Casco Antirradiación", 600, "Infrecuente", "Armadura", { defensa: 20 }, "./../img/helmet.png"),
//     new Producto("Pistola Iónica de Emergencia", 550, "Común", "Arma", { ataque: 12 }, "./../img/pistol.png"),
//     new Producto("Inyector de Adrenalina Sintética", 420, "Infrecuente", "Consumible", { vida: 25 }, "./../img/injector.png"),
//     new Producto("Lanza Fotónica", 1500, "Legendaria", "Arma", { ataque: 55 }, "./../img/lance.png"),
//     new Producto("Suero Estabilizador de Oxígeno", 320, "Común", "Consumible", { vida: 18 }, "./../img/container.png")]



