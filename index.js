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

let minYear, maxYear;

const canvas = d3.select("#canvas");
const tooltip = d3.select("#tooltip");

const drawCanvas = () => {
  canvas.attr("width", width).attr("height", height);
};

const generateScales = () => {
  minYear = d3.min(values, (item) => {
    return item.year;
  });
  maxYear = d3.max(values, (item) => {
    return item.year;
  });

  xScale = d3
    .scaleLinear()
    .domain([minYear, maxYear + 1])
    .range([padding, width - padding]);

  yScale = d3
    .scaleTime()
    .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
    .range([padding, height - padding]);
};

const drawCells = () => {
  let numYears = maxYear - minYear;

  canvas
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("fill", (item) => {
      variance = item.variance;
      if (variance <= -1) {
        return "SteelBlue";
      } else if (variance <= 0) {
        return "LightSteelBlue";
      } else if (variance <= 1) {
        return "orange";
      } else {
        return "crimson";
      }
    })
    .attr("data-year", (item) => {
      return item.year;
    })
    .attr("data-month", (item) => {
      return item.month - 1;
    })
    .attr("data-temp", (item) => {
      return baseTemp + item.variance;
    })
    .attr("height", (height - 2 * padding) / 12)
    .attr("y", (item) => {
      return yScale(new Date(0, item.month - 1, 0, 0, 0, 0, 0));
    })
    .attr("width", () => {
      return (width - padding * 2) / numYears;
    })
    .attr("x", (item) => {
      return xScale(item.year);
    })
    .on("mouseover", (d) => {
      tooltip.transition().style("visibility", "visible");
      let item = d.target.__data__;
      let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      tooltip.text(
        `${item.year} ${monthNames[item.month - 1]} -  ${
          baseTemp + item.variance
        } (${item.variance})`
      );
    })
    .on("mouseout", (d) => {
      tooltip.transition().style("visibility", "hidden");
    });
};

const drawAxes = () => {
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%B"));

  canvas
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padding})`);

  canvas
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`);
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
