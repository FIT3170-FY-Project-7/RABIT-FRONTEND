
import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Modal,
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
import { modalStyle } from './modalStyle'
import CancelIcon from '@mui/icons-material/Cancel'

import parameters from '../../../../../sharedData/parameterBuckets.json'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index} = props

  return (
    <Box sx={{maxHeight:'50%'}}>
      {value === index && (
        <Box sx={{ p: 3, maxHeight:'50%' }}>
          {children}
        </Box>
      )}
    </Box>
  )
}

export default function ParameterModal({ openParameterModal, setOpenParameterModal }) {
  const [tab, setTab] = useState(0)
  return (
    <Modal open={openParameterModal} onClose={() => setOpenParameterModal(false)}>
      <Box sx={{ minWidth: '50%', height: '50%', ...modalStyle }}>
        <IconButton
          color='primary'
          sx={{ position: 'absolute', top: '-18px', right: '-18px', fontSize: 'large' }}
          onClick={() => setOpenParameterModal(false)}
        >
          <CancelIcon />
        </IconButton>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
            {Object.keys(parameters).map((key, i) => (
              <Tab key={i} label={key[0].toUpperCase() + key.replace(/([A-Z])/g, ' $1').trim().substring(1)} />
            ))}
          </Tabs>
        </Box>
        {Object.keys(parameters).map((key, i) => (
          <Box sx={{display: 'flex-grow'}}>
          <TabPanel value={tab} index={i} key={i}>
            <Typography variant='h4'>
              {key=="otherParameters" && <Typography>Other parameters includes all parameters that are not categorised as intrinsic or extrsinisc, below are examples of Bilby outputs that would be categorised as other: </Typography>}
            </Typography>
            <TableContainer sx={{maxHeight: '300px', overflowY: 'scroll' }}>
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
          </Box>
        ))}
      </Box>
    </Modal>
  )
}