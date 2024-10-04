import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Loader2,
    CheckCircle,
    XCircle,
    Search,
    BookMarked,
} from "lucide-react";

import { Activity, Scholarship } from "@/lib/types";
import StatsCard from "@/components/functional/StatsCard";
import ScholarshipComponent from "@/components/functional/ScholarshipCard";
import ActivityLog from "@/components/functional/Activity";

export default function Dashboard() {
    const [isScraping, setIsScraping] = useState(false);
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [filteredScholarships, setFilteredScholarships] = useState<
        Scholarship[]
    >([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [confirmationDialog, setConfirmationDialog] = useState<{
        isOpen: boolean;
        scholarshipId: string | null;
        action: "approve" | "reject" | null;
    }>({ isOpen: false, scholarshipId: null, action: null });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCriteria, setFilterCriteria] = useState("all");

    useEffect(() => {
        filterScholarships();
    }, [scholarships, searchTerm, filterCriteria]);

    const startScraping = () => {
        setIsScraping(true);
        // Simulating scraping process
        setTimeout(() => {
            const newScholarships: Scholarship[] = [
                {
                    id: "1",
                    title: "STEM Excellence Scholarship",
                    description:
                        "For outstanding students in Science, Technology, Engineering, and Mathematics fields.",
                    eligibility:
                        "Undergraduate students with a GPA of 3.5 or higher",
                    deadline: "2024-05-01",
                    location: "United States",
                    provider: "National Science Foundation",
                    startDate: "2024-01-15",
                    imageUrl:
                        "https://g-7eitpa0y6bf.vusercontent.net/placeholder.svg?height=100&width=200",
                    status: "pending",
                },
                {
                    id: "2",
                    title: "Global Leadership Grant",
                    description:
                        "Supporting future leaders with a passion for international relations and global issues.",
                    eligibility:
                        "Graduate students with demonstrated leadership experience",
                    deadline: "2024-06-15",
                    location: "Worldwide",
                    provider: "International Leadership Foundation",
                    startDate: "2024-02-01",
                    imageUrl:
                        "https://g-7eitpa0y6bf.vusercontent.net/placeholder.svg?height=100&width=200",
                    status: "pending",
                },
                {
                    id: "3",
                    title: "Creative Arts Fellowship",
                    description:
                        "Empowering emerging artists to pursue their creative passions and contribute to the arts community.",
                    eligibility:
                        "Students majoring in visual arts, music, or performing arts",
                    deadline: "2024-04-30",
                    location: "Europe",
                    provider: "European Arts Council",
                    startDate: "2024-03-01",
                    imageUrl:
                        "https://g-7eitpa0y6bf.vusercontent.net/placeholder.svg?height=100&width=200",
                    status: "pending",
                },
            ];
            setScholarships((prevScholarships) => [
                ...prevScholarships,
                ...newScholarships,
            ]);
            setIsScraping(false);
            addActivity("Scraped 3 new scholarships");
        }, 2000);
    };

    const handleAction = (
        scholarshipId: string,
        action: "approve" | "reject"
    ) => {
        setConfirmationDialog({ isOpen: true, scholarshipId, action });
    };

    const confirmAction = () => {
        if (confirmationDialog.action && confirmationDialog.scholarshipId) {
            setScholarships((prevScholarships) =>
                prevScholarships.map((s) =>
                    s.id === confirmationDialog.scholarshipId
                        ? {
                              ...s,
                              status:
                                  confirmationDialog.action === "approve"
                                      ? "approved"
                                      : "rejected",
                          }
                        : s
                )
            );
            const scholarship = scholarships.find(
                (s) => s.id === confirmationDialog.scholarshipId
            );
            addActivity(
                `${
                    confirmationDialog.action === "approve"
                        ? "Approved"
                        : "Rejected"
                } scholarship: ${scholarship?.title}`
            );
        }
        setConfirmationDialog({
            isOpen: false,
            scholarshipId: null,
            action: null,
        });
    };

    const addActivity = (action: string) => {
        const newActivity: Activity = {
            id: Date.now().toString(),
            action,
            scholarshipTitle: "",
            timestamp: new Date().toISOString(),
        };
        setActivities((prevActivities) => [
            newActivity,
            ...prevActivities.slice(0, 9),
        ]);
    };

    const filterScholarships = () => {
        let filtered = scholarships;
        if (searchTerm) {
            filtered = filtered.filter(
                (s) =>
                    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.provider.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterCriteria !== "all") {
            filtered = filtered.filter((s) => s.status === filterCriteria);
        }
        setFilteredScholarships(filtered);
    };

    const stats = {
        total: scholarships.length,
        approved: scholarships.filter((s) => s.status === "approved").length,
        rejected: scholarships.filter((s) => s.status === "rejected").length,
    };

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Scholarship Management Dashboard
            </h1>

            {/* Statistics Block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatsCard
                    title="Total Scholarships"
                    value={stats.total}
                    icon={
                        <BookMarked className="h-4 w-4 text-muted-foreground" />
                    }
                />

                <StatsCard
                    title="Approved"
                    value={stats.approved}
                    icon={
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    }
                />

                <StatsCard
                    title="Rejected"
                    value={stats.rejected}
                    icon={<XCircle className="h-4 w-4 text-muted-foreground" />}
                />
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search scholarships..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <Select
                    value={filterCriteria}
                    onValueChange={setFilterCriteria}
                >
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    onClick={startScraping}
                    disabled={isScraping}
                    className="bg-primary hover:bg-primary/90 text-white"
                >
                    {isScraping ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Scraping...
                        </>
                    ) : (
                        "Start Scraping"
                    )}
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Scholarships Grid */}
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">
                        Scholarships
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredScholarships.map((scholarship) => (
                            <ScholarshipComponent
                                key={scholarship.id}
                                handleAction={handleAction}
                                {...scholarship}
                            />
                        ))}
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="w-full lg:w-80">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px]">
                                {activities.map((activity) => (
                                    <ActivityLog
                                        key={activity.id}
                                        {...activity}
                                    />
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmationDialog.isOpen}
                onOpenChange={() =>
                    setConfirmationDialog({
                        isOpen: false,
                        scholarshipId: null,
                        action: null,
                    })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Action</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to {confirmationDialog.action}{" "}
                            this scholarship? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setConfirmationDialog({
                                    isOpen: false,
                                    scholarshipId: null,
                                    action: null,
                                })
                            }
                        >
                            Cancel
                        </Button>
                        <Button onClick={confirmAction}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
