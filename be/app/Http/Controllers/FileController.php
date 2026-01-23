<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str; // Untuk generate nama file unik

class FileController extends Controller
{
    public function uploadFile(Request $request)
    {
        try {
            // 1. Validasi Request
            $this->validate($request, [
                'file' => 'required|file|max:2048|mimes:jpg,jpeg,png,pdf,doc,docx,xls,xlsx'
                // 'file': nama input field di form-data
                // 'required': file harus ada
                // 'file': memastikan input adalah file yang valid
                // 'max:2048': ukuran maksimal 2MB (dalam KB)
                // 'mimes': tipe file yang diizinkan
            ]);

            // Pastikan ada file yang diunggah
            if (!$request->hasFile('file')) {
                return response()->json([
                    'message' => 'Tidak ada file yang diunggah.',
                ], 400);
            }

            $file = $request->file('file');

            // 2. Generate Nama File Unik
            $originalFileName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $fileNameWithoutExt = pathinfo($originalFileName, PATHINFO_FILENAME);

            // Buat nama unik agar tidak terjadi duplikasi dan overwrite
            $newFileName = Str::slug($fileNameWithoutExt) . '-' . time() . '.' . $extension;

            // 3. Simpan File
            // Menggunakan Storage Facade, simpan file ke direktori 'public' (storage/app/public)
            $path = Storage::disk('public')->putFileAs('uploads', $file, $newFileName);
            // 'uploads': subdirektori di dalam storage/app/public
            // $file: objek file yang diunggah
            // $newFileName: nama file baru yang unik

            // Jika Anda hanya ingin menyimpan dengan nama aslinya (tidak disarankan untuk unik)
            // $path = Storage::disk('public')->putFile('uploads', $file); // Laravel akan generate nama unik sendiri

            // 4. Berikan Respon Sukses
            return response()->json([
                'message' => 'File berhasil diunggah!',
                'file_name' => $newFileName,
                'file_path' => Storage::disk('public')->url($path), // Mendapatkan URL publik jika symlink dibuat
            ], 201); // 201 Created

        } catch (ValidationException $e) {
            // Tangani error validasi
            return response()->json([
                'message' => 'Gagal mengunggah file karena validasi.',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity
        } catch (\Exception $e) {
            // Tangani error umum lainnya
            return response()->json([
                'message' => 'Terjadi kesalahan server.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function downloadFile($fileName)
    {
        // Path lengkap ke file di storage/app/public
        $filePath = 'uploads/' . $fileName;

        // Periksa apakah file ada di disk 'public'
        if (Storage::disk('public')->exists($filePath)) {
            // Gunakan metode download() dari Storage Facade
            // Parameter pertama adalah path file relatif terhadap disk
            // Parameter kedua (opsional) adalah nama file yang akan muncul saat diunduh
            return Storage::disk('public')->download($filePath, $fileName);
        } else {
            // Jika file tidak ditemukan
            return response()->json([
                'message' => 'File tidak ditemukan.',
            ], 404); // 404 Not Found
        }
    }
}