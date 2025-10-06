using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace urhajos_projekt_console
{
    public class EnergiaCella : PalyaElem
    {
        public bool Felvett { get; set; } = false;

        public EnergiaCella(int x, int y)
            : base(x, y)
        {
        }
    }
}
