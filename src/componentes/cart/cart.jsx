// import React from 'react';
// import styles from './cart.module.css';
// const CartModal = ({
//   cart,
//   wallet,
//   exchangeRates,
//   removeFromCart,
//   checkout,
//   closeModal,
// }) => {
//   const getTotal = () => {
//     return cart
//       .reduce((acc, pokemon) => {
//         const rate = exchangeRates[pokemon.currency];
//         return acc + pokemon.price * (1 / rate);
//       }, 0)
//       .toFixed(2);
//   };

//   return (
//     <div className={styles.containerCart}>
//       <h2>Carrito de Compras</h2>
//       {cart.length === 0 ? (
//         <p>No hay pokemones en el carrito.</p>
//       ) : (
//         <ul>
//           {cart.map((pokemon) => (
//             <li key={pokemon.id}>
//               <img src={pokemon.sprite} alt={pokemon.name} />
//               <p>{pokemon.name}</p>
//               <p>
//                 Precio: {pokemon.price} {pokemon.currency}
//               </p>
//               <p>
//                 Equivalente:{' '}
//                 {(pokemon.price / exchangeRates[pokemon.currency]).toFixed(2)}{' '}
//                 {wallet.currency}
//               </p>
//               <button onClick={() => removeFromCart(pokemon.id)}>
//                 Eliminar
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <h3>
//         Total: {getTotal()} {wallet.currency}
//       </h3>
//       <button onClick={checkout} disabled={cart.length === 0}>
//         Comprar
//       </button>
//       <button onClick={closeModal}>Cerrar</button>
//     </div>
//   );
// };

// export default CartModal;

// import React from 'react';
// import styles from './cart.module.css';

// const Cart = ({ cart, wallet, exchangeRates, removeFromCart, checkout }) => {
//   const calculateTotal = () => {
//     return cart
//       .reduce((acc, pokemon) => {
//         const rate = exchangeRates[pokemon.currency];
//         return acc + pokemon.price * (1 / rate);
//       }, 0)
//       .toFixed(2);
//   };

//   return (
//     <div className={styles.containerCart}>
//       <h2>Carrito de Compras</h2>
//       <ul>
//         {cart.map((pokemon) => (
//           <li key={pokemon.id}>
//             {pokemon.name} - {pokemon.price} {pokemon.currency}
//             <button onClick={() => removeFromCart(pokemon.id)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
//       <p>
//         Total: {calculateTotal()} {wallet.currency}
//       </p>
//       <button onClick={checkout}>Confirmar compra</button>
//     </div>
//   );
// };

// export default Cart;

import React from 'react';
import styles from './cart.module.css';
const CartModal = ({
  cart,
  wallet,
  exchangeRates,
  removeFromCart,
  checkout,
  closeModal,
}) => {
  const getTotal = () => {
    return cart
      .reduce((acc, pokemon) => {
        const rate = exchangeRates[pokemon.currency];
        return acc + pokemon.price * (1 / rate);
      }, 0)
      .toFixed(2);
  };

  return (
    <div className={styles.containerCart}>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No hay pokemones en el carrito.</p>
      ) : (
        <ul className={styles.containerUl}>
          <h3>
            Total: {getTotal()} {wallet.currency}
          </h3>
          <button onClick={checkout} disabled={cart.length === 0}>
            realizar compra
          </button>
          {cart.map((pokemon) => (
            <li key={pokemon.id}>
              <img src={pokemon.sprite} alt={pokemon.name} />
              <p>{pokemon.name}</p>
              <p>
                Precio: {pokemon.price} {pokemon.currency}
              </p>
              <p>
                Equivalente:{' '}
                {(pokemon.price / exchangeRates[pokemon.currency]).toFixed(2)}{' '}
                {wallet.currency}
              </p>
              <button onClick={() => removeFromCart(pokemon.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}{' '}
      <button onClick={closeModal}>Cerrar</button>
    </div>
  );
};

export default CartModal;
