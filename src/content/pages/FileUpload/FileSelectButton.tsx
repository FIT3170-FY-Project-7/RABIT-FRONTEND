import React, { useState } from "react";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { Button, Input } from "@mui/material";

export default function FileSelectButton({ updateSelectedFile }) {
	const changeHandler = (event) => {
		console.log(event.target.files[0]);
		updateSelectedFile(event.target.files[0]);
	};

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<Input
				inputProps={{ accept: ".csv, .json, .mkv" }}
				style={{ display: "none" }}
				id="file-select-button"
				type="file"
				onChange={changeHandler}
			/>
			<label htmlFor="file-select-button">
				<Button
					variant="contained"
					component="span"
					startIcon={<FileOpenIcon />}
				>
					Select a File
				</Button>
			</label>
		</div>
	);
}
