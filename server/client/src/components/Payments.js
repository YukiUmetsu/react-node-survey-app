/**
 * Created by yukiX on 2018/03/03.
 */
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                amount={500}
                name="Emaily"
                description="$5 for 5 email credits"
                token={token=>this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">ADD CREDITS</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);