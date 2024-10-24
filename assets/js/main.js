const getCategories =async()=>{
    const {data}=await axios.get('https://dummyjson.com/products/category-list');
    return data; } 

    


    const displayCategories = async()=>{
     
        const loader = document.querySelector(".loader-container");
        loader.classList.add("active");
        try { 
    
        const categories=await getCategories();
        const result =categories.map((category)=>{
            return `
            <div class="category">
            <h2>${category}</h2>
            <a href='categoryDetails.html?category=${category}' >Details</a>
            </div>
            `
            }).join(' ');
        
    
document.querySelector('.categories .row').innerHTML=result;
        loader.classList.remove("active");
    }
    catch(error){
        document.querySelector('.categories .row').innerHTML="<p>error loading categories</p>";
       
    }
    finally{
        loader.classList.remove("active");  
    }

}



const getProducts = async(page)=>{ 
    const skip=(page-1)*30
    const {data}=await axios.get (`https://dummyjson.com/products?limit=30&skip=${skip}`);
return data;
 }


const displayProducts  = async(page=1)=>{
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try { 
    
    const data=await getProducts(page);
    const result =data.products.map((product)=>{
        return `
        <div class="product">
        <img src="${product.thumbnail}" alt="${product.description}" class="img1"/>
        <h3>${product.title}</h3>
        <span>${product.price}</span>
    
        </div>
        `
        }).join(' ');


document.querySelector('.products .row').innerHTML=result;
let paginationLink=``;
if (page==1){
    paginationLink+=` <li class="page-item"><button  class="page-link" disabled >&laquo;</button></li>`;
}
else {
    paginationLink+=` <li class="page-item"><button  onclick =displayProducts('${page-1}') class="page-link" >&laquo;</button></li>`;
}
for (let i =1 ;i <=(Math.ceil (data.total/30)) ; i++){
    paginationLink+= `<li class="page-item ${i==page?'active':'' }"><button  onclick =displayProducts('${i}') class="page-link" >${i}</button></li>`
}
if (page==(Math.ceil (data.total/30))){
paginationLink+=  `<li class="page-item"><button  disabled class="page-link" >&raquo;</button></li>`
}
else {
    paginationLink+=  `<li class="page-item"><button  onclick =displayProducts('${parseInt(page)+1}') class="page-link" >&raquo;</button></li>`   
}

document.querySelector(".pagination").innerHTML=paginationLink


modal ()

}
catch(error){
    document.querySelector('.products .row').innerHTML="<p>error loading categories</p>";
   
}
finally{
    loader.classList.remove("active");  
}
}


displayProducts ();
displayCategories();


const countDown =() => {
    const countdownDate = new Date("2025-03-02T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector("#days").innerHTML = days +" Day"
    document.querySelector("#hours").innerHTML = hours+" Hourd"
    document.querySelector("#minutes").innerHTML = minutes+" Minutes"
    document.querySelector("#seconds").innerHTML = seconds+" Seconds"

                         
}
setInterval( ()=>{
    countDown()},1000
)
function modal (){
const modal =document.querySelector(".my-modal");
const closebtn =document.querySelector(".close-btn");
const leftbtn =document.querySelector(".left-btn");
const rightbtn =document.querySelector(".right-btn");
const img2 = Array.from (document.querySelectorAll(".img1"));
let currentIndex=0;
img2.forEach(function(img){
img.addEventListener("click",function(e){
modal.classList.remove('d-none');
modal.querySelector("img").setAttribute("src",e.target.src);
const currentImg = e.target;
 currentIndex = img2.indexOf(currentImg);

});
});
//close 
closebtn.addEventListener("click",function(){
    modal.classList.add('d-none');
}
);

//right bt

rightbtn.addEventListener("click",function(){
    currentIndex ++; 
    if(currentIndex===img2.length){
        currentIndex=0;
    }
    const src =img2[currentIndex].src;
  
    modal.querySelector("img").setAttribute("src",src);
    
});

 //left btn
leftbtn.addEventListener("click",function(){
  
    currentIndex --; 
    if(currentIndex<0){
        currentIndex=img2.length-1;
    }
    const src =img2[currentIndex].src;
    modal.querySelector("img").setAttribute("src",src);
    

});



}