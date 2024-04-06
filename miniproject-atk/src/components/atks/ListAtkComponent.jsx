import React, { useEffect, useState } from 'react';
import { listAtks, deleteAtk } from '../../service/AtkService';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function ListAtkComponent() {
    const [atks, setAtks] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        listAtks()
        .then((response) => {
            setAtks(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
    }, []);

    function addNewAtk() {
        navigator('/save-atk');
    }

    function updateAtk(atkId) {
        navigator(`/update-atk/${atkId}`);
    }

    function confirmDelete(atkId) {
        swal({
            title: "Apakah Anda yakin?",
            text: "Anda akan menghapus data ATK ini.",
            icon: "warning",
            buttons: ["Batal", "Hapus"], // Menggunakan SweetAlert untuk konfirmasi
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                // Jika pengguna menekan "Hapus"
                deleteAtk(atkId)
                .then(() => {
                    // Refresh daftar ATK setelah berhasil dihapus
                    listAtks()
                    .then((response) => {
                        setAtks(response.data.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                    swal("Data ATK berhasil dihapus.", {
                        icon: "success",
                    });
                })
                .catch((error) => {
                    console.error(error);
                    swal("Gagal menghapus data ATK.", {
                        icon: "error",
                    });
                });
            } else {
                // Jika pengguna membatalkan penghapusan
                swal("Penghapusan dibatalkan.");
            }
        });
    }
    

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Alat Tulis K</h1>
            <button className='btn btn-primary m-2' onClick={addNewAtk}>Tambah Atk</button>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Data ATK</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Stok</th>
                                    <th>Supplier</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {atks.map(atk => (
                                    <tr key={atk.id}>
                                        <td>{atk.nama}</td>
                                        <td>{atk.harga}</td>
                                        <td>{atk.stok}</td>
                                        <td>{atk.sup}</td>
                                        <td>{atk.status == 1 ? 'Aktif' : 'Tidak Aktif'}</td>
                                        <td>
                                            <button className="btn btn-info mr-2" onClick={() => updateAtk(atk.id)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => confirmDelete(atk.id)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListAtkComponent;
