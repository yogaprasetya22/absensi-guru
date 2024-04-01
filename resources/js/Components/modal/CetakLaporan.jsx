import React, { useEffect, useState } from "react";

export default function CetakLaporan({ data_modal: data_presensi }) {
    const [selectSemester, setSelectSemester] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [years, setYears] = useState([]);

    useEffect(() => {
        // Set years from 5 years ago to current year
        const currentYear = new Date().getFullYear();
        const yearsArray = [];
        for (let i = currentYear; i > currentYear - 5; i--) {
            yearsArray.push(i.toString());
        }
        setYears(yearsArray);

        // Set selected year to current year
        setSelectedYear(currentYear.toString());
    }, []);

    const months = [
        { value: "gasal", label: "Semester Gasal 1/6" },
        { value: "genap", label: "Semester Genap 7/12" },
    ];

    // Handler untuk mengubah nilai bulan yang dipilih
    const handleMonthChange = (e) => {
        setSelectSemester(e.target.value);
    };

    // Handler untuk mengubah nilai tahun yang dipilih
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    return (
        <dialog id="my_modal_1" className="modal backdrop-blur-sm">
            <div className="modal-box w-full max-w-1xl overflow">
                <div className=" absolute top-0 right-0">
                    <button
                        onClick={() => window.my_modal_1.close()}
                        className="btn-close text-2xl btn bg-transparent border-none"
                        aria-label="close modal"
                    >
                        X
                    </button>
                </div>
                <div className=" w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-500">
                            Cetak Laporan
                        </h1>
                    </div>
                    <div className="flex flex-row gap-5">
                        <select
                            value={selectSemester}
                            onChange={handleMonthChange}
                            required
                            className="px-3 py-2 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>
                                Pilih Semester
                            </option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            required
                            className="px-3 py-2  w-full rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>
                                Pilih Tahun
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="btn bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!selectSemester || !selectedYear}
                        onClick={() => {
                            window.open(
                                `${window.location.origin}/kurikulum/laporan-absensi/cetak-laporan?semester=${selectSemester}&tahun=${selectedYear}&uuid=${data_presensi.guru.uuid}`,
                                "_blank"
                            );
                        }}
                    >
                        Cetak Laporan
                    </button>
                </div>
            </div>
        </dialog>
    );
}
