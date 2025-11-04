export class Enemigo {
    tipo;
    nombre;
    ataque;
    vida; 

    /**
     * Crea una nueva instancia de Enemigo
     * @param {string} tipo - Tipo del enemigo (se sobrescribe por defecto a 'Enemigo').
     * @param {string} nombre - Nombre del enemigo.
     * @param {number} ataque - Valor de ataque.
     * @param {number} vida - Puntos de vida.
     */
    constructor(nombre, ataque, vida) {
        this.tipo = 'Enemigo'; //Por defecto, 'Enemigo'.
        this.nombre = nombre;
        this.ataque = ataque;
        this.vida = vida;
    }

    /**
     * Presenta al Enemigo.
     * @returns {String} con las características del enemigo. 
     */
    presentar() {
        return `Soy ${this.nombre}, un ${this.tipo} con ${this.vida} puntos de vida y ${this.ataque} de ataque.`;
    }
};


