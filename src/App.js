import React, { useState } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ToolBar from './components/toolbar.js';
import ControlPanel from './components/control_panel.js'
import PlotLayout from './components/plot_layout.js'

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
      plotBreadth: { ft: 20, in: 0 },
      plotLength: { ft: 30, in: 0 },
      pWallTkn: { ft: 0, in: 5 },
      gap: { ft: 2, in: 0 },
      roomBreadth: { ft: 16, in: 0 },
      roomLength: { ft: 26, in: 0 },
      bWallTkn: { ft: 0, in: 4 },
  }

  const [config, setConfig] = useState(defaultConfig)

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
        <div className='main-section'>
          <ControlPanel props={config} theme={darkTheme} updateCallback={updateConfig}/>
          <PlotLayout config={units}/>
        </div>
    </div>
  );
}

export default App;
