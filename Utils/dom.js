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

export function mostrarStats(jugador, sufijo) {
  const nombre = document.getElementById(`playerName${sufijo}`);
  const ataque  = document.getElementById(`ataque${sufijo}`);
  const defensa = document.getElementById(`defensa${sufijo}`);
  const vida    = document.getElementById(`vida${sufijo}`);
  const puntos  = document.getElementById(`puntos${sufijo}`);

  nombre.textContent = jugador.nombre;
  ataque.textContent = "Ataque: " + jugador.ataqueTotal;
  defensa.textContent = "Defensa: " + jugador.defensaTotal;
  vida.textContent = "Vida: " + jugador.vida;
  puntos.textContent = "Puntos: " + jugador.puntos;
}
