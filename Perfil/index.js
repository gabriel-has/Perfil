window.onload = () => {
    getUserData();
    getRepositories();

    var search = document.getElementById("search")

    search.addEventListener("submit", function (e) {
        e.preventDefault()

        var searchInput = document.getElementById("searchInput").value

        searchInput = searchInput.split(" ").join("")

        fetch("https://api.github.com/users/" + searchInput)
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

function getUserData() {

    let xhr = new XMLHttpRequest()

    xhr.onload = function () {
        console.log("ok");
        let userData = JSON.parse(this.responseText);

        let avatar = 
            `
            <div id="box-avatar" class="d-flex flex-column">
                <a class="d-flex justify-content-center" href="${userData.html_url}" target="_blank">
                <img id="perfilAvatar" src="${userData.avatar_url}" class="card-img-top d-flex align-self-center" alt="${userData.name}">
                </a>
            </div>
            `

        document.getElementById("box-photo").innerHTML = avatar;

        document.getElementById("perfilNome").innerHTML = `${userData.name} (${userData.login})`;
    }

    xhr.onerror = function () {
        alert(`Erro na requisição\nCódigo: ${this.status} - ${this.statusText}`)
    }

    xhr.open("GET", "https://api.github.com/users/gabriel-has");
    xhr.send();
}

function getRepositories () {
    let xhr = new XMLHttpRequest()

    xhr.onload = function () {
        
        let repoData = JSON.parse(this.responseText);

        console.log(repoData);

        for (let i = 0; i < 3; i++) {

            document.getElementById("repositories").innerHTML +=
            `<div class="col-12 col-sm-6 col-md-4">
                <a id="cardLink" href=${repoData[i].html_url} target="_blank">
                <div class="d-flex cards cardRepo> 
                    <div class="d-flex w100 h100">
                        <div class="imgPasta">
                            <div class="icons">
                                <i class="fas fa-folder"></i>
                            </div>
                        </div>
                        <div class="d-flex conteudoRepo ">
                            <p><strong>${repoData[i].name}</strong>
                            <br>Linguagem: ${repoData[i].language}
                            <br>Ultima alteração: 
                            <br>${repoData[i].updated_at}
                            </p>
                        </div>
                    </div>
                </div></a>
            </div>
            ` 
        }
        
        
        
    }

    xhr.onerror = function () {
        alert(`Erro na requisição\nCódigo: ${this.status} - ${this.statusText}`)
    }

    xhr.open("GET", "https://api.github.com/users/gabriel-has/repos");
    xhr.send();
}

function a  () {
    for (let i = 0; i < 3; i++) {

    }
}