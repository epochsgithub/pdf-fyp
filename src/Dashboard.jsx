import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";

export default function Dashboard() {
  return (
    <Fragment>
      <br />
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Card elevation={10} style={{}}>
            <CardContent>
              <Typography>
                <strong>PDF created:</strong> 100
              </Typography>
              <Typography>
                <strong>PDF download:</strong> 150
              </Typography>
              <Typography>
                <strong>PDF printed:</strong> 120
              </Typography>
              <Typography>
                <strong>PDF deleted:</strong> 50
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={3}></Grid> */}
      </Grid>
    </Fragment>
  );
}
