<?php 
	namespace App\Helpers;

	use App\Models\Transaksi\PinjamanAngsuranModels;
	use App\Models\Master\BungaDendaModels;

	class TransaksiCalculationHelper extends Calculation
	{
		private $data;

		public function __construct($data)
	    {
	        $this->data = $data;        //obj
	    }

	    public function datapinjamanCal()
    	{
    		$pengaturan =  BungaDendaModels::JenisDendaKeterlambatanTerpakai();
    		if ($this->data->tipe_pinjaman == 'TANPA AGUNAN' || $this->data->tipe_pinjaman == 'AC') {
    			foreach (parent::calAngsuranFlat($this->data->nominal, $this->data->tenor, $this->data->bunga, $this->data->tgl_transaksi) as $datapinjaman_data) {
    				$datapinjaman = new PinjamanAngsuranModels();
    				$nominal_denda = (($persen_denda / 30) / 100) * $value['nominal'];

    				$datapinjaman->id_transaksi = $this->data->id;
    				$datapinjaman->payment_no = $datapinjaman_data['payment_no'];
    				$datapinjaman->nominal = $datapinjaman_data['nominal'];
    				$datapinjaman->hutang_pokok = $datapinjaman_data['hutang_pokok'];
    				$datapinjaman->bunga = $datapinjaman_data['bunga'];
    				$datapinjaman->balance = $datapinjaman_data['balance'];
    				$datapinjaman->bruto = $datapinjaman_data['bruto'];
    				$datapinjaman->tgl_jatuh_tempo = $datapinjaman_data['date'];
    				$datapinjaman->status = 0;
    				$datapinjaman->id_denda = $pengaturan->id;
    				$datapinjaman->denda_persen = $pengaturan->nominal;
    				$datapinjaman->denda = $nominal_denda;
    				$datapinjaman->denda_adm = 0;
    				$datapinjaman->denda_bayar = 0;
    				$datapinjaman->denda_adm_bayar = 0;
    				$datapinjaman->id_kantor = $this->data->id_kantor;
    				// $datapinjaman->save();
    				
    			}
    		}else if ($this->data->tipe_pinjaman == 'WIDYA') {

    		}else{
    			if ($this->data->jenis == 'Flat' || $this->data->jenis == 'FLAT') {

    			}else if ($this->data->jenis == 'Sliding' || $this->data->jenis == 'SLIDING') {

    			}else{

    			}
    		}
    	}
	}
?>