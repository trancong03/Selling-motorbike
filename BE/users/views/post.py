from datetime import datetime, timedelta
from math import ceil
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count
from django.utils import timezone
from users.models import BaiViet, YeuThich,GOIGIAODICH,NguoiDung,NAPGIAHAN,NAPDAYTIN
from django.core.paginator import Paginator
from .user import authenticate_token
from ..services.post_service import PostService
from django.forms.models import model_to_dict
from users.repositories.post_repository import PostRepository
from django.db.models import Q
from django.utils.timezone import now
def get_all_bai_viet(request):
    # Lấy tham số page và limit từ request
    page = int(request.GET.get("page", 1))  # Mặc định page = 1
    limit = int(request.GET.get("limit", 20))  # Mặc định limit = 20
    # Gọi service để lấy dữ liệu phân trang
    query_result = PostRepository.get_all_products(page=page, limit=limit)
    
    if query_result:
        try:
            # Chuyển đổi QuerySet thành danh sách dictionary
            products_list = list(query_result["products"].values())

            # Trả về dữ liệu phân trang
            return JsonResponse({
                "products": products_list,
                "total_count": query_result["total_count"],
                "total_pages": query_result["total_pages"],
                "current_page": query_result["current_page"],
            }, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Failed to decode JSON"}, status=500)
def get_all_product_image_by_id(request,product_id):
    query_result = PostRepository.get_all_product_image_by_id(product_id)
    if query_result:
        # Chuyển đổi queryset thành danh sách dict
        products_list = list(query_result.values())
        try:
            return JsonResponse(products_list, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
def get_user_by_id_post(request,product_id):
    query_result = PostRepository.get_user_by_id_post(product_id)
    if query_result:
        # Chuyển đổi queryset thành danh sách dict
        products_list = list(query_result.values())
        try:
            return JsonResponse(products_list, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
@csrf_exempt
def get_post_by_id(request, id):
    post = PostService.get_post_by_id(id)
    post_dict = model_to_dict(post)
    if not post:
        return JsonResponse({'error': 'User not found'}, status=404)
    return  JsonResponse(post_dict, safe=False, status=200)
def get_all_bai_viet_like(request,iduser):
    query_result = PostService.get_all_bai_viet_like(iduser)
    if query_result and isinstance(query_result, list):
        json_data = query_result[0].get('', '')
        if json_data:
            try:
                parsed_result = json.loads(json_data)
                return JsonResponse(parsed_result, safe=False)
            except json.JSONDecodeError:
                return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
def get_all_bai_viet_by_manguoidung(request,iduser):
    query_result = PostService.get_all_bai_viet_by_manguoidung(iduser)
    if query_result and isinstance(query_result, list):
        json_data = query_result[0].get('', '')
        if json_data:
            try:
                parsed_result = json.loads(json_data)
                return JsonResponse(parsed_result, safe=False)
            except json.JSONDecodeError:
                return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
@csrf_exempt
def tao_bai_viet(request):
    if request.method == 'POST':
        try:
            ma_nguoi_dung = request.POST.get('manguoidung')  # Lấy mã người dùng từ token
            # Lấy các trường văn bản từ request.POST
            ma_gd = request.POST.get('magd')
            tieu_de = request.POST.get('tieuDe')
            thong_tin_lien_lac = request.POST.get('thongTinLienLac')
            mo_ta = request.POST.get('moTa')
            dia_chi_bai_viet = request.POST.get('diaChiBaiViet')
            hang_xe = request.POST.get('hangXe')
            loai_xe = request.POST.get('loaiXe')
            nam_mua = request.POST.get('namMua')
            dung_tich = request.POST.get('dungTich')
            so_km_da_di = request.POST.get('soKmDaDi')
            bao_hanh = request.POST.get('baoHanh')
            xuat_xu = request.POST.get('xuatXu')
            tinh_trang_xe = request.POST.get('tinhTrangXe')
            gia_ban = request.POST.get('giaBan')
            danh_sach_hinh = request.POST.get('danhSachHinh')  # Đây có thể là chuỗi chứa URL hoặc tên hình ảnh
            danh_file_sach_hinh = request.FILES.getlist('danhSachFileHinh')
            if danh_file_sach_hinh:
                image_dir = os.path.join(settings.MEDIA_ROOT, 'images')
                os.makedirs(image_dir, exist_ok=True)
                image_urls = []  
                for image in danh_file_sach_hinh:
                    image_path = os.path.join(image_dir, image.name)
                    fs = FileSystemStorage(location=image_dir)
                    fs.save(image.name, image)
                    image_url = os.path.join(settings.MEDIA_URL, 'images', image.name)
                    image_urls.append(image_url)
           
            # Call the service layer to handle the logic
            result = PostService.tao_bai_viet(
                ma_nguoi_dung, ma_gd, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
                hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh,
                xuat_xu, tinh_trang_xe, gia_ban, danh_sach_hinh
            )
            if result:
                return JsonResponse({'message': 'Bài viết và hình ảnh đã được thêm thành công.'}, status=200)
            else:
                return JsonResponse({'error': 'Lỗi khi tạo bài viết.'}, status=500)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=401)
        except Exception as e:
            return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
    else:
        return JsonResponse({'error': 'Chỉ hỗ trợ phương thức POST.'}, status=405)

@csrf_exempt
def sua_bai_viet(request):
    if request.method == 'POST':
        try:
            ma_bai_viet = request.POST.get('maBaiViet') # Mã bài viết cần chỉnh sửa
            tieu_de = request.POST.get('tieuDe')
            thong_tin_lien_lac = request.POST.get('thongTinLienLac')
            mo_ta = request.POST.get('moTa')
            dia_chi_bai_viet = request.POST.get('diaChiBaiViet')
            hang_xe = request.POST.get('hangXe')
            loai_xe = request.POST.get('loaiXe')
            nam_mua = request.POST.get('namMua')
            dung_tich = request.POST.get('dungTich')
            so_km_da_di = request.POST.get('soKmDaDi')
            bao_hanh = request.POST.get('baoHanh')
            xuat_xu = request.POST.get('xuatXu')
            tinh_trang_xe = request.POST.get('tinhTrangXe')
            gia_ban = request.POST.get('giaBan')
            danh_sach_hinh = request.POST.get('danhSachHinh')  # Đây có thể là chuỗi chứa URL hoặc tên hình ảnh
            # Xử lý danh sách tệp hình ảnh (nếu có)
            danh_file_sach_hinh = request.FILES.getlist('danhSachFileHinh')
            image_urls = []  # Danh sách chứa URL các hình ảnh mới
            if danh_file_sach_hinh:
                image_dir = os.path.join(settings.MEDIA_ROOT, 'images')
                os.makedirs(image_dir, exist_ok=True)
                for image in danh_file_sach_hinh:
                    image_path = os.path.join(image_dir, image.name)
                    fs = FileSystemStorage(location=image_dir)
                    fs.save(image.name, image)
                    image_url = os.path.join(settings.MEDIA_URL, 'images', image.name)
                    image_urls.append(image_url)

            # Call the service layer to handle the logic
            result = PostService.sua_bai_viet(
                ma_bai_viet, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
                hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh, xuat_xu, tinh_trang_xe, gia_ban,
                danh_sach_hinh, 
            )
            if result:
                return JsonResponse({'message': 'Bài viết đã được cập nhật thành công.'}, status=200)
            else:
                return JsonResponse({'error': 'Lỗi khi chỉnh sửa bài viết.'}, status=500)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=401)
        except Exception as e:
            return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
    else:
        return JsonResponse({'error': 'Chỉ hỗ trợ phương thức PATCH.'}, status=405)
@csrf_exempt
def xoa_bai_viet(request, id):
    post = PostService.xoa_bai_viet(id)
    if not post:
        return JsonResponse({'error': 'Post not found'}, status=404)
    return  JsonResponse({"message":"delete post successful"}, status=200)
@csrf_exempt
def them_yeu_thich(request):
    if request.method == 'POST':
        try:
            # Lấy dữ liệu từ FormData
            ma_nguoi_dung = request.POST.get('manguoidung')
            ma_bai_viet = request.POST.get('maBaiViet')

            # Kiểm tra tham số bắt buộc
            if not ma_nguoi_dung or not ma_bai_viet:
                return JsonResponse({'error': 'Thiếu mã người dùng hoặc mã bài viết.'}, status=400)

            # Gọi service xử lý logic
            result = PostService.them_yeu_thich(ma_nguoi_dung, ma_bai_viet)
            return JsonResponse({'message': 'Thêm vào danh sách yêu thích thành công.', 'result': result}, status=200)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=401)
        except Exception as e:
            return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
    else:
        return JsonResponse({'error': 'Chỉ hỗ trợ phương thức POST.'}, status=405)
