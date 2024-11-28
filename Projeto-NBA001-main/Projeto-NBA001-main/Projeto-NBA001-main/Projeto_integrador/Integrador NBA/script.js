const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');
const comentarioText = document.getElementById('comentario-text');
const comentariosList = document.getElementById('comentarios-list');
const enviarComentarioBtn = document.getElementById('enviar-comentario');
const imagemPerfilInput = document.getElementById('imagem-perfil');
let imagemPerfilURL = '';  // Variável para armazenar a URL da imagem

// Função para abrir o modal
function openModal() {
    modal.style.display = 'flex';
}

// Função para fechar o modal
closeButton.onclick = function() {
    modal.style.display = 'none';
}

// Função para fechar o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Função para remover um comentário
function removerComentario(event) {
    const comentarioElemento = event.target.closest('.comentario');
    comentarioElemento.remove();
}

// Função para adicionar o comentário no footer
function adicionarComentarioNoFooter() {
    const comentario = comentarioText.value.trim();

    if (comentario) {
        // Cria um novo elemento de comentário
        const comentarioElemento = document.createElement('div');
        comentarioElemento.classList.add('comentario');
        
        // Cria a imagem de perfil
        const imgPerfil = document.createElement('img');
        imgPerfil.src = imagemPerfilURL || './img/default-avatar.png';  // Imagem de perfil ou imagem padrão
        imgPerfil.alt = 'Imagem de Perfil';
        imgPerfil.classList.add('imagem-perfil');
        comentarioElemento.appendChild(imgPerfil);

        // Cria o texto do comentário
        const comentarioTexto = document.createElement('p');
        comentarioTexto.innerText = comentario;
        comentarioElemento.appendChild(comentarioTexto);

        // Cria o ícone de exclusão
        const lixeira = document.createElement('img');
        lixeira.src = './img/image 13.png';  // Caminho do ícone de lixeira
        lixeira.alt = 'Excluir';
        lixeira.onclick = removerComentario;  // Ação para excluir o comentário
        comentarioElemento.appendChild(lixeira);

        // Adiciona o novo comentário à lista de comentários no footer
        comentariosList.appendChild(comentarioElemento);

        // Limpa o campo de texto após o envio
        comentarioText.value = '';
        imagemPerfilURL = '';  // Limpa a URL da imagem
        imagemPerfilInput.value = '';  // Limpa o campo de input de arquivo

        // Fecha o modal
        modal.style.display = 'none';
    } else {
        alert("Por favor, digite um comentário.");
    }
}

// Verifique se o evento de click está funcionando
document.querySelectorAll('.imagem-modal').forEach(img => {
    img.onclick = function() {
        openModal(); // Esta função deve ser chamada ao clicar na imagem
    };
});

// Enviar o comentário ao clicar no botão
enviarComentarioBtn.onclick = adicionarComentarioNoFooter;

// Função para pré-visualizar a imagem selecionada
imagemPerfilInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemPerfilURL = e.target.result;  // Salva a URL da imagem selecionada
        }
        reader.readAsDataURL(file);
    }
});
