<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
class GeneralController extends Controller
{
    public function getPhotoUrl($filename)
    {
        // Misalkan $filename yang tersimpan di DB adalah 'photos/namaphoto.jpg'
        $fullPathInStorage = 'public/uploads/' . $filename; 

        // Pastikan file ada sebelum membuat URL
        if (Storage::exists($fullPathInStorage)) {
            // Menggunakan Storage::url()
            // Ini akan menghasilkan URL lengkap seperti http://yourdomain.com/storage/photos/namaphoto.jpg
            $url = Storage::url($fullPathInStorage);
            
            // Atau jika Anda ingin menggunakan helper asset() (pastikan sudah aktif):
            // $url = asset('storage/' . $filename);
            // $url = url('storage/' . $filename); // Ini akan menghasilkan URL yang sama dengan Storage::url()

            return response()->json(['photo_url' => $url]);
        }

        return response()->json(['message' => 'Foto tidak ditemukan'], 404);
    }
}