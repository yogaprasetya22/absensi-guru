import Layout from "@/Layouts/Layout";
import React from "react";
import { useGeolocated } from "react-geolocated";
import { useJsApiLoader } from "@react-google-maps/api";
import GoogleMapOutside from "@/Components/map/GoogleMapOutside";
import AbsenCam from "@/Components/absen/AbsenCam";
import { SchoolArea } from "@/Components/Example";


export default function Absensi({ auth, data_presensi }) {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true, // Menggunakan akurasi tinggi untuk mendapatkan lokasi yang lebih tepat
            },
            userDecisionTimeout: 5000,
        });
    // Fungsi untuk memeriksa apakah pengguna berada dalam area sekolah
    const isInSchoolArea = () => {
        if (coords) {
            const { latitude, longitude } = coords;
            const distance = Math.sqrt(
                Math.pow(latitude - SchoolArea.latitude, 2) +
                    Math.pow(longitude - SchoolArea.longitude, 2)
            );
            return distance <= SchoolArea.radius;
        }
        return false;
    };

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyDv_kV6yvYGZe743gH0W9-QQtStuS2kDaA",
    });

    return !isGeolocationAvailable ? (
        <Layout>
            <div className="flex justify-center">
                Browser tidak mendukung location
            </div>
        </Layout>
    ) : !isGeolocationEnabled ? (
        <Layout>
            <div className="flex justify-center">
                Lokasi belum dinyalakan
                <button
                    onClick={() => window.location.reload()}
                    className="btn btn-primary"
                >
                    Aktifkan Lokasi
                </button>
            </div>
        </Layout>
    ) : coords ? (
        <Layout>
            {data_presensi?.jam_keluar ? (
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl font-bold text-gray-500">
                        Hari ini sudah absen
                    </h1>
                    <div className="flex flex-row justify-between gap-2">
                        {/* absen masuk */}
                        <div className="w-1/2 bg-pink-500/80 shadow-md rounded-md p-5">
                            <div className="flex flex-col gap-2 text-white">
                                <p className="text-lg font-semibold">
                                    Absen Masuk
                                </p>
                                <div className="flex flex-row justify-between gap-2">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm">Jam Masuk</p>
                                        {data_presensi &&
                                        data_presensi.jam_masuk ? (
                                            <p className="text-xl">
                                                {
                                                    data_presensi.jam_masuk
                                                        .jam_masuk
                                                }
                                            </p>
                                        ) : (
                                            <p className="text-xl">-</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm">Status</p>
                                        {data_presensi &&
                                        data_presensi.jam_masuk ? (
                                            <p className="text-sm font-semibold">
                                                {
                                                    data_presensi.jam_masuk
                                                        .kehadiran.kehadiran
                                                }
                                            </p>
                                        ) : (
                                            <p className="text-sm font-semibold">
                                                Belum Masuk
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* absen keluar */}
                        <div className="w-1/2 bg-green-500/80 shadow-md rounded-md p-5">
                            <div className="flex flex-col gap-2 text-white">
                                <p className="text-lg font-semibold">
                                    Absen Keluar
                                </p>
                                <div className="flex flex-row justify-between gap-2">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm">Jam Keluar</p>
                                        {data_presensi &&
                                        data_presensi.jam_keluar ? (
                                            <p className="text-xl">
                                                {
                                                    data_presensi.jam_keluar
                                                        .jam_keluar
                                                }
                                            </p>
                                        ) : (
                                            <p className="text-xl">-</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm">Status</p>
                                        {data_presensi &&
                                        data_presensi.jam_keluar ? (
                                            <p className="text-sm font-semibold">
                                                {
                                                    data_presensi.jam_keluar
                                                        .kehadiran.kehadiran
                                                }
                                            </p>
                                        ) : (
                                            <p className="text-sm font-semibold">
                                                Belum Keluar
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {isInSchoolArea() ? (
                        <AbsenCam coords={coords} />
                    ) : (
                        <div>
                            <h2>Outside of School Area</h2>
                            {isLoaded && (
                                <GoogleMapOutside
                                    coords={coords}
                                    SchoolArea={SchoolArea}
                                />
                            )}
                        </div>
                    )}
                </>
            )}
        </Layout>
    ) : (
        <Layout>
            <div className="flex justify-center">
                <span className="loading loading-spinner text-error text-2xl"></span>
            </div>
        </Layout>
    );
}
