import "./ComingSoon.css";
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { FaBluesky } from "react-icons/fa6";

function ComingSoon() {
  return (
    <div className="ComingSoon">
      <div className="coming-soon-content">
        <h1>We’re coming soon</h1>
        <p>Something new is coming. Stay tuned</p>
        <ul>
          <li>
            <a href="#">
              <AiFillInstagram color="white" size={28} />
            </a>
          </li>
          <li>
            <a href="#">
              <AiFillFacebook color="white" size={28} />
            </a>
          </li>
          <li>
            <a href="#">
              <FaBluesky color="white" size={24} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ComingSoon;
