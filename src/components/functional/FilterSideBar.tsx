import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
// import { Slider } from "../ui/slider";

import "../styles/FilterSideBar.css";
import { Button } from "../ui/button";
import { Scholarship } from "@/lib/types";
import { DateInput } from "../ui/date-input";
import { Slider } from "../ui/slider";
import axios from "axios";


interface FilterSideBarProps {
    filteredScholarships: Scholarship[],
    setFiltered: (filtered: boolean) => void;
    applyFilters: (filteredScholarships: Scholarship[]) => void;
    closeSidebar: () => void;
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({ filteredScholarships, setFiltered, applyFilters, closeSidebar }) => {
    const [locations, setLocations] = useState<string[]>([]);
    const [order, setOrder] = useState<string>('none');
    const [location, setLocation] = useState<string>('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [reward, setReward] = useState<number>(0);
    const access_token = localStorage.getItem("access_token");

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

    const handleFilters = async () => {
        console.log(order, location, deadline, reward);
        let filteredList = [...filteredScholarships];
        console.log(filteredList);

        if(location != 'all' && location != '') {
            try {
                const response = await axios.get(`http://localhost:3000/scholarships/location/${location}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    },
                });
                
                console.log('Response: ', response.data);
                filteredList = response.data;
            } catch (error) {
                console.error('Error fetching scholarships:', error);
            }
        }
        if(reward != 0) {
            filteredList = filteredList.filter(
                (scholarship) => {
                        console.log(scholarship.reward);
                        if(scholarship.reward != 'Award Varies' && scholarship.reward != 'N/A') {
                            if(scholarship.reward.includes('-'))
                            {
                                let rewardRange = scholarship.reward.split('-');
                                let minReward = parseInt(rewardRange[0].replace(/[^0-9]/g, ''));
                                let maxReward = parseInt(rewardRange[1].replace(/[^0-9]/g, ''));
                                return reward >= minReward && reward <= maxReward;
                            }
                            else
                            {
                                let scholarshipReward = parseInt(scholarship.reward.replace(/[^0-9]/g, ''));
                                return scholarshipReward == reward;
                            }
                        }
                    return false;
                }
            );
        }
        if(deadline != null) {
            try {
                if (!(deadline instanceof Date)) {
                    throw new Error('Invalid Date');
                }
                
                let date = deadline.toISOString().split('T')[0];
                
                const response = await axios.get(`http://localhost:3000/scholarships/deadline/${date}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    },
                });
            
                console.log('Response:', response.data);
                filteredList = response.data;
                
            } catch (error: any) {
                // Handle 404 and 400 errors, or log others
                if (error.response && error.response.status === 404) {
                    console.error('No scholarships found with the specified deadline.');
                } else if (error.response && error.response.status === 400) {
                    console.error('Invalid date format. Use YYYY-MM-DD.');
                } else if (error.message === 'Invalid Date') {
                    console.error('Provided date is invalid.');
                } else {
                    console.error('Error fetching scholarships:', error);
                }
            }

            // filteredList = filteredList.filter(scholarship => {
            //     const scholarshipDeadline = new Date(scholarship.deadline);
    
            //     return (
            //         scholarshipDeadline.getFullYear() === deadline.getFullYear() &&
            //         scholarshipDeadline.getMonth() === deadline.getMonth() &&
            //         scholarshipDeadline.getDate() === deadline.getDate()
            //     );
            // });
        }
        if(order != 'none') {
            switch(order) {
                case 'newestDeadline':
                    filteredList.sort((a, b) => {
                        const dateA = new Date(a.deadline);
                        const dateB = new Date(b.deadline);
                        return dateA.getTime() - dateB.getTime();
                    });
                    console.log(filteredList);
                    break;
                case 'oldestDeadline':
                    filteredList.sort((a, b) => {
                        const dateA = new Date(a.deadline);
                        const dateB = new Date(b.deadline);
                        return dateB.getTime() - dateA.getTime();
                    });
                    console.log(filteredList);
                    break;
                    case 'highestReward':
                        filteredList.sort((a, b) => {
                            const rewardA = parseInt(a.reward.replace(/[^0-9]/g, '')) || 0;
                            const rewardB = parseInt(b.reward.replace(/[^0-9]/g, '')) || 0;
                            return rewardB - rewardA;
                        });
                        break;
                    
                    case 'lowestReward':
                        filteredList.sort((a, b) => {
                            const rewardA = parseInt(a.reward.replace(/[^0-9]/g, '')) || 0;
                            const rewardB = parseInt(b.reward.replace(/[^0-9]/g, '')) || 0;
                            return rewardA - rewardB;
                        });
                        break;
            }
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
                <h4>Sort</h4>
                <Select
                    value={order}
                    onValueChange={setOrder}
                >
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Order By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="newestDeadline">Deadline ↑ </SelectItem>
                        <SelectItem value="oldestDeadline">Deadline ↓ </SelectItem>
                        <SelectItem value="highestReward">Reward ↑ </SelectItem>
                        <SelectItem value="lowestReward">Reward ↓ </SelectItem>
                    </SelectContent>
                </Select>
            </div>
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
                <h5>Reward</h5>
                <Slider
                    variant="default"
                    min={0}
                    max={50000}
                    step={1}
                    value={reward}
                    onChange={(e) => setReward(Number(e.target.value))}
                />
                <div className="values">
                    <span className="text-sm text-gray-500">$0</span>
                    <span className="text-sm text-gray-500">$50 000</span>
                </div>
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