import TLOUTEMP from "../../assets/temp/TLOUTEMP.png";
import "./bestGames.scss";
export default function BestGames() {
  return (
    <>
      <div className="big-image-holder">
        <img className="big-sliderImage" src={TLOUTEMP} alt="" />
        <div className="heading-tag">
          <h1>Find The Best Games!</h1>
        </div>
      </div>
    </>
  );
}
