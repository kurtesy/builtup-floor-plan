import React, { useRef, useEffect } from 'react';
import vec2 from 'vec2';
import { pointWithLine } from 'geometric';
import { createRoot } from 'react-dom/client'
import * as d3 from 'd3';
import * as d3s from 'd3-selection';
import emoji from 'd3moji';
import { formatUnit } from '../utils/common.js';

import '../styles/grid_style.css'

const roomColorSchema = ['#1C315E', '#227C70', '#88A47C', '#E6E2C3']
const roomDimCalc = (percent, builtupLength, builtupBreadth) => {
    // assuming below that Width and Height are the rectangle's
    const roomRatio = 1.55 // 2:1 breadth: length
    const roomArea = (builtupLength * builtupBreadth) * percent / 100;
    const height = Math.sqrt(roomArea/roomRatio);
    const width = roomArea/height;
    
    // const roomRatio = width / height;

    // const roomRatioSq = Math.pow( roomRatio, 2 );

    let rotate;
    // if (builtupLength > builtupBreadth && builtupLength / builtupBreadth > roomRatio) { // wider aspect than the image
    //     newHeight = builtupBreadth;
    //     rotate = 0;
    // } else if (builtupBreadth > builtupLength && builtupBreadth / builtupLength > roomRatio) { // skinnier aspect than the image rotated 90 degrees
    //     newHeight = builtupLength;
    //     rotate = Math.PI / 2;
    // } else {
    //     var hPrime = (roomRatio * builtupLength - roomRatioSq * builtupBreadth) / ( 1 - roomRatioSq );
    //     var wPrime = roomRatio * (builtupBreadth - hPrime);
    //     rotate = Math.atan2( hPrime, wPrime );
    //     var sine = Math.sin(rotate);
    //     if (sine == 0) {
    //         newHeight = builtupBreadth;
    //     } else {
    //         newHeight = (builtupLength - wPrime) / sine;
    //     }
    // }
    return {width, height};
}

const breakArea = (id='built-rect-inner', break_ratio=0.25) => {
    const element = d3.select(`#${id}`)._groups[0][0]
    // Break the width and height based on ratio and cal the coordinates
    const width = element.width.baseVal.value
    const height = element.height.baseVal.value
    const newAreas = []
    const noOfRect = 1/break_ratio

    console.log('roomsLayout', roomsLayout)
    for(let index=0;index<noOfRect;index++) {
        const temp = {
            roomType: `${index}`,
            percent: 100*break_ratio,
            wallThick: 4
        }
        newAreas.push(temp)
    }
    roomsLayout = [ ...newAreas ]
}

var roomsLayout = 
[
    // {
    //     x: 0, y: 0,
    //     id: 1
    //     minWidth: 200,
    //     minHeight: 150,
    //     wallThick: 2,
    //     quadrant: 1,
    //     roomType: 'master_bed',
    //     percent: 25,
    // },
    // {
    //     x: 0, y: 0,
    //     minWidth: 200,
    //     minHeight: 150,
    //     wallThick: 2,
    //     quadrant: 2,
    //     roomType: 'guest_bed',
    //     percent: 25
    // },
    // {
    //     x: 0, y: 0,
    //     minWidth: 200,
    //     minHeight: 150,
    //     wallThick: 2,
    //     quadrant: 4,
    //     roomType: 'living',
    //     percent: 21
    // },
    // {
    //     x: 0, y: 0,
    //     minWidth: 200,
    //     minHeight: 150,
    //     wallThick: 2,
    //     quadrant: 3,
    //     roomType: 'pooja',
    //     percent: 3
    // },
    // {
    //     x: 0, y: 0,
    //     minWidth: 200,
    //     minHeight: 150,
    //     wallThick: 2,
    //     quadrant: 3,
    //     roomType: 'kitchen',
    //     percent: 10
    // },
    // {
    //     x: 0, y: 0,
    //     minWidth: 200,
    //     minHeight: 150,
    //     wallThick: 2,
    //     quadrant: 3,
    //     roomType: 'stairs',
    //     percent: 5
    // },
]

