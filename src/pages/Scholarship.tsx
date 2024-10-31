import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Scholarship } from "@/lib/types";
import { getScholarshipById } from '../services/scholarshipService';

import Header from "@/components/functional/Header";
import { Card } from "@/components/ui/card";

import { ArrowLeft, Clock } from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";


const ScholarshipPage = () => {
    const { scholarshipId } = useParams<{ scholarshipId: string }>();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState<Scholarship | null>(null);
    

    const handleGoBack = () => {
        navigate(-1);
    };

    const fetchScholarship = async (scholarshipId: string | undefined) => {
        if (!scholarshipId) {
            console.error("No scholarship ID found");
            return;
        }
    
        try
        {
            const data = await getScholarshipById(scholarshipId);
            console.log("Response:", data);
            setScholarship(data);
    
        } catch (error) {
            console.error('Error fetching scholarship:', error);
        }
    };

    useEffect(() => {
        fetchScholarship(scholarshipId);
    }, [scholarshipId]);
    
    return (
        <div className="bg-background dark:bg-dark-background">
            <Header />
            {
                scholarship ? (
                    <section style={{ padding: '5vh' }}>
                        <button onClick={handleGoBack}>
                            <ArrowLeft
                                style={{ color: "#2b79c2", position:"fixed", top:"16%", left:"5.7%"  }}
                            />
                        </button>
                        <div style={{ width: '100vh', marginLeft: 'auto', marginRight: 'auto', marginBottom: '10vh', textAlign: 'center' }}>
                            <h1 className="text-4xl font-bold mb-8">{scholarship.title}</h1>
                        </div>
                        <Card style={{ marginTop: '5vh', marginLeft: '15vh', marginRight: '15vh', padding: '25px' }}>
                            <div>
                                <h3>Description</h3>
                                <p style={{ textAlign: 'justify', marginLeft: '1.5rem' }}>{scholarship.description}</p>
                            </div>
                        </Card>
                        { scholarship.benefits && scholarship.benefits.length > 0 && scholarship.benefits[0] != 'N/A' &&
                            <Card style={{ marginTop: '5vh', marginLeft: '15vh', marginRight: '15vh', padding: '25px' }}>
                                <div>
                                    <h3>Benefits</h3>
                                    <ul>
                                        {scholarship.benefits.map((benefit, index) => (
                                            <li key={index} style={{ listStyleType: 'disc' }}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        }
                        { scholarship.criteria && scholarship.criteria.length > 0 && scholarship.criteria[0] != 'N/A' &&
                            <Card style={{ marginTop: '5vh', marginLeft: '15vh', marginRight: '15vh', padding: '25px' }}>
                                <div>
                                    <h3>Criteria</h3>
                                    <ul>
                                        {scholarship.criteria.map((criteria, index) => (
                                            <li key={index} style={{ listStyleType: 'disc' }}>{criteria}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        }
                        { scholarship.documents && scholarship.documents.length > 0 && scholarship.documents[0] != 'N/A' &&
                            <Card style={{ marginTop: '5vh', marginLeft: '15vh', marginRight: '15vh', padding: '25px' }}>
                                <div>
                                    <h3>Documents</h3>
                                    <ul>
                                        {scholarship.documents.map((document, index) => (
                                            <li key={index} style={{ listStyleType: 'disc' }}>{document}</li>
                                        ))}
                                    </ul>
                                </div>
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
                    <div style={{ display: 'flex', marginLeft: '50%' }}>
                          <LoadingOutlined style={{ fontSize: '5rem', color: '#2b79c2' }} />
                    </div>
                )
            }
        </div>
    );
};

export default ScholarshipPage;