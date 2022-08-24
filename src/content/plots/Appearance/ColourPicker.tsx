import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'
import { colours } from '../constants/Colours'

function ColourPicker({ handleColourChange }) {
    const [displayColourPicker, setDisplayColourPicker] = useState(false)
    const [currentColour, setCurrentColour] = useState(colours.plotDefault)
    const handleClick = () => {
        setDisplayColourPicker(!displayColourPicker)
    }
    const handleClose = () => {
        setDisplayColourPicker(false)
    }
    const handleColourSelected = colour => {
        setCurrentColour(colour.hex)
        handleColourChange(colour)
    }
    return (
        <div
            style={{
                position: 'relative',
                paddingTop: '2px'
            }}
        >
            <div>Colour</div>
            <button
                onClick={handleClick}
                style={{ width: '40px', height: '40px', backgroundColor: currentColour }}
            ></button>
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
                    <TwitterPicker onChange={handleColourSelected} />
                </div>
            ) : null}
        </div>
    )
}

export default ColourPicker