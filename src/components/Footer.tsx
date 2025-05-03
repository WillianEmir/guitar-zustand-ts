
export default function Footer() {
  return (
    <footer className="bg-gray-600 mt-auto">
      <section className="container mx-auto">
        <div>
          <p className="text-amber-500 text-sm/20 text-center">
            @WEMDEV
            <span className="text-white text-sm"> - 
              Este proyecto está bajo Licencia MIT © {new Date().getFullYear()}
            </span>
          </p>
        </div>
      </section>
    </footer>
  )
}
