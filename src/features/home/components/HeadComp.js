import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import history from '../../../common/history';
import { Layout, Menu, Input } from 'antd';

const { Header } = Layout;


export class HeadComp extends Component {

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        tabsClick: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <Header className="head">
            <Menu
                theme="dark"
                mode="horizontal"
                // defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px', background: '#2f4d70' }}
            >
                <Menu.Item key="1">LOGO</Menu.Item>
                <Menu.Item key="2">
                    <Input placeholder="搜索联系人..."/>
                </Menu.Item>
                <Menu.Item key="3" onClick={() => history.push('/')}>仪表盘</Menu.Item>
                <Menu.Item key="4" onClick={() => history.push('/contacts')}>联系人</Menu.Item>
                <Menu.Item key="5" onClick={() => history.push('/journal')}>日 记</Menu.Item>
                <Menu.Item key="6" onClick={() => history.push('/settings')}>设 置</Menu.Item>
                <Menu.Item key="7" onClick={() => history.push('/logout')}>登 出</Menu.Item>
            </Menu>
        </Header>;

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

export default connect(mapStateToProps, mapDispatchToProps)(HeadComp);
