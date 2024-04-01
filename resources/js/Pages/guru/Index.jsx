import Layout from "@/Layouts/Layout";
import React from "react";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

export default function Index({ absen_masuk, data_presensi }) {
    const [currentItems, setCurrentItems] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");

    useEffect(() => {
        const currentMonth = new Date().getMonth() + 1;
        setSelectedMonth(currentMonth.toString());
    }, []);

    useEffect(() => {
        if (selectedMonth) {
            const filterData = data_presensi.filter(
                (item) =>
                    new Date(item.tanggal).getMonth() + 1 ===
                    parseInt(selectedMonth)
            );
            setCurrentItems(filterData);
        }
    }, [selectedMonth, data_presensi]);

    const months = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];

    // Handler untuk mengubah nilai bulan yang dipilih
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };
    return (
        <Layout>
            <div className="w-full flex flex-col gap-5">
                <div className="w-full bg-violet-400/80 shadow-md rounded-md flex flex-col p-5">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-lg text-white font-semibold">
                                Selamat Datang
                            </p>
                        </div>
                        <h1 className="text-2xl text-white font-extrabold">
                            Mochammad Yoga Prasetya
                        </h1>
                        <hr />
                        <div className="flex flex-row justify-around py-4">
                            {/* Absensi */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-center">
                                    <Link
                                        href="/absensi"
                                        className="px-4 py-2 text-white bg-pink-500/80 rounded-lg"
                                    >
                                        <i className="fas fa-camera text-2xl"></i>
                                    </Link>
                                </div>
                                <p className="text-white font-semibold text-center">
                                    Absensi
                                </p>
                            </div>
                            {/* History */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-center">
                                    <Link
                                        href="/history-absensi"
                                        className="px-4 py-2 text-white bg-green-500/80 rounded-lg"
                                    >
                                        <i className="fas fa-history text-2xl"></i>
                                    </Link>
                                </div>
                                <p className="text-white font-semibold text-center">
                                    History
                                </p>
                            </div>
                            {/* Profil */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-center">
                                    <Link
                                        href="/profile"
                                        className="px-4 py-2 text-white bg-yellow-500/80 rounded-lg"
                                    >
                                        <i className="fas fa-user text-2xl"></i>
                                    </Link>
                                </div>
                                <p className="text-white font-semibold text-center">
                                    Profil
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-2">
                    {/* absen masuk */}
                    <div className="w-1/2 bg-pink-500/80 shadow-md rounded-md p-5">
                        <div className="flex flex-col gap-2 text-white">
                            <p className="text-lg font-semibold">Absen Masuk</p>
                            <div className="flex flex-row justify-between gap-2">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm">Jam Masuk</p>
                                    {absen_masuk && absen_masuk.jam_masuk ? (
                                        <p className="text-xl">
                                            {absen_masuk.jam_masuk.jam_masuk}
                                        </p>
                                    ) : (
                                        <p className="text-xl">-</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm">Status</p>
                                    {absen_masuk && absen_masuk.jam_masuk ? (
                                        <p className="text-sm font-semibold">
                                            {
                                                absen_masuk.jam_masuk.kehadiran
                                                    .kehadiran
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
                                    {absen_masuk && absen_masuk.jam_keluar ? (
                                        <p className="text-xl">
                                            {absen_masuk.jam_keluar.jam_keluar}
                                        </p>
                                    ) : (
                                        <p className="text-xl">-</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm">Status</p>
                                    {absen_masuk && absen_masuk.jam_keluar ? (
                                        <p className="text-sm font-semibold">
                                            {
                                                absen_masuk.jam_keluar.kehadiran
                                                    .kehadiran
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
                <div className="w-full flex flex-col gap-5">
                    <div className=" inline-flex items-center gap-5 pl-4">
                        <p className="text-xl font-semibold">
                            Absensi Hari Ini
                        </p>
                        <select
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Pilih Bulan</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* buatkan 4 blok yaitu Hadir Izin Sakit Terlambat */}
                    <div className="flex flex-row justify-between gap-2 ">
                        <div className="w-1/4 bg-white shadow-md rounded-md p-5">
                            <div className="flex flex-row gap-5 items-center">
                                <i className="fas fa-user-check text-2xl text-pink-600"></i>
                                <div className="flex flex-col gap-1 text-black">
                                    <p className="text-lg font-semibold">
                                        Hadir
                                    </p>
                                    <p className="text-xl">
                                        {
                                            currentItems.filter(
                                                (item) =>
                                                    item.jam_masuk.kehadiran
                                                        .kehadiran == "Hadir"
                                            ).length
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 bg-white shadow-md rounded-md p-5">
                            <div className="flex flex-row gap-5 items-center">
                                <i className="fas fa-user text-2xl text-blue-600"></i>
                                <div className="flex flex-col gap-1 text-black">
                                    <p className="text-lg font-semibold">
                                        Izin
                                    </p>
                                    <p className="text-xl">
                                        {
                                            currentItems.filter(
                                                (item) =>
                                                    item.jam_masuk.kehadiran
                                                        .kehadiran == "Izin"
                                            ).length
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 bg-white shadow-md rounded-md p-5">
                            <div className="flex flex-row gap-5 items-center">
                                <i className="fab fa-confluence text-2xl text-green-600"></i>
                                <div className="flex flex-col gap-1 text-black">
                                    <p className="text-lg font-semibold">
                                        Sakit
                                    </p>
                                    <p className="text-xl">
                                        {
                                            currentItems.filter(
                                                (item) =>
                                                    item.jam_masuk.kehadiran
                                                        .kehadiran == "Sakit"
                                            ).length
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 bg-white shadow-md rounded-md p-5">
                            <div className="flex flex-row gap-5 items-center">
                                <i className="fas fa-stopwatch text-2xl text-yellow-600"></i>
                                <div className="flex flex-col gap-1 text-black">
                                    <p className="text-lg font-semibold">
                                        Terlambat
                                    </p>
                                    <p className="text-xl">
                                        {
                                            currentItems.filter(
                                                (item) =>
                                                    item.jam_masuk.kehadiran
                                                        .kehadiran ==
                                                    "Terlambat"
                                            ).length
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
