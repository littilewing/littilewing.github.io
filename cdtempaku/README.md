# markdown
* 1
* 2

# 概要
* ScratchStudioIDを指定して、スタジオに登録されているアプリケーションをAPI経由で取得
* 

## 仕様

1. IDを指定して、スタジオの作品一覧をAPI経由で取得
2. 取得した情報を順番に表示 
3. 定期的に（一分に一回程度？)APIに接続して、新着の作品があるか確認
4. 新着プロジェクトが存在したら、画面に追加

### 引数
|param|type|comment|
|--|--|--|
| studioid| int||
|autoreload|bool||
|reloadsec|int| |
|callback|text|call back function name|


| 横幅サイズ| int ||



