using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace urhajos_projekt_console
{
    public class Tiszt : AllomasElem
    {
        public List<EnergiaCella> Inventory { get; private set; } = new List<EnergiaCella>();
        private Palya palya;
        public bool[,] DiscoveredMap { get; private set; }

        public Tiszt(int startX, int startY, Palya palya)
            : base(startX, startY, hp: 10, minDamage: 2, maxDamage: 5)
        {
            this.palya = palya;
            DiscoveredMap = new bool[palya.Meret, palya.Meret];
            Felfedez();
        }

        public override void Lepes()
        {
            if (palya.JatekVege) return;

            // Van még felvehető energiacella?
            bool vanMegCella = palya.Terkep
                .Cast<PalyaElem>() // kétdimenziós tömb "egydimenziósítása"
                .Where(e => e != null) // null értékek szűrése
                .Any(e => e is EnergiaCella && ((EnergiaCella)e).Felvett);

            bool mindenFelfedezett = true;
            for (int i = 0; i < palya.Meret; i++)
            {
                for (int j = 0; j < palya.Meret; j++)
                {
                    if (!DiscoveredMap[i, j])
                    {
                        mindenFelfedezett = false;
                        break;
                    }
                }
                if (!mindenFelfedezett) break;
            }

            if (!vanMegCella && mindenFelfedezett)
            {
                HarciLepes();
                Felfedez();
                return;
            }

            var cellak = SajátEnergiaCellak();

            if (cellak.Count > 0)
            {
                var target = cellak[0];
                LepesCelFele(target.x, target.y);
            }
            else if (palya.VezerloKozpont != null &&
                     palya.VezerloKozpont.Kinyitva &&
                     DiscoveredMap[palya.VezerloKozpont.X, palya.VezerloKozpont.Y])
            {
                LepesCelFele(palya.VezerloKozpont.X, palya.VezerloKozpont.Y);
            }
            else
            {
                var cel = LegkozelebbiIsmeretlen();
                if (cel != null)
                    LepesCelFele(cel.Value.x, cel.Value.y);
            }

            // Energiacella felvétele
            if (palya.Terkep[X, Y] is EnergiaCella ec && !ec.Felvett)
            {
                ec.Felvett = true;
                Inventory.Add(ec);
            }

            // Mentőkabin aktiválása
            if (palya.Terkep[X, Y] is Mentokabin mk)
                mk.Aktival(this, palya);

            Felfedez();
            palya.FrissitVezerloKozpont();
            palya.EllenorizJatekVege(X, Y);
        }


        private void HarciLepes()
        {
            var androidok = new List<Android>();

            for (int i = 0; i < palya.Meret; i++)
            {
                for (int j = 0; j < palya.Meret; j++)
                {
                    if (palya.Terkep[i, j] is Android a && !a.IsDead)
                        androidok.Add(a);
                }
            }

            if (androidok.Count == 0) return;

            // Ellenőrizzük, van-e szomszédos android
            foreach (var a in androidok)
            {
                if (Math.Abs(a.X - X) <= 1 && Math.Abs(a.Y - Y) <= 1)
                {
                    Combat(a);
                    return;
                }
            }

            // Ha nincs szomszédos android → lépés felé
            Android cel = androidok.OrderBy(a =>
                Math.Abs(a.X - X) + Math.Abs(a.Y - Y)).First();
            LepesCelFele(cel.X, cel.Y);
        }

        private List<(int x, int y)> SajátEnergiaCellak()
        {
            var list = new List<(int, int)>();
            for (int i = 0; i < palya.Meret; i++)
            {
                for (int j = 0; j < palya.Meret; j++)
                {
                    if (DiscoveredMap[i, j] && palya.Terkep[i, j] is EnergiaCella ec && !ec.Felvett)
                        list.Add((i, j));
                }
            }
            return list;
        }

        private (int x, int y)? LegkozelebbiIsmeretlen()
        {
            var queue = new Queue<(int x, int y)>();
            var visited = new bool[palya.Meret, palya.Meret];
            var parent = new Dictionary<(int, int), (int, int)>();

            queue.Enqueue((X, Y));
            visited[X, Y] = true;

            var iranyok = new (int dx, int dy)[] { (-1, 0), (1, 0), (0, -1), (0, 1) };

            while (queue.Count > 0)
            {
                var (x, y) = queue.Dequeue();

                if (!DiscoveredMap[x, y])
                {
                    var current = (x, y);
                    var path = new List<(int, int)>();

                    while (current != (X, Y))
                    {
                        path.Add(current);
                        current = parent[current];
                    }

                    path.Reverse();
                    return path.Count > 0 ? path[0] : ((int, int)?)null;
                }

                foreach (var (dx, dy) in iranyok)
                {
                    int nx = x + dx;
                    int ny = y + dy;

                    if (nx < 0 || ny < 0 || nx >= palya.Meret || ny >= palya.Meret) continue;
                    if (visited[nx, ny]) continue;

                    var cella = palya.Terkep[nx, ny];
                    bool lepheto = cella == null || cella is EnergiaCella || cella is Mentokabin;

                    if (lepheto)
                    {
                        visited[nx, ny] = true;
                        parent[(nx, ny)] = (x, y);
                        queue.Enqueue((nx, ny));
                    }
                    else if (!DiscoveredMap[nx, ny])
                    {
                        visited[nx, ny] = true;
                        parent[(nx, ny)] = (x, y);
                        queue.Enqueue((nx, ny));
                    }
                }
            }

            return null;
        }

        private (int x, int y)? GetLepesCelFeleBFS(int startX, int startY, int celX, int celY)
        {
            if (startX == celX && startY == celY) return null;

            var queue = new Queue<(int x, int y)>();
            var visited = new bool[palya.Meret, palya.Meret];
            var parent = new Dictionary<(int x, int y), (int px, int py)>();

            queue.Enqueue((startX, startY));
            visited[startX, startY] = true;

            var iranyok = new (int dx, int dy)[] { (-1, 0), (1, 0), (0, -1), (0, 1) };

            while (queue.Count > 0)
            {
                var (x, y) = queue.Dequeue();

                if (x == celX && y == celY)
                {
                    var path = new List<(int, int)>();
                    var current = (x, y);

                    while (current != (startX, startY))
                    {
                        path.Add(current);
                        current = parent[current];
                    }

                    path.Reverse();
                    return path.Count > 0 ? path[0] : ((int, int)?)null;
                }

                foreach (var (dx, dy) in iranyok)
                {
                    int nx = x + dx;
                    int ny = y + dy;

                    if (nx < 0 || ny < 0 || nx >= palya.Meret || ny >= palya.Meret) continue;
                    if (visited[nx, ny]) continue;

                    var cella = palya.Terkep[nx, ny];

                    bool lepheto = (nx == celX && ny == celY) ||
                                   cella == null ||
                                   cella is EnergiaCella ||
                                   cella is Mentokabin;

                    if (lepheto)
                    {
                        visited[nx, ny] = true;
                        parent[(nx, ny)] = (x, y);
                        queue.Enqueue((nx, ny));
                    }
                }
            }

            return null;
        }

        private void LepesCelFele(int celX, int celY)
        {
            var kovetkezo = GetLepesCelFeleBFS(X, Y, celX, celY);
            if (kovetkezo != null)
            {
                X = kovetkezo.Value.x;
                Y = kovetkezo.Value.y;
            }
        }

        public override void Felfedez()
        {
            for (int dx = -1; dx <= 1; dx++)
            {
                for (int dy = -1; dy <= 1; dy++)
                {
                    int nx = X + dx;
                    int ny = Y + dy;
                    if (nx >= 0 && ny >= 0 && nx < palya.Meret && ny < palya.Meret)
                        DiscoveredMap[nx, ny] = true;
                }
            }
        }

        public override void Combat(AllomasElem celpont)
        {
            if (celpont == null || celpont.IsDead) return;

            int dmg = GetDamage();
            celpont.TakeDamage(dmg);

            if (!celpont.IsDead)
            {
                int vissza = celpont.GetDamage();
                TakeDamage(vissza);
            }

            if (celpont is Android android && android.IsDead)
            {
                android.Elhal();
                palya.Torol(android.X, android.Y, keepEnergy: true);
            }
        }


        public void Teleport(int x, int y)
        {
            X = x;
            Y = y;
            Felfedez();
        }
    }

}
