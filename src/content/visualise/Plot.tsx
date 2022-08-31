import { useQueries } from '@tanstack/react-query'
import React from 'react'
import { FilesType } from '.'
import api, { QUERY_DEFAULTS } from '../../api'
import PlotsPage from '../plots/PlotsPage'

const Plot = ({ files, parameterNames }: { files: FilesType; parameterNames: string[] }) => {
  const queryDefinitions = []
  for (const file of files) {
    for (const parameterName of parameterNames) {
      const parameterId = file.parameters.find(parameter => parameter.name === parameterName).id
      queryDefinitions.push({
        queryKey: ['parameter', parameterId],
        queryFn: () => api.get(`/raw-data/parameter/${parameterId}`).then(res => res.data),
        ...QUERY_DEFAULTS
      })
    }
  }

  const queries = useQueries<{ fileId: string; parameterId: string; parameterName: string; posterior: number[] }[]>({
    queries: queryDefinitions
  })

  const loading = queries.some(query => query.isLoading)
  if (loading) {
    return <div>Loading</div>
  }

  // console.log(queries, loading)
  // console.log(queries.map(query => query.data?.posteriorName, query.data?.posterior))
  const rawDatasets: Record<string, Record<string, number[]>> = {}
  for (const query of queries) {
    const fileId = query.data.fileId
    if (!(fileId in rawDatasets)) {
      rawDatasets[fileId] = {}
    }
    rawDatasets[fileId][query.data.parameterName] = query.data.posterior
  }

  return <PlotsPage rawDatasets={rawDatasets} parameterNames={parameterNames} />
}

export default Plot
