<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function showImage($imageName)
    {
        // Get the path to the image in the storage directory
        $imagePath = storage_path('app/public/' . $imageName);

        // Check if the image file exists
        if (!file_exists($imagePath)) {
            abort(404);
        }

        // Get the image MIME type (e.g., image/jpeg)
        $mimeType = mime_content_type($imagePath);

        // Set the response headers
        $headers = [
            'Content-Type' => $mimeType,
        ];

        // Return the image as a response
        return response()->file($imagePath, $headers);
    }
}
