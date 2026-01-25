<?php

	namespace App\Helpers;

	class Calculation {
		// OTO DAN KALA
		public function calAngsuranFlat($jumlah_pinjaman, $tenor, $bunga, $start_date)
		{
			$data = [];
			// $interest = $bunga / 100 * $tenor / 12;
			$interest = $bunga / 100 * $tenor;
			$hp = round($jumlah_pinjaman / $tenor, 4);
			// $hp = $jumlah_pinjaman / $tenor;
			$jumlah_pinjamanx = $jumlah_pinjaman;
			$bruto = round($jumlah_pinjamanx + ($jumlah_pinjaman * $interest), 4);

			for ($i = 1; $i <= $tenor; $i++) {

				$balance = $jumlah_pinjamanx - $hp;

				// functin di balikin ke awal
				$data[$i]['payment_no'] = $i;
				$data[$i]['date'] = date('Y-m-d', strtotime('+' . $i . 'month', strtotime($start_date)));
				$data[$i]['bunga'] = round($hp * $interest, 4);
				$data[$i]['nominal'] = round($hp + $data[$i]['bunga'], 4);
				$data[$i]['hutang_pokok'] = round($hp, 4);
				$data[$i]['balance'] = $jumlah_pinjamanx - $hp;
				$brutox = $bruto - $data[$i]['nominal'];
				$data[$i]['bruto'] = $brutox;
				$jumlah_pinjamanx = $balance;
				$bruto = $bruto - $data[$i]['nominal'];
			}
			return $data;
		}

		// SAPTA DAN CAHAYA
		public function calAngsuranFlatNonAngunan($jumlah_pinjaman, $tenor, $bunga, $start_date)
		{
			$data = [];
			// $interest = $bunga / 100 * $tenor / 12;	// denda pertahun
			$interest = $bunga / 100 * $tenor;		// denda perbulan(angsuran)
			$hp = round($jumlah_pinjaman / $tenor, 4);
			// $hp = $jumlah_pinjaman / $tenor;
			$jumlah_pinjamanx = $jumlah_pinjaman;
			$bruto = round($jumlah_pinjamanx + ($jumlah_pinjaman * $interest), 4);

			for ($i = 1; $i <= $tenor; $i++) {

				$balance = $jumlah_pinjamanx - $hp;

				// functin di balikin ke awal
				$data[$i]['payment_no'] = $i;
				$data[$i]['date'] = date('Y-m-d', strtotime('+' . $i . ' week', strtotime($start_date)));
				$data[$i]['bunga'] = round($hp * $interest, 4);
				$data[$i]['nominal'] = round($hp + $data[$i]['bunga'], 4);
				$data[$i]['hutang_pokok'] = round($hp, 4);
				$data[$i]['balance'] = $jumlah_pinjamanx - $hp;
				$brutox = $bruto - $data[$i]['nominal'];
				$data[$i]['bruto'] = $brutox;
				$jumlah_pinjamanx = $balance;
				$bruto = $bruto - $data[$i]['nominal'];
			}
			return $data;
		}

		// KALA BUNGA PERBULAN
		public function calAngsuranFlatTerminBungaBulan($jumlah_pinjaman, $tenor, $bunga, $start_date, $termin)
		{
			$data = [];
			$tenorx = $tenor / $termin;
			// 		$interest = $bunga / 100 * $termin / 12;	// denda pertahun
			$interest = $bunga / 100 * $termin;
			$hp = round($jumlah_pinjaman / $termin, 4);
			// $hp = $jumlah_pinjaman / $termin;
			$jumlah_pinjamanx = $jumlah_pinjaman;
			$bruto = round($jumlah_pinjamanx + ($jumlah_pinjaman * ($interest * $tenorx)), 4);
			$x = 1;
			for ($i = 1; $i <= $tenor; $i++) {

				$balance = $jumlah_pinjamanx;

				// functin di balikin ke awal
				$data[$i]['payment_no'] = $i;
				// $data[$i]['date'] = date('Y-m-d', strtotime('+' . ($i * ($tenorx)) . 'month', strtotime($start_date)));
				$data[$i]['date'] = date('Y-m-d', strtotime('+' . $i . 'month', strtotime($start_date)));
				if ($tenorx == $x) {
					$x = 0;
					$balance = $jumlah_pinjamanx - $hp;
					$data[$i]['bunga'] = round($hp * $interest, 4);
					$data[$i]['nominal'] = round($hp + $data[$i]['bunga'], 4);
					$data[$i]['hutang_pokok'] = round($hp, 4);
					$data[$i]['balance'] = $jumlah_pinjamanx - $hp;
					$brutox = $bruto - $data[$i]['nominal'];
					$data[$i]['bruto'] = $brutox;
					$jumlah_pinjamanx = $balance;
					$bruto = $bruto - $data[$i]['nominal'];
				} else {
					$data[$i]['bunga'] = round($hp * $interest, 4);
					$data[$i]['nominal'] = round($data[$i]['bunga'], 4);
					$data[$i]['hutang_pokok'] = 0;
					$data[$i]['balance'] = $jumlah_pinjamanx;
					$brutox = $bruto - $data[$i]['nominal'];
					$data[$i]['bruto'] = $brutox;
					$jumlah_pinjamanx = $balance;
					$bruto = $bruto - $data[$i]['nominal'];
				}

				$x++;
			}
			return $data;
		}

		// KALA BUNGA SESUAI ANGSURAN
		public function calAngsuranFlatBungaTermin($jumlah_pinjaman, $tenor, $bunga, $start_date, $termin)
		{
			$data = [];
			$tenorx = $tenor / $termin;
			// 		$interest = $bunga / 100 * $termin / 12;	// denda pertahun
			$interest = $bunga / 100 * $termin;
			$hp = round($jumlah_pinjaman / $termin, 4);
			// $hp = $jumlah_pinjaman / $termin;
			$jumlah_pinjamanx = $jumlah_pinjaman;
			$bruto = round($jumlah_pinjamanx + ($jumlah_pinjaman * $interest * $tenorx), 4);
			$bunga_termin = 0;
			$x = 1;
			for ($i = 1; $i <= $termin; $i++) {

				$balance = $jumlah_pinjamanx;

				// functin di balikin ke awal
				$data[$i]['payment_no'] = $i;
				$data[$i]['date'] = date('Y-m-d', strtotime('+' . ($i * ($tenorx)) . 'month', strtotime($start_date)));
				// $data[$i]['date'] = date('Y-m-d', strtotime('+' . $i . 'month', strtotime($start_date)));

				$balance = $jumlah_pinjamanx - $hp;
				$data[$i]['bunga'] = round($hp * $interest * $tenorx, 4);
				$data[$i]['nominal'] = round($hp + $data[$i]['bunga'], 4);
				$data[$i]['hutang_pokok'] = round($hp, 4);
				$data[$i]['balance'] = $jumlah_pinjamanx - $hp;
				$brutox = $bruto - $data[$i]['nominal'];
				$data[$i]['bruto'] = $brutox;
				$jumlah_pinjamanx = $balance;
				$bruto = $bruto - $data[$i]['nominal'];
				$bunga_termin = 0;


				$x++;
			}
			return $data;
		}

		public function calAngsuranSlide($jumlah_pinjaman, $tenor, $bunga, $start_date)
		{
			$a = $this->getBruto($jumlah_pinjaman, $tenor, $bunga);
			$bruto = round($a, 4);
			$data = [];
			$hp = round($jumlah_pinjaman / $tenor, 4);
			// $hp = $jumlah_pinjaman / $tenor;
			$jumlah_pinjamanx = $jumlah_pinjaman;
			for ($i = 1; $i <= $tenor; $i++) {
				$balance = $jumlah_pinjamanx - $hp;

				// functin di balikin ke awal
				$data[$i]['payment_no'] = $i;
				$data[$i]['date'] = date('Y-m-d', strtotime('+' . $i . 'month', strtotime($start_date)));
				$data[$i]['bunga'] = round($jumlah_pinjamanx * $bunga / 1200, 4);
				$data[$i]['nominal'] = round($hp + $data[$i]['bunga'], 4);
				$data[$i]['hutang_pokok'] = round($hp, 4);
				$data[$i]['balance'] = $jumlah_pinjamanx - $hp;
				$brutox = $bruto - $data[$i]['nominal'];
				$data[$i]['bruto'] = $brutox;

				$jumlah_pinjamanx = $balance;
				$bruto = $bruto - $data[$i]['nominal'];
			}
			return $data;
		}

		function getBruto($jumlah_pinjaman, $tenor, $bunga)
		{
			$bruto = 0;
			$hp = $jumlah_pinjaman / $tenor;

			for ($i = 1; $i <= $tenor; $i++) {

				$hutangpokok = $jumlah_pinjaman - $hp;

				$data[$i]['bunga'] = $jumlah_pinjaman * $bunga / 1200;
				$data[$i]['nominal'] = $hp + $data[$i]['bunga'];
				$data[$i]['hutang_pokok'] = $hp;
				$data[$i]['balance'] = $jumlah_pinjaman - $hp;
				// stacking
				$brutox = $bruto + $data[$i]['nominal'];
				$data[$i]['bruto'] = $brutox;

				$jumlah_pinjaman = $hutangpokok;
				$bruto = $brutox;
			}
			return $bruto;
		}
	}