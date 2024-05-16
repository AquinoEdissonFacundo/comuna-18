import React from 'react';

const PokemonCard = ({ pokemon, addToCart, inCart }) => {
  return (
    <div>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>
        Precio: {pokemon.price} {pokemon.currency}
      </p>
      <button onClick={() => addToCart(pokemon)} disabled={inCart}>
        {inCart ? 'Comprado' : 'Agregar al carrito'}
      </button>
    </div>
  );
};

export default PokemonCard;
