import { User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function AccountDropdown() {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
    const user_id = localStorage.getItem("user_id");
    const access_token = localStorage.getItem("access_token");

    const fetchUser = async () => {
        if(user_id === null) {
            return;
        }
        const response = await axios.get(`http://localhost:3000/users/profile`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });
        const profileImgUrl = response.data.profilePicture 
            ? `http://localhost:3000/${response.data.profilePicture}`
            : undefined;
        setProfilePicture(profileImgUrl);
    };

    useEffect(() => {
        fetchUser();
    }, [user_id]);

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                    {profilePicture ? (
                        <img src={profilePicture} alt="Profile Picture" className="h-10 w-10 rounded-full" />
                    ) : (
                        <Button variant="outline" size="icon">
                            <User className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`/settings/${user_id}`)}>
                    <Settings className="mr-2" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
