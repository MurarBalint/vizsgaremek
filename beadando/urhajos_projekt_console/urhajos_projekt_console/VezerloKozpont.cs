using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace urhajos_projekt_console
{
    public class VezerloKozpont : PalyaElem
    {
        public bool Kinyitva { get; private set; } = false;

        public VezerloKozpont(int x, int y) : base(x, y)
        {
        }

        public void NyisdKi()
        {
            Kinyitva = true;
        }
    }
}
