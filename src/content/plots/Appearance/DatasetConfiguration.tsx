import React, { useState } from 'react'
import { Card } from '@mui/material'
import BlurSlider from './BlurSlider'
import ColourPicker from './ColourPicker'
import SigmaPicker from './SigmaPicker'
import { DatasetConfig } from '../PlotTypes'
import './DatasetConfiguration.css'
import { colours } from '../constants/Colours'

type DatasetConfigurationPropType = {
    dataset: DatasetConfig
    index: number
    submitPickerValues: any
}

function DatasetConfiguration({ dataset, index, submitPickerValues }: DatasetConfigurationPropType) {
    const [newDataset, setNewDataset] = useState({ ...dataset })

    const handleColourChange = (index: number) => colour => {
        setNewDataset(prevState => ({
            ...prevState,
            color: colour.hex
        }))
    }

    const handleSigmaChange = (index: number) => event => {
        let sigmas_input = event.target.value
        if (sigmas_input > 4) {
            sigmas_input = 4
        }
        setNewDataset(prevState => ({
            ...prevState,
            sigmas: Array.from({ length: sigmas_input }, (_, index) => index + 1)
        }))
    }

    const handleBlurChange = (index: number) => event => {
        let blur_num = event.target.value
        setNewDataset(prevState => ({
            ...prevState,
            blur_radius: blur_num
        }))
        const element = document.getElementsByClassName('appearance-configuration-slider-value')[index]
        if (blur_num % 1 == 0) {
            blur_num = String(blur_num) + '.0'
        }
        element.innerHTML = `Blur Radius: ${blur_num}`
    }

    const handleApplyClicked = () => {
        submitPickerValues(newDataset)
    }
    return (
        <Card
            key={`appearance-config-${index}`}
            className='dataset-configuration-container'
            style={{ backgroundColor: colours.appearanceConfigBackground }}
        >
            <div style={{ width: '100%', height: '15%', borderBottom: '1px solid white' }}>
                <h5 style={{ margin: '0' }}>Dataset {index + 1}</h5>
            </div>
            <div className='appearance-pickers'>
                <ColourPicker key={`picker-${index}`} handleColourChange={handleColourChange(index)} />
                <SigmaPicker handleSigmaChange={handleSigmaChange(index)} />
                <BlurSlider handleBlurChange={handleBlurChange(index)} />
            </div>
            <div style={{ width: '100%', height: '20%' }}>
                <button
                    className='appearance-apply-button'
                    onClick={handleApplyClicked}
                    style={{ backgroundColor: colours.appearanceConfigBackground }}
                >
                    Apply
                </button>
            </div>
        </Card>
    )
}

export default DatasetConfiguration
