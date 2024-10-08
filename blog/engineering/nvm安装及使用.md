# nvm 安装及使用

之前我一直都是使用某一个 node 版本，最近入职了新的公司，由于 node 版本过高某个依赖安装失败提示切换到低版本，所以要安装 nvm！

nvm (Node Version Manager) 是一个 Node.js 的版本管理工具，可以方便我们切换 Node.js 的版本。

在安装 nvm 之前要卸载 node 版本

```bash
sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}
```

使用 Homebrew 安装 node

```bash
brew install nvm
```

安装成功后终端提示

```bash
You should create NVM's working directory if it doesn't exist:

  mkdir ~/.nvm

Add the following to ~/.config/fish/config.fish or your desired shell
configuration file:

 export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

You can set $NVM_DIR to any location, but leaving it unchanged from
/usr/local/opt/nvm will destroy any nvm-installed Node installations
upon upgrade/reinstall.
```

切换到顶层目录，配置环境变量

> vim 常用编辑命令：
>
> i 编辑
>
> esc 退出编辑
>
> :wq 退出编辑文件

```bash
# 切到顶层目录
cd ~

# 编辑文件
vim ~/.bash_profile

# 添加以下内容
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# 刷新环境变量
source ~/.bash_profile
```

配置 zsh

```bash
# 切到顶层目录
cd ~

# 编辑文件
vim ~/.zshrc

# 添加以下内容
export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# 刷新环境变量
source ~/.bash_profile
```

---

[nvm 安装 node 版本官方链接](https://nvm.p6p.net/use/ver.html)
