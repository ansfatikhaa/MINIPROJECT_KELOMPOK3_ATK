import React from 'react';
import { Link } from 'react-router-dom';

const SidebarComponent = () => {
    return (
        <div>
            {/* side bar */}
            <ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' id='accordionSidebar'>

                {/* side bar - brand */}
                <Link className='sidebar-brand d-flex align-items-center justify-content-center' to='/'>
                    <div className='sidebar-brand-icon rotate-n-15'>
                        <i className='fas fa-laugh-wink'></i>
                    </div>
                    <div className='sidebar-brand-text mx-3'>ATK</div>
                </Link>

                {/* divider */}
                <hr className='sidebar-divider my-0'></hr>

                {/* nav item - dashboard */}
                <li className='nav-item active'>
                    <Link className='nav-link' to='/'>
                        <i className='fas fa-fw fa-tachometer-alt'></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                {/* divider */}
                <hr className='sidebar-divider'></hr>

                {/* heading */}
                <div className='sidebar-heading'>Interface</div>

                {/* nav item - Alat Tulis Kerja */}
                <li className='nav-item'>
                    <Link className='nav-link collapsed'data-toggle='collapse' data-target='#collapseTwo'
                        aria-expanded='true' aria-controls='collapseTwo'>
                        <i className='fas fa-fw fa-cog'></i>
                        <span>Kelola Master</span>
                    </Link>
                    <div id='collapseTwo' className='collapse' aria-labelledby='headingTwo' data-parent='#accordionSidebar'>
                        <div className='bg-white py-2 collapse-inner rounded'>
                            <h6 className='collapse-header'>Master :</h6>
                            <Link className='collapse-item' to='/atks'>ATK</Link>
                            <Link className='collapse-item' to='/karyawan'>Karyawan</Link>
                        </div>
                    </div>
                </li>

                {/* divider */}
                <hr className='sidebar-divider'></hr>

                {/* heading */}
                <div className='sidebar-heading'>Addons</div>


                {/* nav item - charts */}
                <li className='nav-item'>
                    <Link className='nav-link' to='/transaksi'>
                        <i className='fas fa-fw fa-chart-area'></i>
                        <span>Transaksi</span>
                    </Link>
                </li>

                {/* nav item - tables */}
                <li className='nav-item'>
                    <Link className='nav-link' to='/riwayat-penjualan'>
                        <i className='fas fa-fw fa-table'></i>
                        <span>Riwayat Penjualan</span>
                    </Link>
                </li>

                {/* divider */}
                <hr className='sidebar-divider d-none d-md-block'></hr>

                {/* side bar toggler (sidebar) */}
                <div className='text-center d-none d-md-inline'>
                    <button className='rounded-circle border-0' id='sidebarToggle'></button>
                </div>

                {/* side message */}
                <div className='sidebar-card d-none d-lg-flex'>
                    <img className='sidebar-card-illustration mb-2' src='img/undraw_rocket.svg' alt='...' />
                    <p className='text-center mb-2'><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                    <a className='btn btn-success btn-sm' href='https://startbootstrap.com/theme/sb-admin-pro'>Upgrade to Pro!</a>
                </div>

            </ul>
            {/* end of sidebar */}

        </div>
    );
}

export default SidebarComponent;
