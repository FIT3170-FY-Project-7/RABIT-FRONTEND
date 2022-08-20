import React from 'react'
import { DatasetConfig } from '../PlotTypes'
import BlurSlider from './BlurSlider'
import ColourPicker from './ColourPicker'
import SigmaPicker from './SigmaPicker'

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

    const handleSigmaChange = (index: number) => event => {
        const new_datasets = [...datasets]
        new_datasets[index].sigmas = Array.from({ length: event.target.value }, (_, index) => index + 1)
        setDatasets(new_datasets)
    }

    const handleBlurChange = (index: number) => event => {
        const new_datasets = [...datasets]
        new_datasets[index].blur_radius = event.target.value
        document.getElementById('appearance-configuration-slider-value').innerHTML = event.target.value
        setDatasets(new_datasets)
    }

    return (
        <div style={{ position: 'relative', width: '30%' }}>
            {datasets.map((_, index: number) => (
                <div
                    key={`appearance-config-${index}`}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        height: '20%',
                        justifyContent: 'space-around',
                        border: '1px solid white',
                        padding: '5px'
                    }}
                >
                    <ColourPicker key={`picker-${index}`} handleColourChange={handleColourChange(index)} />
                    <SigmaPicker handleSigmaChange={handleSigmaChange(index)} />

                    <BlurSlider handleBlurChange={handleBlurChange(index)} />
                </div>
            ))}
        </div>
    )
}

export default AppearanceConfig
