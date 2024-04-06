import React, { useEffect, useState } from 'react';
import { listAtks, saveAtk, deleteAtk } from '../../service/AtkService';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

function ListAtkComponent() {
    const [atks, setAtks] = useState([]);
    const navigator = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [atkData, setAtkData] = useState({
        nama: '',
        harga: '',
        stok: '',
        sup: ''
    });

    useEffect(() => {
        listAtks()
        .then((response) => {
            setAtks(response.data.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    function editAtk(atkId) {
        navigator(`/edit-atk/${atkId}`);
    }

    function confirmDelete(atkId) {
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
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setAtkData({ // Reset input fields when modal is closed
            nama: '',
            harga: '',
            stok: '',
            sup: ''
        });
    };

    const handleShowModal = () => setShowModal(true);

    const handleSaveChanges = () => {
        saveAtk(atkData)
            .then(() => {
                handleCloseModal(); // Close modal after successful save
                listAtks() // Panggil kembali listAtks setelah penyimpanan berhasil
                    .then(response => {
                        setAtks(response.data.data); // Perbarui state atks dengan data terbaru
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
    

    // Handle changes in input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAtkData({
            ...atkData,
            [name]: value
        });
    };

    return (
        <>
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Alat Tulis Kerja</h1>
            <button className='btn btn-primary m-2' onClick={handleShowModal}>Tambah Atk</button>
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
                                        <td>{atk.status == 1 ? 'Aktif' : 'Tidak Aktif'}</td>
                                        <td>
                                            <button className="btn btn-info mr-2" onClick={() => editAtk(atk.id)}>Edit</button>
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

        <Modal show={showModal} onHide={handleCloseModal}>
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
                            value={atkData.nama}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="harga">
                        <Form.Label>Harga</Form.Label>
                        <Form.Control
                            type="number"
                            name="harga"
                            value={atkData.harga}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="stok">
                        <Form.Label>Stok</Form.Label>
                        <Form.Control
                            type="number"
                            name="stok"
                            value={atkData.stok}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sup">
                        <Form.Label>Supplier</Form.Label>
                        <Form.Control
                            type="text"
                            name="sup"
                            value={atkData.sup}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ListAtkComponent;
