import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from "react";
import {
    Card, CardHeader, CardContent, CardActions, IconButton, Typography, Container,
    Box, Button, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    CardMedia
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';


import { usePosts } from "../hooks/usePosts";
import { useSelector } from 'react-redux';
import type { Buku } from '../types';
import type { RootState } from '../redux/store';
import { useUpdatePost } from '../hooks/useUpdatePost';
// import { useUpdatePinjam } from '../hooks/useUpdatePinjam';

function ListBukuItem({ post, onDetail, onEdit }: { post: Buku, onDetail: (id: string) => void, onEdit: (post: Buku) => void }) {

    return (
        <Card sx={{ height: '500px', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
                action={
                    <Box>
                        <IconButton size="small" color="primary" onClick={() => onEdit(post)}>
                            <MoreVertIcon fontSize="small" /> {/* Bisa diganti EditIcon */}
                        </IconButton>
                    </Box>
                }
                title={<Typography variant="subtitle1" fontWeight="bold" noWrap>{post.judul}</Typography>}
                subheader={<Typography variant="caption">{new Date(post.createdAt).toLocaleDateString('id-ID')}</Typography>}
            />

            <CardContent sx={{ flexGrow: 1, overflow: 'hidden', pt: 0 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={post.imageUrl}
                    alt="Book cover"
                />
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontStyle: 'italic'
                    }}
                >
                    {post.deskripsi || "Tidak ada deskripsi."}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                    {post.tahun},{post.kategori},{post.status},{post.peminjam}
                </Typography>
            </CardContent>
            <CardActions sx={{ borderTop: '1px solid #f0f0f0', justifyContent: 'space-between', px: 2, py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" color="error"><FavoriteIcon fontSize="small" /></IconButton>
                </Box>
                <Button size="small" variant="outlined" onClick={() => onDetail(post.id)}>
                    Detail
                </Button>
            </CardActions>
        </Card>
    );
}


export default function listBuku() {
    const posts = useSelector((state: RootState) => state.posts.items)
    const { reload } = usePosts();
    const updatePost = useUpdatePost();
    // const updatePinjam = useUpdatePinjam()

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ judul: "", deskripsi: "", tahun: "", kategori: "", status: "", peminjam: "", imageUrl: "" });

    const navigate = useNavigate();

    // Fungsi untuk pindah ke halaman detail postingan (yg postDetail ituh)
    const goToPost = (id: string) => navigate(`/buku/${id}`);



    useEffect(() => {
        reload();
    }, [reload]);

    const handleOpenEdit = (post: Buku) => {
        setEditId(post.id);
        setFormData({ judul: post.judul, deskripsi: post.deskripsi, tahun: post.tahun, kategori: post.kategori, status: post.status, peminjam: post.peminjam, imageUrl: post.imageUrl });
        setOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (editId) {
                await updatePost(editId, formData);
            }
            setOpen(false);
            reload();
        } catch (err) {
            alert("Gagal menyimpan post");
        }
    };

    return (
        <Container sx={{ py: 6 }} maxWidth="lg">
            {/* 1. Header yang benar-benar di tengah */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Menengahkan secara horizontal
                textAlign: 'center',
                mb: 6
            }}>
                <Typography variant="h3" fontWeight="900" sx={{ color: '#1976d2', mb: 2 }}>
                    LIST MENU
                </Typography>
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 4,
                justifyContent: 'center', // Bikin kartu yang sisa tetap di tengah
                width: '100%'
            }}>
                {posts.map((post) => (
                    <ListBukuItem
                        key={post.id}
                        post={post}
                        onDetail={goToPost}
                        onEdit={handleOpenEdit}
                    />
                ))}
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{editId ? "Edit Post" : "Create New Post"}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <TextField
                        label="judul" fullWidth value={formData.judul}
                        onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    />
                    <TextField
                        label="deskripsi" fullWidth multiline rows={4} value={formData.deskripsi}
                        onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    />
                    <TextField
                        label="tahun" fullWidth multiline rows={4} value={formData.tahun}
                        onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                    />
                    <TextField
                        label="kategori" fullWidth multiline rows={4} value={formData.kategori}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    />
                    <TextField
                        label="status" fullWidth multiline rows={4} value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    />
                    <TextField
                        label="peminjam" fullWidth multiline rows={4} value={formData.peminjam}
                        onChange={(e) => setFormData({ ...formData, peminjam: e.target.value })}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );

}