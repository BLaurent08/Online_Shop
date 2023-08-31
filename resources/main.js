////////////// Global Variables & Functions ///////////////
let users = [];
if (localStorage.getItem("users") != null){
    users = JSON.parse(localStorage.getItem("users"));
}
else {
    users[0]={
        name:"admin",
        email:"admin@mail.com",
        password:"admin",
        cart:[],
        status:"offline",
    };
    localStorage.setItem("users", JSON.stringify(users));
}
var user = {
    name: "",
    email: "",
    mobile: "",
    password: "", 
    cart: [],
    status: "offline",
};
let designList = [];
var design = {
    name: "",
    price: "",
    description: "",
    image: "",
};
if (localStorage.getItem("designList") != null){
    designList = JSON.parse(localStorage.getItem("designList"));
}
else {
    designList[0]={
        name:"Master Bedroom Style",
        price:"700.00",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies tincidunt, nunc elit luctus nunc, eget ultricies nunc nunc vel nunc. Sed auctor, nisl eget ultricies tincidunt, nunc elit luctus nunc, eget ultricies nunc nunc vel nunc.",
        image:"resources/imgs/IMG_7650.jpeg",
    }
    designList[1]={
        name:"Bedroom Style 1",
        price:"500.00",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies tincidunt, nunc elit luctus nunc, eget ultricies nunc nunc vel nunc. Sed auctor, nisl eget ultricies tincidunt, nunc elit luctus nunc, eget ultricies nunc nunc vel nunc.",
        image:"resources/imgs/IMG_7648.jpeg",
    }
    designList[2]={
        name:"Bedroom Style 2",
        price:"300.00",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies tincidunt, nunc elit luctus nunc, eget ultricies nunc nunc vel nunc. Sed auctor, nisl eget ultricies tincidunt, nunc elit luctus nunc, eget ultricies nunc nunc vel nunc.",
        image:"resources/imgs/IMG_1693.jpeg",
    }
    localStorage.setItem("designList", JSON.stringify(designList));
};
let cart = [];
if (localStorage.getItem("cart") != null){
    cart = JSON.parse(localStorage.getItem("cart"));
}
let orders = [];
if (localStorage.getItem("orders") != null){
    orders = JSON.parse(localStorage.getItem("orders"));
}
let posts = [];
if (localStorage.getItem("posts") != null){
    posts = JSON.parse(localStorage.getItem("posts"));
}
else {
    posts[0] = {
        title: "Welcome to our blog",
        content: "Feel free to post your comments or thoughts!",
        date: "3/30/2023",
        user: "Charlene"
    }
    localStorage.setItem("posts", JSON.stringify(posts));
}
let comments = [];
if (localStorage.getItem("comments") != null){
    comments = JSON.parse(localStorage.getItem("comments"));
}

function clearStorage(){
    localStorage.clear();
    location.reload();
}

function logoutUser(){
    let activeUser = users.filter(user => user.status == "online");
    localStorage.removeItem("cart");
    activeUser[0].status = "offline";
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
}

function loginUser(){
    let users = JSON.parse(localStorage.getItem("users"));
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let activeUser = users.filter(user => user.email == email && user.password == password);
    if (activeUser.length == 1){
        activeUser[0].status = "online";
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart != null){
            console.log("cart is not null");
            activeUser[0].cart = cart;
            localStorage.removeItem("cart");
        }
        localStorage.setItem("users", JSON.stringify(users));
        swal("Success", "User Logged In Successfully", "success")
        .then(() => {
            document.getElementById("loginEmail").value = "";
            document.getElementById("loginPassword").value = "";
            $('#loginModal').modal('hide');
            displayUser();
        });
    }
    else{
        swal("Error", "Invalid Email or Password", "error");
    }
}

function registerUser(){
    let users = JSON.parse(localStorage.getItem("users"));
    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let mobile = document.getElementById("registerPhone").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if (password != confirmPassword){
        swal("Error", "Password and Confirmation should be same", "error");
        return;
    }
    let activeUser = users.filter(user => user.email == email);
    if (activeUser.length == 1){
        swal("Error", "Email already exists", "error");
        return;
    }
    user.name = name;
    user.email = email;
    user.mobile = mobile;
    user.password = password;
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    // clear form
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPhone").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("confirmPassword").value = "";
    swal("Success", "User Registered Successfully", "success")
    .then(() => {
        $('#registrationModal').modal('hide');
        $('#loginModal').modal('show');
    });
}

