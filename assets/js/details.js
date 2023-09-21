const container = document.getElementById('pokemonDetails');
let isSelected = 0;

function getPokemonId() {
    const url = document.URL;
    const params = url.slice(url.search(/\?/), url.length);
    const searchParams = new URLSearchParams(params);
    return searchParams.get("id");
}

function loadPokemonDetail(id) {
    pokeApi.getFullPokemonDetail({
        basicUrl: 'https://pokeapi.co/api/v2/pokemon/' + id
    }).then((pokemon) => {
        console.log(pokemon);
        const newHtml = convertPokemonToDiv(pokemon);
        container.innerHTML = newHtml;
    }).catch((err) => console.log(err));
}

function changeSelected(event){
    const divisions = document.getElementById("divisions");
    divisions.childNodes.forEach((node)=>{
        if(node.hash == event.target.hash){
            node.classList = "selected";
        }else {
            node.classList = "";
        }
   });    
}

function convertPokemonToDiv(pokemon) {
    const barColors = [
        {key: 'hp', value: pokemon.hp},
        {key: 'attack', value: pokemon.attack},
        {key: 'defense', value: pokemon.defense},
        {key: 'spAttack', value: pokemon.spAttack},
        {key: 'spDef', value: pokemon.spDef},
        {key: 'speed', value: pokemon.speed},
        {key: 'total', value: pokemon.total}
    ].sort((a, b)=>a.value - b.value).map((obj, index)=>{
        if(index <= 3)
            return {key: obj.key, width: obj.value*100/pokemon.total, class: 'red'}
        else
            return {key: obj.key, width: obj.value*100/pokemon.total, class: 'green'}
    })
    return `
        <div class="pokemon ${pokemon.type}">
            <h1 class="name">${pokemon.name}</h1>    
            <h3 class="number">#${pokemon.number}</h3>
            
            <div class="types-container">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}"><h5>${type}</h5></li><span class="spacer"></span>`).join('')}
                </ol>
            </div>
            <div class="image">
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}" />
            </div>
            <div class="data">
                <header class="divisions-container scroll-x">
                    <nav id="divisions" class="divisions">
                        <a href="#about" class="selected" onclick="changeSelected(event)">About</a>
                        <a href="#baseStats" onclick="changeSelected(event)">Base Stats</a>
                        <a href="#evolution" onclick="changeSelected(event)">Evolution</a>
                        <a href="#moves" onclick="changeSelected(event)">Moves</a>
                    </nav>                                        
                </header>

                <section class="content scroll-x">
                    <article id="about" class="info">
                        <table>
                            <tr>
                                <td><span class="basicTitle">Height:</span></td><td>${pokemon.height}</td>
                            </tr>
                            <tr>
                                <td><span class="basicTitle">Weight:</span></td><td>${pokemon.weight}</td>
                            </tr>
                            <tr>
                                <td><span class="basicTitle">Abilities:</span></td><td>${pokemon.abilities}</td>
                            </tr>
                            <tr>
                                <th>Breeding</th>
                            </tr>
                            <tr>
                                <td><span class="basicTitle">Egg-groups:</span></td><td>${pokemon.eggGroups}</td>
                            </tr>
                        </table>                                                                        
                    </article>
                    <article id="baseStats" class="info">
                        <table>
                            <tr>
                                <td><span class="basicTitle">HP:</span></td><td>${pokemon.hp}</td><td><div style="height:.5em;width:${barColors.find((obj)=>obj.key=='hp').width}%;background-color:${barColors.find((obj)=>obj.key=='hp').class}"></div></td>
                            </tr>
                            <tr>
                                <td><span class="basicTitle">Attack:</span></td><td>${pokemon.attack}</td><td><div style="height:.5em;width:${barColors.find((obj)=>obj.key=='attack').width}%;background-color:${barColors.find((obj)=>obj.key=='attack').class}"></div></td>
                            </tr>
                            <tr>
                                <td><span class="basicTitle">Defense:</span></td><td>${pokemon.defense}</td><td><div style="height:.5em;width:${barColors.find((obj)=>obj.key=='defense').width}%;background-color:${barColors.find((obj)=>obj.key=='defense').class}"></div></td>
                            </tr>
                            <tr>
                                <td><span class="basicTitle">Sp. Attack:</span></td><td>${pokemon.spAttack}</td><td><div style="height:.5em;width:${barColors.find((obj)=>obj.key=='spAttack').width}%;background-color:${barColors.find((obj)=>obj.key=='spAttack').class}"></div></td>
                            </tr>
                            <tr>
                                <td><span class="basicTitle">Sp. Defense:</span></td><td>${pokemon.spDef}</td><td><div style="height:.5em;width:${barColors.find((obj)=>obj.key=='spDef').width}%;background-color:${barColors.find((obj)=>obj.key=='spDef').class}"></div></td>
                            </tr>
                            <tr>
                                <td><span class="basicTitle">Speed:</span></td><td>${pokemon.speed}</td><td><div style="height:.5em;width:${barColors.find((obj)=>obj.key=='speed').width}%;background-color:${barColors.find((obj)=>obj.key=='speed').class}"></div></td>
                            </tr>
                            <tr>
                                <td><span class="basicTitle">Total:</span></td><td>${pokemon.attack}</td><td><div style="height:.5em;width:${barColors.find((obj)=>obj.key=='total').width}%;background-color:${barColors.find((obj)=>obj.key=='total').class}"></div></td>
                            </tr>
                        </table>                        
                    </article>
                    <article id="evolution" class="info">

                    </article>
                    <article id="moves" class="info">

                    </article>
                </section>
            </div>
        </div>
    `
}

loadPokemonDetail(getPokemonId());