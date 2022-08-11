import { MathJaxContext } from 'better-react-mathjax'
import { useCallback, useState } from 'react'
import CheckboxDropdown from '../pages/FileUpload/CheckboxDropdown'
import CornerPlot from './CornerPlot'
import { Button } from '@mui/material'
import PlotDownloadService from './PlotDownload.service'

function PlotsPage({ file }) {
    /* 

    This is the skeleton component for our plots page. It hosts all relevant components for the user to create plots
    including the parameter selectors and the corner plot itself. 

    */
    const [data, setData] = useState(file['posterior']['content'])
    const [parameters, setParameters] = useState(file.selected_keys)
    const [defaultParameters, setDefaultParameters] = useState(file.selected_keys)

    // Config for MathJax rendering of mathematical symbols
    const config = {
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

    // Functions for corner plot image download.
    const downloadCornerPlotPNG = async () => {
        PlotDownloadService.downloadAsPNG()
    }

    const downloadCornerPlotSVG = async () => {
        PlotDownloadService.downloadAsSVG()
    }

    return (
        <div>
            <MathJaxContext config={config}>
                <CheckboxDropdown
                    defaultChecked={defaultParameters}
                    keys={Object.keys(data)}
                    setSelectedKeys={setParameters}
                    sx={{ margin: '2rem 0 2rem 0' }}
                />
                <CornerPlot data={data} parameters={parameters} />
                <Button variant='contained' onClick={downloadCornerPlotPNG}>
                    Download as PNG
                </Button>
                <Button variant='contained' onClick={downloadCornerPlotSVG}>
                    Download as SVG
                </Button>
            </MathJaxContext>
        </div>
    )
}

export default PlotsPage
