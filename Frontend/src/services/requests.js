    // Example using fetch in a React component
    import React, { useEffect, useState } from 'react';

    function MyComponent() {
        const [data, setData] = useState([]);

        useEffect(() => {
            fetch('http://localhost:8080/api/mydata') // Replace with your Spring Boot API URL
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching data:', error));
        }, []);

        return (
            <div>
                {/* Render your data */}
            </div>
        );
    }

    export default MyComponent;