@csrf_exempt
def xoa_yeu_thich(request):
    if request.method == 'POST':
        try:
            ma_nguoi_dung = request.POST.get('manguoidung') 
            ma_bai_viet = request.POST.get('maBaiViet') # Mã bài viết cần chỉnh sửa
            result = PostService.xoa_yeu_thich(ma_nguoi_dung,ma_bai_viet)
            if result:  # Giả sử result là giá trị True hoặc False hoặc một đối tượng
                return JsonResponse({'message': 'Xóa yêu thích thành công.'}, status=200)
            else:
                return JsonResponse({'error': 'Không tìm thấy dữ liệu để xóa.'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=401)
        except Exception as e:
            return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
    else:
        return JsonResponse({'error': 'Chỉ hỗ trợ phương thức POST.'}, status=405)
@csrf_exempt
def kiem_tra_yeu_thich(request):
    if request.method == 'POST':
        try:
            ma_nguoi_dung = request.POST.get('manguoidung') 
            ma_bai_viet = request.POST.get('maBaiViet') 
            result = PostService.kiem_tra_yeu_thich(ma_nguoi_dung,ma_bai_viet)
            return JsonResponse({'isFavorite': result}, status=200)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=401)
        except Exception as e:
            return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
    else:
        return JsonResponse({'error': 'Chỉ hỗ trợ phương thức POST.'}, status=405)
