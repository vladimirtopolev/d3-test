import { normalize, schema } from 'normalizr';


export const catalogItem = new schema.Entity('catalogItem', {}, {idAttribute: '_id'});
export const catalogSet = new schema.Entity('catalogSets', {
    items: [catalogItem]
}, {idAttribute: '_id'});
export const catalogSetList = new schema.Array(catalogSet);