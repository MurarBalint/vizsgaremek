using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace urhajos_projekt_console
{
    public abstract class PalyaElem
    {
        public int X { get; set; }
        public int Y { get; set; }

        public PalyaElem(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}
