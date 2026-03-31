import { useState } from "react";
import SearchBar from "./assets/components/ui/SearchBar";
import Results from "./assets/components/ui/Results";
import "./App.css";

function App() {

  const [images, setImages] = useState([]);

  const searchImages = async (query) => {

    const response = await fetch(
      `http://localhost:3000/imagenes?q=${query}`
    );

    const data = await response.json();

    setImages(data.images_results || []);
  };

  return (
    <div className="app">

      <h1>Consumo de SerpAPI con React</h1>

      <SearchBar onSearch={searchImages} />

      <Results images={images} />

    </div>
  );
}

export default App;