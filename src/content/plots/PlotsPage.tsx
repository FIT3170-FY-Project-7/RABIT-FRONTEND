import { MathJaxContext } from 'better-react-mathjax'
import { useEffect, useState } from 'react'
import CornerPlot from './CornerPlot'
import { Box, Button } from '@mui/material'
import PlotDownloadService from './PlotDownload.service'
import AppearanceConfig from './Appearance/AppearanceConfiguration'
import { PlotConfig, DatasetConfig, ParameterConfig } from './PlotTypes'
import * as d3 from 'd3'

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

function PlotsPage({
  rawDatasets,
  parameterNames
}: {
  rawDatasets: Record<string, Record<string, number[]>>
  parameterNames: string[]
}) {
  /* 
    This is the skeleton component for our plots page. It hosts all relevant components for the user to create plots
    including the parameter selectors and the corner plot itself. It also hosts the download button and the appearance config.
    */
  const [datasets, setDatasets] = useState<DatasetConfig[]>()
  const [parameters, setParameters] = useState<ParameterConfig[]>([])
  const [config, setConfig] = useState<PlotConfig>(PlotConfigDefault)

  console.log('datasets', datasets)

  useEffect(() => {
    setDatasets(
      Object.entries(rawDatasets).map(([file_id, data], i) => ({
        ...DatasetConfigDefault,
        color: colors[i],
        data,
        file_id
      }))
    )
  }, [rawDatasets])

  useEffect(() => {
    if (datasets) {
      setParameters(
        parameterNames.map(p => {
          const combined_data = [].concat(...datasets.map(d => d.data[p]))
          return { name: p, display_text: p, domain: d3.extent(combined_data) }
        })
      )
    }
  }, [datasets, parameterNames])

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

  // Functions for corner plot image download.
  const downloadCornerPlotPNG = async () => {
    PlotDownloadService.downloadAsPNG()
  }

  const downloadCornerPlotSVG = async () => {
    PlotDownloadService.downloadAsSVG()
  }

  if (!datasets) {
    return <div>Loading</div>
  }

  const scaledConfig = { ...config, subplot_size: config.plot_size / parameters.length }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', flexGrow: 1 }}>
      <MathJaxContext config={MathJaxConfig}>
        <div
          className='corner-plot-appearance-config-container'
          style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}
        >
          <CornerPlot datasets={datasets} parameters={parameters} config={scaledConfig} />
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
          </Box>
        </div>
      </MathJaxContext>
    </Box>
  )
}

export default PlotsPage
