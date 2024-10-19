import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import "../styles/FilterSideBar.css";
import { Button } from "../ui/button";
import { Scholarship } from "@/lib/types";
import { DateInput } from "../ui/date-input";
import { Checkbox } from "../ui/checkbox";
import axios from "axios";


interface FilterSideBarProps {
    filteredScholarships: Scholarship[],
    setFiltered: (filtered: boolean) => void;
    applyFilters: (filteredScholarships: Scholarship[]) => void;
    closeSidebar: () => void;
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({ filteredScholarships, setFiltered, applyFilters, closeSidebar }) => {
    const [locations, setLocations] = useState<string[]>([]);
    const [location, setLocation] = useState<string>('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
    const user_id = localStorage.getItem('user_id') || null;
    const access_token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchLocations = async () => {
            try {
            const response = await axios.get('http://localhost:3000/scholarships/locations', {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            });
            const data: string[] = response.data;
            const uniqueLocations = [...new Set(data)];
            setLocations(uniqueLocations);
            } catch (error) {
            console.error('Error fetching scholarships:', error);
            }
        };

        fetchLocations();
    }, []);

    const handleFilters = async () => {
        console.log(location, deadline);
        let filteredList = [...filteredScholarships];
        console.log(filteredList);

        if(location != 'all' && location != '') {
            filteredList = filteredList.filter(scholarship => scholarship.location == location);
        }
        if(deadline != null) {
            filteredList = filteredList.filter(scholarship => {
                const scholarshipDeadline = new Date(scholarship.deadline);
                console.log(scholarshipDeadline);
    
                return (
                    scholarshipDeadline.getFullYear() === deadline.getFullYear() &&
                    scholarshipDeadline.getMonth() === deadline.getMonth() &&
                    scholarshipDeadline.getDate() === deadline.getDate()
                );
            });
        }
        if(favoritesOnly) {
            try{
                const response = await axios.get('http://localhost:3000/users/favorites', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    },
                });
                console.log(response.data);
                filteredList = filteredList.filter(scholarship => response.data.includes(scholarship._id));
            }catch(error) {
                console.error('Error fetching favorites:', error);
            }
        }

        console.log(filteredList);
        applyFilters(filteredList);
        setFiltered(true);
        closeSidebar();
    };

    return(
        <div className="min-h-screen w-full text-black bg-background dark:bg-dark-background">
            <div className="filter dark:text-white">
                <h2>Filter Scholarships</h2>
                <p>Adjust the filters to refine your scholarship search</p>
                <div className="bg-background dark:bg-dark-background">
                    <h5>Location</h5>
                    <Select
                            value={location}
                            onValueChange={setLocation}
                        >
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {locations.map(location => (
                                    <SelectItem value={location}>{location}</SelectItem>
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
                {user_id !== null && <div style={{ display: 'flex', marginTop: '1.5rem' }}>
                    <Checkbox onChange={(e) => {setFavoritesOnly(e.target.checked); console.log(favoritesOnly)}} />
                    <span>Display Favorites Only</span>
                </div>}
                <div className="button bg-background dark:bg-dark-background">
                    <Button onClick={handleFilters} className="dark:text-white">Apply Filters</Button>
                </div>
            </div>
        </div>
    );
};

export default FilterSideBar;