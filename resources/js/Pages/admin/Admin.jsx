import Layout from "@/Layouts/Layout";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Admin({ auth }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const img = new Image();
    img.src = "https://source.unsplash.com/1600x900/?nature,water";

    useEffect(() => {
        img.onload = () => {
            setIsImageLoaded(true);
        };
    }, []);
    return (
        <Layout>
            <div
                className={`hero min-h-[60vh] ${
                    isImageLoaded ? "" : "blur-sm brightness-50"
                }`}
                style={{
                    backgroundImage: `url('${img.src}')`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            Hello {auth.user.name}!
                        </h1>
                        <p className="mb-5">
                            Selamat datang di halaman admin. Anda dapat
                            mengelola data guru, dan kurikulum.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
