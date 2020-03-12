import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Layout, Menu } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { Breadcrumb } from 'antd';
import { StarOutlined, TeamOutlined, PhoneOutlined, HeartOutlined } from '@ant-design/icons';


import {
    HeadComp,
    FooterComp, BtnAddContactComp,
} from '../';
import history from '../../../common/history';
import { ContactsListComp } from '../';

const { Content } = Layout;


export class ContactDetailPage extends Component {
    state = {};

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return <Layout className="ContactDetailPage">
            <HeadComp/>

            <Row className="mainContent">
                <Col span={16} offset={4}>
                    <Content
                        className="content"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={() => history.push('/')}>
                                <a href="javascript: void(0)">仪表盘</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => history.push('/contacts')}>
                                <a href="javascript: void(0)">联系人</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Jack</Breadcrumb.Item>
                        </Breadcrumb>

                        <div className="topInfo">
                            <div className="icon">JA</div>
                            <div className="summaryPanel">
                                <Button className="editContact">编辑联系人信息</Button>

                                <div className="innerBox">
                                    <div className="userName">
                                            <span className="userNameText">
                                                Jack ABC (HH)
                                            </span>
                                        &nbsp;&nbsp;
                                        <StarOutlined className="startIcon"/>
                                    </div>
                                    <div className="quickInfo">
                                        <span className="latestActivities">
                                            <TeamOutlined style={{
                                                fontSize: '1.2rem',
                                            }}/>
                                            &nbsp;
                                            最近一起的活动：未知
                                        </span>
                                        &nbsp;&nbsp;&nbsp;
                                        <span className="latestCall">
                                            <PhoneOutlined style={{
                                                fontSize: '1.2rem',
                                            }}/>
                                            &nbsp;
                                            最近通话：未知
                                        </span>
                                        &nbsp;&nbsp;&nbsp;
                                        <a href="javascript: void(0)" className="mostCall">
                                            <HeartOutlined/>
                                            &nbsp;
                                            常联系
                                        </a>
                                    </div>
                                    <div className="tags">
                                        还没有标签
                                        &nbsp;
                                        <a href="javascript: void(0)" className="addTag">添加标签</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="belowInfo">
                            <div className="leftPanel">
                                <div className="leftItem">
                                    <div className="innerBox">
                                        <div className="title">恋爱关系</div>
                                        <div className="secondLine">
                                            <span className="tag">配偶</span>
                                            <a href="javascript: void(0)" className="user">小马 宋 (小马)</a>
                                            <a href="javascript: void(0)" className="edit">编辑</a>
                                            <a href="javascript: void(0)" className="delete">删除</a>
                                        </div>
                                        <a href="javascript: void(0)" className="add">添加</a>
                                    </div>
                                </div>
                                <div className="leftItem">
                                    <div className="innerBox">
                                        <div className="title">家庭关系</div>
                                        <div className="secondLine">
                                            <span className="tag">父亲</span>
                                            <a href="javascript: void(0)" className="user">操哥 曹 (操哥)</a>
                                            <a href="javascript: void(0)" className="edit">编辑</a>
                                            <a href="javascript: void(0)" className="delete">删除</a>
                                        </div>
                                        <a href="javascript: void(0)" className="add">添加</a>
                                    </div>
                                </div>
                                <div className="leftItem">
                                    <div className="innerBox">
                                        <div className="title">其他关系</div>
                                        <div className="secondLine">
                                        </div>
                                        <a href="javascript: void(0)" className="add">添加</a>
                                    </div>
                                </div>
                                <div className="leftItem">
                                    <div className="innerBox">
                                        <div className="title">宠物</div>
                                        <div className="secondLine">
                                        </div>
                                        <a href="javascript: void(0)" className="add">添加</a>
                                    </div>
                                </div>
                                <div className="leftItem">
                                    <div className="innerBox">
                                        <div className="title">联系信息</div>
                                        <div className="secondLine">
                                        </div>
                                        <a href="javascript: void(0)" className="add">添加</a>
                                    </div>
                                </div>
                                <div className="leftItem">
                                    <div className="innerBox">
                                        <div className="title">地址</div>
                                        <div className="secondLine">
                                        </div>
                                        <a href="javascript: void(0)" className="add">添加</a>
                                    </div>
                                </div>
                            </div>
                            <div className="rightPanel">
                            </div>
                        </div>
                    </Content>
                </Col>
            </Row>

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

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailPage);
