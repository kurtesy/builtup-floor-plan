import React, { useState, useRef } from 'react';
import './App.css';
import { createTheme } from '@mui/material/styles';

import Grid from './components/raw_grid.js'
import ToolBar from './components/toolbar.js';
import ControlPanel from './components/control_panel.js'
// import PlotLayout from './components/plot_layout.js'

import { unitConversion } from './utils/common.js'

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const defaultConfig = {
      plotBreadth: { ft: 20, inc: 0 },
      plotLength: { ft: 30, inc: 0 },
      pWallTkn: { ft: 0, inc: 5 },
      gap: { ft: 1, inc: 0 },
      bWallTkn: { ft: 0, inc: 4 },
  }
  defaultConfig.builtupBreadth = { ft: defaultConfig.plotBreadth.ft - 2*defaultConfig.gap.ft,
                                   inc: defaultConfig.plotBreadth.inc - 2*defaultConfig.gap.inc }
  defaultConfig.builtupLength = { ft: defaultConfig.plotLength.ft - 2*defaultConfig.gap.ft,
                                  inc: defaultConfig.plotLength.inc - 2*defaultConfig.gap.inc }

  const mainRef = useRef();
  const [config, setConfig] = useState(defaultConfig);

  const convertedUnits = unitConversion(defaultConfig)
  const [units, setUnits] = useState(convertedUnits)

  const updateConfig = (data, id, metrics) => {
    const convertedUnits = unitConversion(metrics)
    setUnits(convertedUnits)
  };

  const updateColor = (pWallColor, bWallColor) => {
    setUnits( { ...units, pWallColor: pWallColor, bWallColor: bWallColor } )
    console.log('updateColor', units)
  };

  return (
    <div className="App">
        <ToolBar theme={darkTheme} updateColor={updateColor}/>
        <div className='main-section' ref={mainRef}>
          <ControlPanel props={config} theme={darkTheme} updateCallback={updateConfig}/>
          {/* <PlotLayout config={units}/> */}
          <Grid plotDim={units} builtupDim={units} mainRef={mainRef} config={config}/>
        </div>
    </div>
  );
}

export default App;
