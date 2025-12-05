function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorage(key) {
    return localStorage.getItem(key);
}

displayDonations();

// Event Listener for the donationForm

document.getElementById("donationForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate if the Charity Name is not blank
    const charityName = document.getElementById("charityName").value.trim();
    
    //Ensure the Donation Amount is a number
    const donationAmount = parseFloat(document.getElementById("donationAmount").value);
    const donationDate = document.getElementById("donationDate").value;
    const donorMessage = document.getElementById("donorMessage").value.trim();

    if (!charityName || isNaN(donationAmount) || donationAmount <= 0 || !donationDate) {
        alert("Please fill out all required fields correctly. Donation amount must be a positive number.");
        return;
    }

    const donationEntries = {
        charityName: charityName,
        //formats the string into two decimal places
        donationAmount: donationAmount.toFixed(2),
        donationDate: String(donationDate),
        donorMessage: donorMessage
    }

    saveDonations(charityName, donationAmount, donationDate, donorMessage);
    displayDonations();
    displayTotalDonations()

    document.getElementById("confirmationMessage").innerText = "Donation Sent!";

    console.log("Donation Data", donationEntries)
});

const switchPageButton = document.getElementById("switch-page");
switchPageButton.addEventListener("click", () => {
    window.location.href="volunteer_hours.html"
})

function saveDonations(charityName, donationAmount, donationDate, donorMessage){

    if (localStorage.getItem("donations") === null) {
        localStorage.setItem("donations", `{"donations":[{"charityName":`
            + `"${charityName}","donationAmount":"${donationAmount}", `
            + `"donationDate":"${donationDate}", "donorMessage":`
            + `"${donorMessage}"}]}`);
    } else {
        let JsonObjectString = localStorage.getItem("donations");
        console.log(JsonObjectString)
        let jsonObject = JSON.parse(JsonObjectString);
        let newJsonObjectEntry = JSON.parse(`{"charityName":`
            + `"${charityName}","donationAmount":"${donationAmount}", `
            + `"donationDate":"${donationDate}", "donorMessage":`
            + `"${donorMessage}"}`);
        jsonObject.donations.push(newJsonObjectEntry);
        console.log(jsonObject.donations);
        localStorage.setItem("donations", JSON.stringify(jsonObject));
    }
}

function displayDonations() {
	let getDonations = getLocalStorage("donations");
	const donationsTable = document.getElementById("donationTable");
    donationsTable.innerHTML = ""
    idValue = 0

    if (!getDonations) {
		console.warn("No donations found in local storage.");
		return;
	}

	let donationsJson = JSON.parse(getDonations);
    let donationsList = donationsJson.donations

	for (let i = 0; i < donationsList.length; i++) {
		let {charityName, donationAmount, donationDate, donorMessage} = donationsList[i]
		console.log(donationDate)
		let row = document.createElement("tr");

        let charityNameCell = document.createElement("td");
        charityNameCell.textContent = charityName;

		let donationAmountCell = document.createElement("td");
		donationAmountCell.textContent = `$${donationAmount}`;

		let donationDateCell = document.createElement("td");
		donationDateCell.textContent = donationDate;

        let donorMessageCell = document.createElement("td");
        donorMessageCell.textContent = donorMessage;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        deleteButton.id = idValue

        row.appendChild(charityNameCell);
		row.appendChild(donationAmountCell);
		row.appendChild(donationDateCell);
        row.appendChild(donorMessageCell);
        row.appendChild(deleteButton);

		donationsTable.appendChild(row);

        idValue += 1

        deleteButton.addEventListener("click", (deletion) => {
            row.remove()

            donationsList.splice(i, 1)
            if (donationsList.length == 0) {
                localStorage.removeItem("donations")
            } else {
                localStorage.setItem("donations", `{"donations":
                    ${JSON.stringify(donationsList)}}`);
            }
            displayDonations();
            displayTotalDonations();
        })
	}
}

function displayTotalDonations() {
    let getDonations = getLocalStorage("donations");
	const donationsTotal = document.getElementById("donationTotal");
    donationsTotal.innerHTML = ""

    let totalDonationCount = 0

    if (!getDonations) {
		console.warn("No donations found in local storage.");
		return;
	}

	let donationsJson = JSON.parse(getDonations);

	let donationsList = donationsJson.donations

	donationsList.forEach((donations) => {
        let {donationAmount} = donations

        donationAmount = parseInt(donationAmount)

        totalDonationCount += donationAmount
	})

    let totalDonationCell = document.createElement("h4");
	totalDonationCell.textContent = `$${totalDonationCount}`;

    donationsTotal.appendChild(totalDonationCell)
}
