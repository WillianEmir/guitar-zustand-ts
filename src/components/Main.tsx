import { useGuitarCart } from "../store/store";
import Card from "./Card";

export default function Main() {

  const { db } = useGuitarCart()

  return (
    <main>
      <section className="container mx-auto pb-3">

        <div>
          <h1 className="text-center text-6xl text-amber-600 font-bold py-10 max-sm:text-5xl">Las Mejores Guitarras</h1>

          <div>
            
          </div>
        </div>


        <div className="flex flex-wrap gap-3 justify-center">

          {db.map(Guitarra => (
            <Card Guitarra={Guitarra} />
          ))}

        </div>
      </section>
    </main>
  )
}
