import { colours } from '../constants/Colours'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

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
    cursor: 'pointer',
    padding: '0'
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
      title='Reorder your datasets. Lower datasets will be drawn last, and display on top.'
    >
      <button disabled={index - 1 < 0} onClick={() => reorderCallback(index, index - 1)} style={buttonStyling}>
        <KeyboardArrowUpIcon />
      </button>
      <button
        disabled={index + 1 > datasetsLength - 1}
        onClick={() => reorderCallback(index, index + 1)}
        style={buttonStyling}
      >
        <KeyboardArrowDownIcon />
      </button>
    </div>
  )
}

export default ReorderButtons
