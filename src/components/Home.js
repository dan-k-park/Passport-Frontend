import React, { Component } from 'react';
import Map from './Map.js'

import { Grid, Segment } from 'semantic-ui-react'


class Home extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <Grid stackable divided columns={2} padded={true}>
        <Grid.Row stretched>
        <Grid.Column width={11}>
            <Segment>
              <Map />
            </Segment>
          </Grid.Column>
        <Grid.Column width={5}>
          <Segment>My Trips</Segment>
          <Segment>Top Trips</Segment>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home;