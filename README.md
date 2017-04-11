# new_project

# webpack2はじめました

仕事のプロジェクトでお世話になっているRailsが5.1からwebpackがサポートされるということで、
そろそろモダンなフロントエンドにも力入れていきたい所存であるからして、
手始めにwebpackとはなんぞやというところから始めようと思った次第です。

- webpackとは
- webpack事始め
- v1とv2で全然違うのが罠

## webpackとは

webpackとはなんぞや。
早い話、Ruby大先生で言うところのBundlerみたいなもの……って例えるとわかりやすいでしょうか。
ちょっと違うような気もします。npm先輩もいますし…。
_モジュールバンドラー_っていうのが正解らしいのですが、じゃあこの_モジュールバンドラーって何さ？_ってことになると思います。

参考：[初めてのwebpack](http://qiita.com/kmszk/items/45fb4690ace32216ca25)
このページが詳しく書いてあります。
要約すると、フロントエンドで開発してきたJSなりSASSやらLESSで作った__ファイル（モジュール）をバンドル（まとめてくれる）__のがwebpackということらしいです。
ただ、今までgulpでやってた仮想サーバーとかファイルのwatch機能、モジュールコードをバンドルする過程で、Babel.jsなどを使ってプリコンパイルや、
SASSやLESSなどのメタ言語のコンパイルとかも出来るので、タスクランナーと勘違いしてしまうこともあるような気がします。
__ちがう、タスクランナーじゃなくて、モジュールバンドラーだから__。

## webpack事始め

前提として、

- node.jsを使ったことがある。
- npmを使ったことがある。
- ターミナルでのCLI操作に抵抗がない

以上3点はクリアしているものとして、勧めます。
「そもそも黒い画面なんて怖い！見たくない！」って言う人は…………、__CLIでnode.js100万回くらいインストールしてきてから読んだほうがいいかもしれないです。__

### まずは公式の`Getting Started`を参考に

webpackは最新バージョンは2です。ggると大体v1の方のチュートリアルとかが出てくるんですが、微妙に参考になったり参考にならなかったりしたので、
v2のサイトに乗ってる_GUIDE_の_Getting Started_を参考にした方が、わかりやすいと思います。
ただ、公式のドキュメントになりますので、英語をある程度読めないといけません。
私は英語は中学生レベルで止まってる感じですが、なんとか理解できたので…多分大丈夫（だと思います）。

ただ、公式のものそのままだと、無駄なステップがあったりするので若干省略します。

```

//webpack-demoというディレクトリを作成して、移動
  mkdir webpack-demo && cd webpack-demo
// npmのpackage.jsonを作成
  npm init -y
// webpackのインストール
  npm install --save-dev webpack
// webpackがインストールされたか確認
  webpack --help

```

大体ここまでは大したエラーもなくすんなり進むと思います。
次に「hello webpack」というテキストを表示させます。
`app`というディレクトリを作ってその中`index.js`を作成して次のコードを書きます。

```
import _ from 'lodash';
function component () {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());

```

この書き方だと`lodash`入れないと動かないので、インストールしておきます。

```

npm install --save lodash

```

あとHTMLも用意します。

```

<html>
   <head>
     <title>webpack 2 demo</title>
   </head>
   <body>
     <script src="dist/bundle.js"></script>
   </body>
 </html>

```

続いてwebpackの設定ファイルを作ります。
大体`webpack.config.js`で作られてますが、`webpack`の部分は任意の名前で問題ないみたいです。
でも、考えるのめんどくさいし、今の段階でconfigファイルは一個しか必要ないので`webpack.config.js`で作ります。

```

var path = require('path');
var webpack = require('webpack');
module.exports = [
  {
    entry: ['./source/app.js'],  //元ネタのjsファイルパス
    output: {
      filename: 'bundle.js', // 出力する時のファイル名（お好みで）
      path: path.resolve(__dirname, 'dist')  //出力先のディレクトリパスを指定。（__dirnameは多分rootのことを指してるんじゃないかな…）←多分
    },
  },
];

```

configを書いたら、`$ npm run webpack`コマンドを叩いて、実装します。
outputで指定したディレクトリに、指定したファイル名のjsファイルが書き出されてればOKです。
`index.html`をブラウザの窓に突っ込んで表示してみてください。
`Hello webpack`と表示されれば成功です。

## v1とv2の違い
個人的に、Qiitaとかはてブの記事を見ててなんとなく引っかかったところです。
v1とv2でconfig.jsの書き方が微妙に変更になっています。
自分も勉強中なので、まだまだわからないこともありますが、一番わかり易い、よく目にするところで言うと、
Loader周りがv1とv2で記述方法が変更されているみたいです。

参考：[Migrating from v1 to v2](https://webpack.js.org/guides/migrating/)

```v1

module: {
  loaders: [
    {
      test: /\.css$/,
      loaders: [
        "style-loader",
        "css-loader?modules=true"
      ]
    },
    {
      test: /\.jsx$/,
      loader: "babel-loader", // Do not use "use" here
      options: {
        // ...
      }
    }
  ]
}

```

```v2

module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          options: {
            modules: true
          }
        }
      ]
    },
    {
      test: /\.jsx$/,
      loader: "babel-loader", // Do not use "use" here
      options: {
        // ...
      }
    }
  ]
}

```

似ているようで、結構違います。
v2インストールしても、v1の書き方してて「動かない？！？！(ﾟωﾟ; )」ってことが、自分も写経しててよくありました。
ggって探すと大抵v1の書き方が紹介されてるんですが、npm install でインストールされるのは最新のv2なので…ggるときも、v2に絞って探さないと行けない…
っていうか、もう公式ドキュメント見たほうが早いな…ってなって、結局公式の英語ドキュメントを、Google翻訳片手に眺めては
写経してました。ReactとかAngulerとかJSライブラリ周りをいじるときもBabel読み込んだりいろり使うと思いますが、
SassとかCssとかimgとか読み込ませたりするのにLoaderを使うので、これからwebpack始めるよ！当方は、ドキュメント探すときの参考になればいいなって思います。


私は英語も得意じゃないですし、webpackも触り初めて1週間経つか経たないかのレベルしかさわれてないので、もし「ここ違うよ！」っていうのがあれば、遠慮なくコメントいただけるとうれしいです(･∀-`; )
