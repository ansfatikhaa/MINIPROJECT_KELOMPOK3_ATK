import React from 'react';

const FooterComponent = ({ isLoggedIn }) => {
    return(
        <div>
            {isLoggedIn && (
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2021</span>
                    </div>
                </div>
            </footer>
            )}
        </div>
    );
}
        
export default FooterComponent;
