import { Producto } from './Producto.js';
import { groupBy } from './../Utils/helpers.js';
//import { deepClone } from '../Utils/helpers.js';

let rarezaSelected = null; //Variable en la que guardaremos la rareza elegida antes de aplicar el descuento aleatorio sobre el mercado.
let porcentajeSelected = null; //Lo mismo pero para el porcentaje
/**
 * Lista de productos disponibles en el inventario.
 * Cada producto es una instancia de la clase Producto.
 */

export const productos = [
    new Producto("Espada de Fuego", 1200, "Épica", "Ataque", { ataque: 25, vida: 10 }),
    new Producto("Tónico Reconstituyente", 500, "Rara", "Consumible", { vida: 35, defensa: 15 }),
    new Producto("Elixir de Guardián", 750, "Épica", "Consumible", { defensa: 40, vida: 20 }),
    new Producto("Escudo del Dragón", 950, "Rara", "Defensa", { defensa: 30, vida: 15 }),
    new Producto("Arco del Halcón", 800, "Rara", "Ataque", { ataque: 40 }),
    new Producto("Daga de Sombras", 600, "Infrecuente", "Ataque", { ataque: 15, vida: 30 }),
    new Producto("Báculo de la Luz", 1100, "Épica", "Ataque", { ataque: 35, vida: 20, defensa: 30 }),
    new Producto("Casco del Guerrero", 500, "Común", "Defensa", { defensa: 40, vida: 25 }),
    new Producto("Guantes del Asesino", 450, "Infrecuente", "Defensa", { defensa: 10, vida: 10 }),
    new Producto("Armadura Real", 1500, "Legendaria", "Defensa", { defensa: 40, vida: 25 }),
    new Producto("Poción Mayor de Vida", 600, "Rara", "Consumible", { vida: 60 }),
    new Producto("Amuleto del Sabio", 700, "Rara", "Accesorio", { vida: 30, defensa: 30 }),
    new Producto("Ungüento de Hierro", 350, "Infrecuente", "Consumible", { defensa: 25 }),
    new Producto("Lanza del Coloso", 1300, "Épica", "Ataque", { ataque: 30, defensa: 20 }),
    new Producto("Botas del Viento", 650, "Rara", "Accesorio", { defensa: 10, vida: 15, ataque: 10 }),
    new Producto("Martillo de Tectón", 1400, "Épica", "Ataque", { ataque: 45, defensa: 10 }),
    new Producto("Capa de Penumbra", 900, "Rara", "Defensa", { defensa: 25, vida: 20 }),
    new Producto("Anillo de la Guardi(a", 550, "Infrecuente", "Accesorio", { defensa: 20, vida: 10 }),
    new Producto("Espada Lunar", 1700, "Legendaria", "Ataque", { ataque: 50, vida: 20, defensa: 10 }),
    new Producto("Poción Menor de Vida", 180, "Común", "Consumible", { vida: 20 })
];

//export const productosCopy = deepClone(productos); // Usamos un clon del mercado para no alterar el original a la hora de aplicar descuentos.

export function showCatalog() {
    const discount = document.getElementById('discount');
    const catalogEl = document.getElementById('card-container');
    discount.textContent = 'Hoy los productos de tipo "' + rarezaSelected + '" tienen un ' + porcentajeSelected + '% de descuento'
    catalogEl.innerHTML = '';
    productos.forEach((producto) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = producto.mostrarInfo();
        if (producto.rareza === rarezaSelected) {
            card.classList.add('onSale');
        }
        catalogEl.append(card);

        card.addEventListener('click', () => buyProduct(producto, card));
    });
}

export function randomiseDiscount() {
    // Declaramos un array con los tipos de rareza, extrayendo las claves de los objetos agrupados por rareza.
    const byRareza = groupBy(productos, p => p.rareza);
    const rarezas = Object.keys(byRareza);

    // Aplicamos un descuento aleatorio a un tipo de rareza aleatoria antes de pintar el mercado.
    let rarezaRandom = rarezas[Math.floor(Math.random() * rarezas.length)];
    let discountRandom = Math.floor(Math.random() * 41); //Máximo del 40% de descuento.

    aplicarDescuentoRareza(rarezaRandom, discountRandom);
}


const MAX_SELECTED = 6; // número máximo de productos seleccionados
export let selected = []; // array para guardar los productos antes de asignarlos al inventario (lo utilizaremos también para pintar el inventario en pantalla)

export function buyProduct(product, card) {
    const isSelected = card.classList.toggle('selected');    // devuelve true si la clase queda aplicada tras el toggle   
    const i = selected.findIndex(p => p.id === product.id); // índice del producto dentro de selected (si ya estaba), -1 si no.

    if (isSelected) {
        if (selected.length >= MAX_SELECTED) {
            card.classList.remove('selected'); // revertimos el toggle
            return;
        }
        if (i === -1) selected.push(product);
    } else {
        if (i !== -1) selected.splice(i, 1);
    }
    paintInventory(selected); //Pinta el inventario con los objetos seleccionados antes de pulsar 'Comprar'.
}


const inventoryEl = document.getElementById('inventory-container');
const slots = Array.from(inventoryEl.querySelectorAll('.item'));

export function paintInventory(list) {
    // Rellena cada slot con el producto correspondiente
    for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        const prod = list[i]; // undefined: si no hay más productos, deja el slot vacío

        slot.innerHTML = ''; // Estado inicial del slot.
        if (prod) {
            slot.innerHTML = prod.mostrarInfoReduced();
        }
    }
}


/**
 * Filtra los productos según su rareza.
 * @param {string} rareza - Rareza que se desea buscar (por ejemplo: "Épica", "Rara").
 * @returns {Producto[]} Lista de productos que coinciden con la rareza indicada.
 */
export function filtrarPorRareza(rareza) { // No hace falta introducir `productos`, puesto que se exporta como constante y puede accederse a ella desde fuera de la clase.
    return productos.filter(producto => producto.rareza === rareza);
}


/**
 * Aplica un descuento a todos los productos de una rareza específica.
 * @param {string} rareza - Rareza a la que se aplicará el descuento.
 * @param {number} porcentaje - Porcentaje de descuento (entre 0 y 100).
 * @returns {Producto[]} Lista de productos con el descuento aplicado.
 */
export function aplicarDescuentoRareza(rareza, porcentaje) {
    //Almacenamos la rareza y el porcentaje aleatorios aquí, para poder marcar los productos con descuento en la escena 2
    rarezaSelected = rareza;
    porcentajeSelected = porcentaje;
    return productos.map(producto => producto.rareza === rareza ? producto.aplicarDescuento(porcentaje) : producto);
}

/**
 * Busca un producto por su nombre exacto dentro de una lista de objetos Producto.
 *
 * @param {Array<Producto|Object>} mercado - Array de productos donde buscar (incluido aquí por si utilizamos clones o copias de `productos`)
 * @param {string} nombre - Nombre del producto a buscar (case-insensitive).
 * @returns {Producto|null} La primera coincidencia (objeto Producto) o `null` si no existe.
 */
export function buscarProducto(mercado, nombre) {
    return mercado.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase()) || null;
}

/**
 * Muestra la información de un objeto Producto.
 * @param {Producto} producto - Instancia del producto
 * @returns {string} Información detallada del producto
 */
export function mostrarProducto(producto) {
    return producto.mostrarInfo();
}

