const form = document.querySelector('.myForm')
const titleInput = document.querySelector('.title')
const textInput = document.querySelector('.text')
const btn = document.querySelector('.btn')
const message = document.querySelector('.message')


const createPost = (title, text) => {
    const postElement = document.createElement('div');

    const postTitle = document.createElement('h2');
    postTitle.textContent = title;

    const postText = document.createElement('p');
    postText.textContent = text;

    postElement.appendChild(postTitle)
    postElement.appendChild(postText)
    return postElement
}

form.addEventListener('submit' , (evt) => {
    evt.preventDefault()

    const post = {
        title: titleInput.value.trim(),
        body: textInput.value.trim()
    }

    if (!post.title || !post.body) {
        const errorMessage = 'Заполните все поля'
        message.textContent = errorMessage;
        return
    }
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(post)
})
.then((response) => response.json())
.then((data) => {
    console.log(data)
    
    const newPost = createPost(data.title, data.body);
    message.textContent = ''
    message.appendChild(newPost);

    titleInput.value = '';
    textInput.value = '';
})
.catch((error) => {
    message.textContent = `Ошибка: ${error}`
})
})