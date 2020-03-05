import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';


export class BtnAddJournalComp extends Component {

    state = {
        searchText: '',
        searchedColumn: '',
    };

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return <Button className="BtnAddJournalComp" type="primary"
                       icon={<PlusCircleOutlined/>}
                       style={{ background: '#2f4d70', borderColor: '#2f4d70' }}
        >
            添加日记
        </Button>;
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

export default connect(mapStateToProps, mapDispatchToProps)(BtnAddJournalComp);
