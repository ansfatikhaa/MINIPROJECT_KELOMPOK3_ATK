import React, { useEffect, useState } from 'react';
import { listPenjualans } from '../../service/TransaksiPenjualanService';

function ListPenjualanComponent() {
    const [penjualans, setPenjualans] = useState([]);

    useEffect(() => {
        listPenjualans()
            .then(response => {
                setPenjualans(response.data.data.map(penjualan => ({
                    ...penjualan,
                    formattedDate: new Date(penjualan.tanggal).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })
                })));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Riwayat Transaksi</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Riwayat Transaksi ATK</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Total</th>
                                    <th>Nama Karyawan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {penjualans.map(penjualan => (
                                    <tr key={penjualan.trpId}>
                                        <td>{penjualan.formattedDate}</td>
                                        <td>Rp {penjualan.total},00</td>
                                        <td>{penjualan.kryNama}</td> 
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

export default ListPenjualanComponent;
