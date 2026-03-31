function Thumbnail({ image, onClick }) {

  return (
    <img
      src={image.thumbnail}
      alt="thumbnail"
      className="thumbnail"
      onClick={onClick}
    />
  );
}

export default Thumbnail;