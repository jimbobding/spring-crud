"use strict";

(function () {
  console.log("test");
  const output = document.getElementById("output");

  const address = "http://localhost:8081";

  async function getPerson() {
    try {
      output.innerHTML = "";
      const res = await axios.get(`${address}/getAll`);
      console.log("Data:", res.data);
      res.data.forEach((person) => renderPerson(person));
    } catch (e) {
      console.error(e);
    }
  }

  function renderPerson({ fullName, oldNess, occupation, notNiNumber, id }) {
    console.log("Person:", { fullName, oldNess, occupation, notNiNumber, id });
    const person = document.createElement("div");
    person.classList.add("col");
    const personCard = document.createElement("div");
    personCard.classList.add("card");

    const personBody = document.createElement("div");
    personBody.classList.add("card-body");
    const personfullName = document.createElement("p");
    personfullName.innerText = `Name: ${fullName}`;
    personfullName.classList.add("card-text");
    personBody.appendChild(personfullName);

    const personOldness = document.createElement("p");
    personOldness.innerText = `Age: ${oldNess}`;
    personOldness.classList.add("card-text");
    personBody.appendChild(personOldness);

    const personOcupation = document.createElement("p");
    personOcupation.innerText = `Ocupation: ${occupation}`;
    personOcupation.classList.add("card-text");
    personBody.appendChild(personOcupation);

    const personNotNiNumber = document.createElement("p");
    personNotNiNumber.innerText = "N.I number: Private information";
    personNotNiNumber.classList.add("card-text");
    personBody.appendChild(personNotNiNumber);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "DELETE";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.addEventListener("click", () => deletePerson(id));
    personBody.appendChild(deleteBtn);
    personCard.appendChild(personBody);
    person.appendChild(personCard);

    // const updateBtn = document.createElement("button");
    // updateBtn.innerText = "UPDATE";
    // updateBtn.classList.add("btn", "btn-primary");
    // updateBtn.addEventListener("click", () => updatePerson(id));
    // personBody.appendChild(updateBtn);
    // personCard.appendChild(personBody);
    // person.appendChild(personCard);

    output.appendChild(person);
  }

  async function deletePerson(id) {
    const res = await axios.delete(`${address}/remove/${id}`);
    getPerson();
  }

  document
    .getElementById("updatePersonForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const { id, fullName, oldNess, occupation } = this;
      // const res = await axios.patch(`${address}/update/${id}`);

      try {
        const res = await axios.patch(`${address}/update/${id.value}`, null, {
          params: {
            name: fullName.value,
            age: oldNess.value,
            job: occupation.value,
          },
        });
      } catch (e) {
        console.error(e);
      }
      console.log(id.value);

      // const updatedPerson = {
      //   fullName: fullName.value,
      //   oldNess: oldNess.value,
      //   occupation: occupation.value,
      // };
    });

  document
    .getElementById("personForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const { fullName, oldNess, occupation, notNiNumber } = this;

      const newPerson = {
        fullName: fullName.value,
        oldNess: oldNess.value,
        occupation: occupation.value,
        notNiNumber: notNiNumber.value,
      };
      this.reset();
      fullName.focus();

      try {
        const res = await axios.post(`${address}/create`, newPerson);
        console.log(newPerson);
        getPerson();
      } catch (e) {
        console.error(e);
      }
    });
  getPerson();
})();
