import { CONTROL_LOADING } from './constants';

export function handleControlLoading(flag) {
    return {
        type: CONTROL_LOADING,
        isShowLoading: flag,
    };
}

export function reducer(state, action) {
    switch (action.type) {

        case CONTROL_LOADING:
            return {
                ...state,
                isShowLoading: action.isShowLoading,
            };

        default:
            return state;
    }

}