# react 学习

来自 Umedy-jonas 的课程

## Building Our First React App

```jsx
import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get advice</button>
      <Message count={count} />
    </div>
  );
}

function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}
```

# A First Look at React

1. 为什么要用 React?
2. React 是什么？
3. React 与 vanilla JS 的区别
4. 使用 `Create React App` 工具构建第一个 React 应用。

## Why Do Front-End Frameworks Exist?

随着 Web 应用程序的发展，越来越多复杂的应用程序需要处理大量的数据，并保持用户界面与数据的同步。使用 JavaScript 构建这样的应用程序非常困难，需要大量的 DOM 遍历和操作。而起状态通常存储在 DOM 中，难以理解和维护。

前端框架的存在就是解决这样的问题的，使开发人员专注于数据和用户界面。

## What is React

- Based on components
- Declarative
- State-driven
- JavaScript library

React 是一个基于组件的、声明式的、状态驱动的、JavaScript 库。

## Setting Up Our Development Environment

配置 vscode

## Pure React

在不使用构建工具的情况下，在 html 文件下编写 React 代码。

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

具体见 01-pura-react 文件夹

## Setting Up a New React Project: The Options

### Create-React-App

Complete "starter kit" for React applications

👍 Everything is already configured: ESLint, Prettier, Jest, etc.ESLint、Prettier、Jest

👎 Uses slow and outdated technologies (i.e.webpack)

### VITE

Modern build tool that contains a template for setting up React applications

👎 Need to manually set up ESLint (and others)

## Setting Up a Project With Create-React-App

`npx create-react-app xxx`

# Working with Components、Props、and、JSX

学习 React 组件、Props、JSX 核心概念

## Rendering the Root Component and Strict Mode

```js
import React from "react"; // 核心功能
import ReactDOM from "react-dom/client"; // DOM 交互

function App() {
  return <h1>Hello React!</h1>;
}

// React V18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React Before V18
// React.render(<App />)
```

`<React.StrictMode>`是一个特殊的组件，不会渲染任何用户界面，而是用于帮助你在开发阶段发现潜在问题。包括：识别废弃或不推荐的生命周期、警告使用了过时 API、检测意外的副作用...

## Components as Building Blocks

React applications are entirely made out of components React

Building blocks of user interfaces in React

Piece of Ul that has its own data, logic, and appearance (how it works and looks)

We build complex Uls by building multiple components and combining them

Components can be reused, nested inside each other, and pass data between them

## Creating And Resusing a Components

---

## What is JSX

Declarative syntax to describe what components look like and how they work

Components must return a block of JSX

Extension of JavaScript that allows us to embed JavaScript, CSS, and React components into HTML

Each JSX element is converted to a React.createElement function call

We could use React without JSX

JSX 是一个声明性语法，允许我们将 HTML、CSS、JavaScript 都集成到一个代码块中。它是 Javasript 的一个扩展，不能直接在浏览器中运行，通过 Babel 转换成 JavaScript 代码。

### React Fragment
