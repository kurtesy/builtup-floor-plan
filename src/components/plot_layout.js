import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer } from "react-konva";

import { zoomStage } from '../utils/common.js'

import Rectangle from './rectangle.js';
import GridLines from './grid_lines.js';

const PlotLayout = ({ config }) => {
    const mode = 0; // 0 is static, 1 is dynamic
    const originX = 100;
    const originY = 50;
    let wallWidth;

    const [plots, setPlots] = useState([{
        x: originX,
        y: originY,
        width: config.plotLength,
        height: config.plotBreadth,
        stroke: config.pWallColor || '#000000',
        strokeWidth: config.pWallTkn,
        id: `plot${1}`,
        draggable: false
      }]);
    const [rooms, setRooms] = useState([{
        x: originX+config.gap,
        y: originY+config.gap,
        width: config.plotLength-config.gap,
        height: config.plotBreadth-config.gap,
        stroke: config.bWallColor || '#800000',
        strokeWidth: config.bWallTkn,
        id: `room${1}`,
        draggable: false
      }]);
    const [selectedId, selectShape] = useState(null);
    useEffect(() => {
        const updatedPlot = [ {...plots[0],
            width: config.plotLength,
            height: config.plotBreadth,
            strokeWidth: config.pWallTkn } ]
        setPlots(updatedPlot)

        const updatedRoom = [ {...rooms[0],
            width: config.roomLength,
            height: config.roomBreadth,
            strokeWidth: config.bWallTkn } ]
        setRooms(updatedRoom)
    }, [config]);

    const stageEl = React.createRef();
    const layerEl = React.createRef();
    // console.log('rectangles', config)
    
    return (
        <div className="plot-layout">
        <Stage
            width={window.innerWidth * 0.95}
            height={window.innerHeight - 10}
            ref={stageEl}
            onMouseDown={e => {
                // deselect when clicked on empty area
                const clickedOnEmpty = e.target === e.target.getStage();
                if (clickedOnEmpty) {
                    selectShape(null);
                }
            }}
            onWheel={event => zoomStage(event, stageEl)}
            >
            <GridLines />
            <Layer ref={layerEl}>
                {/* <GridLines /> */}
                {plots.map((plot, i) => {
                    return (
                    <Rectangle
                        key={i}
                        plotProps={plot}
                        builtupProps={rooms[i]}
                        onChange={newAttrs => {
                            const rects = plots.slice();
                            rects[i] = newAttrs;
                            setPlots(rects);
                        }}
                    />
                    );
                })
                }
            </Layer>
        </Stage>
        </div>
      );
}

export default PlotLayout;
