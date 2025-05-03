import { useGuitarCart } from "../store/store"
import { Guitar } from "../types"

type CardProps = {
  Guitarra: Guitar
}

export default function Card({Guitarra} : CardProps) {

  const {addGuitar} = useGuitarCart()

  return (
    <div className="bg-white flex p-2 rounded-md shadow w-75">
      <div >
        <img className="max-w-auto" src={`/img/${Guitarra.image}.jpg`} alt={Guitarra.name} />
      </div>

      <div className="p-2">
        <h2 className="text-2xl">{Guitarra.name}</h2>
        <p className="text-[16px] font-[200] my-1">{Guitarra.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-3xl text-indigo-700 font-medium">${Guitarra.price}</p>
          <button
            className="cursor-pointer text-center text-sm text-white font-bold p-1.5 rounded-sm bg-amber-600 hover:bg-amber-700 uppercase my-3 transition-[background-color]"
            onClick={() => addGuitar(Guitarra)}
          >
            add cart
          </button>
        </div>
      </div>
    </div>
  )
}
