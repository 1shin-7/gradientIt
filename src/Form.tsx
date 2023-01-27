import React, {useEffect, useState} from 'react';

import {gradient} from './Gradient'
import {MuiColorInput} from 'mui-color-input'
import {CopyField} from '@eisberg-labs/mui-copy-field';
import {Card, CardContent, Container, Grid, TextField, Typography} from '@mui/material';



export default function Form() {
    const [textInput, setText] = useState("Type ur text")
    const [colorStart, setColorS] = useState("rgb(255, 0, 0)");
    const [colorEnd, setColorE] = useState("rgb(0, 0, 255)");

    const [result, updateResult] = useState(gradient(textInput, colorStart, colorEnd));

    const handleColorS = (color: React.SetStateAction<string>) => {
        setColorS(color);
    }

    const handleColorE = (color: React.SetStateAction<string>) => {
        setColorE(color);
    }

    useEffect(()=>{
        updateResult(gradient(textInput, colorStart, colorEnd));
    }, [textInput, colorStart, colorEnd, result])

    return (
        <Container fixed>
            <Card>
                <Grid container spacing={2} sx={{padding: "20px"}}>
                    <Grid item xs={12}>
                        <TextField fullWidth value={textInput} onChange={e=>{setText(e.target.value)}}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiColorInput value={colorStart} onChange={handleColorS} fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiColorInput value={colorEnd} onChange={handleColorE} fullWidth/>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Preview
                                    </Typography>
                                    <Typography>
                                        {result.raw.map((char, index) => (
                                            <span style={{color: char.color.toRgbString()}}>
                                                {char.char}
                                            </span>
                                        ))}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <CopyField
                                label="Click on copy Button"
                                value={result.text} fullWidth
                                onCopySuccess={console.log}
                                onCopyError={console.log}
                                copyTooltip={"copy colored text"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}
