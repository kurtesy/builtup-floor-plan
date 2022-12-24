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
            id: 'plotLength.inc',
            value: metrics.plotLength.inc,
            // helperText: "Specify length of the plot"
        }],
        [{
            id: "plotBreadth.ft",
            title: "Plot Breadth",
            value: metrics.plotBreadth.ft,
            // helperText: "Specify breadth of the plot"
        },
        {
            id: "plotBreadth.inc",
            value: metrics.plotBreadth.inc,
            // helperText: "Specify breadth of the plot"
        }],
        [{
            id: "pWallTkn.ft",
            title: "Plot wall thickness",
            value: metrics.pWallTkn.ft,
            // helperText: "Specify length of the plot"
        },
        {
            id: "pWallTkn.inc",
            value: metrics.pWallTkn.inc,
            // helperText: "Specify length of the plot"
        }],
        [{
            id: "gap.ft",
            title: "Setback gap",
            value: metrics.gap.ft,
            // helperText: "Leave offsets (setback)"
        },
        {
            id: "gap.inc",
            value: metrics.gap.inc,
            // helperText: "Leave offsets (setback)"
        }],
        [{
            id: "builtupLength.ft",
            title: "Built-up Length",
            value: metrics.builtupLength.ft,
            readOnly: true
            // helperText: "Specify length of the Builtup Area"
        },
        {
            id: "builtupLength.inc",
            value: metrics.builtupLength.inc,
            readOnly: true
            // helperText: "Specify length of the Builtup Area"
        }],
        [{
            id: "builtupBreadth.ft",
            title: "Built-up breadth",
            value: metrics.builtupBreadth.ft,
            readOnly: true
            // helperText: "Specify breadth of the Builtup Area"
        },
        {
            id: "builtupBreadth.inc",
            value: metrics.builtupBreadth.inc,
            readOnly: true
            // helperText: "Specify breadth of the Builtup Area"
        }],
        [{
            id: "bWallTkn.ft", 
            title: "Builtup wall thickness",
            value: metrics.bWallTkn.ft,
            // helperText: "Specify Builtup wall thickness"
        },
        {
            id: "bWallTkn.inc", 
            value: metrics.bWallTkn.inc,
            // helperText: "Specify Builtup wall thickness"
        }],
    ]

    const updateMeasurements = (event, id) => {
        const [metric, unit] = id.split('.')
        const unitUpdate = { [unit]: parseInt(event.target.value) }
        const metricUpdate = { ...metrics[metric], ...unitUpdate }
        const temp = { ...metrics, [metric]: metricUpdate }

        // Update builtup dimension
        const builtUnitUpdate = { builtupBreadth: { ft: temp.plotBreadth.ft - 2*temp.gap.ft,
                                                    inc: temp.plotBreadth.inc - 2*temp.gap.inc, },
                                  builtupLength: { ft: temp.plotLength.ft - 2*temp.gap.ft,
                                                        inc: temp.plotLength.inc - 2*temp.gap.inc, } }
        setMetrics({ ...temp, ...builtUnitUpdate })
        console.log('OKK', temp, metricUpdate)
        updateCallback(event, id, metrics)
        // const value = event.target.value
        // if(id.inccludes('-in') && value >=12) {
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
                            readOnly: ftCtr.readOnly,
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
                            readOnly: inCtr.readOnly,
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
