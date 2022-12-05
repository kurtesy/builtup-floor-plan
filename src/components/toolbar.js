import React, { useState, useEffect } from 'react';
import ColorPicker from 'material-ui-color-picker'
import { AppBar, Box, Toolbar, Typography, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';


const ToolBar = ({ theme, updateColor }) => {

    const [pWallColor, setPWallColor] = useState('#000000');
    const [bWallColor, setBWallColor] = useState('#800000');

    useEffect(() => {
        console.log('updateColor', pWallColor, bWallColor)
        updateColor(pWallColor, bWallColor)
    }, [pWallColor, bWallColor])

    return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar disableGutters>
            <Typography variant="span" component="div" sx={{ flexGrow: 1 }}>
              Plot Layout
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Typography variant="span" component="div" sx={{  }}>
                  Plot wall color:
                </Typography>
                <ColorPicker
                    name='plot-color'
                    value={pWallColor}
                    onChange={color => setPWallColor(color)}
                />
                <Typography variant="span" component="div" sx={{  }}>
                  Builtup wall color:
                </Typography>
                <ColorPicker
                    name='builtup-color'
                    value={bWallColor}
                    onChange={color => setBWallColor(color)}
                />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
    );
  }

export default ToolBar;
