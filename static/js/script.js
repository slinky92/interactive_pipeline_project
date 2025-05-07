// Select the body and append an SVG canvas
d3.select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 200)
  .append("circle")
  .attr("cx", 100)
  .attr("cy", 100)
  .attr("r", 50)
  .style("fill", "blue");

// Handle form submission
document.getElementById("dnaForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const sequence = document.getElementById("sequence").value;

    fetch("/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence: sequence })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Received data:", data);  // Check if data is correct

        // Show the processing results
        document.getElementById('cpu-used').textContent = data.cpu_time_used;
        document.getElementById('mem-used').textContent = data.memory_used_mb;
        document.getElementById('proc-time').textContent = data.processing_time_sec;

        // Start D3.js animation to show the flow of data
        visualizeProcessing(sequence, data.binary);
    });
});

// Function to visualize the processing (D3.js animation)
function visualizeProcessing(sequence, binary) {
    // Clear previous SVG content
    d3.select("svg").remove();

    // Create a new SVG canvas
    const svg = d3.select("body").append("svg")
                    .attr("width", 600)
                    .attr("height", 200);

    // Draw initial DNA sequence as text
    svg.append("text")
        .attr("x", 20)
        .attr("y", 50)
        .text("DNA Sequence: " + sequence)
        .style("font-size", "20px");

    // Draw the binary conversion next to the sequence
    svg.append("text")
        .attr("x", 20)
        .attr("y", 100)
        .text("Binary: " + binary)
        .style("font-size", "20px");

    // Here, you can animate the data "moving" through computer components (CPU, RAM, Disk)
    svg.append("rect")
        .attr("x", 20)
        .attr("y", 150)
        .attr("width", 100)
        .attr("height", 20)
        .style("fill", "blue")
        .transition()
        .duration(2000)
        .attr("x", 500);  // Move the rectangle to simulate processing
}
