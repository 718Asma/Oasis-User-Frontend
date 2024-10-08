import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "../ui/slider";

import "../styles/FilterSideBar.css";
import { Button } from "../ui/button";
import { Scholarship } from "@/lib/types";
import { DateInput } from "../ui/date-input";


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
    const [provider, setProvider] = useState<string>('');

    useEffect(() => {
        fetch('http://localhost:3000/scholarships/locations')
                .then(response => response.json())
                .then((data: string[]) => {
                    console.log(data);
                    let locations: string[] = data;
                    const uniqueLocations = [...new Set(locations)];
                    setLocations(uniqueLocations);
                })
                .catch(error => {
                    console.error('Error fetching scholarships:', error);
                });
    });

    const handleFilters = () => {
        console.log(filteredScholarships);
        console.log(location, deadline, provider);
        let filteredList = [...filteredScholarships];
        console.log(filteredList);

        if(location != 'all' && location != '') {
            filteredList = filteredList.filter(scholarship => scholarship.location == location);
        }
        if(provider != 'all' && provider != '') {
            filteredList = filteredList.filter(scholarship => scholarship.provider == provider);
        }
        if(deadline != null) {
            filteredList = filteredList.filter(scholarship => {
                const scholarshipDeadline = new Date(scholarship.deadline);
                console.log('Scholarship Deadline: ' + scholarshipDeadline.toISOString());
                console.log('Selected Deadline: ' + deadline.toISOString());
    
                return (
                    scholarshipDeadline.getFullYear() === deadline.getFullYear() &&
                    scholarshipDeadline.getMonth() === deadline.getMonth() &&
                    scholarshipDeadline.getDate() === deadline.getDate()
                );
            });
            console.log(filteredList);
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
                <h5>Provider</h5>
                <Select
                        value={provider}
                        onValueChange={setProvider}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="National Science Foundation">National Science Foundation</SelectItem>
                            <SelectItem value="International Leadership Foundation">International Leadership Foundation</SelectItem>
                            <SelectItem value="European Arts Council">European Arts Council</SelectItem>
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
            {/*<div>
                <h5>Country</h5>
                <Select
                        value={country}
                        onValueChange={setCountry}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="Global">Global</SelectItem>
                            <SelectItem value="Various">Various</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                        </SelectContent>
                    </Select>
            </div>
            <div>
                <h5>Minimum Age</h5>
                    <Slider
                        variant="default"
                        min={0}
                        max={100}
                        step={1}
                        value={minAge}
                        onChange={(e) => setMinAge(Number(e.target.value))}
                    />
                <div className="values">
                    <span className="text-sm text-gray-500">0</span>
                    <span className="text-sm text-gray-500">100</span>
                </div>
            </div>
            <div>
                <h5>Amount</h5>
                    <Slider
                        variant="default"
                        min={0}
                        max={10000}
                        step={1}
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                    />
                <div className="values">
                    <span className="text-sm text-gray-500">$0</span>
                    <span className="text-sm text-gray-500">$10,000+</span>
                </div>
            </div>*/}
            <div className="button">
                <Button onClick={handleFilters}>Apply Filters</Button>
            </div>
        </div>

    );
};

export default FilterSideBar;