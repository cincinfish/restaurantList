# Restaurant List
![image](https://raw.githubusercontent.com/cincinfish/restaurantList/master/views/picture/restaurantdemo1.png)
1. 使用者可以在首頁查看所有餐廳與它們的簡單資料，包括：餐廳照片、餐廳名稱、餐廳分類、餐廳評分
2. 使用者可以點擊餐廳查看餐廳詳細資訊，包括：類別、地址、電話、描述、圖片
3. 使用者可以透過搜尋餐廳中文名稱、英文名稱與餐廳類別來找到特定的餐廳，並可用逗號(,)分隔一次搜尋多筆
4. 使用者在首頁點擊 可以新增一家餐廳
5. 使用者在點擊餐廳下的Edit編輯一家餐廳資料
5. 使用者在點擊餐廳下的Delete刪除一家餐廳

# 軟體及模組版本
- nvm 1.1.9
- Node.js 16.15.0
- Express: 8.5.5
- Express-handlebars: 8.5.5
- Nodemon 2.0.16
- Bootstrap 5.1.3
- popper 2.9.1
- Font-awesome: 6.1.1
- body-parser: 1.20.0

# 安裝與下載
安裝nvm

下載至本地指定資料夾
```
git clone https://github.com/cincinfish/restaurantList
```
開啟終端機(Terminal)，進入專案資料
```
cd ../restaurantList
```
安裝所有相關套件
```
npm install
```
環境變數
```
set MONGODB_URI = mongodb+srv://使用者密碼@cluster0.3tylo.mongodb.net/restaurant?retryWrites=true&w=majority
```
匯入種子檔案
```
npm run seed
```
輸入nodemon 指令值星執行
```
nodemon app.js
```
終端繫內出現下列訊息表示成功
```
Express is listening on localhost:3000
```
打開瀏覽器輸入下列網址即可查看專案
```
http://localhost:3000
```

