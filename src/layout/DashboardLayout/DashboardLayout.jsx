import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineFolderView, AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { dashboardNavName } from './MenuData';
import SubMenu from './SubMenu';
import Image from '../../assets/Image/defualtImages.png';
import Logo from '../../assets/Image/logo.png';
import './dashboardLayout.css';
import { AuthContext } from '../../context/UserContext/UserContext';

function DashboardLayout() {
    const { user, logOutUser } = useContext(AuthContext);
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();

    const showSidebar = () => setSidebar(!sidebar);

    // const logOut = () => {
    //     localStorage.removeItem('accessToken');
    //     navigate('/login');
    // };

    const logOut = () => {
        logOutUser()
            .then(() => {
                navigate('/');
            })
            .catch((err) => console.error(err));
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Offcanvas
                className="sidebar"
                style={{ background: '#1f1f38', width: '250px' }}
                show={show}
                onHide={handleClose}
            >
                <Offcanvas.Header closeButton>
                    <div className="logo-details">
                        <span className="logo_img">
                            <img src={Logo} />
                        </span>
                    </div>
                </Offcanvas.Header>

                <ul className="nav-links" sidebar={sidebar}>
                    <li onClick={showSidebar}>
                        {dashboardNavName?.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </li>
                </ul>
            </Offcanvas>
            <div className="sidebar d-none d-lg-block ">
                <div className="logo-details">
                    <span className="logo_img">
                        <img src={Logo} />
                    </span>
                </div>
                <ul className="nav-links" sidebar={sidebar}>
                    <li onClick={showSidebar}>
                        {dashboardNavName?.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </li>
                </ul>
            </div>
            <section className="home-section">
                <nav className="d-flex align-items-center">
                    <div className="sidebar-button">
                        <i className="d-xl-none" onClick={handleShow}>
                            <FaBars className="bars-icon" />
                        </i>
                        <span className="dashboard">Dashboard</span>
                    </div>
                    <div className="search-box"></div>
                    <div className="d-flex align-items-center gap-5">
                        <div className="d-flex align-items-center gap-2">
                            <h3 className="user-name mt-2 text-capitalize">
                                Admin
                            </h3>
                            <Dropdown className="bg-transparent">
                                <Dropdown.Toggle className="bg-transparent dropdown-content position-relative">
                                    <div className="user-img">
                                        <img src={Image} alt="image" />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={logOut}
                                        className="text-danger"
                                    >
                                        <AiOutlineLogout />
                                        <span> Log Out</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </nav>
                <Outlet />
            </section>
        </div>
    );
}

export default DashboardLayout;
