import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Layout, Menu } from 'antd';
import { Row, Col } from 'antd';
import { Breadcrumb } from 'antd';

import {
    HeadComp,
    FooterComp, BtnAddContactComp,
} from '../';
import history from '../../../common/history';
import { ContactsListComp } from '../';

const { Content } = Layout;


export class ContactsPage extends Component {
    state = {};

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return <Layout className="ContactsPage">
            <div>
                <HeadComp/>

                <Row>
                    <Col span={16} offset={4}>
                        <Content
                            className="content"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Row>
                                <Col>
                                    <Breadcrumb>
                                        <Breadcrumb.Item onClick={() => history.push('/')}>
                                            <a href="javascript: void(0)">仪表盘</a>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>联系人</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                            </Row>

                            <Row gutter={18} className="cards">
                                <Col lg={{ span: 18, offset: 0 }}>
                                    < ContactsListComp/>
                                </Col>
                                <Col lg={{ span: 6, offset: 0 }}>
                                    <BtnAddContactComp/>
                                </Col>
                            </Row>
                        </Content>
                    </Col>
                </Row>
            </div>

            <FooterComp/>
        </Layout>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
