import { Box, Divider, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer'
import api, { QUERY_DEFAULTS } from '../../api'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import CheckboxDropdown, { OptionType } from './CheckboxDropdown'
import PlotsPage from '../plots/PlotsPage'
import Plot from './Plot'
import DownloadButton from '../../components/Download/DownloadButton'
import TabCheckboxDropdown from './TabCheckboxDropdown'
import { extrinsicParameters, intrinsicParameters, bothParameters } from '../constants'

export type FilesType = { fileId: string; parameters: { id: string; name: string }[] }[]

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
  console.log(parameters)

  const parameterOptions = useMemo(() => {
    const fileParameters = data?.files?.map(file => file.parameters.map(parameter => parameter.name))
    const sharedParameters = fileParameters?.reduce((a, b) => a.filter(c => b.includes(c)))
    return sharedParameters?.map(parameterName => ({ label: parameterName, value: parameterName }))
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
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h1' sx={{ marginBottom: '1rem' }}>
              Visualise
            </Typography>
            {parameters.length > 0 && <DownloadButton />}
          </Box>
          <Typography variant='h3' sx={{ marginBottom: '1rem' }}>
            {data.title ?? 'Data'}
          </Typography>
          <Typography variant='subtitle2' sx={{ marginBottom: '2rem' }}>
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
