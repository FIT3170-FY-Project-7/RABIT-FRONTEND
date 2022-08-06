// mui component imports
import { Box, Divider, Grid } from '@mui/material'
import React, { ChangeEvent, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer'
// Tab imports from other files (same folder)
import PlotsPage from '../plots/PlotsPage'
import CommentsTab from './CommentsTab'
import PageHeader from './PageHeader'
import axios from 'axios'

function ManagementUserSettings() {
    // state variable and function setter for tab
    const [currentTab, setCurrentTab] = useState<string>('data')
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)

    const onTabChange = (event: ChangeEvent<{}>, value: string): void => setCurrentTab(value)

    useEffect(() => {
        axios.get('http://localhost:8000/uploads/parameters').then(async function(response){console.log(response)})
        axios.get('http://localhost:8000/uploads').then(async function (response) {
            await setFile(response.data)
            await setTitle(response.data.title)
            await setDescription(response.data.description)
            await setLoading(false)
        })
    }, [])

    return (
        <>
            <Helmet>
                <title>RABIT - Visualise</title>
            </Helmet>

            <Grid container direction='row' justifyContent='center' alignItems='stretch' sx={{ marginTop: '2rem' }}>
                {!loading && (
                    <>
                        <Grid item xs={10}>
                            <PageHeader
                                currentTab={currentTab}
                                onTabChange={onTabChange}
                                dataTitle={title}
                                dataDescription={description}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={10}>
                            <Box>
                                {currentTab === 'data' && <PlotsPage file={file} />}
                                {currentTab === 'comments' && <CommentsTab />}
                            </Box>
                        </Grid>
                    </>
                )}
            </Grid>

            <Footer />
        </>
    )
}

export default ManagementUserSettings
