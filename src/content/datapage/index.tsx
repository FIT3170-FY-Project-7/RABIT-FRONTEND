// mui component imports
import { Box, Divider, Grid } from '@mui/material'
import React, { ChangeEvent, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer'
// Tab imports from other files (same folder)
import PlotsPage from '../plots/PlotsPage'
import CommentsTab from './CommentsTab'
import PageHeader from './PageHeader'
import api from '../../api'
import { useParams } from 'react-router-dom'

function ManagementUserSettings() {
    // state variable and function setter for tab
    const [currentTab, setCurrentTab] = useState<string>('data')
    const [files, setFiles] = useState(null)
    const [parameters, setParameters] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const onTabChange = (event: ChangeEvent<{}>, value: string): void => setCurrentTab(value)

    useEffect(() => {
        api.get(`/raw-data/${id}`).then(function (response) {
            console.log(response)
            setFiles(response.data.data)
            setParameters(response.data.parameters)
            setTitle(response.data.name)
            // setDescription(response.data.description)
            setLoading(false)
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
                                {currentTab === 'data' && <PlotsPage files={files} availableParameters={parameters} />}
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
