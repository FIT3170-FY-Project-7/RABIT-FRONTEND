import { MathJaxContext } from 'better-react-mathjax'
import { useEffect, useState } from 'react'
import CornerPlot from './CornerPlot'
import downloadjs from 'downloadjs'
import html2canvas from 'html2canvas'
import { Button } from '@mui/material'
import { PlotConfig, DatasetConfig, ParameterConfig } from './PlotTypes'
import { colours } from './constants/Colours'

const PlotConfigDefault: PlotConfig = {
    plot_size: 700,
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
    background_color: colours.plotBackground
}

function StaticPlotViewPage() {
    {
        /* This page will render for the route "/visualise/view/*" for any id after view/  */
    }
    const [config, setConfig] = useState<PlotConfig>(PlotConfigDefault)
    const [datasetConfig, setDatasetConfig] = useState<DatasetConfig[]>([])
    const [parameterConfig, setParameterConfig] = useState<ParameterConfig[]>([])

    // Fetch plot ID assuming it is the last part of the URL
    // E.g. Rabit/visualise/view/123
    // Plot ID will be 123
    const plot_id = window.location.href.split('/').slice(-1).pop()

    // TODO: Use effect to fetch datasetConfig and parameterConfig by ID.

    useEffect(() => {
        setConfig(config => ({
            ...config,
            subplot_size: config.plot_size / parameterConfig.length
        }))
    }, [])

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

    // Function for corner plot image download.
    const downloadCornerPlotImage = async () => {
        const cornerPlotElmt = document.querySelector<HTMLElement>('.corner-plot')
        if (!cornerPlotElmt) return

        const canvas = await html2canvas(cornerPlotElmt)
        const dataURL = canvas.toDataURL('image/png')
        downloadjs(dataURL, 'corner-plot.png', 'image/png')
    }

    return (
        <div>
            <MathJaxContext config={MathJaxConfig}>
                <div className='corner-plot-appearance-config-container'>
                    <CornerPlot datasets={datasetConfig} parameters={parameterConfig} config={config} />
                </div>
                <Button variant='contained' onClick={downloadCornerPlotImage}>
                    Download Image
                </Button>
            </MathJaxContext>
        </div>
    )
}

export default StaticPlotViewPage
