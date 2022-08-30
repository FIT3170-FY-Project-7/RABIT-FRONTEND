import { colours } from '../constants/Colours'

const ReorderButtons = ({ index, datasetsLength, reorderCallback }) => {
    /*
    Reorder buttons are used to move a dataset front or back in the graphed plots.
    */
    const buttonStyling = {
        backgroundColor: colours.pickerBackground,
        border: '1px solid rgba(255,255,255,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
        aspectRatio: '1',
        cursor: 'pointer'
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            }}
        >
            <button disabled={index - 1 < 0} onClick={() => reorderCallback(index, index - 1)} style={buttonStyling}>
                ↑
            </button>
            <button
                disabled={index + 1 > datasetsLength - 1}
                onClick={() => reorderCallback(index, index + 1)}
                style={buttonStyling}
            >
                ↓
            </button>
        </div>
    )
}

export default ReorderButtons
