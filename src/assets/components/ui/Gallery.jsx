import Thumbnail from "./Thumbnail";

function Gallery({ images, onSelect }) {

  return (
    <div className="gallery">

      {images.slice(0, 9).map((img, index) => (

        <Thumbnail
          key={index}
          image={img}
          onClick={() => onSelect(index)}
        />

      ))}

    </div>
  );
}

export default Gallery;