const apiKey = '563492ad6f91700001000001f82300e4f1b94492afb620a37ffc344a';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const more = document.querySelector('.more-btn')
let searchValue;
let page = 1;
let link = null;
let currentSearch = null;


// События
searchInput.addEventListener('input',  e => {
    searchValue = e.target.value;
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    return searchPhotos(searchValue);
})

more.addEventListener('click', loadMore);



// Запрос к API
async function fetchAPI(url) {
    const fetchData = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: apiKey
        }
    });

    const data = await fetchData.json();
    return data;
}

// Вставляем полученные данные из API в HTML
function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
            <div class="gallery-info">           
                <p>${photo.photographer}</p>
                <a href="${photo.src.original}">Download</a>
            </div>
            <img src="${photo.src.portrait}" alt="gallery-photo">
        `;
        gallery.appendChild(galleryImg)
    });
}

// Выводим фото по умолчанию
 async function fetchPhotos() {
    link = 'https://api.pexels.com/v1/search?query=nature&per_page=15&page=1';
    const data = await fetchAPI(link);
    generatePictures(data);

}

// Выводим искомые фото
async function searchPhotos(query) {
    clear();
    link = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchAPI(link);
    generatePictures(data);
}

// Отчищаем результаты поиска
function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}


// Подгружаем доплнительные картинки
async function loadMore() {
    page++;
    if (currentSearch) {
        link = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    } else {
        link = `https://api.pexels.com/v1/search?query=nature&per_page=15&page=${page}`;
    }

    const data = await fetchAPI(link);
    generatePictures(data);
}

fetchPhotos().catch(error => console.log(error));



