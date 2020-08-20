import React, { Component } from 'react';
import _ from 'lodash'
import { VectorMap } from "react-jvectormap"
import { Search } from 'semantic-ui-react'

const { getNames } = require('country-list');

const namesArr = getNames();

const source = []
namesArr.forEach(name => {
  source.push({'name': name})
})

class Map extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      value: '',
      isisLoading: false,
      color: '#48aeef'
    }
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({ isLoading: false, results: [], value: ''})

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <div>
        <Search
            input={{ icon: 'search', iconPosition: 'left' }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
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