import { Box, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer'
import api, { QUERY_DEFAULTS } from '../../api'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import CheckboxDropdown, { OptionType } from './CheckboxDropdown'
import PlotsPage from '../plots/PlotsPage'
import Plot from './Plot'
import DownloadButton from '../../components/Download/DownloadButton'

export type FilesType = { fileId: string; parameters: { id: string; name: string }[] }[]
export type ParameterLabel = { parameterName: string; parameterLabel: string; }

const Visualise = () => {
  const { id } = useParams()
  const [parameters, setParameters] = useState<OptionType[]>([])
  const { data, isLoading } = useQuery<{ title: string; description: string; files: FilesType }>(
    ['plotCollection', id],
    () => api.get(`/raw-data/plot-collection/${id}`).then(res => res.data),
    QUERY_DEFAULTS
  )

  const parameterOptions = useMemo(() => {
    const fileParameters = data?.files?.map(file => file.parameters.map(parameter => parameter.name))
    const sharedParameters = fileParameters?.reduce((a, b) => a.filter(c => b.includes(c)))
    return sharedParameters?.map(parameterName => ({ label: parameterName, value: parameterName }))
  }, [data?.files])

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
