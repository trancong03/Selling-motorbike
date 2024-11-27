from django.http import JsonResponse # type: ignore
from sklearn.tree import DecisionTreeRegressor # ủ
import joblib
import pandas as pd # type: ignore
import json  # To parse JSON data from request
from django.views.decorators.csrf import csrf_exempt
# Load the model and LabelEncoders (Make sure to use raw strings for paths or forward slashes)
try:
    model = joblib.load(r'C:\Users\Admin\Documents\GitHub\Selling-motorbike\BE\media\new_decision_tree_model_1.pkl')
except Exception as e:
    print(f"Error loading model: {e}")
label_encoders = joblib.load(r'C:\Users\Admin\Documents\GitHub\Selling-motorbike\BE\media\new_label_encoders_1.pkl')
@csrf_exempt
def predict_price(request):
    if request.method == 'POST':
        try:
            # In ra request.POST để kiểm tra dữ liệu
            print(request.POST)
            
            # Lấy các giá trị từ request.POST
            brand = request.POST.get('brand')
            model_input = request.POST.get('model')
            color = request.POST.get('color')
            style = request.POST.get('style')
            type_input = request.POST.get('type')

            print(f"Brand: {brand}, Model: {model_input}, Color: {color}, Style: {style}, Type: {type_input}")

            # Kiểm tra xem các tham số có đầy đủ không
            if not all([brand, model_input, color, style, type_input]):
                return JsonResponse({'error': 'Missing required parameters'}, status=400)

            # Mã hóa dữ liệu sử dụng label encoders
            try:
                brand_encoded = label_encoders['Brand'].transform([brand])[0]
                model_encoded = label_encoders['Model'].transform([model_input])[0]
                color_encoded = label_encoders['Color'].transform([color])[0]
                style_encoded = label_encoders['Style'].transform([style])[0]
                type_encoded = label_encoders['Type'].transform([type_input])[0]
            except ValueError as e:
                return JsonResponse({'error': f"Invalid input: {e}"}, status=400)

            # Chuẩn bị dữ liệu cho dự đoán
            new_data = pd.DataFrame({
                'Brand': [brand_encoded],
                'Model': [model_encoded],
                'Color': [color_encoded],
                'Style': [style_encoded],
                'Type': [type_encoded]
            })

            # Dự đoán giá
            predicted_price = model.predict(new_data)[0]
            formatted_price = "{:,.0f}".format(predicted_price)  # Định dạng giá trị dự đoán

            return JsonResponse({'predicted_price': formatted_price})
        
        except Exception as e:
            return JsonResponse({'error': f'Error processing data: {str(e)}'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

