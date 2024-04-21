import React, { useState } from 'react';
import axios from 'axios';

function LoginComponent({ onLogin, navigate }) {
  const [email, setEmail] = useState('');
  const [nama, setNama] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/karyawans/login', {
        nama,
        email
      });

      const responseData = response.data;

      if (responseData.status === 200) {
        const { id, nama, email, status } = responseData.data;

        if (status === 1) {
          // Login berhasil
          // Simpan data login
          localStorage.setItem('userData', JSON.stringify({ id, nama, email }));
          // Panggil fungsi onLogin dari props
          onLogin(true);
          // Navigasi ke halaman transaksi atau halaman setelah login berhasil
          navigate('/chart');
        } else {
          // Jika status 0, login gagal
          setError('Login gagal. Silakan coba lagi.');
        }
      } else {
        // Login gagal
        setError('Login gagal. Silakan coba lagi.');
      }
    } catch (error) {
      // Tangani kesalahan jika permintaan gagal
      setError('Login gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputNama"
                          placeholder="Nama"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block">
                        Login
                      </button>
                      <hr />
                    </form>
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="register.html">Create an Account!</a>
                    </div>
                    {error && <div className="text-center text-danger mt-3">{error}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
