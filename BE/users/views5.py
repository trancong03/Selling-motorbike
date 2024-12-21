import json
import random
import numpy as np
import cv2
import pytesseract
import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.views.decorators.http import require_POST
from django.conf import settings
from django.core.mail import send_mail

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


def clean_text(text):
    """Làm sạch văn bản, loại bỏ ký tự không mong muốn."""
    text = text.replace("\n", " ").replace("\f", " ")
    cleaned_text = re.sub(r'[^\w\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÊÔƯéăâôêđ/.]', '', text)
    return re.sub(r'\s+', ' ', cleaned_text).strip()


def preprocess_image(img):
    """Xử lý ảnh để cải thiện khả năng nhận diện văn bản."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    _, threshed = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY)
    return threshed

def remove_special_characters(text):
    text = text.replace("\n", " ").replace("\f", " ")
    cleaned_text = re.sub(r'[^\w\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯàáâãèéêìíòóôõùúăđĩũơưĂÊÔƯéăâôêđ.,/]', '', text)
    cleaned_text = cleaned_text.replace('_', '')
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
    return cleaned_text

def extract_text_from_image(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    th, threshed = cv2.threshold(gray, 127, 255, cv2.THRESH_TRUNC)
    text1 = pytesseract.image_to_data(threshed, lang='vie+eng', output_type='data.frame')
    text2 = pytesseract.image_to_string(threshed, lang="vie+eng")
    clean_text = remove_special_characters(text2)
    return clean_text

def crop_and_process(img, row_start, row_end, col_start, col_end):
    cropped_img = img[row_start:row_end, col_start:col_end]
    return extract_text_from_image(cropped_img)


@csrf_exempt
@require_POST
def scan_cccd_back(request):
    if 'file' not in request.FILES:
        return JsonResponse({"error": "Không có tệp nào"}, status=400)

    file = request.FILES['file']

    if file.name == '':
        return JsonResponse({"error": "Chưa chọn tệp"}, status=400)

    try:
        # Đọc hình ảnh từ tệp
        img_array = np.frombuffer(file.read(), np.uint8)
        img_ms = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        if img_ms is None:
            return JsonResponse({"error": "Định dạng hình ảnh không hợp lệ"}, status=400)

        # Lấy kích thước ảnh
        rows_ms, cols_ms, _ = img_ms.shape

        # Các thông số cắt
        row_date = int(rows_ms*0.1)
        col_date = int(cols_ms*0.41)

        # Vùng cắt ảnh
        cut_img_date = img_ms[row_date+int(rows_ms*0.05):rows_ms-int(rows_ms*0.785), col_date-int(cols_ms*0.01):cols_ms-int(cols_ms*0.46)]

        # Xử lý OCR
        date_text = extract_text_from_image(cut_img_date)

        # Chỉ giữ lại các chữ số
        digits_only = re.sub(r'\D', '', date_text)

        # Định dạng ngày (giả sử ngày theo định dạng DDMMYYYY)
        if len(digits_only) == 8:  # Đảm bảo đủ 8 chữ số
            formatted_date = f"{digits_only[:2]}/{digits_only[2:4]}/{digits_only[4:]}"
        else:
            formatted_date = "Không thể định dạng ngày"
        # Kết quả dạng JSON
        result = {
            "Date": formatted_date,
        }
        # Kiểm tra nếu không trích xuất được thông tin
        if not any(result.values()):
            return JsonResponse({"error": "Không tìm thấy thông tin từ ảnh"}, status=400)

        return JsonResponse(result)

    except Exception as e:
        print(f"Lỗi khi xử lý hình ảnh: {str(e)}")
        return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)