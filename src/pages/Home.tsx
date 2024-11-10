import { useState, useEffect, useRef } from "react";

import { Scholarship } from "@/lib/types";
import {
    getScholarships,
    searchScholarshipsByName,
} from "../services/scholarshipService";

import ScholarshipComponent from "@/components/functional/ScholarshipCard";
import FilterSideBar from "@/components/functional/FilterSideBar";
import Header from "@/components/functional/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Menu, Search, X } from "lucide-react";
import Hero from "@/components/functional/Hero";

export default function Home() {
    const [allScholarships, setAllScholarships] = useState<Scholarship[]>([]);
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [noResultsMessage, setNoResultsMessage] = useState<string>("");
    const [opened, setOpened] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);
    const [filtered, setFiltered] = useState<boolean>(false);
    
    // Create a ref for the search section
    const searchSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const data = await getScholarships();

                console.log("Scholarships:", data);
                setAllScholarships(data);
                setScholarships(data);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
            }
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
        if (searchTerm.trim()) {
            setSearched(true);
            try {
                const data = await searchScholarshipsByName(searchTerm);

                setScholarships(data);
                setNoResultsMessage("");
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    setScholarships([]);
                    setNoResultsMessage(
                        "No scholarships found for the search term."
                    );
                } else {
                    setNoResultsMessage("An error occurred. Please try again.");
                }
            }
        } else {
            setScholarships(allScholarships);
            setNoResultsMessage("");
        }
    };

    const clear = () => {
        setSearchTerm("");
        setScholarships(allScholarships);
        setSearched(false);
        setFiltered(false);
    };

    // Function to scroll to search section
    const scrollToSearchSection = () => {
        console.log("Scrolling to search section");
        searchSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen w-full bg-background dark:bg-dark-background">
            <Header />
            <Hero scrollToSearch={scrollToSearchSection} />
            <div className="container mx-auto p-4 max-w-7xl dark:bg-black">
                <div ref={searchSectionRef} className="flex flex-col md:flex-row gap-4 mb-8 dark:bg-black mt-8">
                    <div className="flex-1">
                        <div className="relative">
                            <Input
                                placeholder="Search scholarships..."
                                className="pl-8 dark:text-white mb-8"
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
                    <Menu
                        onClick={toggleSidebar}
                        className="w-8 h-8 ml-2"
                        style={{
                            color: "#2b79c2",
                            cursor: "pointer",
                            marginTop: "3px",
                        }}
                    />
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
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
                        )}
                    </div>
                </div>

                {opened && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10">
                        <div className="fixed right-0 top-0 w-[75vw] max-w-[500px] h-full bg-white dark:bg-dark-background shadow-lg z-20 overflow-x-hidden">
                            <X
                                onClick={toggleSidebar}
                                className="w-6 h-6 absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-800"
                            />
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
        </div>
    );
}
