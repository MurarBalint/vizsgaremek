import { Link } from '@tanstack/react-router'

export default function Header() {
  
  return (
    <header className="p-4 bg-red-600 text-white flex flex-col items-center">
      {/* Cím */}
      <h1 className="text-3xl font-bold mb-2">Mi Hirünk</h1>

      {/* Navigáció */}
      <nav className="flex gap-6">
        <Link to="/" className="hover:underline">Kezdőlap</Link>
        <Link to="/" className="hover:underline">Profil</Link>
        <Link to="/friends" className="hover:underline">Barátok</Link>
        <Link to="/settings" className="hover:underline">Beállítások</Link>
      </nav>
    </header>
  )
}