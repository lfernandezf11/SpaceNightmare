/**
 * Representa a un enemigo genérico del juego.
 * Se usa como base para cualquier contrincante que pueda entrar en combate.
 * Contiene estadísticas comunes como ataque, vida y un avatar para la UI.
 * @class
 */
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
     * Genera un fragmento HTML con el avatar, tipo y estadísticas básicas
     * listo para inyectar en el DOM.
     * @returns {String} con las características del enemigo. 
     */
    presentar() {
        return `
            <img src="${this.avatar}" alt="${this.nombre}" title="${this.nombre}">
            <p><strong>${this.nombre}</strong><br>
            <span class="boss">${this.tipo}</span><br>
            <span class="small">Ataque: ${this.ataque}<br> 
            Vida: ${this.vida}</span></p>
        `;
    }
};



/**
 * Representa a un enemigo de tipo Jefe.
 * Extiende Enemigo añadiendo una habilidad especial y un multiplicador de daño
 * para hacerlo más peligroso y diferenciarlo en la interfaz.
 * @class
 * @extends Enemigo
 */
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
     * @param {number} [multiplicadorDanio=1.25] - Multiplicador aplicado al daño, con valor por defecto de 1.25
     */
    constructor(nombre, ataque, vida, avatar, habilidad, multiplicadorDanio = 1.25) {
        super(nombre, ataque, vida, avatar); 
        this.tipo = 'Jefe'; // Por defecto, 'Jefe'
        this.habilidad = habilidad;
        this.multiplicadorDanio = multiplicadorDanio;
    }


    /**
     * Presenta al Jefe.
     * Reutiliza la representación del Enemigo base y añade información
     * sobre el multiplicador de daño característico del jefe.
     * @returns {String} con las características del Jefe, incluyendo sus atributos de clase.
     */
    presentar() {
        return `
            ${super.presentar()}
            <span class="attackPlus">Multiplica el daño x ${this.multiplicadorDanio}</span></p>
        `;
    }


    /**
     * Notifica el uso de la habilidad del Jefe.
     * 
     * @returns {String} indicando el uso de la habilidad.
     */
    usarHabilidad() {
        return `!${this.nombre} usa su habilidad especial: ${this.habilidad}!`;
    }
}
