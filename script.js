const searchBtn = function () {
  document

    .getElementById("search-button")
    .addEventListener("click", async function () {
      const query = document
        .getElementById("search-input")
        .value.toLowerCase()
        .trim();
      if (query === "") return; // Handle empty input (Consider testing this scenario)

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${query}`
        );
        if (!response.ok) {
          throw new Error("Pokémon not found"); // Throw an error for invalid Pokémon
        }
        const data = await response.json();
        updatePokemonInfo(data);
      } catch (error) {
        // Display the alert and wait for it to complete before continuing
        window.setTimeout(() => {
          alert("Pokémon not found");
        }, 0);
      }
    });
};

searchBtn();

function updatePokemonInfo(data) {
  document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
  document.getElementById("pokemon-id").textContent = `#${data.id}`;
  document.getElementById("weight").textContent = `Weight: ${data.weight}`;
  document.getElementById("height").textContent = `Height: ${data.height}`;
  document.getElementById("hp").textContent = data.stats[0].base_stat;
  document.getElementById("attack").textContent = data.stats[1].base_stat;
  document.getElementById("defense").textContent = data.stats[2].base_stat;
  document.getElementById("special-attack").textContent =
    data.stats[3].base_stat;
  document.getElementById("special-defense").textContent =
    data.stats[4].base_stat;
  document.getElementById("speed").textContent = data.stats[5].base_stat;

  const typesContainer = document.getElementById("types");
  typesContainer.innerHTML = "";
  data.types.forEach((typeInfo) => {
    const typeElement = document.createElement("div");
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    typesContainer.appendChild(typeElement);
  });

  const spriteContainer = document.getElementById("sprite-container");
  spriteContainer.innerHTML = "";
  const sprite = document.createElement("img");
  sprite.src = data.sprites.front_default;
  sprite.id = "sprite";
  spriteContainer.appendChild(sprite);
}

document.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    const query = document
      .getElementById("search-input")
      .value.toLowerCase()
      .trim();
    if (query === "") return; // Handle empty input (Consider testing this scenario)

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found"); // Throw an error for invalid Pokémon
      }
      const data = await response.json();
      updatePokemonInfo(data); // Pass the data to updatePokemonInfo
    } catch (error) {
      // Display the alert and wait for it to complete before continuing
      window.setTimeout(() => {
        alert("Pokémon not found");
      }, 0);
    }
  }
});
