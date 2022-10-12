import { Box, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer'
import api, { QUERY_DEFAULTS } from '../../api'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import CheckboxDropdown, { OptionType } from './CheckboxDropdown'
import Plot from './Plot'
import DownloadButton from '../../components/Download/DownloadButton'
import { intrinsicParameters, extrinsicParameters } from './constants/Parameters'

export type FilesType = { fileId: string; fileName: string; parameters: { id: string; name: string }[] }[]
export type ParameterLabel = { parameterName: string; parameterLabel: string; domainSet: Boolean;}

const Visualise = () => {
  const { id } = useParams()
  const [parameters, setParameters] = useState<OptionType[]>([])
  const { data, isLoading } = useQuery<{ title: string; description: string; files: FilesType }>(
    ['plotCollection', id],
    () => api.get(`/raw-data/plot-collection/${id}`).then(res => res.data),
    QUERY_DEFAULTS
  )

  // Calculate the parameters that are available in all files to be used in the dropdown
  const parameterOptions = useMemo(() => {
    // Get list of all parameters in each file
    const fileParameters = data?.files?.map(file => file.parameters.map(parameter => parameter.name))

    // Get parameters shared by all files
    const sharedParameters = fileParameters?.reduce((a, b) => a.filter(c => b.includes(c)))

    // Split common parameters into each parameter type, intrinsic, extrinsic and others
    const intrinsic = [], extrinsic = [], other = [];
    sharedParameters?.sort().forEach(parameter => {
      if (intrinsicParameters.includes(parameter)) intrinsic.push(parameter)
      else if (extrinsicParameters.includes(parameter)) extrinsic.push(parameter)
      else other.push(parameter)
    })

    // Recombine into a single array of options
    const rebuiltParameters = [].concat(intrinsic, extrinsic, other)

    // Convert to data structure for dropdown
    return rebuiltParameters?.map(parameterName => ({ label: parameterName, value: parameterName }))
  }, [data?.files])

  return (
    <Box padding='1rem' height='100%' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
      <Helmet>
        <title>RABIT - Visualise</title>
      </Helmet>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div style={{height: '100%'}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h1' sx={{ marginBottom: '1rem' }}>
              Visualise
            </Typography>
            {parameters.length > 0 && <DownloadButton />}
          </Box>
          <Typography variant='h3' sx={{ marginBottom: '1rem' }}>
            {data.title ?? 'Data'}
          </Typography>
          <Typography variant='subtitle2' sx={{ marginBottom: '0.5rem' }}>
            {data.description}
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: '0.5rem' }}>
            Select parameters to plot
          </Typography>
          <CheckboxDropdown
            options={parameterOptions}
            placeholder=''
            label='Parameters'
            value={parameters}
            setValue={setParameters}
          />

          <Plot files={data.files} parameterNames={parameters.map(parameter => parameter.value)} />
        </div>
      )}
      <Footer />
    </Box>
  )
}

export default Visualise
