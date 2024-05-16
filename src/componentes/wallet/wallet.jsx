// import React, { useState, useEffect } from 'react';
// import styles from './wallet.module.css';

// const Wallet = () => {
//   const [wallet, setWallet] = useState({ balance: 0, currency: 'MXN' });
//   const [amount, setAmount] = useState('');

//   useEffect(() => {
//     const initialBalance = (Math.random() * (500 - 100) + 100).toFixed(2);
//     setWallet({ balance: parseFloat(initialBalance), currency: 'MXN' });
//   }, []);

//   const addFunds = (amount) => {
//     setWallet((prevWallet) => ({
//       ...prevWallet,
//       balance: prevWallet.balance + amount,
//     }));
//   };

//   const handleAddFunds = () => {
//     const parsedAmount = parseFloat(amount);
//     if (!isNaN(parsedAmount) && parsedAmount > 0) {
//       addFunds(parsedAmount);
//       setAmount('');
//     } else {
//       alert('Ingrese un monto válido');
//     }
//   };

//   const balance = wallet.balance;
//   const currency = wallet.currency;

//   return (
//     <div className={styles.walletcontainer}>
//       <h2>Monedero</h2>
//       <p>
//         Saldo: {balance.toFixed(2)} {currency}
//       </p>
//       <input
//         type='number'
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         placeholder='Monto'
//       />
//       <button onClick={handleAddFunds}>Agregar fondos</button>
//     </div>
//   );
// };

// export default Wallet;

import React, { useState } from 'react';
import styles from './wallet.module.css';

const Wallet = ({ wallet, addFunds }) => {
  const [amount, setAmount] = useState('');

  const handleAddFunds = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      addFunds(parsedAmount);
      setAmount('');
    } else {
      alert('Ingrese un monto válido');
    }
  };

  return (
    <div className={styles.walletcontainer}>
      <h2>Monedero</h2>
      <p>
        Saldo: {wallet.balance.toFixed(2)} {wallet.currency}
      </p>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Monto'
      />
      <button onClick={handleAddFunds}>Agregar fondos</button>
    </div>
  );
};

export default Wallet;
