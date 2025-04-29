// Selecionando os elementos
const generateBtn = document.getElementById('generate');
const passwordBtn = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const lengthInput = document.getElementById('length');
const copyBtn = document.getElementById('copy');
const removeBtn = document.getElementById('remove');


// Novos elementos

const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');
const item4 = document.getElementById('item4');

//  Definindo os grupos de caracteres possíveis 
const  upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=<>?/{}[]';

// Função para gerar a senha 

function generatePassword() {
   
let availablechars = ''; // Começar o input vazio 

// verificar os  checkboxes

 if(item1.checked) {
    availablechars += upperCaseLetters;
 }

 if(item2.checked) {
    availablechars += lowerCaseLetters;
 }

 if(item3.checked) {
    availablechars += numbers;
 }

 if(item4.checked) {
    availablechars += symbols;
 }

 // Se nenhum item foi marcado

 if(availablechars === '') {
    passwordBtn.value = "Selecione pelo menos uma opção!";
    return; // Sai da função, não gera senha
 }

 let password = '';
 const length = parseInt(lengthInput.value); // convertendo o valor do input para número

 for(let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availablechars.length);
    password += availablechars[randomIndex];
 }

 passwordBtn.value = password; // Mostrando a senha no input
 checkPasswordStrength(password);

}

function checkPasswordStrength(password) {
   const bar = document.getElementById('bar');
   const strengthText = document.getElementById('strengthText'); // Pegando a div de texto
   let strength = 0;

   if(password.length >= 8) {
     strength +=1
   }

   if(password.length >=12) {
    strength +=1
   }

    if(/[A-Z]/.test(password)) strength +=1 // Tem letra maiúscula
    if(/[0-9]/.test(password)) strength +=1 // Tem número 
    if(/[\W_]/.test(password)) strength +=1 // Tem símbolo

    switch (strength) {
        case 0:
        case 1:
        case 2:
            bar.style.width = "30%";
            bar.style.backgroundColor = "red";
            strengthText.textContent = "Senha fraca"; // Texto
            strengthText.style.color = "red";
            break;
        case 3:
        case 4:
            bar.style.width = "60%";
            bar.style.backgroundColor = "yellow";
            strengthText.textContent = "Senha média"; // Texto
            strengthText.style.color = "yellow";
            break;
        case 5:
            bar.style.width =  "100%";
            bar.style.backgroundColor = "green";
            strengthText.textContent = "Senha forte";
            strengthText.style.color = "green";
            break;

    }
}

function copyPassword() {
    passwordBtn.select();
    document.execCommand("copy");

    const alertBox = document.getElementById('alertBox');
    alertBox.classList.remove("hidden");
    alertBox.classList.add("show");

    setTimeout(() => {
        alertBox.classList.remove("show");
        alertBox.classList.add("hidden");
    },2000) // esconde depois de 2 segundos
}

function clearPassword() {
    passwordBtn.value = "";  // 1. Limpa o campo de senha

    const bar = document.getElementById('bar');
    bar.style.width = "0%";
    bar.style.backgroundColor = "#2c2c2c"; // Cor padrão

    // Limpar o texto 
    const textStrength = document.getElementById('strengthText');
    if(textStrength) {
        textStrength.textContent = "";
    }

   

}

// Evento para executar a função

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click',copyPassword);
removeBtn.addEventListener('click',clearPassword);

togglePassword.addEventListener('click', () => {

     // Verifica o tipo atual do input
    if(passwordBtn.type === 'password') {
        passwordBtn.type = 'text'  // Se for password, muda para texto
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i'; // Muda ícone
    } else {
        passwordBtn.type = 'password';  // Se for texto, volta para password
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>'; // volta o ícone
    }
})








