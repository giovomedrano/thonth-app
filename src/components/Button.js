import React from 'react'
import PropTypes from 'prop-types'

const Button = ({bgcolor, txtcolor, text, onClick}) => {
    return (
        <button 
            onClick={onClick}
            style={{
                // backgroundColor: bgcolor,
                // color: txtcolor,
                // 'border-radius': '5px',
                // display: 'inline-block'
            }}
            className='btn-kl'
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    bgcolor: 'steelblue',
    txtcolor: 'white'
}

Button.propTypes = {
    text: PropTypes.string,
    bgcolor: PropTypes.string,
    txtcolor: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button