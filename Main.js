import { showScene, mostrarStats } from './Utils/utils.js';
import { Jugador } from './Modules/Jugador.js';
import { selected, showCatalog, paintInventory } from './Modules/Mercado.js';
import { showBestiario, getRandomEnemy } from './Modules/Bestiario.js';
import { jugador } from './Utils/constants.js';
import { combat, paintBattle } from './Modules/Batalla.js';


const goToScene2 = document.getElementById('goToScene2'); /* Escena 2: mercado */
const goToScene3 = document.getElementById('goToScene3'); /* Escena 3: jugador con inventario actualizado */
const goToScene4 = document.getElementById('goToScene4'); /* Escena 4: enemigos*/
const goToScene5 = document.getElementById('goToScene5'); /* Escena 5: batalla */
const goToScene6 = document.getElementById('goToScene6'); /* Escena 6: ranking */

const nextBattle = document.getElementById('nextBattle'); /* Botón para la siguiente batalla*/


// showScene('scene-5');
showScene('scene-1');
mostrarStats(jugador, 1);

goToScene2.addEventListener('click', () => showScene('scene-2'));
showCatalog();

goToScene3.addEventListener('click', () => {
  // Generamos el inventario del jugador a partir de los productos seleccionados. 
  // Lo que usábamos antes (jugador.inventario = [...selected]) no clonaba los objetos, los copiaba manteniendo la referencia original.
  selected.forEach(p => jugador.aniadirProducto(p)) 
  showScene('scene-3');
  jugador.vida = jugador.vidaInicial; //Recalculamos la vida inicial una vez lleno el inventario.
  mostrarStats(jugador, 3);
  console.log(jugador.inventario)
  paintInventory(jugador.inventario);
});


goToScene4.addEventListener('click', () => {
  showScene('scene-4');
  showBestiario();
});

const MAX_ROUND = 3; // Número máximo de batalla
let round = 0; // Ronda de batalla actual. La declaramos a nivel global porque la necesitan tanto el listener del cambio
               // de escena como el listener de avance de ronda. 

goToScene5.addEventListener('click', () => {
  showScene('scene-5');
  startNextRound();   // La primera ronda se ejecuta cuando la escena carga, y es dentro cuando la variable 'round' toma valor.
});

nextBattle.addEventListener('click', () => {
  startNextRound();   // siguientes rondas
});

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

  // Tras el combate, reevaluamos si las condiciones han cambiado, y por tanto debe hacerlo el botón disponible (antes de terminar la ejecución de la función).
  if (round >= MAX_ROUND || jugador.vida <= 0) {
    goToScene6.classList.remove('hidden');
    nextBattle.classList.add('hidden');
    return;
  }
}


// jugador.inventario = [new Producto("Cuchilla de Plasma", 900, "Rara", "Arma", { ataque: 25 }, "./../img/knife.png"),
//     new Producto("Casco Antirradiación", 600, "Infrecuente", "Armadura", { defensa: 20 }, "./../img/helmet.png"),
//     new Producto("Pistola Iónica de Emergencia", 550, "Común", "Arma", { ataque: 12 }, "./../img/pistol.png"),
//     new Producto("Inyector de Adrenalina Sintética", 420, "Infrecuente", "Consumible", { vida: 25 }, "./../img/injector.png"),
//     new Producto("Lanza Fotónica", 1500, "Legendaria", "Arma", { ataque: 55 }, "./../img/lance.png"),
//     new Producto("Suero Estabilizador de Oxígeno", 320, "Común", "Consumible", { vida: 18 }, "./../img/container.png")]

//     showScene('scene-5');
//     // jugador.vida = jugador.vidaInicial; //Recalculamos la vida inicial una vez lleno el inventario.
//     // mostrarStats(jugador, 3);
//     paintInventory(jugador.inventario);


//location.reload();









