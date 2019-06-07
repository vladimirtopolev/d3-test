import * as d3 from 'd3';

export default class CoordinatePanel {
    constructor(container) {
        this.container = container;

        var margin = {top: 210, right: 20, bottom: 220, left: 20},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scaleLog()
            .domain([.0124123, 1230.4])
            .range([0, width]);

        var xAxis = d3.axisBottom()
            .scale(x)
            .ticks(20, ",.1s")
            .tickSize(500, 0);

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.right + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);
    }
}