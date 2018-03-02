/**
 * Created by yukiX on 2018/02/28.
 */
import { FETCH_USER } from '../actions/types';

export default function (state=null, action) {
    switch (action.type){
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}