from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
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
