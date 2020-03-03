import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import history from '../../../common/history';
import { Layout, Menu, Input, Card, Col, Row } from 'antd';

const { Header } = Layout;

export class SummaryComp extends Component {

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        tabsClick: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

    }

    render() {
        return <Card className="summary">
            <Row justify="space-between">
                <Col span={8} className="updown">
                    <div>4</div>
                    <div>联系人</div>
                </Col>
                <Col span={8} className="updown">
                    <div>1</div>
                    <div>活动</div>
                </Col>
                <Col span={8} className="updown">
                    <div>0</div>
                    <div>礼物</div>
                </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(SummaryComp);
