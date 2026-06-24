---
title: "Podman image with CUDA"
excerpt: "Podmanイメージをローカルで起動してCUDAを使って機械学習するには。"
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2026-06-24T08:35:07.322Z"
category: "Github Tips"
author:
  name: 柿成 恭志
  picture: "/assets/blog/authors/tk.jpg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

# PodmanイメージとCUDA Tios

## Anaconda３の環境用のCodespacesのイメージをローカルで

もともとPython環境をCodespaces上で実装するためのPodmanのイメージを用意していたのですが、自宅の環境ではCUDAが動作する環境があるので、ローカルではWSL2上にRedhat Enterprise 10.2環境を整備してVSCODE+Jupyter Notebook + CUDAという環境で作業を行っていました。

Nvidiaのグラフィックボードが実装されているPCを常にRHELマシンとして運用するのは稼働率的に無駄があるので、普段はWindows11として使用しているマシン上にWSL2のイメージを使用した環境で作業しています。

ベースをRedhatELにしているため、Windows11上ではDocker DesktopではなくPodman Desktopを使用しています。

### Docker/Podman でのGPUサポート

#### WSLでのGPUサポート

Windows上でのコンテナのGPUサポートはWSL上でのサポートをベースにしています。
Windows用のNvidiaのグラフィックカードドライバがホストマシンにインストールされているマシンにインストールされている場合、ゲストOSのグラフィックのアクセスは直接ホストのGPUをアクセスするように機能が追加されます。
ドライバ関連のファイルは`/usr/lib/wsl/lib`にマウントされています。
WSL上でそのフォルダが存在するのであればそのファルダにある`nvidia-sni`コマンドではストのグラフィックカードの情報が取得できればそのままGPUへのアクセスは可能になります。

WSL上で使用するのであればそのままAnacondaなどの開発環境を設定してゆけばGPU＋の環境を構築できます。

#### コンテナからのGPUアクセス

コンテナ上からでもホストのGPUをアクセスすることができます。

コンテナとホストマシンの間にはコンテナ用のベースとなるマシンと呼ばれるイメージが介在します。

DockerやPodmanはもともとLinux上の技術なのでWindow上では直接実装されておらずコンテナ制御のための最小限のOSイメージがWSL上に存在します。
先ほどのWSLでの実装はこのマシンに対しても適応されており、ホストとマシンはGPUをアクセスすることが可能です。

Nvidiaのコンテナとマシン間のGPU共有は`nvidia-container-toolkit`を介して行われます。
Dockerの標準のマシンイメージはこのパッケージを含まれているため、コンテナ側にもパッケージをインストールし、起動時に

```
--device nvidia.com/gpu=all
```

のオプションを指定することによりコンテナ側でも共有できるようになります。

#### Podman Desktopの環境では動かない？

どうもPodmanの標準マシンイメージは`nvidia-container-toolkit`を内包していないようで、単純にコンテナ側に用意しただけでは動作しません。

Podman Desktop上でGPUをアクセスするためには以下の手順が必要です。

* マシンにSSHでログインする
* インストールリポジトリの設定
* `nvidia-container-toolkit`をインストール
* Podman マシンイメージを再起動

##### マシンにSSHでログイン

```
podman machine ssh
```
これでログインできます。

##### インストールリポジトリの設定

```
curl -s -L https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo | \
  sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
```

この作業には`curl`が必要ですのでもしない場合にはあらかじめインストールが必要です。

##### `nvidia-container-toolkit`をインストール

```
export NVIDIA_CONTAINER_TOOLKIT_VERSION=1.19.1-1
  sudo dnf install -y \
      nvidia-container-toolkit-${NVIDIA_CONTAINER_TOOLKIT_VERSION} \
      nvidia-container-toolkit-base-${NVIDIA_CONTAINER_TOOLKIT_VERSION} \
      libnvidia-container-tools-${NVIDIA_CONTAINER_TOOLKIT_VERSION} \
      libnvidia-container1-${NVIDIA_CONTAINER_TOOLKIT_VERSION}
```

バージョンは現時点の最新です。

マシンはRHEL系の`dnf`ベースの説明です。ベースOSが異なる場合は公式ガイドを参照してください。

詳細は [NVIDIAの公式ガイド](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installing-with-yum-or-dnf)を参照

これでPodman Desktop上で機械学習を実行することができます。

### Tips

このインストールをUBIイメージで利用するときにはインストールリポジトリの設定はホストマシンに対して行うことになります。

GPU Enable バージョンのPodmanのContainerFileは[ここ](https://github.com/kakinari/UBIMicro-podman.git)にあります。