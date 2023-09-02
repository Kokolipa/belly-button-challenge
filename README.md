# Belly Button Challenge [![Belly-Dashboard](https://img.shields.io/badge/Belly-Dashboard-black?style=flat&logo=atandt)](https://kokolipa.github.io/belly-button-challenge/) 
### Project description:
Building an interactive dashboard to describe and explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/) using JavaScript and HTML. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

#### Dashboard Creation Process:
The JavaScript (**app.js**) plays as the backend of the dashboard and is divided into two funnels: 
1. **Data funnel:** To extract, transform, and load the data subsets to the dashboard's corresponding HTML tags and visuals. 
    * How? 
        * Calling the Belly Button API to GET the data response and divide it into three main subsets using D3.json(URL):
            * metadata
            * names
            * samples
        * **Mapping** the subsets to extract relevant fields for the dashboard's visuals and assign the filtered subsets to the variables created in the global scope (_"sampleData"_ and _"metaField"_). 
        * To push all the sample IDs to the HTML tag, I used _document.getElementById_ and referred to the corresponding HTML-dropdown-tag and assigned it to a variable; I then used the _forEach_ to "loop" over the items and pushed them one by one to create a new option using _document.createElement_. 
        * Finally, for convenience, I chained the catch function to D3.json(URL) to catch errors while working on and with the dataset.
2. **Data visuals:** To create an interactive dashboard, I made a function that plots a visual based on one condition: **if the selected value lives within the subset, filter the results and use the return value to plot the visuals for the dashboard**. 

### Libraries used: 
1. Plotly
2. D3

### Languages used: 
1. HTML - Frontend
2. JavaScript - Backend

### Dashboard Image:
![belly-dashboard](https://github.com/Kokolipa/belly-button-challenge/blob/bb_main/Images/belly_dashboard.png)

#### Folder structure:
``` yml
.
├── js-belly-button
│   ├── Images 
│   |   ├── belly_dashboard.png
│   ├── static    
│   |   ├── .gitkeep
│   |   ├── app.js # This is the backend code for the dashboard
│   ├── index.html # This is the frontend
│   ├── samples.json # This json file contains the data used for the project                              
|___.gitignore               
|___README.md
``` 


