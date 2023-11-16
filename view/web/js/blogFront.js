

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
    blogList.innerHTML = '';
    resut = data.data;

    resut.forEach(blog => {
        const dateCreatedAt = new Date(blog.createdAt);
        dateString = new Date(dateCreatedAt).toUTCString();
        dateCreatedAtString = dateString.split(' ').slice(0, 6).join(' ');

        const dateUpdatedAt = Date(blog.updatedAt);
        dateString = new Date(dateUpdatedAt).toUTCString();
        dateUpdatedAtString = dateString.split(' ').slice(0, 6).join(' ');

        console.log(blog)
        const tableRow = document.createElement('div');
        tableRow.setAttribute("class", "box");
        tableRow.innerHTML = `
        <div class="image">
                    <img src="images/blog-2.jpg" alt="">
                </div>
                <div class="content">
                    <div class="icons">
                        <a href="#"> <i class="fas fa-clock"></i> 1st november, 2021 </a>
                        <a href="#"> <i class="fas fa-user"></i> by admin </a>
                    </div>
                    <h3>${blog.title}</h3>
                    <p>${blog.content}.</p>
                    <a href="#" class="btn">read more</a>
                </div>
        `;

        blogList.append(tableRow)
    })
}
fetchAllBlogs();