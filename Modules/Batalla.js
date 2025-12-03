import { Jefe } from './Enemigo.js';
import { Jugador } from './Jugador.js';

const player = document.getElementById('player-container');
const enemy = document.getElementById('enemy-container');
const winner = document.querySelector('#winner-name span');
const playerPoints = document.querySelector('#player-points span');

/**
 * Ejecuta un combate entre un jugador y un enemigo, simulando turnos
 * hasta que uno de los dos llegue a 0 puntos de vida o menos.
 * Calcula el daño total recibido por el jugador, los puntos obtenidos
 * por la victoria (si la hay) y actualiza la vida y puntos del jugador.
 * Finalmente muestra en pantalla el ganador y los puntos conseguidos.
 *
 * @param {Jugador} jugador - Objeto que representa al jugador.
 * @param {Enemigo|Jefe} enemigo - Objeto que representa al enemigo, de tipo 'Enemigo' o 'Jefe'.
 */
export function combat(jugador, enemigo) {
  let hpPlayer = jugador.vida;
  let hpEnemy = enemigo.vida;

  const damagePlayer = jugador.ataqueTotal;
  const damageEnemy = Math.max(1, enemigo.ataque - jugador.defensaTotal);

  let totalDamage = 0; //Acumulador de daño infligido por el enemigo en los turnos que dure la batalla.

  console.log("Vida inicial, JUGADOR: " + hpPlayer);
  console.log("Vida inicial, ENEMIGO: " + hpEnemy);
  console.log("Daño infligido, JUGADOR: " + damagePlayer);
  console.log("Daño infligido, ENEMIGO: " + damageEnemy);
  console.log("Daño acumulado durante el combate: " + totalDamage);
  let round = 1;
  console.log("¡EMPIEZA EL COMBATE!")

  // Bucle de combate: ambos atacan en cada iteración hasta que alguno se queda sin vida.
  while (hpPlayer > 0 && hpEnemy > 0) {
    hpEnemy -= damagePlayer;
    hpPlayer -= damageEnemy;
    totalDamage += damageEnemy;
    
    console.log("RONDA " + round + "----------------------")
    console.log("Vida enemigo: " + hpEnemy)
    console.log("Vida jugador: " + hpPlayer)
    console.log("Daño acumulado: " + totalDamage)
    round += 1;
  }

  // Cálculo de puntos
  let winnerName = enemigo.nombre;
  let points = 0;

  if (hpPlayer > 0 && hpEnemy <= 0) { // El jugador gana
    winnerName = jugador.nombre;

    // Calcula la puntuación base y aplica multiplicador si el enemigo es un Jefe.
    let base = 100 + totalDamage;
    points = enemigo instanceof Jefe
      ? (base * (enemigo.multiplicadorDanio ?? 1))
      : base;

    // Suma los puntos al jugador y ajusta su vida. Establece un mínimo de vida (1) para poder pasar a la siguiente batalla sin morir.
    jugador.puntos += points;
    jugador.vida = Math.min(jugador.vidaMaxima, Math.max(1, hpPlayer));
  } else { // El enemigo gana
    jugador.vida = 0;
  }

  // Muestra el resultado de la batalla en la interfaz.
  showWinner(winnerName, points);
}

/**
 * Pinta en pantalla los avatares del jugador y del enemigo.
 *
 * @param {Jugador} jugador - Objeto del jugador con su propiedad avatar.
 * @param {Enemigo|Jefe} enemigo - Objeto del enemigo con su propiedad avatar.
 */
export function paintBattle(jugador, enemigo) {
  player.innerHTML = `<img src="${jugador.avatar}" alt="${jugador.nombre}, jugador"></img>`;
  enemy.innerHTML = `<img src="${enemigo.avatar}" alt="${enemigo.nombre}, contrincante"></img>`;
}

/**
 * Muestra el nombre del ganador y los puntos obtenidos en la interfaz.
 *
 * @param {string} name - Nombre del ganador del combate.
 * @param {number} plusPoints - Puntos adicionales obtenidos por el jugador.
 */
function showWinner(name, plusPoints) {
  winner.textContent = name;
  playerPoints.textContent = plusPoints;
}