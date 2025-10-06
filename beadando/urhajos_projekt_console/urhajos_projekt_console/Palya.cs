using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace urhajos_projekt_console
{
    public class Palya
    {
        public int Meret { get; private set; } = 20;
        public PalyaElem[,] Terkep { get; private set; }
        public List<Android> Androidok { get; private set; } = new List<Android>();
        public List<Mentokabin> Mentokabinek { get; private set; } = new List<Mentokabin>();
        public VezerloKozpont VezerloKozpont { get; private set; }

        public bool JatekVege { get; private set; } = false;

        private Random rnd = GlobalRandom.R;

        public Palya()
        {
            Terkep = new PalyaElem[Meret, Meret];
        }

        public void HelyezEl(PalyaElem elem)
        {
            if (elem.X >= 0 && elem.X < Meret && elem.Y >= 0 && elem.Y < Meret)
            {
                Terkep[elem.X, elem.Y] = elem;
            }
        }

        public void Torol(int x, int y, bool keepEnergy = false)
        {
            if (x >= 0 && y >= 0 && x < Meret && y < Meret)
            {
                if (Terkep[x, y] is VezerloKozpont) return; // vezérlőközpontot ne töröljük

                if (Terkep[x, y] is Android a)
                {
                    a.Elhal(); // ha hord energiát, lerakja
                    Androidok.Remove(a);
                }

                if (Terkep[x, y] is EnergiaCella ec && keepEnergy) return;

                Terkep[x, y] = null;
            }
        }

        public bool Szabad(int x, int y)
        {
            if (x < 0 || y < 0 || x >= Meret || y >= Meret) return false;

            var elem = Terkep[x, y];

            if (elem == null) return true;

            // Ha energiacella van, de nem foglalt → szabad
            if (elem is EnergiaCella ec && !ec.Felvett) return true;

            return false; // Android, Tiszt, vagy foglalt cella nem szabad
        }

        public bool MoveElement(AllomasElem elem, int ujX, int ujY, bool ignoreOccupied = false)
        {
            if (ujX < 0 || ujY < 0 || ujX >= Meret || ujY >= Meret)
                return false;

            if (!ignoreOccupied && !Szabad(ujX, ujY))
                return false;

            // Ha Android, és energiacella van rajta, ne töröljük a cellát
            if (!(elem is Android) || Terkep[elem.X, elem.Y] == elem)
                Terkep[elem.X, elem.Y] = null;

            elem.X = ujX;
            elem.Y = ujY;
            Terkep[ujX, ujY] = elem;

            return true;
        }

        public List<EnergiaCella> OsszesEnergia()
        {
            var list = new List<EnergiaCella>();
            for (int i = 0; i < Meret; i++)
                for (int j = 0; j < Meret; j++)
                    if (Terkep[i, j] is EnergiaCella ec)
                        list.Add(ec);
            return list;
        }

        public void GeneralAndroidok(int db)
        {
            int attempts = 0;
            int placed = 0;

            while (placed < db && attempts < db * 20)
            {
                int x = rnd.Next(Meret);
                int y = rnd.Next(Meret);

                if (Szabad(x, y))
                {
                    var android = new Android(x, y, this);
                    Androidok.Add(android);
                    HelyezEl(android);
                    placed++;
                }

                attempts++;
            }

            if (placed < db)
                Console.WriteLine($"⚠️ Nem sikerült az összes androidot lerakni ({placed}/{db}).");
        }

        public void GeneralVezerloKozpont()
        {
            int x = rnd.Next(Meret);
            int y = rnd.Next(Meret);

            VezerloKozpont = new VezerloKozpont(x, y);
            HelyezEl(VezerloKozpont);
        }

        public void GeneralEnergiaCellak(int db)
        {
            int attempts = 0;
            int placed = 0;

            while (placed < db && attempts < db * 20)
            {
                int x = rnd.Next(Meret);
                int y = rnd.Next(Meret);

                if (Szabad(x, y))
                {
                    HelyezEl(new EnergiaCella(x, y));
                    placed++;
                }

                attempts++;
            }

            if (placed < db)
                Console.WriteLine($"⚠️ Nem sikerült az összes energiacellát lerakni ({placed}/{db}).");
        }

        public void GeneralMentokabineket(int db)
        {
            int attempts = 0;
            int placed = 0;

            while (placed < db && attempts < db * 20)
            {
                int x = rnd.Next(Meret);
                int y = rnd.Next(Meret);

                if (Szabad(x, y))
                {
                    var kabin = new Mentokabin(x, y);
                    Mentokabinek.Add(kabin);
                    HelyezEl(kabin);
                    placed++;
                }

                attempts++;
            }

            if (placed < db)
                Console.WriteLine($"⚠️ Nem sikerült az összes mentőkabin lerakni ({placed}/{db}).");
        }

        public void GeneralLegzsilip(int db)
        {
            int attempts = 0;
            int placed = 0;

            while (placed < db && attempts < db * 20)
            {
                int x = rnd.Next(Meret);
                int y = rnd.Next(Meret);

                if (Szabad(x, y))
                {
                    var zs = new Legzsilip(x, y);
                    HelyezEl(zs);
                    placed++;
                }

                attempts++;
            }

            if (placed < db)
                Console.WriteLine($"⚠️ Nem sikerült az összes légzsilipet lerakni ({placed}/{db}).");
        }

        public void FrissitVezerloKozpont()
        {
            if (!VezerloKozpont.Kinyitva && OsszesEnergia().Count == 0)
            {
                VezerloKozpont.NyisdKi();
                Console.WriteLine("🔓 A vezérlőközpont kinyílt!");
            }
        }

        public void EllenorizJatekVege(int tisztX, int tisztY)
        {
            if (!JatekVege &&
                VezerloKozpont.Kinyitva &&
                tisztX == VezerloKozpont.X &&
                tisztY == VezerloKozpont.Y)
            {
                JatekVege = true;
                Console.WriteLine("🏁 Gratulálok, nyertél! A játék véget ért.");
            }
        }
    }
}
