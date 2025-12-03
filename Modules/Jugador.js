import { groupBy } from './../Utils/utils.js';
import { Producto } from './Producto.js';

/**
 * Representa al jugador principal de la partida.
 * Gestiona estadísticas, inventario y cálculos derivados para el combate.
 * @class
 */
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
     * @param {string} avatar - Ruta del avatar del jugador.
     */
    constructor(nombre, avatar) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = 0; // Marcador de puntuación acumulada a lo largo de la partida.
        this.inventario = []; // Colección de objetos equipados por el jugador.
        this.vidaMaxima = 80;
        this.vida = this.vidaMaxima;
    }


    /**
     * Añade un producto al inventario del jugador.
     * Crea una nueva instancia de Producto a partir del original para no compartir 
     * referencia con el catálogo y conservar los métodos de la clase.
     * @param {Producto} producto - Objeto que se añadirá al inventario.
     */
    aniadirProducto(producto) {
        const productoClon = new Producto(
            producto.nombre,
            producto.precio,
            producto.rareza,
            producto.tipo,
            // bonus es un OBJETO DE DATOS { vida, ataque, defensa }. 
            // Al ser un objeto, si lo asignamos como el resto de atributos compartiría referencia con el original, lo que no nos sirve. 
            // Aquí sí utilizamos structuredClone porque sólo clonamos datos, sin métodos asociados que perder.
            structuredClone(producto.bonus), 
            producto.image
        );
        // Se añade al inventario la nueva instancia independiente.
        this.inventario.push(productoClon);
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
     * Solo se suman los bonus de tipo ataque presentes en el inventario.
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
     * Se usa como vida inicial al comienzo de un combate,
     * limitada por la vida máxima configurada para el jugador.
     * @returns {number} Puntos de vida inicial, la vida máxima si se supera.
     */
    get vidaInicial() {
        const totalInventario = this.inventario.reduce(
            (total, item) => total + (item.bonus.vida || 0),
            0
        );
        return totalInventario > this.vidaMaxima ? this.vidaMaxima : totalInventario;
    }

    /**
     * Agrupa los objetos del inventario por su tipo.
     * @returns {Object} Un objeto donde las claves son los tipos
     * y los valores son arrays con los productos correspondientes.
     */
    inventarioPorTipo() {
        // Usa la utilidad groupBy para obtener una estructura
        // { tipo: [productosDeEseTipo] }
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
