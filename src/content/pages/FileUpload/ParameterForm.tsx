import React, { useEffect, useState, useRef } from 'react'
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
import { NullableBooleanInput } from 'react-admin'

const intrinsicParameters = parameters.intrinsicParameters
const extrinsicParameters = parameters.extrinsicParameters
const otherParameters = parameters.otherParametersSample



function ParameterForm({ selectedBuckets, setSelectedBuckets }) {
  const [intrinsic, setIntrinsic] = useState(false)
  const [extrinsic, setExtrinsic] = useState(false)
  const [other, setOther] = useState(false)
  const [all, setAll] = useState(false)
  const [openParameterModal, setOpenParameterModal] = useState(false)

  const parameters = { intrinsic: intrinsicParameters, extrinsic: extrinsicParameters, other: otherParameters }

  function parameterSwitch(label, targetParameter, targetParameterSetter) {
    let replaceIndex = []
    switch (label) {
      case ("Intrinsic"): 
        replaceIndex = [0]
        break
      case ("Extrinsic"):
        replaceIndex = [1]
        break
      case ("Other"):
        replaceIndex = [2]
        break
      case ("All"):
        replaceIndex = [0,1,2]
    }
    let newBucketsSelected = [intrinsic, extrinsic, other]
    return (
      <FormControlLabel
        control={
          <Switch
            checked={targetParameter}
            onChange={e => (
              targetParameterSetter(e.target.checked),
              newBucketsSelected = newBucketsSelected.map((x, i) => {return replaceIndex.includes(i) ? e.target.checked : x}),
              setSelectedBuckets(newBucketsSelected))}
          />
        }
        label={label}
        labelPlacement='start'
      />
    )
  }


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
        {parameterSwitch("Intrinsic", intrinsic, setIntrinsic)}
        {parameterSwitch("Extrinsic", extrinsic, setExtrinsic)}
        {parameterSwitch("Other", other, setOther)}
        {parameterSwitch("All", all, setAll)}
      </Box>
    </>
  )
}

export default ParameterForm
