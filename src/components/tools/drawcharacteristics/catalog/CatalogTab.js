import React from 'react';
import PropTypes from 'prop-types';
import UploadCatalogSetModal from './UploadCatalogSetModal';

export default class CatalogTab extends React.Component {
    state = {
        showUploadCatalogSetModal: false,
        uploadedCatalogSets: []
    };

    toggleUploadCatalogSetModal = () => {
        this.setState(prevState =>
            Object.assign({}, this.state, { showUploadCatalogSetModal: !prevState.showUploadCatalogSetModal }))
    };

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.toggleUploadCatalogSetModal}>Добавить каталог</button>
                    {this.state.uploadedCatalogSets}
                    <UploadCatalogSetModal
                        toggle={this.toggleUploadCatalogSetModal}
                        isOpen={this.state.showUploadCatalogSetModal}
                        catalogType={this.props.type}/>
                </div>
            </div>
        );
    }
}

CatalogTab.propTypes = {
    type: PropTypes.string.isRequired
};

