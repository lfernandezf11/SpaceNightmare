import { bestiario } from '../Utils/constants.js';

/**
 * Muestra todas las cartas de enemigos del bestiario en pantalla.
 * Limpia el contenedor y luego genera una tarjeta por enemigo.
 *
 * @returns {void}
 */
export function showBestiario() {
  const container = document.getElementById('enemycard-container');
  container.innerHTML = '';

  bestiario.forEach(enemigo => {
    const card = document.createElement('div');
    card.classList.add('card'); // reutiliza estilos de card si quieres

    card.innerHTML = enemigo.presentar();

    container.appendChild(card);
  });
}

/**
 * Devuelve un enemigo aleatorio del bestiario.
 *
 * @returns {Enemigo|Jefe} Enemigo seleccionado aleatoriamente.
 */
export function getRandomEnemy() {
  let index = Math.floor(Math.random() * bestiario.length);
  return bestiario[index];
}
