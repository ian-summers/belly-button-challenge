function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var samples = data.samples;
      var result = samples.find((sampleData) => sampleData.id === sample);
  
      // Data for Bar Chart (already provided in previous steps)
      var otu_ids_bar = result.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
      var otu_labels_bar = result.otu_labels.slice(0, 10);
      var sample_values_bar = result.sample_values.slice(0, 10);
  
      // Bar Chart
      var barData = [{
        x: sample_values_bar.reverse(),
        y: otu_ids_bar.reverse(),
        text: otu_labels_bar.reverse(),
        type: 'bar',
        orientation: 'h'
      }];
  
      var barLayout = {
        title: 'Top 10 Bacterial Species (OTUs)',
        xaxis: { title: 'Sample Values' },
        yaxis: { title: 'OTU IDs' }
      };
  
      Plotly.newPlot('bar', barData, barLayout);
  
      // Data for Bubble Chart
      var otu_ids_bubble = result.otu_ids;
      var sample_values_bubble = result.sample_values;
      var otu_labels_bubble = result.otu_labels;
  
      // Bubble Chart
      var bubbleData = [{
        x: otu_ids_bubble,
        y: sample_values_bubble,
        text: otu_labels_bubble,
        mode: 'markers',
        marker: {
          size: sample_values_bubble,
          color: otu_ids_bubble,
          colorscale: 'Earth' // This is optional, adjust colorscale as needed
        }
      }];
  
      var bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        showlegend: false,
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' },
        margin: { t: 30 }
      };
  
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
  }
  
  
  
  function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      // Extract the metadata from the dataset
      var metadata = data.metadata;
      // Filter the metadata for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
  
      // Select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(result).forEach(([key, value]) => {
        // Append a paragraph for each key-value pair in the metadata
        PANEL.append("p").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }
  
  
  // Function to handle a change in the dropdown select element
  function optionChanged(newSample) {
    // Call update functions here
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initial setup function to populate dropdown and set up initial plots
  function init() {
    // Select the dropdown element
    var selector = d3.select("#selDataset");
  
    // Fetch the JSON data and populate the dropdown
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector.append("option").text(sample).property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Call the init function at startup
  init();
  