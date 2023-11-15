document.getElementById('submitBlog').addEventListener('click', function (e) {
    e.preventDefault();
    addBlog();
});


const tableBody = document.querySelector('tbody');

function fetchAllBlogs() {
    fetch('http://localhost:3000/api/blogs/')
        .then(res => res.json())
        .then(blogData => {
            setTableData(blogData);
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        })
}

function setTableData(data) {
    tableBody.innerHTML = '';
    resut = data.data;

    resut.forEach(blog => {
        const dateCreatedAt = new Date(blog.createdAt);
        dateString = new Date(dateCreatedAt).toUTCString();
        dateCreatedAtString = dateString.split(' ').slice(0, 6).join(' ');

        const dateUpdatedAt = Date(blog.updatedAt);
        dateString = new Date(dateUpdatedAt).toUTCString();
        dateUpdatedAtString = dateString.split(' ').slice(0, 6).join(' ');

        console.log(blog)
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
        <td >${blog.id}</td>
            <td >${blog.title}</td>
            <td >${blog.content}</td>
            <td >${dateCreatedAtString}</td>
            <td >${dateUpdatedAtString}</td>

            <td>                
                <button type="button" class="btn btn-primary updateBtn" data-bs-toggle="modal"
                data-bs-target="#updateModal" onclick="showModal(${blog.id})">Update</button>   
                <button type="button" onclick="removeBlog(${blog.id})" class="btn btn-danger">Delete</button>
            </td>
        `;

        tableBody.append(tableRow)
    })
}



function addBlog() {
    const addmodal = document.getElementById('addModal');
    const addModalInit = new bootstrap.Modal(addmodal);

    const title = document.getElementById('addTitle').value
    const content = document.getElementById('addContent').value




    fetch('http://localhost:3000/api/blogs/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    })
        .then(res => res.json())
        .then(data => {


            if (!title || !content) {
                // alert('All fields required!!!')
                alert(data.message);
                return;

            }

            if (data) {
                addModalInit.hide();
                fetchAllBlogs();
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

function getBlogById(id) {
    return fetch(`http://localhost:3000/api/blogs/${id}`)
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
function removeBlog(id) {
    const confirmationDialog = confirm('Are you sure you want to delete');


    if (confirmationDialog) {
        fetch(`http://localhost:3000/api/blogs/delete/${id}`, {
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
                    alert("Successfully removed blog")
                    // window.location.reload()
                    fetchAllBlogs()
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


    getBlogById(id).then(blog => {

        result = blog.data;
        document.getElementById('updateTitle').value = result.title;
        document.getElementById('updateContent').value = result.content;
    })
        .catch(error => {
            console.error(`Error: ${error}`)
        })


    const modalFooter = document.getElementById('modal-footer-id');
    if (modalFooter) {
        modalFooter.innerHTML = `
            <button 
                type="button" 
                class="btn btn-primary" 
                id="updateBlogBtn" 
                data-bs-dismiss="modal"
                onclick="updateBlog(${id})"
            >Update</button>
        `;
    }
}
function updateBlog(id) {
    const modal = document.getElementById('updateModal');
    const modalInit = new bootstrap.Modal(modal);

    const updateTitle = document.getElementById('updateTitle').value;
    const updateContent = document.getElementById('updateContent').value;

    const fieldToBeUpdated = {};


    if (updateTitle) {
        fieldToBeUpdated.title = updateTitle;
    }

    if (updateContent) {
        fieldToBeUpdated.content = updateContent;
    }

    if (Object.keys(fieldToBeUpdated).length === 0) {
        alert('No fields to be updated');
        return;
    }

    fetch(`http://localhost:3000/api/blogs/update/${id}`, {
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
            fetchAllBlogs();
            modalInit.hide();
            // clearFormFields('update');
            // clearFormFields('update');
            clearAllInputs()


        } else {
            alert(data.message);
            fetchAllBlogs();
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
fetchAllBlogs();