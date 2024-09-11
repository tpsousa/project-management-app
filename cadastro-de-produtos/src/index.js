const express = require('express'); 
const ejs = require('ejs');
const app = express(); 

let products = [];

app.use(express.static('public')); // Servir arquivos estáticos (CSS, JS)

// Middleware para processar dados de formulários (POST)
app.use(express.urlencoded({ extended: true }));

// Definir o EJS como o motor de template
app.set('view engine', 'ejs');

// Rota principal (exibe a página inicial)
app.get('/', (req, res) => {
  res.render('index');
});

// Rota de registro (adiciona um produto)
app.post('/register', (req, res) => {
  const { name, sale } = req.body; // Desestruturar os valores do formulário

  // Validação do nome do produto
  if (name.length >= 3) {
    products.push({ name, sale }); // Adiciona o produto com nome e sale
  } else {
    console.log('Nome inválido, tente novamente');
  }

  // Validação do valor de sale
  if (sale < 0) {
    console.log('Valor de sale inválido, altere esse valor.');
  }

  res.redirect('/products'); // Redireciona para a página de produtos
});

// Rota para exibir a lista de produtos
app.get('/products', (req, res) => {
  res.render('products', { products: products }); // Renderiza a página com a lista de produtos
});

// -- Deletar produtos específicos
app.delete('/delete/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < products.length) {
    products.splice(index, 1); // Remove o produto da lista
    res.status(200).send({ success: true, message: 'Produto deletado com sucesso' });
  } else {
    res.status(404).send({ success: false, message: 'Produto não encontrado' });
  }
});

// Iniciar o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
