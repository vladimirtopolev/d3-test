import mongoose from 'mongoose';
import Catalog from '../../models/drawcharacteristics/catalogCharacteristic';

/**
 * Return all catalog sets.
 * There's opportunity filter data by type
 * If an invalid type was passed the method returns empty list of catalogs
 * */

export function getCatalogs(req, res) {
    let query = {};
    if (req.query && req.query.type) {
        query = { type: req.query.type };
    }

    Catalog.find(query, (err, catalog) => {
        if (err) {
            return res.send({ error: 'Cannot read catalogs' });
        }
        res.json({ catalog });
    });
}

export function getCatalog(req, res) {
    Catalog.findById(req.params.id, (err, catalog) => {
        if (err) {
            return res.send({ error: 'Cannot read catalog' });
        }
        res.json({ catalog });
    })
}

export default { getCatalogs, getCatalog };