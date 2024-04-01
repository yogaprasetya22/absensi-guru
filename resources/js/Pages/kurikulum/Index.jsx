import Layout from "@/Layouts/Layout";
import React from "react";
import { useGeolocated } from "react-geolocated";

const SchoolArea = {
    // Area sekolah dengan koordinat yang telah ditentukan
    latitude: -6.3159484,
    longitude: 106.6985583,
    radius: 0.01, // Sekala kecil untuk contoh, dapat disesuaikan dengan kebutuhan
};

const Components = () => {
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

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <div>
            {isInSchoolArea() ? (
                <div>
                    <h2>Welcome to School!</h2>
                    {/* Tambahkan komponen atau fitur yang hanya dapat diakses di dalam area sekolah */}
                </div>
            ) : (
                <div>
                    <h2>Outside of School Area</h2>
                    {/* Tampilkan pesan atau arahkan pengguna ke luar area sekolah */}
                </div>
            )}
        </div>
    ) : (
        <div>Getting the location data&hellip;</div>
    );
};

export default function Index() {
    return (
        <Layout>
            <Components />
        </Layout>
    );
}
