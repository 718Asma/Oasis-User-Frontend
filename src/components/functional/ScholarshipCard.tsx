import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Clock,
    MapPin,
    School,
    Star,
} from "lucide-react";
// import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Scholarship } from "@/lib/types";
import { useEffect, useState } from "react";
import axios from "axios";

interface ScholarshipCardProps {
    scholarship: Scholarship;
}

const ScholarshipComponent: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const userId = localStorage.getItem('userId') || null;
    const access_token = localStorage.getItem("access_token");

    const handleDetails = () => {
        navigate(`/scholarship/${scholarship._id}`);
    };

    const getFavorites = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/favorites', {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            });
            setFavorites(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFavorites();
        if (favorites.includes(scholarship._id)) {
            setIsFavorite(true);
        }
    }, [scholarship, userId]);

    const handleFavorite = async () => {
        if (localStorage.getItem('userId') === null || localStorage.getItem('access_token') === null) {
            navigate('/login');
            return;
        } else{
            try {
                const response = await axios.post(`http://localhost:3000/users/add-favorite`, {scholarshipId: scholarship._id}, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    },
                });
                console.log('Success', response.data);
                setIsFavorite(!isFavorite);
            } catch (error) {
                console.error(error);
            }
        }
        
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="relative p-0">
                <img
                    src="src/assets/defaultBanner.png"
                    alt={scholarship.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2">
                    {scholarship.title}
                </CardTitle>
                <div>
                    {scholarship.location && scholarship.location != 'N/A' &&
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {scholarship.location}
                        </div>
                    }
                    {scholarship.provider && scholarship.provider != 'N/A' &&
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <School className="w-4 h-4 mr-1" />
                            {scholarship.provider}
                        </div>
                    }
                    {scholarship.deadline && scholarship.deadline != 'N/A' &&
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            {scholarship.deadline}
                        </div>
                    }
                </div>
            </CardContent>
            <br />
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    // className="flex-1 mr-2 hover:bg-green-100 hover:text-green-700"
                    onClick={handleDetails}
                >
                    Check more details
                </Button>
                {userId === null && (
                    <Button
                        variant="outline"
                        style={{ border: "none" }}
                        // className="flex-1 ml-2 hover:bg-red-100 hover:text-red-700"
                        onClick={handleFavorite}
                    >
                        {!isFavorite ?
                            <Star className="w-4 h-4 mr-2" /> :
                            <Star fill="black" className="w-4 h-4 mr-2" />
                        }
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default ScholarshipComponent;