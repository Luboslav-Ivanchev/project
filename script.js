
let allAHrefs=document.querySelectorAll('a');
let allHrefs=Array.from(allAHrefs);


const router={
    '/home':document.getElementById('container'),
    '/create': document.getElementById('furniture-create'),
    '/system':document.getElementById('furniture-system'),
    '/details':document.getElementById('furniture-details'),
    '/page':document.getElementById('furniture-page'),
    '/notification':document.getElementById('notifications'),
};


let furnitureAHref0=allHrefs[0];

furnitureAHref0.addEventListener('click',function (e) {
e.preventDefault();
history.pushState('','',e.target.href);


     router["/create"].style.display='block'
    router["/system"].style.display='block';
    router["/page"].style.display='block';
    router["/details"].style.display='block';
    router["/notification"].style.display='block';
});

let furnitureAHref1=allHrefs[1];
furnitureAHref1.addEventListener('click',function (e) {
    e.preventDefault();
    history.pushState({},'',e.target.href);

    router["/system"].style.display='none';
    router["/page"].style.display='none';
    router["/details"].style.display='none';
    router["/notification"].style.display='none';
    router["/create"].style.display='block';

});

let furnitureAHref2=allHrefs[2];
furnitureAHref2.addEventListener('click',function (e) {
    e.preventDefault();
    history.pushState('','',e.target.href);

    router["/create"].style.display='none'
    router["/page"].style.display='none';
    router["/details"].style.display='none';
    router["/notification"].style.display='none';
    router["/system"].style.display='block';

});




let furnitureAHref3=allHrefs[3];
furnitureAHref3.addEventListener('click',function (event) {
    event.preventDefault();
    history.pushState('','',event.target.href);

    router["/create"].style.display='none'
    router["/page"].style.display='block';
    router["/details"].style.display='none';
    router["/notification"].style.display='none';
    router["/system"].style.display='none';
});

let furnitureAHref4=allHrefs[4];
furnitureAHref4.addEventListener('click',function (event) {
    event.preventDefault();
    history.pushState('','',event.target.href);

    router["/create"].style.display='none'
    router["/page"].style.display='';
    router["/details"].style.display='block';
    router["/notification"].style.display='none';
    router["/system"].style.display='block';

});

let furnitureAHref5=allHrefs[5];
furnitureAHref5.addEventListener('click',function (event) {
    event.preventDefault();
    history.pushState('','',event.target.href);


});

let form=document.getElementById('creating-form');
let allInputs=document.querySelectorAll('input');
let inputs=Array.from(allInputs);

 let make=inputs[0];
 let model=inputs[1];
 let year=inputs[2];
 let description=inputs[3];
 let price=inputs[4];
 let image=inputs[5];
 let material=inputs[6];
 let buttonCreate=inputs[7];

 buttonCreate.addEventListener('click',function (e) {
     e.preventDefault();




     let furnitureDetails=document.getElementById('furniture-details');
     furnitureDetails.style.display='none';


     fetch(`https://furniture-ae975-default-rtdb.firebaseio.com/Furniture.json`,
         {method:'PATCH',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify({make:make.value,
              model:model.value,
              year:year.value,
              description:description.value,
              price:price.value,
              image:`${image.value}`,
              material:material.value,})})
         .then(res=>res.json())
         .then(data=>{

             let keys=Object.keys(data)

             let cardBlock=document.getElementsByClassName('card-blockquote')[0];
             console.log(cardBlock);

            cardBlock.innerHTML=`<div data-key="" <p>${data.model}</p>
              <img src="${data.image}" style="width: 120px" height="130px"> 
               <footer style="color: #7CB3E9">${data.description}</footer> 
                <button class="btn-info" data-key="">Details</button>
                 <button class="btn-info" data-key="">Delete</button></div>`;

            let divMain=document.getElementsByClassName('card-body')[0];
             divMain.append(cardBlock);
         });




 });

let btnInfo=document.getElementsByClassName('btn-info');

let buttonsInfo=Array.from(btnInfo);

let btnDetails0=buttonsInfo[0];
let btnDetails1=buttonsInfo[1];


let divClassCard=document.getElementsByClassName('card-blockquote');


 fetch(`https://furniture-ae975-default-rtdb.firebaseio.com/Furniture.json`)
