import React from "react";

import { GoogleMap, MarkerF, Circle, Polyline } from "@react-google-maps/api";

export default function GoogleMapOutside({ coords, SchoolArea }) {
    return (
        <GoogleMap
            mapContainerStyle={{
                width: "100%",
                height: "80vh",
            }}
            center={{
                lat: coords.latitude,
                lng: coords.longitude,
            }}
            //    zoom berdasarkan jarak antara user dengan sekolah
            zoom={20 - Math.log2(SchoolArea.radius + 2 * 40)}
        >
            <MarkerF
                position={{
                    lat: coords.latitude,
                    lng: coords.longitude,
                }}
            />
            <Circle
                center={{
                    lat: SchoolArea.latitude,
                    lng: SchoolArea.longitude,
                }}
                radius={SchoolArea.radius + 2 * 20}
                options={{
                    strokeColor: "#0c0c0c", // Warna garis
                    strokeOpacity: 1, // Opasitas garis (0-1)
                    strokeWeight: 2, // Ketebalan garis
                    strokeBackgroundColor: "#0c0c0c",
                }}
            />
            <Polyline
                path={[
                    {
                        lat: coords.latitude,
                        lng: coords.longitude,
                    },
                    {
                        lat: SchoolArea.latitude,
                        lng: SchoolArea.longitude,
                    },
                ]}
                options={{
                    strokeColor: "#0c0c0c", // Warna garis
                    strokeOpacity: 1, // Opasitas garis (0-1)
                    strokeWeight: 2, // Ketebalan garis
                }}
            />
        </GoogleMap>
    );
}

// {
//     isLoaded && (
//         <GoogleMap
//             mapContainerStyle={{
//                 width: "100%",
//                 height: "80vh",
//             }}
//             center={{
//                 lat: coords.latitude,
//                 lng: coords.longitude,
//             }}
//             zoom={20}
//         >
//             <MarkerF
//                 position={{
//                     lat: coords.latitude,
//                     lng: coords.longitude,
//                 }}
//             />
//             <Circle
//                 center={{
//                     lat: SchoolArea.latitude,
//                     lng: SchoolArea.longitude,
//                 }}
//                 radius={SchoolArea.radius + 2 * 7}
//             />
//         </GoogleMap>
//     );
// }
