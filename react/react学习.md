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
