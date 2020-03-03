import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { connect } from 'react-redux';
import { store } from '../../index';
import { getQueryString, HTTP_REQUEST_QUEUE, request } from '../../tools/index';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export class App extends Component {
    static propTypes = {
        children: PropTypes.node,
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    static defaultProps = {
        children: '',
    };

    render() {
        return (
            <div className="home-app">
                <div className="page-container">{this.props.children}</div>
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        home: state.home,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);