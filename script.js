document.getElementById('business-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the page from refreshing

    // Collect form data
    const formData = {
        businessName: document.getElementById('business-name').value,
        businessType: document.getElementById('business-type').value,
        energyConsumption: parseFloat(document.getElementById('energy-consumption').value),
        waterConsumption: parseFloat(document.getElementById('water-consumption').value),
        wasteProduction: parseFloat(document.getElementById('waste-production').value)
    };

    // Validate the input fields (ensure they are numbers and not empty)
    if (isNaN(formData.energyConsumption) || isNaN(formData.waterConsumption) || isNaN(formData.wasteProduction)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Show loading message while waiting for the API response
    document.getElementById('result').innerHTML = "<p>Calculating...</p>";

    // Send data to backend API
    fetch('https://your-backend-api.com/submit', { // Replace with your actual backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Process the API response and display the results
        const resultContainer = document.getElementById('result-container');
        resultContainer.style.display = 'block'; // Show results container

        // Display sustainability score and recommendations
        document.getElementById('sustainability-score').innerHTML = `Sustainability Score: ${data.score}`;
        document.getElementById('recommendations').innerHTML = `Recommendations: <br>${data.recommendations}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = "<p>Error calculating data. Please try again later.</p>";
    });
});
