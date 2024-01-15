import { CardContent, CardHeader } from '@mui/material';
import React from 'react';

import { Card, TextField } from '@mui/material';

export default function SideSelector(lightNumber) {

    return (
        <Card variant="outlined" sx={{width : 200}}>
            <CardHeader title={"Selector options"}></CardHeader>
            <CardContent>
            <TextField
                required
                name="light_number"
                variant="outlined"
                type="number"
                label="Light number"
                defaultValue={5}
                sx={{m: 1}}
                //onChange={(e) => {handleInputChange(e)}}
                inputProps={{
                    type : "number",
                    min : 1,
                    max : lightNumber
                }}
            />
            </CardContent>
        </Card>
    );
}
