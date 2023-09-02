// Declaring sampleData 
let sampleData; 
let metaField;

// * Creating the modifiedChart function - VISUALISATION FUNNEL
// * #################################################################

function modifyDashboard(selectedValue) {
    // * matching the chart based on the selectedSample (user input based)
    let selectedSample = sampleData.find(sample => sample.id === selectedValue);
    
    // * Creating the bar chart
    // * ----------------------------------------------------------------
    let trace1 = {
        x: selectedSample.sample_values.slice(0, 10).sort((function (a, b) {return a - b})),
        y: selectedSample.otu_id.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        text: selectedSample.otu_labels.slice(0, 10),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: '#E32754',
            opacity: 0.75
        }
    };
    // * Creating the data to use for ploting 
    let hBarChart = [trace1];
    
    // * Specifying the chart's layout 
    let layout = {
        margin: {
            l: 80,
            r: 55,
            t: 35,
            pad: 5
        },
        title: {
            text: `<b>Top 10 OTUs - Sample ${selectedValue} </b>`,
            font: {
                size: 22
            }
        }
    };

    // * Rendering the plot based on the div tag 'bar'
    Plotly.newPlot('bar', hBarChart, layout);

    // * Creating a bubble chart
    // * ----------------------------------------------------------------
    let trace2 = { 
        x: selectedSample.otu_id,
        y: selectedSample.sample_values,
        mode: 'markers',
        text:selectedSample.otu_labels,
        marker: {
            color: selectedSample.otu_id,
            size: selectedSample.sample_values
        }

    };

    let bubbleChart = [trace2];

    let bubbleLayout = {
        showlegend: false,
        height: 600,
        width: 1200,
        title: {
            text: `<b>Sample distribution of sample ${selectedValue}</b>`,
            font: {
                size: 22
            }
        },
        xaxis: {
            title: {
                text: "OTU IDs"
            }
        },
        yaxis: {
            title: {
                text: 'Sample Values'
            }
        }
      };
    
      // * Rendering the bubble chart
    // * --------------------------------
    Plotly.newPlot('bubble', bubbleChart, bubbleLayout);


    // * Append Demographic information
    // * --------------------------------
    let selectedMetadata = metaField.find(field => field.id === selectedValue);
    let panelBody = d3.select('.panel-body');
    console.log(selectedMetadata)
    panelBody.html(`
        <p><strong>Id:</strong> ${selectedMetadata.id}</p>
        <p><strong>Ethnicity</strong>: ${selectedMetadata.ethnicity}</p>
        <p><strong>Gender:</strong> ${selectedMetadata.gender}</p>
        <p><strong>Age:</strong> ${selectedMetadata.age}</p>
        <p><strong>Location:</strong> ${selectedMetadata.location}</p>
        <p><strong>BBType:</strong> ${selectedMetadata.bbtype}</p>
        <p><strong>WFreq:</strong> ${selectedMetadata.wfreq}</p>
    `)

    // * Creating a gauge chart
    // * ----------------------------------------------------------------
    // * Extract wfreq value from data
    let wfreqValue = selectedMetadata.wfreq;


    // * Define the gauge chart data
    let gaugeData = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            title: {
                text: "<b>Belly Button Washing Frequency</b><br><span style='font-size: 20px;'>Scrubs per Week</span>",
                font: { size: 22 }
            },
            type: "indicator",
            mode: "gauge+number",
            value: wfreqValue,
            gauge: {
                axis: { range: [0, 9], tickwidth: 1, tickcolor: 'red'},
                bar: {color: '#430304' },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: "#f89091" },  // 0-1
                    { range: [1, 2], color: "#f66e6f" },  // 1-2
                    { range: [2, 3], color: "#f44c4e" },  // 2-3
                    { range: [3, 4], color: "#f22a2c" },  // 3-4
                    { range: [4, 5], color: "#ec0d0f" },  // 4-5
                    { range: [5, 6], color: "#ca0b0d" },  // 5-6
                    { range: [6, 7], color: "#a8090b" },  // 6-7
                    { range: [7, 8], color: "#860708" },  // 7-8
                    { range: [8, 9], color: "#650506" }   // 8-9
                ]
            }
        }
    ];

    // * Define the layout
    let layout2 = {
        width: 520,
        height: 500,
        margin: { t: 0, b: 145, pad: 8 }
    };

    // *Plot the gauge chart
    Plotly.newPlot('gauge', gaugeData, layout2);

};  

// Define optionChanged function
function optionChanged(selectedValue) {
    modifyDashboard(selectedValue);
}


// USING D3 TO READ JSON DATA -- DATA FUNNEL
// #################################################################
// #################################################################

// ? then function used to handle successfull JSON data 
// ? catch function handles any errors that might occur during the loading process
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
    // * confirming the data was migrated correctly
    console.log(data);

    // * Extracting each subset to a variable
    let samples = data.samples;
    let names = data.names;
    let metadata = data.metadata;

    // ! TREATING THE SAMPLES DATA SUBSET - sampleData Creation
    // ! ---------------------------------------------------------------
    sampleData = samples.map(sample => ({
        'id': sample.id,
        'otu_id': sample.otu_ids,
        'otu_labels': sample.otu_labels,
        'sample_values': sample.sample_values
    }));

    // * Confirming sample data creation
    console.log(sampleData);

    // ! TREATING THE NAMES ARRAY 
    // ! ----------------------------------------------------------------
    const selectElement = document.getElementById("selDataset");
    names.forEach(name => {
        const option = document.createElement('option');
        option.text = name;
        option.value = name;
        selectElement.appendChild(option);
    });
    
    // * Calling the name arra
    console.log(names);

    // ! TREATING THE METADATA ARRAY
    // ! ----------------------------------------------------------------
    metaField = metadata.map(field => ({
        'id': field.id.toString(),
        'ethnicity': field.ethnicity,
        'gender': field.gender,
        'age': field.age,
        'location': field.location,
        'bbtype': field.bbtype,
        'wfreq': field.wfreq
    })); 

    // Call modifyChart to initialize the chart
    modifyDashboard(names[0]);

}).catch(function(error) {
    console.log('Error loading the JSON file: ' + error);
});
