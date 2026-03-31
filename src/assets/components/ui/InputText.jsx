import { useState } from "react";

function InputText({ onSearch }) {

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar imágenes..."
        className="search-input"
      />

      <button type="submit" className="search-button">
        Buscar
      </button>

    </form>
  );
}

export default InputText;