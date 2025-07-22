import Navbar from "./components/Navbar/Navbar";
import Home from "./routes/Home/Home";
import Product from "./routes/Product/Product"; // Make sure this path is correct
import LibraryStream from "./routes/LibraryStream/LibraryStream";
import Checkout from "./routes/Checkout/Checkout";
import Login from "./routes/Login/Login";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="library/stream/:id" element={<LibraryStream />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
