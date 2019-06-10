import Catalog from '../../models/drawcharacteristics/dependentCurrentCharacteristic';

export function getCatalogs(req, res) {
    Catalog.find({}, (err, catalog) => {
        if (err) {
            return res.send({ error: 'Cannot read catalogs' });
        }
        res.json({ catalog });
    });
}

export default { getCatalogs };