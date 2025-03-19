# Blog Otimizado para SEO com Next.js

Tecnologias: Next.js, Typescript, CSS Modules com Tailwind, Sanity CMS Headless, SSG para geração de páginas estáticas e ISR para atualizações periódicas sem precisar de build.

## Demo

[https://blog-seo-gray.vercel.app/](https://blog-seo-gray.vercel.app/)

## Rodar localmente usando o Sanity CLI

Criar o arquivo `.env.local` usando o `.env.local.example` como base

```bash
cp -i .env.local.example .env.local
```

Rodar o comando abaixo para configurar o projeto, vai ser necessário também criar um read token [https://www.sanity.io/docs/preview-url-secret](https://www.sanity.io/docs/preview-url-secret)

```bash
npm run sanity@latest init --env .env.local
```

Instalar as dependências e rodar o projeto

```bash
npm install && npm run dev
```

O blog vai estar disponível em [http://localhost:3000](http://localhost:3000), para acessar o admin e criar novos posts [http://localhost:3000/studio/presentation](http://localhost:3000/studio/presentation)

## Rodar os testes

```bash
npm run test
```
