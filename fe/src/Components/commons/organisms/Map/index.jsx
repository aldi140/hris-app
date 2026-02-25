
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { ImageURL, ImageURLKoplink } from "../../../../api";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from '../../../ui/alert';
import { AlertTriangleIcon } from 'lucide-react';

const Map = ({ data, jenis, typeFile }) => {
    const [longlat, setLonglat] = useState([]);

    useEffect(() => {
        if (!data?.length) return;

        const firstData = data[0];
        const dataLonglat = []
        const detailAbsen = []


        if (jenis === "Survey") {
            if (
                firstData?.absensi?.check_in_latitude &&
                firstData?.absensi?.check_in_latitude !== 0 &&
                firstData?.absensi?.check_in_latitude !== "" &&
                firstData?.absensi?.check_in_longitude &&
                firstData?.absensi?.check_in_longitude !== 0 &&
                firstData?.absensi?.check_in_longitude !== ""
            ) {
                let tglAbsen = firstData.tgl_survei.split(" ")[0];
                let jamAbsen = firstData.tgl_survei.split(" ")[1];


                detailAbsen.push({
                    tglAbsen,
                    jamAbsen,
                })
                dataLonglat.push({
                    lat: firstData?.absensi?.check_in_latitude,
                    lng: firstData?.absensi?.check_in_longitude,
                    detail: detailAbsen[0]
                });
            }
            const coordinates = data
                .filter(item =>
                    item.lat_rumah !== 0 &&
                    item.lat_rumah !== null &&
                    item.lat_rumah !== "" &&
                    item.long_rumah !== 0 &&
                    item.long_rumah !== null &&
                    item.long_rumah !== ""
                )
                .map(item => {
                    return {
                        lat: item.lat_rumah,
                        lng: item.long_rumah,
                        detail: item
                    };
                })

            dataLonglat.push(...coordinates);
        }

        if (jenis === "Kunjungan") {
            if (
                firstData?.absensi?.check_in_latitude &&
                firstData?.absensi?.check_in_latitude !== 0 &&
                firstData?.absensi?.check_in_latitude !== "" &&
                firstData?.absensi?.check_in_longitude &&
                firstData?.absensi?.check_in_longitude !== 0 &&
                firstData?.absensi?.check_in_longitude !== ""
            ) {
                let tglAbsen = firstData.waktu_kunjungan.split(" ")[0];
                let jamAbsen = firstData.waktu_kunjungan.split(" ")[1];


                detailAbsen.push({
                    tglAbsen,
                    jamAbsen,
                })
                dataLonglat.push({
                    lat: firstData?.absensi?.check_in_latitude,
                    lng: firstData?.absensi?.check_in_longitude,
                    detail: detailAbsen[0]
                });
            }
            const coordinates = data
                .filter(item =>
                    item.lat_lokasi !== 0 &&
                    item.lat_lokasi !== null &&
                    item.lat_lokasi !== "" &&
                    item.long_lokasi !== 0 &&
                    item.long_lokasi !== null &&
                    item.long_lokasi !== ""
                )
                .map(item => ({
                    lat: item.lat_lokasi,
                    lng: item.long_lokasi,
                    detail: item
                }));

            dataLonglat.push(...coordinates);
        }

        setLonglat(dataLonglat);

    }, [data, jenis]);

    if (!data) return
    if (data[0]?.absensi.check_in_latitude === '' || data[0]?.absensi.check_in_longitude === '') return (
        <>
            <Alert className="w-full border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                <AlertTriangleIcon />
                <AlertTitle>Tidak dapat menemukan lokasi.</AlertTitle>
                <AlertDescription>
                    <p>Pastikan karyawan sudah melakukan absensi terlebih dahulu.</p>
                </AlertDescription>
            </Alert>
        </>
    );
    if (!longlat.length) return <p>Lokasi tidak tersedia</p>;
    // console.log('data', data)

    const locationOutlineSvg = `
<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 1 24 24"
  class="w-4 h-4 block"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round">
  <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"/>
  <circle cx="12" cy="11" r="2.5"/>
</svg>
`;


    const flagSvg = `
<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white"
     fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M5 5v14M5 5h11l-2 4 2 4H5"/>
</svg>
`;

    const pinIcon = (index, type) =>
        L.divIcon({
            html: `
    <div class="
            ${type === "start"
                    ? "bg-linear-to-t from-emerald-800 to-emerald-600 w-8 h-8"
                    : type === "end"
                        ? "bg-linear-to-t from-red-800 to-red-600 w-8 h-8"
                        : "bg-linear-to-t from-indigo-800 to-indigo-600 w-7 h-7"
                }
            rounded-full border-2 border-white shadow
            relative flex items-center justify-center">
            <div class="text-center text-white ${type === "end" ? "ms-0.75" : ""}">
                ${type === "start" ? "" : type === "end" ? flagSvg : locationOutlineSvg}
            </div>
            ${type !== "end" && type !== "start" ? `
                <div class="absolute -top-2 -right-2 bg-orange-400 w-4 h-4
                            border-2 border-white rounded-full text-[8px]
                            flex items-center justify-center text-white">
                    ${index + 1}
                </div>
                `
                    : ""}
    </div>
`,
            className: "",
            iconSize: [20, 40],
            iconAnchor: [17, 18],
            popupAnchor: [-5, -18],
        });

    // if (!longlat) return <p>Lokasi tidak tersedia</p>;
    // console.log(longlat)
    const limeOptions = { color: 'blue', dashArray: '5', weight: 2 };
    const blueIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const redIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    return (
        // <>
        // </>
        <MapContainer
            key={longlat?.length}
            center={[Number(longlat[0]?.lat), Number(longlat[0]?.lng)]}
            zoom={5}
            style={{ height: "400px", width: "100%" }}
        >

            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline pathOptions={limeOptions} positions={longlat} />
            {longlat?.map((item, index) => {
                let imgArr = [];
                let nama = "";
                let alamat = "";
                const isFirst = index === 0;
                const isLast = index === longlat?.length - 1;
                const icon = pinIcon(index - 1, isFirst ? "start" : isLast ? "end" : "middle");
                if (jenis == 'Survey') {
                    nama = item?.detail.nama
                    alamat = item?.detail.alamat
                    if (!isFirst) {
                        imgArr = item?.detail.foto_rumah.split(",");
                    }
                }
                if (jenis == 'Kunjungan') {
                    nama = item?.detail.nama_nasabah
                    alamat = item?.detail.alamat
                    // console.log(imgArr[0])
                    if (!isFirst) {
                        imgArr = item?.detail.foto_lokasi.split(",");
                    }
                }
                return (
                    <Marker key={index} position={[item.lat, item.lng]} icon={icon}>
                        {index === 0 ?
                            <Popup>
                                <div className="flex flex-col gap-2 max-w-40">
                                    <div className="text-sm font-semibold">Titik Awal Karyawan</div>
                                    <div className="text-xs text-gray-500">Longtitude : {item.lat}</div>
                                    <div className="text-xs text-gray-500">Latitude   : {item.lng}</div>
                                    <div className="text-xs text-gray-500">Jam Absen : {item.detail.jamAbsen}</div>
                                    <div className="text-xs text-gray-500">Tgl  Absen : {item.detail.tglAbsen}</div>
                                </div>
                            </Popup>
                            : (
                                <Popup>
                                    <div className="flex flex-col gap-2 max-w-40">
                                        <img
                                            src={`${ImageURLKoplink}${typeFile}/${imgArr[0]}`}
                                            // src=""
                                            alt="foto lokasi"
                                            className="w-40 rounded h-40 object-cover mx-auto"
                                        />
                                        <div className="text-sm font-semibold">Lokasi {jenis} ke- {index}</div>
                                        <div className="text-xs text-gray-500">{nama}</div>
                                        <div className="text-xs text-gray-500">{alamat}</div>
                                    </div>
                                </Popup>
                            )}
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;