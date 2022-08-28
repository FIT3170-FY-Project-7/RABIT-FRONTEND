import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function CheckboxDropdown({ keys, defaultChecked, setSelectedKeys, sx = {} }) {
    return (
        <>
            <Autocomplete
                fullWidth
                multiple
                options={keys}
                disableCloseOnSelect
                getOptionLabel={option => option.toString()}
                sx={sx}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                        {option}
                    </li>
                )}
                renderInput={params => <TextField {...params} label='Parameters' />}
                onChange={(_e, option) => setSelectedKeys(option)}
                defaultValue={defaultChecked}
            />
        </>
    )
}
