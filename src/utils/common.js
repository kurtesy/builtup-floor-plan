
const scale = 20;
const scaleBy = 1.01;

const unitConversion = (metricUnits) => {
    const result = {};
    Object.keys(metricUnits).map(key => {
        const value = metricUnits[key]
        result[key] = Math.round((parseFloat(value.ft) + parseFloat(value.in/12)) * scale, 2)
    })
    return result;
}

const zoomStage = (event, stageRef) => {
    event.evt.preventDefault();
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      }
      stage.position(newPos);
      stage.batchDraw();
    }
  }

export { unitConversion, zoomStage };
