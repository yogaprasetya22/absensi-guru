import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Tabel({ dataUser: dataTabel }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);

    useEffect(() => {
        setLoading(true);
        // Fetch items from another resources.
        // const endOffset = Math.min(itemOffset + page, dataTabel.length);

        const endOffset = parseInt(itemOffset) + parseInt(page);
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const sortData = dataTabel
            .sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(dataTabel.length / page));
        setLoading(false);
    }, [itemOffset, dataTabel, page]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        window.scrollTo({
            top: 60,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % dataTabel.length;

        setItemOffset(newOffset);
    };
    return (
        <div className="bg-white flex flex-col gap-10 rounded-xl my-10">
            <div className="overflow-x-auto">
                <div className="flex justify-between">
                    {" "}
                    <div className="flex  px-5 py-3 gap-10">
                        {/* count page */}
                        <div className="flex flex-row items-center justify-center gap-2">
                            <span className="font-bold ">show :</span>
                            <select
                                className="select "
                                value={page}
                                onChange={(e) => setPage(e.target.value)}
                            >
                                {new Array(5).fill(0).map((item, index) => (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>{" "}
                            <span className="font-bold ">entries</span>
                        </div>
                        {/* search */}
                        <div className="flex flex-row items-center justify-center gap-2">
                            <input
                                type="text"
                                className="input input-bordered"
                                placeholder="Search"
                            />
                            <button className="btn">
                                <i className="fas fa-search"></i>{" "}
                            </button>
                        </div>
                    </div>
                    {/* add member */}
                    <div className="flex items-center gap-2 px-5 py-3">
                        <button className="btn bg-green-400">
                            <i className="fas fa-plus"></i> Add Member
                        </button>
                    </div>
                </div>{" "}
                {/* buatkan pesan penambahan data */}
                <div className="flex flex-row gap-2 items-center justify-center px-5 py-3">
                    <span className="font-bold text-lg">
                        {dataTabel?.length} data
                    </span>
                    <span className="font-bold text-lg">|</span>
                    <span className="font-bold text-lg">
                        {currentItems?.length} data belum terdaftar
                    </span>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="font-bold text-lg text-black">
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <th>{item?.id}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={
                                                        item?.image
                                                            ? item?.image
                                                            : "https://picsum.photos/200"
                                                    }
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {item?.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="font-bold">{item?.email}</p>
                                </td>
                                <td>
                                    <p className="font-bold">
                                        {item?.role?.name_role}
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
                        ))}
                    </tbody>{" "}
                </table>
                <div className="flex justify-normal items-center py-5">
                    <ReactPaginate
                        className="flex flex-row gap-1 w-full justify-center items-center select-none"
                        nextLabel="next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="prev"
                        pageClassName=" text-xl  p-2 rounded-md "
                        pageLinkClassName=" rounded-md text-black  px-4 py-2 font-semibold font-roboto"
                        previousClassName=" p-2 rounded-md text-gray-400 hover:text-black"
                        previousLinkClassName="text-xl p-2  font-semibold font-roboto"
                        nextClassName=" p-2 rounded-md text-gray-400 hover:text-black"
                        nextLinkClassName="text-xl p-2  font-semibold font-roboto "
                        breakLabel="..."
                        breakClassName=" p-2 rounded-md text-black"
                        breakLinkClassName="text-xl font-semibold font-roboto "
                        containerClassName="pagination"
                        activeClassName="bg-green-400 text-white"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    );
}
