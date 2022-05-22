import { Button, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import Reorder from "react-reorder";

const ParameterSelector = ({
	items: input_items,
	default: initial_active,
	onUpdate: callback,
}) => {
	/* 

    Drag and drop selector for adding, removing, and reordering active parameters.

    */
	const [items, setItems] = useState({
		"inactive-items": input_items.filter((i) => !initial_active.includes(i)),
		"active-items": initial_active,
	});
	const [autoUpdate, setAutoUpdate] = useState(true);

	const onReorder = (_, previousIndex, nextIndex, fromId, toId) => {
		if (fromId === toId) {
			const list = Reorder.reorder(items[fromId], previousIndex, nextIndex);

			setItems((prev) => ({
				...prev,
				[fromId]: list,
			}));
		} else {
			const lists = Reorder.reorderFromTo(
				{
					from: items[fromId],
					to: items[toId],
				},
				previousIndex,
				nextIndex
			);

			setItems((prev) => ({
				...prev,
				[fromId]: lists.from,
				[toId]: lists.to,
			}));
		}
	};

	const onClick = (fromId, index) => {
		return (e) => {
			if (!e.shiftKey && e.type != "dblclick") return;
			const toId = fromId == "active-items" ? "inactive-items" : "active-items";
			const to = items[toId].concat([items[fromId][index]]);
			const from = items[fromId].filter((_, i) => i !== index);

			setItems((prev) => ({
				...prev,
				[fromId]: from,
				[toId]: to,
			}));
		};
	};

	const onAutoUpdate = (event) => {
		setAutoUpdate(event.target.checked);
	};

	useEffect(() => {
		if (autoUpdate) callback(items["inactive-items"], items["active-items"]);
	}, [items]);

	const style = {
		height: "150px",
		width: "400px",
		overflow: "auto",
		padding: "5px",
		backgroundColor: "#4dacff",
		userSelect: "none",
	};

	const itemStyle = {
		width: "100%",
		padding: "5px",
		backgroundColor: "#80c3ff",
		borderBottom: "2px solid #66b8ff",
	};

	return (
		<div>
			<div style={{ display: "flex" }}>
				<div>
					Inactive Parameters
					<Reorder
						reorderId="inactive-items"
						reorderGroup="param-selector"
						onReorder={onReorder}
						style={style}
					>
						{items["inactive-items"].map((item, i) => (
							<div
								onDoubleClick={onClick("inactive-items", i)}
								onClick={onClick("inactive-items", i)}
								style={itemStyle}
								key={item}
							>
								{item}
							</div>
						))}
					</Reorder>
				</div>
				<div>
					Active Parameters
					<Reorder
						reorderId="active-items"
						reorderGroup="param-selector"
						onReorder={onReorder}
						style={style}
					>
						{items["active-items"].map((item, i) => (
							<div
								onDoubleClick={onClick("active-items", i)}
								onClick={onClick("active-items", i)}
								style={itemStyle}
								key={item}
							>
								{item}
							</div>
						))}
					</Reorder>
				</div>
			</div>
			<div>
				<Button
					onClick={() =>
						callback(items["inactive-items"], items["active-items"])
					}
				>
					Update Graph
				</Button>
				<Switch checked={autoUpdate} onChange={onAutoUpdate} />
				Auto Update
			</div>
		</div>
	);
};

export default ParameterSelector;
