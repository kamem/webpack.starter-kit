# webpack.starter-kit

## メインアプリケーション（Webサーバー）を起動。  
http://localhost:1341/  
  
```bash
npm start
```
[http://localhost:1341/](
http://localhost:1341/)

### Build

ビルドのみを実行し `bundle.js` を生成する場合（本番用）

```bash
npm run build
```


## 設定まわり

### .editorconfig
http://editorconfig.org/

エディターのindentなどの設定を合わせる。 
各エディタに合わせてプラグインをインストールする必要があります。


## 環境まわりの説明

環境設定部分の躓いたところなど書いています。

package.jsonで使ってるライブラリについてなどかいていきます。

### webpack

``webpack``で``webpack/webpack-dev-server.js``で
``browser-sync``を使ってwebサーバーと監視用のサーバーを立てています。

下記をしようすることでブラウザをリロードすることなく即時変更が反映するようになっています。

```
react-hot-loader
webpack-dev-middleware
webpack-hot-middleware
```

``webpack-dev-server.js``と``webpack.app.config.js``で設定を行っています。


```javascript:webpack.app.config.js
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...
    
    
  loaders: [
    {
      loaders: [
        'react-hot-loader',
        'babel-loader'
      ],
      
      ...
```

#### 下記参考
[webpack, React Hot Loader + Browsersync でクロスブラウジング+ホットリロード開発](http://uraway.hatenablog.com/entry/2016/03/25/034706)

[React Hot Loaderで開発をさらに加速する](https://blog.isao.co.jp/react-hot-loader/)

[webpackのHot Module ReplacementでWebフロントエンドを爆速開発](http://qiita.com/sergeant-wizard/items/60b557fc1c763f0a1531)

### webpack 3.0.0を使うにあたり
* ``OccurenceOrderPlugin``の名前が``OccurrenceOrderPlugin``に変更されてるなどの地味な変更があり注意
* ``module:{postcss: function(){}}``のようにmodule内にpostcssを書くとエラーが表示される

https://github.com/postcss/postcss-loader/issues/92

下記のようにpluginsとして追加することで回避する。

```
plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          require('autoprefixer'),
          require('precss')
        ]
      }
    })
]
```
