import { useEffect, useState } from "react";

import { Scholarship } from "@/lib/types";
import { getScholarshipLocations } from "@/services/scholarshipService";
import { getFavorites } from "@/services/userService";

import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import "../styles/FilterSideBar.css";
import { verifyToken } from "@/services/authService";

interface FilterSideBarProps {
    filteredScholarships: Scholarship[];
    setFiltered: (filtered: boolean) => void;
    applyFilters: (filteredScholarships: Scholarship[]) => void;
    closeSidebar: () => void;
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({
    filteredScholarships,
    setFiltered,
    applyFilters,
    closeSidebar,
}) => {
    const [locations, setLocations] = useState<string[]>([]);
    const [location, setLocation] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getScholarshipLocations();
                console.log(response);
                const data: string[] = response;
                const uniqueLocations = [...new Set(data)];
                setLocations(uniqueLocations);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await verifyToken();
                console.log(response);
                setLoggedIn(true);
            } catch (error) {
                console.error("Error verifying token:", error);
            }
        };

        checkLoggedIn();
    }, []);

    const handleFilters = async () => {
        console.log(location, deadline);
        let filteredList = [...filteredScholarships];
        console.log(filteredList);

        if (location != "all" && location != "") {
            filteredList = filteredList.filter(
                (scholarship) => scholarship.location == location
            );
        }
        if (deadline != null) {
            filteredList = filteredList.filter((scholarship) => {
                const scholarshipDeadline = new Date(scholarship.deadline);
                console.log(scholarshipDeadline);

                return (
                    scholarshipDeadline.getFullYear() ===
                        deadline.getFullYear() &&
                    scholarshipDeadline.getMonth() === deadline.getMonth() &&
                    scholarshipDeadline.getDate() === deadline.getDate()
                );
            });
        }
        if (favoritesOnly) {
            try {
                const response = await getFavorites();
                console.log(response.data);
                filteredList = filteredList.filter((scholarship) =>
                    response.data.includes(scholarship._id)
                );
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        }

        console.log(filteredList);
        applyFilters(filteredList);
        setFiltered(true);
        closeSidebar();
    };

    return (
        <div className="min-h-screen w-full text-black bg-background dark:bg-dark-background">
            <div className="filter dark:text-white">
                <h2>Filter Scholarships</h2>
                <p>Adjust the filters to refine your scholarship search</p>
                <div className="bg-background dark:bg-dark-background">
                    <h5>Location</h5>
                    <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {locations.map((location) => (
                                <SelectItem value={location}>
                                    {location}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="bg-background dark:bg-dark-background">
                    <h5>Deadline</h5>
                    <DateInput
                        value={deadline}
                        onChange={(e) => {
                            const { value } = e.target;
                            setDeadline(value ? new Date(value) : null);
                        }}
                    />
                </div>
                {loggedIn && (
                    <div style={{ display: "flex", marginTop: "1.5rem" }}>
                        <Checkbox
                            onChange={(e) => {
                                setFavoritesOnly(e.target.checked);
                                console.log(favoritesOnly);
                            }}
                        />
                        <span>Display Favorites Only</span>
                    </div>
                )}
                <div className="button bg-background dark:bg-dark-background">
                    <Button onClick={handleFilters} className="dark:text-white">
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FilterSideBar;
