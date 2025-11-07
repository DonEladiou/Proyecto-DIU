import { useMemo, useState } from "react";
import { articulos } from "../data/articulos";

export default function Articulos() {
  const [q, setQ] = useState("");
  const [fuente, setFuente] = useState("");
  const [anio, setAnio] = useState("");

  const años = useMemo(() => [...new Set(articulos.map(a => a.anio))].sort((a, b) => b - a), []);
  const resultados = useMemo(() => {
    const s = q.trim().toLowerCase();
    return articulos.filter(a => {
      const matchQ = !s || a.titulo.toLowerCase().includes(s) || a.fuente.toLowerCase().includes(s);
      const matchF = !fuente || a.fuente === fuente;
      const matchY = !anio || a.anio === parseInt(anio);
      return matchQ && matchF && matchY;
    });
  }, [q, fuente, anio]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Artículos científicos</h1>
      <p className="text-gray-600 mb-6">
        Accede a papers y bases académicas desde un solo lugar.
      </p>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <input
          className="border rounded-md px-3 py-2"
          placeholder="Buscar por título o palabra clave..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="border rounded-md px-3 py-2" value={fuente} onChange={(e) => setFuente(e.target.value)}>
          <option value="">Todas las fuentes</option>
          <option>IEEE Xplore</option>
          <option>ACM DL</option>
          <option>arXiv</option>
          <option>Nature</option>
          <option>ScienceDirect</option>
        </select>
        <select className="border rounded-md px-3 py-2" value={anio} onChange={(e) => setAnio(e.target.value)}>
          <option value="">Todos los años</option>
          {años.map(a => <option key={a}>{a}</option>)}
        </select>
      </div>

      <p className="text-gray-600 mb-3">{resultados.length} resultados</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resultados.map(a => (
          <div key={a.id} className="border rounded-lg p-4 flex flex-col justify-between shadow-sm">
            <div>
              <h2 className="font-semibold text-lg mb-1">{a.titulo}</h2>
              <p className="text-gray-700 text-sm">{a.fuente} • {a.anio}</p>
            </div>
            <a
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 text-blue-600 font-semibold hover:underline"
            >
              Abrir enlace
            </a>
          </div>
        ))}
        {resultados.length === 0 && <p className="text-gray-500">No se encontraron resultados.</p>}
      </div>
    </div>
  );
}
