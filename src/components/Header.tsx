import { useMemo } from "react";
import { Dispatch, SetStateAction } from "react";
import type { Guitar, GuitarCar } from "../types";

type HeaderProps = {
  carrito: GuitarCar[],
  setCarrito: Dispatch<SetStateAction<GuitarCar[]>>
}

export default function Header({ carrito, setCarrito }: HeaderProps) {

  const carritoLength = useMemo(() => carrito.length > 0, [carrito])

  const increaseQuantity = (id: Guitar['id']) => {
    const newCarrito = carrito.map(
      item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCarrito(newCarrito)
  }

  const decreaseQuantity = (id: Guitar['id']) => {
    const newCarrito = carrito.map(
      item => item.id === id ?
        item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item :
        item
    )
    setCarrito(newCarrito)
  }

  const deleteGuitar = (id: Guitar['id']) => {
    setCarrito(carrito.filter(item => item.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const guitarrasPriceTotal = useMemo(() => carrito.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  ), [carrito])

  return (
    <header className="bg-[url(/img/header.jpg)] bg-no-repeat bg-cover bg-center">
      <div className="container mx-auto flex flex-row max-sm:flex-col p-10 justify-between items-center">
        <div>
          <img className="w-3xs" src="/img/logo.svg" alt="logo" />
        </div>

        <nav className="group relative">
          <div className="my-2">
            <img className="max-w-10" src="/img/carrito.png" alt="carrito" />
          </div>

          <div className="hidden group-hover:block absolute right-0 max-sm:-right-38 bg-white rounded-md shadow p-2.5 max-h-125 overflow-auto">

            {carritoLength ? (
              <>
                <table>
                  <thead>
                    <tr className="*:p-2 *:text-center *:border-b *:border-gray-300">
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {carrito.map(guitarra => (
                      <tr
                        key={guitarra.id}
                        className="*:p-2 *:text-center *:border-b *:border-gray-300"
                      >
                        <td>
                          <img
                            className="max-w-15 hover:scale-105 transition delay-150 duration-150 ease-in-out"
                            src={`/img/${guitarra.image}.jpg`}
                            alt={guitarra.name}
                          />
                        </td>
                        <td>{guitarra.name}</td>
                        <td>${guitarra.price}</td>
                        <td>
                          <button
                            className="bg-neutral-600 hover:bg-neutral-700 size-8 mb-3 rounded-full font-bold text-md cursor-pointer text-white"
                            onClick={() => increaseQuantity(guitarra.id)}
                          >
                            +
                          </button>

                          <span className="block mx-auto">
                            {guitarra.quantity}
                          </span>

                          <button
                            className="bg-neutral-600 hover:bg-neutral-700 size-8 mt-3 rounded-full font-bold text-md cursor-pointer text-white"
                            onClick={() => decreaseQuantity(guitarra.id)}
                          >
                            -
                          </button>
                        </td>
                        <td>
                          <button
                            className="cursor-pointer size-8 rounded-full bg-red-500 text-md font-bold text-white"
                            onClick={() => deleteGuitar(guitarra.id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <span className="text-center text-xl py-3 block">Total a pagar ${guitarrasPriceTotal}</span>

                <button
                  className="cursor-pointer text-center text-md text-white font-medium p-2.5 rounded-md bg-neutral-600 hover:bg-neutral-700 uppercase w-full my-3"
                  onClick={vaciarCarrito}
                >
                  Vaciar Carrito
                </button>
              </>
            ) : (
              <p className="text-center text-xl py-3 block w-90">El Carrito ya no está vacio</p>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
