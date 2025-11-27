import { Jugador } from './Jugador.js';
import { Enemigo, Jefe } from './Enemigo.js';

/**
 * Simula un combate "simultáneo" entre jugador y enemigo.
 * Ambos golpean en cada ronda hasta que uno llega a 0.
 * @param {Jugador} jugador
 * @param {Enemigo|Jefe} enemigo
 * @returns {{ winner: 'jugador'|'enemigo', points: number }}
 */
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
  if (hpPlayer > 0 && hpEnemy <= 0) {
    let base = 100 + totalDamage;
    let points = enemigo instanceof Jefe 
    ? (base * (enemigo.multiplicadorDanio ?? 1))
    : base;
   
    jugador.puntos += points; 
    jugador.vida = Math.min(jugador.vidaMaxima, Math.max(1, hpPlayer));
    return { winner: 'jugador', points };
  }

  // El enemigo gana
  jugador.vida = 0;
  return { winner: 'enemigo', points: 0 };
}