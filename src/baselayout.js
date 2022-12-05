import React, { useState, useRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { Stage, Layer } from "react-konva";
import Rectangle from "./components/rectangle";
import { addLine } from "./components/line";
import { addTextNode } from "./components/text";
import { v1 as uuidv1 } from 'uuid';

const BaseLayout = () => {
  const [rectangles, setRectangles] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [, updateState] = React.useState();
  const stageEl = React.createRef();
  const layerEl = React.createRef();
  const fileUploadEl = React.createRef();
  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const addRectangle = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      fill: "red",
      id: `rect${rectangles.length + 1}`,
    };
    const rects = rectangles.concat([rect]);
    setRectangles(rects);
    const shs = shapes.concat([`rect${rectangles.length + 1}`]);
    setShapes(shs);
  };
const drawLine = () => {
    addLine(stageEl.current.getStage(), layerEl.current);
  };
  const eraseLine = () => {
    addLine(stageEl.current.getStage(), layerEl.current, "erase");
  };
  const drawText = () => {
    const id = addTextNode(stageEl.current.getStage(), layerEl.current);
    const shs = shapes.concat([id]);
    setShapes(shs);
  };
  const drawImage = () => {
    fileUploadEl.current.click();
  };
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const undo = () => {
    const lastId = shapes[shapes.length - 1];
    let index = rectangles.findIndex(r => r.id == lastId);
    if (index != -1) {
      rectangles.splice(index, 1);
      setRectangles(rectangles);
    }
    shapes.pop();
    setShapes(shapes);
    forceUpdate();
  };
  document.addEventListener("keydown", ev => {
    if (ev.code == "Delete") {
      let index = rectangles.findIndex(r => r.id == selectedId);
      if (index != -1) {
        rectangles.splice(index, 1);
        setRectangles(rectangles);
      }
      forceUpdate();
    }
  });
  return (
    <div className="home-page">
      <h1>Whiteboard</h1>
      <ButtonGroup>
        <Button variant="secondary" onClick={addRectangle}>
          Rectangle
        </Button>
        <Button variant="secondary" onClick={drawLine}>
          Line
        </Button>
        <Button variant="secondary" onClick={eraseLine}>
          Erase
        </Button>
        <Button variant="secondary" onClick={drawText}>
          Text
        </Button>
        <Button variant="secondary" onClick={undo}>
          Undo
        </Button>
      </ButtonGroup>
      <Stage
        width={window.innerWidth * 0.9}
        height={window.innerHeight - 150}
        ref={stageEl}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
      >
        <Layer ref={layerEl}>
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={newAttrs => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
export default BaseLayout;
