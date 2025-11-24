import { EUR } from './../Utils/constants.js';

export class Producto {
    id;
    nombre;
    precio;
    rareza;
    tipo;
    bonus;
    image;

    static id = 1;
    /**
     * Crea una nueva instancia de Producto con los valores especificados.
     * @param {string} nombre nombre del producto
     * @param {number} precio precio original del producto
     * @param {string} rareza nivel de rareza del producto
     * @param {string} tipo tipo del producto ('Ataque', 'Defensa')
     * @param {Object} bonus Objeto con la bonificación del producto { ataque, defensa, vida }
     */
    constructor(nombre, precio, rareza, tipo, bonus, image) {
        this.id = Producto.id++;
        this.nombre = nombre;
        this.precio = precio;
        this.rareza = rareza;
        this.tipo = tipo;
        this.bonus = bonus;
        this.image = image;
    }


    /**
    * Devuelve la ruta de imagen según el tipo.
    * Implementación en la versión previa.
    */
    // setImage(tipo) {
    //     switch (tipo.toLowerCase()) { // Las rutas se establecen relativas a index.html
    //         case 'ataque': return './img/axe.png';
    //         case 'defensa': return './img/shield.png';
    //         case 'accesorio': return './img/boots.png';
    //         case 'consumible': return './img/hp.png';
    //         default: return './img/apple.png';
    //     }
    // }

    /**
     * Devuelve una cadena con toda la información del producto.
     * @return {string} información detallada del producto con el precio formateado en euros.
     */
    mostrarInfo() {
        // /[{}"]/g regex para sustituir los caracteres entre corchetes de forma global (bandera g)
        return `<img src="${this.image}" alt = "${this.nombre}" title = "${this.nombre}">
                <p><strong>${this.nombre}</strong><br>
                <span class="small">${this.rareza}<br>
                ${JSON.stringify(this.bonus).replace(/[{}""]/g, '').replace(':', ': ')}</span><br> 
                <span class="price">${EUR.format(this.precio)}</span><br></p>`;
    }

    /**
     * Devuelve una cadena la información básica del producto.
     * @return {string} imagen y nombre del producto.
     */
    mostrarInfoReduced() {
        return `<img src="${this.image}" alt = "${this.nombre}" title = "${this.nombre}">`;
    }

    /**
     * Aplica un descuento al precio del objeto en base a un porcentaje dado.
     * Este método valida que el porcentaje esté dentro del rango admitido (0 - 100)
     * y recalcula el precio final. Si el porcentaje es inválido, retorna un mensaje de error.
     * @param {number} porcentaje - Porcentaje de descuento (0–100).
     * @returns {Producto} El propio producto con el precio actualizado.
     */
    aplicarDescuento(porcentaje) {
        if (porcentaje < 0 || porcentaje > 100) {
            throw new Error("El porcentaje debe estar entre 0 y 100.");
        }
        const nuevoPrecio = Math.round(this.precio * (1 - porcentaje / 100));
        this.precio = nuevoPrecio;
        return this;
    }

}