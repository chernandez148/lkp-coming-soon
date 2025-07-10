import Navbar from "./components/Navbar/Navbar";
import Home from "./routes/Home/Home";
import Product from "./routes/Product/Product"; // Make sure this path is correct
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
