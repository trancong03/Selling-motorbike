from django.http import JsonResponse
import json
import uuid
import requests
import hmac
import hashlib
from django.views.decorators.csrf import csrf_exempt
from CustomAdmin.models import NguoiDung, NapTienTaiKhoan
import logging
import datetime

logger = logging.getLogger(__name__)
@csrf_exempt
def create_payment(request):
    # MoMo configuration
    endpoint = "https://test-payment.momo.vn/v2/gateway/api/create"
    partnerCode = "MOMO"
    accessKey = "F8BBA842ECF85"
    secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
    orderInfo = "Nap tien vao tai khoan"
    redirectUrl = "http://localhost:5173/payment-result"
    ipnUrl = "https://d3ed-101-53-36-58.ngrok-free.app/payment/ipn/"
    requestType = "captureWallet"
    extraData = ""

    try:
        # Get 'amount' and 'user_id' from request
        data = json.loads(request.body.decode('utf-8'))
        logger.info(f"IPN Payload: {data}")
        amount = data.get('amount')
        user_id = data.get('user_id')  # Lấy user_id từ payload

        # Validate amount
        if not amount or not str(amount).isdigit() or int(amount) <= 0:
            return JsonResponse({'error': 'Invalid amount'}, status=400)

        # Generate unique IDs for order
        orderId = str(uuid.uuid4())
        requestId = str(uuid.uuid4())

        # Create raw signature
        rawSignature = f"accessKey={accessKey}&amount={amount}&extraData={user_id}&ipnUrl={ipnUrl}&orderId={orderId}&orderInfo={orderInfo}&partnerCode={partnerCode}&redirectUrl={redirectUrl}&requestId={requestId}&requestType={requestType}"
        h = hmac.new(bytes(secretKey, 'ascii'), bytes(rawSignature, 'ascii'), hashlib.sha256)
        signature = h.hexdigest()

        # Prepare data for API request
        data = {
            'partnerCode': partnerCode,
            'partnerName': "Test",
            'storeId': "MomoTestStore",
            'requestId': requestId,
            'amount': amount,
            'orderId': orderId,
            'orderInfo': orderInfo,
            'redirectUrl': redirectUrl,
            'ipnUrl': ipnUrl,
            'lang': "vi",
            'extraData': user_id,  # Truyền user_id vào extraData
            'requestType': requestType,
            'signature': signature
        }

        # Send request to MoMo API
        response = requests.post(endpoint, data=json.dumps(data), headers={'Content-Type': 'application/json'})

        # Return response from MoMo
        return JsonResponse(response.json())

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid request format'}, status=400)
    except Exception as e:
        logger.error(f"IPN Error: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def payment_ipn(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        
        # Lấy thông tin từ IPN
        resultCode = data.get('resultCode')  # Kết quả thanh toán
        amount = int(data.get('amount'))
        user_id = int(data.get('extraData'))  # Lấy user_id từ extraData
        orderId = data.get('orderId')
        print(resultCode)
        print(amount)
        if resultCode == 0:  # Thanh toán thành công
            # Lấy người dùng
            user = NguoiDung.objects.get(iduser=user_id)
            user.balance = (user.balance or 0) + amount  # Cộng thêm số dư
            user.save()
            print(user.balance)
            # Lưu lịch sử nạp tiền
            NapTienTaiKhoan.objects.create(
                manguoidung=user,
                sotiennap=amount,
                magiaodich=orderId,
                thoigiannap=datetime.datetime.now()
            )

            return JsonResponse({'message': 'Cập nhật số dư thành công.'})
        else:
            return JsonResponse({'error': 'Thanh toán không thành công.'}, status=400)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)