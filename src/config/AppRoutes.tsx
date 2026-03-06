import { lazy } from "react";
import { Route, Routes } from "react-router";

const ListBuku = lazy(() => import('../pages/listBuku'));
const BukuDetail = lazy(() => import('../pages/bukuDetail'));

export default function AppRoutes() {
    return (
        <Routes> 
            <Route path="/" element={<ListBuku />} />
            <Route path="/buku/:id" element={<BukuDetail />} />
        </Routes>
    );
}