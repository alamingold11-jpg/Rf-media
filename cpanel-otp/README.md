# বাংলাদেশের জন্য রিয়েল SMS OTP সেটআপ গাইড (cPanel PHP)

বাংলাদেশ (`+880`) থেকে নতুন ইউজার রেজিস্ট্রেশনের সময় আসল SMS OTP পাঠাতে ও যাচাই করতে এই ফোল্ডারটি আপনার cPanel হোস্টিংয়ে আপলোড করুন।

## ফাইলসমূহ
1. `config.php` — আপনার বাংলাদেশের SMS Gateway API Key, Sender ID ও নিরাপত্তা কনফিগারেশন।
2. `send_otp.php` — রেজিস্ট্রেশন পেজ থেকে রিয়েল ৬-ডিজিটের OTP SMS পাঠায় (৬০ সেকেন্ড কুলডাউন ও ঘণ্টায় লিমিটসহ)।
3. `verify_otp.php` — ইউজারের লেখা OTP কোড সার্ভারে যাচাই করে (সর্বোচ্চ ৫ বার চেষ্টা ও ১ বার ব্যবহারযোগ্য)।
4. `.htaccess` — `otp_store.json` ও সিক্রেট ফাইল সরাসরি ডাউনলোড থেকে সুরক্ষিত রাখে।

## ধাপ ১: cPanel-এ আপলোড করুন
1. আপনার cPanel **File Manager**-এ প্রবেশ করুন।
2. `public_html/` এর ভেতরে `otp` নামে একটি ফোল্ডার তৈরি করুন (অর্থাৎ `public_html/otp/`)।
3. `cpanel-otp/` ফোল্ডারের সব ফাইল (`config.php`, `send_otp.php`, `verify_otp.php`, `.htaccess`) সেখানে আপলোড করুন।

## ধাপ ২: আপনার SMS Gateway API Key বসান
`public_html/otp/config.php` ফাইলটি Edit করুন:

```php
define('SMS_PROVIDER', 'bulksmsbd'); // bulksmsbd | greenweb | mimsms | elitbuzz | sslwireless | custom
define('SMS_API_KEY', 'আপনার-আসল-API-Key');
define('SMS_SENDER_ID', 'আপনার-Sender-ID'); // যেমন: 8809617613541 বা Random
define('SMS_BRAND_NAME', 'PW Platform');
```

### সাপোর্টেড বাংলাদেশি SMS গেটওয়ে:
- **BulkSMSBD** (`bulksmsbd`) — `SMS_API_KEY` + `SMS_SENDER_ID`
- **GreenWeb BD** (`greenweb`) — `SMS_API_KEY` (GreenWeb Token)
- **MimSMS** (`mimsms`) — `SMS_USERNAME` + `SMS_API_KEY` + `SMS_SENDER_ID`
- **Elitbuzz** (`elitbuzz`) — `SMS_API_KEY` + `SMS_SENDER_ID`
- **SSLWireless** (`sslwireless`) — `SMS_API_KEY` (API Token) + `SMS_SENDER_ID` (SID)
- **Custom API** (`custom`) — যেকোনো SMS কোম্পানির URL টেমপ্লেট (`SMS_CUSTOM_URL`)

## ধাপ ৩: Admin Panel থেকে সংযুক্ত করুন
- যদি আপনার মূল ওয়েবসাইট ও `/otp/` একই cPanel ডোমেইনে থাকে, তাহলে সিস্টেম সরাসরি `/otp/` ব্যবহার করতে পারবে।
- আলাদা হোস্টিং/ডোমেইনে থাকলে Admin Panel -> **Platform Rules** -> **cPanel OTP Endpoint URL** ঘরে `https://yourdomain.com/otp` লিখে **Save Rules** এ ক্লিক করুন।
- **নিরাপত্তা:** আপনার SMS API Key কখনোই ব্রাউজার বা ফ্রন্টএন্ড কোডে রাখা হবে না; এটি শুধুমাত্র আপনার cPanel-এর `config.php` ফাইলেই থাকবে।
