---
title: "サイトを更新しました。"
excerpt: "これまで放置していましたがNodeベースでサイトを構築できるようになったことを知り、新サイトをリニューアルしました。"
coverImage: "/assets/blog/renewal/sakura.jpg"
date: "2026-12-31T05:35:07.322Z"
category: "日記"
author:
  name: 柿成 恭志
  picture: "/assets/blog/authors/tk.jpg"
ogImage:
  url: "/assets/blog/renewal/sakura.jpg"
---

# サイトを更新しました。

このサイトはNextJSベースでホームページを改装しました。

Blogを中心にしたサイト構成を考えました。　サイト全体は静的コンテンツにビルドし、Github Pageに展開してみました。　NextJSベースにしたことで複数アプリ構成にしています。　投稿自体はMarkdownによるコンテンツをサイトベースに展開する仕込みを使用しています。　投稿はカテゴリ別に表示するよう改良しました。

## CodeSpace

このサイトに設定しているCodespaceはRedhat Enterprise Linux 10 をベースに日本語化を行い、NodeJS 26とpnpmをインストールしたイメージを独自に作成しています。　Github Actionのビルドにも同一のイメージで構成しています。

今後技術的なTipsをつぶやいていきたいと思います。
