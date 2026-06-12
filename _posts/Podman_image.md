---
title: "Github Codespaces images"
excerpt: "Podmanでイメージを作成するときのTipsを挙げてみます。"
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2026-06-12T08:35:07.322Z"
category: "Github Tips"
author:
  name: 柿成 恭志
  picture: "/assets/blog/authors/tk.jpg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

# Podmanでのイメージ作成のTios

## Redhat Enterprise Linux 10上でのイメージ作成

RedhatEL10ではDockerは正式にPodmanに移行されています。
そのため、RedhatELベースのイメージを作成しようとする場合には、podmanベースでのイメージ作成が基本となります。
Redhat Enterprise Linuxは以下の2通りのコンテナが用意されています。

 - Red Hat Enterprise Linux Base Images (RHEL ベースイメージ)
 - Red Hat Universal Base Images (UBI イメージ)

どちらもRedhat Enterprise Linuxベースのコンテナなのですが、ベースイメージの方はイメージ上でインストール可能なイメージですがサブスクリプション登録やライセンスの関係上、業務イメージを作成するために用意されたものです。
UBIイメージはアプリケーション用などのベースに使用することを許可されているイメージですが、ライセンスされたRedhat上でイメージを作成する方式をとりイメージ上ではソフトウェアを追加インストールすることはできませんが、イメージをDovkerなどで使用することも許可されています。
さらにDNFなどのインストール用のソフトウェアやデポをイメージに含まないので小さなイメージにまとめることができます。

## まずRedhatのライセンスを取得しましょう

Redhatは開発者用ライセンスを取得すると最大16システムまでのライセンスを運用できます。
取得方法は省略しますが、開発環境としてCloudやWindowsのWSLなどで有効にライセンスを利用できますので、ぜひ取得してみてください。

## ローカルで利用できるシステムを用意しよう

Redhat上で作業できるようにローカルマシン上にRedhatをインストールしてみましょう。
Windows上でPodman Desktopをインストールしてイメージを作成することもできますが、UBIイメージを使用してイメージを作成するにはWSLをインストールしてRedhatELのイメージを入手してWSLイメージを作成することが一番近道です。

## UBIイメージを作成する

UBIイメージを作成するためにはpodman build内でソフトウェアをインストールすることができません。
UBIのベースイメージがDNFコマンドを含んでいないことが理由ですがインストールのためのライセンスをホストマシンのものを使用する必要があるからです。
インストールの方法としては以下のようになります。

 - ベースとなるイメージを取得する
 - 取得イメージをマウントをする
 - DBFコマンドに引数を指定してターゲット設定としてマウント先を指定する
 - ソフトウェアをインストール
 - イメージをアンマウント
 - イメージをコミットして作成する
 - podman build を使用してイメージのパラメータを設定する

 これをスクリプトで作成すると以下のようになります。

 ```
 #!/bin/bash

microcontainer=$(buildah from localhost/ubi-micro-ja:9)
micromount=$(buildah mount $microcontainer)
dnf install  xauth openssl openssh \
  --installroot $micromount \
  --releasever=/ \
  --setopt install_weak_deps=false \
  --setopt=reposdir=/etc/yum.repos.d/ \
  --nodocs -y ; \
dnf clean all \
  --installroot $micromount

buildah umount $microcontainer
buildah commit $microcontainer localhost/ubi-micro-ja:9-base
```

この後、必要であればdocker.ioなどにPushすれば完了します。
Codespacesなどで利用するのであれば公開リポジトリでイメージを公開することは必須になりますので公開リポジトリのアカウントも忘れずに。