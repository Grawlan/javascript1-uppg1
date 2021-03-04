// variables

const form = document.querySelector('#inputForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#output');
const addbtn = document.querySelector('.addbtn'); 
const editbtn = document.querySelector('.editbtn');

const users = [];
const errors = [];

let userId;
let uIndex;

// defining class User

class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = Date.now().toString()
  }
}

const validate = (input, index = null) => {
  switch(input.type) {
    case 'text':
      validateNames(input);
      if(validateNames(input))
        return true
      else
        return false
    case 'email':
      validateEmail(input, index);
      if(validateEmail(input, index))
        return true
      else
        return false
  }
}
const validateNames = (input) => {
  if(input.value.trim() === '') {
    setError(input, 'Name cannot be empty');
    return false;
  } else if(input.value.trim().length < 2) {
    setError(input, 'Name must be atleast 2 characters long')
    return false;
  } else {
    setSuccess(input)
    return true;
  }
}
// checks email against regexp, empty, and also if it already exists in the users array
const validateEmail = (input, index) => {
  let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(input.value.trim() === '') {
    setError(input, 'Email address cannot be empty')
    return false;
  } else if (!regEx.test(input.value)) {
    setError(input, 'Email address is not valid')
    return false;
  } else if(users.indexOf(users.find((user) => user.email.toLowerCase() === email.value.toLowerCase())) === index) {
    return true;
  } else if(users.find((user) => user.email.toLowerCase() === email.value.toLowerCase())) {
    setError(input, 'Email already exists');
    return false;
  }
    else {
    setSuccess(input)
    return true;
  }
}
// define error and sucess functions

const setError = (input, message) => {
  const formGroup = input.parentElement;
  formGroup.classList.add('error');
  formGroup.classList.remove('valid');

  const error = formGroup.querySelector('small');
  error.innerText = message;
}

const setSuccess = input => {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
  formGroup.classList.add('valid');

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
    <div class="user d-flex col-6 align-items-center justify-content-between mt-3" id="${user.id}">
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
}


// function for editing a user
const editUser = (user) => {
  userId = user.parentNode.parentNode.id;
  uIndex = users.findIndex(x => x.id === userId);
  firstName.value = users[uIndex].firstName;
  lastName.value = users[uIndex].lastName;
  email.value = users[uIndex].email;
  firstName.focus();
  editbtn.classList.remove("no-see");
  addbtn.classList.add("no-see");

 

  
}
// eventlistener to submit the edited user if it is valid
editbtn.addEventListener('click', (e) => {
  e.preventDefault();
  for(let i = 0; i < 3; i++) {
    errors[i] = validate(form[i], uIndex)
  }
  if(errors.every(Boolean)) {
    users[uIndex].firstName = firstName.value;
    users[uIndex].lastName = lastName.value;
    users[uIndex].email = email.value;
    form.reset();
    editbtn.classList.add("no-see");
    addbtn.classList.remove("no-see");
    renderUsers();
    firstName.parentElement.classList.remove("valid", "error");
    lastName.parentElement.classList.remove("valid", "error");
    email.parentElement.classList.remove("valid", "error");
    
  }

})


// validating form before creating a user.
form.addEventListener('submit', e => {
  e.preventDefault();
  for(let i = 0; i < 3; i++) {
    errors[i] = validate(form[i])
  }
  if(errors.every(Boolean)) {
    createUser(firstName.value, lastName.value, email.value);
    firstName.parentElement.classList.remove("valid", "error");
    lastName.parentElement.classList.remove("valid", "error");
    email.parentElement.classList.remove("valid", "error");
  }

})
// eventlistener that calls delete or edit function if those classes are found when clicked on.
output.addEventListener('click', (e) => {
  if(e.target.classList.contains('delete')) {
  deleteUser(e.target);
  } else if(e.target.classList.contains('edit')) {
    editUser(e.target);
  }
})