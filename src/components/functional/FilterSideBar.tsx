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
import { Slider } from "../ui/slider";


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

    useEffect(() => {
        fetch('http://localhost:3000/scholarships/locations')
                .then(response => response.json())
                .then((data: string[]) => {
                    let locations: string[] = data;
                    const uniqueLocations = [...new Set(locations)];
                    setLocations(uniqueLocations);
                })
                .catch(error => {
                    console.error('Error fetching scholarships:', error);
                });
    }, []);

    const handleFilters = () => {
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

        console.log(filteredList);
        applyFilters(filteredList);
        setFiltered(true);
        closeSidebar();
    };

    return(
        <div className="filter">
            <h2>Filter Scholarships</h2>
            <p>Adjust the filters to refine your scholarship search</p>
            <div>
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
            <div>
                <h5>Deadline</h5>
                <DateInput
                    value={deadline}
                    onChange={(e) => {
                        const { value } = e.target;
                        setDeadline(value ? new Date(value) : null);
                    }}
                />
            </div>
            <div className="button">
                <Button onClick={handleFilters}>Apply Filters</Button>
            </div>
        </div>

    );
};

export default FilterSideBar;