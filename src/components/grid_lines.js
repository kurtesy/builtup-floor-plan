import React from "react";
import { Layer, Line, Stage } from "react-konva";

const GridLines = () => {
  const blockSize = 20;
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <>
    <Layer>
        {[...Array(Math.floor(width/blockSize))].map((x, i) => {
          return (
            <Line
              key={`c-${i}`}
              points={[Math.round(i * blockSize) + 0.5, 0, Math.round(i * blockSize) + 0.5, 2*height]}
              stroke='lightblue'
              strokeWidth={1}
            />
          )
        })
        }
    </Layer>
    <Layer>
      {[...Array(Math.floor(height/blockSize))].map((x, i) => {
        return (
          <Line
            key={`r-${i}`}
            points={[0, Math.round(i * blockSize), 2*width, Math.round(i * blockSize)]}
            stroke='lightblue'
            strokeWidth={1}
          />
        )
      })
      }
  </Layer>
  </>
  );
};

export default GridLines;
