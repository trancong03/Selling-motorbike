import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .user import authenticate_token
from ..services.post_service import PostService

def get_all_bai_viet(request):
    query_result = PostService.get_all_bai_viet()
    if query_result and isinstance(query_result, list):
        json_data = query_result[0].get('', '')
        if json_data:
            try:
                parsed_result = json.loads(json_data)
                return JsonResponse(parsed_result, safe=False)
            except json.JSONDecodeError:
                return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
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

            # Xử lý danh sách tệp hình ảnh
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
