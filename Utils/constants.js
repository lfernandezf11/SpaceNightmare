import { Jugador } from "./../Modules/Jugador.js";
import { Enemigo, Jefe } from "./../Modules/Enemigo.js";
import { Producto } from "./../Modules/Producto.js";

/**
 * Instancia principal del jugador de la partida.
 * @type {Jugador}
 */
export const jugador = new Jugador(
  'Teniente al Mando F. Welsch',
  './img/astronaut.png'
);

/**
 * Lista de enemigos disponibles en el juego.
 * Incluye enemigos normales e instancias de Jefe.
 * @type {(Enemigo|Jefe)[]}
 */
export const bestiario = [
  new Enemigo("Parásito Estelar", 35, 120, "./../img/alien.png"),
  new Enemigo("Miriápodo Lúmbrico", 30, 140, "./../img/insect.png"),
  new Enemigo("Serafín del Vacío", 25, 160, "./../img/angel.png"),
  new Enemigo("Meteorito Ancestral", 40, 110, "./../img/meteor.png"),
  new Jefe("Cthulhu", 60, 300, "./../img/cthulu.png", "Llamada del Abismo", 1.5)
]

/**
 * Lista de productos disponibles en el inventario.
 * Cada producto es una instancia de la clase Producto.
 * @type {Producto[]}
 */
export const productos = [
  new Producto("Cuchilla de Plasma", 900, "Rara", "Arma", { ataque: 25 }, "./../img/knife.png"),
  new Producto("Casco Antirradiación", 600, "Infrecuente", "Armadura", { defensa: 20 }, "./../img/helmet.png"),
  new Producto("Pistola Iónica de Emergencia", 550, "Común", "Arma", { ataque: 12 }, "./../img/pistol.png"),
  new Producto("Inyector de Adrenalina Sintética", 420, "Infrecuente", "Consumible", { vida: 25 }, "./../img/injector.png"),
  new Producto("Lanza Fotónica", 1500, "Legendaria", "Arma", { ataque: 55 }, "./../img/lance.png"),
  new Producto("Suero Estabilizador de Oxígeno", 320, "Común", "Consumible", { vida: 18 }, "./../img/container.png"),
  new Producto("Kit de Nanobots Médicos", 750, "Épica", "Consumible", { vida: 60 }, "./../img/medicalkit.png"),
  new Producto("Guantes de Impacto Cinético", 700, "Infrecuente", "Arma", { ataque: 18 }, "./../img/glove.png"),
  new Producto("Placas EVA de Titanio", 800, "Rara", "Armadura", { defensa: 30 }, "./../img/plank.png"),
  new Producto("Escudo de Campo Portátil", 1100, "Épica", "Armadura", { defensa: 45 }, "./../img/shield.png"),
  new Producto("Ampolla de Regeneración Rápida", 650, "Rara", "Consumible", { vida: 40 }, "./../img/liquid.png"),
  new Producto("Chaleco Antimeteoro", 950, "Rara", "Armadura", { defensa: 35 }, "./../img/vest.png"),
  new Producto("Rifle Gauss de a Bordo", 1300, "Épica", "Arma", { ataque: 40 }, "./../img/rifle.png"),
  new Producto("Traje Táctico de Desembarco", 1400, "Legendaria", "Armadura", { defensa: 55 }, "./../img/suit.png"),
  new Producto("Ración Hipercalórica de Emergencia", 280, "Común", "Consumible", { vida: 15 }, "./../img/food.png")
];
