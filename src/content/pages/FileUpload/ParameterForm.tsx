import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  FormControlLabel,
  FormGroup,
  Modal,
  Paper,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { extrinsicParameters, intrinsicParameters, modal_style, otherParameters } from './constants'
import CheckboxDropdown from './CheckboxDropdown'
import { KeyboardCapslock } from '@mui/icons-material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function ParameterForm() {
  const [intrinsic, setIntrinsic] = useState(false)
  const [extrinsic, setExtrinsic] = useState(false)
  const [all, setAll] = useState(false)
  const [openParamaterModal, setOpenParamaterModal] = useState(false)
  const [tab, setTab] = useState(0)

  const parameters = { intrinsic: intrinsicParameters, extrinsic: extrinsicParameters, other: otherParameters }

  useEffect(() => {
    if (all) {
      setIntrinsic(true)
      setExtrinsic(true)
    }
  }, [all])

  return (
    <>
      <Box
        sx={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          maxWidth: 'fit-content',
          cursor: 'pointer'
        }}
        onClick={() => setOpenParamaterModal(true)}
      >
        <Typography variant='h4'>Select Parameters to Upload</Typography>
        <HelpIcon sx={{ fontSize: 'medium', marginLeft: '0.25rem', color: '#FFCC00' }} />
      </Box>
      <Modal
        open={openParamaterModal}
        onClose={() => setOpenParamaterModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ minWidth: '60%', ...modal_style }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} aria-label='basic tabs example'>
              {Object.keys(parameters).map((key, i) => (
                <Tab label={key.charAt(0).toUpperCase() + key.substring(1)} {...a11yProps(i)} />
              ))}
            </Tabs>
          </Box>
          {Object.keys(parameters).map((key, i) => (
            <TabPanel value={tab} index={i}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={parameters[key]}
                getOptionDisabled={() => true}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={`${key.charAt(0).toUpperCase() + key.substring(1)} Parameters Selected`}
                  />
                )}
              />
            </TabPanel>
          ))}
        </Box>
      </Modal>
      <Box>
        <FormControlLabel
          control={<Switch checked={intrinsic} onChange={e => setIntrinsic(e.target.checked)} />}
          label='Intrinsic'
          labelPlacement='start'
        />
        <FormControlLabel
          control={<Switch checked={extrinsic} onChange={e => setExtrinsic(e.target.checked)} />}
          label='Extrinsic'
          labelPlacement='start'
        />
        <FormControlLabel
          control={<Switch checked={all} onChange={e => setAll(e.target.checked)} />}
          label='All (Intrinsic + Extrinsic + Other)'
          labelPlacement='start'
        />
      </Box>
    </>
  )
}

export default ParameterForm
