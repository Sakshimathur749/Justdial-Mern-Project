

$key = 'f323c0cbfd6ee5cb';

$for = 'badgedownload';
$key = 'f323c0cbfd6ee5cb';

$iv = openssl_random_pseudo_bytes(16);
$encrypted_user_id = openssl_encrypt($currentUserId, 'AES-128-CBC', $key, 0, $iv);
$encrypted_event_id = openssl_encrypt($currentEventId, 'AES-128-CBC', $key, 0, $iv);


$encrypted_user_id = $_GET['pass'];
    $encrypted_event_id = $_GET['ev'];
    $encrypted_for = $_GET['for'];
    $iv = base64_decode($_GET['iv']);
    $redirectUserId = openssl_decrypt($encrypted_user_id, 'AES-128-CBC', $key, 0, $iv);
    $currentEventId = openssl_decrypt($encrypted_event_id, 'AES-128-CBC', $key, 0, $iv);