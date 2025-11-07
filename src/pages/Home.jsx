import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

const books = [
  { id: 1, title: 'El Reino Perdido', author: 'Elara Blackwood', category: 'literatura', isbn: '978-0-123456-78-9', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkr4qJ4EwQKUv9IIe6fY6OuUGXU7SAJCXkMWZWwIT2VCAAlfQyq0ejwoSJJfGgmjhZVJo4tb50DNALi9PA-_PSHQWW-CzTwotJR8I7m5UufS6IKgnEPNleghz8JmcmHaAy0hjaITO1PMNXyD_MUwKz99v1tbEOrttQxzEVJLJSYExfH8YZGhQP4IvfSrckQXt_182jm9p_2oVFA1ERmKeLtjYNmZ9Dd1f_FApl8XXVhXjXP8ApL7nTNkUMcdm3VYn4H9zePTROuNY' },
  { id: 2, title: 'Sombras en la Noche', author: 'Julian Thorne', category: 'literatura', isbn: '978-0-123456-78-8', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPpQ1nENxY0cSH12lmeWgcAZYFCXZEnsybRrpJ_apCR3SWrGme90aiJ8nULPdYq4i-QG7RrYsqL3SNaZli5bc3JFo99gjJQWK8JLNOU_Dyu78ie-nMeL0CoID3fLwNGyKSaTOFiDLx6Ac_rGRXuFEtT9lcp7GCRoK4iwDfM5xWyMxuZYO6OyA5-Pg81VzrohI1aGVQS_AbZWUyZHWyikErBLNjC5zTatWe54UyCLsZDdJww4VpeEIlQlEHv_DM2zWvE_0EbProFUk' },
  { id: 3, title: 'Un Amor Inesperado', author: 'Isabella Rossi', category: 'literatura', isbn: '978-0-123456-78-7', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqgiKLF7cyn2LbRCssCpr215pbgK6TowhAioOOF43GqziJOkG0qRpg41W730V52Gq8N934mSyj0qNDklSXv2S7esiJUsqehkxPhJRKiyBQgtIY8IU_shh1GEZGj4Uiyjs-qlpn7xnWK1uMhJrP41ivodRqdi4z7xStp0sBNMnMKvfdLWzwynKhEgVoamPXhOVBSlTuI1e8EZ5zxLAKpE6E78869N41PfPip4ChvX7HLDASZYdjfY2AP6fuwqm92qzaNMOhqC5D84s' },
  { id: 4, title: 'El Secreto Revelado', author: 'Damien Cole', category: 'literatura', isbn: '978-0-123456-78-6', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQkYc1G289mi5J3Vs07k9dOXdDGFEoAY2sepATdBEmGpyiUDMB44G8h8U1Simbw6wiB9i8mW6iaIkGwXgi3K0E4JEqZ_Yt7-ANOQNfsxVbc6KdNmMMZYQfqh1Ei917xQlwLh98Tkhu0y4CzSnD-bBlxsKfrYEfq-L9gVeNzES3oUoFN-oE-FNfx-NxJgUbarC8jbntVpe99dPQxW7Rj_47Rm15HtB9XGWqb7OaSrrxw69O7dUhtuBs3tbzZTe9K-Um4Aiyg0-yjVA' },
  { id: 5, title: 'Eco del Pasado', author: 'Clara Beaumont', category: 'literatura', isbn: '978-0-123456-78-5', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFGUXw9zauOfco3uKU3ruIQJGdDk14LW_V7wG2a7tnhitIVctlGH9ysycXGUFvJEUFfGQMN-2RBAfp_VcmEMHAJXImDcjCqswNJZ8Mz-ohGYe0y3aj1BvKmblYHv-FswqG0K_zm36yl9s5a5B_P_Z7vS72fCF6GuA4nDIW6FU_HdJWIbkBHJNijP6NZImXyFuXn771Teje6Q24wy5nDHEptYZWV8JcZqmRStVJmyFn57KhkCflEfpaX-vcnO25Q-eSPgVquAjqJdE' },
]

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'matematicas', name: 'Matemáticas' },
  { id: 'fisica', name: 'Física' },
  { id: 'finanzas', name: 'Finanzas' },
  { id: 'electronica', name: 'Electrónica' },
  { id: 'programacion', name: 'Programación' },
  { id: 'quimica', name: 'Química' },
  { id: 'ingenieria', name: 'Ingeniería' },
  { id: 'literatura', name: 'Literatura' },
]

function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/busqueda?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'all') {
      navigate('/busqueda')
    } else {
      navigate(`/busqueda?category=${encodeURIComponent(categoryId)}`)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Bienvenido a BibliotecaUSM
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Busca el libro que necesitas, desde educacionales hasta entretenimiento para tus ratos libres.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-500">search</span>
          </div>
          <input
            id="search-books"
            className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="Buscar libros por título, autor o tema"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
        <div className="flex justify-center flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/30'
              }`}
              data-category={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                handleCategoryClick(category.id)
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <section className="mb-16">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Nuevos Lanzamientos
        </h3>
        <div className="relative">
          <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-center">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex-shrink-0 w-48 group"
                data-category={book.category}
                data-title={book.title.toLowerCase()}
                data-author={book.author.toLowerCase()}
                data-isbn={book.isbn}
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3">
                  <img
                    alt="Book cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={book.image}
                  />
                </div>
                <h4 className="font-bold truncate text-slate-900 dark:text-white">{book.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{book.author}</p>
                <span className="text-xs text-primary font-medium">Literatura</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 dark:bg-slate-900 rounded-xl p-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Reserva una sala de estudio
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto md:mx-0">
            ¿Necesitas un lugar tranquilo para concentrarte? Reserva una de nuestras salas de estudio individuales o grupales.
          </p>
          <button
            onClick={() => navigate('/reservas')}
            className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto md:mx-0"
          >
            <span className="material-symbols-outlined">meeting_room</span>
            Reservar ahora
          </button>
        </div>
        <div className="text-center md:text-left mt-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Explora nuestros servicios
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto md:mx-0">
            Desde acceso a bases de datos académicas hasta eventos, descubre todo lo que nuestra biblioteca tiene para ofrecer.
          </p>
          <Link
  to="/que-puedes-hacer"   // 👈 pon aquí la ruta de destino (o /articulos /reservas /busqueda)
  className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto md:mx-0"
>
  <span className="material-symbols-outlined">widgets</span>
  Nuestros servicios
</Link>

        </div>
      </section>
    </div>
  )
}

export default Home

