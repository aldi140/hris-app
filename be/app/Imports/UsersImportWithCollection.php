<?php

namespace App\Imports;

use App\Models\User; // Asumsi Anda memiliki model User
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection; // Untuk memproses semua baris sekaligus sebagai Collection
use Maatwebsite\Excel\Concerns\WithHeadingRow; // Opsional: Untuk melewati baris header dan menggunakan nama kolom sebagai kunci

class UsersImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Di sini Anda bisa melakukan validasi data sebelum menyimpannya
            // Misalnya: if (empty($row['email']) || empty($row['nama'])) continue;

            User::create([
                'name'     => $row['nama'],    // Sesuaikan dengan nama kolom di Excel Anda
                'email'    => $row['email'],   // Sesuaikan
                'password' => bcrypt('password_default'), // Atur password default atau buat random
                // Tambahkan kolom lain sesuai struktur tabel users Anda
            ]);
        }
    }

    /**
     * Opsional: Baris mana yang berisi header.
     * Defaultnya adalah 1 (baris pertama).
     * @return int
     */
    public function headingRow(): int
    {
        return 1; // Jika baris pertama adalah header, maka data akan dimulai dari baris kedua.
    }
}