import { Jugador } from "./../Modules/Jugador.js";
import { Enemigo, Jefe } from "./../Modules/Enemigo.js";
import { Producto } from "./../Modules/Producto.js";

/**
 * Instancia principal del jugador de la partida.
 * @type {Jugador}
 */
export let jugador = new Jugador(
  'Teniente al Mando F. Welsch', 0, 0,
  './img/astronaut.png', 100
);


/**
 * Lista de enemigos disponibles en el juego.
 * Incluye enemigos normales e instancias de Jefe.
 * @type {Array<Enemigo|Jefe>} 
 */
export const bestiario = [
  new Enemigo("Parásito Estelar", 26, 80, "./img/alien.png"),
  new Enemigo("Miriápodo Lúmbrico", 28, 95, "./img/insect.png"),
  new Enemigo("Serafín del Vacío", 24, 110, "./img/angel.png"), 
  new Enemigo("Meteorito Ancestral", 32, 100, "./img/meteor.png"), 
  new Jefe("Cthulhu", 40, 180, "./img/cthulu.png", "Llamada del Abismo", 1.5)
];


/**
 * Lista de productos disponibles en el inventario.
 * Cada producto es una instancia de la clase Producto.
 * @type {Producto[]}
 */
export const productos = [
  new Producto("Cuchilla de Plasma", 50, "Rara", "Arma", { ataque: 14 }, "./img/knife.png"),
  new Producto("Casco Antirradiación", 100, "Infrecuente", "Armadura", { defensa: 9 }, "./img/helmet.png"),
  new Producto("Pistola Iónica de Emergencia", 90, "Común", "Arma", { ataque: 8 }, "./img/pistol.png"),
  new Producto("Inyector de Adrenalina Sintética", 200, "Infrecuente", "Consumible", { vida: 18 }, "./img/injector.png"),
  new Producto("Lanza Fotónica", 250, "Legendaria", "Arma", { ataque: 20 }, "./img/lance.png"),
  new Producto("Suero Estabilizador de Oxígeno", 40, "Común", "Consumible", { vida: 12 }, "./img/container.png"),
  new Producto("Kit de Nanobots Médicos", 70, "Épica", "Consumible", { vida: 24 }, "./img/medicalkit.png"),
  new Producto("Guantes de Impacto Cinético", 100, "Infrecuente", "Arma", { ataque: 10 }, "./img/glove.png"),
  new Producto("Placas EVA de Titanio", 100, "Rara", "Armadura", { defensa: 13 }, "./img/plank.png"),
  new Producto("Escudo de Campo Portátil", 115, "Épica", "Armadura", { defensa: 17 }, "./img/shield.png"),
  new Producto("Ampolla de Regeneración Rápida", 80, "Rara", "Consumible", { vida: 20 }, "./img/liquid.png"),
  new Producto("Chaleco Antimeteoro", 300, "Rara", "Armadura", { defensa: 15 }, "./img/vest.png"),
  new Producto("Rifle Gauss de a Bordo", 400, "Épica", "Arma", { ataque: 18 }, "./img/rifle.png"),
  new Producto("Traje Táctico de Desembarco", 30, "Legendaria", "Armadura", { defensa: 20 }, "./img/suit.png"),
  new Producto("Ración Hipercalórica de Emergencia", 20, "Común", "Consumible", { vida: 10 }, "./img/food.png")
];



export const oneDay = 24 * 60 * 60 * 1000;
export const oneYear = oneDay * 365;