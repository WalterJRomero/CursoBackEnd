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
            timer:1500,
        }).then(result=>{
            location.href='/'
        })
    })
}