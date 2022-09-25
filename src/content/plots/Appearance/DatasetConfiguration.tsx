import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import BlurSlider from './BlurSlider'
import ColourPicker from './ColourPicker'
import SigmaPicker from './SigmaPicker'
import { DatasetConfig } from '../PlotTypes'
import './DatasetConfiguration.css'
import { colours } from '../constants/Colours'
import ReorderButtons from './ReorderButtons'
import HelpIcon from '@mui/icons-material/Help'
import Tooltip from '@mui/material/Tooltip'

type DatasetConfigurationPropType = {
    dataset: DatasetConfig
    index: number
    datasetsLength: number
    reorderCallback: (prevIndex: number, nextIndex: number) => void
    updateDatasets: (dataset: DatasetConfig) => void
}

const helpMessage = `Configure the appearance of your corner plot. For each dataset, you can set the colour, number of sigmas displayed,  and the blur radius. You can also reorder the datasets to determine which one is displayed on top for easier readability by using the arrows.`

function DatasetConfiguration({
    dataset,
    index,
    datasetsLength,
    reorderCallback,
    updateDatasets
}: DatasetConfigurationPropType) {
    const handleColourChange = colour => {
        updateDatasets({ ...dataset, color: colour.hex })
    }

    const handleSigmaChange = event => {
        let sigmas_input = event.target.value
        if (sigmas_input > 4) {
            sigmas_input = 4
        }
        updateDatasets({ ...dataset, sigmas: Array.from({ length: sigmas_input }, (_, index) => index + 1) })
    }

    const handleBlurChange = new_blur_radius => {
        updateDatasets({ ...dataset, blur_radius: +new_blur_radius })
    }

    return (
        <Card
            key={`appearance-config-${index}`}
            className='dataset-configuration-container'
            style={{ backgroundColor: colours.appearanceConfigBackground }}
        >
            <div style={{ width: '100%', height: '15%', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <div style={{ marginRight: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    Dataset {index + 1}
                </div>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                    <Tooltip title={helpMessage}>
                        <HelpIcon style={{ fontSize: 18 }} />
                    </Tooltip>
                </div>
            </div>
            <div className='appearance-pickers'>
                <ColourPicker key={`picker-${index}`} initial={dataset.color} handleColourChange={handleColourChange} />
                <SigmaPicker initial={dataset.sigmas} handleSigmaChange={handleSigmaChange} />
                <BlurSlider initial={dataset.blur_radius} handleBlurChange={handleBlurChange} />

                <ReorderButtons index={index} datasetsLength={datasetsLength} reorderCallback={reorderCallback} />
            </div>
        </Card>
    )
}

export default DatasetConfiguration
