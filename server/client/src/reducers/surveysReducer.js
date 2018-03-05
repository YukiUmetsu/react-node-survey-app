/**
 * Created by yukiX on 2018/03/04.
 */
import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}