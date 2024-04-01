import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
} from "chart.js";
import { Line, PolarArea, Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    RadialLinearScale,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Charts() {
    const ganertaeNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    return (
        <div className="w-full flex flex-col gap-2 bg-white rounded-lg shadow-md mb-5 p-1">
            <div className="w-full flex flex-row justify-between ">
                <div className="w-[20%] flex-col flex items-center justify-center h-[16rem] border border-gray-500 px-3 pb-3">
                    {/* buat */}
                    <div className="w-full flex flex-col items-center justify-center gap-5">
                        <div className="w-full flex flex-row justify-between  ">
                            <div className="border border-gray-600 w-full ">
                                <h1 className="border-b border-gray-600 text-center w-full font-semibold bg-[#ff68858c] ">
                                    Jumlah peserta
                                </h1>
                                <div className=" w-full flex flex-row justify-center items-center py-5">
                                    <span className="text-3xl font-extrabold">
                                        {ganertaeNumber(50, 200)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between ">
                            <div className="border border-gray-600 w-full">
                                <h1 className="border-b border-gray-600 text-center w-full font-semibold bg-[#ff68858c] ">
                                    Jumlah peserta
                                </h1>
                                <div className=" w-full flex flex-row justify-center items-center py-5">
                                    <span className="text-3xl font-extrabold">
                                        {ganertaeNumber(50, 200)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[80%] px-3 pb-2 h-[16rem] border-t border-r border-b border-gray-500">
                    <LineChart />
                </div>
            </div>
            <div className="w-full flex flex-row justify-between">
                <div className="w-1/4 flex justify-center h-[13rem] border border-gray-500 ">
                    <PolarChart
                        label={["Prestasi", "Penghargaan", "Pelanggaran"]}
                        data={[20, 30, 10]}
                    />
                </div>
                <div className="w-1/4 flex justify-center px-3 pb-2 h-[13rem] border-t border-r border-b border-gray-500">
                    <DoughnutChart />
                </div>
                <div className="w-1/4 flex justify-center px-3 pb-2 h-[13rem] border-t border-r border-b border-gray-500">
                    <PieChart label={["Siswa", "total"]} data={[12, 100]} />
                </div>
                <div className="w-1/4 flex justify-center h-[13rem] border-t border-r border-b  border-gray-500 ">
                    <PolarChart
                        label={["Prestasi", "Penghargaan", "Pelanggaran"]}
                        data={[12, 51, 41]}
                    />
                </div>
            </div>
        </div>
    );
}

const PieChart = ({ data, label }) => {
    const dataChart = {
        labels: label,
        datasets: [
            {
                label: "Total",
                data: data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const option = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 11,
                    },
                },
            },
        },
    };

    return <Pie data={dataChart} options={option} />;
};

const LineChart = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
                mode: "nearest", // 'nearest' akan menampilkan tooltip terdekat ke titik yang dipilih
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 4, // Nilai maksimum untuk sumbu Y (sesuaikan dengan maksimum Anda)
                min: 1,
            },
        },
    };

    const labels = [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Semester",
                data: labels.map(() =>
                    (Math.random() * (4 - 2) + 2).toFixed(2)
                ),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };
    return <Line options={options} data={data} />;
};

const DoughnutChart = () => {
    const label = ["Prestasi", "Penghargaan", "Pelanggaran"];
    const data = {
        labels: label,
        datasets: [
            {
                label: "total",
                data: label.map(() => Math.floor(Math.random() * 10) + 1),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const option = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 13,
                    },
                },
            },
        },
    };

    return <Doughnut data={data} options={option} />;
};

const PolarChart = ({ data, label }) => {
    const dataChart = {
        labels: label,
        datasets: [
            {
                label: "total",
                data: data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const option = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 11,
                    },
                },
            },
        },
    };

    return <PolarArea data={dataChart} options={option} />;
};
