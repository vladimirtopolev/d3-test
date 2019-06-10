import catalog from './catalogCharacterisctics';
import dependentCurrentCatalog from './dependentCurrentCharacteristics';

export default (app) => {
    app.route('/api/tools/drawcharacteristic/catalog')
        .get(catalog.getCatalogs);

    app.route('/api/tools/drawcharacteristic/catalog/:id')
        .get(catalog.getCatalog);

    app.route('/api/tools/drawcharacteristic/dependentCurrentCatalog')
        .get(dependentCurrentCatalog.getCatalogs);
}