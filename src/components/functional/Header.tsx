import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Student } from "@/lib/types";
import { getUserById } from "@/services/userService";

import { useTheme } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { AccountDropdown } from '@/components/account';

import { Button } from '@/components/ui/button';
import "../styles/Header.css";

import oasisLogo from '@/assets/oasis2.png';
import oasisDarkLogo from '@/assets/oasisDark.png';

const Header = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [user, setUser] = useState<Student | null>(null);
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!user_id) {
                console.error("No user id found");
                return;
            }

            try {
                const { data } = await getUserById(user_id);
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