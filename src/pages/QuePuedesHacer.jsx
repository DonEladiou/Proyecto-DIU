import { Link } from "react-router-dom"

export default function QuePuedesHacer() {
  const items = [
    {
      title: "Explorar material bibliográfico",
      desc:
        "Busca libros y documentos por título o autor y revisa su disponibilidad.",
      img: "/images/que-explorar.png",
      alt: "Pantalla de búsqueda y resultados",
      to: "/busqueda",
      cta: "Ir a Explorar",
    },
    {
      title: "Reservar salas de estudio",
      desc:
        "Elige biblioteca, fecha y horario para reservar una sala individual o grupal.",
      img: "/images/que-reservar.png",
      alt: "Formulario de reserva de salas",
      to: "/reservas",
      cta: "Reservar una sala",
    },
    {
      title: "Consultar artículos científicos",
      desc:
        "Accede a artículos desde distintas fuentes y abre los enlaces originales.",
      img: "/images/que-articulos.png",
      alt: "Listado de artículos y visor",
      to: "/articulos",
      cta: "Ver artículos",
    },
  ]

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <h1 className="text-2xl font-bold mb-2">¿Qué puedes hacer aquí?</h1>

      {items.map((it, i) => (
        <article
          key={it.title}
          className="grid md:grid-cols-2 gap-6 items-center p-5 rounded-xl border border-slate-200 bg-white dark:bg-background-dark"
        >
          {/* Imagen (alterna de lado en desktop) */}
          <div className={i % 2 ? "md:order-2" : ""}>
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <img
                src={it.img}
                alt={it.alt}
                loading="lazy"
                className="w-full h-auto object-cover aspect-[16/9]"
              />
            </div>
          </div>

          {/* Texto */}
          <div>
            <h2 className="text-lg font-semibold">{it.title}</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-1">{it.desc}</p>

            <Link
              to={it.to}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
              {it.cta}
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
