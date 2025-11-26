import { Enemigo, Jefe } from './Enemigo.js';

export const bestiario = [
    new Enemigo("Parásito Estelar", 35, 120, "./../img/alien.png"),
    new Enemigo("Miriápodo Lúmbrico", 30, 140, "./../img/insect.png"),
    new Enemigo("Serafín del Vacío", 25, 160, "./../img/angel.png"),
    new Enemigo("Meteorito Ancestral", 40, 110, "./../img/meteor.png"),
    new Jefe("Cthulhu", 60, 300, "./../img/cthulu.png", "Llamada del Abismo", 1.5)
]

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
