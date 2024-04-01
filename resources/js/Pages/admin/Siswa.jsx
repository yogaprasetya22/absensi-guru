import Layout from "@/Layouts/Layout";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Siswa({ siswa: data_siswa, jurusan }) {
    const [siswa, setSiswa] = useState(data_siswa);
    const [filterData, setFilterData] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);

    const [kelasFilter, setKelasFilter] = useState(null);
    const [jurusanFilter, setJurusanFilter] = useState(null);

    jurusan = jurusan.map((item) => {
        return {
            ...item,
            jurusan: item.jurusan
                .split(" ")
                .map((item) => item[0])
                .join(""),
        };
    });

    const handleFilterChange = ({ kelas, jurusan }) => {
        // Simpan nilai filter ke dalam state terpisah
        if (kelas !== undefined) {
            setKelasFilter(kelas);
        }
        if (jurusan !== undefined) {
            setJurusanFilter(jurusan);
        }

        // Lakukan filtering data berdasarkan kelas dan jurusan yang tersimpan
        const data = data_siswa.filter((item) => {
            // Lakukan filtering berdasarkan kelas
            const kelasMatch =
                kelasFilter === null || item.siswa.kelas.kelas === kelasFilter;
            // Lakukan filtering berdasarkan jurusan
            const jurusanMatch =
                jurusanFilter === null ||
                item.siswa.kelas.jurusan.id === jurusanFilter;

            return kelasMatch && jurusanMatch;
        });

        // Simpan hasil filtering ke dalam state
        setSiswa(data);
    };

    useEffect(() => {
        setLoading(true);

        const endOffset = parseInt(itemOffset) + parseInt(page);
        const sortData = siswa
            .sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(siswa.length / page));
        setLoading(false);
    }, [itemOffset, siswa, page]);

    const handlePageClick = (event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % siswa.length;

        setItemOffset(newOffset);
    };
    return (
        <Layout>
            <div className="bg-white flex flex-col gap-10 rounded-xl shadow-lg relative">
                <div className="overflow-x-auto ">
                    <div className="bg-white w-full h-[6rem] rounded-t-md ">
                        <div className="w-full t-0 px-5 -mt-5 absolute">
                            <div className="bg-violet-400/80 w-full rounded-md shadow-md h-[6rem] flex flex-row gap-2 justify-between items-center px-5">
                                <div className="flex flex-row items-center justify-between w-full relative">
                                    <div className="w-full p-2 flex justify-end absolute -bottom-[3.2rem] -right-[11.2rem] ">
                                        <p className="text-md font-extrabold border-b-2 border-violet-400">
                                            data siswa :{" "}
                                            <span className="text-violet-400 ">
                                                {siswa?.length}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center">
                                        <h1 className="font-extrabold text-blue-900 text-lg">
                                            Daftar Siswa
                                        </h1>
                                        <p className="font-extrabold text-white text-md">
                                            SMPN XYZ
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <span className="font-bold text-lg text-white">
                                            Kelas :
                                        </span>
                                        <div className="flex flex-wrap gap-2 flex-row">
                                            <button
                                                className=" bg-gray-200/60 text-gray-500 font-semibold hover:bg-gray-200 rounded-md px-2 py-1"
                                                onClick={() =>
                                                    handleFilterChange({
                                                        kelas: null,
                                                    })
                                                }
                                            >
                                                semua
                                            </button>
                                            <button
                                                className=" bg-gray-200/60 text-gray-500 font-semibold hover:bg-gray-200 rounded-md px-2 py-1"
                                                onClick={() =>
                                                    handleFilterChange({
                                                        kelas: "X",
                                                    })
                                                }
                                            >
                                                X
                                            </button>
                                            <button
                                                className=" bg-gray-200/60 text-gray-500 font-semibold hover:bg-gray-200 rounded-md px-2 py-1"
                                                onClick={() =>
                                                    handleFilterChange({
                                                        kelas: "XI",
                                                    })
                                                }
                                            >
                                                XI
                                            </button>
                                            <button
                                                className=" bg-gray-200/60 text-gray-500 font-semibold hover:bg-gray-200 rounded-md px-2 py-1"
                                                onClick={() =>
                                                    handleFilterChange({
                                                        kelas: "XII",
                                                    })
                                                }
                                            >
                                                XII
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <span className="font-bold text-lg text-white">
                                            Jurusan :
                                        </span>
                                        <div className="flex flex-wrap gap-2 flex-row max-w-xs">
                                            <button
                                                className=" bg-gray-200/60 text-gray-500 font-semibold hover:bg-gray-200 rounded-md px-2 py-1 truncate w-[5rem]"
                                                onClick={() =>
                                                    handleFilterChange({
                                                        jurusan: null,
                                                    })
                                                }
                                            >
                                                semua
                                            </button>
                                            {jurusan.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className=" bg-gray-200/60 text-gray-500 font-semibold hover:bg-gray-200 rounded-md px-2 py-1 truncate w-[5rem]"
                                                    onClick={() =>
                                                        handleFilterChange({
                                                            jurusan: item.id,
                                                        })
                                                    }
                                                >
                                                    {item.jurusan}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    {/* add member */}
                                    <div className="flex items-center gap-2 px-5 py-3">
                                        <button className="btn bg-gray-200/60 text-gray-500 rounded-md">
                                            <i className="fas fa-plus"></i> Add
                                            Siswa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="font-bold text-lg text-black">
                                <th>Nisn</th>
                                <th>Name</th>
                                <th>Jenis Kelamin</th>
                                <th>Kelas</th>
                                <th>Jusuran</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {currentItems.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <th>{item?.siswa.nisn}</th>
                                    <td>
                                        <div className="font-bold">
                                            {item?.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">
                                            {item?.siswa.jk === "L"
                                                ? "Laki-laki"
                                                : "Perempuan"}
                                        </div>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item?.siswa?.kelas.kelas}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item?.siswa?.kelas.jurusan.jurusan}
                                        </p>
                                    </td>
                                    <th className="flex gap-2">
                                        <button className="btn btn-ghost btn-md ">
                                            <i className="text-green-500 text-xl fas fa-edit"></i>
                                        </button>
                                        <button className="btn btn-ghost btn-md ">
                                            <i className="text-red-500 text-xl fas fa-trash-alt"></i>
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
