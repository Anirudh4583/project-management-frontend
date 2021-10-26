import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
export default function AnnouncementCard(props) {
return (
	<div style={{margin:"auto",width:"max-content"}}>
	<h1>Announcement name</h1>
	<Card
		style={{
		width: 400,
		backgroundColor: "white",
		}}
	>
		<CardContent>
		<Typography variant="h5" component="h3">
			Announcement details
		</Typography>
		</CardContent>
        <CardActions>
		<Button size="small">Stay Safe.....</Button>
		</CardActions>
	</Card>
	</div>
);
}