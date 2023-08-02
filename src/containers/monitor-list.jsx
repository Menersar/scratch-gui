import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';

import {connect} from 'react-redux';
import {moveMonitorRect, resetMonitorLayout} from '../reducers/monitor-layout';

import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import OpcodeLabels from '../lib/opcode-labels';

import MonitorListComponent from '../components/monitor-list/monitor-list.jsx';

class MonitorList extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleMonitorChange'
        ]);
        OpcodeLabels.setTranslatorFunction(props.intl.formatMessage);
        this.state = {
            key: 0
        };
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.customStageSize !== nextProps.customStageSize) {
            this.props.resetMonitorLayout();
            this.setState({
                key: this.state.key + 1
            });
        }
    }
    handleMonitorChange (id, x, y) { // eslint-disable-line no-unused-vars
        this.props.moveMonitorRect(id, x, y);
    }
    render () {
        return (
            <MonitorListComponent
                onMonitorChange={this.handleMonitorChange}
                key={this.state.key}
                {...this.props}
            />
        );
    }
}

MonitorList.propTypes = {
    intl: intlShape.isRequired,
    resetMonitorLayout: PropTypes.func,
    moveMonitorRect: PropTypes.func.isRequired,
    monitorLayout: PropTypes.shape({
        monitors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        savedMonitorPositions: PropTypes.object // eslint-disable-line react/forbid-prop-types
    }).isRequired,
    customStageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.height
    })
};
const mapStateToProps = state => ({
    monitors: state.scratchGui.monitors,
    monitorLayout: state.scratchGui.monitorLayout,
    customStageSize: state.scratchGui.customStageSize
});
const mapDispatchToProps = dispatch => ({
    moveMonitorRect: (id, x, y) => dispatch(moveMonitorRect(id, x, y)),
    resetMonitorLayout: () => dispatch(resetMonitorLayout())
});

export default errorBoundaryHOC('Monitors')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(MonitorList))
);
