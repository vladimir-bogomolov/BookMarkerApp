document.getElementById('list').onclick = () => {
    document.getElementById('container').style.transform='scale(1)';
}
document.getElementById('close').onclick = () => {
    document.getElementById('container').style.transform='scale(0)';
}

// local storage
document.getElementById('form').addEventListener('submit', memorizeMarkers);

function memorizeMarkers(event) {
    event.preventDefault();
    let name = document.getElementById('WedSiteName').value;
    let url = document.getElementById('URL').value;

    // validation
    if(!name || !url) {
        alert('Please fiil in all fields');
        return false;
    } else {
        showLight();
        setTimeout(hideLight, 1000);
    }

    let data = {
        siteName: name,
        siteUrl: url
    };
    if (localStorage.getItem('markers') === null) {
        let arr = [];
        arr.push(data);
        let myJson = JSON.stringify(arr);
        localStorage.setItem('markers', myJson);
    } else {
        let get = JSON.parse(localStorage.getItem('markers'));
        get.push(data);
        myJson = JSON.stringify(get);
        localStorage.setItem('markers', myJson);
    }
    display();
    document.getElementById('form').reset();
}

function display() {
    let get = JSON.parse(localStorage.getItem('markers'));
    let result = document.getElementById('yourSites');
    result.innerHTML = '';
    for (let i=0; i<get.length; i++) {
        result.innerHTML += `<div>${get[i].siteName} <a href="${get[i].siteUrl}" target="_blank">Go</a><button onclick="deleteMark('${get[i].siteName}')">Delete</button></div>`;
    }
}

function showLight() {
    document.getElementById('light').style.display = 'block';
}
function hideLight() {
    document.getElementById('light').style.display = 'none';
}

function deleteMark (x) {
    let get = JSON.parse(localStorage.getItem('markers'));
    for (let i = 0; i < get.length; i++) {
        if (get[i].siteName == x) {
            get.splice(i, 1);
        }
    }
    let myJson = JSON.stringify(get);
    localStorage.setItem('markers', myJson);
    display();
}