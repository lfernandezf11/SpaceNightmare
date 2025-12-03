import { Jugador } from "./Jugador.js";

const playerImage = document.querySelector('.results-container img');
const playerName = document.getElementById('player-nameEnd');
const playerPoints = document.querySelector('#player-pointsEnd span'); 
const playerStatus = document.querySelector('h4 span');

/**
 * Decide el nivel del jugador según su puntuación final:
 * - "veterana" si iguala o supera el umbral.
 * - "novata" si no lo alcanza.
 *
 * @param {Jugador} jugador - Jugador participante.
 * @param {number} [umbral=150] - Puntos mínimos para ser "veterana". Por defecto, 150.
 * @returns {string} Nivel del jugador: "veterana" o "novata".
 */
export function getPlayerStatus(jugador, umbral = 150) {
    return jugador.puntos >= umbral? "veterana" : "novata";
}


/**
 * Muestra en la escena final los datos del jugador y su rango.
 *
 * @param {Jugador} jugador - Jugador al finalizar la partida.
 * @param {string} status - Nivel calculado ("veterana" o "novata").
 */
export function showPlayerStatus(jugador, status) {
    playerImage.setAttribute('src', jugador.avatar);
    playerImage.setAttribute('alt', jugador.nombre);
    playerName.textContent = jugador.nombre;
    playerPoints.textContent = jugador.puntos;
    playerStatus.textContent = status;
}