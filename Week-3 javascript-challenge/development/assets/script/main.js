import data from "./data.js";
// Created new arrays
const teamAssistants = [];
const teamMembers = [];
const temporaryArr = [];
let uniqueMembers = [];
// Added assitants and members to different array
function dataDivideTeams() {
	data.findIndex((element, index) => {
		if (element.assistant) teamAssistants.push(data[index]);
	});
	data.findIndex((element, index) => {
		if (!element.assistant) teamMembers.push(data[index]);
	});
// Created members in array assitant
	teamAssistants.forEach((element) => {
		element.members = [];
	});
}
dataDivideTeams();
// Removed the duplicate object by synchronizing 
// index of directory with index of directory names
function membersUnique() {
	uniqueMembers = teamMembers.filter(
		(item, index, self) =>
			index === self.findIndex((element) => item.name === element.name)
	);
}
membersUnique();
//Added the group color similar ones to a temporary array 
function recurrentMemberColor() {
	data.forEach((element) => {
		let similarColor = uniqueMembers.filter((item) => item.group === element.group);
		temporaryArr.push([...similarColor]);
	});
}
recurrentMemberColor();
//added the members from the temporary array to the assistant group
function addAsistantsMember() {
	for (let i = 0; i < teamAssistants.length; i++) {
		teamAssistants[i].members.push(temporaryArr[i]);
	}
}
addAsistantsMember();
// Created DOM 
function createElement() {
	let k = document.querySelector("[data-teams]");
	let newDiv = null;
	let newUl = null;
	let newLi = null;
	teamAssistants.forEach((item) => {
		newDiv = document.createElement("div");
		newDiv.style.backgroundColor=`${item.group}`;
		newUl = document.createElement("ul");
		newDiv.innerHTML = `
		<h3 class="box__title">${item.name}</h3>`;
		
		item.members[0].forEach((element) => {
			newLi = document.createElement("li");
			newLi.classList.add("box__list-item");
			let nestedElement = newDiv
			.appendChild(newUl).appendChild(newLi);
			nestedElement.innerHTML = `
			${element.name}
	`;
		});
		newUl.classList.add("box__list-content");
		newDiv.classList.add("box__list");
		k.appendChild(newDiv);
	});
}
createElement();
console.log(teamAssistants, "--> Assistants");
