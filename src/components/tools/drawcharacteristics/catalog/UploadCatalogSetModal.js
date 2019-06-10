import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import CatalogTab from "./CatalogTab";
import { CHARACTERISTIC_TYPES } from '../constants';

export default class UploadCatalogSetModal extends React.Component {
    state = {
        catalogSets: [],
        isLoading: true,
        error: null
    };

    componentDidMount() {
        const { catalogType } = this.props;
        axios.get(`/api/tools/drawcharacteristic/catalog?type=${catalogType}`)
            .then((response) => {
                this.setState({ catalogSets: response.data.catalog })
            });
    };

    render() {
        const { toggle, isOpen, title } = this.props;
        const { catalogSets } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={toggle} className={this.props.className}>
                <ModalHeader toggle={toggle}>Список каталогов</ModalHeader>
                <ModalBody>
                    <div>
                        {catalogSets.map(catalog => (
                            <div key={catalog._id}>
                                <div>{catalog.name}</div>
                                <div>
                                    <button>Добавить</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

        );
    }
}

UploadCatalogSetModal.propTypes = {
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    catalogType: PropTypes.oneOf([
        CHARACTERISTIC_TYPES.FUSE,
        CHARACTERISTIC_TYPES.SWITCHER
    ]).isRequired
};
