---
title: "Github Codespaces images"
excerpt: "CodeSpacesのために用意したDockerイメージを紹介します。"
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2026-09-06T08:35:07.322Z"
category: "Github Tips"
author:
  name: 柿成 恭志
  picture: "/assets/blog/authors/tk.jpg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

## Github Codespaces用のDockerイメージ

### Codespaces用のDockerイメージを用意する

CodeSpacesに使用するイメージはMicrosoftが用意している開発コンテナから選択することができます。　Codespacesを使用すると実行されたコンテナ上にリポジトリが展開され、作業環境をターミナル上に提供されます。

提供されているOSのイメージが見つからない場合やイメージ取得後にさらにソフトウェアのインストールや環境設定が必要な場合はオリジナルのイメージを作成することをお勧めします。
Codespacesには連続運用期限があるため、コンテナが停止した場合は再設定が必要です。　また、Guthub ActionsによるデプロイにもDockerイメージを使用することができます。　その際にはイメージが直接使用されるため、環境と同じ環境を用意しておくのもメリットがあります。

本環境はRedhat Enterprise Linux 10をベースに開発を用意しました。

イメージ自体はDocker上で作成したものではなくRedhat上でpodmanをベースに作成しています。　作成方法などは別の投稿で。

### 用意したイメージ

開発環境として以下のイメージを用意しています。

- docker.io/kakinari/ubi-micro-j:10-csbase
- docker.io/kakinari/ubi-micro-j:10-cs-java-latest
- docker.io/kakinari/ubi-micro-j:10-cs-node-26
- docker.io/kakinari/ubi-micro-j:10-cs-anaconda-3

#### RedhatEL10 + 開発環境

Podmanのubi-initをベースに開発環境をインストールしてあります。

#### ベースイメージ + Java latest

ベースイメージにJava latest developをインストールしています。

#### ベースイメージ + NodeJS 26

ベースイメージの/opt 配下に node 26, npｍ, pnpmをインストールしています。

#### ベースイメージ + anaconda3

ベースイメージの/opt 配下に Anaconda3、opencv_python、PyToachをインストールしています。
VS Codeで起動させたときにJupyter Notebookを使用できるよう調整してあります。

技術的詳細は別投稿で行います。
