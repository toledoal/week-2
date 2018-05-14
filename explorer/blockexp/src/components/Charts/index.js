import React, { Component } from 'react';
import {scaleLinear} from 'd3-scale';
import {
    Crosshair,
    HorizontalGridLines,
    MarkSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis,
    Voronoi
  } from 'react-vis';
  
  const DATA = [
    {x: 1, y: 4, size: 9},
    {x: 1, y: 5, size: 18},
    {x: 1, y: 10, size: 5},
    {x: 1, y: 11, size: 29},
    {x: 1, y: 13.9, size: 5},
    {x: 1, y: 14, size: 8},
    {x: 1.5, y: 11.8, size: 25},
    {x: 1.7, y: 9, size: 30},
    {x: 2, y: 5, size: 11},
    {x: 2.1, y: 11.8, size: 28},
    {x: 2.4, y: 7.9, size: 14},
    {x: 2.4, y: 13.5, size: 20},
    {x: 2.7, y: 13.7, size: 14},
    {x: 2.9, y: 7.7, size: 26},
    {x: 3, y: 5.4, size: 6}
  ];
  
  const x = scaleLinear()
    .domain([1, 100])
    .range([20, 600]);
  const y = scaleLinear()
    .domain([0, 2])
    .range([0, 100]);

  

 class Charts extends React.Component {
        state = {
          data: DATA,
          selectedPointId: null,
          showVoronoi: true
        }

        constructor(props) {
            super(props);

            this.state = {
                data: this.props.data,
                transactionData: this.props.data,
                selectedPointId: null,
                showVoronoi: true
            }
        }

        //  componentWillReceiveProps(nextProps) {
        //    if (this.props.data !== nextProps.data) {

        //    }
        //  }
        //      let txData = nextProps.data.map((tx, i) => {
        //          return {x: i, y: (tx.gas/10000), size: (parseInt(tx.value)/100000000000000000) }
        //      });
        //    this.setState({data: nextProps.data, transactionData: txData});
        //  }
        // }
      
        /**
         * Event handler for onNearestXY.
         * @param {Object} value Selected value.
         * @private
         */
        _onNearestXY = (value, {index}) => {
          this.setState({selectedPointId: index});
        }
      
        /**
         * Event handler for onMouseLeave.
         * @private
         */
        _onMouseLeave = () => {
          this.setState({selectedPointId: null});
        }
      
        render() {
          const {transactionData, selectedPointId, showVoronoi} = this.state;
          const dat = this.props.data;
          return (
            <div>
              <label style={{display: 'block'}}>
                <input type="checkbox"
                  checked={showVoronoi}
                  onChange={e => this.setState({showVoronoi: !showVoronoi})}
                />
                Show Voronoi
              </label>
              <XYPlot
                onMouseLeave={this._onMouseLeave}
                width={600}
                height={600}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <MarkSeries
                  className="mark-series-example"
                  colorType="literal"
                  data={dat.map((point, index) =>
                    ({...point, color: selectedPointId === index ? '#FF9833' : '#12939A'}))}
                  onNearestXY={this._onNearestXY}
                  sizeRange={[5, 13]} />
                <Crosshair values={this.state.crosshairValues}/>
                <Voronoi
                  extent={[[40, 10], [600, 600]]}
                  nodes={dat}
                  polygonStyle={{stroke: showVoronoi ? 'rgba(0, 0, 0, .2)' : null}}
                  x={d => x(d.x)}
                  y={d => y(d.y)}
                />
              </XYPlot>
            </div>
          );
        }
      }

export default Charts;