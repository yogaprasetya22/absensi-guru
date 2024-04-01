import Layout from "@/Layouts/Layout";
import React from "react";
import { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Absensi({ guru, jadwal_uuid }) {
    const { data, setData, post, processing, errors, reset } = useForm([]);
    const handleInputChange = (index, event, uuid, kelas) => {
        const newdata = [...data];
        newdata[index] = {
            ...newdata[index],
            uuid: guru[index].uuid,
            status: event.target.value,
            guru_uuid: uuid,
            kelas_id: kelas,
            jadwal_uuid: jadwal_uuid,
        };
        setData(newdata);
    };

    useEffect(() => {
        const sortBerdasarkan3HurufDepan = (a, b) => {
            return a.guru?.user?.name.localeCompare(b.guru.user.name);
        };
        guru.sort(sortBerdasarkan3HurufDepan);
    }, [guru]);

    useEffect(() => {
        const jika_data_guru_ada_kehadiran_id = guru.every((item) => {
            return item.kehadiran;
        });
        if (jika_data_guru_ada_kehadiran_id) {
            const data_guru = guru.map((item) => {
                return {
                    status: item.kehadiran.kehadiran.toLowerCase(),
                    guru_uuid: item.guru.uuid,
                    kelas_id: item.guru.kelas_id,
                    jadwal_uuid: item.jadwal_uuid,
                };
            });
            setData(data_guru);
        }
    }, [guru]);

    const handleSumbit = (e) => {
        e.preventDefault();
        post(route("absensi.store"), {
            onSuccess: () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            },
        });
    };

    const handleChangeHadir = () => {
        const newdata = guru.map((item) => {
            return {
                uuid: item.uuid,
                status: "hadir",
                guru_uuid: item.guru.uuid,
                kelas_id: item.guru.kelas_id,
                jadwal_uuid: jadwal_uuid,
            };
        });
        setData(newdata);
    };
    return (
        <Layout>
            {guru && (
                <div className="bg-white flex flex-col rounded-xl shadow-md relative">
                    <div className="bg-white w-full h-[6rem] rounded-t-md ">
                        <div className="w-full t-0 px-5 -mt-5 absolute">
                            <div className="bg-violet-400/80 w-full rounded-md shadow-md h-[6rem] flex flex-row gap-2 justify-between items-center px-5">
                                <div className="flex flex-row items-center justify-between w-full">
                                    <div className="flex flex-col gap-2 items-center">
                                        <h1 className="font-extrabold text-blue-900 text-lg">
                                            Daftar guru
                                        </h1>
                                        <p className="font-extrabold text-white text-md">
                                            SMPN XYZ
                                        </p>
                                    </div>
                                    {/* total guru */}
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="flex items-center gap-2 px-5 py-3">
                                            <p className="font-extrabold text-white text-md">
                                                Total guru: {guru.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full p-5  gap-2 ">
                        <form
                            onSubmit={handleSumbit}
                            className="w-full flex flex-col gap-5 p-5 rounded-md"
                        >
                            {guru.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-row gap-2 items-center justify-between border-b-2 border-gray-200 p-2"
                                    >
                                        <div className="flex flex-row gap-2 items-center">
                                            {/* foto */}
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src="https://source.unsplash.com/random"
                                                    alt=""
                                                    className="w-16 h-16 rounded-full"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h1 className="font-extrabold text-lg text-gray-900">
                                                    {item.name
                                                        ? item?.name
                                                        : item?.guru?.user.name}
                                                </h1>
                                                <p className="font-extrabold text-md text-gray-500">
                                                    {item?.guru.nuptk}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="flex flex-col gap-2">
                                                <h1 className="font-extrabold text-lg text-gray-900">
                                                    Kelas:{" "}
                                                    {item?.guru.kelas.kelas}
                                                </h1>
                                                <p className="font-extrabold text-md text-gray-500">
                                                    {item?.guru.telp}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="flex flex-col gap-2">
                                                {/* <h1 className="font-extrabold text-lg text-gray-900">
                                                {item?.guru}
                                            </h1> */}
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row gap-
                                        2 items-center"
                                        >
                                            <div className="flex flex-col gap-2">
                                                <h1 className="font-extrabold text-lg text-gray-900">
                                                    {item?.kelas}
                                                </h1>
                                                {/* <p className="font-extrabold text-md text-gray-500">
                                                {item?.jurusan}
                                            </p> */}
                                            </div>
                                        </div>
                                        {/* chackbox keterangan hadir izin sakit alpa  */}
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="flex flex-row gap-2">
                                                <label className="label cursor-pointer flex flex-col">
                                                    <span className="label-text">
                                                        hadir
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        required
                                                        name={`status-${index}`}
                                                        className="radio radio-primary"
                                                        value="hadir"
                                                        checked={
                                                            data[index]
                                                                ?.status ===
                                                            "hadir"
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                item.guru.uuid,
                                                                item.guru
                                                                    .kelas_id
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="label cursor-pointer flex flex-col">
                                                    <span className="label-text">
                                                        izin
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        required
                                                        name={`status-${index}`}
                                                        className="radio radio-primary"
                                                        value="izin"
                                                        checked={
                                                            data[index]
                                                                ?.status ===
                                                            "izin"
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                item.guru.uuid,
                                                                item.guru
                                                                    .kelas_id
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="label cursor-pointer flex flex-col">
                                                    <span className="label-text">
                                                        sakit
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        required
                                                        name={`status-${index}`}
                                                        className="radio radio-primary"
                                                        value="sakit"
                                                        checked={
                                                            data[index]
                                                                ?.status ===
                                                            "sakit"
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                item.guru.uuid,
                                                                item.guru
                                                                    .kelas_id
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="label cursor-pointer flex flex-col">
                                                    <span className="label-text">
                                                        alpa
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        required
                                                        name={`status-${index}`}
                                                        className="radio radio-primary"
                                                        value="alpa"
                                                        checked={
                                                            data[index]
                                                                ?.status ===
                                                            "alpa"
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                item.guru.uuid,
                                                                item.guru
                                                                    .kelas_id
                                                            )
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}{" "}
                            <button
                                className="btn bg-violet-600/80 text-white py-2 px-4 rounded-md"
                                type="submit"
                            >
                                Simpan
                            </button>
                        </form>
                        <div className="w-2/5 ">
                            <div className="sticky -top-5">
                                <div className=" w-full bg-violet-400/80 h-[35rem] p-5 rounded-md flex flex-col gap-5">
                                    <div className="w-full">
                                        <div className="flex flex-col gap-2 items-center">
                                            <h1 className="font-extrabold text-3xl text-white">
                                                Absensi
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row gap-2">
                                            <h1 className="font-extrabold text-xl text-white">
                                                Hadir
                                            </h1>
                                            <p className="font-extrabold text-xl text-white underline">
                                                {(() => {
                                                    const newdata = data.filter(
                                                        (item) => {
                                                            return (
                                                                item?.status ===
                                                                "hadir"
                                                            );
                                                        }
                                                    );
                                                    const kalkulasiDari100 = (
                                                        (newdata.length /
                                                            guru.length) *
                                                        100
                                                    ).toFixed(0);
                                                    return kalkulasiDari100;
                                                })()}
                                                %
                                            </p>
                                        </div>
                                        <progress
                                            className="progress progress-warning w-56"
                                            value={(() => {
                                                const newdata = data.filter(
                                                    (item) => {
                                                        return (
                                                            item?.status ===
                                                            "hadir"
                                                        );
                                                    }
                                                );
                                                const kalkulasiDari100 =
                                                    (newdata.length /
                                                        guru.length) *
                                                    100;
                                                return kalkulasiDari100;
                                            })()}
                                            max="100"
                                        ></progress>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row gap-2">
                                            <h1 className="font-extrabold text-xl text-white">
                                                Izin
                                            </h1>
                                            <p className="font-extrabold text-xl text-white underline">
                                                {(() => {
                                                    const newdata = data.filter(
                                                        (item) => {
                                                            return (
                                                                item?.status ===
                                                                "izin"
                                                            );
                                                        }
                                                    );
                                                    const kalkulasiDari100 = (
                                                        (newdata.length /
                                                            guru.length) *
                                                        100
                                                    ).toFixed(0);
                                                    return kalkulasiDari100;
                                                })()}
                                                %
                                            </p>
                                        </div>
                                        <progress
                                            className="progress progress-warning w-56"
                                            value={(() => {
                                                const newdata = data.filter(
                                                    (item) => {
                                                        return (
                                                            item?.status ===
                                                            "izin"
                                                        );
                                                    }
                                                );
                                                const kalkulasiDari100 =
                                                    (newdata.length /
                                                        guru.length) *
                                                    100;
                                                return kalkulasiDari100;
                                            })()}
                                            max="100"
                                        ></progress>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row gap-2">
                                            <h1 className="font-extrabold text-xl text-white">
                                                Sakit
                                            </h1>
                                            <p className="font-extrabold text-xl text-white underline">
                                                {(() => {
                                                    const newdata = data.filter(
                                                        (item) => {
                                                            return (
                                                                item?.status ===
                                                                "sakit"
                                                            );
                                                        }
                                                    );
                                                    const kalkulasiDari100 = (
                                                        (newdata.length /
                                                            guru.length) *
                                                        100
                                                    ).toFixed(0);
                                                    return kalkulasiDari100;
                                                })()}
                                                %
                                            </p>
                                        </div>
                                        <progress
                                            className="progress progress-warning w-56"
                                            value={(() => {
                                                const newdata = data.filter(
                                                    (item) => {
                                                        return (
                                                            item?.status ===
                                                            "sakit"
                                                        );
                                                    }
                                                );
                                                const kalkulasiDari100 =
                                                    (newdata.length /
                                                        guru.length) *
                                                    100;
                                                return kalkulasiDari100;
                                            })()}
                                            max="100"
                                        ></progress>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row gap-2">
                                            <h1 className="font-extrabold text-xl text-white">
                                                Alpa
                                            </h1>
                                            <p className="font-extrabold text-xl text-white underline">
                                                {(() => {
                                                    const newdata = data.filter(
                                                        (item) => {
                                                            return (
                                                                item?.status ===
                                                                "alpa"
                                                            );
                                                        }
                                                    );
                                                    const kalkulasiDari100 = (
                                                        (newdata.length /
                                                            guru.length) *
                                                        100
                                                    ).toFixed(0);
                                                    return kalkulasiDari100;
                                                })()}
                                                %
                                            </p>
                                        </div>
                                        <progress
                                            className="progress progress-warning w-56"
                                            value={(() => {
                                                const newdata = data.filter(
                                                    (item) => {
                                                        return (
                                                            item?.status ===
                                                            "alpa"
                                                        );
                                                    }
                                                );
                                                const kalkulasiDari100 =
                                                    (newdata.length /
                                                        guru.length) *
                                                    100;
                                                return kalkulasiDari100;
                                            })()}
                                            max="100"
                                        ></progress>
                                    </div>
                                    {/* button hadir */}
                                    <div className="flex flex-row gap-2 justify-center items-center">
                                        <button
                                            className="btn bg-white text-violet-600/80 py-2 px-4 rounded-md"
                                            onClick={handleChangeHadir}
                                        >
                                            Semua Hadir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Aside /> */}
                </div>
            )}
        </Layout>
    );
}
