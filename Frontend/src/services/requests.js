    // Example using fetch in a React component
    import React, { useEffect, useState } from 'react';

    function MyComponent() {
        const [data, setData] = useState([]);

        const API_BASE = "http://FitPath.us-east-1.elasticbeanstalk.com";

        useEffect(() => {
        fetch(`${API_BASE}/api/mydata`)
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error("Error fetching data:", err));
        }, []);


        return (
            <div>
                {/* Render your data */}
            </div>
        );
    }

    export default MyComponent;