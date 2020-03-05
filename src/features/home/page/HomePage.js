import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import {
    HeadComp,
    FooterComp,
    LatestThreeMonthsActivitiesCardComp,
    ReleaseNotesComp,
    TabsComp,
    SummaryComp,
    BtnAddContactComp,
} from '../';

const { Content } = Layout;


export class HomePage extends Component {
    state = {};

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return <Layout className="HomePage">
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
                            {/* first line */}
                            <Row justify="space-between" className="firstLine">
                                <Col lg={{ span: 16, offset: 0 }}>
                                    <Row>
                                        <Col span={4}>
                                            <div>最近添加：</div>
                                        </Col>
                                        <Col span={20}>
                                            <div className="latestContacts">JA</div>
                                            <div className="latestContacts">JA</div>
                                            <div className="latestContacts">JA</div>
                                            <div className="latestContacts">JA</div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <BtnAddContactComp/>
                                </Col>
                            </Row>

                            {/* main content */}
                            <Row gutter={18} className="cards">
                                {/*左边*/}
                                <Col lg={{ span: 12, offset: 0 }}>
                                    {/* 近三个月的活动 */}
                                    <LatestThreeMonthsActivitiesCardComp/>
                                </Col>

                                {/* 右边 */}
                                <Col lg={{ span: 12, offset: 0 }}>
                                    {/* 更新日志 */}
                                    <ReleaseNotesComp/>

                                    {/* tabs */}
                                    <TabsComp/>

                                    {/* summary */}
                                    <SummaryComp/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
