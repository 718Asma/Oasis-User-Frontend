import { useEffect, useState } from 'react';
import "../styles/Header.css";

import { Student } from "@/lib/types";
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import oasisLogo from '@/assets/oasis2.png';
import oasisDarkLogo from '@/assets/oasisDark.png';
import { useTheme } from '../theme-provider';
import { Button } from '../ui/button';
import { ModeToggle } from '../mode-toggle';
import { AccountDropdown } from '../account';

const Header = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [user, setUser] = useState<Student | null>(null);
    const user_id = localStorage.getItem("user_id");
    const access_token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!user_id) {
                console.error("No user id found");
                return;
            }

            try {
                const { data } = await axios.get(`http://localhost:3000/users/id/${user_id}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    },
                });
                console.log("User info:", data);
                const profileImgUrl = data.profilePicture 
                    ? `http://localhost:3000/${data.profilePicture}`
                    : undefined;
                data.profilePicture = profileImgUrl;
                setUser(data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, [user_id]);

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };

    return (
        <header className="main">
            <div className="logo">
                <img 
                    src={theme === "dark" ? oasisDarkLogo : oasisLogo}
                    alt="Oasis Logo" 
                />
                <h1>Oasis</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className='dark:text-white' style={{ marginRight: '1rem' }}>
                    <ModeToggle />
                </div>
                {user ? (
                    <div className='dark:text-white' style={{ marginRight: '1rem' }}>
                        <AccountDropdown />
                    </div>
                ) : (
                    <Button
                        onClick={() => navigate('/login')}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        Connect
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;