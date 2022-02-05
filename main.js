const elFilmsList = document.querySelector
('.films__list');
const elFilmTemplate = document.querySelector('#film-template').content;
const elForm = document.querySelector('.form');
const elFormSelect = document.querySelector
('.form__select');
const elFilmSelectSort = document.querySelector('.film-select-sort');
const elFormBtn = document.querySelector('.form__btn')
const elDiv = document.querySelector('.bg');

elForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let select = elFormSelect.value;

    let newarray = [];

    films.forEach(film => {
        if(select === "All"){
            newarray.push(film);
        }
        if(film.genres.includes(select)){
            newarray.push(film);
        }
    })
    
    renderFilms(newarray, elFilmsList);
    
    let sortValue = elFilmSelectSort.value.trim();
    
    if (sortValue === 'a_z') {
        newarray.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
			} else if (a.title < b.title) {
                return -1;
			} else {
				return 0;
			}
		});
	} else if (sortValue === 'z_a') {
        newarray.sort((a, b) => {
            if (a.title < b.title) {
                return 1;
			} else if (a.title > b.title) {
                return -1;
			} else {
                return 0;
			}
		});
	} else if (sortValue === 'old_new') {
        newarray.sort((a, b) => {
            if (a.release_date > b.release_date) {
                return 1;
			} else if (a.release_date < b.release_date) {
                return -1;
			} else {
                return 0;
			}
		});
	} else if (sortValue === 'new_old') {
        newarray.sort((a, b) => {
            if (a.release_date < b.release_date) {
                return 1;
			} else if (a.release_date > b.release_date) {
                return -1;
			} else {
                return 0;
			}
		});
	}
    
    renderFilms(newarray, elFilmsList);
    
});

let genresArr = ['All', 'Action', 'Comedy', 'Fantasy', 'Adventure', 'Science Fiction', 'Thriller', 'Horror', 'Animation', 'Family', 'Documentary', 'Mystery', 'Drama', 'TV Movie', 'Music', 'Crime', 'History', 'Romance'];

function renderOption (genresArr, element) {
    genresArr.forEach(genresFilms => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value', genresFilms);
        newOption.textContent = genresFilms;
        elFormSelect.appendChild(newOption);
    })
}

renderOption(genresArr, elFormSelect)

// localStorage

let theme = window.localStorage.getItem("theme")

if(theme){
    elDiv.style.backgroundColor = theme
}else{
    elDiv.style.backgroundColor = "white"
}


function funcBtnGreen(){
    window.localStorage.setItem("theme", "darkcyan")
    window.location.reload()
}
function funcBtnRed(){
    window.localStorage.setItem("theme", "chocolate")
    window.location.reload()
}

// window.localStorage.clear()

// ===========================

function normalizeDate (dateFormat) {

    let date = new Date (dateFormat);
    let day = String(date.getDate()).padStart(2, 0);
    let month = String(date.getMonth() + 1).padStart(2, 0);
    let year = String(date.getFullYear()).padStart(2, 0);

    return (day + '.' + month + '.' + year);
}

let renderFilms = (array,element)=>{
    elFilmsList.innerHTML = null;

    array.forEach(film => {

        let filmsTemplate = elFilmTemplate.cloneNode(true);
        
        filmsTemplate.querySelector('.films__title').textContent = film.title;
        
        filmsTemplate.querySelector('.films__img').src = film.poster;
        
        filmsTemplate.querySelector('.films__overview').textContent = film.overview;
        
        filmsTemplate.querySelector(".films__time").textContent = normalizeDate(film.release_date);

        filmsTemplate.querySelector('.films__genre-text').textContent = film.genres;
        
        element.appendChild(filmsTemplate);
    });
};

renderFilms(films, elFilmsList)