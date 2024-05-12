
export const validateRole = (role) => {
    switch (role) {
        case 1:
            return "admin";
        case 2:
            return "kurikulum";
        case 3:
            return "guru";
    }
};

export const validateHeader = (role) => {
    switch (role) {
        case 1:
            return "admin";
        case 2:
            return "kurikulum";
        case 3:
            return "guru";
    }
};

export const SchoolArea = {
    // Area sekolah dengan koordinat yang telah ditentukan
    latitude: -6.3159484,
    longitude: 106.6985583,
    radius: 0.01, // Sekala kecil untuk contoh, dapat disesuaikan dengan kebutuhan
};


