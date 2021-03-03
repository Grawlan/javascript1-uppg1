// variables

const form = document.querySelector('#inputForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#output');
const addbtn = document.querySelector('.addbtn'); 
const editbtn = document.querySelector('.editbtn');

const users = [];

// defining class User

class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = Date.now().toString()
  }
}
// create a user and push it into the array users, reset the form after
const createUser = (firstName, lastName, email) => {
  const user = new User(firstName, lastName, email);

  users.push(user);
  renderUsers();
  form.reset();
    
}

const renderUsers = () => {
  output.innerHTML = '';
  users.forEach(user => {
    output.innerHTML += newUser(user);
  })
}
// setup the template for the output of the users
const newUser = (user) => {
  let template = `
    <div class="user" id="${user.id}">
      <div class="user-text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
      <div class="buttons">
        <a href="#" class="btn btn-primary edit">Edit</a>
        <a href="#" class="btn btn-primary delete">Delete</a>
      </div>
    </div>
  `
  return template
}
// function for deleting a user.
const deleteUser = (user) => {
  let userId = user.parentNode.parentNode.id;
  let uIndex = users.findIndex(x => x.id === userId);
  users.splice(uIndex, 1);
  user.parentElement.parentElement.remove();
  console.log(users);
  
}

let userId;
let uIndex;
// function for editing a user
const editUser = (user) => {
  userId = user.parentNode.parentNode.id;
  console.log("userid " + userId);
  uIndex = users.findIndex(x => x.id === userId);
  console.log("uindex utanför " + uIndex);
  firstName.value = users[uIndex].firstName;
  lastName.value = users[uIndex].lastName;
  email.value = users[uIndex].email;
  editbtn.classList.remove("no-see");
  addbtn.classList.add("no-see");

 

  
}

editbtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(firstName.value !== '' && lastName.value !== '' && email.value !== '') {
    console.log("uindex innanför " + uIndex);
    users[uIndex].firstName = firstName.value;
    users[uIndex].lastName = lastName.value;
    users[uIndex].email = email.value;
    form.reset();
    console.log(users);
    editbtn.classList.add("no-see");
    addbtn.classList.remove("no-see");
    renderUsers();
  }

})


// validating form before creating a user.
form.addEventListener('submit', e => {
  e.preventDefault();

  if(firstName.value !== '' && lastName.value !== '' && email.value !== '') {
    createUser(firstName.value, lastName.value, email.value);
  }

})
// eventlistener that calls delete or edit function if those classes are found when clicked on.
output.addEventListener('click', (e) => {
  console.log(e.target);
  if(e.target.classList.contains('delete')) {
  deleteUser(e.target);
  } else if(e.target.classList.contains('edit')) {
    editUser(e.target);
  }
})