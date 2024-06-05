import { validateRole } from "@/Components/Example";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export const MenuDashboardValidate = (user) => {
    const { semester, tahun, user_guru } = usePage().props.auth;
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
            name: "Kurikulum",
            url: `/${validateRole(user?.role_id)}/kurikulum`,
            icon: "fas fa-user-graduate",
        },
    ];

    const MenuKurikulumDashboard = [
        {
            name: "Dashboard",
            url: `/${validateRole(
                user?.role_id
            )}?semester=${semester}&tahun=${tahun}&uuid=${user_guru[0]?.guru?.uuid}`,
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
