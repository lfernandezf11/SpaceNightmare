/**
 * Formateador de números a euros según la convención española.
 * Intl.NumberFormat() clase de JS para formatear números
 * @example
 * EUR.format(1500); // "1.500,00 €"
 */
export const EUR = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR'
});


/**
  * Permite mostrar u ocultar un elemento (escena) de la pantalla.
  * Selecciona todos los elementos con la clase scene y les remueve la clase active
  * Selecciona el elemento con el id especificado y le añade la clase active
  * @param {number} id - identificador del elemento.
  */
export function showScene(id) {
  document.querySelectorAll('.scene').forEach(
    element => element.classList.remove('active')
  );
  document.getElementById(id).classList.add('active');
}

export function mostrarStats(jugador, sufijo) {
  const photo = document.getElementById('player-photo' + sufijo);
  const name = document.getElementById('player-name' + sufijo);
  const attack  = document.getElementById('attack' + sufijo);
  const defense = document.getElementById('defense' + sufijo);
  const life    = document.getElementById('life' + sufijo);
  const points  = document.getElementById('points' + sufijo);

  photo.innerHTML = `<img src="${jugador.avatar}" alt="Foto del jugador">`;
  name.textContent = jugador.nombre;
  attack.textContent = jugador.ataqueTotal;
  defense.textContent = jugador.defensaTotal;
  life.textContent = jugador.vida;
  points.textContent = jugador.puntos;
}

/**
 * Clonación profunda manual (soporta objetos y arrays anidados)
 * @param {any} obj - Objeto a clonar profundamente
 * @returns {any} Copia independiente de obj
 */

export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(item => deepClone(item));
    const clone = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}

/**
 * Agrupa los elementos de un array según una función clave que se pasa como parámetro.
 *
 * Recorre el array y aplica `keyFunc` a cada elemento para obtener la
 * clave de agrupación. Devuelve un objeto cuyas propiedades son las claves (String) y cuyos
 * valores son arrays con los elementos que pertenecen a cada grupo.
 *
 * @param {Array} array - Array de elementos a agrupar.
 * @param {Function} keyFunc - Función que recibe un elemento y devuelve la clave por la que se agrupará (puede devolver string, number, boolean...).
 * @returns {Object} Objeto que mapea cada clave a un array con los elementos del grupo.
 *
 * @example
 * const items = [{tipo:'arma'},{tipo:'poción'},{tipo:'arma'}];
 * groupBy(items, item => item.tipo);
 * // Devuelve: { arma: [...], poción: [...] } }
 */
export function groupBy(array, keyFunc) {
    // Usamos reduce para acumular los grupos en un único objeto `acc`.
    return array.reduce((acc, item) => {
        // Calculamos la clave para el elemento actual llamando a keyFunc.
        const key = keyFunc(item);
        // Si aún no existe un array asociado a esa clave, lo inicializamos.
        acc[key] = acc[key] || [];
        acc[key].push(item);
        // Devolvemos el acumulador para la siguiente iteración.
        return acc;
    }, {}); // Inicializamos el acumulador como un objeto vacío que contendrá los grupos.
}