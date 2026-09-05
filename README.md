# Mercado Auto Peças e Acessórios

## A ideia do projeto

Este projeto nasceu com uma ideia simples: transformar a presença digital de uma loja automotiva em um espaço que realmente ajuda o cliente a decidir. Em vez de uma página parada, o resultado é uma landing page completa, com produtos, serviços, contato rápido e pequenas interações que deixam a navegação mais natural.

A identidade foi construída em preto e amarelo para combinar com a proposta da marca: uma oficina e loja de acessórios com presença forte, atendimento direto e aparência profissional.

## O que foi construído

- Cabeçalho fixo com navegação por âncoras e menu responsivo.
- Seção principal com chamada para ação, métricas e imagem de destaque.
- Barra de confiança com entrega, garantia, atendimento e pagamento.
- Seção de benefícios da empresa.
- Catálogo de produtos com imagens, descrições, preço original e preço promocional.
- Carrinho lateral com contador de itens, quantidades, remoção de produtos e total automático.
- Leitura do preço promocional exibido no card, para evitar que o carrinho mostre um valor diferente do catálogo.
- Botões de compra e de solicitação de serviço direcionados ao WhatsApp.
- Seção com os principais serviços automotivos.
- Área institucional com informações sobre a empresa e endereços.
- Chamada para orçamento.
- FAQ expansível.
- Formulário de contato com validação dos campos.
- Newsletter com retorno visual após o cadastro.
- Modal para captura de nome e e-mail com oferta de desconto.
- Links para Instagram e WhatsApp.
- Botão flutuante de WhatsApp.
- Animações de entrada conforme as seções aparecem na tela.
- Estrutura semântica, textos alternativos nas imagens, labels nos formulários e suporte à navegação por teclado.
- Layout adaptado para computador, tablet e celular.

## Tecnologias usadas

O site foi feito com tecnologias nativas da web:

- HTML5 para a estrutura e a semântica.
- CSS3 para o visual, responsividade, transições e animações.
- JavaScript puro para as interações.
- Google Fonts para a tipografia Inter.
- `Intl.NumberFormat` para exibir valores no padrão brasileiro.
- `IntersectionObserver` para ativar as animações de entrada no momento certo.

Não foi usado framework ou biblioteca de interface. Isso deixa o projeto leve, fácil de abrir localmente e simples de manter.

## Decisões de design

A página usa fundos escuros, amarelo como cor de ação e cartões com bastante respiro. A intenção foi criar uma sensação de oficina premium sem transformar a experiência em algo exagerado. Os botões principais ficam visíveis nos pontos em que o cliente normalmente toma uma decisão: ver o catálogo, pedir orçamento, comprar ou falar pelo WhatsApp.

As imagens dos produtos e da empresa são carregadas por URLs externas. Para publicar o projeto com mais controle, recomenda-se baixar essas imagens para uma pasta local e atualizar os caminhos no HTML.

## Resultado

O projeto entrega uma página que pode ser aberta localmente sem configuração adicional e que já apresenta os principais caminhos de uma compra: descobrir a loja, conhecer os serviços, escolher um produto, colocar no carrinho e iniciar uma conversa pelo WhatsApp.

A base ficou propositalmente simples de continuar. O próximo passo, caso a operação cresça, é conectar esse front-end a um sistema de pedidos, estoque e atendimento. Até lá, a página já cumpre seu papel: apresentar a Mercado Auto Peças com clareza e levar o visitante ao contato.
