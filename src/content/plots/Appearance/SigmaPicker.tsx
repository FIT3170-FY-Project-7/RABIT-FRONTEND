import React from 'react'

function SigmaPicker({ handleSigmaChange }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
            <label htmlFor='sigma-picker'>Sigmas</label>
            <input
                name='sigma-picker'
                type='number'
                min={1}
                max={4}
                defaultValue={3}
                onChange={event => handleSigmaChange(event)}
                style={{ height: '60%', aspectRatio: '1', fontSize: '20px', textAlign: 'center' }}
            ></input>
        </div>
    )
}

export default SigmaPicker
