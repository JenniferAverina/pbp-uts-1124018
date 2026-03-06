import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Buku, CreateBukuPayload, Peminjam } from "../types";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { setPosts } from "../store/postSlice";

export default function BukuDetail() {
    const { id } = useParams();
    const [buku, setBuku] = useState<Buku | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [pinjem, setPeminjam] = useState("");

    useEffect(() => {
        const getDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/buku/${id}/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    alert("Failed to fetch menu: " + (data.message || "Unknown error"));
                    return;
                }

                setBuku(data.data);
            } catch (error) {
                console.error("Fetch error:", error);
                alert("Terjadi kesalahan koneksi ke server.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getDetails();
        }
    }, [id]);

    const setPeminjamInfo = async () => {
        const getuserInfo = await fetch("http://localhost:5173/api/buku", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        })
        const data = await getuserInfo.json()
    }

    const pinjam = async (data: Peminjam) => {
        try {
            const response = await fetch(`/api/buku/${id}/pinjam`, {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    peminjam: {
                        nama: data.peminjam
                    }
                })
            });

            const data1 = await response.json();
            dispatch(setPosts(data1.peminjam))

        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    if (loading) return <div style={{ padding: "32px" }}>Loading data...</div>;
    if (!buku) return <div style={{ padding: "32px" }}>Menu tidak ditemukan.</div>;

    return (
        <div style={{ paddingInline: "32px" }}>
            <h1>Menu Detail</h1>
            <br />
            <h2>Judul: {buku.judul}</h2>
            <p><img src={buku.imageUrl} height="400px" alt="image" /> </p>
            <p><strong>Desc:</strong> {buku.deskripsi}</p>
            <p><strong>tahun:</strong> {buku.tahun}</p>
            <p><strong>kategori:</strong> {buku.kategori}</p>
            <p><strong>status:</strong> {buku.status}</p>
            {/* <p><strong>peminjam:</strong> {buku.peminjam}</p> */}
            <p> Peminjam:  <input type="text" value={buku.peminjam} /></p>
            <button fullWidth variant="contained" sx={{ mt: 3}} value={buku.peminjam} onClick={pinjam}>Pinjamkan!</button>

        </div>
    );
}
