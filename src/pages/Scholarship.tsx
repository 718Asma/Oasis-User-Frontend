import Header from "@/components/functional/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Criteria, Scholarship } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Clock, Globe, GraduationCap, PersonStanding, School } from "lucide-react";


const ScholarshipPage = () => {
    // const navigate = useNavigate();
    const { scholarshipId } = useParams<{ scholarshipId: string }>();
    const [scholarship, setScholarship] = useState<Scholarship | null>(null);

    const fetchScholarship = async (scholarshipId: string | undefined) => {
        if (!scholarshipId) {
            console.error("No scholarship ID found");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/scholarships/id/${scholarshipId}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ID: ${scholarshipId}`);
            }
    
            const scholarshipData = await response.json();
            const parsedCriteria = scholarshipData.criteria ? JSON.parse(scholarshipData.criteria) : null;
            
    
            const criteria: Criteria = {
                Non_US: parsedCriteria ? parsedCriteria["Non-U.S. Citizens Eligible"] : null,
                GPA: parsedCriteria ? parsedCriteria["GPA"] : null,
                Accredited_University: parsedCriteria ?  parsedCriteria["Accredited University Required"] : null,
                Minimum_Age: parsedCriteria ? parsedCriteria["Minimum Age"] : null
            };
    
            const formattedScholarship: Scholarship = {
                ...scholarshipData,
                criteria: criteria,
            };
    
            console.log("Formatted Scholarship:", formattedScholarship);
            setScholarship(formattedScholarship);
    
        } catch (error) {
            console.error('Error fetching scholarship:', error);
        }
    };

    useEffect(() => {
        fetchScholarship(scholarshipId);
    }, [scholarshipId]);
    
    return (
        <div>
            <Header />
            {
                scholarship ? (
                    <section style={{ padding: '5vh' }}>
                        <center>
                            <h1 className="text-4xl font-bold mb-8">{scholarship.title}</h1>
                            {/* <p></p> */}
                        </center>
                        <Card style={{ marginTop: '5vh', marginLeft: '15vh', marginRight: '15vh', padding: '25px' }}>
                            <div>
                                <h3>Description</h3>
                                <p style={{ textAlign: 'justify' }}>{scholarship.description}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent:'space-between', marginTop: '5vh' }}>
                                <div>
                                    <h3>Award Amount</h3>
                                    <h5 style={{ color: 'green' }}>{scholarship.reward}</h5>
                                </div>
                                <div>
                                    <h3>Number of Awards</h3>
                                    <h5 style={{ color: 'blue' }}>{scholarship.amount}</h5>
                                </div>
                            </div>
                        </Card>
                        {scholarship.criteria && 
                            <Card style={{ marginTop: '5vh', marginLeft: '15vh', marginRight: '15vh', padding: '25px' }}>
                                <h3 style={{ marginBottom: '5vh' }}>Eligibilty Criteria</h3>
                                {scholarship.criteria.GPA != undefined ?
                                    (
                                        <div style={{ display: 'flex', color: 'grey' }}>
                                            <GraduationCap size={20} />&nbsp;
                                            <p>Minimum GPA of {scholarship.criteria.GPA} or equivalent</p>
                                        </div>
                                    ) : null
                                }
                                {scholarship.criteria.Non_US != undefined ?
                                    (
                                        <div style={{ display: 'flex', color: 'grey' }}>
                                            <Globe size={20} />&nbsp;
                                            {
                                                scholarship.criteria.Non_US.toLowerCase() == 'yes' ? (
                                                    <p>US citizenship required</p>
                                                ) : (
                                                    <p>US citizenship not required</p>
                                                )
                                            }
                                        </div>
                                    ) : null
                                }
                                {scholarship.criteria.Accredited_University != undefined ?
                                    (
                                        <div style={{ display: 'flex', color: 'grey' }}>
                                            <School size={20} />&nbsp;
                                            {
                                                scholarship.criteria.Accredited_University.toLowerCase() == 'yes' ? (
                                                    <p>Accredited University required</p>
                                                ) : (
                                                    <p>Accredited University not required</p>
                                                )
                                            }
                                        </div>
                                    ) : null
                                }
                                {scholarship.criteria.Minimum_Age != undefined ?
                                    (
                                        <div style={{ display: 'flex', color: 'grey' }}>
                                            <PersonStanding size={20} />&nbsp;
                                            <p>Minimum age of {scholarship.criteria.Minimum_Age} years</p>
                                        </div>
                                    ) : null
                                }
                            </Card>
                        }
                        <Card style={{ marginTop: '5vh', marginLeft: '15vh', marginRight: '15vh', padding: '25px' }}>
                            <h3>Important Dates</h3>
                            <div style={{ display: 'flex', justifyContent:'space-between', marginTop: '5vh' }}>
                                <div style={{ display: 'flex', color: 'grey' }}>
                                    <Clock size={20} />&nbsp;
                                    <p>Application Deadline</p>
                                </div>
                                <p style={{ color: 'red' }}>{scholarship.deadline}</p>
                            </div>
                            {/* <div style={{ display: 'flex', justifyContent:'space-between', marginTop: '5vh' }}>
                                <div style={{ display: 'flex', color: 'grey' }}>
                                    <Calendar size={20} />&nbsp;
                                    <p>Program Start Date</p>
                                </div>
                                <p style={{ color: 'black' }}>{scholarship.deadline}</p>
                            </div> */}
                        </Card>
                        <center>
                            <a
                                href={scholarship.url}
                                className="btn"
                                style={{ marginTop: '5vh', backgroundColor: 'green', color: 'white', fontWeight: 'bold', padding: '10px 20px', borderRadius: '50px' }}
                            >
                                Apply now
                            </a>
                        </center>
                    </section>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    );
};

export default ScholarshipPage;