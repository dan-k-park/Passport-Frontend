import React, { Component } from 'react';
import Map from './Map.js'
import { Link } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react'


class Home extends Component {
  constructor() {
    super()
    this.state = {

    }

  }

  render() {
    return (
      <Grid stackable columns={2} padded={true}>
        <Grid.Row stretched>
        <Grid.Column width={11}>
            <Segment>
              <Map />
            </Segment>
          </Grid.Column>
        <Grid.Column width={5}>
          <Segment>
            My Passport
            <Link to={'/new'}>New Trip</Link>
          </Segment>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home;