function displayUser(){
    let displayName = document.getElementById("userName");
    let users = JSON.parse(localStorage.getItem("users"));
    let activeUser = users.filter(user => user.status == "online");
    let cartCount = document.getElementById("cartCount");
    let cartNum = 0
    displayName.innerHTML = "";
    cartCount.innerHTML = "";
    if (activeUser.length == 1){
        displayName.innerHTML = activeUser[0].name;
        if (activeUser[0].name =="admin"){
            document.getElementById("adminControl").style.display = "block";
        }
        else{
            document.getElementById("adminControl").style.display = "none";
        }
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logout").style.display = "block";
        if (activeUser[0].cart.length == 0){
            cartCount.innerHTML = "0";
            return;
        }
        for (let i = 0; i < activeUser[0].cart.length; i++){
            cartNum += activeUser[0].cart[i].quantity;
        }
        cartCount.innerHTML = cartNum;
        return;
    }
    else{
        displayName.innerHTML = "Guest";
        document.getElementById("loginButton").style.display = "block";
        document.getElementById("logout").style.display = "none";
        document.getElementById("adminControl").style.display = "none";
        if (cart.length == 0){
            cartCount.innerHTML = "0";
            return;
        }
        for (let i = 0; i < cart.length; i++){
            cartNum += cart[i].quantity;
        }
        cartCount.innerHTML = cartNum;
        return;
    }
}

function displaySamples(){
    let sampleDisplay = document.getElementById("sampleDisplay");
    let designs = JSON.parse(localStorage.getItem("designList"));
    sampleDisplay.innerHTML = "";
    for (let i = 0; i <= 2; i++){
        sampleDisplay.innerHTML += `
        <a class="col-md-3 flex-fill mx-0 p-3 border border-secondary rounded-5 text-decoration-none popper" role="button" onclick="showDesign(${i})">
            <img src="${designs[i].image}" alt="Style Picture ${i+1}" class="img-thumbnail mx-0 p-0 rounded-5 mb-2" style="max-height:15rem">
            <p class="mx-0 p-0 h4">${designs[i].name}</p>
            <p class="mx-0 p-0 h6">$${designs[i].price}</p>
        </a>
        `;
    }
}

var file;
function displayImg () {
    file = document.getElementById('src').files[0];
    var imageType = /image.*/;
    if (file.type.match(imageType)) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var image = document.getElementById('target');
            image.src = reader.result;
            design.image = reader.result;
        };
    }
    else {
        swal("File not supported!", "Please select an image file", "error");
    }
}

function addDesign(){
    let designs = JSON.parse(localStorage.getItem("designList"));
    design.name = document.getElementById("designName").value;
    design.price = "$" + document.getElementById("designPrice").value;
    design.description = document.getElementById("designDesc").value;
    designs.push(design);
    localStorage.setItem("designList", JSON.stringify(designs));
    swal("Success", "Design Added Successfully", "success")
    .then(() => {
        location.reload();
    });
    document.getElementById("designName").value = "";
    document.getElementById("designPrice").value = "";
    document.getElementById("designDesc").value = "";   
    document.getElementById("src").value = "";
    document.getElementById("target").src = "";
}

function displayDesigns(){
    console.log("displaying designs");
    let designs = JSON.parse(localStorage.getItem("designList"));
    let designDisplay = document.getElementById("shopping");
    designDisplay.innerHTML = "";
    for (let i = 0; i < designs.length; i++){
        designDisplay.innerHTML += `
        <div class="col-md-3 mx-0 p-3 border border-secondary rounded-5 popper text-center">
            <a class="text-decoration-none" role="button" onclick="showDesign(${i})">
                <img src="${designs[i].image}" alt="Style Picture ${i+1}" class="img-thumbnail mx-0 p-0 rounded-5 mb-2" style="height:15rem">
                <p class="mx-0 p-0 h4">${designs[i].name}</p>
                <p class="mx-0 p-0 h6">$${designs[i].price}</p>
            </a>
            <div class="d-flex justify-content-between align-items-center" id="usageBtns">
                <button class="btn btn-outline-success cartBtn popper-lite ms-1 me-1" onclick="addToCart(${i})">Add to Cart</button>
                <button class="btn btn-outline-info viewBtn popper-lite ms-1 me-1" onclick="showDesign(${i})">View</button>
                <button class="btn btn-outline-danger adminBtn popper-lite ms-1 me-1" onclick="deleteDesign(${i})">Delete</button>
            </div>
        </div>
        `;
    }
}

