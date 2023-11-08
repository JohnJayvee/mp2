document.getElementById('submitUser').addEventListener('click', function (e) {
    e.preventDefault();
    addUser();
});


const tableBody = document.querySelector('tbody');

function fetchAllUsers() {
    fetch('http://localhost:3000/api/users/')
        .then(res => res.json())
        .then(userData => {
            setTableData(userData);
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        })
}

function setTableData(data) {
    tableBody.innerHTML = '';
    resut = data.data;

    resut.forEach(user => {
        console.log(user)
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
        <td >${user.id}</td>
            <td >${user.username}</td>
            <td >${user.password}</td>
            <td>
                <button type="button" class="btn btn-primary updateBtn" data-bs-toggle="modal"
                data-bs-target="#updateModal" onclick="showModal(${user.id})">Update</button>   
                <button type="button" onclick="removeUser(${user.id})" class="btn btn-danger">Delete</button>
            </td>
        `;

        tableBody.append(tableRow)
    })
}



function addUser() {
    const addmodal = document.getElementById('addModal');
    const addModalInit = new bootstrap.Modal(addmodal);

    const username = document.getElementById('userName').value
    const password = document.getElementById('passWord').value




    fetch('http://localhost:3000/api/users/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {


            if (!username || !password) {
                // alert('All fields required!!!')
                alert(data.message);
                return;
                addModalInit.hide();

            }

            if (data) {
                addModalInit.hide();
                fetchAllUsers();
                clearAllInputs();



            } else {
                alert(data)
                clearAllInputs();
                addModalInit.hide();
            }
        }).catch(error => {
            console.error(`Error: ${error}`);
            return;
        })
}

function getUserById(id) {
    return fetch(`http://localhost:3000/api/users/${id}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Something went wrong!');
            }
        }).catch(error => {
            console.error(`Error: ${error}`);
        });
}

// function getUserById(id) {
//     return fetch(`http://localhost:3000/users/read/${id}`)
//         .then(res => {
//             if (res.ok) {
//                 return res.json()
//             } else {
//                 throw new Error(`Error: ${error}`)
//             }
//         })
//         .catch(error => {
//             console.error(`Error: ${error}`)
//         })
// }

function removeUser(id) {
    const confirmationDialog = confirm('Are you sure you want to delete');


    if (confirmationDialog) {
        fetch(`http://localhost:3000/api/users/delete/${id}`, {
            method: 'DELETE',
            mode: 'cors', // this cannot be 'no-cors'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log('response', response)
                if (response.ok) {
                    // console.log('response', response)
                    alert("Successfully removed users")
                    // window.location.reload()
                    fetchAllUsers()
                    // trigger F5/delete/refresh
                }
                else if (response.status == 400) {
                    return response.json();
                }
                else {
                    throw new Error('Request failed', response.status);
                }
            })
            .catch(error => {
                console.error('Request failed', error)
                // if(error.status == 400){
                //     alert(error.message)
                // }
                //     alert(data.message);
            })
    }
}

/* 
OK
*/
//update
function showModal(id) {
    const modalFooter = document.getElementById('modal-footer-id');

    if (modalFooter) {
        modalFooter.innerHTML = `
            <button 
                type="button" 
                class="btn btn-primary" 
                id="updateUserBtn" 
                data-bs-dismiss="modal"
                onclick="updateUser(${id})"
            >Update</button>
        `;
    }
}
function updateUser(id) {
    const modal = document.getElementById('updateModal');
    const modalInit = new bootstrap.Modal(modal);

    const updateUsername = document.getElementById('updateUsername').value;
    const updatePassword = document.getElementById('updatePassword').value;

    const fieldToBeUpdated = {};


    if (updateUsername) {
        fieldToBeUpdated.username = updateUsername;
    }

    if (updatePassword) {
        fieldToBeUpdated.password = updatePassword;
    }

    if (Object.keys(fieldToBeUpdated).length === 0) {
        alert('No fields to be updated');
        return;
    }

    fetch(`http://localhost:3000/api/users/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(fieldToBeUpdated)
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Something went wrong');
        }
    }).then(data => {
        if (data.status) {
            // fetchAllUsers();
            modalInit.hide();
            // clearFormFields('update');
            // clearFormFields('update');
            clearAllInputs()


        } else {
            alert(data.message);
            fetchAllUsers();
        }
    }).catch(error => {
        console.error(`Error: ${error}`);
    });

    // clearFormFields('update');
    clearAllInputs()
}
//clear inputs
function clearAllInputs(event) {
    var allInputs = document.querySelectorAll('input');
    allInputs.forEach(singleInput => singleInput.value = '');
}
fetchAllUsers();