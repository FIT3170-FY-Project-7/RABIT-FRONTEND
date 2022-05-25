// mui component imports
import { Box, Divider, Grid } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer'
// Tab imports from other files (same folder)
import PlotsPage from '../plots/PlotsPage'
import CommentsTab from './CommentsTab'
import PageHeader from './PageHeader'

function ManagementUserSettings() {
    // state variable and function setter for tab
    const [currentTab, setCurrentTab] = useState<string>('data')

    const onTabChange = (event: ChangeEvent<{}>, value: string): void => setCurrentTab(value)

    return (
        <>
            <Helmet>
                <title>RABIT - Visualise</title>
            </Helmet>
            <Grid container direction='row' justifyContent='center' alignItems='stretch' sx={{ marginTop: '2rem' }}>
                <Grid item xs={10}>
                    <PageHeader
                        currentTab={currentTab}
                        onTabChange={onTabChange}
                        dataTitle='DATASET TITLE'
                        dataDescription=''
                    />
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={10}>
                    <Box>
                        {currentTab === 'data' && <PlotsPage />}
                        {currentTab === 'comments' && <CommentsTab />}
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default ManagementUserSettings
