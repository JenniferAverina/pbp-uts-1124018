import { useCallback } from "react";
import type { CreateBukuPayload } from "../types";

export function useUpdatePost() {
    return useCallback(async (id: string, data: CreateBukuPayload) => {
        try {
            const response = await fetch(`http://localhost:5173/api/buku/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({data}),
            });

            if (!response.ok) throw new Error("Gagal memperbarui post");
            
            return await response.json();
        } catch (err) {
            console.error("Update error:", err);
            throw err;
        }
    }, []);
}