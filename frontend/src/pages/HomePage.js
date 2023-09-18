import React, { useState } from 'react';
import SongList from "../components/SongList/SongList";
import SearchBar from "../components/searchBar/SearchBar";
import './home.css';

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const apiUrl = 'https://api.example.com'; // Substituir pelo URL da API real

  const handleSearch = (searchTerm) => {
    // Faz uma solicitação à API com o termo de pesquisa
    fetch(`${apiUrl}/search?term=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Atualiza setSearchResults com os resultados da pesquisa
        setSearchResults(data.results);
      })
      .catch((error) => {
        console.error('Erro na solicitação à API:', error);
      });
  };

  return (
    <div>
      <div>
        <h1>Meu Site</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Renderiza os resultados da pesquisa aqui */}
      <h1>Resultados da Pesquisa:</h1>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <h2>{result.title}</h2>
            <p>{result.description}</p>
            {/* Adicionar outras informações relevantes, caso tenha mais alguma propriedade */}
          </li>
        ))}
      </ul>

      <h1>Tocadas Recentemente</h1>
      <SongList></SongList>

      <h1>Sugestões</h1>
      <SongList></SongList>
    </div>
  );
}