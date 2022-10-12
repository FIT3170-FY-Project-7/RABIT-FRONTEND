import React, { useEffect, useState } from 'react'
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
import ParameterModal from './ParameterModal'

import parameters from '../../../../../sharedData/parameterBuckets.json'

const intrinsicParameters = parameters.intrinsicParameters
const extrinsicParameters = parameters.extrinsicParameters
const otherParameters = parameters.otherParameters



function ParameterForm({ selectedBuckets, setSelectedBuckets }) {
  const [intrinsic, setIntrinsic] = useState(false)
  const [extrinsic, setExtrinsic] = useState(false)
  const [other, setOther] = useState(false)
  const [all, setAll] = useState(false)
  const [openParameterModal, setOpenParameterModal] = useState(false)


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
          maxWidth: 'fit-content',
          cursor: 'pointer'
        }}
        onClick={() => setOpenParameterModal(true)}
      >
        <Typography variant='h4'>Select Parameters to Upload</Typography>
        <Typography style={{ color: 'red' }} variant='h4'>*</Typography>
        <HelpIcon sx={{ fontSize: 'medium', marginLeft: '0.25rem' }} />
      </Box>
      <ParameterModal openParameterModal={openParameterModal} setOpenParameterModal={setOpenParameterModal}></ParameterModal>
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
