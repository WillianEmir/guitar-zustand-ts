import { useMemo } from "react";
import { useGuitarCart } from "../store/store";

export default function Header() {

  const {cart, increaseQuantity, decreaseQuantity, deleteGuitar, vaciarCarrito} = useGuitarCart()
  const carritoLength = useMemo(() => cart.length > 0, [cart])
  const guitarrasPriceTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart])

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
                    {cart.map(guitarra => (
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
