import { useEffect, useState } from "react";

import { Scholarship } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import {
  getScholarshipLocations,
  getScholarshipsByDeadline,
  getScholarshipsByLocation,
} from "@/services/scholarshipService";
import { getFavorites } from "@/services/userService";
import { verifyToken } from "@/services/authService";

import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "../styles/FilterSideBar.css";

interface FilterSideBarProps {
  filteredScholarships: Scholarship[];
  setFiltered: (filtered: boolean) => void;
  applyFilters: (filteredScholarships: Scholarship[]) => void;
  closeSidebar: () => void;
  setNoResultsMessage: (message: string) => void;
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({
  filteredScholarships,
  setFiltered,
  applyFilters,
  closeSidebar,
  setNoResultsMessage,
}) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getScholarshipLocations();
        console.log(response);
        const data: string[] = response;
        const uniqueLocations = [...new Set(data)];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await verifyToken();
        console.log(response);
        setLoggedIn(true);
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    checkLoggedIn();
  }, []);

  const handleFilters = async () => {
    console.log(location, deadline);
    let filteredList = [...filteredScholarships];
    console.log(filteredList);

    if (deadline != null) {
      const date = deadline.toISOString().split("T")[0];
      const response = await getScholarshipsByDeadline(date);
      console.log(response);

      if (response.length === 0) {
        toast({
          description: "No scholarships found with the specified deadline.",
          duration: 2000,
          variant: "default",
        });
        setNoResultsMessage(
          "No scholarships found with the specified deadline."
        );
        filteredList = [];
      } else {
       
        filteredList = filteredList.filter((scholarship) =>
          response.some((res:any) => res._id === scholarship._id)
        );
      }
    }

    if (location != "all" && location != "") {
      const response = await getScholarshipsByLocation(location);
      console.log(response);

      if (response.length === 0) {
        toast({
          description: "No scholarships found in the specified location.",
          duration: 2000,
          variant: "default",
        });
        setNoResultsMessage("No scholarships found in the specified location.");
        filteredList = []; 
      } else {
        filteredList = filteredList.filter((scholarship) =>
          response.some((res:any) => res._id === scholarship._id)
        );
      }
    }

    if (favoritesOnly) {
      try {
        const response = await getFavorites();
        console.log(response.data);

       
        filteredList = filteredList.filter((scholarship) =>
          response.data.includes(scholarship._id)
        );
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }

    console.log(filteredList);
    applyFilters(filteredList);
    setFiltered(true);
    closeSidebar();
  };

  return (
    <div className="min-h-screen w-full text-black bg-background dark:bg-dark-background">
      <div className="filter dark:text-white">
        <h2>Filter Scholarships</h2>
        <p>Adjust the filters to refine your scholarship search</p>
        <div className="bg-background dark:bg-dark-background">
          <h5>Location</h5>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {locations.map((location) => (
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
        {loggedIn && (
          <div style={{ display: "flex", marginTop: "1.5rem" }}>
            <Checkbox
              onChange={(e) => {
                setFavoritesOnly(e.target.checked);
                console.log(favoritesOnly);
              }}
            />
            <span>Display Favorites Only</span>
          </div>
        )}
        <div className="button bg-background dark:bg-dark-background">
          <Button onClick={handleFilters} className="dark:text-white">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
