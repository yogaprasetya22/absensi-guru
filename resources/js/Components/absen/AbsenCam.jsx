import { useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import styled from "styled-components";

export default function AbsenCam({ coords }) {
    const camera = useRef(null);
    const [image, setImage] = useState(null);

    const { props } = usePage();
    const { data, setData, post, processing, errors, reset } = useForm({
        id: props.auth?.user?.id,
        status: (() => {
            if (!props.data_presensi) {
                let status = "Hadir";
                const date = new Date();
                const jam = date.getHours();
                const menit = date.getMinutes();
                if (jam > 7 || (jam === 7 && menit > 0)) {
                    status = "Terlambat";
                } else if (jam < 6) {
                    status = "Terlambat";
                }
                return status;
            } else {
                let status = "Hadir";
                const date = new Date();
                const jam = date.getHours();
                const menit = date.getMinutes();
                if (jam > 14 || (jam === 14 && menit > 0)) {
                    status = "Izin";
                }
                return status;
            }
        })(),
        location: null,
        image: null,
    });

    useEffect(() => {
        if (coords) {
            setData("location", [coords.latitude, coords.longitude]);
        }
    }, [coords]);

    useEffect(() => {
        if (image) {
            setData("image", image);
        }
    }, [image]);

    const handleSumbit = (e) => {
        e.preventDefault();
        if (!props.data_presensi) {
            post(route("absensi.jam_masuk"));
        } else if (
            props.data_presensi &&
            props.data_presensi.jam_masuk &&
            !props.data_presensi.jam_keluar
        ) {
            post(route("absensi.jam_keluar"));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {!image && (
                <div className="flex flex-col md:gap-10 md:h-screen w-full justify-center items-center">
                    <div className="md:w-[50%] w-full">
                        <Camera
                            ref={camera}
                            aspectRatio={window.innerWidth > 768 ? 1.33 : 1.77}
                        />
                    </div>
                    <button
                        className="btn"
                        onClick={() => setImage(camera.current.takePhoto())}
                    >
                        Take photo
                    </button>
                </div>
            )}
            <div className="flex flex-col items-center justify-center w-full">
                {image && (
                    <div className="flex flex-col gap-2 items-center justify-center w-full">
                        <img
                            src={image}
                            alt="photo"
                            className="md:w-[50%] w-full"
                        />
                        <div className="flex flex-row gap-2 items-center justify-center w-full">
                            <button
                                className="btn"
                                onClick={() => {
                                    setImage(null);
                                    reset();
                                }}
                            >
                                Retake
                            </button>
                            <button
                                onClick={handleSumbit}
                                className="btn bg-green-400"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
