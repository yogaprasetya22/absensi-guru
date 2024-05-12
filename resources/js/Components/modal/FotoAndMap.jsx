import React from "react";
import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    Circle,
} from "@react-google-maps/api";
import { SchoolArea } from "@/Components/Example";

export default function FotoAndMap({ url }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyDv_kV6yvYGZe743gH0W9-QQtStuS2kDaA",
    });
    return (
        <dialog id="my_modal_1" className="modal backdrop-blur-sm">
            <div className="modal-box w-full max-w-5xl  overflow">
                <div className=" absolute top-0 right-0 z-50 bg-gray-700/80 rounded-full">
                    <button
                        onClick={() => window.my_modal_1.close()}
                        className="btn-close text-2xl btn bg-transparent border-none  text-white"
                        aria-label="close modal"
                    >
                        X
                    </button>
                </div>
                <div className=" w-full flex flex-col gap-5">
                    <div className="flex w-full justify-between gap-2">
                        <img
                            src={`${window.location.origin}/${url.url}`}
                            alt={url.url}
                            className="w-[50%] bg-cover bg-center bg-no-repeat rounded-[10px] shadow-md"
                        />
                        {isLoaded && url && (
                            <GoogleMap
                                mapContainerStyle={{
                                    width: "100%",
                                    borderRadius: "10px",
                                    border: "1px solid #000000",
                                    boxShadow:
                                        "0px 4px 4px rgba(0, 0, 0, 0.15)",
                                }}
                                center={{
                                    lat: parseFloat(url.lat),
                                    lng: parseFloat(url.lng),
                                }}
                                zoom={18}
                            >
                                <MarkerF
                                    position={{
                                        lat: parseFloat(url.lat),
                                        lng: parseFloat(url.lng),
                                    }}
                                />
                                <Circle
                                    center={{
                                        lat: SchoolArea.latitude,
                                        lng: SchoolArea.longitude,
                                    }}
                                    radius={SchoolArea.radius + 2 * 20}
                                />
                            </GoogleMap>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
}
