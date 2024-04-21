import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { deleteKaryawan, listKaryawan, saveKaryawan, updateKaryawan } from '../../service/KaryawanService';

function ListKaryawanComponent() {

    const handleShowAddModal = () => setShowAddModal(true);
    const [karyawans, setKaryawan] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        listKaryawan()
            .then(response => {
                setKaryawan(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setKaryawanDataAdd({
            nama: '',
            email: '',
            noTlp: ''
        });
    };

    const handleInputAddChange = (e) => {
        const { name, value } = e.target;
        setKaryawanDataAdd({
            ...karyawanDataAdd,
            [name]: parseInt(value) || value,
        });
    };

    const [karyawanDataUpdate, setKaryawanDataUpdate] = useState({
        id: null,
        nama: '',
        email: '',
        noTlp: ''
    });

    const [karyawanDataAdd, setKaryawanDataAdd] = useState({
        nama: '',
        email: '',
        noTlp: ''
    });


    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setKaryawanDataUpdate({
            id: null,
            nama: '',
            email: '',
            noTlp: '',
            status: ''
        });
    };

    const handleAddKaryawan = () => {
        saveKaryawan(karyawanDataAdd)
            .then(() => {
                handleCloseAddModal();
                listKaryawan()
                    .then(response => {
                        setKaryawan(response.data.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                swal("Data Karyawan berhasil disimpan.", {
                    icon: "success",
                });
            })
            .catch(error => {
                console.error(error);
                swal("Gagal menyimpan data ATK.", {
                    icon: "error",
                });
            });
    };

    const handleUpdateKaryawan = () => {
        updateKaryawan(karyawanDataUpdate, karyawanDataUpdate.id)
            .then(() => {
                handleCloseUpdateModal();
                listKaryawan()
                    .then(response => {
                        setKaryawan(response.data.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                swal("Data Karyawan berhasil diperbarui.", {
                    icon: "success",
                });
            })
            .catch(error => {
                console.error(error);
                swal("Gagal memperbarui data Karyawan.", {
                    icon: "error",
                });
            });
    };

    const handleShowUpdateModal = (karyawanId) => {
        const karyawanToUpdate = karyawans.find(kry => kry.id === karyawanId);
        setKaryawanDataUpdate({
            id: karyawanToUpdate.id,
            nama: karyawanToUpdate.nama,
            email: karyawanToUpdate.email,
            noTlp: karyawanToUpdate.noTlp,
            status: karyawanToUpdate.status
        });
        setShowUpdateModal(true);
    };

    const confirmDelete = (karyawanId) => {
        swal({
            title: "Apakah Anda yakin?",
            text: "Anda akan menghapus data Karyawan ini.",
            icon: "warning",
            buttons: ["Batal", "Hapus"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteKaryawan(karyawanId)
                        .then(() => {
                            listKaryawan()
                                .then((response) => {
                                    setKaryawan(response.data.data);
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                            swal("Data Karyawan berhasil dihapus.", {
                                icon: "success",
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                            swal("Gagal menghapus data Karyawan.", {
                                icon: "error",
                            });
                        });
                } else {
                    swal("Penghapusan dibatalkan.");
                }
            });
    };

  return (
    <>
    <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Karyawan</h1>
        <button className='btn btn-primary m-2' onClick={handleShowAddModal}>Tambah karyawan</button>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Data karyawan</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Nomor Telepon</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {karyawans.map(karyawan => (
                                <tr key={karyawan.id}>
                                    <td>{karyawan.nama}</td>
                                    <td>{karyawan.email}</td>
                                    <td>{karyawan.noTlp}</td>
                                    <td>{karyawan.status === 1 ? 'Aktif' : 'Tidak Aktif'}</td>
                                    <td>
                                        <button className="btn btn-info mr-2" onClick={() => handleShowUpdateModal(karyawan.id)}>Ubah</button>
                                        <button className="btn btn-danger" onClick={() => confirmDelete(karyawan.id)}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header>
            <Modal.Title>Tambah karyawan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="nama">
                    <Form.Label>Nama karyawan</Form.Label>
                    <Form.Control
                        type="text"
                        name="nama"
                        value={karyawanDataAdd.nama}
                        onChange={handleInputAddChange}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={karyawanDataAdd.email}
                        onChange={handleInputAddChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="noTlp">
                    <Form.Label>Nomor Telepon</Form.Label>
                    <Form.Control
                        type="number"
                        name="noTlp"
                        value={karyawanDataAdd.noTlp}
                        onChange={handleInputAddChange}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>Tutup</Button>
            <Button variant="primary" onClick={handleAddKaryawan}>Simpan</Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header>
            <Modal.Title>Ubah karyawan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="nama">
                    <Form.Label>Nama karyawan</Form.Label>
                    <Form.Control
                        type="text"
                        name="nama"
                        value={karyawanDataUpdate.nama}
                        onChange={(e) => setKaryawanDataUpdate({ ...karyawanDataUpdate, nama: e.target.value })}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={karyawanDataUpdate.email}
                        onChange={(e) => setKaryawanDataUpdate({ ...karyawanDataUpdate, email: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="noTlp">
                    <Form.Label>Nomor Telepon</Form.Label>
                    <Form.Control
                        type="number"
                        name="noTlp"
                        value={karyawanDataUpdate.noTlp}
                        onChange={(e) => setKaryawanDataUpdate({ ...karyawanDataUpdate, noTlp: e.target.value })}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>Tutup</Button>
            <Button variant="primary" onClick={handleUpdateKaryawan}>Simpan Perubahan</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default ListKaryawanComponent