<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Transaksi\PinjamanModels;

class IntegrasiData extends Command
{
    /**
     * Nama dan tanda tangan dari console command.
     *
     * @var string
     */
    protected $signature = 'integrasi:data';

    /**
     * Deskripsi console command.
     *
     * @var string
     */
    protected $description = 'Integrasi data koplink';

    /**
     * Eksekusi console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // Tulis logika bisnis Anda di sini
        $this->info('Sedang mengirim pengingat...');
        $tgl = date('Y-m-d');
        $pinjamans = PinjamanModels::with('nasabah', 'debitur', 'debitur.angsuran')
                        ->whereDate('tgl_transaksi', $tgl)
                        ->doesntHave('debitur') //cek apakah ada data debitur atau tidak
                        ->get();
        foreach ($pinjamans as $pinjaman) {

        }
        
        // Contoh: Logika pengiriman email
        
        $this->info('Pengiriman selesai!');
    }
}
