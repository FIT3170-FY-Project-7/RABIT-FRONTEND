import React from 'react'
import { DatasetConfig } from '../PlotTypes'
import ColourPicker from './ColourPicker'

type AppearanceConfigPropType = {
    datasets: DatasetConfig[]
    setDatasets: (datasets: DatasetConfig[]) => void
}

const AppearanceConfig = ({ datasets, setDatasets }: AppearanceConfigPropType) => {
    const handleColourChange = (index: number) => colour => {
        const new_datasets = [...datasets]
        new_datasets[index].color = colour.hex
        setDatasets(new_datasets)
    }

    return (
        <div style={{ position: 'relative' }}>
            {datasets.map((_, index: number) => (
                <div style={{ display: 'flex' }}>
                    <ColourPicker key={`picker-${index}`} handleColourChange={handleColourChange(index)} />
                    <input type='number'></input>
                </div>
            ))}
        </div>
    )
}

export default AppearanceConfig
