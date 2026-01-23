<?php

namespace App\Exports;

use App\Models\User; // Asumsi Anda memiliki model User
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings; // Opsional: Untuk menambahkan header kolom

class UsersExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // Ambil data yang ingin Anda export, misalnya dari Eloquent
        return User::all();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        // Definisi header untuk kolom-kolom Excel
        return [
            'ID',
            'Nama',
            'Email',
            'Email Verified At',
            'Password',
            'Remember Token',
            'Created At',
            'Updated At',
        ];
    }
}