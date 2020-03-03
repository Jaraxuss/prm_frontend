import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import history from '../../../common/history';
import { Layout, Menu, Input, Card, Col } from 'antd';

const { Header } = Layout;

const tabList = [
    {
        key: '最近通话',
        tab: '最近通话',
    },
    {
        key: '收藏便签',
        tab: '收藏便签',
    },
    {
        key: '债务',
        tab: '债务',
    },
    {
        key: '任务',
        tab: '任务',
    },
];

const contentListNoTitle = {
    '最近通话': <p>您还没有电话拨打记录。</p>,
    '收藏便签': <p>您还没有任何便签。</p>,
    '债务': <p>您还没有添加债务信息。</p>,
    '任务': <p>与任务相关的联系人 (0) 您的任务 (0)</p>,
};

export class TabsComp extends Component {

    state = {
        noTitleKey: '最近通话',
    };

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        tabsClick: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        return <Card
            className="tabs"
            tabList={tabList}
            activeTabKey={this.state.noTitleKey}
            // tabBarExtraContent={<a href="#">More</a>}
            onTabChange={key => {
                this.onTabChange(key, 'noTitleKey');
            }}
        >
            {contentListNoTitle[this.state.noTitleKey]}
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

export default connect(mapStateToProps, mapDispatchToProps)(TabsComp);
