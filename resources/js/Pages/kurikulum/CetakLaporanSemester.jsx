import moment from "moment/moment";
import "moment/locale/id";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Head } from "@inertiajs/react";

export default function CetakLaporanSemester({
    presensiData: data_presensi,
    nama_guru,
    title,
}) {
    const [currentItems, setCurrentItems] = useState([]);
    console.log(data_presensi);

    // mengambil data bulan dari data_presensi
    const getBulan = () => {
        const bulan = data_presensi.map((item) => {
            return item.tanggal.split("-")[1];
        });
        // filter bulan yang unik
        const bulanUnik = bulan
            .filter((item, index) => bulan.indexOf(item) === index)
            .sort((a, b) => a - b);

        // buatkan filter data_presensi berdasarkan bulan / pisaah data berdasarkan bulan
        const dataBulan = bulanUnik.map((item) => {
            return data_presensi.filter((data) => {
                return data.tanggal.split("-")[1] === item;
            });
        });

        setCurrentItems(dataBulan);
    };

    useEffect(() => {
        getBulan();
    }, []);

    // otomatis print
    // useEffect(() => {
    //     if (data_presensi.length > 0) {
    //         setTimeout(() => {
    //             window.print();
    //         }, 1000);
    //     }
    // }, []);

    return (
        <div className="w-full flex flex-col gap-5 justify-center items-center px-5 py-2">
            <Head title={title} />
            <div className="w-full flex flex-row gap-5 justify-center items-center">
                <h1 className="text-2xl font-bold text-gray-500">
                    Cetak Laporan Semester {nama_guru}
                </h1>
            </div>
            {/* total hadir izin sakit terlambat */}
            <div className="w-full flex flex-row gap-2 justify-end items-center">
                <h1>Total</h1>
                <h1 className="text-md font-bold text-gray-500">
                    {data_presensi.length}
                </h1>

                <h1>Hadir</h1>
                <h1 className="text-md font-bold text-green-500">
                    {
                        data_presensi.filter(
                            (data) =>
                                data?.data_presensi.jam_masuk?.kehadiran
                                    ?.kehadiran === "Hadir"
                        ).length
                    }
                </h1>

                <h1>Izin</h1>
                <h1 className="text-md font-bold text-yellow-500">
                    {
                        data_presensi.filter(
                            (data) =>
                                data?.data_presensi.jam_masuk?.kehadiran
                                    ?.kehadiran === "Izin"
                        ).length
                    }
                </h1>

                <h1>Sakit</h1>
                <h1 className="text-md font-bold text-blue-500">
                    {
                        data_presensi.filter(
                            (data) =>
                                data?.data_presensi.jam_masuk?.kehadiran
                                    ?.kehadiran === "Sakit"
                        ).length
                    }
                </h1>

                <h1>Terlambat</h1>
                <h1 className="text-md font-bold text-pink-500">
                    {
                        data_presensi.filter(
                            (data) =>
                                data?.data_presensi.jam_masuk?.kehadiran
                                    ?.kehadiran === "Terlambat"
                        ).length
                    }
                </h1>
                <h1>Alpa</h1>
                <h1 className="text-md font-bold text-red-500">
                    {
                        data_presensi.filter(
                            (data) =>
                                data?.data_presensi.jam_masuk?.kehadiran
                                    ?.kehadiran === "Alpa"
                        ).length
                    }
                </h1>
            </div>
            {/* buatkan table biasa nama hari/tanggal */}
            {currentItems ? (
                currentItems.map((item, index) => (
                    <div key={index} className="w-full flex flex-col gap-5">
                        <div className="w-full flex flex-row gap-2 justify-start items-center">
                            <h1>Bulan :</h1>
                            <h1 className="text-md font-bold text-gray-500">
                                {moment(item[0].tanggal)
                                    .locale("id")
                                    .format("MMMM")}
                            </h1>
                        </div>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        className="border border-gray-300 p-2"
                                        colSpan={item.length}
                                    >
                                        Hari / Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {item
                                        .sort(
                                            (a, b) =>
                                                new Date(a.tanggal) -
                                                new Date(b.tanggal)
                                        )
                                        .map((data, index) => (
                                            <td
                                                key={index}
                                                className={`border border-gray-300 p-2 `}
                                            >
                                                {/* {moment(data.tanggal).format("dddd")} */}
                                                {/* singkat nama hari */}
                                                {moment(data.tanggal)
                                                    .locale("id")
                                                    .format("dd")}
                                            </td>
                                        ))}
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    {item
                                        .sort(
                                            (a, b) =>
                                                new Date(a.tanggal) -
                                                new Date(b.tanggal)
                                        )
                                        .map((data, index) => (
                                            <td
                                                key={index}
                                                className={`border border-gray-300  p-2 ${
                                                    data?.data_presensi
                                                        ?.jam_masuk ||
                                                    data?.data_presensi
                                                        ?.jam_keluar
                                                        ? data?.data_presensi
                                                              ?.jam_masuk
                                                            ? data
                                                                  ?.data_presensi
                                                                  ?.jam_masuk
                                                                  ?.kehadiran
                                                                  ?.kehadiran ===
                                                              "Hadir"
                                                                ? "bg-green-500"
                                                                : data
                                                                      ?.data_presensi
                                                                      ?.jam_masuk
                                                                      ?.kehadiran
                                                                      ?.kehadiran ===
                                                                  "Izin"
                                                                ? "bg-yellow-500"
                                                                : data
                                                                      ?.data_presensi
                                                                      ?.jam_masuk
                                                                      ?.kehadiran
                                                                      ?.kehadiran ===
                                                                  "Sakit"
                                                                ? "bg-blue-500"
                                                                : data
                                                                      ?.data_presensi
                                                                      ?.jam_masuk
                                                                      ?.kehadiran
                                                                      ?.kehadiran ===
                                                                  "Terlambat"
                                                                ? "bg-red-500"
                                                                : ""
                                                            : data
                                                                  ?.data_presensi
                                                                  ?.jam_keluar
                                                            ? data
                                                                  ?.data_presensi
                                                                  ?.jam_keluar
                                                                  ?.kehadiran
                                                                  ?.kehadiran ===
                                                              "Hadir"
                                                                ? "bg-green-500"
                                                                : data
                                                                      ?.data_presensi
                                                                      ?.jam_keluar
                                                                      ?.kehadiran
                                                                      ?.kehadiran ===
                                                                  "Izin"
                                                                ? "bg-yellow-500"
                                                                : data
                                                                      ?.data_presensi
                                                                      ?.jam_keluar
                                                                      ?.kehadiran
                                                                      ?.kehadiran ===
                                                                  "Sakit"
                                                                ? "bg-blue-500"
                                                                : data
                                                                      ?.data_presensi
                                                                      ?.jam_keluar
                                                                      ?.kehadiran
                                                                      ?.kehadiran ===
                                                                  "Terlambat"
                                                                ? "bg-pink-500"
                                                                : data
                                                                      ?.data_presensi
                                                                      ?.jam_keluar
                                                                      ?.kehadiran
                                                                      ?.kehadiran ===
                                                                  "Alpa"
                                                                ? "bg-red-500"
                                                                : ""
                                                            : "bg-red-500"
                                                        : "bg-red-500"
                                                }`}
                                            >
                                                {moment(data.tanggal)
                                                    .locale("id")
                                                    .format("DD")}
                                            </td>
                                        ))}
                                </tr>
                            </tbody>
                        </table>
                        {/* total status */}
                        <div className="w-full flex flex-row gap-2 justify-start items-center">
                            <h1>Total</h1>
                            <h1 className="text-md font-bold text-gray-500">
                                {item.length}
                            </h1>

                            <h1>Hadir</h1>
                            <h1 className="text-md font-bold text-green-500">
                                {
                                    item.filter(
                                        (data) =>
                                            data?.data_presensi.jam_masuk
                                                ?.kehadiran?.kehadiran ===
                                            "Hadir"
                                    ).length
                                }
                            </h1>

                            <h1>Izin</h1>
                            <h1 className="text-md font-bold text-yellow-500">
                                {
                                    item.filter(
                                        (data) =>
                                            data?.data_presensi.jam_masuk
                                                ?.kehadiran?.kehadiran ===
                                            "Izin"
                                    ).length
                                }
                            </h1>

                            <h1>Sakit</h1>
                            <h1 className="text-md font-bold text-blue-500">
                                {
                                    item.filter(
                                        (data) =>
                                            data?.data_presensi.jam_masuk
                                                ?.kehadiran?.kehadiran ===
                                            "Sakit"
                                    ).length
                                }
                            </h1>

                            <h1>Terlambat</h1>
                            <h1 className="text-md font-bold text-pink-500">
                                {
                                    item.filter(
                                        (data) =>
                                            data?.data_presensi.jam_masuk
                                                ?.kehadiran?.kehadiran ===
                                            "Terlambat"
                                    ).length
                                }
                            </h1>
                            <h1>Alpa</h1>
                            <h1 className="text-md font-bold text-red-500">
                                {
                                    item.filter(
                                        (data) =>
                                            data?.data_presensi.jam_masuk
                                                ?.kehadiran?.kehadiran ===
                                            "Alpa"
                                    ).length
                                }
                            </h1>
                        </div>
                    </div>
                ))
            ) : (
                <td className="border border-gray-300 p-2"></td>
            )}
        </div>
    );
}
