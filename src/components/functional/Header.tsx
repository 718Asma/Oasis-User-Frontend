import React, {useState, useEffect} from 'react';

import { Avatar } from '@mantine/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import "../styles/Header.css";

import { Student } from "@/lib/types";
import { LogOut } from 'lucide-react';

const Header = () => {
    const [user, setUser] = useState<Student>();

    const handleLogout = () => {};
    return (
        <header className="main">
            <div className="logo">
                <img src="src/assets/logo2.png" alt="logo" />
                <h1>Scholarships</h1>
            </div>
            {user ? (
                <div className="user">
                    <Avatar
                            src={user?.profilePicture}
                            alt={user?.firstName}
                            radius="xl"
                            size="lg"
                        />
                    <div>
                        <p className='font-semibold'>{user?.firstName}</p>
                        <button
                            className="btn button"
                            onClick={handleLogout}
                        >
                            <LogOut />&nbsp;
                            Log Out
                        </button>
                    </div>
                </div>
            ) : (
                <div className="user">
                    <button className="btn button connect">    
                        Connect
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;