import { MathJaxContext } from 'better-react-mathjax'
import { useEffect, useState } from 'react'
import CornerPlot from './CornerPlot'
import downloadjs from 'downloadjs'
import { Box } from '@mui/material'
import { PlotConfig, DatasetConfig, ParameterConfig, ApiParameterConfig } from './PlotTypes'
import { colours } from './constants/Colours'
import api from '../../api'
import { useParams } from 'react-router'
import DownloadButton from '../../components/Download/DownloadButton'

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
  /* This page will render for the route "visualise/view/*" for any id after view/  */

  const [config, setConfig] = useState<PlotConfig>(PlotConfigDefault)
  const [datasetConfig, setDatasetConfig] = useState<DatasetConfig[]>([])
  const [parameterConfig, setParameterConfig] = useState<ParameterConfig[]>([])

  const params = useParams()
  const plot_id = params.id

  useEffect(() => {
    setConfig(config => ({
      ...config,
      subplot_size: config.plot_size / parameterConfig.length
    }))

    api.get(`/plot/${plot_id}`).then(res => {
      console.log(res.data, mapApiParams(res.data.parameter_configs))
      setConfig(res.data.plot_config)
      setDatasetConfig(res.data.dataset_configs)
      setParameterConfig(mapApiParams(res.data.parameter_configs))
    })
  }, [])

  const mapApiParams = (apiParams: ApiParameterConfig[]): ParameterConfig[] => {
    return apiParams.map((apiParam): ParameterConfig => {
      return {
        name: apiParam.parameter_name,
        display_text: apiParam.parameter_name,
        domain: apiParam.domain
      }
    })
  }

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

  return (
    <div>
      <MathJaxContext config={MathJaxConfig}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <DownloadButton />
        </Box>
        <div className='corner-plot-appearance-config-container'>
          <CornerPlot datasets={datasetConfig} parameters={parameterConfig} config={config} />
        </div>
      </MathJaxContext>
    </div>
  )
}

export default StaticPlotViewPage
