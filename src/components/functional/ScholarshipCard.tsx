import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
// import { Badge } from "../ui/badge";
import {
    GraduationCap,
    MapPin,
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

    const handleFavorite = async () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="relative p-0">
                <img
                    src={scholarship.imageUrl}
                    alt={scholarship.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2">
                    {scholarship.title}
                </CardTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {scholarship.location && scholarship.location != 'N/A' &&
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {scholarship.location}
                        </div>
                    }
                    {scholarship.criteria && scholarship.criteria.GPA &&
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <GraduationCap className="w-4 h-4 mr-1" />
                            {scholarship.criteria.GPA}
                        </div>
                    }
                </div>
            </CardContent>
            <br />
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handleDetails}
                >
                    Check more details
                </Button>
                {userId === null && (
                    <Button
                        variant="outline"
                        style={{ border: "none" }}
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
