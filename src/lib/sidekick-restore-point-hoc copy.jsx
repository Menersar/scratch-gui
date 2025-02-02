// import React from 'react';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import {showStandardAlert, closeAlertWithId} from '../reducers/alerts';
// import {getIsShowingProject} from '../reducers/project-state';
// import bindAll from 'lodash.bindall';
// import VM from 'scratch-vm';
// import RestorePointAPI from './sidekick-restore-point-api';

// /**
//  * @fileoverview
//  * HOC responsible for automatically creating restore points.
//  */

// const INTERVAL = 1000 * 60 * 5;

// let bailed = false;

// const disabled = () => bailed || window.DISABLE_RESTORE_POINTS;

// const SidekickRestorePointHOC = function (WrappedComponent) {
//     class RestorePointComponent extends React.Component {
//         constructor (props) {
//             super(props);
//             bindAll(this, [
//                 'createRestorePoint'
//             ]);
//             this.timeout = null;
//         }
//         componentDidUpdate (prevProps) {
//             if (disabled()) {
//                 return;
//             }
//             if (
//                 this.props.projectChanged !== prevProps.projectChanged ||
//                 this.props.isShowingProject !== prevProps.isShowingProject
//             ) {
//                 if (this.props.projectChanged && this.props.isShowingProject) {
//                     // Project was modified; queue restore point.
//                     this.timeout = setTimeout(this.createRestorePoint, INTERVAL);
//                 } else {
//                     // Project was saved; abort restore point.
//                     clearTimeout(this.timeout);
//                     this.timeout = null;
//                 }
//             }
//         }
//         componentWillUnmount () {
//             clearTimeout(this.timeout);
//         }
//         async createRestorePoint () {
//             if (disabled()) {
//                 return;
//             }
//             try {
//                 this.props.onAutosavingStart();
//                 await RestorePointAPI.save(this.props.vm);
//             } catch (error) {
//                 bailed = true;
//             }
//             this.timeout = null;
//             // Intentional delay.
//             setTimeout(() => {
//                 this.props.onAutosavingFinish();
//                 if (this.timeout === null && !bailed && this.props.projectChanged && this.props.isShowingProject) {
//                     this.timeout = setTimeout(this.createRestorePoint, INTERVAL);
//                 }
//             }, 250);
//         }
//         render () {
//             const {
//                 /* eslint-disable no-unused-vars */
//                 projectChanged,
//                 onAutosavingStart,
//                 onAutosavingFinish,
//                 vm,
//                 /* eslint-enable no-unused-vars */
//                 ...props
//             } = this.props;
//             return (
//                 <WrappedComponent
//                     {...props}
//                 />
//             );
//         }
//     }
//     RestorePointComponent.propTypes = {
//         isShowingProject: PropTypes.bool,
//         projectChanged: PropTypes.bool,
//         onAutosavingStart: PropTypes.func,
//         onAutosavingFinish: PropTypes.func,
//         vm: PropTypes.instanceOf(VM)
//     };
//     const mapStateToProps = state => ({
//         isShowingProject: getIsShowingProject(state.scratchGui.projectState.loadingState),
//         projectChanged: state.scratchGui.projectChanged,
//         vm: state.scratchGui.vm
//     });
//     const mapDispatchToProps = dispatch => ({
//         onAutosavingStart: () => dispatch(showStandardAlert('sidekickAutosaving')),
//         onAutosavingFinish: () => dispatch(closeAlertWithId('sidekickAutosaving'))
//     });
//     return connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )(RestorePointComponent);
// };

// export {
//     SidekickRestorePointHOC as default
// };
