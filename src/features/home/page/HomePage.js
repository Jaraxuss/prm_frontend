import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import {
    HeadComp,
    FooterComp,
    LatestThreeMonthsActivitiesCardComp,
    ReleaseNotesComp,
    TabsComp,
    SummaryComp,
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
            <HeadComp/>

            <Content
                className="content"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                {/* first line */}
                <Row className="firstLine">
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <Row>
                            <Col span={5}>
                                <div>最近添加：</div>
                            </Col>
                            <Col span={19}>
                                <div className="latestContacts">JA</div>
                                <div className="latestContacts">JA</div>
                                <div className="latestContacts">JA</div>
                                <div className="latestContacts">JA</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={{ span: 2, offset: 12 }}>
                        <Button className="BtnAddContact" type="primary" shape="round" icon={<PlusCircleOutlined/>}
                                style={{ background: '#2f4d70', borderColor: '#2f4d70' }}>
                            添加联系人
                        </Button>
                    </Col>
                </Row>

                {/* main content */}
                <Row className="cards">
                    {/*左边*/}
                    <Col lg={{ span: 10, offset: 2 }}>
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
