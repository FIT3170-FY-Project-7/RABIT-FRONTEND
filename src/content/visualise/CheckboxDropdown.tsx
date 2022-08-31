import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export type OptionType = { label: string; value: string }
const CheckboxDropdown = ({
  options,
  placeholder,
  label,
  value,
  setValue
}: {
  options: OptionType[]
  placeholder: string
  label: string
  value: OptionType[]
  setValue: (newValue: OptionType[]) => void
}) => {
  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={option => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.label}
        </li>
      )}
      renderInput={params => <TextField {...params} label={label} placeholder={placeholder} />}
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
    />
  )
}

export default CheckboxDropdown
