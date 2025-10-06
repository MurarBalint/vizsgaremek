using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace urhajos_projekt_console
{
    public class Mentokabin : PalyaElem
    {
        public Mentokabin(int x, int y) : base(x, y)
        {
        }

        public void Aktival(Tiszt tiszt, Palya palya)
        {
            var szabadMezok = new List<(int x, int y)>();

            for (int i = 0; i < palya.Meret; i++)
            {
                for (int j = 0; j < palya.Meret; j++)
                {
                    if (palya.Szabad(i, j) && !(i == tiszt.X && j == tiszt.Y))
                    {
                        szabadMezok.Add((i, j));
                    }
                }
            }

            if (szabadMezok.Count == 0)
                return;

            var ujPoz = szabadMezok[GlobalRandom.R.Next(szabadMezok.Count)];

            tiszt.Teleport(ujPoz.x, ujPoz.y);

            // Ha energiacellára teleportált, szedje fel
            if (palya.Terkep[ujPoz.x, ujPoz.y] is EnergiaCella ec)
            {
                tiszt.Inventory.Add(ec);
                palya.Torol(ujPoz.x, ujPoz.y);
            }
        }
    }
}
