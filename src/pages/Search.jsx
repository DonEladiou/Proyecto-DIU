import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const allBooks = [
  { id: 1, title: 'Cálculo Diferencial', author: 'James Stewart', category: 'matematicas', isbn: '978-0-495-01166-0', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
  { id: 2, title: 'Física Universitaria', author: 'Hugh Young', category: 'fisica', isbn: '978-0-321-50121-9', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=400&fit=crop' },
  { id: 3, title: 'Finanzas Corporativas', author: 'Ross & Westerfield', category: 'finanzas', isbn: '978-0-07-803477-0', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=400&fit=crop' },
  { id: 4, title: 'Circuitos Electrónicos', author: 'Robert Boylestad', category: 'electronica', isbn: '978-0-13-376003-3', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop' },
  { id: 5, title: 'Introducción a Algoritmos', author: 'Thomas Cormen', category: 'programacion', isbn: '978-0-262-03384-8', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=400&fit=crop' },
  { id: 6, title: 'Química General', author: 'Raymond Chang', category: 'quimica', isbn: '978-1-260-45649-8', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=400&fit=crop' },
  { id: 7, title: 'Mecánica de Materiales', author: 'Russell Hibbeler', category: 'ingenieria', isbn: '978-0-13-431965-0', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=400&fit=crop' },
  { id: 8, title: 'Álgebra Lineal', author: 'David Lay', category: 'matematicas', isbn: '978-0-321-98289-1', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=400&fit=crop' },
  { id: 9, title: 'Estructuras de Datos', author: 'Mark Allen Weiss', category: 'programacion', isbn: '978-0-13-284737-7', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=400&fit=crop' },
  { id: 10, title: 'Análisis Financiero', author: 'Stephen Ross', category: 'finanzas', isbn: '978-0-07-803469-5', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop' },
  { id: 11, title: 'Microelectrónica', author: 'Adrian Sedra', category: 'electronica', isbn: '978-0-19-933913-6', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop' },
  { id: 12, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', category: 'literatura', isbn: '978-0-06-112009-1', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop' },
  { id: 13, title: 'El Reino Perdido', author: 'Elara Blackwood', category: 'literatura', isbn: '978-0-123456-78-9', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkr4qJ4EwQKUv9IIe6fY6OuUGXU7SAJCXkMWZWwIT2VCAAlfQyq0ejwoSJJfGgmjhZVJo4tb50DNALi9PA-_PSHQWW-CzTwotJR8I7m5UufS6IKgnEPNleghz8JmcmHaAy0hjaITO1PMNXyD_MUwKz99v1tbEOrttQxzEVJLJSYExfH8YZGhQP4IvfSrckQXt_182jm9p_2oVFA1ERmKeLtjYNmZ9Dd1f_FApl8XXVhXjXP8ApL7nTNkUMcdm3VYn4H9zePTROuNY' },
  { id: 14, title: 'Sombras en la Noche', author: 'Julian Thorne', category: 'literatura', isbn: '978-0-123456-78-8', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPpQ1nENxY0cSH12lmeWgcAZYFCXZEnsybRrpJ_apCR3SWrGme90aiJ8nULPdYq4i-QG7RrYsqL3SNaZli5bc3JFo99gjJQWK8JLNOU_Dyu78ie-nMeL0CoID3fLwNGyKSaTOFiDLx6Ac_rGRXuFEtT9lcp7GCRoK4iwDfM5xWyMxuZYO6OyA5-Pg81VzrohI1aGVQS_AbZWUyZHWyikErBLNjC5zTatWe54UyCLsZDdJww4VpeEIlQlEHv_DM2zWvE_0EbProFUk' },
  { id: 15, title: 'Un Amor Inesperado', author: 'Isabella Rossi', category: 'literatura', isbn: '978-0-123456-78-7', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqgiKLF7cyn2LbRCssCpr215pbgK6TowhAioOOF43GqziJOkG0qRpg41W730V52Gq8N934mSyj0qNDklSXv2S7esiJUsqehkxPhJRKiyBQgtIY8IU_shh1GEZGj4Uiyjs-qlpn7xnWK1uMhJrP41ivodRqdi4z7xStp0sBNMnMKvfdLWzwynKhEgVoamPXhOVBSlTuI1e8EZ5zxLAKpE6E78869N41PfPip4ChvX7HLDASZYdjfY2AP6fuwqm92qzaNMOhqC5D84s' },
  { id: 16, title: 'El Secreto Revelado', author: 'Damien Cole', category: 'literatura', isbn: '978-0-123456-78-6', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQkYc1G289mi5J3Vs07k9dOXdDGFEoAY2sepATdBEmGpyiUDMB44G8h8U1Simbw6wiB9i8mW6iaIkGwXgi3K0E4JEqZ_Yt7-ANOQNfsxVbc6KdNmMMZYQfqh1Ei917xQlwLh98Tkhu0y4CzSnD-bBlxsKfrYEfq-L9gVeNzES3oUoFN-oE-FNfx-NxJgUbarC8jbntVpe99dPQxW7Rj_47Rm15HtB9XGWqb7OaSrrxw69O7dUhtuBs3tbzZTe9K-Um4Aiyg0-yjVA' },
  { id: 17, title: 'Eco del Pasado', author: 'Clara Beaumont', category: 'literatura', isbn: '978-0-123456-78-5', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFGUXw9zauOfco3uKU3ruIQJGdDk14LW_V7wG2a7tnhitIVctlGH9ysycXGUFvJEUFfGQMN-2RBAfp_VcmEMHAJXImDcjCqswNJZ8Mz-ohGYe0y3aj1BvKmblYHv-FswqG0K_zm36yl9s5a5B_P_Z7vS72fCF6GuA4nDIW6FU_HdJWIbkBHJNijP6NZImXyFuXn771Teje6Q24wy5nDHEptYZWV8JcZqmRStVJmyFn57KhkCflEfpaX-vcnO25Q-eSPgVquAjqJdE' },
  { id: 18, title: 'Cálculo Integral', author: 'James Stewart', category: 'matematicas', isbn: '978-0-495-01167-7', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=400&fit=crop' },
  { id: 19, title: 'Programación Orientada a Objetos', author: 'Bertrand Meyer', category: 'programacion', isbn: '978-0-13-629155-4', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=400&fit=crop' },
  { id: 20, title: 'Termodinámica', author: 'Yunus Cengel', category: 'ingenieria', isbn: '978-0-07-339817-4', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=400&fit=crop' },
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

function normalizeText(text) {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [isbnFilter, setIsbnFilter] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')

  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      const title = normalizeText(book.title)
      const author = normalizeText(book.author)
      const categoryNormalized = normalizeText(book.category)
      const isbn = book.isbn || ''
      
      const searchTerm = normalizeText(searchQuery)
      const matchesSearch = !searchQuery || 
        title.includes(searchTerm) || 
        author.includes(searchTerm) ||
        categoryNormalized.includes(searchTerm)
      const matchesIsbn = !isbnFilter || isbn.includes(isbnFilter)
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
      
      return matchesSearch && matchesCategory && matchesIsbn
    })
  }, [searchQuery, isbnFilter, selectedCategory])

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    const newParams = new URLSearchParams(searchParams)
    if (categoryId === 'all') {
      newParams.delete('category')
    } else {
      newParams.set('category', categoryId)
    }
    setSearchParams(newParams)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Barra de búsqueda */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-500">search</span>
          </div>
          <input
            id="search-input"
            className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="Buscar libros por título, autor o tema"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filtros por categoría y autor */}
      <div className="max-w-4xl mx-auto mb-8">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Filtrar por categoría</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/30'
              }`}
              data-category={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="max-w-2xl">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="isbn-filter">
            Buscar por ISBN
          </label>
          <input
            id="isbn-filter"
            className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary"
            type="text"
            placeholder="Escribe un ISBN (ej: 978-0-123456-78-9)"
            value={isbnFilter}
            onChange={(e) => setIsbnFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Resultados */}
      <div className="max-w-6xl mx-auto">
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {filteredBooks.length} libro{filteredBooks.length !== 1 ? 's' : ''} encontrado{filteredBooks.length !== 1 ? 's' : ''}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3">
                <img
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={book.image}
                />
              </div>
              <h4 className="font-bold truncate text-slate-900 dark:text-white">{book.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{book.author}</p>
              <span className="text-xs text-primary font-medium capitalize">{book.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search

