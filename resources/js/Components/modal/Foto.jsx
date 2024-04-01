import React from "react";

export default function Foto({ url }) {
    return (
        <dialog id="my_modal_1" className="modal backdrop-blur-sm">
            <div className="modal-box w-auto overflow">
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
                    <img
                        src={`${window.location.origin}/${url.url}`}
                        alt={url.url}
                        className="w-full bg-cover bg-center bg-no-repeat rounded-[10px] shadow-md"
                    />
                </div>
            </div>
        </dialog>
    );
}
