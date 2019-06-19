const searchForm=document.querySelector('#search-form');
const movie= document.querySelector('#movies');
function apiSearch(event) {
       event.preventDefault();// отменяет перезагрузку страницы в 'submit'
       const searchText=document.querySelector('.form-control').value, //qS обращается к селектору 
       server='https://api.themoviedb.org/3/search/multi?api_key=aa2e67937636f3bb15888cf76a725843&language=ru&query=' + searchText;
       requestApi ('GET', server);
    }

searchForm.addEventListener('submit',apiSearch);

function requestApi(method, url){

    const request = new XMLHttpRequest()

    request.open(method, url);//при открытии
    request.send();//ожидание ответа от сервера

    request.addEventListener('readystatechange',() => {
         if (request.readyState!==4) return;

         if (request.status!== 200){
             console.log("error:"+ request.status);
             return;
         }

         const output= JSON.parse(request.responseText)// как сделать текст обьектом

         let inner= '';

         output.results.forEach(function(item, i, array){
             let nameItem= item.name || item.title;
             let timeItem= item.release_date|| item.first_air_date|| "информация отсутсвует" ;
             inner +=`<div class="col-12 col-md-4 col-xl-3">${nameItem}<br/>Дата выхода:<b>${timeItem}</b></div>`;
         });//forEach запускает функцию, принимает три элемента

         movie.innerHTML= inner;
        console.log(output);
    })
     
}
