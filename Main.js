import { showScene, mostrarStats } from './Utils/dom.js';
import { Jugador } from './Modules/Jugador.js';
import { Producto } from './Modules/Producto.js';
import { selected, showCatalog, paintInventory } from './Modules/Mercado.js';
import { showBestiario, getRandomEnemy } from './Modules/Bestiario.js';


const goToScene2 = document.getElementById('goToScene2'); /* mercado */
const goToScene3 = document.getElementById('goToScene3'); /* jugador con inventario */
const goToScene4 = document.getElementById('goToScene4'); /* enemigos*/
const goToScene5 = document.getElementById('goToScene5'); /* batalla */

// showScene('scene-2');
showScene('scene-1');
export const jugador = new Jugador('Teniente al Mando F. Welsch', './img/astronaut.png');
mostrarStats(jugador, 1);

goToScene2.addEventListener('click', () => showScene('scene-2'));
showCatalog();

goToScene3.addEventListener('click', () => {
    jugador.inventario = [...selected];
    showScene('scene-3');
    jugador.vida = jugador.vidaInicial; //Recalculamos la vida inicial una vez lleno el inventario.
    mostrarStats(jugador, 3);
    paintInventory(jugador.inventario); 
}); 

goToScene4.addEventListener('click', () => {
    showScene('scene-4');
    showBestiario();
    paintInventory(jugador.inventario); 
}); 

goToScene5.addEventListener('click', () => {
    showScene('scene-5');
    paintInventory(jugador.inventario); 
    let enemigo = getRandomEnemy();
    //combat(jugador, enemigo)
}); 

// jugador.inventario = [new Producto("Cuchilla de Plasma", 900, "Rara", "Arma", { ataque: 25 }, "./../img/knife.png"),
//     new Producto("Casco Antirradiación", 600, "Infrecuente", "Armadura", { defensa: 20 }, "./../img/helmet.png"),
//     new Producto("Pistola Iónica de Emergencia", 550, "Común", "Arma", { ataque: 12 }, "./../img/pistol.png"),
//     new Producto("Inyector de Adrenalina Sintética", 420, "Infrecuente", "Consumible", { vida: 25 }, "./../img/injector.png"),
//     new Producto("Lanza Fotónica", 1500, "Legendaria", "Arma", { ataque: 55 }, "./../img/lance.png"),
//     new Producto("Suero Estabilizador de Oxígeno", 320, "Común", "Consumible", { vida: 18 }, "./../img/container.png")]

//     showScene('scene-3');
//     jugador.vida = jugador.vidaInicial; //Recalculamos la vida inicial una vez lleno el inventario.
//     mostrarStats(jugador, 3);
//     paintInventory(jugador.inventario); 


//location.reload();









