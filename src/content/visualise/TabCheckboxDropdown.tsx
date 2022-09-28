import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckboxDropdown from './CheckboxDropdown'

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

export type OptionType = { label: string; value: string }
export type ParameterArray = {
  name: string
  options: OptionType[]
  type: OptionType[]
  setType: (newValue: OptionType[]) => void
}

export default function TabCheckboxDropdown({ values }: { values: ParameterArray[] }) {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Box sx={{ border: 'white' }}>
      <Typography variant='h4' sx={{ marginBottom: '0.5rem' }}>
        Select parameters
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={(e, number) => setTabIndex(number)} aria-label='basic tabs example'>
          {values.map((parameter, i) => (
            <Tab key={i} label={parameter.name} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {values.map((parameter, i) => (
        <TabPanel value={tabIndex} index={i} key={i}>
          <CheckboxDropdown
            options={parameter.options}
            placeholder=''
            label={`${parameter.name} Parameters`}
            value={parameter.type}
            setValue={parameter.setType}
          />
        </TabPanel>
      ))}
    </Box>
  )
}
