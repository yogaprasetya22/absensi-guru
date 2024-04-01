import TabelCurdAdmin from "@/Components/admin/TabelCurdAdmin";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function Data({ title, auth, ...props }) {
    return (
        <Layout title={title} user={auth?.user}>
            <TabelCurdAdmin dataTabel={props.data} pathname={props.slug} />
        </Layout>
    );
}
