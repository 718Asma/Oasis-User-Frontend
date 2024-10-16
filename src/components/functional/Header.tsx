import { useEffect, useState } from 'react';
import "../styles/Header.css";

import { Student } from "@/lib/types";
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import oasisLogo from '@/assets/oasis2.png';

const Header = () => {
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
                <img src={oasisLogo} alt="Oasis Logo" />
                <h1>Oasis</h1>
            </div>
            {user ? (
                <div className="user" style={{ display: 'flex', fontSize: '16px' }}>
                    {user.profilePicture && <img src={user.profilePicture} alt={user.firstName} className="w-16 h-16 rounded-full" style={{ marginRight: '0px' }} />}
                    <div>
                        <a href={`/settings/${user_id}`} className="font-semibold">
                            {user.firstName} {user.lastName}
                        </a>
                        <br/>
                        <button className="btn button" onClick={handleLogout}>
                            <LogOut />&nbsp;
                            Log Out
                        </button>
                    </div>
                </div>
            ) : (
                <div className="user">
                    <button className="btn button connect" onClick={() => navigate('/login')}>
                        Connect
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
