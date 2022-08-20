import React from 'react'

function BlurSlider({ handleBlurChange }) {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div style={{ minWidth: '50px' }} id='appearance-configuration-slider-value'>
                1
            </div>
            <input
                type='range'
                min='0'
                max='5'
                step='0.1'
                defaultValue='1'
                onChange={event => handleBlurChange(event)}
            />
        </div>
    )
}

export default BlurSlider
