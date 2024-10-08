import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";


import { Student , Scholarship } from "@/lib/types";
import ScholarshipComponent from "@/components/functional/ScholarshipCard";
import Header from "@/components/functional/Header";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import FilterSideBar from "@/components/functional/FilterSideBar";

export default function Home() {
    const [allScholarships, setAllScholarships] = useState<Scholarship[]>([]);
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [opened, setOpened] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);
    const [filtered, setFiltered] = useState<boolean>(false);

    useEffect(() => {
        const fetchScholarships = async () => { 
            let scholarshipsData: Scholarship[];

            fetch('http://localhost:3000/scholarships/all')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    scholarshipsData = data;
                    setAllScholarships(scholarshipsData);
                    setScholarships(scholarshipsData);
                })
                .catch(error => {
                    console.error('Error fetching scholarships:', error);
                });

            // try {
            //     const response = await fetch('http://localhost:3000/scholarships/all');
            //     console.log(response);
            //     // scholarshipsData = await response.json();
            //     // console.log(scholarshipsData);
        
            //     // setAllScholarships(scholarshipsData);
            //     // setScholarships(scholarshipsData);
                
            // } catch (error) {
            //     console.error('Error fetching scholarships:', error);
            // }
        }

        fetchScholarships();
    }, []);

    // useEffect(() => {
    //     handleSearch();
    // }, [scholarships, searchTerm, allScholarships]);

    const toggleSidebar = () => {
        setOpened(!opened);
    };


    const handleSearch = () => {
        if (searchTerm) {
            setSearched(true);
            const filtered = allScholarships.filter(
                (scholarship) => 
                    scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setScholarships(filtered);
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
                            {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" /> */}
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
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        Filter
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-4">
                            Scholarships
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {scholarships.map((scholarship) => (
                                <ScholarshipComponent
                                    scholarship={scholarship}
                                    key={scholarship.id}
                                    {...scholarship} />
                            ))}
                        </div>
                    </div>
                </div>

                {opened && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10">
                        <div className="fixed right-0 top-0 w-72 md:w-80 lg:w-[500px] h-full bg-white shadow-lg z-20">
                            <FilterSideBar
                                filteredScholarships={allScholarships}
                                setFiltered={setFiltered}
                                applyFilters={setScholarships} 
                                closeSidebar={toggleSidebar}
                            />
                            <Button onClick={toggleSidebar} className="m-4">
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
