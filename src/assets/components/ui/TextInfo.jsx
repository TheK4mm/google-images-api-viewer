function TextInfo({ image }) {

  return (
    <div className="text-info">

      <p>{image.title}</p>

      <a href={image.link} target="_blank">
        Ver página original
      </a>

    </div>
  );
}

export default TextInfo;