const searchForm=document.querySelector('#search-form');
const movie= document.querySelector('#movies');
const urlPoster='https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
       event.preventDefault();// отменяет перезагрузку страницы в 'submit'
       const searchText=document.querySelector('.form-control').value; //qS обращается к селектору 
       const server='https://api.themoviedb.org/3/search/multi?api_key=aa2e67937636f3bb15888cf76a725843&language=ru&query=' + searchText;
       movie.innerHTML='Загрузка';

       fetch(server)
           .then(function(value){  
               console.log(value.status);            
                 if(value.status!==200){
                     return Promise.reject(value);
                 }          
               return value.json();
           })
           .then(function(output){
               console.log(output);
            let inner= '';
   
            output.results.forEach(function(item){
                let nameItem= item.name || item.title;
                let timeItem= item.release_date|| item.first_air_date|| "информация отсутвует" ;
                inner+= `
                <div class="col-12 col-md-4 col-xl-3">
                <img src="${urlPoster+item.poster_path}" alt="${nameItem}">
                <h5>${nameItem}</h5>
                <br/>Дата релиза:<b>${timeItem}</b>
                </div>
                `;
            });//forEach запускает функцию, принимает три элемента
   
            movie.innerHTML= inner;      
           })
           .catch(function(reason){
            movie.innerHTML='Оппа, где то ошибочка';
            console.log('error:'+ reason.status);
           });
        }
     

searchForm.addEventListener('submit',apiSearch);

