import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCatalogSets} from '../actions'
import UploadCatalogSetModal from './UploadCatalogSetModal';


class CatalogTab extends React.Component {
    state = {
        showUploadCatalogSetModal: false,
        uploadedCatalogSets: []
    };

    toggleUploadCatalogSetModal = () => {
        this.setState(prevState =>
            Object.assign({}, this.state, { showUploadCatalogSetModal: !prevState.showUploadCatalogSetModal }))
    };

    componentDidMount() {
        this.props.dispatch(fetchCatalogSets(this.props.type));
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.toggleUploadCatalogSetModal}>Добавить каталог</button>
                    {this.state.uploadedCatalogSets}
                    <UploadCatalogSetModal
                        toggle={this.toggleUploadCatalogSetModal}
                        isOpen={this.state.showUploadCatalogSetModal}
                        catalogSets={[]}/>
                </div>
            </div>
        );
    }
}

CatalogTab.propTypes = {
    type: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(CatalogTab);
