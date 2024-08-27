        // Get the 2D rendering 
        // context of the canvas
        const ctx = document.
        getElementById('mixedChart').
        getContext('2d');

        // Create a new Chart instance with
        // a default chart type of 'bar'
        const mixedChart = new Chart(ctx, {
            // The default chart
            // type for the graph
            type: 'bar', 
            data: {
                // Labels for the X-axis
                labels: 
                ['January', 'February', 'March', 'April', 'May'],
                // Datasets for the chart
                datasets: [{
                    //Chart type
                    type: 'bar', 
                    // Label for the dataset
                    label: 'Pizza bar chart', 
                    // Data points for the Y-axis
                    data: [122, 77, 45, 104, 66], 
                    // Background color for the bars
                    backgroundColor: 
                    'rgba(215, 153, 20, 0.5)', 
                    // Border color for the bars
                    borderColor: 
                    'rgba(215, 153, 20, 1)', 
                    // Border width for the bars
                    borderWidth: 1 
                }, {
                    type: 'line',
                    label: 'Pizza line chart',
                    data: [122, 77, 45, 104, 66],
                    borderColor: 
                    'rgba(215, 153, 20, 1)',
                }, {
                    type: 'bar', 
                    label: 'Burger bar chart', 
                    data: [87, 133, 87, 66, 84], 
                    backgroundColor: 
                    'rgba(75, 192, 192, 0.5)',
                    borderColor: 
                    'rgba(75, 192, 192, 1)', 
                    borderWidth: 1
                }, {
                    type: 'line',
                    label: 'Burger line chart',
                    data: [87, 133, 87, 66, 84],
                    borderColor: 
                    'rgba(75, 192, 192, 1)',
                }]
            },
            options: {
                // It makes the chart responsive
                responsive: true, 
                // This plugin will display Title of chart
                plugins: {
                    title: {
                        display: true,
                        text: 
                'Monthly Revenue and Statistics'
                    }
                }
            }
        });