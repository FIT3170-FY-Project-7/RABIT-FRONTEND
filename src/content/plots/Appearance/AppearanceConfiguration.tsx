import React from 'react'
import { DatasetConfig } from '../PlotTypes'
import DatasetConfiguration from './DatasetConfiguration'

type AppearanceConfigPropType = {
    datasets: DatasetConfig[]
    setDatasets: (datasets: DatasetConfig[]) => void
}

const AppearanceConfig = ({ datasets, setDatasets }: AppearanceConfigPropType) => {
    const submitPickerValues = (index: number) => dataset => {
        const new_datasets = [...datasets]
        new_datasets[index] = dataset
        setDatasets(new_datasets)
    }

    return (
        <div style={{ position: 'relative', width: '30%', minWidth: '290px' }}>
            {datasets.map((dataset: DatasetConfig, index: number) => (
                <DatasetConfiguration
                    key={`dataset-config-${index}`}
                    dataset={dataset}
                    index={index}
                    submitPickerValues={submitPickerValues(index)}
                ></DatasetConfiguration>
            ))}
        </div>
    )
}

export default AppearanceConfig
