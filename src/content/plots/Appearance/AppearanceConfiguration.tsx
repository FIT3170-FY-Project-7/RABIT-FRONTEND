import { Box } from '@mui/material'
import { DatasetConfig } from '../PlotTypes'
import DatasetConfiguration from './DatasetConfiguration'

type AppearanceConfigPropType = {
    datasets: DatasetConfig[]
    setDatasets: (datasets: DatasetConfig[]) => void
}

const AppearanceConfig = ({ datasets, setDatasets }: AppearanceConfigPropType) => {
    const updateDatasets = (index: number) => dataset => {
        const new_datasets = [...datasets]
        new_datasets[index] = dataset
        setDatasets(new_datasets)
    }

    const reorderDatasets = (prevIndex: number, nextIndex: number) => {
        const new_datasets = [...datasets]
        const tempDataset = new_datasets[prevIndex]
        new_datasets[prevIndex] = { ...new_datasets[nextIndex] }
        new_datasets[nextIndex] = { ...tempDataset }
        setDatasets(new_datasets)
    }

    return (
        <Box>
            {datasets.map((dataset: DatasetConfig, index: number) => (
                <DatasetConfiguration
                    key={`dataset-config-${index}`}
                    dataset={dataset}
                    index={index}
                    datasetsLength={datasets.length}
                    reorderCallback={reorderDatasets}
                    updateDatasets={updateDatasets(index)}
                ></DatasetConfiguration>
            ))}
        </Box>
    )
}

export default AppearanceConfig
