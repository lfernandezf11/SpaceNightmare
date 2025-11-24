import { showScene, mostrarStats } from './Utils/dom.js';
import { Jugador } from './Modules/Jugador.js';
import { productosCopy, selected, showCatalog, randomiseDiscount, paintInventory, aplicarDescuentoRareza } from './Modules/Mercado.js';


const goToScene2 = document.getElementById('goToScene2');
const goToScene3 = document.getElementById('goToScene3');

showScene('scene-2');
// showScene('scene-1');
const jugador = new Jugador('Teniente al Mando F. Welsch', './img/astronaut.png');
//mostrarStats(jugador);

// goToScene2.addEventListener('click', () => showScene('scene-2'));

/* MERCADO --------------------------------------------*/
showCatalog();

goToScene3.addEventListener('click', () => {
    jugador.inventario = [...selected];
    showScene('scene-3');
    jugador.vida = jugador.vidaInicial; //Recalculamos la vida inicial una vez lleno el inventario.
    mostrarStats(jugador);
    paintInventory(jugador.inventario); 
}); 





//location.reload();









