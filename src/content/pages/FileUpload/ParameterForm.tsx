﻿import React, { useEffect, useState } from 'react'
import {
  Box,
  FormControlLabel,
  IconButton,
  Modal,
  Switch,
  Tab,
  Tabs,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { modalStyle } from './modalStyle'
import CancelIcon from '@mui/icons-material/Cancel'

import parameters from '../../../../../sharedData/parameterBuckets.json'

const intrinsicParameters = parameters.intrinsicParameters
const extrinsicParameters = parameters.extrinsicParameters
const otherParameters = parameters.otherParameters

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
    } else if (!all && intrinsic && extrinsic && other) {
      setAll(true)
    }
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
        <Typography variant='h4'>Select Parameters to Upload</Typography>
        <Typography style={{ color: 'red' }} variant='h4'>
          *
        </Typography>
        <HelpIcon sx={{ fontSize: 'medium', marginLeft: '0.25rem' }} />
      </Box>
      <Modal open={openParamaterModal} onClose={() => setOpenParamaterModal(false)}>
        <Box sx={{ minWidth: '50%', ...modalStyle }}>
          <IconButton
            color='primary'
            component='label'
            sx={{ position: 'absolute', top: '-18px', right: '-18px', fontSize: 'large' }}
            onClick={() => setOpenParamaterModal(false)}
          >
            <CancelIcon />
          </IconButton>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
              {Object.keys(parameters).map((key, i) => (
                <Tab key={i} label={key.charAt(0).toUpperCase() + key.substring(1)} {...a11yProps(i)} />
              ))}
            </Tabs>
          </Box>
          {Object.keys(parameters).map((key, i) => (
            <TabPanel value={tab} index={i} key={i}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                {key.charAt(0).toUpperCase() + key.substring(1)} Parameters 
                {key == "other" && <Typography>Other parameters includes all parameters that are not categorised as intrinsic or extrsinisc, below are examples of Bilby outputs that would be categorised as other </Typography>}
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