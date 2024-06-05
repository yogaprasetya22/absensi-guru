import InputError from "@/Components/ui/InputError";
import InputLabel from "@/Components/ui/InputLabel";
import TextInput from "@/Components/ui/TextInput";
import React from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function Add({ title }) {
    const { props } = usePage();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        jk: "L",
        alamat: "",
        no_hp: "",
    });

    const handleAddUser = (e) => {
        e.preventDefault();
        post(route("kurikulum.store"), {
            onStart: () => {
                // validasi password dan password_confirmation
                if (data.password !== data.password_confirmation) {
                    errors.password =
                        "Password dan Password Confirmation tidak sama";
                    errors.password_confirmation =
                        "Password dan Password Confirmation tidak sama";
                }
            },
            onSuccess: () => window.my_modal_1.close(),
            onError: (e) => {
                console.log(e);
            },
        });
    };
    return (
        <dialog
            id="my_modal_1"
            className="modal backdrop-blur-sm backdrop-brightness-75"
        >
            <div className="modal-box w-full max-w-3xl overflow">
                <div className=" w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row justify-between items-center  z-10">
                        <h1 className="text-2xl font-bold text-gray-500">
                            {title}
                        </h1>
                        <button
                            onClick={() => {
                                window.my_modal_1.close();
                            }}
                            className="text-2xl hover:text-gray-400 select-none"
                            aria-label="close modal"
                        >
                            <i className="fas fa-times text-sm"></i>
                        </button>
                    </div>
                    <div className=" w-full flex flex-col gap-5">
                        <form
                            className="flex flex-col gap-5"
                            onSubmit={handleAddUser}
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel
                                            htmlFor="nama"
                                            value="Nama"
                                        />
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="nama"
                                            value={data.nama}
                                            className="mt-1 block w-full"
                                            autoComplete="nama"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("nama", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.nama}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="email"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="password"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Password Confirmation"
                                        />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="password_confirmation"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel
                                            htmlFor="jk"
                                            value="Jenis Kelamin"
                                        />
                                        <select
                                            id="jk"
                                            name="jk"
                                            value={data.jk}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("jk", e.target.value)
                                            }
                                        >
                                            <option value="L">Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>

                                        <InputError
                                            message={errors.jk}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel
                                            htmlFor="alamat"
                                            value="Alamat"
                                        />
                                        <TextInput
                                            id="alamat"
                                            type="text"
                                            name="alamat"
                                            value={data.alamat}
                                            className="mt-1 block w-full"
                                            autoComplete="alamat"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "alamat",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.alamat}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <InputLabel htmlFor="no_hp" value="No HP" />
                                    <TextInput
                                        id="no_hp"
                                        type="number"
                                        name="no_hp"
                                        value={data.no_hp}
                                        className="mt-1 block w-full"
                                        autoComplete="no_hp"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("no_hp", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.no_hp}
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
            </div>
        </dialog>
    );
}
