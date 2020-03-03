import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import history from '../../../common/history';
import { Layout, Menu, Input, Card, Col } from 'antd';

const { Header } = Layout;


export class LatestThreeMonthsActivitiesCardComp extends Component {

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        tabsClick: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        // <CalendarOutlined />

        return <Card title="近三个月的活动" className="latestThreeMonthsActivities" extra={<a href="#">详情</a>}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(LatestThreeMonthsActivitiesCardComp);
