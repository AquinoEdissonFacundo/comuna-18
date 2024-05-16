// import styles from './pokemonList.module.css';
// import React from 'react';
// import PokemonCard from '../pokemonCard/pokemonCard';

// const PokemonList = ({ pokemons, addToCart, cart }) => {
//   return (
//     <div className={styles.pokemonListContainer}>
//       {pokemons.map((pokemon) => (
//         <PokemonCard
//           key={pokemon.id}
//           pokemon={pokemon}
//           addToCart={addToCart}
//           inCart={cart.some((item) => item.id === pokemon.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default PokemonList;

import React from 'react';
import styles from './pokemonList.module.css';

const PokemonList = ({ pokemons, addToCart, cart }) => {
  return (
    <div className={styles.pokemonListContainer}>
      <h2>Lista de Pokemones</h2>
      <ul className={styles.containerUl}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <p>
              Precio: {pokemon.price} {pokemon.currency}
            </p>
            <button
              onClick={() => addToCart(pokemon)}
              disabled={cart.some((item) => item.id === pokemon.id)}
            >
              {pokemon.isPurchased
                ? 'Comprado ✔️'
                : cart.some((item) => item.id === pokemon.id)
                ? 'En Carrito'
                : 'Agregar al Carrito'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
