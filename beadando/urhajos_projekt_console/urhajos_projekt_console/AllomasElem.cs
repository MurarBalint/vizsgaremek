using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace urhajos_projekt_console
{
    public static class GlobalRandom
    {
        public static Random R = new Random();
    }

    public abstract class AllomasElem : PalyaElem
    {
        public int HP { get; protected set; }
        public int MinDamage { get; protected set; }
        public int MaxDamage { get; protected set; }
        public bool IsDead => HP <= 0;

        protected Random rnd = GlobalRandom.R;

        public AllomasElem(int startX, int startY, int hp, int minDamage, int maxDamage) : base(startX, startY)
        {
            this.X = startX;
            this.Y = startY;

            this.HP = hp;
            this.MinDamage = minDamage;
            this.MaxDamage = maxDamage;
        }

        public int GetDamage()
        {
            return rnd.Next(MinDamage, MaxDamage + 1);
        }

        public void TakeDamage(int dmg)
        {
            HP -= dmg;
            if (HP < 0) HP = 0;
        }

        public abstract void Lepes();
        public abstract void Felfedez();
        public abstract void Combat(AllomasElem celpont);
    }
}
