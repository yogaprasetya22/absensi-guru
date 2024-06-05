import { Link, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/ui/Dropdown";
// import NavLink from "@/Components/ui/NavLink";
import React, { useState, useEffect, useRef } from "react";
import { validateHeader, validateRole } from "./Example";

const Header = ({ toggleSidebar, isSidebarOpen, user }) => {
    const page = usePage();
    const kelas = page?.props?.kelas_siswa?.siswa?.kelas?.kelas;
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    // Menutup dropdown ketika pengguna mengklik di luar area dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <header className=" px-5 lg:px-16 h-auto w-full flex flex-row justify-between items-center sticky top-0 z-50 ">
            <div className="w-auto flex h-16 md:h-20 gap-2">
                <button
                    onClick={toggleSidebar}
                    className="text-3xl lg:hidden block"
                >
                    <i
                        className={`bi ${
                            isSidebarOpen ? "bi-x-lg text-2xl" : "bi-list"
                        }`}
                    ></i>
                </button>
                <div className="flex flex-row items-center text-xl gap-2 ">
                    <span className="font-semibold text-blue-900">{kelas}</span>
                    <span className="font-semibold">{page.props.title}</span>
                </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6 ">
                <div className="ml-3 relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <div className="flex flex-row items-center justify-start gap-4">
                                    <div className="flex flex-col pl-2 justify-end items-start mt-3 pb-1">
                                        <p className="text-md font-extrabold truncate max-w-[7rem]">
                                            {user.name}
                                        </p>
                                    </div>
                                    <img
                                        src="https://picsum.photos/200"
                                        alt=""
                                        className=" rounded-full w-6 h-6 border border-gray-300"
                                    />
                                </div>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Header;
