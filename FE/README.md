# **🛍️ Xây dựng hệ thống bán hàng thời trang**

**Mô tả:**  
Dự án xây dựng hệ thống quản lý bán hàng thời trang, áp dụng AI để gợi ý sản phẩm khi người dùng đặt hàng và phân cụm khách hàng để tặng khuyến mãi. Hệ thống bao gồm 2 nền tảng chính là WebForm (ReactJS & NodeJS) và WinForm (C#).

## **👨‍👩‍👧‍👦 Thành viên nhóm**

| Thành viên         | Vai trò          |
|--------------------|------------------|
| Trần Chí Công      | Nhóm trưởng      |
| Phạm Hồ Đăng Huy   | Thành viên       |
| Nguyễn Thị Hằng    | Thành viên       |
## **Bảng Phân Công**
[Bảng Phân Công](https://docs.google.com/spreadsheets/d/1jtM330Zux9Ye9YqD2P0_VuIq3OYpNKtii_JnZz_bvGw/edit?usp=sharing)

## **🛠️ Công nghệ sử dụng**

- **🗄️ Database:** Neo4j
- **💻 WebForm:**
  - **Frontend:** ReactJS
  - **Backend:** NodeJS
- **🖥️ WinForm:** C#
- **🤖 AI:** K-Means clustering

## **📋 Mô tả nền tảng**

### **1. WinForm (C#)**

| Chức năng               | Mô tả chức năng                                                                 | Người thực hiện     |
|-------------------------|---------------------------------------------------------------------------------|---------------------|
| Quản lý sản phẩm         | Thêm, sửa, xóa và quản lý thông tin sản phẩm                                     | Trần Chí Công        |
| Quản lý nhà cung cấp     | Quản lý danh sách nhà cung cấp và lịch sử giao dịch                             | Phạm Hồ Đăng Huy     |
| Quản lý khách hàng       | Quản lý thông tin và phân cụm khách hàng thân thiết (AI - K-Means)              | Nguyễn Thị Hằng      |
| Báo cáo thống kê         | Xây dựng các báo cáo doanh thu, sản phẩm bán chạy, tình hình kho hàng           | Trần Chí Công        |
| Quản lý nhập hàng        | Theo dõi và quản lý quá trình nhập hàng từ nhà cung cấp                         | Nguyễn Thị Hằng      |
| Quản lý hóa đơn          | Tạo, lưu trữ và xuất hóa đơn sau khi khách hàng mua hàng                        | Phạm Hồ Đăng Huy     |
| Quản lý tài khoản        | Quản lý người dùng, phân quyền và bảo mật hệ thống                             | Trần Chí Công        |
| Quản lý khuyến mãi       | Sử dụng AI để phân cụm khách hàng và gợi ý khuyến mãi phù hợp                  | Nguyễn Thị Hằng      |

### **2.🌐 WebForm (ReactJS & NodeJS)**

#### **Frontend (ReactJS)**

| Chức năng               | Mô tả chức năng                                                                 | Người thực hiện     |
|-------------------------|---------------------------------------------------------------------------------|---------------------|
| Đặt sản phẩm             | Người dùng duyệt và đặt mua trực tuyến                                           | Phạm Hồ Đăng Huy     |
| Theo dõi đơn hàng        | Theo dõi trạng thái đơn hàng                                                     | Nguyễn Thị Hằng      |
| Hủy đơn hàng             | Hủy trước khi vận chuyển                                                         | Trần Chí Công        |
| Xem sản phẩm             | AI gợi ý sản phẩm dựa trên lịch sử mua hàng                                      | Phạm Hồ Đăng Huy     |
| Feedback sản phẩm        | Đánh giá và phản hồi sản phẩm                                                    | Nguyễn Thị Hằng      |

#### **Backend (NodeJS)**

| Chức năng               | Mô tả chức năng                                                                 | Người thực hiện     |
|-------------------------|---------------------------------------------------------------------------------|---------------------|
| API                     | Cung cấp các API để kết nối với Frontend và cơ sở dữ liệu                         | Trần Chí Công        |
| Authentication          | Quản lý xác thực và phân quyền người dùng                                        | Phạm Hồ Đăng Huy     |
| Xử lý dữ liệu            | Tương tác với cơ sở dữ liệu Neo4j và xử lý dữ liệu sản phẩm, khách hàng, đơn hàng | Nguyễn Thị Hằng      |

## **📌 Yêu cầu chức năng**

### **WinForm (C#)**
- Quản lý các đối tượng: sản phẩm, nhà cung cấp, khách hàng, khuyến mãi.
- Phân tích và báo cáo dữ liệu doanh thu, sản phẩm.
- Sử dụng K-Means để phân cụm khách hàng.

### **WebForm (ReactJS & NodeJS)**
- Quản lý giao hàng, đặt và theo dõi đơn hàng.
- Gợi ý sản phẩm sử dụng AI.
- Feedback sản phẩm.

## **🚀 Cài đặt**

### **Yêu cầu**

#### **WebForm**
- Node.js 14.x
- ReactJS 17.x
- Neo4j

#### **WinForm**
- .NET Framework 4.8
- Neo4j

### **Cài đặt WebForm**
```bash
```
### **Context Diagram**
![ContextDiagram drawio](https://github.com/user-attachments/assets/14830988-c1a8-4993-abd1-36932b998ad9)
### **Giải thích:**
- **Admin** là người quản trị chính của hệ thống, có thể quản lý sản phẩm, nhà cung cấp, khách hàng, và các khuyến mãi thông qua ứng dụng **WinForm (C#)**.
- **Customer** (khách hàng) sử dụng giao diện **WebForm (ReactJS)** để đặt sản phẩm, theo dõi đơn hàng, hủy đơn hàng, và cung cấp phản hồi về sản phẩm.
- **WinForm (C#)** cho phép Admin thực hiện các chức năng quản lý như quản lý sản phẩm, nhà cung cấp, khách hàng, báo cáo thống kê, hóa đơn, và các khuyến mãi.
- **Backend (NodeJS)** tương tác với cơ sở dữ liệu **Neo4j** để xử lý dữ liệu sản phẩm, khách hàng và đơn hàng. Nó cung cấp các API để frontend **WebForm (ReactJS)** có thể giao tiếp và thực hiện các chức năng như đặt hàng, hủy đơn hàng, và gợi ý sản phẩm bằng AI.
- **Database (Neo4j)** chứa dữ liệu sản phẩm, khách hàng, nhà cung cấp, và hóa đơn.
