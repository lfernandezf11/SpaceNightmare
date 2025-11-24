import { Producto } from './Producto.js';
import { groupBy } from './../Utils/helpers.js';
import { deepClone } from '../Utils/helpers.js';

let rarezaSelected = null; //Variable en la que guardaremos la rareza elegida antes de aplicar el descuento aleatorio sobre el mercado.
let porcentajeSelected = null; //Lo mismo pero para el porcentaje
/**
 * Lista de productos disponibles en el inventario.
 * Cada producto es una instancia de la clase Producto.
 */

export const productos = [
    new Producto("Cuchilla de Plasma", 900, "Rara", "Arma", { ataque: 25 }, "./../img/knife.png"),
    new Producto("Casco Antirradiación", 600, "Infrecuente", "Armadura", { defensa: 20 }, "./../img/helmet.png"),
    new Producto("Pistola Iónica de Emergencia", 550, "Común", "Arma", { ataque: 12 }, "./../img/pistol.png"),
    new Producto("Inyector de Adrenalina Sintética", 420, "Infrecuente", "Consumible", { vida: 25 }, "./../img/injector.png"),
    new Producto("Lanza Fotónica", 1500, "Legendaria", "Arma", { ataque: 55 }, "./../img/lance.png"),
    new Producto("Suero Estabilizador de Oxígeno", 320, "Común", "Consumible", { vida: 18 }, "./../img/container.png"),
    new Producto("Kit de Nanobots Médicos", 750, "Épica", "Consumible", { vida: 60 }, "./../img/medicalkit.png"),
    new Producto("Guantes de Impacto Cinético", 700, "Infrecuente", "Arma", { ataque: 18 }, "./../img/glove.png"),
    new Producto("Placas EVA de Titanio", 800, "Rara", "Armadura", { defensa: 30 }, "./../img/plank.png"),
    new Producto("Escudo de Campo Portátil", 1100, "Épica", "Armadura", { defensa: 45 }, "./../img/shield.png"),
    new Producto("Ampolla de Regeneración Rápida", 650, "Rara", "Consumible", { vida: 40 }, "./../img/liquid.png"),
    new Producto("Chaleco Antimeteoro", 950, "Rara", "Armadura", { defensa: 35 }, "./../img/vest.png"),
    new Producto("Rifle Gauss de a Bordo", 1300, "Épica", "Arma", { ataque: 40 }, "./../img/rifle.png"),
    new Producto("Traje Táctico de Desembarco", 1400, "Legendaria", "Armadura", { defensa: 55 }, "./../img/suit.png"),
    new Producto("Ración Hipercalórica de Emergencia", 280, "Común", "Consumible", { vida: 15 }, "./../img/food.png")
];

export let productosCopy = productos.map(p =>
    new Producto(p.nombre, p.precio, p.rareza, p.tipo, { ...p.bonus }, p.image)); // Usamos un clon del mercado para no alterar el original a la hora de aplicar descuentos.


export function showCatalog() {
    const discount = document.getElementById('discount');
    const catalogEl = document.getElementById('card-container');

    randomiseDiscount();
    discount.innerHTML = `Los productos de rareza <i>${rarezaSelected}</i> tienen un ${porcentajeSelected}% de descuento`
    catalogEl.innerHTML = '';
    productos.forEach((producto) => {
        const card = document.createElement('div');
        const btn = document.createElement('button');

        card.classList.add('card');
        card.innerHTML = producto.mostrarInfo();
        if (producto.rareza === rarezaSelected) {
            card.classList.add('onSale');
        }
        btn.textContent = 'Añadir';
        card.append(btn);
        catalogEl.append(card);

        btn.addEventListener('click', () => buyProduct(producto, card));
    });
}

export function randomiseDiscount() {
    // Declaramos un array con los tipos de rareza, extrayendo las claves de los objetos agrupados por rareza.
    const byRareza = groupBy(productos, p => p.rareza);
    const rarezas = Object.keys(byRareza);

    // Aplicamos un descuento aleatorio a un tipo de rareza aleatoria antes de pintar el mercado.
    let rarezaRandom = rarezas[Math.floor(Math.random() * rarezas.length)];
    let discountRandom = Math.floor(Math.random() * 51); //Máximo del 50% de descuento.

    aplicarDescuentoRareza(rarezaRandom, discountRandom);
}


const MAX_SELECTED = 6; // número máximo de productos seleccionados
export let selected = []; // array para guardar los productos antes de asignarlos al inventario (lo utilizaremos también para pintar el inventario en pantalla)

export function buyProduct(product, card) {
    const btn = card.querySelector('button');
    const isSelected = card.classList.toggle('selected');    // devuelve true si la clase queda aplicada tras el toggle
    const i = selected.findIndex(p => p.id === product.id); // índice del producto dentro de selected (si ya estaba), -1 si no.

    btn.textContent = isSelected ? 'Devolver' : 'Añadir';

    if (isSelected) {
        if (selected.length >= MAX_SELECTED) {
            card.classList.remove('selected'); // revertimos el toggle
            btn.textContent = 'Añadir';
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
    return productosCopy.forEach(producto => producto.rareza === rareza ? producto.aplicarDescuento(porcentaje) : producto);
}

/**
 * Busca un producto por su nombre exacto dentro de una lista de objetos Producto.
 *
//  * param {Array<Producto|Object>} mercado - Array de productos donde buscar (incluido aquí por si utilizamos clones o copias de `productos`)
 * @param {string} nombre - Nombre del producto a buscar (case-insensitive).
 * @returns {Producto|null} La primera coincidencia (objeto Producto) o `null` si no existe.
 */
export function buscarProducto(nombre) { //Buscamos sobre el array original porque no se realizan modificaciones
    return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase()) || null;
}

/**
 * Muestra la información de un objeto Producto.
 * @param {Producto} producto - Instancia del producto
 * @returns {string} Información detallada del producto
 */
export function mostrarProducto(producto) {
    return producto.mostrarInfo();
}