.then(res=>res.json())
.then(data=>{

     let keys=Object.keys(data);


     divClassCard[0].innerHTML=keys.map(element=>` <div data-key="${element}"><p>${data[element].name}</p>  <img src="${data[element].image}" width="120" height="130"> 
           <footer style="color:beige">${data[element].description}</footer> <button class="btn btn-info" data-key="${element}">Details</button>
             <button class="btn btn-info" data-key="${element}">Delete</button></div>`).join('');

     let allButtons=document.querySelectorAll('button')

     let buttonsArrayAll=Array.from(allButtons);
     buttonsArrayAll.shift();

    for(let index in buttonsArrayAll){

        if(index%2===0){

            buttonsArrayAll[index].addEventListener('click',function () {

                let id=buttonsArrayAll[index].getAttribute('data-key');

                 let promiseDetails=fetch(`https://furniture-ae975-default-rtdb.firebaseio.com/Furniture/${id}/.json`)

                promiseDetails
                    .then(res=>res.json())
                    .then(data2=>{

                         let keysObject=Object.keys(data2);

                        let divClassImage=document.getElementsByClassName('card-body')[1];
                        let divClassColPTags=document.getElementsByClassName('col-md-4')[4];


                        divClassImage.innerHTML=`<p>${data2.name}:</p> <img src="${data2.image}" style="width: 110px" height="120px">`;

                        divClassColPTags.innerHTML=`<p>Make:${data2.make}</p> <p>Model:${data2.model}</p>
                 <p>Year:${data2.year}</p> <p>Description:${data2.description}</p> <p>Price:${data2.price}</p>
                  <p>Material:${data2.material}</p> <button class="btn-info">Add to profile page</button>`;

                        let buttons=document.querySelectorAll('button');
                        let buttonAdd=Array.from(buttons);

                        buttonAdd[7].addEventListener('click',function () {
                           let blockquote=document.getElementsByClassName('card-blockquote')[1];


                           blockquote.innerHTML=`<p>Name:${data2.name}</p> <footer style="color: #7CB3E9">Description:${data2.description}</footer>
                            <div class="pull-right"> <button class="btn-info">Details</button> <button class="btn-danger">Delete</button></div>`;
                          divClassImage.innerHTML=`<p style="font-size: 30px">Added in page profile</p> <img src="">`
                           divClassColPTags.innerHTML=`<p></p> <p></p><p></p> <p></p> <p></p><p></p>`;

                          let buttons=document.querySelectorAll('button')
                            let btn=Array.from(buttons);
                            console.log(btn)
                          let details=btn[7];
                            let deleteBtn=btn[8];


                            details.addEventListener('click',function () {

                                divClassImage.innerHTML=`<p>${data2.name}:</p> <img src="${data2.image}" style="width: 110px" height="120px">`;

                                divClassColPTags.innerHTML=`<p>Make:${data2.make}</p> <p>Model:${data2.model}</p>
                 <p>Year:${data2.year}</p> <p>Description:${data2.description}</p> <p>Price:${data2.price}</p>
                  <p>Material:${data2.material}</p> <button class="btn-info">Add to profile page</button>`;

                                blockquote.innerHTML=`<p>Add Description for your Furniture</p> <footer style="color: white">Materials,information</footer>
                            <div> </div>`;


                                });

                            deleteBtn.addEventListener('click',function () {

                                deleteBtn.setAttribute('data-key',id);

                                console.log(id);

                                divClassImage.innerHTML=`<p>Deleted from system</p>`;

                                divClassColPTags.innerHTML=`<p></p> <p></p>
                      <p></p> <p></p> <p></p>
                  <p></p>`;

                                blockquote.innerHTML=`<p>Deleted from profile page</p> <footer</footer>
                            <div> </div>`;



                               fetch(`https://furniture-ae975-default-rtdb.firebaseio.com/Furniture/${id}/.json`,{
                                   method:'DELETE',
                                   headers:{'Content-type':'application/json;charset=UTF-8'},
                                   body:JSON.stringify({})})
                                   .then(res=>res.json())
                                   .then(data=>{

                                       let obj={method: 'DELETE',
                                           headers: {
                                               'Content-type': 'application/json; charset=UTF-8'},
                                           body: JSON.stringify({})}});

                                   });
                        });
                    });

            });




        }else if(index%2!==0){

         buttonsArrayAll[index].addEventListener('click',function () {

             let id=buttonsArrayAll[index].getAttribute('data-key');
             let blockquote=document.getElementsByClassName('card-blockquote')[0];
             let divArray=Array.from(blockquote.children);

              divArray.forEach(div=>{

                  if(div.getAttribute('data-key')===id){
                      div.remove();
                  }

              })

         });

        }

    }

});

