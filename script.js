function catalogo(titulo, autor, genero, anoPublicacao, avaliacao) { // parametros determinados por ordem em um objeto. esse objeto irá servir pra transformar futuros dados em strings e trabalhar outros conceritos nele
    return {
        titulo: titulo,
        autor: autor,
        genero: genero,
        anoPublicacao: anoPublicacao,
        avaliacao: avaliacao
    }
}
// salvar livros no storage
function salvarLivros() {
    const livros = [] //storage usa listas para armazenar dados. nesse caso, é necessário criar essa variável com um array aonde adiciona os elementos com o .push. esses elementos estão relacionados com os objetos
    document.querySelectorAll('.livro-card').forEach(livro => {
        livros.push({
            titulo: livro.querySelector('[data-titulo]').textContent,
            autor: livro.querySelector('[data-autor]').textContent,
            genero: livro.querySelector('[data-genero]').textContent,
            anoPublicacao: livro.querySelector('[data-ano]').textContent,
            avaliacao: livro.querySelector('[data-avaliacao]').textContent
        })
    })
    localStorage.setItem('livros', JSON.stringify(livros))
}
// carregar livros salvos ao atualizar
function carregarLivros() {
    const livrosSalvos = JSON.parse(localStorage.getItem('livros')) || []
    const tela = document.getElementById('tela')
    tela.innerHTML = ''

    livrosSalvos.forEach(livro => {
        const livroCard = document.createElement('div')
        livroCard.className = 'livro-card'
        livroCard.innerHTML = `
            <p><strong>Título:</strong> <span data-titulo>${livro.titulo}</span></p>
            <p><strong>Autor:</strong> <span data-autor>${livro.autor}</span></p>
            <p><strong>Gênero:</strong> <span data-genero>${livro.genero}</span></p>
            <p><strong>Ano:</strong> <span data-ano>${livro.anoPublicacao}</span></p>
            <p><strong>Avaliação:</strong> <span data-avaliacao>${livro.avaliacao}</span></p>
        `
        tela.appendChild(livroCard)
    })
}

document.getElementById('add-book').addEventListener('click', () => {
    document.getElementById('form').classList.remove('hidden')
})
// salvar novo livro
document.getElementById('bttn-save').addEventListener('click', () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const gender = document.getElementById('gender').value
    const year = document.getElementById('date-publication').value
    const rating = document.getElementById('rating').value

    if (!title || !author || !gender || !year || !rating) {
        alert("Preencha todos os campos!")
        return
    }

    const novoLivro = catalogo(title, author, gender, year, rating)
    const livroCard = document.createElement('div')
    livroCard.className = 'livro-card'
    livroCard.innerHTML = `
        <p><strong>Título:</strong> <span data-titulo>${novoLivro.titulo}</span></p>
        <p><strong>Autor:</strong> <span data-autor>${novoLivro.autor}</span></p>
        <p><strong>Gênero:</strong> <span data-genero>${novoLivro.genero}</span></p>
        <p><strong>Ano:</strong> <span data-ano>${novoLivro.anoPublicacao}</span></p>
        <p><strong>Avaliação:</strong> <span data-avaliacao>${novoLivro.avaliacao}</span></p>
    `
    //exibe card na tela
    document.getElementById('tela').appendChild(livroCard)

    salvarLivros() // atualiza dados no localstorage

    // limpa campos e oculta formulário
    document.getElementById('form').reset()
    document.getElementById('form').classList.add('hidden')
})

function filtrarLivros() {
    const termo = document.getElementById('search-bar').value.toLowerCase()
    const livros = document.querySelectorAll('.livro-card')

    livros.forEach(livro => {
        const titulo = livro.querySelector('[data-titulo]').textContent.toLowerCase()
        const autor = livro.querySelector('[data-autor]').textContent.toLowerCase()
        const genero = livro.querySelector('[data-genero]').textContent.toLowerCase()
        
        if (titulo.includes(termo) || autor.includes(termo) || genero.includes(termo)) {
            livro.style.display = 'block'
        } else {
            livro.style.display = 'none'
        }
    })
}
document.addEventListener('DOMContentLoaded', carregarLivros);

document.getElementById('search-bar').addEventListener('input', filtrarLivros)
