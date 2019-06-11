import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

const UploadCatalogSetModal = ({ toggle, isOpen, catalogSets, className }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
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
};

UploadCatalogSetModal.propTypes = {
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    catalogSets: PropTypes.array.isRequired
};

export default UploadCatalogSetModal;



