---
---
slug: auto-release
title: auth release
authors: [shanks]
tags: []
---

本地 bash 自动发布

<!-- truncate -->

## deploy.sh

```sh
#!/bin/bash

PS3="Please choose an option (1 or 2): "

OPTION1="staging"
OPTION2="prod"

# 在服务器上执行发布文件
sync_deploy_files(){
  local ENV="$1"
  # 远程服务器的配置
  REMOTE_DEPLOY_SCRIPT="${REMOTE_PATH}/${LOCAL_DEPLOY_SCRIPT}"
  LOG_FILE="deploy.log"

  # 记录部署过程
  {
    echo "Starting deployment to ${ENV} environment at $(date)"

    # 执行对应的 bash
    ssh -i ${SSH_KEY} ${SERVER_USER}@${SERVER_IP} "bash ${REMOTE_DEPLOY_SCRIPT}"

    if [ $? -eq 0 ]; then
      echo "Deployment to ${ENV} environment finished successfully at $(date)"
    else
      echo "Deployment to ${ENV} environment failed at $(date)"
    fi
  } 2>&1 | tee -a ${LOG_FILE}
}

# 预发布
staging_function(){
  SERVER_USER="root"
  SERVER_IP="1.1.1.1"
  SSH_KEY="~/.ssh/aa_rsa"
  REMOTE_PATH="/var/www/html/aa"
  LOCAL_DEPLOY_SCRIPT="deploy-remote-staging.sh"
  sync_deploy_files "${OPTION1}"
}

# 线上发布
prod_function(){
  SERVER_USER="root"
  SERVER_IP="1.1.1.1"
  SSH_KEY="~/.ssh/bb_rsa"
  REMOTE_PATH="/home/www/bb"
  LOCAL_DEPLOY_SCRIPT="deploy-remote-prod.sh"
  sync_deploy_files "${OPTION2}"
}



select option in "$OPTION1" "$OPTION2";do
  case $option in 
    "$OPTION1")
      staging_function
      break
      ;;
    "$OPTION2")
      prod_function
      break
      ;;
    *)
    echo "Invalid option, please choose again."
    ;;
  esac
done
```

## deploy-remote-staging.sh

```bash
#!/bin/bash

# 设置项目路径
REMOTE_PATH="/var/www/html/aa"

# 进入项目目录
cd $REMOTE_PATH || { echo "Failed to change directory to $REMOTE_PATH"; exit 1; }

# 清缓存
rm -rf .next/cache

# git checkout main

# 拉取最新代码
git fetch --all || { echo "git fetch --all failed"; exit 1; }
git reset --hard origin/main || { echo "git reset --hard origin/main failed"; exit 1; }
git pull || { echo "git pull failed"; exit 1; }

# nvm 是一个脚本不是一个指令
source ~/.nvm/nvm.sh || { echo "source nvm.sh failed"; exit 1; }

# 切换到 node 20 版本
nvm use 20 || { echo "nvm use failed"; exit 1; }

# 安装依赖
npm install || { echo "npm install failed"; exit 1; }

# 构建项目
npm run build:staging || { echo "npm run build:staging failed"; exit 1; }

# 启动或重启 PM2 服务
pm2 startOrRestart ecosystem.config.js --only aa-staging || { echo "PM2 command failed"; exit 1; }

echo "Staging deployment finished successfully"

echo "http://aa.com/"
```
## deploy-remote-prod.sh

```bash
#!/bin/bash

# 设置项目路径
REMOTE_PATH="/home/www/bb"

# 进入项目目录
cd $REMOTE_PATH || { echo "Failed to change directory to $REMOTE_PATH"; exit 1; }

# 清缓存
rm -rf .next/cache

# 拉取最新代码
git fetch --all || { echo "git fetch --all failed"; exit 1; }
git reset --hard origin/main || { echo "git reset --hard origin/main failed"; exit 1; }
git pull || { echo "git pull failed"; exit 1; }

# nvm 是一个脚本不是一个指令
source ~/.nvm/nvm.sh || { echo "source nvm.sh failed"; exit 1; }

# 切换到 node 20 版本
nvm use 20 || { echo "nvm use failed"; exit 1; }

# 安装依赖
npm install || { echo "npm install failed"; exit 1; }

# 构建项目
npm run build:prod || { echo "npm run build:prod failed"; exit 1; }

# 启动或重启 PM2 服务
pm2 startOrRestart ecosystem.config.js --only bb-prod  || { echo "PM2 command failed"; exit 1; }

echo "Prod deployment finished successfully"

echo "http://bb.com/"
```