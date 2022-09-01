import { Button, Divider, MenuItem, Switch, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Reorder from 'react-reorder'

const ParameterSelector = ({ items: input_items, default: initial_active, onUpdate: callback }) => {
    /* 
    Drag and drop selector for adding, removing, and reordering active parameters.
    */
    const [items, setItems] = useState({
        'inactive-items': input_items.filter(i => !initial_active.includes(i)),
        'active-items': initial_active
    })
    const [autoUpdate, setAutoUpdate] = useState(true)
    console.log(input_items)
    console.log(initial_active)

    const onReorder = (_, previousIndex, nextIndex, fromId, toId) => {
        if (fromId === toId) {
            const list = Reorder.reorder(items[fromId], previousIndex, nextIndex)

            setItems(prev => ({
                ...prev,
                [fromId]: list
            }))
        } else {
            const lists = Reorder.reorderFromTo(
                {
                    from: items[fromId],
                    to: items[toId]
                },
                previousIndex,
                nextIndex
            )

            setItems(prev => ({
                ...prev,
                [fromId]: lists.from,
                [toId]: lists.to
            }))
        }
    }

    const onClick = (fromId, index) => {
        return e => {
            if (!e.shiftKey && e.type != 'dblclick') return
            const toId = fromId == 'active-items' ? 'inactive-items' : 'active-items'
            const to = items[toId].concat([items[fromId][index]])
            const from = items[fromId].filter((_, i) => i !== index)

            setItems(prev => ({
                ...prev,
                [fromId]: from,
                [toId]: to
            }))
        }
    }

    const onAutoUpdate = event => {
        setAutoUpdate(event.target.checked)
    }

    useEffect(() => {
        if (autoUpdate) callback(items['inactive-items'], items['active-items'])
    }, [items])

    const style = {
        height: '150px',
        width: '400px',
        overflow: 'auto',
        padding: '5px',
        // backgroundColor: "#8C7CF0",
        userSelect: 'none'
    }

    const itemStyle = {
        width: '100%'
        // padding: "5px",
        // backgroundColor: "black",
        // border: "2px solid white",
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    borderColor: 'white',
                    borderStyle: 'solid',
                    borderRadius: '1rem',
                    backgroundColor: '#111633'
                }}
            >
                <div>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>
                        Inactive Parameters
                    </Typography>
                    <Reorder
                        reorderId='inactive-items'
                        reorderGroup='param-selector'
                        onReorder={onReorder}
                        style={style}
                    >
                        {items['inactive-items'].map((item, i) => (
                            <MenuItem
                                onDoubleClick={onClick('inactive-items', i)}
                                onClick={onClick('inactive-items', i)}
                                style={itemStyle}
                                key={item}
                                divider
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Reorder>
                </div>
                <Divider orientation='vertical' />
                <div>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>
                        Active Parameters
                    </Typography>
                    <Reorder reorderId='active-items' reorderGroup='param-selector' onReorder={onReorder} style={style}>
                        {items['active-items'].map((item, i) => (
                            <MenuItem
                                onDoubleClick={onClick('active-items', i)}
                                onClick={onClick('active-items', i)}
                                style={itemStyle}
                                key={item}
                                divider
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Reorder>
                </div>
            </div>
            <div>
                <Button onClick={() => callback(items['inactive-items'], items['active-items'])}>Update Graph</Button>
                <Switch checked={autoUpdate} onChange={onAutoUpdate} />
                Auto Update
            </div>
        </div>
    )
}

export default ParameterSelector
