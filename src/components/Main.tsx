import { Dispatch, SetStateAction, useEffect } from "react";
import { db } from "../data/data";
import type { Guitar, GuitarCar } from "../types";

type MainProps = {
  carrito: GuitarCar[],
  setCarrito: Dispatch<SetStateAction<GuitarCar[]>>
}

export default function Main({ carrito, setCarrito }: MainProps) {

  const handleClick = (Guitarra: Guitar) => {
    const guitarExist = carrito.some(item => item.id === Guitarra.id)

    if (guitarExist) {
      setCarrito(
        carrito.map(
          item => item.id === Guitarra.id ?
            { ...item, quantity: item.quantity + 1 } :
            item
        )
      )
    } else {
      const newGuitarCar: GuitarCar = { ...Guitarra, quantity: 1 }
      setCarrito([...carrito, newGuitarCar])
    }
  }

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  return (
    <main>
      <section className="container mx-auto pb-3">

        <h1 className="text-center text-6xl text-amber-600 font-bold py-10 max-sm:text-5xl">Las Mejores Guitarras</h1>

        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 max-sm:p-2 items-center gap-3">

          {db.map(Guitarra => (
            <div key={Guitarra.id} className="bg-white flex p-2 rounded-md shadow">
              <div >
                <img className="max-w-35 max-sm:max-w-25" src={`/img/${Guitarra.image}.jpg`} alt={Guitarra.name} />
              </div>

              <div className="pr-5">
                <h2 className="text-4xl my-2 font-medium max-sm:text-3xl">{Guitarra.name}</h2>
                <p className="text-md">{Guitarra.description}</p>
                <p className="text-4xl text-indigo-700 font-bold my-3 max-sm:text-3xl">${Guitarra.price}</p>
                <button
                  className="cursor-pointer text-center text-md text-white font-medium p-2.5 rounded-md bg-amber-600 hover:bg-amber-500 uppercase w-full my-3"
                  onClick={() => handleClick(Guitarra)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>
    </main>
  )
}
