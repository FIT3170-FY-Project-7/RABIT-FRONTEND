import { useEffect, useRef } from 'react'
function BlurSlider({ initial, handleBlurChange }) {
    /*
    Creates a slider to change the smoothness of the plot.
    */
    const inputRef = useRef(null)
    const textRef = useRef(null)
    useEffect(() => {
        console.log(inputRef.current)
        inputRef.current.value = initial
        textRef.current.innerText = `Blur Radius: ${Number(initial).toFixed(1)}`
    }, [initial])

    const handleChange = event => {
        const blur_num = event.target.value
        textRef.current.innerHTML = `Blur Radius: ${Number(blur_num).toFixed(1)}`
        handleBlurChange(blur_num)
    }

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
            <div style={{ minWidth: '50px' }} ref={textRef}>
                Blur Radius: 1.0
            </div>
            <input
                type='range'
                min='0'
                max='5'
                step='0.1'
                defaultValue={initial}
                onChange={event => handleChange(event)}
                ref={inputRef}
            />
        </div>
    )
}

export default BlurSlider
