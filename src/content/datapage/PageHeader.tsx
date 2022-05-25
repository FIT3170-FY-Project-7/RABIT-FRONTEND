import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import { Box, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChangeEvent } from 'react'

const TabsWrapper = styled(Tabs)(
    () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
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
        <Grid container direction='row' justifyContent='center' alignItems='stretch' sx={{ marginTop: '2rem' }}>
            <Grid item xs={3}>
                <Typography variant='h2' gutterBottom>
                    {dataTitle}
                </Typography>
                <Box sx={{ marginTop: '2rem' }}>
                    <TabsWrapper onChange={onTabChange} value={currentTab} textColor='primary' indicatorColor='primary'>
                        {tabs.map(tab => (
                            <Tab key={tab.value} label={tab.label} value={tab.value} />
                        ))}
                    </TabsWrapper>
                </Box>
            </Grid>
            <Grid item xs={1}>
                <IconButton>
                    <EditIcon />
                </IconButton>
                <IconButton>
                    <ShareIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default PageHeader
