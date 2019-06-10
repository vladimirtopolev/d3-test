import React, { useState } from "react";
import findYatXbyBisection from "../utilities/svg/findYatXbyBisection";

export default class StaticTrackers extends React.Component {

    state = {
        staticTrackers: []
    };
    buildStaticTrackers = () => {
        const { width, height, margin, scaleX } = this.props.workspace;
        console.log('STAT TRACKER', this.state);
        if (this.state.cutPoints
            && this.props.cutPoints === this.state.cutPoints.points
            && this.props.type === this.state.cutPoints.type) {
            return;
        }
        const staticTrackers = this.props.cutPoints.reduce((memo, point) => {
            return memo.concat({
                xTracker: {
                    x1: scaleX(point.value) + margin.left,
                    y1: margin.top,
                    x2: scaleX(point.value) + margin.left,
                    y2: height + margin.top
                },
                yTrackers: this.props.drawnLines.map(line => {
                    const y = findYatXbyBisection(scaleX(point.value), line.node(), 0.1);
                    return {
                        x1: scaleX(point.value) + margin.left,
                        y1: y + margin.top,
                        x2: width + margin.left,
                        y2: y + margin.top
                    }
                })
            })
        }, []);
        this.setState({
            staticTrackers,
            cutPoints: {
                points: this.props.cutPoints,
                type: this.props.type
            }
        })
    };

    componentDidUpdate(){
       this.buildStaticTrackers();
    }

    componentDidMount(){
        this.buildStaticTrackers();
    }

    render() {
        const {staticTrackers} = this.state;
        return (
            <g className='staticTrackers'>
                {staticTrackers.map(tracker => {
                    const { xTracker, yTrackers } = tracker;
                    return [
                        <line {...xTracker} stroke="red" strokeWidth="2"/>,
                        yTrackers.map(yTracker => (<line {...yTracker} stroke="red" strokeWidth="2"/>))
                    ]
                })}
            </g>
        )
    }
}
