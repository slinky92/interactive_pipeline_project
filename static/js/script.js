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
