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
