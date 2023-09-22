![logo](https://github.com/Vinicius-resende-cin/Karaoke-de-instrumentos/assets/92769975/e7c119b1-1f90-4cca-aa22-65f10ff308f3)

# Karaoke-de-instrumentos

Projeto para a disciplina de Multimídia do CIn - UFPE

## Descrição

O projeto consiste em um sistema web de karaokê de instrumentos musicais. O usuário pode escolher uma música do youtube e tocar junto com ela, a partir da seleção do instrumento que deseja tocar. O sistema também dá um feedback para o usuário no final da música em formato de estrelas (de 0 a 5).

## Acesso

O sistema está disponível no link: [karaoke-de-instrumentos.vercel.app](https://karaoke-de-instrumentos.vercel.app/)

## Tecnologias

Front-end: NextJS

Back-end: FastAPI

## Funcionamento

### Spleeter

O sistema utiliza o Spleeter para separar os instrumentos da música. O Spleeter é uma api disponibilizada pela Deezer que utiliza redes neurais para separar os instrumentos de uma música. Ele pode separar uma música em até 5 faixas: voz, bateria, baixo, piano e outros.

O backend do sistema utiliza o Spleeter para separar a música em 5 faixas e salvar os arquivos no servidor. Em seguida, recebe o instrumento selecionado pelo usuário e compila as faixas da música em um único arquivo, sem incluir esse instrumento. Por fim, envia o arquivo para o frontend.

### Feedback

Para calcular o feedback, o sistema gera a fingerprint da faixa original do instrumento selecionado pelo usuário e a fingerprint da faixa gravada do áudio do usuário. Em seguida, converte essas fingerprints em arrays de floats, faz um pré-processamento e calcula o score baseado nas distâncias de cossenos e euclidiana (já que apresentaram o melhor nível de precisão na avaliação), além do nível de correlação entre os áudios. Esse score é então enviado para o front-end, que o converte em uma pontuação de 0 a 5 estrelas .