function designsPage(use){
    console.log(use);
    localStorage.setItem("use", JSON.stringify(""));
    localStorage.setItem("use", JSON.stringify(use));
    window.location.href = "designs.html";
}

function displayUse(){
    console.log("displayUse");
    let users = JSON.parse(localStorage.getItem("users"));
    let activeUser = users.filter(user => user.status == "online");
    let designs = JSON.parse(localStorage.getItem("designList"));
    let use = JSON.parse(localStorage.getItem("use"));
    let adminBtn = document.getElementsByClassName("adminBtn");
    let cartBtn = document.getElementsByClassName("cartBtn");
    let viewBtn = document.getElementsByClassName("viewBtn");
    let shopList = document.getElementById("shopList");
    let adding = document.getElementById("addDesigns");
    let shopLabel = document.getElementById("shoppingLabel");
    let shopDisc = document.getElementById("shoppingDisclaimer");
    let listLabel = document.getElementById("listLabel");
    displayDesigns();
    if (activeUser[0]==undefined && use != "shop"){
        window.location.href = "index.html";
    }
    else if (use == "add" && activeUser[0].name == "admin"){
        adding.classList.remove("d-none");
        shopList.classList.add("d-none");
        console.log("add");
    }
    else if (use == "shop"){
        adding.classList.add("d-none");
        shopList.classList.remove("d-none");
        shopLabel.classList.remove("d-none");
        shopDisc.classList.remove("d-none");
        listLabel.classList.add("d-none");
        for (let i = 0; i < designs.length; i++){
            adminBtn[i].classList.add("d-none");
            cartBtn[i].classList.remove("d-none");
            viewBtn[i].classList.remove("d-none");
        }
        console.log("shop");
    }
    else if (use == "list" && activeUser[0].name == "admin"){
        adding.classList.add("d-none");
        shopList.classList.remove("d-none");
        shopLabel.classList.add("d-none");
        shopDisc.classList.add("d-none");
        listLabel.classList.remove("d-none");
        for (let i = 0; i < designs.length; i++){
            adminBtn[i].classList.remove("d-none");
            cartBtn[i].classList.add("d-none");
            viewBtn[i].classList.remove("d-none");
        }
        console.log("list");  
    }
}

function addToCart(i){
    let users = JSON.parse(localStorage.getItem("users"));
    let index = i;
    let activeUser = users.filter(user => user.status == "online");
    let designs = JSON.parse(localStorage.getItem("designList"));
    if (index == undefined){
        index = JSON.parse(localStorage.getItem("index"));
    }
    let cartItem = {
        name: designs[index].name,
        price: designs[index].price,
        image: designs[index].image,
    };
    if (window.location.href.includes("specification.html")){
        cartItem.quantity = document.getElementById("quantity").value*1;

    }
    else{
        cartItem.quantity = 1;
    }
    if (activeUser[0]==undefined){
        specifyCart("guest", cartItem);
        swal("Success", "Item added to cart. If you log in, the cart will be saved into your account", "success")
        .then(() => {
            displayUser();
        });
    }
    else{
        specifyCart(activeUser[0].name, cartItem);
        swal("Success", "Item added to cart", "success")
        .then(() => {
            displayUser();
        });
    }
}

function specifyCart(user,cartItem){
    let account = user;
    let item = cartItem;
    console.log(account);
    console.log(item);
    if (user == "guest" && cart == undefined){
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
    }
    else if (user == "guest" && cart != undefined){
        for (let i = 0; i < cart.length; i++){
            if (cart[i].name == item.name){
                cart[i].quantity += item.quantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                return;
            }
        }
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
    }
    else{
        let users = JSON.parse(localStorage.getItem("users"));
        let activeUser = users.filter(user => user.name == account);
        let cart = activeUser[0].cart;
        if (cart == undefined){
            cart = [];
            cart.push(item);
            activeUser[0].cart = cart;
            localStorage.setItem("users", JSON.stringify(users));
            return;
        }
        else{
            for (let i = 0; i < cart.length; i++){
                if (cart[i].name == item.name){
                    cart[i].quantity += item.quantity;
                    localStorage.setItem("users", JSON.stringify(users));
                    return;
                }
            }
            cart.push(item);
            localStorage.setItem("users", JSON.stringify(users));
            return;
        }
    }
}

