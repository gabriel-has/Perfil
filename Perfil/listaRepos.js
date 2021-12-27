window.onload = () => {

    listRepositories();
    

    var search = document.getElementById("search")

    search.addEventListener("submit", function(e) {
        e.preventDefault()

        var searchInput = document.getElementById("searchInput").value

        searchInput = searchInput.split(" ").join("")

        fetch ("https://api.github.com/users/"+searchInput)
        .then((result) => result.json())
        .then((data) => {
            console.log(data);

        document.getElementById("result").innerHTML = 
        `
        <h5>User: ${data.name}</h5>
        <p>
            <strong>Empresa: </strong> ${data.company}<br>
            <strong>Repositórios: </strong>${data.public_repos}
        </p>
        <a target="_blank" href="${data.html_url}">
            <img id="avatarSearch" src="${data.avatar_url}"/>
        </a>
        `

            
        })

    })
    
}

listRepositories = () => {
    let xhr = new XMLHttpRequest()

    xhr.onload = function () {

        let repositoriesData = JSON.parse(this.responseText);
        
        document.getElementById("listaHeader").innerHTML = `Lista de Repositórios - Gabriel H A Silva`

        for (let i = 0; i < repositoriesData.length; i++) {
            document.getElementById("listagem").innerHTML +=
            `
            
                <tr>
                    <th scope="row">${i+1}</th>
                    <td>
                        <a href=${repositoriesData[i].html_url} target="_blank">${repositoriesData[i].name}</a>
                    </td>
                    <td>${repositoriesData[i].language}</td>
                    <td>${repositoriesData[i].updated_at}</td>
                </tr>
            `
        }

    }

    xhr.onerror = function () {
        alert(`Erro na requisição\nCódigo: ${this.status} - ${this.statusText}`)
    }

    xhr.open("GET", "https://api.github.com/users/gabriel-has/repos");
    xhr.send();
}

