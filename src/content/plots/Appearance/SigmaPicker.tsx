import React from 'react'

function SigmaPicker({ handleSigmaChange }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div>Sigmas</div>
            <input
                name='sigma-picker'
                type='number'
                min={1}
                max={4}
                defaultValue={3}
                onChange={event => handleSigmaChange(event)}
                style={{ height: '40px', aspectRatio: '1', fontSize: '20px', textAlign: 'center', borderRadius: '5%' }}
            ></input>
        </div>
    )
}

export default SigmaPicker
