import React, { useState } from 'react';

export default ({ points, addPoint, deletePoint, updatePoint }) => {
    const updateField = (point, fieldName) => {
        return (e) => {
            updatePoint(point, fieldName, e.target.value);
        }
    };

    return (
        <div>
            <button onClick={addPoint}>Добавить точку</button>
            <table>
                <thead>
                <th>
                    <td>Название</td>
                    <td>Ток. А</td>
                    <td></td>
                </th>
                </thead>
                <tbody>
                {points.map((point) => (
                    <tr>
                        <td>
                            <input
                                type="text"
                                value={point.label}
                                onChange={updateField(point, 'label')}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={point.value}
                                onChange={updateField(point, 'value')}
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
