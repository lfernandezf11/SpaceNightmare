import { deepClone, groupBy } from './../Utils/helpers.js';

export class Jugador {
    nombre;
    avatar;
    puntos;
    inventario;
    vidaMaxima;
    vida;

    /**
     * Crea una nueva instancia de Jugador.
     * @param {string} nombre - Nombre del jugador.
     */
    constructor(nombre, avatar) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = 0;
        this.inventario = [];
        this.vidaMaxima = 100;
        this.vida = this.vidaMaxima;
    }

    /**
     * Añade un producto al inventario del jugador.
     * Se utiliza una clonación profunda para evitar modificar el objeto original.
     * @param {Producto} producto - Objeto que se añadirá al inventario.
     */
    aniadirProducto(producto) {
        this.inventario.push(deepClone(producto));
    }

    /**
     * Suma puntos de experiencia al jugador.
     * @param {number} experiencia - Puntos que se añadirán al marcador del jugador.
     */
    sumarPuntos(experiencia) {
        this.puntos += experiencia;
    }

    /**
    * Calcula el total de ataque del jugador basado en los bonus de sus ítems.
    * @returns {number} Puntos de ataque totales.
    */
    get ataqueTotal() {
        return this.inventario.reduce((total, item) => total + (item.bonus.ataque || 0), 0);
    }

    /**
     * Calcula el total de defensa del jugador basado en los bonus de sus ítems.
     * @returns {number} Puntos de defensa totales.
     */
    get defensaTotal() {
        return this.inventario.reduce((total, item) => total + (item.bonus.defensa || 0), 0);
    }

    /**
     * Calcula el total de vida del jugador basado en los bonus de sus ítems.
     * @returns {number} Puntos de vida inicial, la vida máxima si se supera.
     */
    get vidaInicial() {
        const totalInventario = this.inventario.reduce((total, item) => total + (item.bonus.vida || 0), 0);
        return totalInventario > this.vidaMaxima ? this.vidaMaxima : totalInventario;
    }

    /**
     * Agrupa los objetos del inventario por su tipo.
     * @returns {Object} Un objeto donde las claves son los tipos
     * y los valores son arrays con los productos correspondientes.
     */
    inventarioPorTipo() {
        return groupBy(this.inventario, productos => productos.tipo);
    }

    /**
     * Devuelve una representación formateada del estado actual del jugador.
     * Incluye su nombre, vida, puntos, ataque, defensa e inventario.
     * @returns {string} Descripción detallada del jugador.
     */
    mostrarJugador() {
        return `
        👤 ${this.nombre}
        ❤ Vida: ${this.vida}/${this.vidaMaxima}
        ⭐ Puntos: ${this.puntos}
        ⚔ Ataque total: ${this.ataqueTotal}
        🛡 Defensa total: ${this.defensaTotal}
        🎒 Inventario: ${this.inventario.length > 0
                ? this.inventario.map(productos => productos.nombre).join(', ')
                : 'Vacío'}
        `;
    }


}