const adjustRoomsLayout = (selectedRect) => {
    
}

const Grid = ({ plotDim, builtupDim, scale, mainRef, config }) => {
    const ref = useRef()

    const line = [[1, 0], [1, 2]];
    const rectangle = [[0, 0], [0, 1], [1, 1], [1, 0]];
    const ptLine = pointWithLine([0, 1], line); // [[0, 0], [1, 1]]
    let selectedRoom = null;
    let dragging = null;

    const resize = () => {
        // drawGrid()
    }

    const drawRooms = (svg, builtupStart, builtupBreadth, builtupLength, bWallTkn) => {
        let curX = builtupStart.X;
        let curY = builtupStart.Y;
        roomsLayout.map((room, i) => {
            const newDim = roomDimCalc(room.percent, builtupBreadth, builtupLength)
            svg.append('rect')
                .attr('id', `room-${i}`)
                .attr('class', 'room-rect')
                .attr('x', curX)
                .attr('y', curY)
                .attr('width', newDim.width)
                .attr('height', newDim.height)
                .attr('stroke', '#400000')
                .attr('stroke-width', room.wallThick)
                .attr('fill', roomColorSchema[i%4])
                .style('opacity', 0.5)
                .on('click', function (d, j) {
                    // Find previously selected, unselect
                    d3.select(".selected-room").classed("selected-room", false);
                    svg.selectAll("circle").remove()

                    // Select current item
                    const cur = d3.select(this);
                    cur.classed("selected-room", true);
                     
                    selectedRoom = `room-${i}`
                    console.log(this, cur, d, j)

                    const attr = this.attributes;
                    svg.append('circle')
                        .attr('class', 'resize-circle')
                        .attr('cx', parseInt(attr.x.value) + parseInt(attr.width.value))
                        .attr('cy', parseInt(attr.y.value) + parseInt(attr.height.value))
                        .attr('r', 5)
                        .attr('fill', 'blue')
                        .on('mousedown', function(d,i){
                            dragging = true
                        })
                        .on("mouseup", function(d, i){
                            dragging = false
                        })
                        .on("mousemove", function(d, i){
                                let coords = d3s.pointers(d)[0]
                                const selectedRect = d3.select(`#${selectedRoom}`)
                                const circle = d3.select(this)
                                if(dragging === true) {
                                    circle.attr('cx', parseInt(coords[0]))
                                    circle.attr('cy', parseInt(coords[1]))

                                    selectedRect.attr('width', parseInt(coords[0]) - parseInt(selectedRect._groups[0][0].attributes.x.value))
                                    selectedRect.attr('height', parseInt(coords[1]) - parseInt(selectedRect._groups[0][0].attributes.y.value))
                                    adjustRoomsLayout(selectedRect)
                                }
                            })
                    }
                )
            
            svg.append('text')
                .text(room.roomType)
                .attr('width', 30)
                .attr('height', 30)
                .attr('x', curX + newDim.width/2 - 30)
                .attr('y', curY + newDim.height/2)
            svg.append("svg:image")
            .attr('x', curX + newDim.width/2 - 5)
            .attr('y', curY + newDim.height - 31)
            .attr('width', 30)
            .attr('height', 34)
            .attr("xlink:href", "door_icon.svg")
            // .attr('transform', 'rotate(180 0 0)')
            
            curX = curX + newDim.width
            if (builtupStart.X + builtupLength - 50 <= curX) {
                curY = curY + newDim.height
                curX = builtupStart.X + bWallTkn/2 + 1;
            }
        })
    }

    const drawGrid = () => {

        const sideBarWidth = document.getElementsByClassName('MuiList-root')[0].offsetWidth;
        const width = mainRef.current.clientWidth - sideBarWidth;
        const height = mainRef.current.clientHeight;

        const { plotLength, plotBreadth, pWallTkn } = plotDim;
        const { builtupLength, builtupBreadth, bWallTkn } = builtupDim;

        const plotStart = {
            X: (width/2) - (plotLength/2),
            Y: (height/2) - (plotBreadth/2)
        }

        const builtupStart = {
            X: (width/2) - (builtupLength/2),
            Y: (height/2) - (builtupBreadth/2)
        }

        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("rect").remove()
        svg.selectAll("text").remove()
        svg.selectAll("image").remove()

        const zoom = d3.zoom().on('zoom', handleZoom);

        const handleZoom = (e) => {
            d3.select('svg')
                .attr('transform', e.transform);
        }

        const initZoom = () => {
            d3.select('svg g')
                .call(zoom);
        }

        const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
        const y  = d3.scaleLinear().domain([0, 1]).range([height, 0]);
        const xAxis = d3.axisBottom(x).ticks(1);
        const yAxis = d3.axisLeft(y).ticks(1);
        const xAxisGrid = d3.axisBottom(x).tickSize(-height).tickFormat('').ticks(145);
        const yAxisGrid = d3.axisLeft(y).tickSize(-width).tickFormat('').ticks(100);

        // Create grids.
        svg.append('g')
        .attr('class', 'x axis-grid')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxisGrid);
        svg.append('g')
        .attr('class', 'y axis-grid')
        .call(yAxisGrid);
        // Create axes.
        svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);
        svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

        // create a tooltip
        const tooltip = d3.select("#main")
            .append("text")
            .attr("class", "tooltip")
            .style("opacity", 0)

        // Gradient
        //Append a defs (for definition) element to your SVG
        var defs = svg.append("defs");

        //Append a linearGradient element to the defs and give it a unique id
        var linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient");
        //Diagonal gradient
        linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");
            
        svg.append('rect')
            .attr("id", "plot-rect")
            .attr('x', plotStart.X)
            .attr('y', plotStart.Y)
            .attr('width', plotLength)
            .attr('height', plotBreadth)
            .attr('stroke', '#B1ACE6')
            .attr('stroke-width', pWallTkn)
            .attr('fill', 'transparent')
            .style('opacity', 0.5)
            .on('mousemove', function (d, i) {
                tooltip.style("opacity", 1)
                    .html(`x: ${d.clientX-plotStart.X}, y:${d.clientY-plotStart.Y}`)
                    .attr('x', d.clientX-plotStart.X)
                    .attr('y', d.clientY-plotStart.Y)})
            .on('mouseover', function (d, i) {
                d3.select(this).attr("r", 10)
                    .style("fill", "lightblue")
                    .style('opacity', 0.5);
            })
            .on('mouseout', function (d, i) {
                d3.select(this).attr("r", 10)
                    .style("fill", "transparent")
                    .style('opacity', 1);
                tooltip.style("opacity", 0)
            })

        svg.append('rect')
            .attr("id", "plot-rect-inner")
            .attr('x', plotStart.X + pWallTkn/2)
            .attr('y', plotStart.Y + pWallTkn/2)
            .attr('width', plotLength-pWallTkn)
            .attr('height', plotBreadth-pWallTkn)
            .attr('stroke', '#776ed3')
            .attr('stroke-width', 0.5)
            .attr('fill', 'transparent');

        svg.append('rect')
            .attr("id", "plot-rect-outer")
            .attr('x', plotStart.X - pWallTkn/2)
            .attr('y', plotStart.Y - pWallTkn/2)
            .attr('width', plotLength+pWallTkn)
            .attr('height', plotBreadth+pWallTkn)
            .attr('stroke', '#776ed3')
            .attr('stroke-width', 0.5)
            .attr('fill', 'transparent');
        
        const metricLabel = svg.append("text")
            .attr("x", plotStart.X)
            .attr("y", height/2 + 8)
            .attr("text-anchor", "middle")
            .attr('class', 'rect-side-breadth')
            .text(formatUnit(config.plotBreadth))
            .style('text-anchor', 'end')

        svg.append("text")
           .attr("x", width/2)
           .attr("y", plotStart.Y)
           .attr("text-anchor", "middle")
           .attr('class', 'rect-side-length')
           .text(formatUnit(config.plotLength))
        
        
        svg.append('line')
            .attr('x1', width/2)
            .attr('y1', plotStart.Y)
            .attr('x2', width/2)
            .attr('y2', height - plotStart.Y)
            .attr('stroke', '#000000')
            .style("stroke-dasharray", ("3, 3"));
        svg.append('text')
            .attr('x', width/2 - 5)
            .attr('y', plotStart.Y - 10)
            .attr('stroke', '#000000')
            .text('N')
        svg.append('text')
            .attr('x', width/2 - 5)
            .attr('y', height - plotStart.Y + 20)
            .attr('stroke', '#000000')
            .text('S')
        
        svg.append('line')
            .attr('x1', plotStart.X)
            .attr('y1', height/2)
            .attr('x2', width - plotStart.X)
            .attr('y2', height/2)
            .attr('stroke', '#000000')
            .style("stroke-dasharray", ("3, 3"));
        svg.append('text')
            .attr('x', plotStart.X - 20)
            .attr('y', height/2)
            .attr('stroke', '#000000')
            .text('W')
        svg.append('text')
            .attr('x', width - plotStart.X + 10)
            .attr('y', height/2)
            .attr('stroke', '#000000')
            .text('E')

        svg.append('rect')
            .attr('x', builtupStart.X)
            .attr('y', builtupStart.Y)
            .attr('width', builtupLength)
            .attr('height', builtupBreadth)
            .attr('stroke', '#D03D56')
            .attr('stroke-width', bWallTkn)
            .attr('fill', 'transparent')
            .attr('opacity', 0.5)
            .on('mousemove', function (d, i) {
                tooltip.style("opacity", 1)
                    .html(`x: ${d.clientX-plotStart.X}, y:${d.clientY-plotStart.Y}`)
                    .attr('x', d.clientX-plotStart.X)
                    .attr('y', d.clientY-plotStart.Y)})
            .on('mouseover', function (d, i) {
                d3.select(this).attr("r", 10)
                    .style("fill", "lightblue")
                    .style('opacity', 0.5);
            })
            .on('mouseout', function (d, i) {
                d3.select(this).attr("r", 10)
                    .style("fill", "transparent")
                    .style('opacity', 1);
                tooltip.style("opacity", 0)
            });

        svg.append('rect')
            .attr("id", "built-rect-inner")
            .attr('x', builtupStart.X + bWallTkn/2)
            .attr('y', builtupStart.Y + bWallTkn/2)
            .attr('width', builtupLength-bWallTkn)
            .attr('height', builtupBreadth-bWallTkn)
            .attr('stroke', '#776ed3')
            .attr('stroke-width', 0.5)
            .attr('fill', 'transparent');

        svg.append('rect')
            .attr("id", "built-rect-outer")
            .attr('x', builtupStart.X - bWallTkn/2)
            .attr('y', builtupStart.Y - bWallTkn/2)
            .attr('width', builtupLength+bWallTkn)
            .attr('height', builtupBreadth+bWallTkn)
            .attr('stroke', '#776ed3')
            .attr('stroke-width', 0.5)
            .attr('fill', 'transparent');
        
        drawRooms(svg, builtupStart, builtupBreadth, builtupLength, bWallTkn)

        svg.append("text")
            .attr("x", builtupStart.X)
            .attr("y", height/2 + 8)
            .attr("text-anchor", "middle")
            .attr('class', 'rect-side-breadth')
            .text(formatUnit(config.builtupBreadth))
            .style('text-anchor', 'start')

        svg.append("text")
           .attr("x", width/2)
           .attr("y", builtupStart.Y)
           .attr("text-anchor", "middle")
           .attr('class', 'rect-side-length')
           .text(formatUnit(config.builtupLength))

        initZoom()
        breakArea()
    }

    useEffect(() => {
        drawGrid()
    }, [plotDim, builtupDim]);

    window.addEventListener('resize', resize)
    return (
        <svg id="main" ref={ref}>
        </svg>
    )
}

export default Grid;
