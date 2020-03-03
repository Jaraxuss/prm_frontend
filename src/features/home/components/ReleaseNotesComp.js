import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import history from '../../../common/history';
import { Layout, Menu, Input, Card, Col } from 'antd';

const { Header } = Layout;


export class ReleaseNotesComp extends Component {

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        tabsClick: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <Card title="更新日志" className="releaseNotes" extra={<a href="#">详情</a>}>
            <p>Dec 22, 2019 Enhancement: add emotions to activities</p>
            <p>Aug 17, 2019 New feature: you can now change avatars</p>
            <p>May 04, 2019 New feature: WebAuthn two factor authentication</p>
        </Card>;
    }
}

function mapStateToProps(state) {
    return {
        home: state.home,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseNotesComp);
