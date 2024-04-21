import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = ({ isLoggedIn }) => {
    return (
        <div>
            {isLoggedIn && (
            <header>
                {/* content wrapper */}
                <div id='content-wrapper' className='d-flex flex-column'>

                    {/* main content */}
                    <div id='content'>

                        {/* topbar */}
                        <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>

                            {/* sidebar toggle (topbar) */}
                            <button id='sidebarToggleTop' className='btn btn-link d-md-none rounded-circle mr-3'>
                                <i className='fa fa-bars'></i>
                            </button>

                            {/* topbar search */}
                            <form className='d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search'>
                                <div className='input-group'>
                                    <input type='text' className='form-control bg-light border-0 small' placeholder='Search for...'
                                        aria-label='Search' aria-describedby='basic-addon2' />
                                    <div className='input-group-append'>
                                        <button className='btn btn-primary' type='button'>
                                            <i className='fas fa-search fa-sm'></i>
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* topbar navbar */}
                            <ul className='navbar-nav ml-auto'>

                                {/* nav item - user information */}
                                <li className='nav-item dropdown no-arrow'>
                                    <a className='nav-link dropdown-toggle' href='#' id='userDropdown' role='button'
                                        data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                        <span className='mr-2 d-none d-lg-inline text-gray-600 small'>Douglas McGee</span>
                                        <img className='img-profile rounded-circle'
                                            src='img/undraw_profile.svg' alt='Profile'/>
                                    </a>

                                    {/* dropdown - user information */}
                                    <div className='dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby='userDropdown'>
                                        <Link className='dropdown-item' to='/profile'>
                                            <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
                                            Profile
                                        </Link>
                                        <Link className='dropdown-item' to='/settings'>
                                            <i className='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>
                                            Settings
                                        </Link>
                                        <Link className='dropdown-item' to='/activity-log'>
                                            <i className='fas fa-list fa-sm fa-fw mr-2 text-gray-400'></i>
                                            Activity Log
                                        </Link>
                                        <div className='dropdown-divider'></div>
                                        <a className='dropdown-item' href='#' data-toggle='modal' data-target='#logoutModal'>
                                            <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        {/* end of topbar */}
                    </div>
                </div>
            </header>
            )}
        </div>
    );
}

export default HeaderComponent;
