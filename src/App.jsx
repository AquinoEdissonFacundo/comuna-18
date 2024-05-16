import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import styles from './App.module.css';
import PokemonList from './componentes/pokemonList/pokemonList';
import Wallet from './componentes/wallet/wallet';
import SearchBar from './componentes/searchBar/searchBar';
import CartModal from './componentes/cart/cart';

const API_URL = import.meta.env.VITE_API_URL_POKEMON;
const API_URL_EXCHANGERATE = import.meta.env.VITE_API_URL_EXCHANGERATE;
const API_URL_POKEMON_SEARCH = import.meta.env.VITE_API_URL_POKEMON_SEARCH;
const INITIAL_LIMIT = 20;
const LIMIT_INCREMENT = 20;

const App = () => {
  const generateRandomPrice = () => (Math.random() * 100).toFixed(2);

  const getRandomCurrency = () => {
    const currencies = ['USD', 'EUR', 'MXN', 'JPY', 'GBP'];
    return currencies[Math.floor(Math.random() * currencies.length)];
  };

  const getRandomBalance = () => (Math.random() * 500 + 100).toFixed(2);

  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [wallet, setWallet] = useState({
    currency: 'MXN',
    balance: parseFloat(getRandomBalance()),
  });
  const [cart, setCart] = useState([]);
  const [foundPokemon, setFoundPokemon] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [purchasedPokemons, setPurchasedPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [addToCartPokemon, setAddToCartPokemon] = useState(null);

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  useEffect(() => {
    const getExchangeRates = async () => {
      const rates = await fetchExchangeRates();
      if (rates) {
        setExchangeRates(rates.conversion_rates);
      }
    };

    getExchangeRates();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(
        `${API_URL}?limit=${INITIAL_LIMIT}&offset=${offset}`
      );
      console.log('Response:', response.data);
      const results = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            price: generateRandomPrice(),
            currency: getRandomCurrency(),
            id: details.data.id,
            sprite: details.data.sprites.front_default,
          };
        })
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...results]);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(`${API_URL_EXCHANGERATE}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las tasas de cambio:', error);
      return null;
    }
  };

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      alert('Por favor ingrese el nombre del Pokémon');
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL_POKEMON_SEARCH}/${searchTerm.toLowerCase()}`
      );
      setAddToCartPokemon({
        name: response.data.name,
        price: generateRandomPrice(),
        currency: getRandomCurrency(),
        id: response.data.id,
        sprite: response.data.sprites.front_default,
      });
    } catch (error) {
      alert('Pokémon no encontrado');
      console.error('Error al buscar el Pokémon:', error);
    }
  };

  const handleBackToList = () => {
    setAddToCartPokemon(null);
  };

  const handleAddToCart = (pokemon) => {
    if (
      !purchasedPokemons.includes(pokemon.id) &&
      !cart.some((item) => item.id === pokemon.id)
    ) {
      setCart([...cart, pokemon]);
    }
  };

  const handleAddToCartFromSearch = () => {
    if (addToCartPokemon) {
      handleAddToCart(addToCartPokemon);
      setAddToCartPokemon(null);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const totalPurchase = cart.reduce((total, pokemon) => {
      const rate = exchangeRates[pokemon.currency];
      return total + pokemon.price * (1 / rate);
    }, 0);

    if (wallet.balance >= totalPurchase) {
      const newBalance = wallet.balance - totalPurchase;
      setWallet({ ...wallet, balance: newBalance });
      setPurchasedPokemons([
        ...purchasedPokemons,
        ...cart.map((pokemon) => pokemon.id),
      ]);
      setCart([]);
    } else {
      alert('Saldo insuficiente para realizar la compra.');
    }
  };

  const handleAddFunds = (amount) => {
    setWallet((prev) => ({ ...prev, balance: prev.balance + amount }));
  };

  const handleLoadMorePokemons = async () => {
    try {
      const response = await axios.get(
        `${API_URL}?limit=${LIMIT_INCREMENT}&offset=${pokemons.length}`
      );
      const results = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            price: generateRandomPrice(),
            currency: getRandomCurrency(),
            id: details.data.id,
            sprite: details.data.sprites.front_default,
          };
        })
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...results]);
    } catch (error) {
      console.error('Error fetching more pokemons:', error);
    }
  };

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.containerPrimeraSeccion}>
        <h1 className={styles.title}>Tienda de Pokemones</h1>
        <button className={styles.button} onClick={openCartModal}>
          Ver Carrito
        </button>
      </div>
      <div className={styles.containerMonedero}>
        <Wallet wallet={wallet} addFunds={handleAddFunds} />
      </div>

      <Modal
        isOpen={isCartModalOpen}
        onRequestClose={closeCartModal}
        contentLabel='Carrito de Compras'
        className={styles.modal}
      >
        <CartModal
          cart={cart}
          wallet={wallet}
          removeFromCart={handleRemoveFromCart}
          checkout={handleCheckout}
          closeModal={closeCartModal}
          exchangeRates={exchangeRates}
        />
      </Modal>
      <SearchBar onSearch={handleSearch} />
      {addToCartPokemon ? (
        <div className={styles.containerSearch}>
          <h2 className={styles.foundPokemonName}>{addToCartPokemon.name}</h2>
          <img
            // className={styles.foundPokemonImage}
            src={addToCartPokemon.sprite}
            alt={addToCartPokemon.name}
          />
          {!purchasedPokemons.includes(addToCartPokemon.id) &&
          !cart.some((item) => item.id === addToCartPokemon.id) ? (
            <button onClick={handleAddToCartFromSearch}>
              Agregar al carrito
            </button>
          ) : (
            <p>Pokémon ya comprado o en el carrito</p>
          )}
          <button onClick={handleBackToList}>Volver atrás</button>
        </div>
      ) : (
        <div className={styles.containerCarga}>
          <PokemonList
            pokemons={filteredPokemons.map((pokemon) => ({
              ...pokemon,
              isPurchased: purchasedPokemons.includes(pokemon.id),
            }))}
            addToCart={handleAddToCart}
            cart={cart}
          />
          <button
            className={styles.containerCargaPokemones}
            onClick={handleLoadMorePokemons}
          >
            Cargar más Pokemones
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
