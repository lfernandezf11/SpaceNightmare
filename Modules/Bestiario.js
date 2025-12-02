import { bestiario } from '../Utils/constants.js';


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

export function getRandomEnemy() {
  let index = Math.floor(Math.random() * bestiario.length);
  return bestiario[index];
}