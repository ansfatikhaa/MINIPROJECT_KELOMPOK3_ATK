import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function CRUDAlatTulisKerjaComponent() {
    const [atk_nama, setAtk_nama] = useState('');
    const [atk_harga, setAtk_harga] = useState('');
    const [atk_stok, setAtk_stok] = useState('');
    const [atk_sup, setAtk_sup] = useState('');
    const [atk_sups, setAtk_sups] = useState([]);
    const [kry_nama, setKry_nama] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // useEffect(() => {
    //     listProdi()
    //         .then((response) => {
    //             setProdis(response.data.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setLoading(false);
    //         });
    // }, []);

    function saveUser(e) {
        e.preventDefault();

        if (!atk_nama || !atk_harga || !atk_stok || !atk_sup) {
            alert('Silakan lengkapi semua input sebelum menyimpan!');
            return;
        }

        const atk = {
            atk_nama, atk_harga, atk_stok, atk_sup,
        };

        createUser(atk)
            .then((response) => {
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Error saving user:', error);
            });
    }

    function backUser(){
        navigate('/dashboard');
    }

  return (
    <div className='container'>
            <br />
            <div className='row'>
                <div className='card'>
                    <h2 className='text-center'>Add User</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Nama :</label>
                                <input type='text' name='atk_nama' value={atk_nama} className='form-control'
                                    onChange={(e) => setAtk_nama(e.target.value)}
                                />
                                <label className='form-label'>Harga :</label>
                                <input type='number' name='atk_harga' value={atk_harga} className='form-control' 
                                    onChange={(e) => setAtk_harga(e.target.value)}
                                />
                                <label className='form-label'>Stok :</label>
                                <input type='number' name='atk_stok' value={atk_stok} className='form-control'
                                    onChange={(e) => setAtk_stok(e.target.value)}
                                />
                                <label className='form-label'>Supplier :</label>
                                {loading ? (
                                    <select className='form-control' disabled>
                                        <option>Loading...</option>
                                    </select>
                                ) : (
                                    <select name='atk_sup' value={atk_sup} className='form-control'
                                        onChange={(e) => setAtk_sup(e.target.value)}
                                    >
                                        <option value=''>Pilih Supplier</option>
                                        {atk_sups.map((supsName) => (
                                            <option key={supsName.id} value={supsName.id}>
                                                {supsName.nama}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <button className='btn btn-success' onClick={saveUser}>Submit</button>
                            <button className='btn btn-danger' onClick={backUser}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CRUDAlatTulisKerjaComponent