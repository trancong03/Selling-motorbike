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
    # Replace newline and form feed characters with space
    text = text.replace("\n", " ").replace("\f", " ")
    # Use regular expression to remove any non-alphanumeric characters (except space, periods, and slashes)
    cleaned_text = re.sub(r'[^\w\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÊÔƯéăâôêđ/.]', '', text)
    # Remove underscores
    cleaned_text = cleaned_text.replace('_', '')
    # Replace multiple spaces with a single space
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
def scan_cccd(request):
    if 'file' not in request.FILES:
        return JsonResponse({"error": "Không có tệp nào"}, status=400)

    file = request.FILES['file']

    if file.name == '':
        return JsonResponse({"error": "Chưa chọn tệp"}, status=400)

    try:
        # Đọc hình ảnh từ tệp
        img_array = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        if img is None:
            return JsonResponse({"error": "Định dạng hình ảnh không hợp lệ"}, status=400)

        # Lấy kích thước ảnh
        rows, cols, _ = img.shape

        # Các thông số cắt
        row_id = int(0.41 * rows)
        col_id = int(0.30 * cols)

        row_name = int(0.54 * rows)
        col_name = int(0.30 * cols)

        row_gender = int(0.65 * rows)
        col_gender = int(0.46 * cols)

        row_birth = int(0.605 * rows)
        col_birth = int(0.56 * cols)

        row_nation = int(0.65 * rows)
        col_nation = int(cols* 0.8)

        row_countryside = int(rows* 0.765)
        col_countryside = int(cols* 0.3)

        row_address_lineFirst = int(rows*0.82)
        col_address_lineFirst = int(cols*0.66)

        row_address_lineSecond = int(rows*0.82)
        col_address_lineSecond = int(cols*0.31)

        # Vùng cắt ảnh
        cut_img_id = img[row_id:rows-int(rows*0.5), col_id+int(cols*0.1):cols-int(cols*0.25)]
        cut_img_name = img[row_name:rows-int(rows*0.39), col_name:cols-int(cols*0.3)]
        cut_img_gender = img[row_gender:rows-int(rows*0.28), col_gender:cols-int(cols*0.44)]
        cut_img_birth = img[row_birth:rows-int(rows*0.33), col_birth:cols-int(cols*0.25)]
        cut_img_nation = img[row_nation:rows-int(rows*0.29), col_nation:cols-int(cols*0.05)]
        cut_img_countryside = img[row_countryside:rows-int(rows*0.17), col_countryside:cols-int(cols*0.25)]
        cut_img_address_lineFirst = img[row_address_lineFirst:rows-int(rows*0.12), col_address_lineFirst:cols-int(cols*0.1)]
        cut_img_address_lineSecond = img[row_address_lineSecond+int(rows*0.05):rows-int(rows*0.05), col_address_lineSecond:cols-int(cols*0.1)]

        # Xử lý OCR
        id_text = extract_text_from_image(cut_img_id)
        name_text = extract_text_from_image(cut_img_name)
        gender_text = extract_text_from_image(cut_img_gender)
        birth_text = extract_text_from_image(cut_img_birth)
        nation_text = extract_text_from_image(cut_img_nation)
        countryside_text = extract_text_from_image(cut_img_countryside)
        address_text = (
            extract_text_from_image(cut_img_address_lineFirst) + " " + extract_text_from_image(cut_img_address_lineSecond)
        )

        # Kết quả dạng JSON
        result = {
            "ID": id_text.strip(),
            "Name": name_text.strip(),
            "Gender": gender_text.strip(),
            "Birth": birth_text.strip(),
            "Nation": nation_text.strip(),
            "Countryside": countryside_text.strip(),
            "Address": address_text.strip(),
        }
        # Kiểm tra nếu không trích xuất được thông tin
        if not any(result.values()):
            return JsonResponse({"error": "Không tìm thấy thông tin từ ảnh"}, status=400)

        return JsonResponse(result)

    except Exception as e:
        print(f"Lỗi khi xử lý hình ảnh: {str(e)}")
        return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)