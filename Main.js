import { showScene, mostrarStats } from './Utils/dom.js';
import { deepClone } from './Utils/helpers.js';
import { Jugador } from './Modules/Jugador.js';
import { productos, selected, showCatalog, randomiseDiscount, paintInventory, aplicarDescuentoRareza } from './Modules/Mercado.js';
import { Producto } from './Modules/Producto.js';
import { Jefe } from './Modules/Jefe.js';

const goToScene2 = document.getElementById('goToScene2');
const goToScene3 = document.getElementById('goToScene3');

showScene('scene-1');
const jugador = new Jugador('Gloria', 200);
mostrarStats(jugador, 1);

goToScene2.addEventListener('click', () => showScene('scene-2'));

/* MERCADO --------------------------------------------*/
randomiseDiscount(productos);
showCatalog(productos);

goToScene3.addEventListener('click', () => {
    jugador.inventario = [...selected];
    showScene('scene-3');
    jugador.vida = jugador.vidaInicial; //Recalculamos la vida inicial una vez lleno el inventario.
    mostrarStats(jugador, 3);
    paintInventory(jugador.inventario);
    
}); 



//location.reload();









