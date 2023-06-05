---
title: 利用Shadowsocks访问GitHub
date: 2022-09-11 22:49:03
tags: [clash, shadowsocks, github]
categories: [编程]
---

> 本文无不良倾向，本人爱国爱党，此文章仅作为技术分享，为无法正常访问 GitHub 的开发者提供访问方法。

<!-- more -->

<!-- toc -->

本文采用 Clash 对 GitHub 进行访问。

## 采购服务器

> 本教程使用腾讯云服务器进行讲解，读者可根据自身情况选择服务商。

简单的 clash 节点不需要过高的服务器配置，选择腾讯云的轻量应用服务器即可，建议网络计费采用按量计费，带宽可以拉大一点。

建议使用 `Ubuntu 22.04 LTS` 作为系统镜像。

## 更新源和软件

```bash
sudo apt-get update
sudo apt-get upgrade
```

## 安装 shadowsocks-libev

```bash
sudo apt install shadowsocks-libev
```

## 安装 simple-obfs

本人曾经在一台阿里云的服务器上搭建了 shadowsocks 节点，结果没两天就惨遭 **TGW** 毒手，直接封禁 IP 。因此建议多执行这一步对流量进行混淆加密。

```bash
sudo apt-get install --no-install-recommends build-essential autoconf libtool libssl-dev libpcre3-dev libc-ares-dev libev-dev asciidoc xmlto automake git
git clone https://github.com/shadowsocks/simple-obfs.git
cd simple-obfs
git submodule update --init --recursive
./autogen.sh
./configure && make
sudo make install
cd ..
rm -rf simple-obfs
```

## 编辑配置文件

```bash
sudo vim /etc/shadowsocks-libev/config.json
```

```json
{
  "server": "0.0.0.0",
  "server_port": 8443,
  "local_port": 1080,
  "password": "Your Password",
  "timeout": 60,
  "method": "chacha20-ietf-poly1305",
  "plugin": "obfs-server",
  "plugin_opts": "obfs=tls;obfs-host=your.hostname",
  "ssl": true,
  "ssl_cert": "/etc/ssl/certs/your.hostname.crt",
  "ssl_key": "/etc/ssl/private/your.hostname.key"
}
```

**注意：**记得将上面的 `your.hostname` 改为自己的域名，`ssl_cert` 和 `ssl_key` 改为自己的域名SSL证书和密钥文件路径。

## 开机启动配置

```bash
sudo systemctl start shadowsocks-libev
sudo systemctl enable shadowsocks-libev
```

## 对应的 clash 配置

```yml
port: 7890
allow-lan: true
mode: rule
log-level: info

# Rule 规则
rules:
- DOMAIN-KEYWORD,github,Proxy # 通过代理访问 Github
- GEOIP,CN,DIRECT # CN IP 访问代理
- MATCH,DIRECT

# Proxy 代理
proxies:
  # Shadowsocks
  - name: "my-ss"
    type: ss
    server: your.hostname # 记得改成自己的域名
    port: 8443
    cipher: chacha20-ietf-poly1305
    password: "Your Password"
    plugin: obfs
    plugin-opts:
      mode: tls # or http
      # host: bing.com
    # udp: true

proxy-groups:
  - name: Proxy
    type: select
    proxies:
      - "my-ss"
```
