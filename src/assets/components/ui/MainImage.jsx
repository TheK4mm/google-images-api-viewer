import OriginalImage from "./OriginalImage";
import TextInfo from "./TextInfo";

function MainImage({ image }) {

  return (
    <div className="main-image">

      <OriginalImage image={image} />

      <TextInfo image={image} />

    </div>
  );
}

export default MainImage;