const socket = io();

let input = document.getElementById('mensaje');
let user = document.getElementById('user');
input.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        if(e.target.value){
            socket.emit('message',{user:user.value,message:e.target.value});
        }
        else {
            console.log('No se envio mensaje')
        }
    }
})
socket.on('welcome',data=>{
    // alert(data)
})

socket.on('messagelog',data=>{
    let p = document.getElementById('log')
    let messages = data.map(message=>{
        return `<div><span>${message.user} dice: ${message.message}</span></div>`
    }).join('');
    p.innerHTML=messages;
})

document.addEventListener('submit',sendForm);

function sendForm(e){
    e.preventDefault();
    let newTitle= document.getElementById('title').value;
    let newPrice= document.getElementById('price').value;
    let newThumbnail= document.getElementById('thumbnail').value;
    let newForm ={
        title:newTitle,
        price:newPrice,
        thumbnail:newThumbnail
    } 
    fetch('http://localhost:8080/api/products',{
        method:'POST',      
        headers: { 'Content-Type': 'application/json' },        
        body:JSON.stringify(newForm)       
    }).then(response=>{
        return response.json();
    }).then(json=>{
        Swal.fire({
            title:'Carga de producto realizada',
            text:json.message,
            icon:'success',
            timer:2000,
        }).then(result=>{
            location.href='/'
        })
    })
}