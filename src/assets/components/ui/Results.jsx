import { useState } from "react";
import Gallery from "./Gallery";
import MainImage from "./MainImage";
import NavigationButton from "./NavigationButton";

function Results({ images }) {

  const imagesPerPage = 9;

  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return <p>No hay imágenes</p>;
  }

  const start = (page - 1) * imagesPerPage;
  const currentImages = images.slice(start, start + imagesPerPage);

  const current = currentImages[selected] || currentImages[0];

  const totalPages = Math.ceil(images.length / imagesPerPage);

  return (
    <div className="results-container">

      <div className="left-panel">

        <MainImage image={current} />

        <div className="nav-buttons">

          <NavigationButton
            text="Anterior"
            onClick={() =>
              setSelected(Math.max(0, selected - 1))
            }
          />

          <NavigationButton
            text="Siguiente"
            onClick={() =>
              setSelected(Math.min(currentImages.length - 1, selected + 1))
            }
          />

        </div>

      </div>

      <div className="right-panel">

        <Gallery images={currentImages} onSelect={setSelected} />

        <div className="pagination">

          {Array.from({ length: totalPages }).map((_, i) => (

            <NavigationButton
              key={i}
              text={i + 1}
              onClick={() => {
                setPage(i + 1);
                setSelected(0);
              }}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default Results;