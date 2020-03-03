import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { PageScrollToTop } from '../../../tools';
import { Layout, Menu } from 'antd';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import { Card } from 'antd';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import history from '../../../common/history';

const { Header, Content } = Layout;

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

export class HomePage extends Component {
    state = {
        key: 'tab1',
        noTitleKey: '最近通话',
    };

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    componentDidMount() {
        PageScrollToTop();
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        return <Layout className="HomePage">
            <Header className="head">
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
            </Header>

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
                        {/*<CalendarOutlined />*/}
                        {/* 近三个月的活动 */}
                        <Card title="近三个月的活动" className="latestThreeMonthsActivities" extra={<a href="#">详情</a>}>
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
                        </Card>
                    </Col>

                    {/* 右边 */}
                    <Col lg={{ span: 12, offset: 0 }}>
                        {/* 更新日志 */}
                        <Card title="更新日志" className="releaseNotes" extra={<a href="#">详情</a>}>
                            <p>Dec 22, 2019 Enhancement: add emotions to activities</p>
                            <p>Aug 17, 2019 New feature: you can now change avatars</p>
                            <p>May 04, 2019 New feature: WebAuthn two factor authentication</p>
                        </Card>

                        {/* tabs */}
                        <Card
                            className="tabs"
                            tabList={tabList}
                            activeTabKey={this.state.noTitleKey}
                            // tabBarExtraContent={<a href="#">More</a>}
                            onTabChange={key => {
                                this.onTabChange(key, 'noTitleKey');
                            }}
                        >
                            {contentListNoTitle[this.state.noTitleKey]}
                        </Card>

                        {/* summary */}
                        <Card className="summary">
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
                        </Card>
                    </Col>
                </Row>
            </Content>

            <footer>
                有什么意见吗？ 给我发电子邮件 隐私条款 新闻简报 版本说明 捐助 版本：2.16.0
            </footer>
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
