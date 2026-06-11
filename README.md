# Seu Livro de Receitas

Aplicativo mobile (Bare React Native) desenvolvido para o processo seletivo da empresa A4PM. Mais informações podem ser encontradas em: [Especificação do Processo Seletivo A4PM](https://gitlab.devrgesus.com.br/codelabs/desafio_rg_receitas_culinarias).


---

## Pré-requisitos

- **Node.js** `>= 22.11.0`
- Ambiente React Native configurado para Android.
- Um dispositivo Android físico (ou emulador) para rodar.

---

## 1. Instalar dependências

```sh
npm install
```

## 2. Configurar o `.env`

O projeto usa [`react-native-dotenv`](https://github.com/goatandsheep/react-native-dotenv) com modo **`safe`**, ou seja: o arquivo `.env` é **obrigatório** e precisa conter **todas** as chaves presentes no `.env.example`, senão o build falha.

Copie o exemplo e preencha os valores:

```sh
cp .env.example .env
```

```env
RECEIPES_API=https://sua-api.com
API_KEY=sua-chave-aqui
```

Você também pode rodar a API **localmente**, clonando o [repositório dela](https://github.com/DedeyGarcia/psel-am4pm-backend) e subindo na sua máquina. Nesse caso, aponte `RECEIPES_API` para o endereço local.

> Sobre o `API_KEY`: só é obrigatória se você configurou uma chave no `.env` da **própria API**. Se a API não exige chave, **não é necessária** `API_KEY` no `.env` (apesar de ainda funcionar caso seja definida). Em **produção é obrigatório**.

---

## Rodando em desenvolvimento

São necessários **dois terminais**: um para o Metro (bundler) e outro para subir o app no aparelho.

**Terminal 1 - Metro:**

```sh
npm start
```

**Terminal 2 - build de desenvolvimento no Android:**

```sh
npm run android
```

> Esse comando instala uma variante de debug com `appIdSuffix debug` (pacote `com.appreceitas.debug`), então ela **convive** com uma eventual build de release instalada no mesmo aparelho.

### Avisos importantes

- ⚠️ **Se o Metro perguntar se você quer abrir uma nova instância** (porque já há um Metro rodando no Terminal 1), escolha **Não / No**. Use o Metro que já está aberto.
- ⚠️ **Se a build de desenvolvimento travar/congelar na splash screen:** é só **fechar o app e abrir de novo** no aparelho. É um comportamento conhecido dessa variante de debug e não afeta a build de release.
- ⚠️ **Rodando a API localmente com o aparelho conectado via USB:** use `adb reverse` para o `localhost` do celular apontar para o do PC. Assim você mantém `RECEIPES_API=http://localhost:PORTA` no `.env`, sem precisar do IP da máquina nem estar na mesma rede:

  ```sh
  adb -d reverse tcp:PORTA tcp:PORTA
  ```

  Troque `PORTA` pela porta da API (ex: `8000`). O `-d` seleciona o dispositivo USB físico - útil quando há um emulador aberto e o `adb` reclama de *"more than one device"*. O redirecionamento cai ao desconectar o cabo; basta rodar o comando de novo.

---

## Gerando a build de release (APK)

Para instalar/distribuir o app sem depender do Metro, gere a build de release.

### Opção 1 - instalar direto no aparelho conectado

```sh
npm run android:release
```

### Opção 2 - gerar apenas o arquivo APK

```sh
npm run apk:release
```

O APK fica em:

```
android/app/build/outputs/apk/release/app-release.apk
```

Transfira esse arquivo para o celular e instale (talvez seja necessário permitir *"Instalar apps de fontes desconhecidas"*).

---

## Baixar o APK pronto (Google Drive)

Se preferir não buildar, baixe o APK já compilado em: [`https://drive.google.com/drive/folders/1nOwWw5_Dh7L5ABRxYZJceMZ_0YuEMHMz?usp=drive_link`](https://drive.google.com/drive/folders/1nOwWw5_Dh7L5ABRxYZJceMZ_0YuEMHMz?usp=drive_link)

No celular, após baixar, toque no arquivo `.apk` e permita a instalação de fontes desconhecidas se solicitado.

---

## Arquitetura do projeto

Código-fonte em [`src/`](src/), organizado por responsabilidade:

```
src/
├── api/          # Instância do axios + interceptors (auth e tratamento de 401)
├── components/   # Componentes reutilizáveis (CustomButton, RecipeForm, etc.)
├── hooks/        # Hooks de dados (TanStack Query): useRecipes, useLogin, ...
├── lib/          # Utilitários (queryClient, getErrorMessage)
├── navigation/   # RootNavigator, layouts e tipos das rotas
├── providers/    # AppProvider (agrega Paper, QueryClient, SafeArea, etc.)
├── screens/      # Telas, agrupadas por domínio (auth, recipes)
├── services/     # Camada de serviço: chamadas à API + mapeamento DTO ↔ domínio
├── store/        # Estado global de UI/sessão com Zustand (authStore, filtros)
├── testUtils/    # Helpers de teste (factories, wrappers, etc...)
└── theme/        # Tema Material Design 3 (cores, fontes Montserrat, spacing)
```

Os testes ficam ao lado do código que lhes é referente, em pastas `__tests__/` com sufixo `.spec.ts(x)`. Rode com `npm test`.

Tipos de domínio compartilhados ficam em [`types/`](types/) na raiz.

### Principais decisões e bibliotecas

- **React Compiler** - o projeto compila com o [`babel-plugin-react-compiler`](https://react.dev/learn/react-compiler). Por isso **não há `useMemo`/`useCallback`/`React.memo` explícitos** no código: a memoização é feita automaticamente pelo compiler.
- **[React Native Paper](https://callstack.github.io/react-native-paper/)** - biblioteca de UI (Material Design 3).
- **[Zustand](https://zustand-demo.pmnd.rs/)** - estado global.
- **[TanStack Query](https://tanstack.com/query)** - estado de servidor (fetch/cache/mutations).
- **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** - formulários e validação.
- **[React Navigation](https://reactnavigation.org/)** - navegação, com tipagem das rotas.
- **[@shopify/flash-list](https://shopify.github.io/flash-list/)** - listas performáticas.
- **[react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash)** - splash screen nativa.
- **[Jest](https://jestjs.io/) + [Testing Library (RNTL)](https://callstack.github.io/react-native-testing-library/)** - testes automatizados, com foco no comportamento visível ao usuário.
