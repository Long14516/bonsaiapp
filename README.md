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
- React Navigation
- Axios

## Backend
- ASP.NET Core Web API(Net 8.0)
- Entity Framework Core

## Database
- SQL Server

## Công cụ hỗ trợ
- Visual Studio Code (font end)
- Visual Studio 2022 (Back-end)
- Postman
- Git & GitHub

---

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

# Hình ảnh minh họa
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/1410225f-9fb1-4ab9-9ea5-77e06747bacc" />
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/03e66e38-bb3a-4037-886c-29c89a749ba0" />
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/97603431-9031-419e-bfe5-339f75f4029c" />
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/d8cb5061-0c6f-4390-a516-b0f0c2bfc731" />
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/ba1b818c-1f42-4d3a-abbd-944885d986ab" />
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/ae8ed0d4-85cd-4323-805e-fb18332d2e23" />
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/4334da64-9e51-4bbd-800b-1d85a5c237fd" />
<img width="869" height="1884" alt="image" src="https://github.com/user-attachments/assets/2d73afe9-dd0d-4c7b-9728-aed459782509" />








