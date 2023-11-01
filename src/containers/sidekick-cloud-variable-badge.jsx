import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setCloudHost} from '../reducers/sidekick';
import CloudVariableBadge from '../components/sidekick-cloud-variable-badge/cloud-variable-badge.jsx';
import bindAll from 'lodash.bindall';
import {openUsernameModal} from '../reducers/modals';

class SidekickCloudVariableBadge extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeCloudHost'
        ]);
    }

    handleChangeCloudHost (cloudHost) {
        this.props.onSetCloudHost(cloudHost);
    }

    render () {
        return (
            <CloudVariableBadge
                cloudHost={this.props.cloudHost}
                onSetCloudHost={this.handleChangeCloudHost}
                onOpenChangeUsername={this.props.onOpenChangeUsername}
            />
        );
    }
}

SidekickCloudVariableBadge.propTypes = {
    cloudHost: PropTypes.string,
    onSetCloudHost: PropTypes.func,
    onOpenChangeUsername: PropTypes.func
};

const mapStateToProps = state => ({
    cloudHost: state.scratchGui.sidekick.cloudHost
});

const mapDispatchToProps = dispatch => ({
    onSetCloudHost: cloudHost => dispatch(setCloudHost(cloudHost)),
    onOpenChangeUsername: () => dispatch(openUsernameModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidekickCloudVariableBadge);
