import axios from 'axios';
import { FETCH_CATALOG_SETS, FETCH_CATALOG_SETS_SUCCESS } from './typeActions';
import {normalize} from 'normalizr';
import {catalogSetList} from '../models';
/**
 * fetch catalog sets by their type
 * @param catalogType {string} - catalog type, available values: FUSE, SWITCHER
 * */
export function fetchCatalogSets(catalogType) {
    return (dispatch) => {
        dispatch({ type: FETCH_CATALOG_SETS });
        axios.get(`/api/tools/drawcharacteristic/catalog?type=${catalogType}`)
            .then(response => {
                dispatch({
                    type: FETCH_CATALOG_SETS_SUCCESS,
                    payload: normalize(response.data, catalogSetList),
                    catalogType
                })
            })
    }
}