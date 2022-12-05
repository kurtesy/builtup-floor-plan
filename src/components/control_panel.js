import React, { useState } from 'react';
import { Box, TextField, InputAdornment, ListSubheader,
         List, ListItem, Typography, CssBaseline } from '@mui/material';
import { ThemeProvider, styled } from "@mui/material/styles";

export default function ControlPanel ({ props, theme, updateCallback }) {
    const [metrics, setMetrics] = useState({ ...props })

    const controlPanel = [
        [{
            id: 'plotLength.ft',
            title: 'Plot Length',
            value: metrics.plotLength.ft,
            // helperText: "Specify length of the plot"
        },
        {
            id: 'plotLength.in',
            value: metrics.plotLength.in,
            // helperText: "Specify length of the plot"
        }],
        [{
            id: "plotBreadth.ft",
            title: "Plot Breadth",
            value: metrics.plotBreadth.ft,
            // helperText: "Specify breadth of the plot"
        },
        {
            id: "plotBreadth.in",
            value: metrics.plotBreadth.in,
            // helperText: "Specify breadth of the plot"
        }],
        [{
            id: "pWallTkn.ft",
            title: "Plot wall thickness",
            value: metrics.pWallTkn.ft,
            // helperText: "Specify length of the plot"
        },
        {
            id: "pWallTkn.in",
            value: metrics.pWallTkn.in,
            // helperText: "Specify length of the plot"
        }],
        [{
            id: "gap.ft",
            title: "Setback gap",
            value: metrics.gap.ft,
            // helperText: "Leave offsets (setback)"
        },
        {
            id: "gap.in",
            value: metrics.gap.in,
            // helperText: "Leave offsets (setback)"
        }],
        [{
            id: "roomLength.ft",
            title: "Built-up Length",
            value: metrics.roomLength.ft,
            // helperText: "Specify length of the Builtup Area"
        },
        {
            id: "roomLength.in",
            value: metrics.roomLength.in,
            // helperText: "Specify length of the Builtup Area"
        }],
        [{
            id: "roomBreadth.ft",
            title: "Built-up breadth",
            value: metrics.roomBreadth.ft,
            // helperText: "Specify breadth of the Builtup Area"
        },
        {
            id: "roomBreadth.in",
            value: metrics.roomBreadth.in,
            // helperText: "Specify breadth of the Builtup Area"
        }],
        [{
            id: "bWallTkn.ft", 
            title: "Builtup wall thickness",
            value: metrics.bWallTkn.ft,
            // helperText: "Specify Builtup wall thickness"
        },
        {
            id: "bWallTkn.in", 
            value: metrics.bWallTkn.in,
            // helperText: "Specify Builtup wall thickness"
        }],
    ]

    const updateMeasurements = (event, id,) => {
        const [metric, unit] = id.split('.')
        const unitUpdate = { [unit]: parseInt(event.target.value) }
        const metricUpdate = { ...metrics[metric], ...unitUpdate }
        setMetrics({ ...metrics, [metric]: metricUpdate })
        console.log('updateCallback', event, id)
        console.log('data', metrics)
        updateCallback(event, id, metrics)
        // const value = event.target.value
        // if(id.includes('-in') && value >=12) {
        //     const feetInp = document.getElementById(id.replace('-in', '-ft'))
        //     feetInp.
        // }
      }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <List className="control-list"
                subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Area measures
                </ListSubheader>
              }>
                {controlPanel.map((control, index) => {
                    const [ ftCtr, inCtr ] = control;
                    return (
                    <ListItem className="control-list-items" key={ftCtr.id}>
                    <Typography variant="body1">
                        {ftCtr.title}
                    </Typography>
                    <div className="input-metrics">
                    <TextField 
                        {...ftCtr}
                        required
                        key={ftCtr.id}
                        type="number"
                        InputProps={{
                            style: { width: '4rem', padding: 0, fontSize: '0.85rem', marginRight: '5px'},
                            endAdornment: <InputAdornment position="start" style={{fontSize: '0.75rem'}}>ft</InputAdornment>,
                        }}
                        size="small"
                        variant="outlined"
                        onChange={(event) => updateMeasurements(event, ftCtr.id)}
                    />
                    <TextField 
                        {...inCtr}
                        required
                        key={inCtr.id}
                        type="number"
                        InputProps={{
                            style: { width: '4rem', padding: 0, fontSize: '0.85rem', marginRight: '5px'},
                            endAdornment: <InputAdornment position="start" style={{fontSize: '0.75rem'}}>in</InputAdornment>,
                        }}
                        size="small"
                        variant="outlined"
                        onChange={(event) => updateMeasurements(event, inCtr.id)}
                    />
                    </div>
                    </ListItem>)
                })}
                </List>
        </ThemeProvider>
    );
  }
