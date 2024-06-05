import Layout from "@/Layouts/Layout";
import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
import { Link, router } from "@inertiajs/react";
import CetakLaporan from "@/Components/modal/CetakLaporan";

export default function Index({
    data: data_user,
    presensiData: data_presensi,
    nama_guru,
    auth,
    tahun,
    semester,
    uuid_guru,
}) {
    const [years, setYears] = useState(0);
    const [semester_, setSemester] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);

    console.log(data_presensi);

    const months = [
        { value: "gasal", label: "Semester Gasal 1/6" },
        { value: "genap", label: "Semester Genap 7/12" },
    ];

    useEffect(() => {
        setLoading(true);

        const endOffset = parseInt(itemOffset) + parseInt(page);
        const sortData = data_user
            ?.sort((a, b) => {
                return new Date(b.guru.nuptk) - new Date(a.guru.nuptk);
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(data_user?.length / page));
        setLoading(false);
    }, [itemOffset, data_user, page]);

    const handlePageClick = (event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % data_user?.length;

        setItemOffset(newOffset);
    };

    return (
        <Layout>
            <div className="flex flex-col gap-2 pb-5">
                <div className="w-full flex  justify-between">
                    {/* select semester dan tahun */}
                    <select
                        onChange={(e) => {
                            router.visit(
                                `/kurikulum?semester=${e.target.value}&tahun=${
                                    tahun || auth.tahun
                                }&uuid=${
                                    uuid_guru
                                        ? uuid_guru
                                        : auth.user_guru[0].guru.uuid
                                }`
                            );
                            setSemester(e.target.value);
                        }}
                        value={semester_ || semester}
                        className="px-2 py-1 text-xs w-[10rem] rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Pilih Semester
                        </option>
                        {months.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => {
                            setYears(e.target.value);
                            router.visit(
                                `/kurikulum?semester=${
                                    semester || auth.semester
                                }&tahun=${e.target.value}&uuid=${
                                    uuid_guru
                                        ? uuid_guru
                                        : auth.user_guru[0].guru.uuid
                                }`
                            );
                        }}
                        value={years || tahun}
                        className="px-2 py-1 text-xs w-[5rem] rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {(() => {
                            // tahun sekarang - 5
                            const year = new Date().getFullYear();
                            let years = [];
                            for (let i = year - 4; i <= year; i++) {
                                years.push(i);
                            }
                            return years.reverse();
                        })().map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full flex justify-between gap-2">
                    <div className="w-full shadow-md flex flex-col gap-3 bg-white border-green-400 border-l-4 rounded-md p-5">
                        {/* hadir */}
                        <h1 className="text-md font-bold text-green-400">
                            Hadir
                        </h1>
                        <p className="text-center font-extrabold text-blue-900 text-xl">
                            {
                                data_presensi.filter(
                                    (data) =>
                                        data?.data_presensi.status_kehadiran
                                            ?.kehadiran === "Hadir"
                                ).length
                            }
                        </p>
                        <p className="text-center font-semibold text-black text-xs">
                            {nama_guru}
                        </p>
                    </div>
                    <div className="w-full shadow-md flex flex-col gap-3 bg-white border-yellow-400 border-l-4 rounded-md p-5">
                        {/* izin */}
                        <h1 className="text-md font-bold text-yellow-400">
                            Izin
                        </h1>
                        <p className="text-center font-extrabold text-blue-900 text-xl">
                            {
                                data_presensi.filter(
                                    (data) =>
                                        data?.data_presensi.status_kehadiran
                                            ?.kehadiran === "Izin"
                                ).length
                            }
                        </p>
                        <p className="text-center font-semibold text-black text-xs">
                            {nama_guru}
                        </p>
                    </div>
                    <div className="w-full shadow-md flex flex-col gap-3 bg-white border-blue-400 border-l-4 rounded-md p-5">
                        {/* sakit */}
                        <h1 className="text-md font-bold text-blue-400">
                            Sakit
                        </h1>
                        <p className="text-center font-extrabold text-blue-900 text-xl">
                            {
                                data_presensi.filter(
                                    (data) =>
                                        data?.data_presensi.status_kehadiran
                                            ?.kehadiran === "Sakit"
                                ).length
                            }
                        </p>
                        <p className="text-center font-semibold text-black text-xs">
                            {nama_guru}
                        </p>
                    </div>
                    <div className="w-full shadow-md flex flex-col gap-3 bg-white border-pink-400 border-l-4 rounded-md p-5">
                        {/* Tterlambat */}
                        <h1 className="text-md font-bold text-pink-400">
                            Terlambat
                        </h1>
                        <p className="text-center font-extrabold text-blue-900 text-xl">
                            {
                                data_presensi.filter(
                                    (data) =>
                                        data?.data_presensi.status_kehadiran
                                            ?.kehadiran === "Terlambat"
                                ).length
                            }
                        </p>
                        <p className="text-center font-semibold text-black text-xs">
                            {nama_guru}
                        </p>
                    </div>
                    <div className="w-full shadow-md flex flex-col gap-3 bg-white border-red-400 border-l-4 rounded-md p-5">
                        {/* alpa */}
                        <h1 className="text-md font-bold text-red-400">Alpa</h1>
                        <p className="text-center font-extrabold text-blue-900 text-xl">
                            {
                                data_presensi.filter(
                                    (data) =>
                                        data?.data_presensi.status_kehadiran
                                            ?.kehadiran === "Alpa"
                                ).length
                            }
                        </p>
                        <p className="text-center font-semibold text-black text-xs">
                            {nama_guru}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white flex flex-col gap-10 rounded-xl shadow-lg relative">
                <div className="overflow-x-auto ">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="font-bold text-md text-black">
                                <th>NUPTK</th>
                                <th>Nama</th>
                                <th>No Telp</th>
                                <th>Alamat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {currentItems?.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        <div className="text-xs font-light">
                                            {item?.guru.nuptk}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-xs font-light">
                                            {item?.guru.user.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-xs font-light">
                                            {item?.guru.telp}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-xs font-light max-w-[15rem] truncate">
                                            {item?.guru.alamat}
                                        </div>
                                    </td>
                                    <th className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                router.visit(
                                                    `/kurikulum?semester=${auth.semester}&tahun=${tahun}&uuid=${item?.guru.uuid}`
                                                );
                                            }}
                                        >
                                            <i className="text-blue-500 text-xs fas fa-eye"></i>
                                        </button>
                                    </th>
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
