export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-brand-bg text-white">
      
      {/* Ikon a tetején */}
      <img
        src="/icon-frame.png"
        alt="Mi Hírünk"
        className="w-100 h-100 mb-3"
      />

      {/* Nagy piros 404 */}
      <h1 className="text-[8rem] font-bold text-brand drop-shadow-lg animate-pulse">
        404
      </h1>
      
      {/* Steam-stílusú felirat */}
      <p className="text-2xl text-gray-300 mt-4 animate-fadeIn">
        Az oldal nem található
      </p>
      
      {/* Vissza gomb */}
      <a
        href="/"
        className="mt-8 px-6 py-3 bg-brand hover:bg-brand-hover text-white font-semibold rounded-full shadow-lg transition-all duration-200"
      >
        Vissza a főoldalra
      </a>

      {/* Mini „steam panel” design alul */}
      <div className="mt-16 w-1/2 h-2 bg-brand-border rounded-full shadow-inner"></div>
    </div>
  )
}
