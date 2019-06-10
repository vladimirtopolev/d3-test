import React, { useState } from 'react';
import CoordinatePanel from './CoordinatePanel';
import CutPointsManager from './CutPointsManager';
import {SUPPORTED_VOLTAGES} from '../constants'

export default () => {

    const [points, updatePoints] = useState([]);
    const addPoint = () => updatePoints(points.concat({ current: 0, label: '', voltage: SUPPORTED_VOLTAGES[0], show: true }));
    const deletePoint = (deletedPoint) => updatePoints(points.filter(point => deletedPoint !== point));
    const updatePoint = (updatingPoint, key, newValue) =>
        updatePoints(points.map(point => updatingPoint === point ? { ...point, [key]: newValue } : point));

    return (
        <div>
            <CoordinatePanel cutPoints={points}/>
            <CutPointsManager points={points} addPoint={addPoint} deletePoint={deletePoint} updatePoint={updatePoint}/>
        </div>
    );
}
