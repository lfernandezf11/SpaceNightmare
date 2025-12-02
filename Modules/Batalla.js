import { Jefe } from './Enemigo.js';

const player = document.getElementById('player-container');
const enemy = document.getElementById('enemy-container');
const winner = document.querySelector('#winner-name span');
const playerPoints = document.querySelector('#player-points span');


export function combat(jugador, enemigo) {
  let hpPlayer = jugador.vida;
  let hpEnemy = enemigo.vida;

  const damagePlayer = jugador.ataqueTotal;
  const damageEnemy = Math.max(1, enemigo.ataque - jugador.defensaTotal);

  let totalDamage = 0; //Acumulador de daño infligido por el enemigo en los turnos que dure la batalla.

  while (hpPlayer > 0 && hpEnemy > 0) {
    hpEnemy -= damagePlayer;
    hpPlayer -= damageEnemy;
    totalDamage += damageEnemy;
  }

  // Cálculo de puntos
  let winnerName = enemigo.nombre;
  let points = 0;

  if (hpPlayer > 0 && hpEnemy <= 0) { // El jugador gana
    winnerName = jugador.nombre;

    let base = 100 + totalDamage;
    points = enemigo instanceof Jefe
      ? (base * (enemigo.multiplicadorDanio ?? 1))
      : base;

    jugador.puntos += points;
    jugador.vida = Math.min(jugador.vidaMaxima, Math.max(1, hpPlayer));
  } else { // El enemigo gana
    jugador.vida = 0;
  }

  showWinner(winnerName, points);
}

export function paintBattle(jugador, enemigo) {
  player.innerHTML = `<img src="${jugador.avatar}" alt="${jugador.nombre}, jugador"></img>`;
  enemy.innerHTML = `<img src="${enemigo.avatar}" alt="${enemigo.nombre}, contrincante"></img>`;
}


function showWinner (name, plusPoints) {
  winner.textContent = name;
  playerPoints.textContent = plusPoints;
}

