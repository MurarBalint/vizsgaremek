using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace urhajos_projekt_console
{
    public class Android : AllomasElem
    {
        private Palya palya;
        public EnergiaCella TaroltEnergia { get; private set; } = null;
        private double moveChance = 0.7; // 70%-os mozgás minden körben
        private Random rnd = new Random();

        public Android(int startX, int startY, Palya palya)
            : base(startX, startY, hp: 100, minDamage: 4, maxDamage: 15)
        {
            this.palya = palya;
        }

        public override void Lepes()
        {
            if (IsDead) return;

            // Lépés esély
            if (rnd.NextDouble() > moveChance) return;

            // 3x3-as látótér vizsgálata
            for (int dx = -1; dx <= 1; dx++)
            {
                for (int dy = -1; dy <= 1; dy++)
                {
                    if (dx == 0 && dy == 0) continue;

                    int nx = X + dx;
                    int ny = Y + dy;

                    if (nx < 0 || ny < 0 || nx >= palya.Meret || ny >= palya.Meret)
                        continue;

                    var elem = palya.Terkep[nx, ny];

                    // Ha energiacella van és nincs nálunk
                    if (elem is EnergiaCella ec && TaroltEnergia == null && !ec.Felvett)
                    {
                        // Rálépés a mezőre
                        palya.MoveElement(this, nx, ny);

                        // Felvesszük a cellát
                        TaroltEnergia = ec;
                        ec.Felvett = true;

                        return;
                    }

                    // Ha lát tisztet → harc
                    if (elem is Tiszt tisztCel)
                    {
                        Combat(tisztCel);
                        return;
                    }
                }
            }

            // Szabad szomszédos mezők keresése
            var lepesek = new List<(int nx, int ny)>();
            var iranyok = new (int dx, int dy)[] { (-1, 0), (1, 0), (0, -1), (0, 1) };

            foreach (var (dx, dy) in iranyok)
            {
                int nx = X + dx;
                int ny = Y + dy;

                if (nx < 0 || ny < 0 || nx >= palya.Meret || ny >= palya.Meret) continue;

                if (palya.Szabad(nx, ny))
                    lepesek.Add((nx, ny));
            }

            // Ha van legalább egy szabad mező, lépés oda
            if (lepesek.Count > 0)
            {
                var (nx, ny) = lepesek[rnd.Next(lepesek.Count)];
                palya.MoveElement(this, nx, ny);
            }
            else
            {
                // Ha nincs szabad mező, próbáljon rálépni a legközelebbi energiacellára vagy tisztre
                var iranyokShuffled = iranyok.OrderBy(_ => rnd.Next()).ToArray();
                foreach (var (dx, dy) in iranyokShuffled)
                {
                    int nx = X + dx;
                    int ny = Y + dy;
                    if (nx < 0 || ny < 0 || nx >= palya.Meret || ny >= palya.Meret) continue;

                    var elem = palya.Terkep[nx, ny];
                    if (elem is EnergiaCella || elem is Tiszt)
                    {
                        palya.MoveElement(this, nx, ny, ignoreOccupied: true);
                        return;
                    }
                }
            }
        }

        public override void Felfedez()
        {
            // Android nem jegyez meg mezőket
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

            if (IsDead)
                Elhal();

            if (celpont.IsDead)
                palya.Torol(celpont.X, celpont.Y, keepEnergy: true);
        }


        public void Elhal()
        {
            if (TaroltEnergia != null)
            {
                TaroltEnergia.X = X;
                TaroltEnergia.Y = Y;
                TaroltEnergia.Felvett = false; // újra látható a pályán
                palya.HelyezEl(TaroltEnergia);
                TaroltEnergia = null;
            }
        }
    }
}
