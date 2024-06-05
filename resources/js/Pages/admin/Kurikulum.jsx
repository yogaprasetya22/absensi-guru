import Add from "@/Components/modal/kurikulum/Add";
import Delete from "@/Components/modal/kurikulum/Delete";
import Edit from "@/Components/modal/kurikulum/Edit";
import Layout from "@/Layouts/Layout";
import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Kurikulum({ kurikulum }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);

    const [dataModal, setDataModal] = useState([]);

    useEffect(() => {
        setLoading(true);

        const endOffset = parseInt(itemOffset) + parseInt(page);
        const sortData = kurikulum
            .sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(kurikulum.length / page));
        setLoading(false);
    }, [itemOffset, kurikulum, page]);

    const handlePageClick = (event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % kurikulum.length;

        setItemOffset(newOffset);
    };
    return (
        <Layout>
            <Add title={"Tambah Guru"} />
            <Edit title={"Edit Guru"} value={dataModal} />
            <Delete title={"Hapus Guru"} value={dataModal} />
            <div className="bg-white flex flex-col gap-10 rounded-xl shadow-lg relative">
                <div className="overflow-x-auto ">
                    <div className="bg-white w-full h-[6rem] rounded-t-md ">
                        <div className="w-full t-0 px-5 -mt-5 absolute">
                            <div className="bg-violet-400/80 w-full rounded-md shadow-md h-[6rem] flex flex-row gap-2 justify-between items-center px-5">
                                <div className="flex flex-row items-center justify-between w-full relative">
                                    <div className="w-full p-2 flex justify-end absolute -bottom-[1rem] ">
                                        <p className="text-md font-extrabold border-b-2 border-gray-500">
                                            data kurikulum :{" "}
                                            <span className="text-gray-500 ">
                                                {kurikulum?.length}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center">
                                        <h1 className="font-extrabold text-blue-900 text-lg">
                                            Daftar kurikulum
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
                                            kurikulum
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
                                <th>Name</th>
                                <th>Jenis Kelamin</th>
                                <th>No Hp</th>
                                <th>Alamat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {currentItems.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        <div className="font-bold">
                                            {item?.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">
                                            {item?.kurikulum.jk === "L"
                                                ? "Laki-laki"
                                                : "Perempuan"}
                                        </div>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item?.kurikulum?.telp}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item?.kurikulum?.alamat}
                                        </p>
                                    </td>
                                    <th className="flex gap-2">
                                        <button
                                            className="btn btn-ghost btn-md "
                                            onClick={() => {
                                                setDataModal(item),
                                                    window.my_modal_2.show();
                                            }}
                                        >
                                            <i className="text-green-500 text-xl fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-md "
                                            onClick={() => {
                                                setDataModal(item),
                                                    window.my_modal_3.show();
                                            }}
                                        >
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