@csrf_exempt
def lay_list_yeu_thich(request, iduser):
    if request.method == 'GET':
        result = PostService.lay_list_yeu_thich(iduser)
        return JsonResponse({'favorites': result}, status=200)
    return JsonResponse({'error': 'Chỉ hỗ trợ phương thức GET.'}, status=405)
def get_top_10_favorite_products(request):
        try:
            favorite_counts = YeuThich.objects.values('mabaiviet') \
                .annotate(favorite_count=Count('mabaiviet')) \
                .order_by('-favorite_count')[:10]  # Giới hạn lấy 10 sản phẩm yêu thích nhất
            top_10_favorite_products = []
            for item in favorite_counts:
                product_id = item['mabaiviet']
                try:
                    product = BaiViet.objects.get(mabaiviet=product_id)
                    product_data = model_to_dict(product)
                    product_data['favorite_count'] = item['favorite_count']  # Thêm số lượng yêu thích vào thông tin sản phẩm
                    top_10_favorite_products.append(product_data)
                except BaiViet.DoesNotExist:
                    continue
            return JsonResponse({"data": top_10_favorite_products}, safe=False, status=200)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
        
def get_top_100_baiviet(request):
    page = int(request.GET.get('page', 1))  # Trang hiện tại
    limit = int(request.GET.get('limit', 2))  # Số lượng bài viết mỗi trang
    # Lấy tất cả bài viết và sắp xếp giảm dần theo giatri
    queryset = BaiViet.objects.order_by('-giatri')
    # Phân trang
    offset = (page - 1) * limit
    products = BaiViet.objects.all()[offset:offset + limit]  # Lấy sản phẩm theo page và limit
    total_count = BaiViet.objects.count()  # Tổng số sản phẩm
    # Chuẩn bị dữ liệu trả về
    result = []
    for index, baiviet in enumerate(products):
        baiviet = model_to_dict(baiviet)
        result.append({
            'top': index+ page*limit -1,
            'baiviet': baiviet,
        })

    return JsonResponse({
        'products': result,
        'total_count': total_count,
        'total_pages': ceil(total_count / limit),
        'current_page': page
    }, safe=False)

