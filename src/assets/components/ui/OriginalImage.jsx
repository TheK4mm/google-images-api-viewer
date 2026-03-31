function OriginalImage({ image }) {

  return (
    <img
      src={image.original}
      alt="original"
      className="main-photo"
    />
  );
}

export default OriginalImage;