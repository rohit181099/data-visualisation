const mapFile = "file.json";
const dataFile = "datasetnew.csv";
var xColumn = "longitude";
var yColumn = "latitude";
var rColumn = "population";
var peoplePerPixel = 50000;
var margin = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
};


var width = window.innerWidth;
var height = window.innerHeight;
var worldData;
var markerData;
var circles;

var companySelector = document.getElementById("company-selector")
companySelector.addEventListener("change", drawMarkers);

var RegionSelector = document.getElementById("Region-selector")
RegionSelector.addEventListener("change", drawMarkers);

var projection = d3.geoMercator()
    .scale(1144)
    .center([161.824707, 26.356006])
    .rotate([70, 0]);
var path = d3.geoPath().projection(projection);
var graticule = d3.geoGraticule();

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);
var g = svg.append('g')
    .attr("width", innerWidth * 0.6)
    .attr("height", innerHeight * 0.6)
svg.call(d3.zoom().on('zoom', () => {
    console.log(d3.event.transform)
    g.attr('transform', d3.event.transform)
}));

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);



d3.select(self.frameElement).style("height", height + "px");

initiate();

async function initiate() {
    worldData = await d3.json(mapFile).catch(console.log);
    markerData = await d3.csv(dataFile, type).catch(console.log);
    drawMap(worldData);
    drawMarkers();
}

function type(d) {
    d.latitude = +d.latitude;
    d.longitude = +d.longitude;
    return d;
}

function drawMap(mapData) {
    var countries = topojson.feature(mapData, mapData.objects.polygons).features;
    g.selectAll(".countries")
        .data(countries)
        .enter()
        .insert("path", ".graticule")
        .attr("d", path)
        .attr("class", "map-font");
}

function drawMarkers() {
    let data = markerData;
    if (circles) circles.remove();
    if (!markerData) return;
    let company = companySelector.value;
    let Region = RegionSelector.value;
    if (company.length || Region.length) {
        g.attr('transform', { k: 30.83862430941067, x: data[0].latitude, y: data[0].longitude });

    } else {

    }
    data = data.filter((d) => !company.length || d.Company_Name == company);
    data = data.filter((d) => !(Region.length) || d.Region == Region);

    console.log("Filtered Data Length:", data.length, "company:", company, 'Region:', Region);
    //

    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function (d) {
            delete d.latitude;
            console.log(d);
            delete d.longitude;

            delete d.population;
            document.getElementById('infoBox').innerHTML = "<p> <h1>Information Box<br><br></h1>" +
                Object.keys(d).map(key => `<b>${key}</b><br>: ${d[key]}`).join("<br />") + "</p>";
        });

    g.call(tip);

    var rScale = d3.scaleSqrt();

    circles = g.selectAll("circle").data(data)
        .enter().append("svg:circle")
        .attr("cx", function (d) {
            return projection([d[xColumn], d[yColumn]])[0];
        })
        .attr("cy", function (d) {
            return projection([d[xColumn], d[yColumn]])[1];
        })
        .attr("r", 0.2)
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .attr("class", 'circle')

    circles.exit().remove();
}
// k: 30.83862430941067
// x: -11863.92144033446
// y: -8138.252298643574