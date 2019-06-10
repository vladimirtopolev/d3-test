import React from 'react';
import * as d3 from 'd3';
import findYatXbyBisection from '../utilities/svg/findYatXbyBisection'
import StaticTrackers from './StaticTrackers';
import {SUPPORTED_VOLTAGES} from './constants'
const data1 = {
    data: [
        { x: 5, y: 100 },
        { x: 6, y: 10 },
        { x: 7, y: 2 },
        { x: 8, y: 1 },
        { x: 9, y: 0.6 },
        { x: 10, y: 0.3 },
        { x: 20, y: 0.03 },
        { x: 25, y: 0.01 },
    ]
};

const data2 = {
    data: [
        { x: 5, y: 20 },
        { x: 40, y: 100 }
    ]
};


export default class CoordinatePanel extends React.Component {
    constructor(props) {
        super(props);
        this.workspace = React.createRef();
        this.xAxisArea = React.createRef();
        this.yAxisArea = React.createRef();
        this.linesArea = React.createRef();

        this.state = {
            maxScale: 3,
            minScale: 0.1,
            scale: 1,
            xMin: 0.001,
            yMin: 0.001,
            voltage: SUPPORTED_VOLTAGES[0],
            width: 460,
            height: 460,
            margin: {
                top: 20,
                bottom: 20,
                left: 40,
                right: 20
            },
            type: 'linear',
            lines: [
                data1,
                data2
            ],
            drawnLines: [],
            dynamicTrackerX: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            },
            dynamicTrackerYs: [],
            staticTrackers: []
        };
    }

    updateWorkspace = () => {
        const { scale, width, height, margin, xMin, yMin } = this.state;
        this.scaleX = this.createScaleType('linear')
            .domain([xMin, 50 * scale])
            .range([0, width]);
        this.scaleY = this.createScaleType('linear')
            .domain([100 * scale, yMin])
            .range([0, height]);

        this.buildAxises();
        this.buildLines();
    };

    createScaleType = () => this.state.type === 'linear' ? d3.scaleLinear() : d3.scaleLog();

    buildAxises = () => {
        this.xAxis = d3.axisBottom()
            .scale(this.scaleX)
            .ticks(10)
            .tickSize(this.state.width);
        d3.select(this.xAxisArea.current).call(this.xAxis);

        this.yAxis = d3.axisLeft()
            .scale(this.scaleY)
            .ticks(10, ',.1s')
            .tickSize(this.state.height);
        d3.select(this.yAxisArea.current).call(this.yAxis);
    };

    buildLines = () => {
        const lineTemplate = d3.line()
            .x((d, i) => this.scaleX(d.x))
            .y((d) => this.scaleY(d.y))
            .curve(d3.curveCatmullRom.alpha(0.5));
        d3.select(this.linesArea.current).selectAll('.curve').remove();
        this.drawnLines = this.state.lines.map((line) => {
            return d3.select(this.linesArea.current)
                .append('path')
                .datum(line.data)
                .attr('class', 'curve')
                .attr('d', lineTemplate)
                .attr('stroke', 'black')
                .attr('fill', 'none')
                .attr('stroke-width', '2px');
        });
    };

    mouseMove = (e) => {
        const { clientX } = e;
        const { width, margin } = this.state;

        this.setState({
            dynamicTrackerX: {
                x1: clientX,
                y1: margin.top,
                x2: clientX,
                y2: width + margin.top
            },
            dynamicTrackerYs: this.drawnLines.reduce((memo, line) => {
                const y = findYatXbyBisection(clientX - margin.left, line.node(), 0.1);
                return memo.concat({
                    x1: clientX,
                    y1: y + margin.top,
                    x2: width + margin.left,
                    y2: y + margin.top
                });
            }, [])
        });
    };


    componentDidMount() {
        this.updateWorkspace();
    }

    componentDidUpdate() {
        this.updateWorkspace();
    }


    toggleType = () => {
        this.setState({
                type: this.state.type === 'linear' ? 'log' : 'linear'
            },
            () => {
                this.updateWorkspace()
            });
    };

    upScale = () => {
        this.setState({
                scale: this.state.scale + 0.1
            },
            () => {
                this.updateWorkspace();
            }
        )
    };
    downScale = () => {
        this.setState({
                scale: this.state.scale - 0.1
            },
            () => {
                this.updateWorkspace();
            }
        )
    };

    changeXMin = (e) => {
        this.setState({
            xMin: +Number(e.target.value)
        }, () => {
            this.updateWorkspace();
        })
    };

    changeYMin = (e) => {
        this.setState({
            yMin: +Number(e.target.value)
        }, () => {
            this.updateWorkspace();
        })
    };

    render() {
        const { width, height, margin, dynamicTrackerX, dynamicTrackerYs, staticTrackers, type, xMin, yMin, voltage } = this.state;
        const { cutPoints } = this.props;
        const workspaceProps = { width, height, margin, scaleX: this.scaleX };
        console.log(voltage);
        return (
            <div>
                <button onClick={this.toggleType}>{type === 'linear' ? 'Линейная' : 'Логарифмическая'}</button>
                <button onClick={this.upScale}>-</button>
                <button onClick={this.downScale}>+</button>
                <input type="number" value={xMin} onChange={this.changeXMin}/>
                <input type="number" value={yMin} onChange={this.changeYMin}/>

                <select value={voltage.toString()}>
                    {SUPPORTED_VOLTAGES.map(voltage => (<option value={voltage}>{voltage}</option>))}
                </select>
                <svg
                    style={{ display: 'block' }}
                    ref={this.workspace}
                    width={width + margin.left + margin.right}
                    height={height + margin.top + margin.bottom}
                    onMouseMove={this.mouseMove}>
                    <g transform={`translate(${margin.left},${margin.top})`} className="xAxis" ref={this.xAxisArea}/>
                    <g transform={`translate(${margin.left + width},${margin.top})`} className="yAxis"
                       ref={this.yAxisArea}/>
                    <g transform={`translate(${margin.left}, ${margin.top})`} className="curves" ref={this.linesArea}/>
                    <g className='dynamicTracker'>
                        <line {...dynamicTrackerX} stroke="black" strokeWidth="2"/>
                        {dynamicTrackerYs.map(tracker => (
                            <line {...tracker} stroke="black" strokeWidth="2"/>
                        ))}
                    </g>
                    <StaticTrackers workspace={workspaceProps} drawnLines={this.drawnLines} cutPoints={cutPoints}
                                    type={type}/>
                </svg>
            </div>
        );
    }
}
