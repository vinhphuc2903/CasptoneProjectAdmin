import React from 'react';
import Currency from 'react-currency-formatter';
import PropTypes from 'prop-types';

function Price (props) {
    const { symbol = "", pattern="##,###! " } = props
    return (
        <Currency
            quantity={Number.parseInt(props.price)}
            currency="VND"
            pattern={pattern}
            symbol={symbol}
        />
    );
}

Price.propTypes = {
    price: PropTypes.number
}
export default Price;