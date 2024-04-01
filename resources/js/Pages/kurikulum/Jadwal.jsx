import Add from "@/Components/modal/Jadwal/Add";
import Layout from "@/Layouts/Layout";
import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";

export default function Jadwal({ jadwal }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);

    useEffect(() => {
        setLoading(true);

        const endOffset = parseInt(itemOffset) + parseInt(page);
        const sortData = jadwal
            ?.sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(jadwal?.length / page));
        setLoading(false);
    }, [itemOffset, jadwal, page]);

    const handlePageClick = (event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % jadwal?.length;

        setItemOffset(newOffset);
    };
    return (
        <Layout>
            <Add />
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
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    {/* add member */}
                                    <div className="flex items-center gap-2 px-5 py-3">
                                        <button
                                            className="btn bg-gray-200/60 text-gray-500 rounded-md"
                                            onClick={() =>
                                                window.my_modal_1.show()
                                            }
                                        >
                                            <i className="fas fa-plus"></i> Add
                                            Jadwal
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
                                <th>Kelas</th>
                                <th>Tanggal</th>
                                <th>PIC</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {currentItems?.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        <div className="font-bold">
                                            {item?.kelas.kelas}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">
                                            {moment(item?.tanggal)
                                                .locale("id")
                                                .format("dddd, DD MMMM YYYY")}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">
                                            {item?.kurikulum.user.name}
                                        </div>
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
