import { ScholarshipProps } from "@/lib/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
    Calendar,
    CheckCircle,
    GraduationCap,
    MapPin,
    XCircle,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

const ScholarshipComponent = ({
    imageUrl,
    deadline,
    title,
    location,
    provider,
    description,
    startDate,
    eligibility,
    status,
    handleAction,
    id,
}: ScholarshipProps) => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="relative p-0">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                    Deadline: {deadline}
                </Badge>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2">
                    {title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {location}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {provider}
                </div>
                <ScrollArea className="h-24 mb-2">
                    <p className="text-sm text-gray-600">{description}</p>
                </ScrollArea>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    Start Date: {startDate}
                </div>
                <div className="text-sm font-medium">
                    <span className="font-semibold">Eligibility:</span>{" "}
                    {eligibility}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    className="flex-1 mr-2 hover:bg-green-100 hover:text-green-700"
                    onClick={() => handleAction(id, "approve")}
                    disabled={status !== "pending"}
                >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                </Button>
                <Button
                    variant="outline"
                    className="flex-1 ml-2 hover:bg-red-100 hover:text-red-700"
                    onClick={() => handleAction(id, "reject")}
                    disabled={status !== "pending"}
                >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ScholarshipComponent;
