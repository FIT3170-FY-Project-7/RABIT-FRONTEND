import { useQueries } from '@tanstack/react-query'
import React from 'react'
import { FilesType, ParameterLabel } from '.'
import api, { QUERY_DEFAULTS } from '../../api'
import PlotsPage from '../plots/PlotsPage'

type ParamQueryResult = {
  fileId: string
  parameterId: string
  parameterName: string
  parameterLabel: string
  posterior: number[]
}

const Plot = ({ files, parameterNames }: { files: FilesType; parameterNames: string[] }) => {
  const queryDefinitions = []
  for (const file of files) {
    for (const parameterName of parameterNames) {
      const parameterId = file.parameters.find(parameter => parameter.name === parameterName).id
      queryDefinitions.push({
        queryKey: ['parameter', parameterId],
        queryFn: (): Promise<ParamQueryResult> => api.get(`/raw-data/parameter/${parameterId}`).then(res => res.data),
        ...QUERY_DEFAULTS
      })
    }
  }

  const queries = useQueries<ParamQueryResult[]>({
    queries: queryDefinitions
  })

  const loading = queries.some(query => query.isLoading)
  if (loading) {
    return <div>Loading</div>
  }

  // console.log(queries, loading)
  // console.log(queries.map(query => query.data?.posteriorName, query.data?.posterior))
  const rawDatasets: Record<string, Record<string, number[]>> = {}
  const parameterLabels: ParameterLabel[] = []
  for (const query of queries) {
    // For some reason, it's nearly impossible to apply the type to the data normally, so we need to do this
    const data = query.data as ParamQueryResult

    const fileId = data.fileId
    if (!(fileId in rawDatasets)) {
      rawDatasets[fileId] = {}
    }
    rawDatasets[fileId][data.parameterName] = data.posterior
    parameterLabels.push({ parameterName: data.parameterName, parameterLabel: data.parameterLabel })
  }

  return <PlotsPage rawDatasets={rawDatasets} parameterLabels={parameterLabels} />
}

export default Plot
