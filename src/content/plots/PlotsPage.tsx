import { MathJaxContext } from 'better-react-mathjax'
import { useEffect, useRef, useState } from 'react'
import CheckboxDropdown from '../pages/FileUpload/CheckboxDropdown'
import CornerPlot from './CornerPlot'
import { Box, Button, Typography, Card, Link } from '@mui/material'
import PlotDownloadService from './PlotDownload.service'
import AppearanceConfig from './Appearance/AppearanceConfiguration'
import { PlotConfig, DatasetConfig, ParameterConfig } from './PlotTypes'
import * as d3 from 'd3'
import { uploadCornerPlotConfigs } from './PlotUploadShare'
import CopyToClipboardButton from './CopyToClipboardButton'

const PlotConfigDefault: PlotConfig = {
    plot_size: 500,
    subplot_size: 150,
    margin: {
        horizontal: 10,
        vertical: 10
    },
    axis: {
        size: 100,
        tickSize: 10,
        ticks: 4
    },
    background_color: '#CFE5FF'
}

const DatasetConfigDefault: DatasetConfig = {
    data: {},
    bins: 30,
    sigmas: [1, 2, 3],
    quantiles: [0.5],
    color: '#0088FF',
    line_width: 1.25,
    blur_radius: 1,
    file_id: ''
}

const ParameterConfigDefault: ParameterConfig = {
    name: 'undefined',
    display_text: 'undefined',
    domain: [0, 0]
}

const colors = [
    '#0088FF',
    '#BF40BF',
    '#800000',
    '#FF8800',
    '#FFCC00',
    '#FFFF00',
    '#0088FF',
    '#00CC00',
    '#FF0000',
    '#FF8800',
    '#FFCC00',
    '#FFFF00'
]

function PlotsPage({ files, availableParameters, title, description }) {
    /* 
    This is the skeleton component for our plots page. It hosts all relevant components for the user to create plots
    including the parameter selectors and the corner plot itself. It also hosts the download button and the appearance config.
    */
    const [datasets, setDatasets] = useState<DatasetConfig[]>(
        files.map((file, index) => ({
            ...DatasetConfigDefault,
            color: colors[index],
            data: file.posterior.content,
            file_id: file.file_id
        }))
    )
    const isInitialMount = useRef(true)
    const [parameters, setParameters] = useState<ParameterConfig[]>([])
    const [config, setConfig] = useState<PlotConfig>(PlotConfigDefault)
    const [shareLink, setShareLink] = useState<string>('')
    const [runUpdateShare, setRunUpdateShare] = useState<boolean>(true)
    const defaultParameters = files.selected_keys ?? []

    // Config for MathJax rendering of mathematical symbols
    const MathJaxConfig = {
        tex: {
            inlineMath: [
                ['$', '$'],
                ['\\(', '\\)']
            ]
        },
        startup: {
            typeset: false
        }
    }

    const getCollectionId = () => window.location.href.split('/').slice(-1).pop()

    // Functions for corner plot image download.
    const downloadCornerPlotPNG = async () => {
        PlotDownloadService.downloadAsPNG()
    }

    const downloadCornerPlotSVG = async () => {
        PlotDownloadService.downloadAsSVG()
    }

    const constructShareLink = (corner_id: string) => {
        const baseURL = window.location.href.split('/')[2]
        return `${baseURL}/visualise/view/${corner_id}`
    }

    // Get share link only in updates post-mount
    useEffect(() => {
        const getLink = async () => {
            try {
                const corner_id = await uploadCornerPlotConfigs(getCollectionId(), config, datasets, parameters)
                setShareLink(constructShareLink(corner_id))
            } catch (err) {
                console.error(err)
                setShareLink('Link could not be generated')
            }
        }

        if (isInitialMount.current) {
            isInitialMount.current = false
        } else {
            getLink()
            setShareLink('Loading')
        }
    }, [runUpdateShare])

    // Called from CheckboxDropdown component to fill parameters with ParameterConfig values
    const updateParameters = (new_parameters: string[]) => {
        setConfig(config => ({
            ...config,
            subplot_size: config.plot_size / new_parameters.length
        }))
        setParameters(
            new_parameters.map(p => {
                const combined_data = [].concat(...datasets.map(d => d.data[p]))
                return { name: p, display_text: p, domain: d3.extent(combined_data) }
            })
        )
    }

    // Called to populate initial parameters on first update and whenever parameters change
    const firstUpdateRef = useRef(true)
    useEffect(() => {
        updateParameters(firstUpdateRef.current ? defaultParameters : parameters.map(p => p.name))
        firstUpdateRef.current = false
    }, [datasets])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', flexGrow: 1 }}>
            <Typography variant='h1' sx={{ marginBottom: '1rem' }}>
                Visualise {title ?? 'Data'}
            </Typography>
            {description && (
                <Typography variant='body1' sx={{ marginBottom: '1rem' }}>
                    {description}
                </Typography>
            )}
            <MathJaxContext config={MathJaxConfig}>
                <Typography variant='body2' sx={{ marginBottom: '0.5rem' }}>
                    Select parameters to plot
                </Typography>
                <CheckboxDropdown
                    defaultChecked={defaultParameters}
                    keys={availableParameters ?? []}
                    setSelectedKeys={updateParameters}
                />
                <div
                    className='corner-plot-appearance-config-container'
                    style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}
                >
                    <CornerPlot datasets={datasets} parameters={parameters} config={config} />
                    <Box>
                        <AppearanceConfig datasets={datasets} setDatasets={setDatasets} />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant='contained' onClick={downloadCornerPlotPNG} sx={{ marginRight: '1rem' }}>
                                Download as PNG
                            </Button>
                            <Button variant='contained' onClick={downloadCornerPlotSVG}>
                                Download as SVG
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                variant='contained'
                                onClick={() => setRunUpdateShare(!runUpdateShare)}
                                sx={{ marginLeft: '1rem' }}
                            >
                                Generate shareable link
                            </Button>

                            {/* Add a visible share link if one was generated */}
                            {shareLink && (
                                <Box>
                                    <Card>
                                        <CopyToClipboardButton copyText={shareLink} />
                                        <Link href={shareLink}>{shareLink}</Link>
                                    </Card>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </div>
            </MathJaxContext>
        </Box>
    )
}

export default PlotsPage
