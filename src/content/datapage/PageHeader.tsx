import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChangeEvent } from 'react'

const TabsWrapper = styled(Tabs)(
    () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }`
)

interface TabState {
    currentTab: string
    onTabChange: (event: ChangeEvent<{}>, value: string) => void
    dataTitle: string
    dataDescription: string
}

function PageHeader({ currentTab, onTabChange, dataTitle, dataDescription }: TabState) {
    const tabs = [
        { value: 'data', label: 'Data' },
        { value: 'comments', label: 'Comments' }
    ]

    return (
        <Box display='flex' justify-content='space-between'>
            <Box flex={1}>
                <Typography variant='h2' sx={{marginBottom:"2rem"}} gutterBottom>
                    {dataTitle}
                </Typography>
                <Typography variant='h6' sx={{marginBottom:"2rem"}}  gutterBottom>
                    {dataDescription}
                </Typography>
                <TabsWrapper
                    onChange={onTabChange}
                    value={currentTab}
                    textColor='primary'
                    indicatorColor='primary'
                >
                    {tabs.map(tab => (
                        <Tab key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                </TabsWrapper>
            </Box>
            <Box ml='auto'>
                <IconButton>
                    <EditIcon />
                </IconButton>
                <IconButton>
                    <ShareIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default PageHeader
