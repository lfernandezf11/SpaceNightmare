export class Enemigo {
    tipo;
    nombre;
    ataque;
    vida; 
    avatar;

    /**
     * Crea una nueva instancia de Enemigo
     * @param {string} tipo - Tipo del enemigo (se sobrescribe por defecto a 'Enemigo').
     * @param {string} nombre - Nombre del enemigo.
     * @param {number} ataque - Valor de ataque.
     * @param {number} vida - Puntos de vida.
     * @param {string} avatar - Ruta de la imagen del enemigo.
     */
    constructor(nombre, ataque, vida, avatar) {
        this.tipo = 'Enemigo'; //Por defecto, 'Enemigo'.
        this.nombre = nombre;
        this.ataque = ataque;
        this.vida = vida;
        this.avatar = avatar;
    }

    /**
     * Presenta al Enemigo.
     * @returns {String} con las características del enemigo. 
     */
    presentar() {
        return `Soy ${this.nombre}, un ${this.tipo} con ${this.vida} puntos de vida y ${this.ataque} de ataque.`;
    }
};


export class Jefe extends Enemigo {
    habilidad;
    multiplicadorDanio;
    /**
     * Crea una instancia de Jefe.
     * @param {String} nombre - Nombre del jefe.
     * @param {number} ataque - Valor de ataque.
     * @param {number} vida - Puntos de vida.
     * @param {string} avatar - URL del avatar del jefe.
     * @param {String} habilidad - Descripción de la habilidad especial.
     * @param {number} [multiplicadorDanio=1.25] - Multiplicador aplicado al daño.
     */
    constructor(nombre, ataque, vida, avatar, habilidad, multiplicadorDanio = 1.25) {
        super(nombre, ataque, vida, avatar); 
        this.tipo = 'Jefe';
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


