/**
  * Permite mostrar u ocultar un elemento (escena) de la pantalla.
  * Selecciona todos los elementos con la clase scene y les remueve la clase active
  * Selecciona el elemento con el id especificado y le añade la clase active
  * @param {number} id - identificador del elemento.
  */
export function showScene(id) {
  document.querySelectorAll('.scene').forEach(
    element => element.classList.remove('active')
  );
  document.getElementById(id).classList.add('active');
}

export function mostrarStats(jugador) {
  const photo = document.getElementById('player-photo');
  const name = document.getElementById('player-name');
  const attack  = document.getElementById('attack');
  const defense = document.getElementById('defense');
  const life    = document.getElementById('life');
  const points  = document.getElementById('points');

  photo.innerHTML = `<img src="${jugador.avatar}" alt="Foto del jugador">`;
  name.textContent = jugador.nombre;
  attack.textContent = jugador.ataqueTotal;
  defense.textContent = jugador.defensaTotal;
  life.textContent = jugador.vida;
  points.textContent = jugador.puntos;
}
