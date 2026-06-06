---
title: "Github Codespaces"
excerpt: "Githubでリポジトリを作成するとそれぞれのブランチに対してCodesoaces環境を設定することができます。"
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2026-06-06T08:35:07.322Z"
category: "Github Tips"
author:
  name: 柿成 恭志
  picture: "/assets/blog/authors/tk.jpg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

## Github Codespacesについて

Githubでリポジトリを作成するとそれぞれのブランチに対してCodesoaces環境を設定することができます。

Codespacesはブランチの開発環境をDockerのイメージをベースに開発環境を提供してくれる仕組みです。

特にローカルの開発環境を用意しなくてもブラウザなどを経由してコーディングからデプロイまで作業をすることができます。

非力なローカルマシンでも開発できるメリットがあります。　GithubのリポジトリはPublicでもPrivateでも利用することができ、Githubの認証セキュリティで保護されていますのでコードの保護などは安心できます。

実際にiPad Proを使用してブラウザからVS Code経由でCodespaceの環境で開発作業も可能でした。

開発用のイメージは特に自分で用意しなくてもMicrosoftが用意している開発コンテナを利用することができます。

そのままそのイメージを使用してもよいのですが、好みのOSを使用したい場合や開発コンテナを使用するためにいくつかソフトウェアをインストール、設定をする必要がある場合にはオリジナルのDockerイメージを用意すれば、Codespacesに接続すればすぐに使用可能になるため、おすすめです。