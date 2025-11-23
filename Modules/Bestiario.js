import { Enemigo, Jefe } from './Enemigo.js';

export const bestiario = [
    new Enemigo("Parásito Estelar", 35, 120, "./../img/alien.png"),
    new Enemigo("Miriápodo Lúmbrico", 30, 140, "./../img/insect.png"),
    new Enemigo("Serafín del Vacío", 25, 160, "./../img/angel.png"),
    new Enemigo("Meteorito Ancestral", 40, 110, "./../img/meteor.png"),
    new Jefe("Cthulhu", 60, 300, "Llamada del Abismo", "./../img/cthulu.png", 1.5)
]