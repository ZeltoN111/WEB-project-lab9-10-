import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:trainId" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;