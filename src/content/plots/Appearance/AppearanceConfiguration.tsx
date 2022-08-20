import React from 'react'
import { DatasetConfig } from '../PlotTypes'
import BlurSlider from './BlurSlider'
import ColourPicker from './ColourPicker'
import SigmaPicker from './SigmaPicker'
import './AppearanceConfiguration.css'
import { Card } from '@mui/material'

type AppearanceConfigPropType = {
    datasets: DatasetConfig[]
    setDatasets: (datasets: DatasetConfig[]) => void
}

const AppearanceConfig = ({ datasets, setDatasets }: AppearanceConfigPropType) => {
    const new_datasets = [...datasets]

    const handleColourChange = (index: number) => colour => {
        new_datasets[index].color = colour.hex
    }

    const handleSigmaChange = (index: number) => event => {
        new_datasets[index].sigmas = Array.from({ length: event.target.value }, (_, index) => index + 1)
    }

    const handleBlurChange = (index: number) => event => {
        let blur_num = event.target.value
        new_datasets[index].blur_radius = blur_num
        const element = document.getElementsByClassName('appearance-configuration-slider-value')[index]
        if (blur_num % 1 == 0) {
            blur_num = String(blur_num) + '.0'
        }
        element.innerHTML = `Blur Radius: ${blur_num}`
    }

    const submitPickerValues = () => {
        setDatasets(new_datasets)
    }

    return (
        <div style={{ position: 'relative', width: '30%', minWidth: '290px' }}>
            {datasets.map((_, index: number) => (
                <Card key={`appearance-config-${index}`} className='appearance-configuration-container'>
                    <div style={{ width: '100%', height: '15%', borderBottom: '1px solid white' }}>
                        <h5 style={{ margin: '0' }}>Dataset {index + 1}</h5>
                    </div>
                    <div className='appearance-pickers'>
                        <ColourPicker key={`picker-${index}`} handleColourChange={handleColourChange(index)} />
                        <SigmaPicker handleSigmaChange={handleSigmaChange(index)} />
                        <BlurSlider handleBlurChange={handleBlurChange(index)} />
                    </div>
                    <div style={{ width: '100%', height: '20%' }}>
                        <button className='appearance-confirm-button' onClick={submitPickerValues}>
                            Confirm
                        </button>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default AppearanceConfig
