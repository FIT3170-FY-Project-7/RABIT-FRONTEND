import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'

function ColourPicker({ handleColourChange }) {
    const [displayColourPicker, setDisplayColourPicker] = useState(false)
    const handleClick = () => {
        setDisplayColourPicker(!displayColourPicker)
    }
    const handleClose = () => {
        setDisplayColourPicker(false)
    }
    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <button onClick={handleClick} style={{ width: '40px', height: '20px' }}></button>
            {displayColourPicker ? (
                <div
                    style={{
                        position: 'absolute',
                        zIndex: '2'
                    }}
                >
                    <div
                        style={{
                            position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px'
                        }}
                        onClick={handleClose}
                    />
                    <TwitterPicker onChange={handleColourChange} />
                </div>
            ) : null}
        </div>
    )
}

export default ColourPicker
