import React, { useState } from 'react';
import { SUPPORTED_VOLTAGES } from './constants';

export default ({ points, addPoint, deletePoint, updatePoint }) => {
    const updateField = (point, fieldName) => {
        return (e) => {
            const value = fieldName === 'show' ? e.target.value === 'false' : e.target.value;
            console.log(e.target.value);
            updatePoint(point, fieldName, value);
        }
    };

    return (
        <div>
            <button onClick={addPoint}>Добавить точку</button>
            <table>
                <thead>
                <th>
                    <td></td>
                    <td>Название</td>
                    <td>Напряжение, кВ</td>
                    <td>Ток. А</td>
                    <td></td>
                </th>
                </thead>
                <tbody>
                {points.map((point, i) => (
                    <tr key={i}>
                        <td>
                            <input
                                type="checkbox"
                                value={point.show}
                                checked={point.show}
                                onChange={updateField(point, 'show')}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={point.label}
                                onChange={updateField(point, 'label')}
                            />
                        </td>
                        <td>
                            <select value={point.voltage} onChange={updateField(point, 'voltage')}>
                                {SUPPORTED_VOLTAGES
                                    .map(voltage =>
                                        (<option value={voltage} key={voltage}>{voltage}</option>))}
                            </select>
                        </td>
                        <td>
                            <input
                                type="number"
                                value={point.current}
                                onChange={updateField(point, 'current')}
                            />
                        </td>
                        <td>
                            <button onClick={deletePoint.bind(null, point)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
