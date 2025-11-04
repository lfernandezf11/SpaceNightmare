import { Enemigo } from './Enemigo.js';

export class Jefe extends Enemigo {
    habilidad;
    multiplicadorDanio;
    /**
     * Crea una instancia de Jefe.
     * @param {String} nombre - Nombre del jefe.
     * @param {number} ataque - Valor de ataque.
     * @param {number} vida - Puntos de vida.
     * @param {String} habilidad - Descripción de la habilidad especial.
     * @param {number} [multiplicadorDanio=1.25] - Multiplicador aplicado al daño.
     */
    constructor(nombre, ataque, vida, habilidad, multiplicadorDanio = 1.25) {
        super('Jefe', nombre, ataque, vida); // Declarar el valor por defecto en la llamada a la clase padre, para respetar los argumentos esperados.
        this.habilidad = habilidad;
        this.multiplicadorDanio = multiplicadorDanio;
    }

    /**
     * Presenta al Jefe.
     * @returns {String} con las características del Jefe, incluyendo sus atributos de clase.
     */
    presentar() {
        return `${super.presentar()} Además, tengo la habilidad especial "${this.habilidad}" y mi daño se multiplica por ${this.multiplicadorDanio}.`;
    }

    /**
     * Notifica el uso de la habilidad del Jefe.
     * @returns {String} indicando el uso de la habilidad.
     */
    usarHabilidad() {
        return `!${this.nombre} usa su habilidad especial: ${this.habilidad}!`;
    }
}