import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
    GraduationCap,
    MapPin,
    Star,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Scholarship } from "@/lib/types";

interface ScholarshipCardProps {
    scholarship: Scholarship;
}

const ScholarshipComponent: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const handleDetails = () => {
        navigate(`/scholarship/${scholarship.id}`);
    };

    const handleFavorite = async () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="relative p-0">
                <img
                    src={scholarship.banner}
                    alt={scholarship.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2">
                    {scholarship.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {scholarship.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {scholarship.provider}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    // className="flex-1 mr-2 hover:bg-green-100 hover:text-green-700"
                    onClick={handleDetails}
                >
                    Check more details
                </Button>
                <Button
                    variant="outline"
                    style={{ border: "none" }}
                    // className="flex-1 ml-2 hover:bg-red-100 hover:text-red-700"
                    onClick={handleFavorite}
                >
                    <Star className="w-4 h-4 mr-2" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ScholarshipComponent;
