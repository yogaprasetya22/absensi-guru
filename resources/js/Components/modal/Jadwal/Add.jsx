import InputError from "@/Components/ui/InputError";
import InputLabel from "@/Components/ui/InputLabel";
import TextInput from "@/Components/ui/TextInput";
import React from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function Add() {
    const { props } = usePage();
    const { data, setData, post, processing, errors, reset } = useForm({
        kurikulum_uuid: props.uuid.uuid,
        kelas_id: "",
        tanggal: "",
    });
    const handleAddJadwal = (e) => {
        e.preventDefault();
        post(route("jadwal.store"), {
            onSuccess: () => window.my_modal_1.close(),
            onError: (e) => {
                console.log(e);
            },
        });
    };
    return (
        <dialog id="my_modal_1" className="modal backdrop-blur-sm">
            <div className="modal-box w-11/12 max-w-5xl overflow">
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
                            Add Jadwal
                        </h1>
                    </div>
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleAddJadwal}
                    >
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2 w-full">
                                <InputLabel htmlFor="tanggal" value="Tanggal" />
                                <TextInput
                                    id="tanggal"
                                    type="date"
                                    name="tanggal"
                                    value={data.tanggal}
                                    className="mt-1 block w-full"
                                    autoComplete="tanggal"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("tanggal", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.tanggal}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <InputLabel
                                    htmlFor="kelas_id"
                                    value="kelas_id"
                                />
                                <select
                                    id="kelas_id"
                                    name="kelas_id"
                                    value={data.kelas_id}
                                    onChange={(e) =>
                                        setData("kelas_id", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                >
                                    <option value="" disabled>Pilih Kelas</option>
                                    {props.kelas.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.kelas}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.kelas_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn bg-violet-600/80 text-white"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
