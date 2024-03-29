import { useState, useEffect } from 'react'
import { TwitterPicker } from 'react-color'
import { colours } from '../constants/Colours'

function ColourPicker({ handleColourChange, initial }) {
    /*
    Creates a colour picker to change the colour of the plot.
    */
    const [displayColourPicker, setDisplayColourPicker] = useState(false)

    const [currentColour, setCurrentColour] = useState(initial ?? colours.plotDefault)

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

    useEffect(() => {
        setCurrentColour(initial ?? colours.plotDefault)
    }, [initial])

    return (
        <div
            style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <div>Colour</div>
            <div>
                <button
                    onClick={handleClick}
                    style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: currentColour,
                        borderRadius: '20%',
                        border: 'none',
                        cursor: 'pointer'
                    }}
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
                        <TwitterPicker color={colours.plotDefault} colors={colours.colourPickerOptions} onChange={handleColourSelected} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default ColourPicker
