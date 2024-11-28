const carousel = document.getElementById('carousel');
const thumbnails = document.getElementById('thumbnails');
const totalPokemon = 5; // Número de Pokémon a generar
const maxPokemonID = 898; // Máximo ID de Pokémon en la PokeAPI
let angle = 0;
let angleIncrement;

// Función para generar un número aleatorio en un rango
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar las cartas de Pokémon dinámicamente
function generatePokemonCards() {
  for (let i = 0; i < totalPokemon; i++) {
    const pokemonID = getRandomInt(1, maxPokemonID); // ID aleatorio entre 1 y 898

    // Crear carta para el carrusel
    const card = document.createElement('div');
    card.className = 'carousel-card';
    card.style.transform = `rotateY(${i * (360 / totalPokemon)}deg) translateZ(300px)`;
    card.innerHTML = ` 
      <div class="envelope">
        <div class="top"></div> <!-- Parte superior del sobre -->
        <div class="bottom"></div> <!-- Parte inferior del sobre -->
      </div>
      <div class="pokemon">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png" alt="Pokemon ${pokemonID}">
        <h5>Pokemon ${pokemonID}</h5>
        <p>?</p>
      </div>
    `;

    card.addEventListener('click', () => {
        const envelope = card.querySelector('.envelope');
        const top = card.querySelector('.envelope .top');
        const bottom = card.querySelector('.envelope .bottom');
        const pokemon = card.querySelector('.pokemon');
    
        if (!card.classList.contains('open')) {
            // Paso 1: Eliminar la parte superior del sobre
            top.classList.add('hide-top');
            console.log('Parte superior oculta', top);
    
            // Paso 2: Esperar 3 segundos y luego eliminar todo el sobre
            setTimeout(() => {
                bottom.classList.add('hide-bottom');
                console.log('Parte inferior oculta', bottom); // Eliminar la parte inferior del sobre
                pokemon.classList.add('show'); // Mostrar la carta Pokémon después de 3 segundos
            }, 3000);
    
            card.classList.add('open');
        } else {
            // Si ya está abierto, restablecer todo
            top.classList.remove('hide-top');
            bottom.classList.remove('hide-bottom');
            pokemon.classList.remove('show');
            card.classList.remove('open');
        }
    });
    
    

    carousel.appendChild(card);

    // Crear miniatura para el área de miniaturas
    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.innerHTML = `
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png" alt="Pokemon ${pokemonID}">
    `;
    thumbnails.appendChild(thumbnail);
  }
  angleIncrement = 360 / totalPokemon; // Actualiza el incremento de ángulo
}

// Rotación del carrusel
document.getElementById('prev').addEventListener('click', () => {
  angle -= angleIncrement;
  carousel.style.transform = `rotateY(${angle}deg)`;
});

document.getElementById('next').addEventListener('click', () => {
  angle += angleIncrement;
  carousel.style.transform = `rotateY(${angle}deg)`;
});

// Generar las cartas y miniaturas dinámicamente
generatePokemonCards();








