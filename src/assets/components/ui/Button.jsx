import { useState } from "react";
import Button from "./Button";

function InputText({ onSearch }) {

  const [query, setQuery] = useState("");

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
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar imágenes..."
        className="search-input"
      />

      <Button
        text="Buscar"
        type="submit"
      />

    </form>
  );
}

export default InputText;