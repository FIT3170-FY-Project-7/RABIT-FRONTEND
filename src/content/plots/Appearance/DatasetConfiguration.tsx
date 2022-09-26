import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import BlurSlider from './BlurSlider'
import ColourPicker from './ColourPicker'
import SigmaPicker from './SigmaPicker'
import { DatasetConfig } from '../PlotTypes'
import './DatasetConfiguration.css'
import { colours } from '../constants/Colours'
import ReorderButtons from './ReorderButtons'

type DatasetConfigurationPropType = {
    dataset: DatasetConfig
    index: number
    datasetsLength: number
    reorderCallback: (prevIndex: number, nextIndex: number) => void
    updateDatasets: (dataset: DatasetConfig) => void
}

function DatasetConfiguration({
    dataset,
    index,
    datasetsLength,
    reorderCallback,
    updateDatasets
}: DatasetConfigurationPropType) {
    const [newDataset, setNewDataset] = useState({ ...dataset })
    const [isSaved, setIsSaved] = useState(true)

    useEffect(() => {
        setNewDataset({ ...dataset })
    }, [dataset])

    const handleColourChange = (index: number) => colour => {
        setIsSaved(false)
        setNewDataset(prevState => ({
            ...prevState,
            color: colour.hex
        }))
    }

    const handleSigmaChange = (index: number) => event => {
        setIsSaved(false)
        let sigmas_input = event.target.value
        if (sigmas_input > 4) {
            sigmas_input = 4
        }
        setNewDataset(prevState => ({
            ...prevState,
            sigmas: Array.from({ length: sigmas_input }, (_, index) => index + 1)
        }))
    }

    const handleBlurChange = (index: number) => new_blur_radius => {
        setIsSaved(false)
        setNewDataset(prevState => ({
            ...prevState,
            blur_radius: +new_blur_radius
        }))
    }

    const handleApplyClicked = () => {
        setIsSaved(true)
        updateDatasets(newDataset)
    }

    return (
        <Card
            key={`appearance-config-${index}`}
            className='dataset-configuration-container'
            style={{ backgroundColor: colours.appearanceConfigBackground }}
        >
            <div style={{ width: '100%', height: '15%', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ margin: '0', fontWeight: 'bold' }}>{dataset.file_name}</div>
                <button
                    className='appearance-apply-button'
                    disabled={isSaved}
                    onClick={handleApplyClicked}
                    style={{ backgroundColor: colours.appearanceConfigBackground }}
                >
                    Apply
                </button>
            </div>
            <div className='appearance-pickers'>
                <ColourPicker
                    key={`picker-${index}`}
                    initial={dataset.color}
                    handleColourChange={handleColourChange(index)}
                />
                <SigmaPicker initial={dataset.sigmas} handleSigmaChange={handleSigmaChange(index)} />
                <BlurSlider initial={dataset.blur_radius} handleBlurChange={handleBlurChange(index)} />

                <ReorderButtons index={index} datasetsLength={datasetsLength} reorderCallback={reorderCallback} />
            </div>
        </Card>
    )
}

export default DatasetConfiguration
