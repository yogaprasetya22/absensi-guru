import Layout from "@/Layouts/Layout";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import { Link } from "@inertiajs/react";
import FotoAndMap from "@/Components/modal/FotoAndMap";

export default function HistoryAbsensi({ data_presensi }) {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [url, setUrl] = useState({
        url: "",
        lat: 0,
        lng: 0,
    });

    useEffect(() => {
        // Mendapatkan bulan saat ini (mulai dari 1 untuk Januari hingga 12 untuk Desember)
        const currentMonth = new Date().getMonth() + 1;
        setSelectedMonth(currentMonth.toString());
    }, []);

    useEffect(() => {
        setLoading(true);

        // Filter data presensi berdasarkan bulan yang dipilih
        const filteredData = data_presensi.filter((item) => {
            // Ubah tanggal presensi menjadi objek Date
            const presensiDate = new Date(item.tanggal);
            // Ambil bulan dari tanggal presensi
            const presensiMonth = presensiDate.getMonth() + 1; // Bulan dimulai dari 0 (Januari) hingga 11 (Desember)

            // Cek apakah bulan presensi sama dengan bulan yang dipilih
            return presensiMonth === parseInt(selectedMonth);
        });

        // Urutkan dan potong data berdasarkan offset dan jumlah item per halaman
        const endOffset = parseInt(itemOffset) + parseInt(page);
        const sortedData = filteredData
            .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
            .slice(itemOffset, endOffset);

        // Setel data yang akan ditampilkan, jumlah halaman, dan status loading
        setCurrentItems(sortedData);
        setPageCount(Math.ceil(filteredData.length / page));
        setLoading(false);
    }, [itemOffset, data_presensi, page, selectedMonth]);

    const handlePageClick = (event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % data_presensi?.length;

        setItemOffset(newOffset);
    };

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
            {url && <FotoAndMap url={url} />}
            <div className="bg-white flex flex-col gap-10 rounded-xl shadow-lg relative">
                <div className="overflow-x-auto ">
                    <div className="bg-white w-full h-[6rem] rounded-t-md ">
                        <div className="w-full t-0 px-5 -mt-5 absolute">
                            <div className="bg-violet-400/80 w-full rounded-md shadow-md h-[6rem] flex flex-row gap-2 justify-between items-center px-5">
                                <div className="flex flex-row items-center justify-between w-full relative">
                                    <div className="flex flex-col gap-2 items-center">
                                        <h1 className="font-extrabold text-blue-900 text-lg">
                                            Daftar data
                                        </h1>
                                        <p className="font-extrabold text-white text-md">
                                            SMPN XYZ
                                        </p>
                                    </div>
                                    <select
                                        value={selectedMonth}
                                        onChange={handleMonthChange}
                                        className="px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>
                                            Pilih Bulan
                                        </option>
                                        {months.map((month) => (
                                            <option
                                                key={month.value}
                                                value={month.value}
                                            >
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr className="font-bold text-lg text-black">
                                <th>Tanggal</th>
                                <th>Absen Masuk</th>
                                <th>Absen Pulang</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {currentItems?.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        <div className="font-bold">
                                            {moment(item?.tanggal).format(
                                                "dddd, DD MMMM YYYY"
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setUrl({
                                                    url: item?.jam_masuk
                                                        ?.image_masuk,
                                                    lat: item?.jam_masuk
                                                        .latitude,
                                                    lng: item?.jam_masuk
                                                        .longtitude,
                                                });
                                                window.my_modal_1.show();
                                            }}
                                            className="font-bold p-2 rounded-md bg-pink-500/90 text-white"
                                        >
                                            {item.jam_masuk
                                                ? item.jam_masuk.jam_masuk
                                                : "-"}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setUrl({
                                                    url: item?.jam_keluar
                                                        ?.image_keluar,
                                                    lat: item?.jam_keluar
                                                        .latitude,
                                                    lng: item?.jam_keluar
                                                        .longtitude,
                                                });
                                                window.my_modal_1.show();
                                            }}
                                            className="font-bold p-2 rounded-md bg-yellow-500/90 text-white"
                                        >
                                            {item.jam_keluar
                                                ? item.jam_keluar.jam_keluar
                                                : "-"}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="font-bold">
                                            <div
                                                className={`font-bold  p-2 rounded-md   ${
                                                    item?.status_kehadiran
                                                        ? item?.status_kehadiran
                                                              ?.kehadiran ===
                                                          "Hadir"
                                                            ? "bg-green-500 text-white"
                                                            : item
                                                                  ?.status_kehadiran
                                                                  ?.kehadiran ===
                                                              "Izin"
                                                            ? "bg-yellow-500 text-white"
                                                            : item
                                                                  ?.status_kehadiran
                                                                  ?.kehadiran ===
                                                              "Sakit"
                                                            ? "bg-blue-500 text-white"
                                                            : item
                                                                  ?.status_kehadiran
                                                                  ?.kehadiran ===
                                                              "Terlambat"
                                                            ? "bg-pink-500 text-white"
                                                            : item
                                                                  ?.status_kehadiran
                                                                  ?.kehadiran ===
                                                              "Alpa"
                                                            ? "bg-red-500 text-white"
                                                            : ""
                                                        : "bg-red-500"
                                                }`}
                                            >
                                                {item?.status_kehadiran
                                                    ? item?.status_kehadiran
                                                          ?.kehadiran ===
                                                      "Hadir"
                                                        ? "Hadir"
                                                        : item?.status_kehadiran
                                                              ?.kehadiran ===
                                                          "Izin"
                                                        ? "Izin"
                                                        : item?.status_kehadiran
                                                              ?.kehadiran ===
                                                          "Sakit"
                                                        ? "Sakit"
                                                        : item?.status_kehadiran
                                                              ?.kehadiran ===
                                                          "Terlambat"
                                                        ? "Terlambat"
                                                        : item?.status_kehadiran
                                                              ?.kehadiran ===
                                                          "Alpa"
                                                        ? "Alpa"
                                                        : "Alpa"
                                                    : "Alpa"}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <div className="flex justify-normal items-center py-5">
                        <ReactPaginate
                            className="flex flex-row gap-1 w-full justify-end items-center select-none pr-10"
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="<"
                            pageClassName=" text-sm border  p-2 rounded-md "
                            pageLinkClassName=" rounded-md  px-2 py-2 font-semibold font-roboto"
                            previousClassName=" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl"
                            previousLinkClassName="text-xl p-2  font-semibold font-roboto"
                            nextClassName=" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl"
                            nextLinkClassName="text-xl p-2  font-semibold font-roboto "
                            breakLabel="..."
                            breakClassName=" p-2 rounded-md text-blue-800"
                            breakLinkClassName="text-sm font-semibold font-roboto "
                            containerClassName="pagination"
                            activeClassName="bg-transparan border border-blue-800 text-blue-800"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
