let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let req = new XMLHttpRequest();

var baseTemp,
  values = [],
  xScale,
  yScale,
  width = 1200,
  height = 600,
  padding = 60;

const canvas = d3.select("#canvas");

const drawCanvas = () => {
  canvas.attr("width", width).attr("height", height);
};

const generateScales = () => {
  xScale = d3
    .scaleLinear()
    .domain([1752, 2016])
    .range([padding, width - padding]);
  yScale = d3.scaleTime().range([padding, height - padding]);
};

const drawCells = () => {};

const drawAxes = () => {
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale);

  canvas
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padding})`);

  canvas.append("g").call(yAxis).attr("id", "y-axis").attr("transform", `translate(${padding}, 0)`);
};

req.open("GET", url, true);
req.onload = () => {
  let object = JSON.parse(req.responseText);
  values = object.monthlyVariance;
  baseTemp = object.baseTemperature;
  console.log(object);
  drawCanvas();
  generateScales();
  drawCells();
  drawAxes();
};

req.send();
