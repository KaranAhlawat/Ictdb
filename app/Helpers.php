<?php

namespace App;

use Illuminate\Support\Str;

class Helpers
{
    public const BASE_YT_IMG_URL = 'https://img.youtube.com';

    public static function create_thumbnail_url(string $link): string
    {
        if (! Str::contains($link, ['youtube', 'youtu.be'], true)) {
            return self::BASE_YT_IMG_URL;
        }

        $parsed_url = parse_url($link);

        $params = [];

        if (isset($parsed_url['query'])) {
            parse_str($parsed_url['query'], $params);
        }

        if (isset($params['v'])) {
            $video_id = $params['v'];
        } else {
            $path = $parsed_url['path'] ?? '';
            $segments = array_filter(explode('/', $path));
            $video_id = end($segments);
        }

        if (empty($video_id)) {
            return self::BASE_YT_IMG_URL;
        }

        return self::BASE_YT_IMG_URL."/vi/{$video_id}";
    }

    public static function error_flash(string $message)
    {
        return ['message' => $message, 'type' => 'error'];
    }

    public static function success_flash(string $message)
    {
        return ['message' => $message, 'type' => 'success'];
    }

    public static function info_flash(string $message)
    {
        return ['message' => $message, 'type' => 'info'];
    }
}
