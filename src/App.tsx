import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { GuitarCar } from "./types";


export default function App() {

  const inictialState = () : GuitarCar[] => {
    const initial = localStorage.getItem('carrito');
    return initial?.length ? JSON.parse(initial) : []
  }

  const [carrito, setCarrito] = useState<GuitarCar[]>(inictialState);


  return (
    <>
      <Header
        carrito={carrito}
        setCarrito={setCarrito}
      />
      <Main
        carrito={carrito}
        setCarrito={setCarrito}
      />
      <Footer />
    </>
  )
}