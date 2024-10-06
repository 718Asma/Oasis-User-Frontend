import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const Scholarship = () => {
    const navigate = useNavigate();
    const { scholarshipId } = useParams<{ scholarshipId: string }>();
    
    return (
        <div>
            {/* <Header /> */}
            <p>Scholarship ID: {scholarshipId}</p>
        </div>
    );
};

export default Scholarship;