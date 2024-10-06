import { useState } from "react";
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


interface FilterSideBarProps {
    filteredScholarships: Scholarship[],
    setFiltered: (filtered: boolean) => void;
    applyFilters: (filteredScholarships: Scholarship[]) => void;
    closeSidebar: () => void;
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({ filteredScholarships, setFiltered, applyFilters, closeSidebar }) => {
    const [location, setLocation] = useState<string>('');
    const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
    const [levelOfEducation, setLevelOfEducation] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [minAge, setMinAge] = useState<number>(0);
    const [value, setValue] = useState<number>(0);

    const handleFilters = () => {
        console.log(filteredScholarships);
        console.log(location, fieldOfStudy, levelOfEducation, country, minAge, value);
        let filteredList = [...filteredScholarships];
        console.log(filteredList);

        if(location != 'all' && location != '') {
            filteredList = filteredList.filter(scholarship => scholarship.location == location);
        }
        if(fieldOfStudy != 'all' && fieldOfStudy != '') {
            filteredList = filteredList.filter(scholarship => scholarship.fieldOfStudy == fieldOfStudy);
        }
        if(levelOfEducation != 'all' && levelOfEducation != '') {
            filteredList = filteredList.filter(scholarship => scholarship.levelOfEducation == levelOfEducation);
        }
        if(country != 'all' && country != '') {
            filteredList = filteredList.filter(scholarship => scholarship.country == country);
        }
        filteredList = filteredList.filter(scholarship => scholarship.minAge >= minAge);
        filteredList = filteredList.filter(scholarship => scholarship.value >= value);

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
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Worldwide">Worldwide</SelectItem>
                            <SelectItem value="Europe">Europe</SelectItem>
                        </SelectContent>
                    </Select>
            </div>
            <div>
                <h5>Field Of Study</h5>
                <Select
                        value={fieldOfStudy}
                        onValueChange={setFieldOfStudy}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Field" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="STEM">STEM</SelectItem>
                            <SelectItem value="International Relations">International Relations</SelectItem>
                            <SelectItem value="Creative Arts">Creative Arts</SelectItem>
                        </SelectContent>
                    </Select>
            </div>
            <div>
                <h5>Level Of Education</h5>
                <Select
                        value={levelOfEducation}
                        onValueChange={setLevelOfEducation}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                            <SelectItem value="Masters">Masters</SelectItem>
                        </SelectContent>
                    </Select>
            </div>
            <div>
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
            </div>
            <div className="button">
                <Button onClick={handleFilters}>Apply Filters</Button>
            </div>
        </div>
    );
};

export default FilterSideBar;