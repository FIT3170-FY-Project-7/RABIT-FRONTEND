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
  const filenameLookup: Record<string, string> = {}
  const parameternameLookup: Record<string, string> = {}
  const queryDefinitions = []
  for (const file of files) {
    filenameLookup[file.fileId] = file.fileName
    for (const parameterName of parameterNames) {
      parameternameLookup[parameterName] = undefined
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

    // Add a new ParameterLabel if the parameter has not been added yet
    if (!parameternameLookup[data.parameterName]) {
      parameterLabels.push({ parameterName: data.parameterName, parameterLabel: data.parameterLabel, domainSet: false })
      parameternameLookup[data.parameterName] = data.parameterLabel
    }
    rawDatasets[fileId][data.parameterName] = data.posterior
  }

  return <PlotsPage rawDatasets={rawDatasets} parameterLabels={parameterLabels} filenameLookup={filenameLookup} />
}

export default Plot
