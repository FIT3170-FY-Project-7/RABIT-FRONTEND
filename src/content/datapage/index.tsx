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
    const [files, setFiles] = useState(null)
    const [parameters, setParameters] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        api.get(`/raw-data/${id}`).then(function (response) {
            console.log(response)
            setFiles(response.data.data)
            setParameters(response.data.parameters)
            setTitle(response.data.title)
            setDescription(response.data.description)
            setLoading(false)
        })
    }, [])

    return (
        <Box padding='1rem' height='100%' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <Helmet>
                <title>RABIT - Visualise</title>
            </Helmet>
            {!loading && (
                <PlotsPage files={files} availableParameters={parameters} title={title} description={description} />
            )}
            <Footer />
        </Box>
    )
}

export default ManagementUserSettings
