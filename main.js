let modol = document.getElementsByClassName("modol")[0];
let login = document.getElementById("name");
let parol = document.getElementById("parol");
let hel = document.getElementById("hello");



function nazad() {
    modol.style.display = "none";
    cleanData();

}

function qosh() {
    modol.style.display = "flex";
}

function kirish () {
    if (parseInt(parol.value) == 12345) {
        document.getElementsByClassName("addd")[0].style.display = "none";
        document.getElementsByClassName("login")[0].style.display = "none";
        hel.innerText = `Hush  Kelibsiz  ${login.value}  !!!`;
    }
    else alert("Parol noto'g'ri")
}












// @ts-nocheck
const postsList = document.querySelector('.posts__list');

const postIsm = document.querySelector('.new-post__ism');
const postFamiliya = document.querySelector('.new-post__Familiya');
const postschot = document.querySelector('.new-post__id');
const postBalans = document.querySelector('.new-post__Balans');
const postManzil = document.querySelector('.new-post__Manzil');
const postTel = document.querySelector('.Tel');


const addNewPost = document.querySelector('.new-post__add');





const state = {
   posts: [],
   newPost: {
      Ism: '',
      Familiya: '',
      Date: '',
      Manzil: '',
      Tel: '',
      schot: ''

   },
   editPost: {}
}

const cleanData = () => {
   state.newPost.Date = '';
   state.newPost.Familiya = '';
   state.newPost.Ism = '';
   state.newPost.Manzil = '';
   state.newPost.Tel = '';
   state.newPost.schot = '';

   postBalans.value = '';
   postFamiliya.value = '';
   postIsm.value = '';
   postManzil.value = '';
   postTel.value = '';
   postschot.value = '';

}

const editPost = (index) => {

   const editeblePost = state.posts[index];
   state.editPost = editeblePost;

   postBalans.value = state.editPost.Balans;
   postFamiliya.value = state.editPost.Familiya;
   postIsm.value = state.editPost.Ism;
   postManzil.value = state.editPost.Manzil;
   postTel.value = state.editPost.Tel;
   postschot.value = state.editPost.schot;
   qosh();
}

const deletePost = (index) => {
   const editeblePost = state.posts[index];

   removePostRequest(editeblePost.id);

   state.posts.splice(index, 1);

   fillPostsList(state.posts);
}



const createPost = (post, index) => `
<div class="flex">
   <div class="posts xd">
   <div>${index+1}</div>
   <div>${post.schot}</div>
   <div>${post.Ism + ' ' + post.Familiya}</div>
   <div>${post.Date}</div>
   <div>${post.Manzil}</div>
   <div>${post.Tel}</div>
   <div>${post.Balans}</div>
   </div>
   <div class="xd1">
   <div class="edit"><img src="./image/edit.png" alt="edit" onclick="editPost(${index})"></div>
   <div class="delete"><img src="./image/delete.jpg" alt="delete" onclick="deletePost(${index})"></div>
   </div>
   </div>
`



const fillPostsList = (posts) => {
    postsList.innerHTML = '';
   if (posts.length) {
      posts.forEach((post, index) => postsList.innerHTML += createPost(post, index));
   }
}



postIsm.addEventListener('change', (e) => {
    if (!!state.editPost.Ism) {
       state.editPost.Ism = e.target.value;
    }
 
    state.newPost.Ism = e.target.value;
 });
 
 postBalans.addEventListener('change', (e) => {
    if (!!state.editPost.Balans) {
       state.editPost.Balans = e.target.value;
    }
 
    state.newPost.Balans = e.target.value;
 });

 postFamiliya.addEventListener('change', (e) => {
    if (!!state.editPost.Familiya) {
       state.editPost.Familiya = e.target.value;
    }
 
    state.newPost.Familiya = e.target.value;
 });

 postManzil.addEventListener('change', (e) => {
    if (!!state.editPost.Manzil) {
       state.editPost.Manzil = e.target.value;
    }
 
    state.newPost.Manzil = e.target.value;
 });

 postTel.addEventListener('change', (e) => {
    if (!!state.editPost.Tel) {
       state.editPost.Tel = e.target.value;
    }
 
    state.newPost.Tel = e.target.value;

    const cf =  new Date()

    state.newPost.Date = cf.getDate()+ "/" + (parseInt(cf.getMonth()) + 1) + "/" + cf.getFullYear() + "<br>" + cf.getHours() + ":" + cf.getMinutes();

 });

 postschot.addEventListener('change', (e) => {
    if (!!state.editPost.schot) {
       state.editPost.schot = e.target.value;
    }
    state.newPost.schot = e.target.value;
    
 });
 
 addNewPost.addEventListener('click', async () => {

    if (!!state.editPost.Balans || !!state.editPost.Date || !!state.editPost.Familiya || !!state.editPost.Ism || !!state.editPost.Manzil || !!state.editPost.Tel) {
       await updatePostRequest();
    } else {
       await createPostRequest();
    }
    cleanData();
    fillPostsList(state.posts);
    nazad();
 })


 

async  function load() {
   await getPostsRequest();
   fillPostsList(state.posts);
}

function getPostsRequest() {
   return fetch('https://637095920399d1995d7fe796.mockapi.io/api/v1/Abanent', {
      method: 'GET',
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      }
   })
   .then((res) => res.json())
   .then((posts) => state.posts = state.posts.concat(posts))
}

function createPostRequest() {
   return fetch('https://637095920399d1995d7fe796.mockapi.io/api/v1/Abanent', {
      method: 'POST',
      body: JSON.stringify(state.newPost),
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      }
   })
   .then((res) => res.json())
   .then((post) => state.posts.push(post))
}

function updatePostRequest() {
   return fetch(`https://637095920399d1995d7fe796.mockapi.io/api/v1/Abanent/${state.editPost.id}`, {
      method: 'PUT',
      body: JSON.stringify(state.editPost),
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      }
   })
   .then((res) => res.json())
   .then((data) => data)
}





function  removePostRequest(id){


   return fetch(`https://637095920399d1995d7fe796.mockapi.io/api/v1/Abanent/${id}`, {
      method: 'DELETE',
   })
}




