import React, { useEffect, useState } from 'react';
import { listAtks } from '../../service/AtkService';
import { useNavigate } from 'react-router-dom';

function ListAtkComponent() {
    const [atks, setAtks] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        listAtks()
            .then(response => {
                setAtks(response.data); // Pastikan responsenya sudah sesuai dengan struktur yang diharapkan
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function addNewAtk() {
        navigator('/add-atk');
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Tables</h1>
            <button className='btn btn-primary mn-2' onClick={addNewAtk}>Add Atk</button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Supplier</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {atks.map(atk => (
                        <tr key={atk.id}>
                            <td>{atk.nama}</td>
                            <td>{atk.harga}</td>
                            <td>{atk.stok}</td>
                            <td>{atk.supplier}</td>
                            <td>{atk.status === '1' ? 'Aktif' : 'Tidak Aktif'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListAtkComponent;
