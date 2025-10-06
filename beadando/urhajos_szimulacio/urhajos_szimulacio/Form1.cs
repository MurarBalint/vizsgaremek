using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using urhajos_projekt_console;

namespace urhajos_szimulacio
{
    public partial class Form1 : Form
    {
        private Tiszt tiszt;
        private Palya palya;
        private Timer timer;

        public Form1()
        {
            InitializeComponent();

            palya = new Palya();

            tiszt = new Tiszt(palya.Meret / 2, palya.Meret / 2, palya);
            palya.HelyezEl(tiszt);

            palya.GeneralAndroidok(5);
            palya.GeneralVezerloKozpont();
            palya.GeneralEnergiaCellak(5);
            palya.GeneralMentokabineket(15);
            palya.GeneralLegzsilip(palya.Meret * palya.Meret / 20);


            InitGrid();

            timer = new Timer();
            timer.Interval = 300;
            timer.Tick += Timer_Tick;
            timer.Start();
        }

        private void InitGrid()
        {
            dataGridView1.RowCount = palya.Meret;
            dataGridView1.ColumnCount = palya.Meret;

            int cellaMeret = 15;

            dataGridView1.Width = palya.Meret * cellaMeret + palya.Meret * 1;
            dataGridView1.Height = palya.Meret * cellaMeret + palya.Meret * 1;

            for (int i = 0; i < palya.Meret; i++)
            {
                dataGridView1.Columns[i].Width = cellaMeret;
                dataGridView1.Rows[i].Height = cellaMeret;
            }

            dataGridView1.RowHeadersVisible = false;
            dataGridView1.ColumnHeadersVisible = false;

            FrissitGrid();
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            if (palya.JatekVege)
            {
                timer.Stop();
                MessageBox.Show("Gratulálok! Megnyerted a játékot!");
                return;
            }

            tiszt.Lepes();

            // Androidok lépése
            foreach (var android in palya.Androidok.ToArray()) // ToArray() a törléshez
            {
                android.Lepes();
            }

            FrissitGrid();
        }


        private void FrissitGrid()
        {
            for (int x = 0; x < palya.Meret; x++)
            {
                for (int y = 0; y < palya.Meret; y++)
                {
                    var cell = dataGridView1.Rows[y].Cells[x];
                    var elem = palya.Terkep[x, y];

                    // Ha a tiszt még nem fedezte fel a mezőt
                    //if (!tiszt.DiscoveredMap[x, y])
                    //{
                    //    cell.Style.BackColor = Color.Black;
                    //    continue;
                    //}

                    // Tiszt pozíció
                    if (tiszt.X == x && tiszt.Y == y)
                    {
                        cell.Style.BackColor = Color.Green;
                    }
                    // Vezérlőközpont
                    else if (palya.VezerloKozpont != null && palya.VezerloKozpont.X == x && palya.VezerloKozpont.Y == y)
                    {
                        cell.Style.BackColor = Color.HotPink;
                    }
                    // Mentőkabin
                    else if (elem is Mentokabin)
                    {
                        cell.Style.BackColor = Color.Yellow;
                    }
                    // Energiacella, csak ha nincs felvéve
                    else if (elem is EnergiaCella ec && !ec.Felvett)
                    {
                        cell.Style.BackColor = Color.Blue;
                    }
                    // Légzsilip
                    else if (elem is Legzsilip)
                    {
                        cell.Style.BackColor = Color.DarkGray;
                    }
                    // Android
                    else if (elem is Android)
                    {
                        cell.Style.BackColor = Color.Red;
                    }
                    // Ha nincs semmi a mezőn
                    else
                    {
                        cell.Style.BackColor = Color.White;
                    }
                }
            }
        }


    }
}
