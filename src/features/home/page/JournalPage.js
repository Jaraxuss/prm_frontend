import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Layout, Menu } from 'antd';
import { Row, Col } from 'antd';
import { Breadcrumb } from 'antd';
import {
    SmileOutlined,
    MehOutlined,
    FrownOutlined,
} from '@ant-design/icons';


import { HeadComp, FooterComp } from '../';
import history from '../../../common/history';

const { Content } = Layout;


export class JournalPage extends Component {
    state = {};

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return <Layout className="JournalPage">
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
                                        <Breadcrumb.Item>日记</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                            </Row>

                            <Row gutter={18} className="cards">
                                <Col lg={{ span: 18, offset: 0 }}>
                                    <div className="cardLeft">
                                        <div className="moodInput">
                                            <Row>
                                                <Col span={20} offset={0}>
                                                    {/*<div className="fuck"></div>*/}
                                                    <div className="welcomeText">
                                                        今天过得怎么样？你可以每天给它一次评价。
                                                    </div>
                                                </Col>
                                                <Col span={4} offset={0}>
                                                    <SmileOutlined className="moods"/>
                                                    <MehOutlined className="moods"/>
                                                    <FrownOutlined className="moods"/>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="cardBottom" style={{ marginTop: '20px' }}>
                                            <Row>
                                                <Col span={4} offset={0}>
                                                    <div className="calendar">
                                                        <div className="innerBox">
                                                            二月<br/>
                                                            2020
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col span={20} offset={0}>
                                                    <div className="fuck bbbbb"></div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={{ span: 6, offset: 0 }}>
                                    <div className="fuck"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(JournalPage);
