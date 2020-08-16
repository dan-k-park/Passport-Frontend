import React, { Component } from 'react';
import { VectorMap } from "react-jvectormap"
import { Search } from 'semantic-ui-react'

const { getNames } = require('country-list');

class Map extends Component {
  constructor() {
    super()
    this.state = {
      names: [],
      searchValue: '',
      color: '#48aeef'
    }
  }

  componentDidMount() {
    this.setState({
      names: getNames()
    })
  }

  handleSearchChange = e => {
    this.setState()
  }


  render() {
    return (
      <div>
        <Search 
          onSearchChange={this.handleSearchChange}
          
        />
        <VectorMap
          map={"world_mill"}
          backgroundColor={"transparent"}//change it to ocean blue: #0077be
          zoomOnScroll={true}
          panOnDrag={true}
          containerStyle={{
            width: "100%",
            height: "520px"
          }}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "#0077be" //color for the clicked country
            },
            selectedHover: {}
          }}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: this.state.data, //this is your data
                scale: ["#146804", "#ff0000"], //your color game's here
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
      </div>
    )
  }
}

export default Map