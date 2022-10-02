import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  FormControlLabel,
  IconButton,
  Modal,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { extrinsicParameters, intrinsicParameters, otherParameters } from '../../constants'
import { modalStyle } from './modalStyle'
import CancelIcon from '@mui/icons-material/Cancel'

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

function ParameterForm({ selectedBuckets, setSelectedBuckets }) {
  const [intrinsic, setIntrinsic] = useState(false)
  const [extrinsic, setExtrinsic] = useState(false)
  const [other, setOther] = useState(false)
  const [all, setAll] = useState(false)

  const [openParamaterModal, setOpenParamaterModal] = useState(false)
  const [tab, setTab] = useState(0)

  const parameters = { intrinsic: intrinsicParameters, extrinsic: extrinsicParameters, other: otherParameters }

  useEffect(() => {
    if (all) {
      setIntrinsic(true)
      setExtrinsic(true)
      setOther(true)
    } else if (!all && intrinsic && extrinsic && other) {
      setIntrinsic(false)
      setExtrinsic(false)
      setOther(false)
    }
  }, [all])

  useEffect(() => {
    if (all && !(intrinsic && extrinsic && other)) {
      setAll(false)
    }
  }, [intrinsic, extrinsic, other])

  useEffect(() => {
    console.log(selectedBuckets)
  }, [intrinsic, extrinsic, other])

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
        <Typography variant='h4'>Select Parameters to Upload*</Typography>
        <HelpIcon sx={{ fontSize: 'medium', marginLeft: '0.25rem', color: '#FFCC00' }} />
      </Box>
      <Modal
        open={openParamaterModal}
        onClose={() => setOpenParamaterModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ minWidth: '50%', ...modalStyle }}>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='label'
            sx={{ position: 'absolute', top: '-18px', right: '-18px', fontSize: 'large' }}
            onClick={() => setOpenParamaterModal(false)}
          >
            <CancelIcon />
          </IconButton>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} aria-label='basic tabs example'>
              {Object.keys(parameters).map((key, i) => (
                <Tab key={i} label={key.charAt(0).toUpperCase() + key.substring(1)} {...a11yProps(i)} />
              ))}
            </Tabs>
          </Box>
          {Object.keys(parameters).map((key, i) => (
            <TabPanel value={tab} index={i} key={i}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                {key.charAt(0).toUpperCase() + key.substring(1)} Parameters
              </Typography>
              <TableContainer sx={{ maxHeight: 350 }}>
                <Table>
                  <TableHead></TableHead>
                  <TableBody>
                    {Object.keys(parameters[key]).map(value => (
                      <TableRow key={value}>
                        <TableCell>{parameters[key][value]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          ))}
        </Box>
      </Modal>
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={intrinsic}
              onChange={e => (setIntrinsic(e.target.checked), setSelectedBuckets([e.target.checked, extrinsic, other]))}
            />
          }
          label='Intrinsic'
          labelPlacement='start'
        />
        <FormControlLabel
          control={
            <Switch
              checked={extrinsic}
              onChange={e => (setExtrinsic(e.target.checked), setSelectedBuckets([intrinsic, e.target.checked, other]))}
            />
          }
          label='Extrinsic'
          labelPlacement='start'
        />

        <FormControlLabel
          control={
            <Switch
              checked={other}
              onChange={e => (setOther(e.target.checked), setSelectedBuckets([intrinsic, extrinsic, e.target.checked]))}
            />
          }
          label='Other'
          labelPlacement='start'
        />
        <FormControlLabel
          control={
            <Switch
              checked={all}
              onChange={e => (
                setAll(e.target.checked), setSelectedBuckets([e.target.checked, e.target.checked, e.target.checked])
              )}
            />
          }
          label='All'
          labelPlacement='start'
        />
      </Box>
    </>
  )
}

export default ParameterForm
