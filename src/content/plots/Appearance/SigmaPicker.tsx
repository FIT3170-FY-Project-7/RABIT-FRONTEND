import { useEffect, useRef } from 'react'

function SigmaPicker({ initial, handleSigmaChange }) {
    /*
    Creates a number picker that allows us to change the sigma values for the plot.
    */
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.value = initial.length
    }, [initial])
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div>Sigmas</div>
            <input
                name='sigma-picker'
                type='number'
                className='appearance-configuration-sigma-picker-input'
                min={1}
                max={4}
                defaultValue={initial.length ?? 3}
                onChange={event => handleSigmaChange(event)}
                style={{ height: '40px', aspectRatio: '1', fontSize: '20px', textAlign: 'center', borderRadius: '5%' }}
                ref={inputRef}
            ></input>
        </div>
    )
}

export default SigmaPicker
