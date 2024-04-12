import React, { useEffect, useState } from 'react';
import { listAtks, saveAtk, updateAtk, getAtkById, deleteAtk } from '../../service/AtkService';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

function ListAtkComponent() {
    const [atks, setAtks] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [atkDataAdd, setAtkDataAdd] = useState({
        nama: '',
        harga: '',
        stok: '',
        sup: ''
    });
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [atkDataUpdate, setAtkDataUpdate] = useState({
        id: null,
        nama: '',
        harga: '',
        stok: '',
        sup: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        listAtks()
            .then(response => {
                setAtks(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleShowAddModal = () => setShowAddModal(true);

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setAtkDataAdd({
            nama: '',
            harga: '',
            stok: '',
            sup: ''
        });
    };

    const handleAddAtk = () => {
        saveAtk(atkDataAdd)
            .then(() => {
                handleCloseAddModal();
                listAtks()
                    .then(response => {
                        setAtks(response.data.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                swal("Data ATK berhasil disimpan.", {
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

    const handleInputAddChange = (e) => {
        const { name, value } = e.target;
        setAtkDataAdd({
            ...atkDataAdd,
            [name]: parseInt(value) || value,
        });
    };

    const handleShowUpdateModal = (atkId) => {
        const atkToUpdate = atks.find(atk => atk.id === atkId);
        setAtkDataUpdate({
            id: atkToUpdate.id,
            nama: atkToUpdate.nama,
            harga: atkToUpdate.harga,
            stok: atkToUpdate.stok,
            sup: atkToUpdate.sup
        });
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setAtkDataUpdate({
            id: null,
            nama: '',
            harga: '',
            stok: '',
            sup: ''
        });
    };

    const handleUpdateAtk = () => {
        updateAtk(atkDataUpdate, atkDataUpdate.id)
            .then(() => {
                handleCloseUpdateModal();
                listAtks()
                    .then(response => {
                        setAtks(response.data.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                swal("Data ATK berhasil diperbarui.", {
                    icon: "success",
                });
            })
            .catch(error => {
                console.error(error);
                swal("Gagal memperbarui data ATK.", {
                    icon: "error",
                });
            });
    };

    const confirmDelete = (atkId) => {
        swal({
            title: "Apakah Anda yakin?",
            text: "Anda akan menghapus data ATK ini.",
            icon: "warning",
            buttons: ["Batal", "Hapus"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteAtk(atkId)
                        .then(() => {
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
                    swal("Penghapusan dibatalkan.");
                }
            });
    };

    return (
        <>
            <div className="container-fluid">
                <h1 className="h3 mb-2 text-gray-800">Alat Tulis Kantor</h1>
                <button className='btn btn-primary m-2' onClick={handleShowAddModal}>Tambah Atk</button>
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
                                            <td>Rp {atk.harga},00</td>
                                            <td>{atk.stok}</td>
                                            <td>{atk.sup}</td>
                                            <td>{atk.status === 1 ? 'Aktif' : 'Tidak Aktif'}</td>
                                            <td>
                                                <button className="btn btn-info mr-2" onClick={() => handleShowUpdateModal(atk.id)}>Ubah</button>
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

            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header>
                    <Modal.Title>Tambah ATK</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="nama">
                            <Form.Label>Nama ATK</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={atkDataAdd.nama}
                                onChange={handleInputAddChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="harga">
                            <Form.Label>Harga</Form.Label>
                            <Form.Control
                                type="number"
                                name="harga"
                                value={atkDataAdd.harga}
                                onChange={handleInputAddChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="stok">
                            <Form.Label>Stok</Form.Label>
                            <Form.Control
                                type="number"
                                name="stok"
                                value={atkDataAdd.stok}
                                onChange={handleInputAddChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sup">
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control
                                type="text"
                                name="sup"
                                value={atkDataAdd.sup}
                                onChange={handleInputAddChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddModal}>Tutup</Button>
                    <Button variant="primary" onClick={handleAddAtk}>Simpan</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                <Modal.Header>
                    <Modal.Title>Ubah ATK</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="nama">
                            <Form.Label>Nama ATK</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={atkDataUpdate.nama}
                                onChange={(e) => setAtkDataUpdate({ ...atkDataUpdate, nama: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="harga">
                            <Form.Label>Harga</Form.Label>
                            <Form.Control
                                type="number"
                                name="harga"
                                value={atkDataUpdate.harga}
                                onChange={(e) => setAtkDataUpdate({ ...atkDataUpdate, harga: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="stok">
                            <Form.Label>Stok</Form.Label>
                            <Form.Control
                                type="number"
                                name="stok"
                                value={atkDataUpdate.stok}
                                onChange={(e) => setAtkDataUpdate({ ...atkDataUpdate, stok: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sup">
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control
                                type="text"
                                name="sup"
                                value={atkDataUpdate.sup}
                                onChange={(e) => setAtkDataUpdate({ ...atkDataUpdate, sup: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateModal}>Tutup</Button>
                    <Button variant="primary" onClick={handleUpdateAtk}>Simpan Perubahan</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ListAtkComponent;
