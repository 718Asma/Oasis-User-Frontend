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
        const scholarshipsData: Scholarship[] = [
            {
                id: "1",
                title: "STEM Excellence Scholarship",
                location: "United States",
                provider: "National Science Foundation",
                value: 1000,
                deadline: "2024-05-01",
                banner: "https://g-7eitpa0y6bf.vusercontent.net/placeholder.svg?height=100&width=200",
                description: "For outstanding students in Science, Technology, Engineering, and Mathematics fields.",
                applicationStartDate: new Date("2024-01-15"),
                country: "United States", 
                minAge: 18, 
                levelOfEducation: "Undergraduate", 
                fieldOfStudy: "STEM", 
            },
            {
                id: "2",
                title: "Global Leadership Grant",
                location: "Worldwide",
                provider: "International Leadership Foundation",
                value: 2000,
                deadline: "2024-06-15",
                banner: "https://g-7eitpa0y6bf.vusercontent.net/placeholder.svg?height=100&width=200",
                description: "Supporting future leaders with a passion for international relations and global issues.",
                applicationStartDate: new Date("2024-02-01"),
                country: "Global", 
                minAge: 21, 
                levelOfEducation: "Graduate", 
                fieldOfStudy: "International Relations", 
            },
            {
                id: "3",
                title: "Creative Arts Fellowship",
                location: "Europe",
                provider: "European Arts Council",
                value: 1500,
                deadline: "2024-04-30",
                banner: "https://g-7eitpa0y6bf.vusercontent.net/placeholder.svg?height=100&width=200",
                description: "Empowering emerging artists to pursue their creative passions and contribute to the arts community.",
                applicationStartDate: new Date("2024-03-01"),
                country: "Various", 
                minAge: 18, 
                levelOfEducation: "Undergraduate", 
                fieldOfStudy: "Creative Arts", 
            },
        ];
        
        setAllScholarships(scholarshipsData);
        setScholarships(scholarshipsData);
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