function deleteDesign(index){
    let designs = JSON.parse(localStorage.getItem("designList"));
    designs.splice(index, 1);
    localStorage.setItem("designList", JSON.stringify(designs));
    displayDesigns();
}

function showDesign(index){
    localStorage.setItem("index", JSON.stringify(""));
    localStorage.setItem("index", JSON.stringify(index));
    window.location.href = "specification.html";
}

function displayPage(){
    let index = JSON.parse(localStorage.getItem("index"));
    let i = index;
    let designList = JSON.parse(localStorage.getItem("designList"));
    let viewed = designList[i];
    if (viewed == undefined){
        window.location.href = "designs.html";
    }
    document.getElementById("imgDisplay").src = viewed.image;
    document.getElementById("designName").innerHTML =  viewed.name;
    document.getElementById("designPrice").innerHTML = viewed.price;
    document.getElementById("designDesc").innerHTML = viewed.description;
    calculatePrice();
}

function calculatePrice(){
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("totalPrice");
    let index = JSON.parse(localStorage.getItem("index"));
    let i = index;
    let designList = JSON.parse(localStorage.getItem("designList"));
    if (quantity == ""){
        quantity = 1;
    }
    let priceNum = Number(designList[i].price);
    let total = priceNum * quantity;
    price.innerHTML = total;
}

function displayCart(){
    let users = JSON.parse(localStorage.getItem("users"));
    if (users.filter(user => user.status == "online").length == 1){
        var activeUser = users.filter(user => user.status == "online");
        if (activeUser[0].cart == undefined){
            var cart = [];
        }
        else{
            var cart = activeUser[0].cart;
        }
    }
    else{
        console.log("guest cart");
        var activeUser = "guest";
        if (cart == 0){
            var cart = [];
        }
        else{
            var cart = JSON.parse(localStorage.getItem("cart"));
        }
        console.log(cart);
    }
    if (cart.length == 0){
        document.getElementById("cartTable").classList.add("d-none");
        document.getElementById("emptyCart").classList.remove("d-none");
        document.getElementById("tableHeader").classList.add("d-none");
    }
    else{
        document.getElementById("cartTable").classList.remove("d-none");
        document.getElementById("emptyCart").classList.add("d-none");
        document.getElementById("tableHeader").classList.remove("d-none");
        let table = document.getElementById("cartTable");
        let total = 0;
        table.innerHTML = "";
        for (let i = 0; i < cart.length; i++){
            var row = `
            <tr class="popper-lite">
                <td role="button" onclick="showDesign(${i})"><img class="img-thumbnail mx-0 p-0" src="${cart[i].image}" id="ratiod">${cart[i].name}</td>
                <td role="button" onclick="showDesign(${i})">$${cart[i].price}</td>
                <td role="button" onclick="showDesign(${i})">${cart[i].quantity}</td>
                <td role="button" onclick="showDesign(${i})">$${cart[i].price*cart[i].quantity}</td>
                <td><button class="btn btn-danger" onclick="deleteFromCart(${i})">Delete</button></td>
            </tr>`
            table.innerHTML += row;
            total += cart[i].price*cart[i].quantity;
        }
        table.innerHTML += `
        <tFoot>
            <tr>
                <td colspan="2"><button class="btn btn-success" onclick="checkout()">Checkout</button></td>
                <td colspan="3" class="h4">Total: $${total}</td>
            </tr>
        </tFoot>`;
    }
}

