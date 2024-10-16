import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Scholarship } from "@/lib/types";
import ScholarshipComponent from "@/components/functional/ScholarshipCard";
import Header from "@/components/functional/Header";
import { Input } from "@/components/ui/input";
import { Menu, Search, X } from "lucide-react";
import FilterSideBar from "@/components/functional/FilterSideBar";
import axios from "axios";

export default function Home() {
    const [allScholarships, setAllScholarships] = useState<Scholarship[]>([]);
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [noResultsMessage, setNoResultsMessage] = useState<string>("");
    const [opened, setOpened] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);
    const [filtered, setFiltered] = useState<boolean>(false);
    const access_token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchScholarships = async () => {
            fetch("http://localhost:3000/scholarships/")
                .then((response) => response.json())
                .then((data) => {
                    const scholarshipsData: Scholarship[] = data.map(
                        (scholarship: any) => {
                            let parsedCriteria = null;
                            if (scholarship.criteria) {
                                parsedCriteria =
                                    typeof scholarship.criteria === "string"
                                        ? JSON.parse(scholarship.criteria)
                                        : scholarship.criteria;
                            }

                            return {
                                ...scholarship,
                                criteria: {
                                    Non_US:
                                        parsedCriteria?.[
                                            "Non-U.S. Citizens Eligible"
                                        ] || null,
                                    GPA: parsedCriteria?.["GPA"] || null,
                                    Accredited_University:
                                        parsedCriteria?.[
                                            "Accredited University Required"
                                        ] || null,
                                    Minimum_Age:
                                        parsedCriteria?.["Minimum Age"] || null,
                                },
                            };
                        }
                    );
                    console.log("Scholarships:", scholarshipsData);
                    setAllScholarships(scholarshipsData);
                    setScholarships(scholarshipsData);
                })
                .catch((error) => {
                    console.error("Error fetching scholarships:", error);
                });
        };

        fetchScholarships();
    }, []);

    // useEffect(() => {
    //     handleSearch();
    // }, [scholarships, searchTerm, allScholarships]);

    const toggleSidebar = () => {
        setOpened(!opened);
    };

    const handleSearch = async () => {
        if (searchTerm) {
            setSearched(true);
            try {
                const response = await axios.get(`http://localhost:3000/scholarships/search?name=${searchTerm}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    },
                });
    
                setScholarships(response.data);
                setNoResultsMessage("");
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    setScholarships([]);
                    setNoResultsMessage("No scholarships found for the search term.");
                } else {
                    console.error("Error searching scholarships:", error);
                    setNoResultsMessage("An error occurred while searching. Please try again.");
                }
            }
        }
    };
    

    const clear = () => {
        setSearchTerm("");
        setScholarships(allScholarships);
        setSearched(false);
        setFiltered(false);
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-4 max-w-7xl">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1">
                        <div className="relative">
                            <Input
                                placeholder="Search scholarships..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        onClick={handleSearch}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        <Search className="w-4 h-4 mr-2" strokeWidth={4} />
                        Search
                    </Button>
                    {searched || filtered ? (
                        <Button
                            onClick={clear}
                            className="bg-primary hover:bg-primary/90 text-white"
                        >
                            <X />
                            Clear Filters
                        </Button>
                    ) : null}
                    <Button
                        onClick={toggleSidebar}
                        className="bg-primary hover:bg-primary/90 text-black bg-white hover:bg-gray-100"
                    >
                        <Menu
                            className="w-8 h-8 ml-2"
                            style={{ color: "#0d6efd" }}
                        />
                    </Button>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-4">
                            Scholarships
                        </h2>
                        {scholarships.length !== 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {scholarships.map((scholarship) => (
                                    <ScholarshipComponent
                                        scholarship={scholarship}
                                        key={scholarship._id}
                                        {...scholarship}
                                    />
                                ))}
                            </div>
                            ) : (
                                <div className="text-center text-lg text-gray-500">
                                    {noResultsMessage}
                                </div>
                            )
                        }
                    </div>
                </div>

                {opened && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10">
                        <div className="fixed right-0 top-0 w-[75vw] max-w-[500px] h-full bg-white shadow-lg z-20 overflow-x-hidden">
                            <Button
                                onClick={toggleSidebar}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-100"
                            >
                                <X className="w-6 h-6" />
                            </Button>
                            <FilterSideBar
                                filteredScholarships={allScholarships}
                                setFiltered={setFiltered}
                                applyFilters={setScholarships}
                                closeSidebar={toggleSidebar}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}