import "./Navbar.css";
import Logo from "../../assets/images/LEFTKOAST-LOGO.png";
function Navbar() {
  return (
    <div className="Navbar">
      <img src={Logo} width={50} />
      <ul></ul>
    </div>
  );
}

export default Navbar;
