<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        // Anda bisa menambahkan validasi di sini jika diperlukan
        if (!isset($row['email']) || empty($row['email'])) {
            return null; // Lewati baris jika email kosong
        }

        return new User([
            'name'     => $row['nama'],
            'email'    => $row['email'],
            'password' => bcrypt('password_default'),
            // ... kolom lainnya
        ]);
    }

    public function headingRow(): int
    {
        return 1;
    }
}