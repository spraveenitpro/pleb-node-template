import React, { useState, useEffect } from "react";
import "./components.css";

function Peers() {
	// Declare state variables
	const [showForm, setShowForm] = useState(false);

	const [pubkey, setPubkey] = useState("");
	const [host, setHost] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);




	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Clicking Submit!!")

		// Send POST request to backend
		//const endpoint = action === "add" ? "/addPeer" : "/removePeer";
		await fetch("http://localhost:5501/lightning/addPeer", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ pubkey, host }),
		});


		setShowForm(false);
		setSuccessMessage("Peer added with Success!", pubkey);

	};

	return (
		<div>
			<button onClick={() => setShowForm(!showForm)}>Peers</button>
			{showForm && (
				<form onSubmit={handleSubmit}>
					<label>Action:</label>

					<label>Pubkey:</label>
					<input
						type="text"
						value={pubkey}
						onChange={(e) => setPubkey(e.target.value)}
					/>

					<label>Host:</label>
					<input
						type="text"
						value={host}
						onChange={(e) => setHost(e.target.value)}
					/>


					<button type="submit">Submit</button>
				</form>
			)}
			{successMessage && <div>{successMessage}</div>}

		</div>
	);
}

export default Peers;
