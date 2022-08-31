import api from '../../api'
import { PlotConfig, DatasetConfig, ParameterConfig } from './PlotTypes'

export const uploadCornerPlotConfigs = async (
    collectionId: string,
    plotConfig: PlotConfig,
    datasetConfigs: DatasetConfig[],
    parameterConfigs: ParameterConfig[]
): Promise<string> => {
    // TODO: update this to work with firebase login,
    // or otherwise to whatever temporary/default user ID is in Nectar
    const userId = 'temp'

    const reqBody = {
        user_id: userId,
        collection_id: collectionId,
        plot_config: plotConfig,
        dataset_configs: removeRawDataFromConfigs(datasetConfigs),
        parameters: addFileIdToParams(parameterConfigs, datasetConfigs[0].file_id)
    }

    return await (await api.post('/plot', reqBody)).data
}

const removeRawDataFromConfigs = (datasetConfigs: DatasetConfig[]) => {
    return datasetConfigs.map(datasetConfig => {
        const { data, ...config } = datasetConfig
        return config
    })
}

const addFileIdToParams = (parameterConfigs: ParameterConfig[], file_id: string) => {
    return parameterConfigs.map(parameterConfig => {
        return { file_id: file_id, ...parameterConfig }
    })
}
