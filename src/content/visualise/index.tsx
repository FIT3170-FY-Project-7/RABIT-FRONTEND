import { Box, Divider, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer'
import api, { QUERY_DEFAULTS } from '../../api'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import CheckboxDropdown, { OptionType } from './CheckboxDropdown'
import Plot from './Plot'
import DownloadButton from '../../components/Download/DownloadButton'
import TabCheckboxDropdown from './TabCheckboxDropdown'
// import parameters from '../../../../sharedData/parameterBuckets.json'

// const intrinsicParameters = parameters.intrinsicParameters
// const extrinsicParameters = parameters.extrinsicParameters

export type FilesType = { fileId: string; fileName: string; parameters: { id: string; name: string }[] }[]
export type ParameterLabel = { parameterName: string; parameterLabel: string }

const Visualise = () => {
  const { id } = useParams()
  const [parameters, setParameters] = useState<OptionType[]>([])

  const [intrinsicParametersSelected, setIntrinsicParametersSelected] = useState<OptionType[]>([])
  const [extrinsicParametersSelected, setExtrinsicParametersSelected] = useState<OptionType[]>([])
  const [otherParametersSelected, setOtherParametersSelected] = useState<OptionType[]>([])

  const { data, isLoading } = useQuery<{ title: string; description: string; files: FilesType }>(
    ['plotCollection', id],
    () => api.get(`/raw-data/plot-collection/${id}`).then(res => res.data),
    QUERY_DEFAULTS
  )

  const { data: { intrinsicParameters, extrinsicParameters } } = useQuery<{ intrinsicParameters: string[]; extrinsicParameters: string[]; otherParametersSample: string[]; }>(
    [],
    () => api.get("/raw-data/parameter-buckets").then(res => res.data),
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

  const parametersSelected = [
    {
      name: 'Intrinsic',
      options: parameterOptions?.filter(parameter => intrinsicParameters.includes(parameter.label)),
      type: intrinsicParametersSelected,
      setType: setIntrinsicParametersSelected
    },
    {
      name: 'Extrinsic',
      options: parameterOptions?.filter(parameter => extrinsicParameters.includes(parameter.label)),
      type: extrinsicParametersSelected,
      setType: setExtrinsicParametersSelected
    },
    {
      name: 'Other',
      options: parameterOptions?.filter(parameter => !intrinsicParameters.includes(parameter.label) && !extrinsicParameters.includes(parameter.label)),
      type: otherParametersSelected,
      setType: setOtherParametersSelected
    }
  ]

  useEffect(() => {
    setParameters(intrinsicParametersSelected.concat(extrinsicParametersSelected, otherParametersSelected))
  }, [intrinsicParametersSelected, extrinsicParametersSelected, otherParametersSelected])

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
          <TabCheckboxDropdown values={parametersSelected} />
          {parameters?.length == 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Divider />
              <Typography variant='h5' sx={{ marginBottom: '0.5rem', color: '#FFCC00' }}>
                Select parameters to view plot
              </Typography>
            </Box>
          ) : (
            <Plot files={data.files} parameterNames={parameters.map(parameter => parameter.value)} />
          )}
        </div>
      )}
      <Footer />
    </Box>
  )
}

export default Visualise
