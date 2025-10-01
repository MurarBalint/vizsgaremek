import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
  <div className="flex flex-col min-h-screen bg-white text-black">
    {/* Online barátok */}
    <div className="flex gap-3 overflow-x-auto border-b border-gray-300 p-3 bg-gray-50">
      {[
        "Murrár Bálint",
        "Hartwig-Matos Dávid",
        "Ádám Petró",
        "Kássa Gergő",
        "Zsozéatya",
        "Farkas Norbert ",
        "Daniel Peter Szabo",
        "Hunor Huszár",
        "Bogi Fekete",
        "Dominik Földi",
        "Erik Bakai",

      ].map((name, i) => (
        <div
          key={i}
          className="flex items-center bg-gray-200 hover:bg-red-600 hover:text-white cursor-pointer transition rounded-l-full rounded-r-md pr-3 min-w-[180px]"
          >
          {/* Avatar teljesen kerek */}
          <img
              src="/Lakatos_Dszumandzsi.png"
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
          />
          {/* Név egy sorban */}
          <span className="text-sm ml-2 truncate">{name}</span>
      </div>
      ))}
    </div>

      {/* Háromoszlopos layout */}
      <div className="flex flex-1">
        {/* Bal oszlop - hirdetés */}
        <aside className="w-[300px] border-r-2 border-gray-300 p-4 bg-gray-100">
          <h2 className="font-bold text-lg mb-2">Hirdetés</h2>
          <img
            src="/hirdetes.png"
            alt="Hirdetés"
            className="w-full h-auto rounded"
          />
        </aside>

        {/* Közép oszlop - feed */}
        <main className="flex-1 h-[calc(100vh-200px)] overflow-y-auto flex justify-center">
          <div className="w-full max-w-xl flex flex-col gap-6">
            {[
              "Első bejegyzés",
              "Második bejegyzés",
              "Harmadik bejegyzés",
              "Negyedik bejegyzés",
              "Első bejegyzés",
              "Második bejegyzés",
              "Harmadik bejegyzés",
              "Negyedik bejegyzés",
              "Első bejegyzés",
              "Második bejegyzés",
              "Harmadik bejegyzés",
              "Negyedik bejegyzés",
              "Első bejegyzés",
              "Második bejegyzés",
              "Harmadik bejegyzés",
              "Negyedik bejegyzés",
              "Első bejegyzés",
              "Második bejegyzés",
              "Harmadik bejegyzés",
              "Negyedik bejegyzés",
              "Első bejegyzés",
              "Második bejegyzés",
              "Harmadik bejegyzés",
              "Negyedik bejegyzés",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-white border border-gray-300 shadow p-4 rounded-xl"
              >
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque in ipsum id orci porta dapibus.
                </p>
              </div>
            ))}
          </div>
        </main>

        {/* Jobb oszlop - chat */}
        <aside className="w-[350px] border-l-2 border-gray-300 p-4 bg-gray-100">
          <h2 className="font-bold text-lg mb-2">Chat</h2>
          <p>Itt lesz a chat ablak tartalma.</p>
        </aside>
      </div>
    </div>
  )
}
