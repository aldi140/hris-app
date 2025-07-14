<?php
namespace App\Http\Controllers\Master;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Master\KaryawanModel;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class KaryawanController extends Controller
{
    public function index()
    {
        $data = new KaryawanModel;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('jabatan', 'departemen')->get(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function store(Request $request)
    {
        // Mendefinisikan aturan validasi
        $rules = [
            // 'nik' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'file_foto' => 'required|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'file_ktp' => 'required|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'file_npwp' => 'required|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            // 'stock' => 'required|integer|min:0',
            'id_jabatan' => 'required|integer|exists:ms_jabatan,id', // Contoh aturan exists
        ];

        // Mendefinisikan pesan kesalahan custom
        $messages = [
            // 'nik.required' => 'NIK wajib diisi.',
            'nama.required' => 'Nama wajib diisi.',
            'nama.string' => 'Nama karyawan harus berupa teks.',
            'nama.max' => 'Nama karyawan tidak boleh lebih dari :max karakter.',
            'file_foto.required' => 'File gambar wajib diunggah.',
            'file_foto.file' => 'Input harus berupa file yang valid.',
            'file_foto.image' => 'File yang diunggah harus berupa gambar.',
            'file_foto.mimes' => 'Format gambar yang diizinkan adalah JPEG, PNG, JPG, GIF, SVG, atau WEBP.',
            'file_foto.max' => 'Ukuran gambar tidak boleh lebih dari 2MB.',
            'file_ktp.required' => 'File gambar wajib diunggah.',
            'file_ktp.file' => 'Input harus berupa file yang valid.',
            'file_ktp.image' => 'File yang diunggah harus berupa gambar.',
            'file_ktp.mimes' => 'Format gambar yang diizinkan adalah JPEG, PNG, JPG, GIF, SVG, atau WEBP.',
            'file_ktp.max' => 'Ukuran gambar tidak boleh lebih dari 2MB.',
            'file_npwp.required' => 'File gambar wajib diunggah.',
            'file_npwp.file' => 'Input harus berupa file yang valid.',
            'file_npwp.image' => 'File yang diunggah harus berupa gambar.',
            'file_npwp.mimes' => 'Format gambar yang diizinkan adalah JPEG, PNG, JPG, GIF, SVG, atau WEBP.',
            'file_npwp.max' => 'Ukuran gambar tidak boleh lebih dari 2MB.',
            // 'stock.required' => 'Stok produk wajib diisi.',
            // 'stock.integer' => 'Stok produk harus berupa bilangan bulat.',
            // 'stock.min' => 'Stok produk tidak boleh kurang dari :min.',
            'id_jabatan.required' => 'Jabatan karyawan wajib dipilih.',
            // 'id_jabatan.integer' => 'ID kategori harus berupa bilangan bulat.',
            'id_jabatan.exists' => 'Jabatan yang dipilih tidak valid atau tidak ditemukan.',
            // Anda juga bisa membuat pesan custom untuk semua aturan 'required' sekaligus:
            // 'required' => 'Kolom :attribute wajib diisi.',
            // Catatan: :attribute akan diganti dengan nama kolom (name, price, stock, category_id)
        ];

        // Melakukan validasi
        $validator = Validator::make($request->all(), $rules, $messages);

        // $validator = Validator::make($request->all(),[
        //     'golongan' => 'required',
        //     'gapok' => 'required',
        //     'tgl_aktif' => 'required',
        // ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }

        try {
            $nik = IdGenerator::generate(['table' => 'ms_karyawan','field' => 'nik','length' => 10, 'prefix' =>date('ym')]);

            // // FOTO
            // $imageFile = $request->file('file_foto');
            // $originalFileName = $imageFile->getClientOriginalName();
            // $extension = $imageFile->getClientOriginalExtension();
            // $fileNameWithoutExt = pathinfo($originalFileName, PATHINFO_FILENAME);
            // $newFileFoto = Str::slug($fileNameWithoutExt) . '-' . time() . '.' . $extension;
            // // Simpan file ke storage/app/public/images
            // $path = Storage::disk('public')->putFileAs('images', $imageFile, $newFileFoto);

            $fileFoto = $this->upload_file($request->file('file_foto'),'F');
            $fileKTP = $this->upload_file($request->file('file_ktp'),'K');
            $fileNPWP = $this->upload_file($request->file('file_npwp'),'N');

            $fileIjazah['nama'] = "";
            if($request->file('file_ijazah')){
                $fileIjazah = $this->upload_file($request->file('file_ijazah'),'I');
            }

            $fileBPJSK['nama'] = "";
            if($request->file('file_bpjs_kesehatan')){
                $fileBPJSK = $this->upload_file($request->file('file_bpjs_kesehatan'),'B');
            }

            $fileBPJSKK['nama'] = "";
            if($request->file('file_bpjs_ketenagakerjaan')){
                $fileBPJSKK = $this->upload_file($request->file('file_bpjs_ketenagakerjaan'),'BK');
            }

            $fileSertifikat['nama'] = "";
            if($request->file('file_sertifikat')){
                $fileSertifikat = $this->upload_file($request->file('file_sertifikat'),'S');
            }
            

            $data_save = new KaryawanModel;
            $data_save->id_jabatan = $request->get('id_jabatan');
            $data_save->id_departemen = $request->get('id_departemen');
            $data_save->nik = $nik;
            $data_save->nama = $request->get('nama');
            $data_save->jenis_kelamin = $request->get('jenis_kelamin');
            $data_save->tgl_lahir = $request->get('tgl_lahir');
            $data_save->tempat_lahir = $request->get('tempat_lahir');
            $data_save->alamat = $request->get('alamat');
            $data_save->alamat_domisili = $request->get('alamat_domisili');
            $data_save->ktp = $request->get('ktp');
            $data_save->bpjs_kesehatan = $request->get('bpjs_kesehatan');
            $data_save->bpjs_ketenagakerjaan = $request->get('bpjs_ketenagakerjaan');
            $data_save->npwp = $request->get('npwp');
            $data_save->ijazah = $request->get('ijazah');
            $data_save->file_foto = $fileFoto['nama'];
            $data_save->file_ktp = $fileKTP['nama'];
            $data_save->file_bpjs_kesehatan = $fileBPJSK['nama'];
            $data_save->file_bpjs_ketenagakerjaan = $fileBPJSKK['nama'];
            $data_save->file_npwp = $fileNPWP['nama'];
            $data_save->file_ijazah = $fileIjazah['nama'];
            $data_save->file_sertifikat = $fileSertifikat['nama'];
            $data_save->tgl_masuk = $request->get('tgl_masuk');
            // $data_save->tgl_keluar = $request->get('tgl_keluar');
            $data_save->status_karyawan = $request->get('status_karyawan');
            $data_save->status_kawin = $request->get('status_kawin');
            $data_save->user_at = auth()->user()->name;
            $data_save->save();
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Berhasil menambahkan data',
                ],Response::HTTP_OK);

        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        // Mendefinisikan aturan validasi
        $rules = [
            'nama' => 'required|string|max:255',
            'id_jabatan' => 'required|integer|exists:ms_jabatan,id', // Contoh aturan exists
        ];

        // Mendefinisikan pesan kesalahan custom
        $messages = [
            'nama.required' => 'Nama wajib diisi.',
            'nama.string' => 'Nama karyawan harus berupa teks.',
            'nama.max' => 'Nama karyawan tidak boleh lebih dari :max karakter.',
            'id_jabatan.required' => 'Jabatan karyawan wajib dipilih.',
            'id_jabatan.exists' => 'Jabatan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        // Melakukan validasi
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }

        try {

            $data = KaryawanModel::where('id',$id)->first();

            if($request->file('file_foto')){
                $fileFoto = $this->upload_file($request->file('file_foto'),'F');
                $this->delete_file($data->file_foto);
                KaryawanModel::where('id',$id)->update([
                    'file_foto' => $fileFoto['nama'],
                ]);
            }
            if($request->file('file_ktp')){
                $fileKTP = $this->upload_file($request->file('file_ktp'),'K');
                $this->delete_file($data->file_ktp);
                KaryawanModel::where('id',$id)->update([
                    'file_ktp' => $fileKTP['nama'],
                ]);
            }
            if($request->file('file_npwp')){
                $fileNPWP = $this->upload_file($request->file('file_npwp'),'N');
                $this->delete_file($data->file_npwp);
                KaryawanModel::where('id',$id)->update([
                    'file_npwp' => $fileNPWP['nama'],
                ]);
            }
            if($request->file('file_ijazah')){
                $fileIjazah = $this->upload_file($request->file('file_ijazah'),'I');
                $this->delete_file($data->file_ijazah);
                KaryawanModel::where('id',$id)->update([
                    'file_ijazah' => $fileIjazah['nama'],
                ]);
            }
            if($request->file('file_bpjs_kesehatan')){
                $fileBPJSK = $this->upload_file($request->file('file_bpjs_kesehatan'),'B');
                $this->delete_file($data->file_bpjs_kesehatan);
                KaryawanModel::where('id',$id)->update([
                    'file_bpjs_kesehatan' => $fileBPJSK['nama'],
                ]);
            }
            if($request->file('file_bpjs_ketenagakerjaan')){
                $fileBPJSKK = $this->upload_file($request->file('file_bpjs_ketenagakerjaan'),'BK');
                $this->delete_file($data->file_bpjs_ketenagakerjaan);
                KaryawanModel::where('id',$id)->update([
                    'file_bpjs_ketenagakerjaan' => $fileBPJSKK['nama'],
                ]);
            }
            if($request->file('file_sertifikat')){
                $fileSertifikat = $this->upload_file($request->file('file_sertifikat'),'S');
                $this->delete_file($data->file_sertifikat);
                KaryawanModel::where('id',$id)->update([
                    'file_sertifikat' => $fileSertifikat['nama'],
                ]);
            }

            KaryawanModel::where('id',$id)->update([
                'id_jabatan' => $request->get('id_jabatan'),
                'id_departemen' => $request->get('id_departemen'),
                'nik' => $request->get('nik'),
                'nama' => $request->get('nama'),
                'jenis_kelamin' => $request->get('jenis_kelamin'),
                'tgl_lahir' => $request->get('tgl_lahir'),
                'tempat_lahir' => $request->get('tempat_lahir'),
                'alamat' => $request->get('alamat'),
                'alamat_domisili' => $request->get('alamat_domisili'),
                'ktp' => $request->get('ktp'),
                'bpjs_kesehatan' => $request->get('bpjs_kesehatan'),
                'bpjs_ketenagakerjaan' => $request->get('bpjs_ketenagakerjaan'),
                'npwp' => $request->get('npwp'),
                'ijazah' => $request->get('ijazah'),
                'tgl_masuk' => $request->get('tgl_masuk'),
                'tgl_keluar' => $request->get('tgl_keluar'),
                'status_karyawan' => $request->get('status_karyawan'),
                'status_kawin' => $request->get('status_kawin'),
                'user_at' => auth()->user()->name,
            ]);

            return response()->json(
                [
                    'status' => true,
                    'message' => 'Berhasil mengganti data',
                ],Response::HTTP_OK);

        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $data = KaryawanModel::where('id',$id)->first();
            if($data){
                $this->delete_file($data->file_foto);
                $this->delete_file($data->file_ktp);
                $this->delete_file($data->file_bpjs_kesehatan);
                $this->delete_file($data->file_bpjs_ketenagakerjaan);
                $this->delete_file($data->file_npwp);
                $this->delete_file($data->file_ijazah);
                $this->delete_file($data->file_sertifikat);
            }
            KaryawanModel::where('id',$id)->delete();
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Berhasil menghapus data',
                ],Response::HTTP_OK);

        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function show($id)
    {
        $data = new KaryawanModel;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('jabatan', 'departemen')->where('id',$id)->first(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function show_nik(Request $request)
    {
        $data = new KaryawanModel;
        if (count($data->get()) > 0) {
            $nik = $request->get('nik');
            if($request->get('nik')){
                return response()->json([
                    'status' => true,
                    'message' => 'Berhasil menampilkan data',
                    'data' => $data->where('nik',$nik)->first(),
                ], Response::HTTP_OK);
            }else{
                return response()->json([
                'status' => false,
                'message' => 'Nik wajib di isi.',
            ], Response::HTTP_BAD_REQUEST);
            }
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    function upload_file($filename, $jenis)
    {
        $imageFile = $filename;

        $originalFileName = $imageFile->getClientOriginalName();
        $extension = $imageFile->getClientOriginalExtension();
        $fileNameWithoutExt = pathinfo($originalFileName, PATHINFO_FILENAME);

        // $newFileName = Str::slug($fileNameWithoutExt) . '-' . time() . '.' . $extension;
        $newFileName = $jenis . '.' . time() . '.' . $extension;

        // Simpan file ke storage/app/public/uploads
        $path = Storage::disk('public')->putFileAs('uploads', $imageFile, $newFileName);

        $data['nama'] = $newFileName;
        $data['path'] = $path;

        return $data;
    }

    function delete_file($filename)
    {
        if($filename){
            $filePath = 'uploads/' . $filename;
            if (Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
            }
        }
    }
}