import React, { Component } from 'react';
import _ from 'lodash'
import { VectorMap } from "react-jvectormap"
import { Search } from 'semantic-ui-react'

const { getNames } = require('country-list');

class Map extends Component {
  constructor() {
    super()
    this.state = {
      names: [],
      value: '',
      loading: false,
      color: '#48aeef'
    }
  }

  componentDidMount() {
    const names = getNames();
    let namesInObj = []
    for (let i = 0; i < names.length; i++) {
      namesInObj.push({'name': names[i]})
    }
    this.setState({
      names: namesInObj
    })
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ loading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({ loading: false, names: [], value: ''})

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.name)

      this.setState({
        loading: false,
        names: _.filter(this.state.names, isMatch),
      })
    }, 300)
  }

  render() {
    const { loading, value, names } = this.state
    return (
      <div>
        <Search
            input={{ icon: 'search', iconPosition: 'left' }}
            loading={loading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={names}
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