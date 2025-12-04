/**
 * Módulo de gestión del mercado y el inventario de productos.
 * Se encarga de:
 *  - Construir el catálogo y mostrarlo en pantalla.
 *  - Aplicar descuentos aleatorios por rareza.
 *  - Gestionar la selección de productos (array selected).
 *  - Pintar el inventario previo a la compra.
 *  - Proveer utilidades de filtrado, búsqueda y aplicación de descuentos.
 */

import { Producto } from './Producto.js';
import { productos } from './../Utils/constants.js';
import { groupBy } from './../Utils/utils.js';
import { jugador } from './../Utils/constants.js';

let rarezaSelected = null;   // Variable en la que guardaremos la rareza elegida antes de aplicar el descuento aleatorio sobre el mercado.
let porcentajeSelected = null; // Lo mismo pero para el porcentaje

// Usamos un clon del mercado para no alterar el original a la hora de aplicar descuentos.
export let productosCopy = productos.map(p =>
  new Producto(p.nombre, p.precio, p.rareza, p.tipo, { ...p.bonus }, p.image)
);

/**
 * Muestra el catálogo de productos en la escena del mercado:
 * - Aplica un descuento aleatorio por rareza.
 * - Pinta las cartas de producto.
 * - Marca las que están en oferta.
 * - Añade el botón "Añadir" y su handler (manejador).
 */
export function showCatalog() {
  const discount = document.getElementById('discount');
  const catalogEl = document.getElementById('card-container');

  randomiseDiscount();
  discount.innerHTML = `Los productos de rareza <i>${rarezaSelected}</i> tienen un ${porcentajeSelected}% de descuento`;
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

/**
 * Genera una rareza y un porcentaje de descuento aleatorios
 * y aplica ese descuento sobre la copia del catálogo (`productosCopy`).
 * También actualiza `rarezaSelected` y `porcentajeSelected`.
 */
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

/**
 * Alterna la selección de un producto del catálogo:
 * - Añade el producto a `selected` (hasta MAX_SELECTED) o lo quita.
 * - Actualiza el estado visual de la carta y el texto del botón.
 * - Lanza la animación del icono de carrito al añadir.
 * - Repinta el inventario previo a la compra con `paintInventory`.
 *
 * @param {Producto} product - Producto asociado a la carta.
 * @param {HTMLDivElement} card - Elemento DOM de la carta del producto.
 */
export function buyProduct(product, card) {
  const btn = card.querySelector('button');
  const isSelected = card.classList.toggle('selected');    // devuelve true si la clase queda aplicada tras el toggle
  const i = selected.findIndex(p => p.id === product.id); // índice del producto dentro de selected (si ya estaba), -1 si no.
  const dinero = document.getElementById('dinero');

  btn.textContent = isSelected ? 'Retirar' : 'Añadir';

  if (isSelected) {
    if (selected.length >= MAX_SELECTED || jugador.dinero - product.precio < 0) {
      card.classList.remove('selected'); // revertimos el toggle
      btn.textContent = 'Añadir';
      return;
    }
    if (i === -1 && (jugador.dinero - product.precio >=0) ) {
      selected.push(product);
      jugador.dinero -= product.precio;
      dinero.textContent = jugador.dinero + "monedas";
    }
    // Sólo se genera la animación del icono cuando se confirma que el artículo puede añadirse al inventario.
    if (!card.querySelector('.cart-icon')) {
      const icon = document.createElement('span');
      icon.classList.add('cart-icon', 'show');
      icon.innerHTML = `<i class="fa fa-shopping-cart" aria-hidden="true"></i>`;
      btn.appendChild(icon); //El icon como nodo hijo del botón para situarlo con position:absolute respecto a él.

      //No es necesario, al pulsar 'Retirar' la animación ya se ha producido y el icon tiene opacity 0, no estorba visualmente. Lo hacemos para limpiar el DOM.
      setTimeout(() => { if (btn.contains(icon)) btn.removeChild(icon) }, 1500);
    }
  } else { // Si el producto NO está seleccionado (!isSelected) pero existía en el inventario, se elimina.
    if (i !== -1) {
      selected.splice(i, 1);
      jugador.dinero += product.precio;
      dinero.textContent = jugador.dinero + 'monedas';
    }
    
  }
  paintInventory(selected); //Pinta el inventario con los objetos seleccionados antes de pulsar 'Comprar'.
}



  // Contenedor y slots del inventario mostrado en la escena de mercado.
  const inventoryEl = document.getElementById('inventory-container');
  const slots = Array.from(inventoryEl.querySelectorAll('.item'));


  /**
   * Pinta una lista de productos en los slots del inventario de la tienda.
   * Cada producto ocupa un slot en orden; los slots sobrantes se vacían.
   *
   * @param {Producto[]} list - Lista de productos a mostrar.
   */
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
   * Aplica un descuento a todos los productos de una rareza específica
   * sobre la copia `productosCopy`, y guarda la rareza y el porcentaje
   * para poder mostrarlos en la interfaz.
   *
   * @param {string} rareza - Rareza a la que se aplicará el descuento.
   * @param {number} porcentaje - Porcentaje de descuento (entre 0 y 100).
   */
  export function aplicarDescuentoRareza(rareza, porcentaje) {
    //Almacenamos la rareza y el porcentaje aleatorios aquí, para poder marcar los productos con descuento en la escena 2
    rarezaSelected = rareza;
    porcentajeSelected = porcentaje;
    return productosCopy.forEach(producto =>
      producto.rareza === rareza ? producto.aplicarDescuento(porcentaje) : producto
    );
  }


  /**
   * Busca un producto por su nombre exacto dentro de la lista original `productos`.
   *
   * @param {string} nombre - Nombre del producto a buscar (case-insensitive).
   * @returns {Producto|null} La primera coincidencia (objeto Producto) o `null` si no existe.
   */
  export function buscarProducto(nombre) { //Buscamos sobre el array original porque no se realizan modificaciones
    return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase()) || null;
  }


  /**
   * Devuelve el HTML de la información detallada de un producto,
   * delegando en el método `mostrarInfo` de la clase Producto.
   *
   * @param {Producto} producto - Instancia del producto
   * @returns {string} Información detallada del producto
   */
  export function mostrarProducto(producto) {
    return producto.mostrarInfo();
  }
