import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')


  async function handleSearch() {
    if (input === '') {
      return alert('Digite um cep');
    }
    try {
      const response = await api.get(`${input}/json/`);
      setCep(response.data);
      setInput('');
    } catch (error) {
      alert('Cep não encontrado');
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Cep Finder</h1>

      <div className="containerInput">
        <input
          type="number"
          placeholder="Digite o CEP"
          className="input"
          maxLength={8}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />


        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='white' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (< main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>Logradouro: {cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>DDD: {cep.ddd}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}

    </div >
  );
}

export default App;
