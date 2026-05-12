# 🌿 Website/App Bán Cây Cảnh

## 📌 Tên đề tài
Xây dựng Website/App Bán Cây Cảnh Online

---

# 📖 Giới thiệu website/hệ thống
Hệ thống bán cây cảnh online được xây dựng nhằm hỗ trợ người dùng dễ dàng tìm kiếm, xem thông tin và đặt mua các loại cây cảnh trực tuyến.  

Hệ thống cung cấp các chức năng:
- Đăng ký / đăng nhập tài khoản
- Xem danh sách sản phẩm cây cảnh
- Tìm kiếm sản phẩm
- Xem chi tiết sản phẩm
- Thêm sản phẩm vào giỏ hàng
- Đặt hàng và thanh toán
- Xem được chi tiết đơn hàng đã đặt


Website/App hướng tới giao diện thân thiện, dễ sử dụng và hỗ trợ người dùng mua sắm nhanh chóng.

---

# 👨‍💻 Danh sách thành viên

| Họ và tên | MSSV |

| Ngô Hoàng Long | 23810310184 |

---

# 📋 Phân công nhiệm vụ cụ thể

| Thành viên | Nhiệm vụ |

Ngô Hoàng Long - Đảm nhiệm hết mọi thứ

# ⚙️ Công nghệ sử dụng

## Frontend
- React Native
- Expo
- JavaScript / TypeScript

## Backend
- ASP.NET Core Web API
- Entity Framework Core

## Database
- SQL Server

## Công cụ hỗ trợ
- Visual Studio Code
- Visual Studio 2022
- GitHub
- Postman
- Figma
- Ngrok

---

# 📚 Framework / Thư viện hỗ trợ

| Thư viện / Framework | Chức năng |
|---|---|
| React Navigation | Điều hướng giữa các màn hình |
| Axios | Gọi API từ frontend đến backend |
| AsyncStorage | Lưu trữ dữ liệu cục bộ |
| Expo Vector Icons | Hiển thị icon trong ứng dụng |
| React Native Gesture Handler | Hỗ trợ thao tác vuốt/chạm |
| React Native Reanimated | Hỗ trợ animation |
| Entity Framework Core | Kết nối và thao tác database |
| VNPay Sandbox | Thanh toán trực tuyến |

---

# 🏗️ Kiến trúc hệ thống

Hệ thống được xây dựng theo mô hình Client - Server gồm 3 thành phần chính:

## Frontend (Client)
- Được phát triển bằng React Native và Expo.
- Giao diện chạy trên thiết bị di động Android.
- Người dùng thực hiện các thao tác như đăng nhập, xem sản phẩm, đặt hàng và thanh toán.

## Backend (Server)
- Được xây dựng bằng ASP.NET Core Web API.
- Xử lý logic hệ thống, xác thực người dùng và quản lý dữ liệu.
- Cung cấp API cho frontend thông qua giao thức HTTP.

## Database
- Sử dụng SQL Server để lưu trữ dữ liệu:
  - Người dùng
  - Sản phẩm
  - Đơn hàng
  - Thanh toán
  - Yêu thích

## Kết nối hệ thống
- Frontend giao tiếp với Backend thông qua Axios API.
- Ngrok được sử dụng để public localhost giúp ứng dụng mobile có thể truy cập API khi chạy bằng Expo Go.

# 🛠️ Hướng dẫn cài đặt

## Yêu cầu môi trường
Cần cài đặt các công cụ sau trước khi chạy project:

- Node.js
- Expo CLI
- SQL Server
- Visual Studio 2022 hoặc VS Code
- Git

---

# 📥 Clone project

```bash
git clone https://github.com/Long14516/bonsaiapp.git
```

Di chuyển vào thư mục project:

```bash
cd ten-project
```

---

# ⚙️ Cài đặt Frontend

Cài package:

```bash
npm install
```

---

# 🗄️ Cài đặt Database

- Mở SQL Server
- Tạo database mới:

```sql
CREATE DATABASE bonsaiapp_api
```

- Chạy file SQL được cung cấp để tạo bảng và dữ liệu.

---

# 🔧 Cấu hình Backend

Mở file:

```txt
appsettings.json
```


---

# ▶️ Chạy Backend

Mở project backend và chạy:


Backend sẽ chạy tại:

```txt
https://localhost:5057
```

---

# 🌐 Chạy Ngrok(Cài từ microsoft xong xác minh auth để chạy trên máy)

Mở terminal:

```bash
ngrok http https://localhost:5057
```

Copy link ngrok và thay vào:

```js
const BASE_URL = "https://xxxxx.ngrok-free.app";
```

---

# 📱 Chạy Frontend

Khởi động Expo:

```bash
npm start
```

Sau đó:
- Mở ứng dụng Expo Go trên điện thoại
- Quét QR code để chạy app
- Lưu ý ở phần backend,có phần payment controller link return về e để theo ip v4 của mạng nên ko cố định được nên phải sửa link đó theo ip v4 của mạng

# Hình ảnh minh họa
## Loading
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/1410225f-9fb1-4ab9-9ea5-77e06747bacc" />

 ---
## Splash
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/03e66e38-bb3a-4037-886c-29c89a749ba0" />

---
## Welcome
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/97603431-9031-419e-bfe5-339f75f4029c" />

---
## Login
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/d8cb5061-0c6f-4390-a516-b0f0c2bfc731" />

---
## Register
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/ba1b818c-1f42-4d3a-abbd-944885d986ab" />

---
## Home
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/ae8ed0d4-85cd-4323-805e-fb18332d2e23" />

---
## Giỏ hàng
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/4334da64-9e51-4bbd-800b-1d85a5c237fd" />

---
## Thanh Toán
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/2d73afe9-dd0d-4c7b-9728-aed459782509" />

---
## Thất Bại
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/204b287c-203d-406f-803e-5f0d2b959427" />

---
## Thành công
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/9b63ee43-b656-4479-ac13-23370f166b33" />

---
## Yêu thích
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/5d5d3583-0c95-489e-95cf-91227e93890c" />

---
## Thông Báo
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/8e212341-0712-4063-b344-a41bf8de00e8" />

---
## Profile
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/1a0e118a-4e6c-4e38-b488-375b11b0fae1" />

---
## Chi tiết đơn mua
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/ac2e8387-07b1-4ea9-b8b4-a1aff0e386de" />

---
## Đổi mật khẩu
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/3f39b177-cc83-4bbe-a760-c426a061bc4f" />

---
## Chỉnh sửa profile
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/693a39bd-1904-4637-be6a-e13f09c5b88e" />

---
## Tìm Kiếm
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/7e092e33-0e35-4406-b3bd-f45af992dc5e" />

---
## Chi tiết đơn mua
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/6d26fccf-f9b1-4e32-8f3f-4babdfe58326" />


