function deleteFromCart(index){
    let users = JSON.parse(localStorage.getItem("users"));
    console.log(index);
    if (users.filter(user => user.status == "online").length == 1){
        let activeUser = users.filter(user => user.status == "online");
        var cart = activeUser[0].cart;
    }
    else{
        var cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.splice(index, 1);
    if (users.filter(user => user.status == "online").length == 1){
        let activeUser = users.filter(user => user.status == "online");
        activeUser[0].cart = cart;
        localStorage.setItem("users", JSON.stringify(users));
    }
    else{
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    displayCart();
    displayUser();
}

function checkout(){
    let users = JSON.parse(localStorage.getItem("users"));
    if (users.filter(user => user.status == "online").length == 1){
        var activeUserInfo = users.filter(user => user.status == "online");
        let activeUser = activeUserInfo[0].name;
        var cart = activeUser[0].cart;
    }
    else{
        var activeUser = "guest";
        var cart = JSON.parse(localStorage.getItem("cart"));
    }
    let order = {
        user: activeUser,
        cart: cart,
        date: new Date()
    }
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    cart = [];
    if (activeUser == "guest"){
        localStorage.setItem("cart", JSON.stringify(cart));
        swal("Thank you for your purchase!", "You will be redirected to the home page.", "success")
        .then(() => {
            window.location.href = "index.html";
        });
    }
    else{
        activeUser[0].cart = cart;
        localStorage.setItem("users", JSON.stringify(users));
        swal("Thank you for your purchase!", "You will be redirected to the home page.", "success")
        .then(() => {
            window.location.href = "index.html";
        });
    }
    displayCart();
    displayUser();
}

function addPost(){
    let users = JSON.parse(localStorage.getItem("users"));
    let activeUser = users.filter(user => user.status == "online");
    if (activeUser[0]==undefined){
        swal("You must be logged in to create a forum post!", "You will be redirected to the login page.", "error")
        .then(() => {
            $("#loginModal").modal("show");
            return;
        });
    }
    let title = document.getElementById("postTitle").value;
    let content = document.getElementById("postContent").value;
    let date = (new Date().getMonth()+1) + "/" + new Date().getDate() + "/" + new Date().getFullYear();
    let post = {
        title: title,
        content: content,
        date: date,
        user: activeUser[0].name
    }
    forumPosts.push(post);
    localStorage.setItem("forumPosts", JSON.stringify(forumPosts));
    swal("Your post has been created!", "", "success")
    .then(() => {
        window.location.href = "blog.html";
    });
    displayPosts();
}

function displayPosts(){
    let users = JSON.parse(localStorage.getItem("users"));
    let posts = JSON.parse(localStorage.getItem("posts"));
    let forum = document.getElementById("forumPosts");
    let activeUser = users.filter(user => user.status == "online");
    if (activeUser.length == 1){
        document.getElementById("postButton").classList.remove("d-none");
    }
    else{
        document.getElementById("postButton").classList.add("d-none");
    }
    if (posts == null){
        forum.innerHTML = `
        <div class="col-3 mx-0 p-3 bg-danger rounded-5 text-center">
            <p class="mx-0 p-0 h4">No posts yet!</p>
        </div>`
        return;
    }
    forum.innerHTML = "";
    for (let i = 0; i < posts.length; i++){
        let div = `
        <div class="col-sm mx-0 p-3 border border-secondary rounded-5 popper text-center">
            <button class="btn btn-close mb-2 d-none adminDelete" onclick="deletePost(${i})"></button>
            <p class="mx-0 p-0 h4">${posts[i].title}</p>
            <p class="mx-0 p-0 h6">${posts[i].date}</p>
            <p class="mx-0 p-0 h6">${posts[i].user}</p>
            <p class="mx-0 p-0">${posts[i].content}</p>
        </div>`
        forum.innerHTML += div;
        if (i % 3 == 2){
            forum.innerHTML += `<div class="w-100 mx-0 p-0"></div>`
        }
    }
    if (activeUser[0].name == "admin"){
        document.querySelectorAll(".adminDelete").forEach(button => {
            button.classList.remove("d-none");
        });
    }
}

function deletePost(index){
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
}

function submitComment(){
    let users = JSON.parse(localStorage.getItem("users"));
    let activeUser = users.filter(user => user.status == "online");
    if (users.filter(user => user.status == "online").length == 0){
        swal("You must be logged in to send us a message!", "", "error")
        .then(() => {
            $("#loginModal").modal("show");
            return;
        });
    }
    else{
        swal({
            title: "Send us a message!",
            text: "What would you like to say?",
            content: "input",
            button: {
                text: "Send",
                closeModal: false,
            },
        })
        .then(message => {
            if (!message) throw null;
            let comment = {
                name: activeUser[0].name,
                message: message,
            }
            comments.push(comment);
            localStorage.setItem("comments", JSON.stringify(comments));
            swal("Your message has been sent!", "", "success");
        });
    }
}