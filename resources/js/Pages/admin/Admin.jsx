import Layout from "@/Layouts/Layout";
import React from "react";

export default function Admin({ title, auth, data }) {
    return (
        <Layout title={title} user={auth?.user}>
            <h1>Admin</h1>
        </Layout>
    );
}
