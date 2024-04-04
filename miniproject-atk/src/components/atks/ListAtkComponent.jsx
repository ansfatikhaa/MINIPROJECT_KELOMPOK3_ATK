import React, { useEffect, useState } from 'react';
import { listAtks } from '../../service/AtkService';
import { useNavigate } from 'react-router-dom';

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
        navigator('/add-atk');
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Tables</h1>
            <button className='btn btn-primary m-2' onClick={addNewAtk}>Add Atk</button>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
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
