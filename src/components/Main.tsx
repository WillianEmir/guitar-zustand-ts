import { ChangeEvent, useMemo, useState } from "react";
import { useGuitarCart } from "../store/store";
import Card from "./Card";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function Main() {

  const [filter, setfilter] = useState(0)
  const { db } = useGuitarCart()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(+e.target.value)
  }

  const newDB = useMemo(() => {
    return filter === 0 ? db : db.filter(item => item.price <= filter)
  }, [filter])

  return (
    <main>
      <section className="container mx-auto pb-3">

        <div className="flex items-center justify-around">
          <h1 className="text-center text-6xl text-amber-600 font-bold py-10 max-sm:text-5xl">Las Mejores Guitarras</h1>

          <div className="flex flex-col space-y-3">
            <p className="text-center">Filtro</p>
            <div className="flex">
              <input
                type="range"
                value={filter}
                min={280}
                max={400}
                onChange={handleChange}
              />
              {filter > 0 && <XCircleIcon className="size-5 text-red-600" onClick={() => setfilter(0)} />}
            </div>
          </div>
        </div>


        <div className="flex flex-wrap gap-3 justify-center">

          {newDB.map(Guitarra => (
            <Card key={Guitarra.id} Guitarra={Guitarra} />
          ))}

        </div>
      </section>
    </main>
  )
}
