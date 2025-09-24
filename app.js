var amigos = []; // sencillo a propósito

function agregarAmigo(){
  var input = document.getElementById('nombre');
  var nombre = input.value.trim();

  if(!nombre){
    input.classList.add('invalid');
    setTimeout(function(){ input.classList.remove('invalid'); }, 500);
    alert('Por favor ingresa un nombre válido');
    return;
  }
  if(amigos.indexOf(nombre) !== -1){
    alert('Ese nombre ya está en la lista');
    input.value=''; input.focus(); return;
  }

  amigos.push(nombre);
  renderLista();
  input.value='';
  input.focus();
}

function renderLista(){
  var ul = document.getElementById('listaAmigos');
  ul.innerHTML='';

  for(var i=0; i<amigos.length; i++){
    var li = document.createElement('li');
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = amigos[i];
    var btn = document.createElement('button');
    btn.className = 'remove';
    btn.setAttribute('aria-label', 'Quitar ' + amigos[i]);
    btn.dataset.index = i;
    btn.textContent = '×';
    li.appendChild(tag);
    li.appendChild(btn);
    ul.appendChild(li);
  }
}

function sortearAmigo(){
  if(amigos.length === 0){
    alert('Agrega al menos un nombre antes de sortear');
    return;
  }
  var indice = Math.floor(Math.random() * amigos.length);
  var elegido = amigos[indice];
  var res = document.getElementById('resultado');
  res.classList.add('show');
  res.textContent = '🎉 ' + elegido + ' 🎉';
}

function limpiarLista(){
  if(amigos.length === 0) return;
  if(confirm('¿Vaciar lista?')){
    amigos = [];
    renderLista();
    var res = document.getElementById('resultado');
    res.classList.remove('show');
    res.textContent = '— aún no sorteado —';
  }
}

// Delegación para quitar chips
document.getElementById('listaAmigos').addEventListener('click', function(e){
  if(e.target && e.target.matches('button.remove')){
    var i = parseInt(e.target.dataset.index, 10);
    if(!isNaN(i)){
      amigos.splice(i, 1);
      renderLista();
    }
  }
});

document.getElementById('sortearBtn').addEventListener('click', sortearAmigo);
document.getElementById('limpiarBtn').addEventListener('click', limpiarLista);
document.getElementById('nombre').addEventListener('keydown', function(e){
  if(e.key === 'Enter'){ agregarAmigo(); }
});
