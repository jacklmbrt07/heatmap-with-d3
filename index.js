let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let req = new XMLHttpRequest();

var baseTemp,
  values,
  xScale,
  yScale,
  width = 1200,
  height = 600,
  padding = 60;

const canvas = d3.select("#canvas");

const drawCanvas = () => {
  canvas.attr("width", width).attr("height", height);
};

const generateScales = () => {};

const drawCells = () => {};

const drawAxes = () => {};

req.open("GET", url, true);
req.onload = () => {
  values = JSON.parse(req.responseText);
  console.log(values)
  drawCanvas();
  generateScales();
  drawCells();
  drawAxes();
};

req.send();
