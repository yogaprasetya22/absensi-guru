import { validateRole } from "@/Components/Example";

export const MenuDashboardValidate = (user) => {
    const MenuAdminDashboard = [
        {
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-th-large",
        },
        {
            name: "Guru",
            url: `/${validateRole(user?.role_id)}/guru`,
            icon: "fas fa-chalkboard-teacher",
        },
        {
            name: "Siswa",
            url: `/${validateRole(user?.role_id)}/siswa`,
            icon: "fas fa-user-graduate",
        },
    ];

    const MenuKurikulumDashboard = [
        {
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-th-large",
        },
        {
            name: "Absensi Guru",
            url: `/${validateRole(user?.role_id)}/absensi-guru`,
            icon: "fas fa-user-check",
        },
        {
            name: "Laporan Absensi",
            url: `/${validateRole(user?.role_id)}/laporan-absensi`,
            icon: "fas fa-sticky-note",
        },
    ];

    const MenuGuruDashboard = [
        {
            name: "Dashboard",
            url: "/",
            icon: "fas fa-th-large",
        },
        {
            name: "Absensi",
            url: `/absensi`,
            icon: "fas fa-user-check",
        },
        {
            name: "History Absensi",
            url: `/history-absensi`,
            icon: "fas fa-history",
        },
    ];

    switch (user?.role_id) {
        case 1:
            return MenuAdminDashboard;
        case 2:
            return MenuKurikulumDashboard;
        case 3:
            return MenuGuruDashboard;
    }
};
