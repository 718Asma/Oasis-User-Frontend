import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import { Scholarship } from "@/lib/types";
import {
    addFavorite,
    getFavorites,
    removeFavorite,
} from "@/services/userService";
import { verifyToken } from "@/services/authService";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Clock, MapPin, School, Star } from "lucide-react";

interface ScholarshipCardProps {
    scholarship: Scholarship;
}

const ScholarshipComponent: React.FC<ScholarshipCardProps> = ({
    scholarship,
}) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const handleDetails = () => {
        navigate(`/scholarship/${scholarship._id}`);
    };

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                await verifyToken();
                setLoggedIn(true);
            } catch (error) {
                console.error("Error verifying token:", error);
            }
        };

        checkLoggedIn();
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!loggedIn) {
                return;
            }
            try {
                const { data } = await getFavorites();

                if (data.includes(scholarship._id)) {
                    setIsFavorite(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if(loggedIn)
            fetchFavorites();
    }, [scholarship, loggedIn]);

    const handleFavorite = async () => {
        if (isFavorite) {
            handleRemoveFavorite();
        } else {
            handleAddFavorite();
        }
    };

    const handleAddFavorite = async () => {
        try {
            const data = await addFavorite(scholarship._id);
            console.log("Success", data);
            setIsFavorite(true);
            toast({
                description:
                    "Scholarship added to favorites successfully!",
                duration: 2000,
                variant: "success",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveFavorite = async () => {
        try {
            const data = await removeFavorite(scholarship._id);
            console.log("Success", data);
            setIsFavorite(false);
            toast({
                description:
                    "Scholarship removed from favorites successfully!",
                duration: 2000,
                variant: "warning",
            });
        } catch (error) {
            console.error(error);
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
                    {scholarship.location && scholarship.location != "N/A" && (
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {scholarship.location}
                        </div>
                    )}
                    {scholarship.provider && scholarship.provider != "N/A" && (
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <School className="w-4 h-4 mr-1" />
                            {scholarship.provider}
                        </div>
                    )}
                    {scholarship.deadline && scholarship.deadline != "N/A" && (
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            {scholarship.deadline}
                        </div>
                    )}
                </div>
            </CardContent>
            <br />
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleDetails}>
                    Check more details
                </Button>
                {loggedIn && (
                    <Button
                        variant="outline"
                        style={{ border: "none" }}
                        onClick={handleFavorite}
                    >
                        {!isFavorite ? (
                            <Star className="w-4 h-4 mr-2" />
                        ) : (
                            <Star fill="black" className="w-4 h-4 mr-2" />
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default ScholarshipComponent;
