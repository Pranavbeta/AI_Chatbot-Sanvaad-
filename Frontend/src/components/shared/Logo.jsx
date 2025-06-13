import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "10px",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="chitti.jpeg"
          alt="chitti"
          className="image-inverted"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </Link>
    </div>
  );
};

export default Logo;
