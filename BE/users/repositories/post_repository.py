import logging
from ..utils.db import execute_query

class PostRepository:
    @staticmethod
    def get_all_bai_viet():
        query = """
        SELECT dbo.LayDanhSachBaiViet()
        """
        try:
            # Execute the query and retrieve results
            query_result = execute_query(query)
            
            # Check if the result is valid
            if query_result and isinstance(query_result, list):
                return query_result
            else:
                return None  # If no valid result found
        
        except Exception as e:
            # Log the error for debugging purposes
            logging.error(f"Error while fetching bai viet: {e}")
            return None