def get_gia_tri_day_top(request):
    try:
        top = int(request.GET.get('top', 1))  # Default is 1 if not provided
        mabaiviet = request.GET.get('mabaiviet', None)
        if top <= 0:
            return JsonResponse({'error': 'Thứ hạng phải lớn hơn 0'}, status=400)
        baiviet = BaiViet.objects.get(mabaiviet=mabaiviet)  # Attempt to get the bài viết
        queryset = BaiViet.objects.order_by('-giatri')
        if top > queryset.count():
            return JsonResponse({'error': 'Thứ hạng vượt quá số lượng bài viết'}, status=400)
        target_baiviet = queryset[top - 1]  # top 1 corresponds to index 0
        target_giatri = target_baiviet.giatri  # Giá trị bài viết tại vị trí `top`

        required_value = target_giatri + 10000 - baiviet.giatri
        response_data = {
            'top': top,
            'required_value': required_value,
        }
        return JsonResponse(response_data, status=200)
    except ValueError:
        return JsonResponse({'error': 'Tham số top không hợp lệ'}, status=400)
    except BaiViet.DoesNotExist:
        return JsonResponse({'error': 'Không tìm thấy bài viết'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

   
@csrf_exempt
def search_products(request):
    query = request.GET.get('q', '')  # Get the search query from the request
    filter_conditions = Q()
    if query:
        keywords = query.split()
        for keyword in keywords:
            filter_conditions |= Q(tieude__icontains=keyword) | Q(hangxe__icontains=keyword) | Q(dungtich__icontains=keyword)
    products = BaiViet.objects.filter(filter_conditions)[:20]
    products_list = list(products.values())  # Convert the query results to a list
    return JsonResponse(products_list, safe=False)
def get_all_giao_dich(request):
    try:
        query_result = list(GOIGIAODICH.objects.values())  # Chuyển đổi thành list và lấy dữ liệu bằng values()
        return JsonResponse(query_result, safe=False)  # Trả về dữ liệu dưới dạng JSON
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def get_gia_tri_day_top(request):
    try:
        mabaiviet = request.GET.get('mabaiviet', None)
        top = int(request.GET.get('top', 1))
        if not mabaiviet:
            return JsonResponse({'error': 'Mã bài viết không hợp lệ'}, status=400)
        if top <= 0:
            return JsonResponse({'error': 'Thứ hạng phải lớn hơn 0'}, status=400)
        baiviet = BaiViet.objects.get(mabaiviet=mabaiviet)  # Attempt to get the bài viết
        queryset = BaiViet.objects.order_by('-giatri')

        # Calculate rank of the specific bài viết
        current_top = list(queryset).index(baiviet) + 1  # top 1 corresponds to index 0

        if top >= current_top:
            return JsonResponse({'error': 'Thứ hạng không nên'}, status=400)
        target_baiviet = queryset[top - 1]  # top 1 corresponds to index 0
        target_giatri = target_baiviet.giatri  # Giá trị bài viết tại vị trí `top`

        required_value = target_giatri + 10000 - baiviet.giatri
        response_data = {
            'current_top': current_top,
            'required_value': required_value,
        }
        return JsonResponse(response_data, status=200)

    except ValueError:
        return JsonResponse({'error': 'Tham số top không hợp lệ'}, status=400)
    except BaiViet.DoesNotExist:
        return JsonResponse({'error': 'Không tìm thấy bài viết'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



@csrf_exempt
def day_tin(request):
    try:
        if request.method != 'POST':
            return JsonResponse({"error": "Phương thức không hợp lệ. Chỉ chấp nhận POST."}, status=405)

        # Parse JSON data from request body
        data = json.loads(request.body.decode('utf-8'))
        manguoidung = data.get('MANGUOIDUNG')
        maloaigiaodich = data.get('MALOAIGIAODICH')
        mabaiviet = data.get('MABAIVIET')

        # Validate required fields
        if not all([manguoidung, maloaigiaodich, mabaiviet]):
            return JsonResponse({"error": "Thiếu dữ liệu đầu vào. Vui lòng cung cấp đầy đủ thông tin."}, status=400)

        # Fetch user
        try:
            nguoidung = NguoiDung.objects.get(manguoidung=manguoidung)
        except NguoiDung.DoesNotExist:
            return JsonResponse({"error": "Người dùng không tồn tại."}, status=404)

        # Fetch package information
        try:
            goigiaodich = GOIGIAODICH.objects.get(MALOAIGIAODICH=maloaigiaodich)
            sotien = float(goigiaodich.SOTIEN)  # Lấy số tiền từ gói giao dịch
        except GOIGIAODICH.DoesNotExist:
            return JsonResponse({"error": "Mã loại giao dịch không hợp lệ."}, status=404)

        # Ensure user's balance is a float
        nguoidung_sodu = float(nguoidung.sodu)

        # Check sufficient balance
        if nguoidung_sodu < sotien:
            return JsonResponse({"error": "Số dư không đủ để thực hiện giao dịch."}, status=400)

        # Deduct money from user account
        nguoidung_sodu -= sotien
        nguoidung.sodu = nguoidung_sodu
        nguoidung.save()

        
        # Record transaction
        ngay_hien_tai = now().date()
        giao_dich = NAPGIAHAN.objects.create(
            MALOAIGIAODICH=maloaigiaodich,
            MANGUOIDUNG=manguoidung,
            MABAIVIET=mabaiviet,
            SOTIEN=str(sotien),
            NGAYGIAODICH=ngay_hien_tai,
        )
        try:
            baiviet = BaiViet.objects.get(mabaiviet=mabaiviet)  # Kiểm tra bài viết bằng khóa chính
            ngay_hien_tai = now().date()
            ngay_het_han = ngay_hien_tai + timedelta(days=goigiaodich.SONGAY)
            BaiViet.objects.filter(mabaiviet=mabaiviet).update(ngayhethan=ngay_het_han)
        except BaiViet.DoesNotExist:
            return JsonResponse({"error": "Bài viết không tồn tại."}, status=404)
        
        return JsonResponse({
            "message": "Đẩy tin thành công."
        }, status=200)
    except Exception as e:
        return JsonResponse({"error": f"Lỗi hệ thống: {str(e)}"}, status=500)
@csrf_exempt
def get_favorite_products(request, username):
    try:
        # Lấy tất cả các đối tượng FavoriteProduct của người dùng
        favorite_products = YeuThich.objects.filter(manguoidung=username)

        # Kiểm tra nếu không có sản phẩm yêu thích nào
        if not favorite_products.exists():
            return JsonResponse({"data": []}, status=200)  # Trả về danh sách rỗng nếu không có sản phẩm yêu thích

        # Tạo danh sách chứa các sản phẩm yêu thích
        products_list = []
        for favorite in favorite_products:
            product_id = favorite.mabaiviet  # Truy cập sản phẩm yêu thích qua trường product
            if product_id:  # Kiểm tra nếu sản phẩm tồn tại
                try:
                    # Lấy thông tin sản phẩm
                    product = BaiViet.objects.get(mabaiviet=product_id)
                    # Chuyển đối tượng Product thành dictionary chứa tất cả các thuộc tính
                    product_data = model_to_dict(product)
                    products_list.append(product_data)
                except BaiViet.DoesNotExist:
                    # Nếu sản phẩm không tồn tại, bỏ qua
                    continue
        return JsonResponse({"data": products_list}, safe=False, status=200)
    except Exception as e:
        # Xử lý lỗi chung
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

@csrf_exempt
def toggle_favorite(request, username, product_id):
    try:
        # Kiểm tra xem sản phẩm có tồn tại không
        favorite = YeuThich.objects.filter(manguoidung=username, mabaiviet=product_id)

        if favorite.exists():
            # Nếu sản phẩm đã có trong danh sách yêu thích, xóa nó
            favorite.delete()
            return JsonResponse({"message": "Product removed from favorites."}, status=200)
        else:
            # Nếu sản phẩm chưa có trong danh sách yêu thích, thêm nó
            YeuThich.objects.create(manguoidung=username, mabaiviet=product_id)
            return JsonResponse({"message": "Product added to favorites."}, status=200)

    except YeuThich.DoesNotExist:
        return JsonResponse({"error": "Product not found."}, status=404)
    except Exception as e:
        # Xử lý lỗi chung
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
@csrf_exempt
def day_top(request):
    try:
        if request.method != 'POST':
            return JsonResponse({"error": "Phương thức không hợp lệ. Chỉ chấp nhận POST."}, status=405)

        # Parse JSON data
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu JSON không hợp lệ."}, status=400)
        # Lấy dữ liệu đầu vào
        mabaiviet = data.get('mabaiviet')
        top = int(data.get('top'))
        print(mabaiviet, top)
        # Kiểm tra dữ liệu đầu vào
        if not all([mabaiviet, top]):
            return JsonResponse({"error": "Thiếu dữ liệu đầu vào. Vui lòng cung cấp đầy đủ thông tin."}, status=400)
        # Fetch bài viết cần đẩy
        baiviet = BaiViet.objects.filter(mabaiviet=mabaiviet).first()
        if not baiviet:
            return JsonResponse({"error": "Bài viết không tồn tại."}, status=404)
        manguoidung = baiviet.manguoidung
        # Fetch user
        nguoidung = NguoiDung.objects.filter(manguoidung=manguoidung).first()
        if not nguoidung:
            return JsonResponse({"error": "Người dùng không tồn tại."}, status=404)

        # Lấy bài viết tại vị trí top yêu cầu
        queryset = BaiViet.objects.order_by('-giatri')
        try:
            if top > queryset.count():  # Cần kiểm tra top có phải là số nguyên
                return JsonResponse({"error": "Top yêu cầu vượt quá số lượng bài viết hiện tại."}, status=400)
        except ValueError:
            return JsonResponse({"error": "Vị trí top không hợp lệ."}, status=400)
        baiviet_top = queryset[top - 1]  # Bài viết tại vị trí top
        giatri_can_top = baiviet_top.giatri + 10000  # Giá trị cần để đẩy lên top
        sotien_can_nap = giatri_can_top - baiviet.giatri  # Số tiền cần để đẩy top

        # Kiểm tra số dư
        if nguoidung.sodu < sotien_can_nap:
            return JsonResponse({"error": "Số dư không đủ để thực hiện giao dịch."}, status=400)

        # Trừ số dư của người dùng
        nguoidung.sodu -= sotien_can_nap
        nguoidung.save()

        # Cập nhật giá trị bài viết
        try:
            baiviet = BaiViet.objects.get(mabaiviet=mabaiviet)  # Kiểm tra bài viết bằng khóa chính
            BaiViet.objects.filter(mabaiviet=mabaiviet).update(giatri=giatri_can_top)
        except BaiViet.DoesNotExist:
            return JsonResponse({"error": "Bài viết không tồn tại."}, status=404)

        # Ghi nhận giao dịch
        ngay_giao_dich = now()
        NAPDAYTIN.objects.create(
            MANGUOIDUNG=manguoidung,
            MABAIVIET=mabaiviet,
            NGAY=ngay_giao_dich,
        )

        return JsonResponse({
            "message": "Đẩy bài viết lên top thành công.",
            "giatri_moi": giatri_can_top,
            "sodu_moi": nguoidung.sodu
        }, status=200)

    except Exception as e:
        return JsonResponse({"error": f"Lỗi hệ thống: {str(e)}"}, status=500)
