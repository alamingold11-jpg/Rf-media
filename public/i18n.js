// PW New Media Multi-Language (i18n) Engine
// Supports 12 Languages: English (default), Tagalo, Korea, Vietnam, Arab, Turkey, India, Indonesia, Malaysia, Portugal, Spanish, Russia

(function() {
  'use strict';

  const LANGUAGE_OPTIONS = [
    { code: 'en', label: 'English' },
    { code: 'tl', label: 'Tagalo' },
    { code: 'ko', label: 'Korea' },
    { code: 'vi', label: 'Vietnam' },
    { code: 'ar', label: 'Arab' },
    { code: 'tr', label: 'Turkey' },
    { code: 'hi', label: 'India' },
    { code: 'id', label: 'Indonesia' },
    { code: 'ms', label: 'Malaysia' },
    { code: 'pt', label: 'Portugal' },
    { code: 'es', label: 'Spanish' },
    { code: 'ru', label: 'Russia' }
  ];

  const VALID_LANGS = LANGUAGE_OPTIONS.map(function(o) { return o.code; });
  const LANGUAGE_LABEL_MAP = {};
  LANGUAGE_OPTIONS.forEach(function(o) { LANGUAGE_LABEL_MAP[o.code] = o.label; });

  function normalizeLangCode(lang) {
    const clean = String(lang || '').trim().toLowerCase().split('-')[0];
    if (VALID_LANGS.indexOf(clean) !== -1) return clean;
    return 'en';
  }

  const translations = {
    bn: {
      // Common & Navigation
      'home': 'প্রথম পাতা',
      'hall': 'হল',
      'records': 'অবস্থান',
      'tasks': 'টাস্ক',
      'mine': 'আমার',
      'login': 'লগইন',
      'register': 'অ্যাকাউন্ট খুলুন',
      'logout': 'সাইন আউট',
      'back': 'পেছনে যান',
      'confirm': 'নিশ্চিত করুন',
      'cancel': 'বাতিল',
      'save': 'সংরক্ষণ',
      'copy': 'কপি',
      'copied': 'কপি করা হয়েছে',
      'active': 'সক্রিয়',
      'pending': 'অপেক্ষমান',
      'completed': 'সম্পন্ন',
      'failed': 'ব্যর্থ',
      'all': 'সব',
      'status': 'অবস্থা',
      'date': 'তারিখ',
      'bdt': 'BDT',
      'customer_service_title': 'গ্রাহক সেবা',
      'customer_service_direct': 'সরাসরি সমাধান',
      'customer_service_telegram': 'ব্যক্তিগত যোগাযোগ মাধ্যম টেলিগ্রাম',

      // Home & Headers
      'brand_name': 'PW New Media',
      'hero_title': 'প্রতিদিনের কাজে আনুন PW New Media',
      'hero_subtitle': 'আপনার ব্যক্তিগত স্পেসে স্বাগতম। সহজ, স্বচ্ছ এবং আপনার জন্য তৈরি ডিজিটাল প্ল্যাটফর্ম।',
      'get_started': 'নিশ্চিতভাবে শুরু করুন',
      'have_account': 'আমার অ্যাকাউন্ট আছে',
      'start_today': 'শুরু হোক আজই',
      'quick_access': 'দ্রুত অ্যাক্সেস',
      'anytime_anywhere': 'যেকোনো সময়, যেকোনো জায়গায়',
      'your_way': 'আপনার মতো করে',
      'smooth_experience': 'সহজ ও আরামদায়ক অভিজ্ঞতা',
      'footer_text': 'আপনার প্রতিটি শুরু হোক সুন্দর',

      // Login
      'login_title': 'আপনার অ্যাকাউন্টে চালিয়ে যেতে লগইন করুন।',
      'welcome_back': 'আবার স্বাগতম',
      'login_welcome_back': 'আবার স্বাগতম',
      'login_subtitle': 'আপনার অ্যাকাউন্টে চালিয়ে যেতে লগইন করুন।',
      'country_label': 'দেশ',
      'country_bd': '🇧🇩 বাংলাদেশ (+880)',
      'country_eg': '🇪🇬 মিশর (+20)',
      'country_in': '🇮🇳 ভারত (+91)',
      'phone_label': 'ফোন নম্বর',
      'phone_placeholder': 'আপনার ফোন নম্বর লিখুন',
      'password_label': 'পাসওয়ার্ড',
      'forgot_password': 'পাসওয়ার্ড ভুলে গেছেন?',
      'password_placeholder': 'আপনার পাসওয়ার্ড লিখুন',
      'keep_logged_in': 'আমাকে লগইন রাখুন',
      'remember_me': 'আমাকে লগইন রাখুন',
      'login_btn': 'লগইন',
      'login_submit': 'লগইন',
      'demo_login': 'ডেমো অ্যাকাউন্টে দ্রুত প্রবেশ',
      'new_here': 'নতুন?',
      'create_account': 'অ্যাকাউন্ট খুলুন',
      'terms_service': 'সেবার শর্তাবলি',
      'privacy_policy': 'গোপনীয়তা নীতি',
      'err_valid_phone': 'সঠিক ফোন নম্বর লিখুন',
      'err_enter_password': 'আপনার পাসওয়ার্ড লিখুন',
      'back_to_home': 'হোমপেজে ফিরে যান',
      'login_success': 'লগইন সফল!',
      'welcome_goldmine': 'PW New Media এ স্বাগতম',

      // Register
      'register_title': 'নিবন্ধন করুন',
      'register_subtitle': 'অ্যাকাউন্ট তৈরি করতে আপনার বিবরণ লিখুন',
      'sms_code_label': 'এসএমএস যাচাইকরণ কোড',
      'sms_code_placeholder': 'এসএমএস যাচাইকরণ কোড লিখুন',
      'send_sms_code': 'যাচাইকরণ কোড পাঠান',
      'enter_password': 'আপনার পাসওয়ার্ড দিন',
      'confirm_password_label': 'পাসওয়ার্ড নিশ্চিত করুন',
      'confirm_password_placeholder': 'আপনার পাসওয়ার্ড নিশ্চিত করুন',
      'invite_code_label': 'আমন্ত্রণ কোড',
      'invite_code_placeholder': 'আমন্ত্রণ কোড (যদি থাকে)',
      'signup_submit': 'এখন সাইন আপ করুন',
      'already_account': 'আগে থেকেই অ্যাকাউন্ট আছে?',
      'register_success': 'নিবন্ধন সফল!',

      // Profile & Pass
      'superior': 'আমার উচ্চতর:',
      'account_number': 'হিসাব নাম্বার:',
      'invite_code': 'আমন্ত্রণ কোড:',
      'member_id': 'আইডি:',
      'total_balance': 'মোট ব্যালেন্স',
      'available_balance': 'উপলব্ধ ব্যালেন্স',
      'frozen_balance': 'হিমায়িত',
      'today_income': 'আজকের মোট আয়',
      'today_task_income': 'আজকের কাজ আয়',
      'total_revenue': 'মোট রাজস্ব',
      'incomplete_missions': 'অসম্পূর্ণ মিশন',
      'completed_missions': 'সম্পন্ন মিশন',
      'my_pass': 'আমার পাস',
      'withdraw': 'প্রত্যাহার',
      'deposit': 'জমা',
      'team_report': 'দলের রিপোর্ট',
      'personal_info': 'ব্যক্তিগত তথ্য',
      'task_records': 'কাজের রেকর্ড',
      'customer_service': 'গ্রাহক সেবা',
      'share': 'শেয়ার করুন',
      'change_language': 'ভাষা পরিবর্তন',

      // Team Report
      'team_report_title': 'দলের রিপোর্ট',
      'my_team': 'আমার দল',
      'team_balance': 'মোট দলের ভারসাম্য(USD)',
      'team_flow': 'মোট দলের প্রবাহ(USD)',
      'team_recharge': 'মোট রিচার্জ(USD)',
      'team_cashout': 'মোট নগদ আউট(USD)',
      'first_charge_count': 'প্রথম চার্জের সংখ্যা',
      'direct_push_count': 'সরাসরি ধাক্কা নম্বর',
      'total_team_size': 'দলের মোট আকার',
      'new_team_members': 'নতুন দল নম্বর',
      'tier_1': 'স্তর 1',
      'tier_2': 'স্তর 2',
      'tier_3': 'স্তর 3',
      'tier_1_direct': 'স্তর ১ (সরাসরি)',
      'tier_2_label': 'স্তর ২',
      'tier_3_label': 'স্তর ৩',
      'total_people': 'মোট মানুষ',
      'recharge_amount': 'রিচার্জ পরিমাণ',
      'rebate': 'কমিশন',
      'rebate_10': '৬% প্যাকেজ · ৩% কাজ',
      'rebate_5': '২% প্যাকেজ · ২% কাজ',
      'rebate_2': '১% প্যাকেজ · ১% কাজ',
      'tier_1_comm': 'স্তর ১ কমিশন (সরাসরি):',
      'tier_2_comm': 'স্তর ২ কমিশন:',
      'tier_3_comm': 'স্তর ৩ কমিশন:',
      'copy_code': 'কোড কপি',
      'invite_page': 'আমন্ত্রণ পেজ',
      'your_invite_code': 'আপনার আমন্ত্রণ কোড:',
      'package': 'প্যাকেজ',
      'balance': 'ব্যালেন্স',
      'recharge': 'রিচার্জ',
      'joined': 'যুক্ত:',
      'member_list': 'সদস্য তালিকা',
      'real_data': 'রিয়েল ডাটা',
      'empty_team_all': 'আপনার এখনো কোনো দল সদস্য যুক্ত হয়নি',
      'empty_team_tier': 'এ এখনো কোনো সদস্য যুক্ত হয়নি',
      'invite_hint': 'আপনার রেফারেল লিঙ্ক বা কোড শেয়ার করে বন্ধুদের যুক্ত করুন। আপনার টিম প্যাকেজ ক্রয় করলে স্তর ১-এ ৬%, স্তর ২-এ ২% ও স্তর ৩-এ ১% এবং কাজের উপর দৈনিক ৩%, ২% ও ১% কমিশন আপনার ব্যালেন্সে যোগ হবে!',
      'loading_team': 'ডাটাবেজ থেকে দলের তথ্য লোড হচ্ছে…',

      // Withdraw & Payment
      'withdraw_title': 'উত্তোলন',
      'withdraw_details': 'উত্তোলন বিবরণ',
      'withdraw_history': 'উত্তোলনের ইতিহাস',
      'withdraw_records': 'উত্তোলনের রেকর্ড',
      'withdraw_amount_placeholder': 'উত্তোলনের পরিমাণ লিখুন (ন্যূনতম 700)',
      'withdraw_amount_label': 'উত্তোলনের পরিমাণ',
      'actual_arrival': 'প্রকৃত প্রাপ্তি',
      'handling_fee': 'ফি (18%)',
      'bkash_number': 'বিকাশ নম্বর',
      'bkash_setup': 'বিকাশ সেটআপ',
      'confirm_withdraw': 'উত্তোলন নিশ্চিত করুন',
      'payment_method': 'অর্থপ্রদানের পদ্ধতি',

      // Tasks
      'all_tasks': 'সমস্ত',
      'doing_tasks': 'চলমান',
      'review_tasks': 'পর্যালোচনা',
      'done_tasks': 'সম্পন্ন',
      'open_task': 'কাজ খুলুন',
      'submit_task': 'জমা দিন',
      'reward': 'পুরস্কার:',
      'start_task': 'কাজ শুরু করুন',
      'task_reward_per': 'প্রতি কাজের আয়',

      // VIP / Packages
      'vip_hall': 'ভিআইপি হল',
      'packages_benefits': 'প্যাকেজ এবং সুবিধা',
      'price': 'মূল্য:',
      'daily_income': 'দৈনিক আয়:',
      'buy_now': 'ক্রয় করুন',
      'join_now': 'এখনই যোগ দিন',
      'current_tier': 'বর্তমান স্তর',
      'task_count': 'কাজের সংখ্যা',

      // Personal
      'avatar': 'অবতার',
      'account_binding': 'অ্যাকাউন্ট বাঁধাই',
      'usdt_address': 'USDT ঠিকানা',
      'set_now': 'সেট করুন',

      // Public Landing Page (PW NEW MEDIA)
      'lp_h1a': 'সৎ কাজ।',
      'lp_h1b': 'সহজ কাজ, সত্যিকারের উপার্জন।',
      'lp_sub': 'যে প্রতিষ্ঠান তাদের ভিডিও মানুষের কাছে পৌঁছাতে চায় আর যাঁরা ঘরে বসে আয় করতে চান, আমরা তাঁদের মধ্যে সেতুবন্ধন। যোগ দেওয়া বিনামূল্যে, কাজ সহজ, আর প্রতিটি পুরস্কার যাচাই করেই আপনার কাছে পৌঁছায়।',
      'lp_start': 'শুরু করুন',
      'lp_login': 'প্রবেশ করুন',
      'lp_ab_h': 'আমাদের কাজ সম্পর্কে',
      'lp_ab_p1': 'প্রতিদিন বিভিন্ন প্রতিষ্ঠান ও ভিডিও নির্মাতা TikTok, YouTube এবং Facebook-এ ভিডিও প্রকাশ করেন এবং চান বাস্তব মানুষ সেগুলো দেখুক। আমরা এই প্রতিষ্ঠানগুলোর সঙ্গে সরাসরি কাজ করি এবং তাদের পক্ষে প্রচারাভিযান পরিচালনা করি।',
      'lp_ab_p2': 'ফাঁকা সংখ্যার জন্য নয়, প্রতিষ্ঠান অর্থ দেয় প্রকৃত মনোযোগের জন্য। আমরা প্রতিটি প্রচারাভিযানকে ছোট ও স্পষ্ট কাজে ভাগ করি, আর আপনি নিজের মুঠোফোন থেকে সেগুলো সম্পন্ন করেন। প্রতিষ্ঠান পায় আসল সাড়া, আপনি পান আপনার সময়ের মূল্য।',
      'lp_co_h': 'প্রচারাভিযান কীভাবে আপনার কাছে আসে',
      'lp_co1t': 'প্রতিষ্ঠান আমাদের কাছে আসে',
      'lp_co1d': 'একটি ব্যবসা বা ভিডিও নির্মাতা যে ভিডিও প্রচার করতে চান এবং সেটি কোন মাধ্যমে আছে, তা আমাদের জানান।',
      'lp_co2t': 'আমরা পরিকল্পনা ঠিক করি',
      'lp_co2d': 'বরাদ্দ ও কাজের সংখ্যা একসঙ্গে ঠিক হয়, আর প্রতিষ্ঠান আগেভাগে অর্থ পরিশোধ করে, ফলে কাজ শুরুর আগেই পুরস্কারের অর্থ প্রস্তুত থাকে।',
      'lp_co3t': 'আমরা কাজ সাজাই',
      'lp_co3d': 'প্রচারাভিযানটি সহজ শুধু-পছন্দ কাজে ভাগ হয়ে সদস্যদের জন্য কাজের কক্ষে রাখা হয়।',
      'lp_co4t': 'আমরা যাচাই করে প্রতিবেদন দিই',
      'lp_co4d': 'সম্পন্ন প্রতিটি কাজ পর্যালোচনা করা হয় এবং চূড়ান্ত ফলাফল প্রতিষ্ঠানকে জানানো হয়।',
      'lp_us_h': 'আপনি কীভাবে কাজ করবেন',
      'lp_u1t': 'বিনামূল্যে হিসাব খুলুন',
      'lp_u1d': 'আপনার তথ্য দিয়ে নিবন্ধন করুন। কোনো ভর্তি ফি বা জামানত নেই, কখনোই নয়।',
      'lp_u2t': 'একটি কাজ বেছে নিন',
      'lp_u2d': 'কাজের কক্ষে গিয়ে TikTok, YouTube বা Facebook-এর যেকোনো খোলা কাজ নিন।',
      'lp_u3t': 'ভিডিওটি পছন্দ করুন',
      'lp_u3d': 'লিংকে গিয়ে নিজের হিসাব থেকে ভিডিওটি পছন্দ করুন। মন্তব্য, অনুসরণ বা কোনো খরচ করতে হবে না।',
      'lp_u4t': 'যাচাইয়ের জন্য জমা দিন',
      'lp_u4d': 'কাজটি নিশ্চিত করুন। আমাদের দল দেখে নেয় কাজটি ঠিকভাবে হয়েছে কি না।',
      'lp_u5t': 'পুরস্কার বুঝে নিন',
      'lp_u5d': 'অনুমোদিত পুরস্কার আপনার জমা অর্থে যুক্ত হয়, প্রস্তুত হলেই তুলে নিতে পারবেন।',
      'lp_fr_h': 'আপনার জন্য সম্পূর্ণ বিনামূল্যে',
      'lp_fr_p': 'আমাদের আয় আসে প্রতিষ্ঠানের কাছ থেকে, আপনার কাছ থেকে নয়। যোগ দিতে বা কাজ পেতে আপনাকে কখনো অর্থ দিতে হবে না।',
      'lp_nt_h': 'সরাসরি অর্থ উত্তোলনের খবর',
      'lp_nt_p': 'প্রতিটি সফল অর্থ উত্তোলন এখানে তাৎক্ষণিক দেখানো হয়, তাই দেখতে পাবেন সদস্যরা অর্থ পাচ্ছেন।',
      'lp_st': 'উত্তোলন সফল ✓',
      'lp_faq': 'সাধারণ প্রশ্ন',
      'lp_q1': 'নিবন্ধন কি বিনামূল্যে?',
      'lp_a1': 'হ্যাঁ, হিসাব খোলা বিনামূল্যে।',
      'lp_q2': 'অর্থ কীভাবে পাব?',
      'lp_a2': 'আমার হিসাব পাতা থেকে আপনার মানিব্যাগে অর্থ তুলে নিন।',
      'lp_q3': 'দিনে কয়টি কাজ?',
      'lp_a3': 'এটি খোলা কাজের সংখ্যার উপর নির্ভর করে।',
      'lp_cta': 'আয় শুরু করতে প্রস্তুত?',
      'lp_ce_h': 'সনদ ও স্বীকৃতি',
      'lp_ce_p': 'প্রতিটি মাধ্যম থেকে পাওয়া সনদ ও স্বীকৃতি এখানে দেখানো হবে।',
      'lp_ce_s': 'এখানে সনদের ছবি বসবে',
      'lp_terms': 'শর্তাবলী',
      'lp_priv': 'গোপনীয়তা',
      'lp_sup': 'সহায়তা',
      'lp_copyright': '© 2026 PW NEW MEDIA',
      'lp_terms_body': 'নিজের হিসাব সৎভাবে ব্যবহার করে কাজ সম্পন্ন করুন এবং নিয়ম মেনে চলুন। নিবন্ধনের জন্য কোনো ফি বা জামানত প্রয়োজন নেই।',
      'lp_priv_body': 'আপনার হিসাবের তথ্য কেবল আপনার প্রোফাইল পরিচালনা, সম্পন্ন কাজ যাচাই এবং অর্থ উত্তোলনের জন্য ব্যবহৃত হয়।',
      'lp_sup_body': 'সহায়তা প্রয়োজন? আপনার হিসাবে প্রবেশ করে আমার হিসাব পাতা থেকে গ্রাহক সেবা অংশটি খুলুন।',
      'lp_cert_badge': 'আনুষ্ঠানিক সহযোগিতা সনদ',
      'lp_cert_title': 'মিডিয়া প্রচার সহযোগিতা',
      'lp_cert_tt_desc': 'PW NEW MEDIA-এর সাথে স্বল্পদৈর্ঘ্য ভিডিও প্রচার ও প্রকৃত দর্শক সংযোগ সহযোগিতা।',
      'lp_cert_fb_desc': 'PW NEW MEDIA-এর সাথে নির্মাতা ভিডিও প্রচার ও সামাজিক সাড়া প্রচারাভিযান সহযোগিতা।',
      'lp_cert_yt_desc': 'PW NEW MEDIA-এর সাথে চ্যানেল ভিডিও প্রচার ও বাস্তব দর্শক সংযোগ সহযোগিতা।',
      'lp_cert_status': 'সক্রিয় সহযোগী',
      'lp_cert_auth': 'অনুমোদিত স্বীকৃতি',
      'lp_cert_ref_label': 'সনদ নং',
      'lp_cert_year_label': 'সাল'
    },

    en: {
      // Common & Navigation
      'home': 'Home',
      'hall': 'Hall',
      'records': 'VIP',
      'tasks': 'Tasks',
      'mine': 'Mine',
      'login': 'Log in',
      'register': 'Sign Up',
      'logout': 'Sign Out',
      'back': 'Back',
      'confirm': 'Confirm',
      'cancel': 'Cancel',
      'save': 'Save',
      'copy': 'Copy',
      'copied': 'Copied',
      'active': 'Active',
      'pending': 'Pending',
      'completed': 'Completed',
      'failed': 'Failed',
      'all': 'All',
      'status': 'Status',
      'date': 'Date',
      'bdt': 'BDT',
      'customer_service_title': 'Customer Service',
      'customer_service_direct': 'Direct Solution',
      'customer_service_telegram': 'Personal Contact via Telegram',

      // Home & Headers
      'brand_name': 'PW New Media',
      'hero_title': 'Bring PW New Media to Daily Earnings',
      'hero_subtitle': 'Welcome to your personal space. Simple, transparent, and built for you.',
      'get_started': 'Get Started Now',
      'have_account': 'I Have an Account',
      'start_today': 'Start Today',
      'quick_access': 'Quick Access',
      'anytime_anywhere': 'Anytime, Anywhere',
      'your_way': 'Your Own Way',
      'smooth_experience': 'Smooth & Comfortable Experience',
      'footer_text': 'May every beginning bring you prosperity',

      // Login
      'login_title': 'Log in to continue to your account.',
      'welcome_back': 'Welcome back',
      'login_welcome_back': 'Welcome back',
      'login_subtitle': 'Log in to continue to your account.',
      'country_label': 'Country',
      'country_bd': '🇧🇩 Bangladesh (+880)',
      'country_eg': '🇪🇬 Egypt (+20)',
      'country_in': '🇮🇳 India (+91)',
      'phone_label': 'Phone number',
      'phone_placeholder': 'Enter your phone number',
      'password_label': 'Password',
      'forgot_password': 'Forgot password?',
      'password_placeholder': 'Enter your password',
      'keep_logged_in': 'Keep me logged in',
      'remember_me': 'Keep me logged in',
      'login_btn': 'Log in',
      'login_submit': 'Log in',
      'demo_login': 'Quick Access with Demo Account',
      'new_here': 'New here?',
      'create_account': 'Create an account',
      'terms_service': 'Terms of Service',
      'privacy_policy': 'Privacy Policy',
      'err_valid_phone': 'Enter a valid phone number',
      'err_enter_password': 'Enter your password',
      'back_to_home': 'Back to Homepage',
      'login_success': 'Login Successful!',
      'welcome_goldmine': 'Welcome to PW New Media',

      // Register
      'register_title': 'Register',
      'register_subtitle': 'Enter your details to create an account',
      'sms_code_label': 'SMS Verification Code',
      'sms_code_placeholder': 'Enter SMS verification code',
      'send_sms_code': 'Send Code',
      'enter_password': 'Enter your password',
      'confirm_password_label': 'Confirm Password',
      'confirm_password_placeholder': 'Confirm your password',
      'invite_code_label': 'Invitation Code',
      'invite_code_placeholder': 'Invitation code (optional)',
      'signup_submit': 'Sign Up Now',
      'already_account': 'Already have an account?',
      'register_success': 'Registration Successful!',

      // Profile & Pass
      'superior': 'My Superior:',
      'account_number': 'Account Number:',
      'invite_code': 'Invite Code:',
      'member_id': 'ID:',
      'total_balance': 'Total Balance',
      'available_balance': 'Available Balance',
      'frozen_balance': 'Frozen',
      'today_income': "Today's Income",
      'today_task_income': "Today's Task Income",
      'total_revenue': 'Total Revenue',
      'incomplete_missions': 'Incomplete Tasks',
      'completed_missions': 'Completed Tasks',
      'my_pass': 'My Pass',
      'withdraw': 'Withdraw',
      'deposit': 'Deposit',
      'team_report': 'Team Report',
      'personal_info': 'Personal Info',
      'task_records': 'Task Records',
      'customer_service': 'Customer Service',
      'share': 'Share',
      'change_language': 'Change Language',

      // Team Report
      'team_report_title': 'Team Report',
      'my_team': 'My Team',
      'team_balance': 'Team Balance (USD)',
      'team_flow': 'Team Flow (USD)',
      'team_recharge': 'Team Recharge (USD)',
      'team_cashout': 'Team Cashout (USD)',
      'first_charge_count': 'First Deposits',
      'direct_push_count': 'Direct Referrals (Tier 1)',
      'total_team_size': 'Total Team Size',
      'new_team_members': 'New Members (24h)',
      'tier_1': 'Tier 1',
      'tier_2': 'Tier 2',
      'tier_3': 'Tier 3',
      'tier_1_direct': 'Tier 1 (Direct)',
      'tier_2_label': 'Tier 2',
      'tier_3_label': 'Tier 3',
      'total_people': 'Total Members',
      'recharge_amount': 'Recharge Amount',
      'rebate': 'Commission',
      'rebate_10': '6% Pkg · 3% Task',
      'rebate_5': '2% Pkg · 2% Task',
      'rebate_2': '1% Pkg · 1% Task',
      'tier_1_comm': 'Tier 1 Commission (Direct):',
      'tier_2_comm': 'Tier 2 Commission:',
      'tier_3_comm': 'Tier 3 Commission:',
      'copy_code': 'Copy Code',
      'invite_page': 'Invite Page',
      'your_invite_code': 'Your Invite Code:',
      'package': 'Package',
      'balance': 'Balance',
      'recharge': 'Recharge',
      'joined': 'Joined:',
      'member_list': 'Member List',
      'real_data': 'Real Data',
      'empty_team_all': 'No team members joined yet',
      'empty_team_tier': 'No members in this tier yet',
      'invite_hint': 'Share your referral link or code with friends. Earn 6% (Tier 1), 2% (Tier 2), 1% (Tier 3) on package purchases and 3%, 2%, 1% daily on task earnings directly to your balance!',
      'loading_team': 'Loading team records from database...',

      // Withdraw & Payment
      'withdraw_title': 'Withdraw',
      'withdraw_details': 'Withdrawal Details',
      'withdraw_history': 'Withdrawal History',
      'withdraw_records': 'Withdrawal Records',
      'withdraw_amount_placeholder': 'Enter withdrawal amount (Min 700)',
      'withdraw_amount_label': 'Withdrawal Amount',
      'actual_arrival': 'Actual Received',
      'handling_fee': 'Fee (18%)',
      'bkash_number': 'bKash Number',
      'bkash_setup': 'bKash Setup',
      'confirm_withdraw': 'Confirm Withdrawal',
      'payment_method': 'Payment Method',

      // Tasks
      'all_tasks': 'All',
      'doing_tasks': 'In Progress',
      'review_tasks': 'Review',
      'done_tasks': 'Completed',
      'open_task': 'Open Task',
      'submit_task': 'Submit Task',
      'reward': 'Reward:',
      'start_task': 'Start Task',
      'task_reward_per': 'Per Task Income',

      // VIP / Packages
      'vip_hall': 'VIP Hall',
      'packages_benefits': 'Packages & Benefits',
      'price': 'Price:',
      'daily_income': 'Daily Income:',
      'buy_now': 'Buy Now',
      'join_now': 'Join Now',
      'current_tier': 'Current Tier',
      'task_count': 'Task Count',

      // Personal
      'avatar': 'Avatar',
      'account_binding': 'Account Binding',
      'usdt_address': 'USDT Address',
      'set_now': 'Set Up',

      // Public Landing Page (PW NEW MEDIA)
      'lp_h1a': 'Honest work.',
      'lp_h1b': 'Simple tasks. Real rewards.',
      'lp_sub': 'We connect businesses that want their videos seen with people who like to earn from home. Free to join, easy to do, and every reward is verified before it reaches you.',
      'lp_start': 'Get Started',
      'lp_login': 'Login',
      'lp_ab_h': 'About our work',
      'lp_ab_p1': 'Every day, businesses and creators publish videos on TikTok, YouTube and Facebook, and they want real people to notice them. We work with these companies directly and run their engagement campaigns on their behalf.',
      'lp_ab_p2': 'The company does not pay for empty numbers, it pays for real attention. We turn each campaign into small, clear tasks, and you complete them from your own phone. The company gets genuine engagement, and you are rewarded for your time.',
      'lp_co_h': 'How a campaign reaches you',
      'lp_co1t': 'A company comes to us',
      'lp_co1d': 'A business or creator shares the video they want to promote and the platform it is on.',
      'lp_co2t': 'We agree on the plan',
      'lp_co2d': 'We settle the budget and the number of tasks together, and the company pays in advance so rewards are ready before work begins.',
      'lp_co3t': 'We prepare the tasks',
      'lp_co3d': 'The campaign is divided into simple like-only tasks and placed in the Mission Hall for members.',
      'lp_co4t': 'We check and report',
      'lp_co4d': 'Every completed task is reviewed, and the final results are shared with the company.',
      'lp_us_h': 'How you do the work',
      'lp_u1t': 'Create your free account',
      'lp_u1d': 'Sign up with your details. There is no joining fee and no deposit, ever.',
      'lp_u2t': 'Choose a task',
      'lp_u2d': 'Open the Mission Hall and pick any available task on TikTok, YouTube or Facebook.',
      'lp_u3t': 'Like the video',
      'lp_u3d': 'Follow the link and like the video from your own account. No comment, no follow, no spending.',
      'lp_u4t': 'Submit for review',
      'lp_u4d': 'Confirm your task. Our team checks that it was done properly.',
      'lp_u5t': 'Receive your reward',
      'lp_u5d': 'Approved rewards are added to your balance, and you can withdraw whenever you are ready.',
      'lp_fr_h': 'Completely free for you',
      'lp_fr_p': 'We earn from the companies, not from you. You will never be asked to pay to join or to unlock tasks.',
      'lp_nt_h': 'Live withdraw notices',
      'lp_nt_p': 'Every successful withdrawal appears here in real time, so you can see members getting paid.',
      'lp_st': 'Withdrawn ✓',
      'lp_faq': 'Questions',
      'lp_q1': 'Is registration free?',
      'lp_a1': 'Yes, creating an account is free.',
      'lp_q2': 'How do I get paid?',
      'lp_a2': 'Withdraw to your wallet from the Mine page.',
      'lp_q3': 'How many tasks per day?',
      'lp_a3': 'It depends on the tasks available.',
      'lp_cta': 'Ready to start earning?',
      'lp_ce_h': 'Certificates',
      'lp_ce_p': 'Certificates and recognitions from each platform are shown here.',
      'lp_ce_s': 'Certificate image goes here',
      'lp_terms': 'Terms',
      'lp_priv': 'Privacy',
      'lp_sup': 'Support',
      'lp_copyright': '© 2026 PW NEW MEDIA',
      'lp_terms_body': 'Use your own account honestly to complete tasks and follow platform rules. Registration is free with no deposit required.',
      'lp_priv_body': 'Your account details are used only to manage your profile, verify completed tasks, and process withdrawals.',
      'lp_sup_body': 'Need help? Sign in to your account and open Customer Service from the Mine page.',
      'lp_cert_badge': 'OFFICIAL COLLABORATION',
      'lp_cert_title': 'Media Campaign Partner',
      'lp_cert_tt_desc': 'Short-video promotion and authentic viewer engagement cooperation with PW NEW MEDIA.',
      'lp_cert_fb_desc': 'Creator video distribution and verified like-campaign cooperation with PW NEW MEDIA.',
      'lp_cert_yt_desc': 'Channel video promotion and genuine audience engagement cooperation with PW NEW MEDIA.',
      'lp_cert_status': 'Active Partner',
      'lp_cert_auth': 'Authorized Program',
      'lp_cert_ref_label': 'Certificate ID',
      'lp_cert_year_label': 'Year'
    },

    ar: {
      // Common & Navigation
      'home': 'الرئيسية',
      'hall': 'القاعة',
      'records': 'الأعضاء',
      'tasks': 'المهام',
      'mine': 'حسابي',
      'login': 'تسجيل الدخول',
      'register': 'إنشاء حساب',
      'logout': 'تسجيل الخروج',
      'back': 'رجوع',
      'confirm': 'تأكيد',
      'cancel': 'إلغاء',
      'save': 'حفظ',
      'copy': 'نسخ',
      'copied': 'تم النسخ',
      'active': 'نشط',
      'pending': 'قيد الانتظار',
      'completed': 'مكتمل',
      'failed': 'فشل',
      'all': 'الكل',
      'status': 'الحالة',
      'date': 'التاريخ',
      'bdt': 'BDT',
      'customer_service_title': 'خدمة العملاء',
      'customer_service_direct': 'حل مباشر',
      'customer_service_telegram': 'تواصل شخصي عبر تيليجرام',

      // Home & Headers
      'brand_name': 'PW New Media',
      'hero_title': 'اجعل PW New Media جزءاً من أرباحك اليومية',
      'hero_subtitle': 'مرحباً بك في منصتك الرقمية الشخصية. بسيطة وشفافة ومصممة من أجلك.',
      'get_started': 'ابدأ الآن',
      'have_account': 'لدي حساب بالفعل',
      'start_today': 'ابدأ اليوم',
      'quick_access': 'وصول سريع',
      'anytime_anywhere': 'في أي وقت وأي مكان',
      'your_way': 'بطريقتك الخاصة',
      'smooth_experience': 'تجربة سلسة ومريحة',
      'footer_text': 'لتكن كل بداية لك مليئة بالنجاح',

      // Login
      'login_title': 'سجّل الدخول للمتابعة إلى حسابك.',
      'welcome_back': 'مرحباً بعودتك',
      'login_welcome_back': 'مرحباً بعودتك',
      'login_subtitle': 'سجّل الدخول للمتابعة إلى حسابك.',
      'country_label': 'الدولة',
      'country_bd': '🇧🇩 بنغلاديش (+880)',
      'country_eg': '🇪🇬 مصر (+20)',
      'country_in': '🇮🇳 الهند (+91)',
      'phone_label': 'رقم الهاتف',
      'phone_placeholder': 'أدخل رقم هاتفك',
      'password_label': 'كلمة المرور',
      'forgot_password': 'نسيت كلمة المرور؟',
      'password_placeholder': 'أدخل كلمة المرور',
      'keep_logged_in': 'تذكر تسجيل دخولي',
      'remember_me': 'تذكر تسجيل دخولي',
      'login_btn': 'تسجيل الدخول',
      'login_submit': 'تسجيل الدخول',
      'demo_login': 'دخول سريع بالحساب التجريبي',
      'new_here': 'جديد هنا؟',
      'create_account': 'إنشاء حساب',
      'terms_service': 'شروط الخدمة',
      'privacy_policy': 'سياسة الخصوصية',
      'err_valid_phone': 'أدخل رقم هاتف صحيح',
      'err_enter_password': 'أدخل كلمة المرور',
      'back_to_home': 'العودة إلى الرئيسية',
      'login_success': 'تم تسجيل الدخول بنجاح!',
      'welcome_goldmine': 'مرحباً بك في PW New Media',

      // Register
      'register_title': 'إنشاء حساب',
      'register_subtitle': 'أدخل بياناتك لإنشاء حساب جديد',
      'sms_code_label': 'رمز التحقق عبر SMS',
      'sms_code_placeholder': 'أدخل رمز التحقق SMS',
      'send_sms_code': 'إرسال الرمز',
      'enter_password': 'أدخل كلمة المرور',
      'confirm_password_label': 'تأكيد كلمة المرور',
      'confirm_password_placeholder': 'أعد إدخال كلمة المرور',
      'invite_code_label': 'رمز الدعوة',
      'invite_code_placeholder': 'رمز الدعوة (اختياري)',
      'signup_submit': 'سجل الآن',
      'already_account': 'لديك حساب بالفعل؟',
      'register_success': 'تم التسجيل بنجاح!',

      // Profile & Pass
      'superior': 'المشرف الأعلى:',
      'account_number': 'رقم الحساب:',
      'invite_code': 'رمز الدعوة:',
      'member_id': 'المعرف:',
      'total_balance': 'الرصيد الإجمالي',
      'available_balance': 'الرصيد المتاح',
      'frozen_balance': 'مجمد',
      'today_income': 'إجمالي دخل اليوم',
      'today_task_income': 'دخل المهام اليوم',
      'total_revenue': 'إجمالي الإيرادات',
      'incomplete_missions': 'مهام غير مكتملة',
      'completed_missions': 'مهام مكتملة',
      'my_pass': 'بطاقتي',
      'withdraw': 'سحب',
      'deposit': 'إيداع',
      'team_report': 'تقرير الفريق',
      'personal_info': 'المعلومات الشخصية',
      'task_records': 'سجل المهام',
      'customer_service': 'خدمة العملاء',
      'share': 'مشاركة',
      'change_language': 'تغيير اللغة',

      // Team Report
      'team_report_title': 'تقرير الفريق',
      'my_team': 'فريقي',
      'team_balance': 'رصيد الفريق',
      'team_flow': 'حجم تداول الفريق',
      'team_recharge': 'إجمالي شحن الفريق',
      'team_cashout': 'إجمالي سحب الفريق',
      'first_charge_count': 'عدد الإيداعات الأولى',
      'direct_push_count': 'الإحالات المباشرة (المستوى 1)',
      'total_team_size': 'إجمالي حجم الفريق',
      'new_team_members': 'أعضاء جدد (24 ساعة)',
      'tier_1': 'المستوى 1',
      'tier_2': 'المستوى 2',
      'tier_3': 'المستوى 3',
      'tier_1_direct': 'المستوى 1 (مباشر)',
      'tier_2_label': 'المستوى 2',
      'tier_3_label': 'المستوى 3',
      'total_people': 'إجمالي الأعضاء',
      'recharge_amount': 'مبلغ الشحن',
      'rebate': 'العمولة',
      'rebate_10': '6% باقة · 3% مهام',
      'rebate_5': '2% باقة · 2% مهام',
      'rebate_2': '1% باقة · 1% مهام',
      'tier_1_comm': 'عمولة المستوى 1 (مباشر):',
      'tier_2_comm': 'عمولة المستوى 2:',
      'tier_3_comm': 'عمولة المستوى 3:',
      'copy_code': 'نسخ الرمز',
      'invite_page': 'صفحة الدعوة',
      'your_invite_code': 'رمز الدعوة الخاص بك:',
      'package': 'الباقة',
      'balance': 'الرصيد',
      'recharge': 'إعادة الشحن',
      'joined': 'انضم:',
      'member_list': 'قائمة الأعضاء',
      'real_data': 'بيانات حقيقية',
      'empty_team_all': 'لم ينضم أي عضو إلى فريقك بعد',
      'empty_team_tier': 'لا يوجد أعضاء في هذا المستوى بعد',
      'invite_hint': 'شارك رابط أو رمز الدعوة مع أصدقائك. اربح 6% (المستوى 1) و2% (المستوى 2) و1% (المستوى 3) عند شراء الباقات و3% و2% و1% يومياً من أرباح المهام مباشرة إلى رصيدك!',
      'loading_team': 'جاري تحميل بيانات الفريق من قاعدة البيانات...',

      // Withdraw & Payment
      'withdraw_title': 'السحب',
      'withdraw_details': 'تفاصيل السحب',
      'withdraw_history': 'سجل السحب',
      'withdraw_records': 'سجلات السحب',
      'withdraw_amount_placeholder': 'أدخل مبلغ السحب',
      'withdraw_amount_label': 'مبلغ السحب',
      'actual_arrival': 'المبلغ المستلم فعلياً',
      'handling_fee': 'الرسوم (18%)',
      'bkash_number': 'رقم bKash',
      'bkash_setup': 'إعداد bKash',
      'confirm_withdraw': 'تأكيد السحب',
      'payment_method': 'طريقة الدفع',

      // Tasks
      'all_tasks': 'الكل',
      'doing_tasks': 'قيد التنفيذ',
      'review_tasks': 'قيد المراجعة',
      'done_tasks': 'مكتمل',
      'open_task': 'فتح المهمة',
      'submit_task': 'إرسال المهمة',
      'reward': 'المكافأة:',
      'start_task': 'ابدأ المهمة',
      'task_reward_per': 'ربح كل مهمة',

      // VIP / Packages
      'vip_hall': 'قاعة VIP',
      'packages_benefits': 'الباقات والمزايا',
      'price': 'السعر:',
      'daily_income': 'الدخل اليومي:',
      'buy_now': 'اشترِ الآن',
      'join_now': 'انضم الآن',
      'current_tier': 'المستوى الحالي',
      'task_count': 'عدد المهام',

      // Personal
      'avatar': 'الصورة الشخصية',
      'account_binding': 'ربط الحساب',
      'usdt_address': 'عنوان USDT',
      'set_now': 'إعداد',

      // Public Landing Page (PW NEW MEDIA)
      'lp_h1a': 'عمل صادق.',
      'lp_h1b': 'مهام بسيطة ومكافآت حقيقية.',
      'lp_sub': 'نربط الشركات التي تريد أن تُشاهد فيديوهاتها بالأشخاص الذين يحبون الربح من المنزل. الانضمام مجاني، والمهام سهلة، وكل مكافأة يتم التحقق منها قبل وصولها إليك.',
      'lp_start': 'ابدأ الآن',
      'lp_login': 'تسجيل الدخول',
      'lp_ab_h': 'عن عملنا',
      'lp_ab_p1': 'كل يوم تنشر شركات وصنّاع محتوى فيديوهات على تيك توك ويوتيوب وفيسبوك، ويريدون أن يراها أشخاص حقيقيون. نعمل مع هذه الشركات مباشرة وننفذ حملات التفاعل نيابةً عنها.',
      'lp_ab_p2': 'لا تدفع الشركة مقابل أرقام فارغة، بل مقابل اهتمام حقيقي. نحوّل كل حملة إلى مهام صغيرة وواضحة تنجزها من هاتفك. تحصل الشركة على تفاعل حقيقي، وتحصل أنت على مكافأة لوقتك.',
      'lp_co_h': 'كيف تصلك الحملة',
      'lp_co1t': 'شركة تتواصل معنا',
      'lp_co1d': 'تخبرنا الشركة أو صانع المحتوى بالفيديو الذي يريد ترويجه والمنصة التي يوجد عليها.',
      'lp_co2t': 'نتفق على الخطة',
      'lp_co2d': 'نحدد الميزانية وعدد المهام معًا، وتدفع الشركة مقدمًا لتكون المكافآت جاهزة قبل بدء العمل.',
      'lp_co3t': 'نجهّز المهام',
      'lp_co3d': 'تُقسَّم الحملة إلى مهام إعجاب بسيطة وتوضع في قاعة المهام للأعضاء.',
      'lp_co4t': 'نتحقق ونرفع التقرير',
      'lp_co4d': 'تتم مراجعة كل مهمة منجزة، وتُرسل النتائج النهائية إلى الشركة.',
      'lp_us_h': 'كيف تنجز العمل',
      'lp_u1t': 'أنشئ حسابك المجاني',
      'lp_u1d': 'سجّل ببياناتك. لا رسوم انضمام ولا إيداع، أبدًا.',
      'lp_u2t': 'اختر مهمة',
      'lp_u2d': 'افتح قاعة المهام واختر أي مهمة متاحة على تيك توك أو يوتيوب أو فيسبوك.',
      'lp_u3t': 'ضع إعجابًا للفيديو',
      'lp_u3d': 'افتح الرابط وضع إعجابًا من حسابك. لا حاجة لتعليق أو متابعة أو أي إنفاق.',
      'lp_u4t': 'أرسلها للمراجعة',
      'lp_u4d': 'أكّد المهمة وسيتأكد فريقنا من إنجازها بشكل صحيح.',
      'lp_u5t': 'استلم مكافأتك',
      'lp_u5d': 'تُضاف المكافآت المعتمدة إلى رصيدك ويمكنك السحب متى شئت.',
      'lp_fr_h': 'مجاني تمامًا لك',
      'lp_fr_p': 'أرباحنا تأتي من الشركات وليس منك. لن يُطلب منك دفع أي مبلغ للانضمام أو للحصول على المهام.',
      'lp_nt_h': 'إشعارات السحب المباشرة',
      'lp_nt_p': 'يظهر كل سحب ناجح هنا لحظة حدوثه، لترى الأعضاء وهم يستلمون أرباحهم.',
      'lp_st': 'تم السحب ✓',
      'lp_faq': 'الأسئلة الشائعة',
      'lp_q1': 'هل التسجيل مجاني؟',
      'lp_a1': 'نعم، إنشاء الحساب مجاني.',
      'lp_q2': 'كيف أستلم أرباحي؟',
      'lp_a2': 'اسحب إلى محفظتك من صفحة حسابي.',
      'lp_q3': 'كم مهمة يوميًا؟',
      'lp_a3': 'يعتمد ذلك على المهام المتاحة.',
      'lp_cta': 'هل أنت مستعد للربح؟',
      'lp_ce_h': 'الشهادات والاعتمادات',
      'lp_ce_p': 'تُعرض هنا الشهادات والاعتمادات الصادرة عن كل منصة.',
      'lp_ce_s': 'تُوضع صورة الشهادة هنا',
      'lp_terms': 'الشروط',
      'lp_priv': 'الخصوصية',
      'lp_sup': 'الدعم',
      'lp_copyright': '© 2026 PW NEW MEDIA',
      'lp_terms_body': 'استخدم حسابك الشخصي بصدق لإنجاز المهام والتزم بقواعد المنصة. لا توجد أي رسوم تسجيل أو إيداع.',
      'lp_priv_body': 'تُستخدم بيانات حسابك فقط لإدارة ملفك الشخصي والتحقق من المهام المنجزة ومعالجة السحوبات.',
      'lp_sup_body': 'هل تحتاج إلى مساعدة؟ سجّل الدخول إلى حسابك وافتح خدمة العملاء من صفحة حسابي.',
      'lp_cert_badge': 'شهادة تعاون رسمي',
      'lp_cert_title': 'شراكة الحملات الإعلامية',
      'lp_cert_tt_desc': 'تعاون موثّق لترويج الفيديوهات القصيرة وتفاعل الجمهور الحقيقي مع PW NEW MEDIA.',
      'lp_cert_fb_desc': 'تعاون نشر فيديوهات الصنّاع وحملات الإعجاب المجتمعي الموثّقة مع PW NEW MEDIA.',
      'lp_cert_yt_desc': 'تعاون ترويج محتوى القنوات وتفاعل المشاهدين الحقيقي مع PW NEW MEDIA.',
      'lp_cert_status': 'شريك نشط',
      'lp_cert_auth': 'برنامج معتمد',
      'lp_cert_ref_label': 'رقم الشهادة',
      'lp_cert_year_label': 'السنة'
    }
  };

  // Phrases to replace throughout the DOM (Bengali key -> { en, ar, bn? })
  const phraseDictionary = {
    "আলো": { bn: "PW New Media", en: "PW New Media", ar: "PW New Media" },
    "Alo": { bn: "PW New Media", en: "PW New Media", ar: "PW New Media" },
    "প্রথম পাতা": { en: "Home", ar: "الرئيسية" },
    "হল": { en: "Hall", ar: "القاعة" },
    "সদস্য": { en: "VIP", ar: "الأعضاء" },
    "টাস্ক": { en: "Tasks", ar: "المهام" },
    "আমার": { en: "Mine", ar: "حسابي" },
    "লগইন": { en: "Login", ar: "تسجيل الدخول" },
    "অ্যাকাউন্ট খুলুন": { en: "Sign Up", ar: "إنشاء حساب" },
    "নিশ্চিতভাবে শুরু করুন": { en: "Get Started Now", ar: "ابدأ الآن" },
    "আমার অ্যাকাউন্ট আছে": { en: "I Have an Account", ar: "لدي حساب بالفعل" },
    "সহজ, স্বচ্ছ এবং আপনার জন্য তৈরি": { en: "Simple, transparent, and built for you", ar: "بسيطة وشفافة ومصممة من أجلك" },
    "স্বাগতম কার্ড": { en: "Welcome Card", ar: "بطاقة الترحيب" },
    "আপনার স্পেস": { en: "Your Space", ar: "مساحتك الخاصة" },
    "শুরু হোক আজই": { en: "Start Today", ar: "ابدأ اليوم" },
    "দ্রুত অ্যাক্সেস": { en: "Quick Access", ar: "وصول سريع" },
    "যেকোনো সময়, যেকোনো জায়গায়": { en: "Anytime, Anywhere", ar: "في أي وقت وأي مكان" },
    "আপনার মতো করে": { en: "Your Own Way", ar: "بطريقتك الخاصة" },
    "সহজ ও আরামদায়ক অভিজ্ঞতা": { en: "Smooth & Comfortable Experience", ar: "تجربة سلسة ومريحة" },
    "আপনার প্রতিটি শুরু হোক সুন্দর": { en: "May every beginning bring you prosperity", ar: "لتكن كل بداية لك مليئة بالنجاح" },
    "আপনার নতুন শুরু এখানেই": { en: "Your fresh start begins here", ar: "بدايتك الجديدة تبدأ من هنا" },
    "প্রতিদিনের কাজে আনুন PW New Media": { en: "Bring Fresh Light to Your Daily Earnings", ar: "اجعل PW New Media جزءاً من أرباحك اليومية" },
    "আপনার ব্যক্তিগত স্পেসে স্বাগতম": { en: "Welcome to your personal space", ar: "مرحباً بك في مساحتك الشخصية" },
    "Welcome back": { bn: "আবার স্বাগতম", en: "Welcome back", ar: "مرحباً بعودتك" },
    "আবার স্বাগতম": { bn: "আবার স্বাগতম", en: "Welcome back", ar: "مرحباً بعودتك" },
    "Log in to continue to your account.": { bn: "আপনার অ্যাকাউন্টে চালিয়ে যেতে লগইন করুন।", en: "Log in to continue to your account.", ar: "سجّل الدخول للمتابعة إلى حسابك." },
    "আপনার অ্যাকাউন্টে চালিয়ে যেতে লগইন করুন।": { bn: "আপনার অ্যাকাউন্টে চালিয়ে যেতে লগইন করুন।", en: "Log in to continue to your account.", ar: "سجّل الدخول للمتابعة إلى حسابك." },
    "Country": { bn: "দেশ", en: "Country", ar: "الدولة" },
    "দেশ": { bn: "দেশ", en: "Country", ar: "الدولة" },
    "Bangladesh (+880)": { bn: "বাংলাদেশ (+880)", en: "Bangladesh (+880)", ar: "بنغلاديش (+880)" },
    "বাংলাদেশ (+880)": { bn: "বাংলাদেশ (+880)", en: "Bangladesh (+880)", ar: "بنغلاديش (+880)" },
    "Egypt (+20)": { bn: "মিশর (+20)", en: "Egypt (+20)", ar: "مصر (+20)" },
    "মিশর (+20)": { bn: "মিশর (+20)", en: "Egypt (+20)", ar: "مصر (+20)" },
    "মিশর (Egypt)": { bn: "মিশর (Egypt)", en: "Egypt", ar: "مصر" },
    "মিশর": { bn: "মিশর", en: "Egypt", ar: "مصر" },
    "Phone number": { bn: "ফোন নম্বর", en: "Phone number", ar: "رقم الهاتف" },
    "ফোন নম্বর": { bn: "ফোন নম্বর", en: "Phone number", ar: "رقم الهاتف" },
    "Enter your phone number": { bn: "আপনার ফোন নম্বর লিখুন", en: "Enter your phone number", ar: "أدخل رقم هاتفك" },
    "আপনার ফোন নম্বর লিখুন": { bn: "আপনার ফোন নম্বর লিখুন", en: "Enter your phone number", ar: "أدخل رقم هاتفك" },
    "Password": { bn: "পাসওয়ার্ড", en: "Password", ar: "كلمة المرور" },
    "পাসওয়ার্ড": { bn: "পাসওয়ার্ড", en: "Password", ar: "كلمة المرور" },
    "Forgot password?": { bn: "পাসওয়ার্ড ভুলে গেছেন?", en: "Forgot password?", ar: "نسيت كلمة المرور؟" },
    "পাসওয়ার্ড ভুলে গেছেন?": { bn: "পাসওয়ার্ড ভুলে গেছেন?", en: "Forgot password?", ar: "نسيت كلمة المرور؟" },
    "Enter your password": { bn: "আপনার পাসওয়ার্ড লিখুন", en: "Enter your password", ar: "أدخل كلمة المرور" },
    "আপনার পাসওয়ার্ড লিখুন": { bn: "আপনার পাসওয়ার্ড লিখুন", en: "Enter your password", ar: "أدخل كلمة المرور" },
    "Keep me logged in": { bn: "আমাকে লগইন রাখুন", en: "Keep me logged in", ar: "تذكر تسجيل دخولي" },
    "আমাকে লগইন রাখুন": { bn: "আমাকে লগইন রাখুন", en: "Keep me logged in", ar: "تذكر تسجيل دخولي" },
    "Log in": { bn: "লগইন", en: "Log in", ar: "تسجيل الدخول" },
    "লগইন": { bn: "লগইন", en: "Log in", ar: "تسجيل الدخول" },
    "New here?": { bn: "নতুন?", en: "New here?", ar: "جديد هنا؟" },
    "নতুন?": { bn: "নতুন?", en: "New here?", ar: "جديد هنا؟" },
    "Create an account": { bn: "অ্যাকাউন্ট খুলুন", en: "Create an account", ar: "إنشاء حساب" },
    "অ্যাকাউন্ট খুলুন": { bn: "অ্যাকাউন্ট খুলুন", en: "Create an account", ar: "إنشاء حساب" },
    "Terms of Service": { bn: "সেবার শর্তাবলি", en: "Terms of Service", ar: "شروط الخدمة" },
    "সেবার শর্তাবলি": { bn: "সেবার শর্তাবলি", en: "Terms of Service", ar: "شروط الخدمة" },
    "Privacy Policy": { bn: "গোপনীয়তা নীতি", en: "Privacy Policy", ar: "سياسة الخصوصية" },
    "গোপনীয়তা নীতি": { bn: "গোপনীয়তা নীতি", en: "Privacy Policy", ar: "سياسة الخصوصية" },
    "Enter a valid phone number": { bn: "সঠিক ফোন নম্বর লিখুন", en: "Enter a valid phone number", ar: "أدخل رقم هاتف صحيح" },
    "সঠিক ফোন নম্বর লিখুন": { bn: "সঠিক ফোন নম্বর লিখুন", en: "Enter a valid phone number", ar: "أدخل رقم هاتف صحيح" },
    "আপনার অ্যাকাউন্টে লগইন করুন": { en: "Log in to continue to your account.", ar: "سجّل الدخول للمتابعة إلى حسابك." },
    "আপনার তথ্য দিয়ে লগইন করে যেখানে থেমেছিলেন, সেখান থেকেই শুরু করুন।": { en: "Log in to continue to your account.", ar: "سجّل الدخول للمتابعة من حيث توقفت." },
    "আমাকে লগইন অবস্থায় রাখুন": { en: "Keep me logged in", ar: "تذكر تسجيل دخولي" },
    "লগইন করুন": { en: "Log In", ar: "تسجيل الدخول" },
    "নতুন এখানে?": { en: "New here?", ar: "جديد هنا؟" },
    "নতুন অ্যাকাউন্ট তৈরি করুন": { en: "Create an account", ar: "إنشاء حساب جديد" },
    "হোমপেজে ফিরে যান": { en: "Back to Homepage", ar: "العودة إلى الرئيسية" },
    "লগইন সফল!": { en: "Login Successful!", ar: "تم تسجيل الدخول بنجاح!" },
    "স্বর্ণের খনিতে স্বাগতম": { en: "Welcome to PW New Media", ar: "مرحباً بك في PW New Media" },
    "দেখুন": { en: "Show", ar: "عرض" },
    "আপনার নির্ভরযোগ্য ডিজিটাল আয়ের প্ল্যাটফর্ম": { en: "Your Trusted Digital Income Platform", ar: "منصتك الرقمية الموثوقة للربح" },
    "এসএমএস যাচাইকরণ কোড": { en: "SMS Verification Code", ar: "رمز التحقق عبر SMS" },
    "যাচাইকরণ কোড পাঠান": { en: "Send Code", ar: "إرسال الرمز" },
    "পাসওয়ার্ড নিশ্চিত করুন": { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
    "আমন্ত্রণ কোড": { en: "Invitation Code", ar: "رمز الدعوة" },
    "এখন সাইইন আপ করুন": { bn: "এখন সাইন আপ করুন", en: "Sign Up Now", ar: "سجل الآن" },
    "এখন সাইন আপ করুন": { bn: "এখন সাইন আপ করুন", en: "Sign Up Now", ar: "سجل الآن" },
    "আগে থেকেই অ্যাকাউন্ট আছে?": { bn: "আগে থেকেই অ্যাকাউন্ট আছে?", en: "Already have an account?", ar: "لديك حساب بالفعل؟" },
    "নিবন্ধন সফল!": { en: "Registration Successful!", ar: "تم التسجيل بنجاح!" },
    "আমার উচ্চতর:": { en: "My Superior:", ar: "المشرف الأعلى:" },
    "হিসাব নাম্বার:": { en: "Account Number:", ar: "رقم الحساب:" },
    "আমন্ত্রণ কোড:": { en: "Invite Code:", ar: "رمز الدعوة:" },
    "সাইন আউট": { en: "Sign Out", ar: "تسجيل الخروج" },
    "আমার পাস": { en: "My Pass", ar: "بطاقتي" },
    "প্রত্যাহার": { en: "Withdrawal", ar: "السحب" },
    "জমা": { en: "Deposit", ar: "إيداع" },
    "দলের রিপোর্ট": { en: "Team Report", ar: "تقرير الفريق" },
    "ব্যক্তিগত তথ্য": { en: "Personal Info", ar: "المعلومات الشخصية" },
    "কাজের রেকর্ড": { en: "Task Records", ar: "سجل المهام" },
    "গ্রাহক সেবা": { en: "Support", ar: "خدمة العملاء" },
    "শেয়ার করুন": { en: "Share", ar: "مشاركة" },
    "আজকের মোট আয়:": { en: "Today's Income:", ar: "إجمالي دخل اليوم:" },
    "আজকের কাজ আয়:": { en: "Task Income:", ar: "دخل المهام اليوم:" },
    "মোট রাজস্ব": { en: "Total Revenue", ar: "إجمالي الإيرادات" },
    "অসম্পূর্ণ মিশন": { en: "Incomplete Tasks", ar: "مهام غير مكتملة" },
    "সম্পন্ন মিশন": { en: "Completed Tasks", ar: "مهام مكتملة" },
    "হিমায়িত": { en: "Frozen", ar: "مجمد" },
    "উপলব্ধ ব্যালেন্স": { en: "Available Balance", ar: "الرصيد المتاح" },
    "মোট ব্যালেন্স": { en: "Total Balance", ar: "الرصيد الإجمالي" },
    "মোট দলের ভারসাম্য(USD)": { en: "Team Balance (USD)", ar: "رصيد الفريق (USD)" },
    "মোট দলের প্রবাহ(USD)": { en: "Team Flow (USD)", ar: "حجم تداول الفريق (USD)" },
    "মোট রিচার্জ(USD)": { en: "Total Recharge (USD)", ar: "إجمالي الشحن (USD)" },
    "মোট নগদ আউট(USD)": { en: "Total Cashout (USD)", ar: "إجمالي السحب (USD)" },
    "প্রথম চার্জের সংখ্যা": { en: "First Deposit Count", ar: "عدد الإيداعات الأولى" },
    "সরাসরি ধাক্কা নম্বর": { en: "Direct Referrals (Tier 1)", ar: "الإحالات المباشرة (المستوى 1)" },
    "দলের মোট আকার": { en: "Total Team Size", ar: "إجمالي حجم الفريق" },
    "নতুন দল নম্বর": { en: "New Members (24h)", ar: "أعضاء جدد (24 ساعة)" },
    "আমার দল": { en: "My Team", ar: "فريقي" },
    "প্রথম স্তর": { en: "Tier 1", ar: "المستوى 1" },
    "দ্বিতীয় স্তর": { en: "Tier 2", ar: "المستوى 2" },
    "তৃতীয় স্তর": { en: "Tier 3", ar: "المستوى 3" },
    "এই স্তরে এখনো কোনো সদস্য যুক্ত হয়নি": { en: "No members joined in this tier yet", ar: "لا يوجد أعضاء في هذا المستوى بعد" },
    "আপনার জন্য": { en: "For You", ar: "مخصص لك" },
    "🇧🇩 বাংলাদেশ · BDT (৳)": { en: "🇧🇩 Bangladesh · BDT (৳)", ar: "🇧🇩 بنغلاديش · BDT (৳)" },
    "বাংলাদেশ": { en: "Bangladesh", ar: "بنغلاديش" },
    "উত্তোলন পাসওয়ার্ড": { en: "Withdrawal Password", ar: "كلمة مرور السحب" },
    "ফান্ড পাসওয়ার্ড": { en: "Fund Password", ar: "كلمة مرور الصندوق" },
    "উত্তোলন পাসওয়ার্ড লিখুন": { en: "Enter withdrawal password", ar: "أدخل كلمة مرور السحب" },
    "৬ ডিজিটের উত্তোলন পাসওয়ার্ড লিখুন": { en: "Enter 6-digit withdrawal password", ar: "أدخل كلمة مرور السحب المكونة من 6 أرقام" },
    "কনফার্ম পাসওয়ার্ড": { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
    "কনফার্ম পাসওয়ার্ড লিখুন": { en: "Enter confirm password", ar: "أعد إدخال كلمة المرور" },
    "৬ ডিজিটের পাসওয়ার্ড কনফার্ম করুন": { en: "Confirm 6-digit password", ar: "تأكيد كلمة المرور من 6 أرقام" },
    "কার্যপ্রণালী সফলভাবে জমা দেওয়া হয়েছে": { en: "Operation submitted successfully", ar: "تم إرسال العملية بنجاح" },
    "✓ স্থায়ীভাবে সংরক্ষিত (এককালীন)": { en: "✓ Permanently Saved (One-time)", ar: "✓ محفوظ بشكل دائم (لمرة واحدة)" },
    "🔒 সংরক্ষিত": { en: "🔒 Saved", ar: "🔒 محفوظ" },
    "আপনার ৬ ডিজিটের উত্তোলন পাসওয়ার্ড সফলভাবে এককালীন সংরক্ষণ করা হয়েছে। এটি আর পরিবর্তন বা এডিট করা সম্ভব নয়।": { en: "Your 6-digit withdrawal password has been permanently saved. It cannot be changed or edited.", ar: "تم حفظ كلمة مرور السحب المكونة من 6 أرقام بشكل دائم ولا يمكن تعديلها." },
    "পছন্দ করুন": { en: "Select Method", ar: "اختر الطريقة" },
    "বিকাশ সেট নেই": { en: "bKash Not Bound", ar: "bKash غير مرتبط" },
    "নগদ সেট নেই": { en: "Nagad Not Bound", ar: "Nagad غير مرتبط" },
    "USDT সেট নেই": { en: "USDT Not Bound", ar: "USDT غير مرتبط" },
    "প্রত্যাহার পদ্ধতি": { en: "Withdrawal Method", ar: "طريقة السحب" },
    "তোলা টাকার পরিমাণ": { en: "Withdrawal Amount", ar: "مبلغ السحب" },
    "তোলা টাকার": { en: "Withdrawal", ar: "السحب" },
    "পরিমাণ": { en: "Amount", ar: "المبلغ" },
    "প্রত্যাহার পরিমাণ লিখুন দয়া করে": { en: "Please enter withdrawal amount", ar: "يرجى إدخال مبلغ السحب" },
    "অনুগ্রহ করে ফান্ডের পাসওয়ার্ড লিখুন": { en: "Please enter fund password", ar: "يرجى إدخال كلمة مرور الصندوق" },
    "৬ ডিজিটের ফান্ডের পাসওয়ার্ড লিখুন": { en: "Enter 6-digit fund password", ar: "أدخل كلمة مرور الصندوق من 6 أرقام" },
    "মাসিক উত্তোলন সীমা: সীমাহীন": { en: "Monthly withdrawal limit: Unlimited", ar: "حد السحب الشهري: غير محدود" },
    "মাসিক উত্তোলন 0 frecuencia": { en: "Monthly withdrawal limit: Unlimited", ar: "حد السحب الشهري: غير محدود" },
    "USDT উত্তোলন ২৪ ঘণ্টার মধ্যে আসে": { en: "USDT withdrawal arrives within 24 hours", ar: "يصل سحب USDT خلال 24 ساعة" },
    "USDT প্রত্যাহার 12 ঘণ্টার মধ্যে আসে": { en: "USDT withdrawal arrives within 12 hours", ar: "يصل سحب USDT خلال 12 ساعة" },
    "দলের তথ্য লোড হচ্ছে…": { en: "Loading team info...", ar: "جاري تحميل بيانات الفريق..." },
    "অবস্থান": { en: "VIP", ar: "VIP" },
    "ভিআইপি হল": { en: "VIP Hall", ar: "قاعة VIP" },
    "উত্তোলন": { en: "Withdraw", ar: "سحب" },
    "হোম": { en: "Home", ar: "الرئيسية" },
    "ইনভেস্টমেন্ট ও মিশন প্ল্যাটফর্ম": { en: "Investment & Mission Platform", ar: "منصة الاستثمار والمهام" },
    "প্রতিদিনের কাজে আনুন": { en: "Bring to Daily Earnings", ar: "حقق أرباحاً يومية" },
    "ভারত (+91)": { en: "India (+91)", ar: "الهند (+91)" },
    "সাইন আপ করুন": { en: "Sign Up", ar: "إنشاء حساب" },
    "নিবন্ধন করুন": { en: "Register", ar: "إنشاء حساب" },
    "শুরু করুন": { en: "Get Started", ar: "ابدأ الآن" },
    "এখনই শুরু করুন": { en: "Start Now", ar: "ابدأ الآن" },
    "রিওয়ার্ড জিতুন": { en: "Win Rewards", ar: "اربح مكافآت" },
    "দ্রুত পেমেন্ট": { en: "Fast Payment", ar: "دفع سريع" },
    "নির্ভরযোগ্য সিস্টেম": { en: "Reliable System", ar: "نظام موثوق" },
    "সহজ কাজ": { en: "Easy Tasks", ar: "مهام سهلة" },
    "একসাথে আয় করুন": { en: "Earn Together", ar: "اربحوا معاً" },
    "রেফার করুন": { en: "Refer Now", ar: "ادعُ الآن" },
    "পূর্ববর্তী ব্যানার": { en: "Previous Slide", ar: "الشريحة السابقة" },
    "পরবর্তী ব্যানার": { en: "Next Slide", ar: "الشريحة التالية" },
    "সরাসরি সমাধান": { en: "Direct Solution", ar: "حل مباشر" },
    "বন্ধুদের স্ক্যান করতে": { en: "Scan to Invite Friends", ar: "امسح الرمز لدعوة الأصدقاء" },
    "আমন্ত্রণ করুন": { en: "Invite", ar: "دعوة" },
    "আমন্ত্রণ": { en: "Invitation", ar: "دعوة" },
    "বন্ধুরা": { en: "Friends", ar: "الأصدقاء" },
    "বন্ধুদের ভিআইপি লেভেল আপগ্রেড করতে আমন্ত্রণ করুন": { en: "Invite friends to upgrade VIP level", ar: "ادعُ الأصدقاء لترقية مستوى VIP" },
    "মাসিক বেতন": { en: "Monthly Salary", ar: "الراتب الشهري" },
    "অগ্রগতি": { en: "Progress", ar: "التقدم" },
    "বোনাস সক্রিয়করণ": { en: "Bonus Activation", ar: "تفعيل المكافأة" },
    "প্রকৃত": { en: "Actual", ar: "الفعلي" },
    "অবস্থা": { en: "Status", ar: "الحالة" },
    "তারিখ": { en: "Date", ar: "التاريخ" },
    "সংরক্ষণ": { en: "Save", ar: "حفظ" },
    "ক্রয় করুন": { en: "Buy Now", ar: "اشترِ الآن" },
    "করুন": { en: "Do", ar: "تنفيذ" },
    "সঞ্চয় পরিকল্পনা": { en: "Savings Plan", ar: "خطة الادخار" },
    "সঞ্চয় পরিকল্পনা": { en: "Savings Plan", ar: "خطة الادخار" },
    "পার্স": { en: "Wallet", ar: "المحفظة" },
    "নতুন সঞ্চয় শুরু করুন": { en: "Start New Savings", ar: "ابدأ ادخاراً جديداً" },
    "একবারে ৪৫ দিন লাভ সহ": { en: "In 45 days with full profit", ar: "بعد 45 يوماً مع كامل الأرباح" },
    "একজন গ্রাহক কেবল একবারই সঞ্চয় করতে পারবেন": { en: "Each member can participate in savings plan only once", ar: "يمكن لكل عضو الاشتراك في خطة الادخار مرة واحدة فقط" },
    "পরিকল্পনার মেয়াদ": { en: "Plan Duration", ar: "مدة الخطة" },
    "৪৫ দিন": { en: "45 Days", ar: "45 يوماً" },
    "প্রফিট রেট": { en: "Profit Rate", ar: "نسبة الربح" },
    "দৈনিক ৫%": { en: "Daily 5%", ar: "5% يومياً" },
    "দৈনিক প্রফিট (৫%):": { en: "Daily Profit (5%):", ar: "الربح اليومي (5%):" },
    "৪৫ দিনে মোট মুনাফা (২২৫%):": { en: "Total 45-Day Profit (225%):", ar: "إجمالي الربح خلال 45 يوماً (225%):" },
    "একবারে ৪৫ দিন পর মোট ফেরত:": { en: "Total Return After 45 Days:", ar: "إجمالي العائد بعد 45 يوماً:" },
    "লাভ সহ": { en: "With Profit", ar: "مع الأرباح" },
    "অনলাইন সাপোর্ট সক্রিয় (24/7)": { en: "Online Support Active (24/7)", ar: "الدعم المباشر نشط (24/7)" },
    "অনলাইন লাইভ মেসেজ পাঠান": { en: "Send Live Message Online", ar: "إرسال رسالة مباشرة عبر الإنترنت" },
    "অফিশিয়াল মিডিয়া ক্যাম্পেইন": { en: "Official Media Campaign", ar: "الحملة الإعلامية الرسمية" },
    "দৈনিক উত্তোলনযোগ্য": { en: "Daily Withdrawable", ar: "قابل للسحب يومياً" },
    "সুদের হার": { en: "Interest Rate", ar: "نسبة الفائدة" },
    "চক্র (মেয়াদ)": { en: "Cycle (Duration)", ar: "الدورة (المدة)" },
    "৩০ দিন": { en: "30 Days", ar: "30 يوماً" },
    "দৈনিক বরাদ্দকৃত কাজ": { en: "Daily Assigned Tasks", ar: "المهام المخصصة يومياً" },
    "১ ইউনিট": { en: "1 Unit", ar: "وحدة واحدة" },
    "কাজের বিবরণ ও আয়ের হিসাব": { en: "Task Details & Income Calculation", ar: "تفاصيل المهام وحساب الدخل" },
    "মেয়াদ শেষে মোট প্রাপ্তি:": { en: "Total Return at Maturity:", ar: "إجمالي العائد عند الاستحقاق:" },
    "লাভ (প্রতিদিন উত্তোলনযোগ্য)": { en: "Profit (Daily Withdrawable)", ar: "الربح (قابل للسحب يومياً)" },
    "আমরা কীভাবে টাকা দিচ্ছি এবং কোম্পানি কীভাবে আয় করছে?": { en: "How we pay and how the company earns?", ar: "كيف ندفع وكيف تحقق الشركة الأرباح؟" },
    "স্পনসর ও কনটেন্ট নির্মাতাদের বাজেট:": { en: "Sponsors & Content Creators Budget:", ar: "ميزانية الرعاة ومنشئي المحتوى:" },
    "আপনার প্রতিদিনের সহজ কাজ:": { en: "Your Daily Easy Tasks:", ar: "مهامك اليومية البسيطة:" },
    "সরাসরি কাজের পারিশ্রমিক:": { en: "Direct Task Compensation:", ar: "مكافأة المهام المباشرة:" },
    "প্রতিদিন নিশ্চিত ও নিরাপদ উত্তোলন:": { en: "Daily Guaranteed & Secure Withdrawal:", ar: "سحب يومي مضمون وآمن:" },
    "প্রকৃত নাম": { en: "Real Name", ar: "الاسم الحقيقي" },
    "আপনার আসল পূর্ণ নাম লিখুন": { en: "Enter your real full name", ar: "أدخل اسمك الكامل الحقيقي" },
    "বিকাশ অ্যাকাউন্ট": { en: "bKash Account", ar: "حساب bKash" },
    "বিকাশ Personal": { en: "bKash Personal", ar: "bKash شخصي" },
    "নগদ Personal": { en: "Nagad Personal", ar: "Nagad شخصي" },
    "অ্যাকাউন্ট যুক্ত নেই": { en: "Account not linked", ar: "الحساب غير مرتبط" },
    "আপনার উত্তোলনের মাধ্যম নির্বাচন করুন অথবা নতুন সেট করুন": { en: "Select your withdrawal method or set up a new one", ar: "اختر وسيلة السحب أو قم بإعداد وسيلة جديدة" },
    "স্তর 1": { en: "Tier 1", ar: "المستوى 1" },
    "স্তর 2": { en: "Tier 2", ar: "المستوى 2" },
    "স্তর 3": { en: "Tier 3", ar: "المستوى 3" },
    "স্তর ১ (সরাসরি)": { en: "Tier 1 (Direct)", ar: "المستوى 1 (مباشر)" },
    "স্তর ১": { en: "Tier 1", ar: "المستوى 1" },
    "স্তর ২": { en: "Tier 2", ar: "المستوى 2" },
    "স্তর ৩": { en: "Tier 3", ar: "المستوى 3" },
    "মোট মানুষ": { en: "Total Members", ar: "إجمالي الأعضاء" },
    "রিচার্জ পরিমাণ": { en: "Recharge Amount", ar: "مبلغ الشحن" },
    "রিবেট": { en: "Rebate", ar: "العمولة" },
    "১০% রিবেট": { en: "6% Pkg · 3% Task", ar: "6% باقة · 3% مهام" },
    "৫% রিবেট": { en: "2% Pkg · 2% Task", ar: "2% باقة · 2% مهام" },
    "২% রিবেট": { en: "1% Pkg · 1% Task", ar: "1% باقة · 1% مهام" },
    "প্যাকেজ কমিশন (৬%·২%·১%)": { en: "Package Comm. (6%·2%·1%)", ar: "عمولة الباقات (6%·2%·1%)" },
    "দৈনিক কাজের কমিশন (৩%·২%·১%)": { en: "Daily Task Comm. (3%·2%·1%)", ar: "عمولة المهام (3%·2%·1%)" },
    "প্যাকেজ ক্রয়:": { en: "Package Purchase:", ar: "شراء الباقة:" },
    "দৈনিক কাজ:": { en: "Daily Tasks:", ar: "المهام اليومية:" },
    "স্তর ১: ৬% · স্তর ২: ২% · স্তর ৩: ১%": { en: "Tier 1: 6% · Tier 2: 2% · Tier 3: 1%", ar: "المستوى 1: 6% · المستوى 2: 2% · المستوى 3: 1%" },
    "স্তর ১: ৩% · স্তর ২: ২% · স্তর ৩: ১%": { en: "Tier 1: 3% · Tier 2: 2% · Tier 3: 1%", ar: "المستوى 1: 3% · المستوى 2: 2% · المستوى 3: 1%" },
    "টিম কমিশন": { en: "Team Commission", ar: "عمولة الفريق" },
    "স্তর ১ কমিশন (সরাসরি):": { en: "Tier 1 Commission (Direct):", ar: "عمولة المستوى 1 (مباشر):" },
    "স্তর ২ কমিশন:": { en: "Tier 2 Commission:", ar: "عمولة المستوى 2:" },
    "স্তর ৩ কমিশন:": { en: "Tier 3 Commission:", ar: "عمولة المستوى 3:" },
    "কোড কপি": { en: "Copy Code", ar: "نسخ الرمز" },
    "আমন্ত্রণ পেজ": { en: "Invite Page", ar: "صفحة الدعوة" },
    "আপনার আমন্ত্রণ কোড:": { en: "Your Invite Code:", ar: "رمز الدعوة الخاص بك:" },
    "প্যাকেজ": { en: "Package", ar: "الباقة" },
    "ব্যালেন্স": { en: "Balance", ar: "الرصيد" },
    "রিচার্জ": { en: "Recharge", ar: "إعادة الشحن" },
    "যুক্ত:": { en: "Joined:", ar: "انضم:" },
    "সদস্য তালিকা": { en: "Member List", ar: "قائمة الأعضاء" },
    "রিয়েল ডাটা": { en: "Real Data", ar: "بيانات حقيقية" },
    "সমস্ত": { en: "All", ar: "الكل" },
    "চলমান": { en: "In Progress", ar: "قيد التنفيذ" },
    "পর্যালোচনা": { en: "Review", ar: "مراجعة" },
    "সম্পন্ন": { en: "Completed", ar: "مكتمل" },
    "কাজ খুলুন": { en: "Open Task", ar: "فتح المهمة" },
    "জমা দিন": { en: "Submit", ar: "إرسال" },
    "পুরস্কার:": { en: "Reward:", ar: "المكافأة:" },
    "এখনই যোগ দিন": { en: "Join Now", ar: "انضم الآن" },
    "বর্তমান স্তর": { en: "Current Level", ar: "المستوى الحالي" },
    "দৈনিক আয়:": { en: "Daily Income:", ar: "الدخل اليومي:" },
    "মূল্য:": { en: "Price:", ar: "السعر:" },
    "ক্রয় করুন": { en: "Buy Now", ar: "اشترِ الآن" },
    "উত্তোলন বিবরণ": { en: "Withdrawal Details", ar: "تفاصيل السحب" },
    "উত্তোলনের ইতিহাস": { en: "Withdrawal History", ar: "سجل السحب" },
    "উত্তোলনের রেকর্ড": { en: "Withdrawal Records", ar: "سجلات السحب" },
    "প্রকৃত প্রাপ্তি": { en: "Actual Received", ar: "المبلغ المستلم فعلياً" },
    "ফি (18%)": { en: "Fee (18%)", ar: "الرسوم (18%)" },
    "বিকাশ সেটআপ": { en: "bKash Setup", ar: "إعداد bKash" },
    "উত্তোলন নিশ্চিত করুন": { en: "Confirm Withdrawal", ar: "تأكيد السحب" },
    "অর্থপ্রদানের পদ্ধতি": { en: "Payment Method", ar: "طريقة الدفع" },
    "অবতার": { en: "Avatar", ar: "الصورة الشخصية" },
    "অ্যাকাউন্ট বাঁধাই": { en: "Account Binding", ar: "ربط الحساب" },
    "USDT ঠিকানা": { en: "USDT Address", ar: "عنوان USDT" },
    "USDT (BEP20)": { en: "USDT (BEP20)", ar: "USDT (BEP20)" },
    "USDT অ্যাকাউন্ট": { en: "USDT Account", ar: "حساب USDT" },
    "BEP20 ADREES": { en: "BEP20 ADDRESS", ar: "عنوان BEP20" },
    "BEP20 ওয়ালেট ঠিকানা লিখুন (0x...)": { en: "Enter BEP20 wallet address (0x...)", ar: "أدخل عنوان محفظة BEP20 (...0x)" },
    "সেট করুন": { en: "Set Up", ar: "إعداد" },
    "নগদ অ্যাকাউন্ট": { en: "Nagad Account", ar: "حساب Nagad" },
    "নগদ সেট করুন": { en: "Bind Nagad", ar: "ربط Nagad" },
    "নগদ ওয়ালেট বাঁধাই": { en: "Bind Nagad Wallet", ar: "ربط محفظة Nagad" },
    "✓ নগদ সেট করা আছে": { en: "✓ Nagad Bound", ar: "✓ Nagad مرتبط" },
    "নগদ সেট করা আছে": { en: "Nagad Bound", ar: "Nagad مرتبط" },
    "আপনার নগদ নম্বর লিখুন": { en: "Enter your Nagad number", ar: "أدخل رقم Nagad الخاص بك" },
    "সঠিক নগদ মোবাইল ব্যাংক নম্বর লিখুন": { en: "Please enter a valid Nagad mobile banking number", ar: "يرجى إدخال رقم Nagad صحيح" },
    "নগদ সফলভাবে সেট করা হয়েছে": { en: "Nagad bound successfully!", ar: "تم ربط Nagad بنجاح!" },
    "⚠️ উত্তোলন করার পূর্বে নগদ সেট করতে হবে": { en: "⚠️ Please bind Nagad before withdrawal", ar: "⚠️ يرجى ربط Nagad قبل السحب" },
    "আপনার নির্ভরযোগ্য ডিজিটাল আর্নিং ও মিশন প্ল্যাটফর্ম": { en: "Your Trusted Digital Earning & Mission Platform", ar: "منصتك الرقمية الموثوقة للربح والمهام" },
    "আপনার নির্ভরযোগ্য প্ল্যাটফর্ম": { en: "Your Trusted Platform", ar: "منصتك الموثوقة" },
    "প্রধান নেভিগেশন": { en: "Main Navigation", ar: "التنقل الرئيسي" },
    "ভাষা নির্বাচন": { en: "Select Language", ar: "اختر اللغة" },
    "বাংলা": { en: "Bengali", ar: "البنغالية" },
    "আপনার ব্যক্তিগত স্পেসে স্বাগতম। সহজে অ্যাকাউন্ট তৈরি করুন, নিরাপদে লগইন করুন, আর শুরু করুন আপনার পরবর্তী অধ্যায়।": { en: "Welcome to your personal space. Create an account easily, log in securely, and start your next chapter.", ar: "مرحباً بك في مساحتك الشخصية. أنشئ حسابك بسهولة وسجل دخولك بأمان وابدأ رحلتك." },
    "সহজ, স্বচ্ছ এবং আপনার জন্য তৈরি।": { en: "Simple, transparent, and built for you.", ar: "بسيطة وشفافة ومصممة من أجلك." },
    "২০২৫": { en: "2025", ar: "2025" },
    "২০২৬": { en: "2026", ar: "2026" },
    "আপনার প্রতিটি শুরু হোক সুন্দর।": { en: "May all your beginnings be prosperous.", ar: "لتكن كل بداية لك مليئة بالنجاح." },
    "পাসওয়ার্ড পুনরুদ্ধার এখানে চালু নেই।": { en: "Password reset is not available here.", ar: "إعادة تعيين كلمة المرور غير متاحة هنا." },
    "আপনার জন্য রাখা সবকিছু, এক জায়গায়।": { en: "Everything reserved for you, all in one place.", ar: "كل ما خصص لك في مكان واحد." },
    "আপনার ব্যক্তিগত স্পেসে আবার ফিরে আসুন। নিরাপদে লগইন করে আপনার কাজ এগিয়ে নিন।": { en: "Welcome back to your personal space. Log in securely and proceed with your tasks.", ar: "مرحباً بعودتك إلى مساحتك الشخصية. سجل دخولك بأمان وأنجز مهامك." },
    "একটি ভালো শুরু প্রতিদিনকে বদলে দিতে পারে।": { en: "A great beginning can transform every day.", ar: "البداية الجيدة قادرة على تغيير كل يوم." },
    "আপনার পথ": { en: "Your Journey", ar: "مسيرتك" },
    "নিবন্ধন স্বাগতম": { en: "Welcome to Registration", ar: "مرحباً بك في التسجيل" },
    "আপনার অ্যাকাউন্ট তৈরি করতে তথ্য দিন": { en: "Enter details to create your account", ar: "أدخل البيانات لإنشاء حسابك" },
    "পাসওয়ার্ড দেখান": { en: "Show Password", ar: "إظهار كلمة المرور" },
    "পাসওয়ার্ড লুকান": { en: "Hide Password", ar: "إخفاء كلمة المرور" },
    "ড্যাশবোর্ড": { en: "Dashboard", ar: "لوحة التحكم" },
    "আমার প্রোফাইল": { en: "My Profile", ar: "ملفي الشخصي" },
    "আমার উচ্চতর": { en: "My Superior", ar: "المشرف الأعلى" },
    "সাপোর্ট চ্যাট": { en: "Support Chat", ar: "دردشة الدعم" },
    "অনলাইন গ্রাহক সেবা সহায়তা শীঘ্রই চালু হবে।": { en: "Online customer service support is coming soon.", ar: "دعم خدمة العملاء المباشر سيكون متاحاً قريباً." },
    "হিসাব নাম্বার, আমন্ত্রণ কোড, সাইন আউট": { en: "Account Number, Invite Code, Sign Out", ar: "رقم الحساب، رمز الدعوة، تسجيل الخروج" },
    "প্রোফাইল অ্যাভাটার": { en: "Profile Avatar", ar: "صورة الملف الشخصي" },
    "লগআউট": { en: "Log Out", ar: "تسجيل الخروج" },
    "ভারসাম্য:": { en: "Balance:", ar: "الرصيد:" },
    "ভারসাম্য": { en: "Balance", ar: "الرصيد" },
    "আমার পার্স": { en: "My Wallet", ar: "محفظتي" },
    "শিরোনাম": { en: "Tier", ar: "المستوى" },
    "সীমা": { en: "Limit", ar: "الحد" },
    "ভাল": { en: "Good", ar: "جيد" },
    "চমৎকার": { en: "Excellent", ar: "ممتاز" },
    "ব্যক্তিগত ভারসাম্য": { en: "Personal Balance", ar: "الرصيد الشخصي" },
    "ব্যক্তিগত ভারসাম্য(BDT)": { en: "Personal Balance(BDT)", ar: "الرصيد الشخصي (BDT)" },
    "ব্যক্তিগত ভারসাম্য(INR)": { en: "Personal Balance(USD)", ar: "الرصيد الشخصي (USD)" },
    "গতকালের উপার্জন": { en: "Yesterday's Earnings", ar: "أرباح الأمس" },
    "গতকালের উপার্জন(BDT)": { en: "Yesterday's Income(BDT)", ar: "أرباح الأمس (BDT)" },
    "গতকালের উপার্জন(INR)": { en: "Yesterday's Income(USD)", ar: "أرباح الأمس (USD)" },
    "গতকালকের উপার্জন": { en: "Yesterday's Income", ar: "أرباح الأمس" },
    "গতকালকের উপার্জন(BDT)": { en: "Yesterday's Income(BDT)", ar: "أرباح الأمس (BDT)" },
    "গতকালকের উপার্জন(INR)": { en: "Yesterday's Income(USD)", ar: "أرباح الأمس (USD)" },
    "আজ উপার্জন": { en: "Today's Earnings", ar: "أرباح اليوم" },
    "আজ উপার্জন(BDT)": { en: "Today's Income(BDT)", ar: "أرباح اليوم (BDT)" },
    "আজ উপার্জন(INR)": { en: "Today's Income(USD)", ar: "أرباح اليوم (USD)" },
    "এই সপ্তাহে আয়": { en: "This Week's Earnings", ar: "أرباح هذا الأسبوع" },
    "এই সপ্তাহে আয়(BDT)": { en: "This Week's Income(BDT)", ar: "أرباح هذا الأسبوع (BDT)" },
    "এই সপ্তাহে আয়(INR)": { en: "This Week's Income(USD)", ar: "أرباح هذا الأسبوع (USD)" },
    "এই মাসে আয়": { en: "This Month's Earnings", ar: "أرباح هذا الشهر" },
    "এই মাসে আয়(BDT)": { en: "This Month's Income(BDT)", ar: "أرباح هذا الشهر (BDT)" },
    "এই মাসে আয়(INR)": { en: "This Month's Income(USD)", ar: "أرباح هذا الشهر (USD)" },
    "গত মাসে আয়": { en: "Last Month's Earnings", ar: "أرباح الشهر الماضي" },
    "গত মাসে আয়(BDT)": { en: "Last Month's Income(BDT)", ar: "أرباح الشهر الماضي (BDT)" },
    "গত মাসে আয়(INR)": { en: "Last Month's Income(USD)", ar: "أرباح الشهر الماضي (USD)" },
    "মোট রাজস্ব(BDT)": { en: "Total Revenue(BDT)", ar: "إجمالي الإيرادات (BDT)" },
    "মোট রাজস্ব(INR)": { en: "Total Revenue(USD)", ar: "إجمالي الإيرادات (USD)" },
    "কাজটি আজই সম্পূর্ণ করুন": { en: "Completed tasks today", ar: "المهام المكتملة اليوم" },
    "কাজটি আজই সম্পূর্ণ করুন(এক)": { en: "Tasks Completed Today", ar: "المهام المكتملة اليوم" },
    "আজকের জন্য বাকি কাজ": { en: "Remaining tasks today", ar: "المهام المتبقية لليوم" },
    "আজকের জন্য বাকি কাজ(এক)": { en: "Remaining tasks today", ar: "المهام المتبقية لليوم" },
    "অ্যাপ ডাউনলোডের সুবিধা শীঘ্রই আসবে।": { en: "App download will be available soon.", ar: "ميزة تنزيل التطبيق ستتوفر قريباً." },
    "APP ডাউনলোড": { en: "APP Download", ar: "تنزيل التطبيق" },
    "ডাউনলোড": { en: "Download", ar: "تنزيل" },
    "অ্যাকাউন্ট": { en: "Account", ar: "الحساب" },
    "টিম ও আয়": { en: "Team & Income", ar: "الفريق والدخل" },
    "সাপোর্ট ও আরও": { en: "Support & More", ar: "الدعم والمزيد" },
    "দৈনিক বিবৃতি": { en: "Daily Statement", ar: "البيان اليومي" },
    "Legal Info": { en: "Legal Info", bn: "লিগ্যাল ইনফো", ar: "المعلومات القانونية" },
    "অ্যাকাউন্ট পরিবর্তনের রেকর্ড এখানে উপলভ্য নয়।": { en: "Account change records are not available here.", ar: "سجل تغييرات الحساب غير متاح هنا." },
    "অ্যাকাউন্ট রেকর্ড": { en: "Account Record", ar: "سجل الحساب" },
    "বন্ধুকে আমন্ত্রণ জানান": { en: "Invite Friends", ar: "ادعُ صديقاً" },
    "আরও সেবা": { en: "More Services", ar: "المزيد من الخدمات" },
    "সঞ্চয় পরিকল্পনার বিস্তারিত এখানে উপলভ্য নয়।": { en: "Savings plan details are not available here.", ar: "تفاصيل خطة الادخار غير متاحة هنا." },
    "টেলিগ্রাম সহায়তার লিংক এখানে যুক্ত করা হয়নি।": { en: "Telegram support link is not configured here.", ar: "رابط دعم تيليجرام غير مضاف هنا." },
    "টেলিগ্রাম": { en: "Telegram", ar: "تيليجرام" },
    "নিরাপত্তা কেন্দ্রের সুবিধা এখানে চালু নেই।": { en: "Security center is not enabled here.", ar: "مركز الأمان غير مفعّل هنا." },
    "নিরাপত্তা কেন্দ্র": { en: "Security Center", ar: "مركز الأمان" },
    "ভাগ্যবান স্পিনের সুবিধা এখানে চালু নেই।": { en: "Lucky Spin feature is not active.", ar: "ميزة عجلة الحظ غير نشطة هنا." },
    "ভাগ্যবান স্পিন": { en: "Lucky Spin", ar: "عجلة الحظ" },
    "আপনার প্রথম কক্ষে একজন সফল বন্ধু যোগ করলে একটি কর্মদক্ষতা যাচাইয়ের সুযোগ": { en: "Add a successful friend to your first room for an opportunity to verify efficiency", ar: "أضف صديقاً ناجحاً في مستواك الأول للحصول على فرصة سحب الحظ" },
    "আজকের জয়ের জন্য সদস্য সংখ্যা": { en: "Members for today's win", ar: "الأعضاء المؤهلون اليوم" },
    "আজকের ঘোড়ানো সংখ্যা": { en: "Today's Spin Count", ar: "عدد الدورات اليوم" },
    "আয়ের ধারাবাহিকতা": { en: "Income Continuity", ar: "استمرارية الدخل" },
    "আপনার ড্র": { en: "Your Draws", ar: "فرص السحب" },
    "স্পিন ঘুরান": { en: "Spin Now", ar: "أدر العجلة" },
    "বন্ধুকে আমন্ত্রণ জানান ও ড্র অর্জন করুন": { en: "Invite Friends & Earn Draws", ar: "ادعُ الأصدقاء واكسب دورات" },
    "সাম্প্রতিক স্পিন পুরস্কার": { en: "Recent Spin Rewards", ar: "جوائز العجلة الأخيرة" },
    "পুরস্কারের টাকা সরাসরি আপনার মেইন ব্যালেন্সে যোগ হয়েছে।": { en: "Your reward has been credited directly to your main balance.", ar: "تمت إضافة قيمة الجائزة مباشرة إلى رصيدك الرئيسي." },
    "স্বাগতম": { en: "Welcome", ar: "مرحباً" },
    "আপনার আগ্রহের জগৎ": { en: "Your World of Interest", ar: "عالم اهتماماتك" },
    "শুরু হোক এখান থেকে": { en: "Start from here", ar: "ابدأ من هنا" },
    "নতুন মিশন দেখুন, শিখুন এবং প্রতিদিন এগিয়ে চলুন।": { en: "Explore new missions, learn, and grow every day.", ar: "استكشف مهاماً جديدة وتعلّم وتقدّم كل يوم." },
    "আলোকময় সৃজনশীলতার স্লাইডার": { en: "Creative Media Slider", ar: "عرض الوسائط الإبداعي" },
    "নতুন সম্ভাবনার শুরু": { en: "Beginning of New Opportunities", ar: "بداية فرص جديدة" },
    "শিখুন, এগিয়ে চলুন": { en: "Learn and Proceed", ar: "تعلّم وتقدّم" },
    "প্রতিদিন এক ধাপ সামনে": { en: "One step forward every day", ar: "خطوة للأمام كل يوم" },
    "দলের প্রসার সম্পর্কিত নমুনা আপডেট": { en: "Sample team growth updates", ar: "تحديثات نمو الفريق" },
    "একজন ব্যবহারকারীকে সুপারিশ করার জন্য": { en: "for recommending a user", ar: "لإحالة مستخدم جديد" },
    "প্রচার পুরস্কার পাওয়ার জন্য অভিনন্দন": { en: "Congratulations on receiving promotion reward", ar: "تهانينا على استلام مكافأة الترويج" },
    "প্রচার পুরস্কার পাওয়ার জন্য অভিনন্দন!": { en: "Congratulations on receiving promotional reward!", ar: "تهانينا على حصولك على مكافأة الترويج!" },
    "এলাকা": { en: "Region", ar: "المنطقة" },
    "আয়ের": { en: "Income", ar: "الدخل" },
    "ম্যানেজার": { en: "Manager", ar: "المدير" },
    "অফিসিয়াল কাস্টমার ম্যানেজার": { en: "Official Customer Manager", ar: "مدير خدمة العملاء الرسمي" },
    "মিশন হল": { en: "Mission Hall", ar: "قاعة المهام" },
    "সামাজিক মিশন": { en: "Social Missions", ar: "المهام الاجتماعية" },
    "লাইক ও অনুসরণ": { en: "Like Only", ar: "إعجاب فقط" },
    "শুধু লাইক দিন": { en: "Like Only", ar: "إعجاب فقط" },
    "Like Only": { en: "Like Only", ar: "إعجاب فقط" },
    "সদস্যদের আপডেট": { en: "Member Updates", ar: "تحديثات الأعضاء" },
    "সাম্প্রতিক সদস্য আপডেট": { en: "Recent Member Updates", ar: "أحدث تحديثات الأعضاء" },
    "আজ ৫টি মিশন সম্পন্ন করেছেন": { en: "Completed 5 missions today", ar: "أتم 5 مهام اليوم" },
    "আজ ৩টি মিশন সম্পন্ন করেছেন": { en: "Completed 3 missions today", ar: "أتم 3 مهام اليوم" },
    "আজ ২টি মিশন সম্পন্ন করেছেন": { en: "Completed 2 missions today", ar: "أتم مهمتين اليوم" },
    "আজ ৪টি মিশন সম্পন্ন করেছেন": { en: "Completed 4 missions today", ar: "أتم 4 مهام اليوم" },
    "আজ ৬টি মিশন সম্পন্ন করেছেন": { en: "Completed 6 missions today", ar: "أتم 6 مهام اليوم" },
    "আজ ১২টি মিশন সম্পন্ন করেছেন": { en: "Completed 12 missions today", ar: "أتم 12 مهمة اليوم" },
    "সদস্য: ১৮****৫৪": { en: "Member: 18****54", ar: "عضو: 18****54" },
    "সদস্য: ১৭****২৭": { en: "Member: 17****27", ar: "عضو: 17****27" },
    "সদস্য: ১৩****২৯": { en: "Member: 13****29", ar: "عضو: 13****29" },
    "সদস্য: ২১****৬৪": { en: "Member: 21****64", ar: "عضو: 21****64" },
    "সদস্য: ১৯****০৮": { en: "Member: 19****08", ar: "عضو: 19****08" },
    "+১০০.০০": { en: "+100.00", ar: "+100.00" },
    "+৪০.০০": { en: "+40.00", ar: "+40.00" },
    "+৬০.০০": { en: "+60.00", ar: "+60.00" },
    "+১৮০.০০": { en: "+180.00", ar: "+180.00" },
    "+৪৮০.০০": { en: "+480.00", ar: "+480.00" },
    "হল প্যাকেজ": { en: "Hall Packages", ar: "باقات القاعة" },
    "কাজের তালিকা খুলুন": { en: "Open Task List", ar: "فتح قائمة المهام" },
    "দৈনন্দিন কর্ম:": { en: "Daily Tasks:", ar: "المهام اليومية:" },
    "দৈনন্দিন কর্ম": { en: "Daily Tasks", ar: "المهام اليومية" },
    "দৈনিক কর্ম:": { en: "Daily Tasks:", ar: "المهام اليومية:" },
    "দৈনিক কর্ম": { en: "Daily Tasks", ar: "المهام اليومية" },
    "ক্রয় করা হয়নি": { en: "Not purchased", ar: "لم يتم الشراء" },
    "প্রয়োজন:": { en: "Required:", ar: "المطلوب:" },
    "শুধু লাইক রিলস": { en: "Like Reels Only", ar: "إعجاب الريلز فقط" },
    "পছন্দ লক্ষ্য করা": { en: "Like Reels Only", ar: "إعجاب الريلز فقط" },
    "পরিমাণ:": { en: "Quantity:", ar: "الكمية:" },
    "একক দাম": { en: "Unit Price", ar: "سعر الوحدة" },
    "হল সম্পর্কে তথ্য": { en: "Information About Hall", ar: "معلومات حول القاعة" },
    "আপনার অগ্রগতির পরবর্তী ধাপ": { en: "Your next level of progression", ar: "خطوتك التالية للتقدم" },
    "ফ্রিতে শুধু": { en: "In Free trial only", ar: "في الباقة المجانية فقط" },
    "কাজ করতে পারবেন। বাকি কাজ করতে গেলে আপনার ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করতে হবে।": { en: "tasks can be completed. To perform remaining tasks, please purchase a package with your balance.", ar: "مهام يمكن إتمامها. لإنجاز المزيد، يرجى شراء باقة من رصيدك." },
    "সব ব্যালেন্স ও পুরস্কার ভার্চুয়াল ডেমো হিসাব": { en: "All balances and rewards are platform earnings", ar: "جميع الأرصدة والمكافآت هي أرباح المنصة" },
    "বাস্তব টাকা নয়।": { en: "subject to policy verification.", ar: "خاضعة لسياسة التحقق." },
    "বন্ধুদের আমন্ত্রণ জানান": { en: "Invite Friends", ar: "دعوة الأصدقاء" },
    "তোমার বন্ধু": { en: "Your friend", ar: "صديقك" },
    "যোগদানের জন্য আপনাকে আমন্ত্রণ জানাই": { en: "Invites you to join", ar: "يدعوك للانضمام" },
    "আমন্ত্রণ কোড কপি করুন": { en: "Copy Invite Code", ar: "نسخ رمز الدعوة" },
    "আমন্ত্রণ লিঙ্ক কপি করুন": { en: "Copy Invite Link", ar: "نسخ رابط الدعوة" },
    "বন্ধুদের আমন্ত্রণ": { en: "Invite Friends", ar: "دعوة الأصدقاء" },
    "বন্ধুদের আমন্ত্রণ করুন,": { en: "Invite friends,", ar: "ادعُ أصدقاءك،" },
    "স্বর্ণের খনি জিতুন": { en: "Unlock Wealth Rewards", ar: "افتح مكافآت الأرباح" },
    "আপনার আমন্ত্রণ কোডটি বন্ধুদের সঙ্গে শেয়ার করুন।": { en: "Share your invitation code with friends.", ar: "شارك رمز دعوتك مع أصدقائك." },
    "কোড স্ক্যান করে তারা যোগ দিতে পারবে।": { en: "They can join easily by scanning this code.", ar: "يمكنهم الانضمام بسهولة عبر مسح هذا الرمز." },
    "কোড তৈরি হচ্ছে": { en: "Generating code...", ar: "جاري إنشاء الرمز..." },
    "আপনার আমন্ত্রণ লিংক": { en: "Your Invitation Link", ar: "رابط الدعوة الخاص بك" },
    "আপনার আমন্ত্রণ لنک": { bn: "আপনার আমন্ত্রণ লিংক", en: "Your Invitation Link", ar: "رابط الدعوة الخاص بك" },
    "লিংক কপি করুন": { en: "Copy Link", ar: "نسخ الرابط" },
    "বরফে পরিণত করা:": { en: "Frozen:", ar: "مجمد:" },
    "বরফে পরিণত করা": { en: "Frozen Balance", ar: "الرصيد المجمد" },
    "উপলব্ধ:": { en: "Available:", ar: "المتاح:" },
    "উপলব্ধ": { en: "Available", ar: "متاح" },
    "লাভ শেয়ারিং": { en: "Profit Sharing", ar: "مشاركة الأرباح" },
    "অনুপাত": { en: "Ratio", ar: "النسبة" },
    "আগমন": { en: "Arrival", ar: "الوصول" },
    "স্থানান্তরিত": { en: "Transferred", ar: "تم التحويل" },
    "কোন রেকর্ড নেই": { en: "No records found", ar: "لا توجد سجلات" },
    "যাচাই করুন": { en: "Verify Now", ar: "تحقق الآن" },
    "যাচাই চলছে": { en: "Verifying...", ar: "جاري التحقق" },
    "সফল": { en: "Success", ar: "ناجح" },
    "অসফল": { en: "Failed", ar: "فشل" },
    "মুলতবি": { en: "Pending", ar: "قيد الانتظار" },
    "অনুমোদিত": { en: "Approved", ar: "تمت الموافقة" },
    "বন্ধ করুন": { en: "Close", ar: "إغلاق" },
    "মাসিক উত্তোলন": { en: "Monthly Withdrawal", ar: "السحب الشهري" },
    "উত্তোলন 48-96 ঘণ্টার মধ্যে আসে": { en: "Withdrawal arrives within 48-96 hours", ar: "يصل السحب خلال 48-96 ساعة" },
    "প্রত্যাহার 12 ঘণ্টার মধ্যে আসে": { en: "Withdrawal arrives within 12 hours", ar: "يصل السحب خلال 12 ساعة" },
    "বাতিল করুন": { en: "Cancel", ar: "إلغاء" },
    "নিশ্চিত করুন": { en: "Confirm", ar: "تأكيد" },
    "পছন্দ কর": { en: "Choose", ar: "اختر" },
    "সেট না": { en: "Not Set", ar: "غير معيّن" },
    "সহায়তা সেবা এখানে চালু নেই।": { en: "Help service is not enabled here.", ar: "خدمة المساعدة غير مفعّلة هنا." },
    "সহায়তা": { en: "Support", ar: "الدعم" },
    "প্রোফাইল ছবি পরিবর্তনের সুবিধা এখানে চালু নেই।": { en: "Profile photo editing is not enabled here.", ar: "تغيير الصورة الشخصية غير مفعّل هنا." },
    "অ্যাকাউন্ট বাঁধাই এখানে চালু নেই।": { en: "Account binding is currently disabled.", ar: "ربط الحساب غير متاح حالياً." },
    "ঠিকানা যোগ করার সুবিধা এখানে চালু নেই।": { en: "Adding address is currently disabled.", ar: "إضافة العنوان غير متاحة حالياً." },
    "প্রবেশের গুপ্তসংকেত পরিবর্তনের সুবিধা এখানে চালু নেই।": { en: "Login password change is not enabled here.", ar: "تغيير كلمة مرور الدخول غير مفعّل هنا." },
    "প্রবেশের গুপ্তসংকেত": { en: "Login Password", ar: "كلمة مرور الدخول" },
    "ফান্ড পাসওয়ার্ড সেট করার সুবিধা এখানে চালু নেই।": { en: "Fund password setup is currently disabled.", ar: "إعداد كلمة مرور الصندوق غير متاح حالياً." },
    "বিকাশ সেট করুন": { en: "Bind bKash", ar: "ربط bKash" },
    "সহায়তা সেবা শীঘ্রই চালু হবে।": { en: "Support service will be available shortly.", ar: "ستتوفر خدمة الدعم قريباً." },
    "বিকাশ ওয়ালেট বাঁধাই": { en: "Bind bKash Wallet", ar: "ربط محفظة bKash" },
    "মোবাইল ব্যাংকিং উত্তোলন অ্যাকাউন্ট": { en: "Mobile Banking Withdrawal Account", ar: "حساب السحب البنكي عبر الهاتف" },
    "সম্পুর্ন নাম": { en: "Full Name", ar: "الاسم الكامل" },
    "আবশ্যক": { en: "Required", ar: "مطلوب" },
    "আপনার সম্পূর্ণ নাম লিখুন": { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
    "মোবাইল ব্যাংক নাম্বার": { en: "Mobile Banking Number", ar: "رقم المحفظة البنكية" },
    "আপনার বিকাশ নম্বর লিখুন": { en: "Enter your bKash number", ar: "أدخل رقم bKash الخاص بك" },
    "USDT অ্যাকাউন্ট (BEP20)": { en: "USDT Account (BEP20)", ar: "حساب USDT (BEP20)" },
    "গুরুত্বপূর্ণ নির্দেশনা:": { en: "Important Instructions:", ar: "تعليمات مهمة:" },
    "অনুগ্রহ করে নিশ্চিত করুন যে আপনার সম্পুর্ন নাম এবং মোবাইল ব্যাংক নম্বর সঠিক।": { en: "Please ensure that your full name and mobile bank number are completely accurate.", ar: "يرجى التأكد من صحة اسمك الكامل ورقم المحفظة البنكية." },
    "একটি বিকাশ নম্বর শুধাত্র একটি অ্যাকাউন্টের সাথে যুক্ত হতে পারে।": { en: "One bKash number can only be bound to a single account.", ar: "يمكن ربط رقم bKash واحد بحساب واحد فقط." },
    "একটি বিকাশ নম্বর শুধুমাত্র একটি অ্যাকাউন্টের সাথে যুক্ত হতে পারে।": { en: "One bKash number can only be bound to a single account.", ar: "يمكن ربط رقم bKash واحد بحساب واحد فقط." },
    "টাকা প্রত্যাহারের সময় আপনার উপার্জিত অর্থ সরাসরি এই বিকাশ নম্বরে পৌঁছাবে।": { en: "During withdrawal, your funds will be sent directly to this verified bKash number.", ar: "عند السحب، ستصل أموالك مباشرة إلى رقم bKash الموثق هذا." },
    "প্যাকেজসমূহ": { en: "VIP Packages", ar: "باقات VIP" },
    "আপনার বর্তমান স্তর:": { en: "Your Current Tier:", ar: "مستواك الحالي:" },
    "উপলব্ধ ব্যালেন্স:": { en: "Available Balance:", ar: "الرصيد المتاح:" },
    "প্যাকেজ ব্যালেন্স:": { en: "Package Balance:", ar: "رصيد الباقات:" },
    "ব্যালেন্স রিচার্জ (জমা)": { en: "Recharge Balance (Deposit)", ar: "شحن الرصيد (إيداع)" },
    "রিচার্জের পরিমাণ নির্বাচন করুন:": { en: "Select Recharge Amount:", ar: "اختر مبلغ الشحن:" },
    "অথবা নির্দিষ্ট পরিমাণ": { en: "Or Specific Amount", ar: "أو مبلغ محدد" },
    "পেমেন্ট মেথড:": { en: "Payment Method:", ar: "طريقة الدفع:" },
    "বিকাশ": { en: "bKash", ar: "bKash" },
    "নগদ": { en: "Nagad", ar: "Nagad" },
    "USDT (Crypto)": { en: "USDT (Crypto)", ar: "USDT (عملات رقمية)" },
    "USDT:": { en: "USDT:", ar: "USDT:" },
    "ক্রিপ্টো": { en: "Crypto (USDT)", ar: "كريبتو (USDT)" },
    "রিচার্জ সম্পন্ন করুন": { en: "Complete Recharge", ar: "إتمام الشحن" },
    "ফ্রি স্তর": { en: "LV0", ar: "LV0" },
    "দৈনিক কাজ:": { en: "Daily Tasks:", ar: "المهام اليومية:" },
    "প্রতি কাজ:": { en: "Per Task:", ar: "لكل مهمة:" },
    "বেসিক প্যাকেজ": { en: "LV1", ar: "LV1" },
    "প্যাকেজ ক্রয় করুন": { en: "Buy Package", ar: "شراء الباقة" },
    "প্যাকেজ ক্রয়": { en: "Buy Package", ar: "شراء الباقة" },
    "স্ট্যান্ডার্ড প্যাকেজ": { en: "LV2", ar: "LV2" },
    "সিলভার প্যাকেজ": { en: "LV3", ar: "LV3" },
    "গোল্ড প্যাকেজ": { en: "LV4", ar: "LV4" },
    "প্রিমিয়াম প্যাকেজ": { en: "LV5", ar: "LV5" },
    "এলিট প্যাকেজ": { en: "LV6", ar: "LV6" },
    "এলিট LV0": { en: "LV0", ar: "LV0" },
    "এলিট LV1": { en: "LV1", ar: "LV1" },
    "এলিট LV2": { en: "LV2", ar: "LV2" },
    "এলিট LV3": { en: "LV3", ar: "LV3" },
    "এলিট LV4": { en: "LV4", ar: "LV4" },
    "এলিট LV5": { en: "LV5", ar: "LV5" },
    "এলিট LV6": { en: "LV6", ar: "LV6" },
    "মেয়াদ: ৫ দিন": { en: "Validity: 5 Days", ar: "الصلاحية: 5 أيام" },
    "মেয়াদ: ৩০ দিন": { en: "Validity: 30 Days", ar: "الصلاحية: 30 يوماً" },
    "মেয়াদ শেষ": { en: "Expired", ar: "منتهية" },
    "সক্রিয় A-লেভেল সদস্য (প্যাকেজ ক্রয়কৃত):": { en: "Active A-Level Members (Paid):", ar: "أعضاء المستوى A النشطون (باقة مدفوعة):" },
    "মিশন স্তর": { en: "Mission Tier", ar: "مستوى المهمة" },
    "কেটে দিন": { en: "Dismiss", ar: "إغلاق" },
    "আপনার বর্তমান প্যাকেজের জন্য উপলভ্য কাজ": { en: "Available tasks for your active package", ar: "المهام المتاحة لباقتك الحالية" },
    "কাজের ধরন:": { en: "Task Type:", ar: "نوع المهمة:" },
    "অ্যাকাউন্ট অনুসরণ করুন": { en: "Follow Account", ar: "متابعة الحساب" },
    "স্তর:": { en: "Tier:", ar: "المستوى:" },
    "অগ্রগতি:": { en: "Progress:", ar: "التقدم:" },
    "দৈনিক পুরস্কার": { en: "Daily Reward", ar: "المكافأة اليومية" },
    "গ্রহণ": { en: "Accept", ar: "قبول" },
    "গ্রহণ করুন": { en: "Claim Now", ar: "استلم الآن" },
    "গৃহীত": { en: "Accepted", ar: "تم القبول" },
    "সরাসরি ব্যালেন্সে গ্রহণ করুন": { en: "Claim Directly to Balance", ar: "استلام مباشر إلى الرصيد" },
    "টিম": { en: "Team", ar: "الفريق" },
    "মোট কমিশন": { en: "Total Commission", ar: "إجمالي العمولات" },
    "আজকের কমিশন": { en: "Today's Commission", ar: "عمولة اليوم" },
    "টিম সদস্য": { en: "Team Members", ar: "أعضاء الفريق" },
    "আজ নতুন": { en: "New Today", ar: "جدد اليوم" },
    "শেয়ার লিঙ্ক": { en: "Share Link", ar: "رابط المشاركة" },
    "বন্ধুদের স্ক্যান করতে আমন্ত্রণ করুন": { en: "Invite friends to scan", ar: "ادعُ الأصدقاء للمسح" },
    "কপি": { en: "Copy", ar: "نسخ" },
    "কাজের ধরন: একটি ভিডিওতে লাইক দিন": { en: "Task Type: Like a video", ar: "نوع المهمة: الإعجاب بفيديو" },
    "প্রোফাইল দেখুন": { en: "View Profile", ar: "عرض الملف الشخصي" },
    "মিশন রেকর্ড": { en: "Mission Records", ar: "سجل المهام" },
    "মিশনের অবস্থা": { en: "Mission Status", ar: "حالة المهمة" },
    "ব্যর্থ হয়েছে": { en: "Failed", ar: "فشلت" },
    "মিশন বিবরণ": { en: "Mission Details", ar: "تفاصيل المهمة" },
    "মিশন তালিকায় ফিরে যান": { en: "Back to Missions List", ar: "العودة إلى قائمة المهام" },
    "টাস্ক শিরোনাম:": { en: "Task Title:", ar: "عنوان المهمة:" },
    "টাস্ক শিরোনাম": { en: "Task Title", ar: "عنوان المهمة" },
    "মিশন সুবিধা:": { en: "Mission Reward:", ar: "مكافأة المهمة:" },
    "মিশন সুবিধা": { en: "Mission Reward", ar: "مكافأة المهمة" },
    "মিশনের বিবরণ:": { en: "Mission Description:", ar: "وصف المهمة:" },
    "মিশনের বিবরণ": { en: "Mission Description", ar: "وصف المهمة" },
    "টাস্ক লিঙ্ক:": { en: "Task Link:", ar: "رابط المهمة:" },
    "টাস্ক লিঙ্ক": { en: "Task Link", ar: "رابط المهمة" },
    "খোলা সংযুক্তি": { en: "Open Link", ar: "فتح الرابط" },
    "অনুলিপি": { en: "Copy", ar: "نسخ" },
    "সৃষ্টির সময়:": { en: "Created Time:", ar: "وقت الإنشاء:" },
    "সৃষ্টির সময়": { en: "Created Time", ar: "وقت الإنشاء" },
    "মন্তব্য": { en: "Comments", ar: "التعليقات" },
    "ক্যামেরা": { en: "Camera", ar: "الكاميرا" },
    "দয়া করে এখানে প্রবেশ করুন": { en: "Please enter details here", ar: "يرجى إدخال التفاصيل هنا" },
    "গ্যালারি খুলুন": { en: "Open Gallery", ar: "فتح المعرض" },
    "স্ক্রিনশট": { en: "Screenshot", ar: "لقطة شاشة" },
    "আপলোড": { en: "Upload", ar: "رفع" },
    "গ্যালারি থেকে স্ক্রিনশট আপলোড করুন": { en: "Upload screenshot from gallery", ar: "ارفع لقطة شاشة من المعرض" },
    "স্ক্রিনশট মুছুন": { en: "Remove screenshot", ar: "حذف لقطة الشاشة" },
    "প্রিভিউ দেখুন": { en: "View Preview", ar: "معاينة" },
    "ছাড়": { en: "Rebate", ar: "العمولة" },
    "মোট দলের ভারসাম্য": { en: "Total Team Balance", ar: "إجمالي رصيد الفريق" },
    "মোট দল প্রবাহ": { en: "Total Team Turnover", ar: "إجمالي تدفق الفريق" },
    "মোট দল প্রবাহ(BDT)": { en: "Total Team Turnover", ar: "إجمالي تدفق الفريق" },
    "মোট দল প্রবাহ(INR)": { en: "Total Team Turnover", ar: "إجمالي تدفق الفريق" },
    "মোট দল রিচার্জ": { en: "Total Team Recharge", ar: "إجمالي شحن الفريق" },
    "মোট দল রিচার্জ(BDT)": { en: "Total Team Recharge", ar: "إجمالي شحن الفريق" },
    "মোট দল রিচার্জ(INR)": { en: "Total Team Recharge", ar: "إجمالي شحن الفريق" },
    "দল মোট নগদ আউট": { en: "Total Team Cashout", ar: "إجمالي سحب الفريق" },
    "দল মোট নগদ আউট(BDT)": { en: "Total Team Cashout", ar: "إجمالي سحب الفريق" },
    "দল মোট নগদ আউট(INR)": { en: "Total Team Cashout", ar: "إجمالي سحب الفريق" },
    "প্রথম চার্জের সংখ্যা(মানুষ)": { en: "First Recharge Count (Users)", ar: "عدد الإيداعات الأولى (أعضاء)" },
    "সরাসরি ধাক্কা নম্বর(মানুষ)": { en: "Direct Referrals (Users)", ar: "الإحالات المباشرة (أعضاء)" },
    "দলের আকার": { en: "Team Size", ar: "حجم الفريق" },
    "দলের আকার(মানুষ)": { en: "Team Size (Users)", ar: "حجم الفريق (أعضاء)" },
    "নতুন মানুষ": { en: "New Members", ar: "أعضاء جدد" },
    "নতুন মানুষ(মানুষ)": { en: "New Members (Users)", ar: "أعضاء جدد (أعضاء)" },
    "মোট মানুষ(মানুষ)": { en: "Total Members (Users)", ar: "إجمالي الأعضاء" },
    "রিচার্জ পরিমাণ(BDT)": { en: "Recharge Amount", ar: "مبلغ الشحن" },
    "রিচার্জ পরিমাণ(INR)": { en: "Recharge Amount", ar: "مبلغ الشحن" },
    "রিচার্জ রিবেট": { en: "Recharge Rebate", ar: "عمولة الشحن" },
    "রিচার্জ রিবেট(BDT)": { en: "Recharge Rebate", ar: "عمولة الشحن" },
    "রিচার্জ রিবেট(INR)": { en: "Recharge Rebate", ar: "عمولة الشحن" },
    "টিম কমিশন(BDT)": { en: "Team Commission(BDT)", ar: "عمولة الفريق(BDT)" },
    "টিম কমিশন(USD)": { en: "Team Commission(USD)", ar: "عمولة الفريق(USD)" },
    "টিম কমিশন(INR)": { en: "Team Commission(INR)", ar: "عمولة الفريق(INR)" },
    "দৈনিক ৬টি কাজ · প্রতি কাজের আয়": { en: "Daily 6 tasks · Income per task", ar: "6 مهام يومياً · ربح كل مهمة" },
    "প্রধান মেনু": { en: "Main Menu", ar: "القائمة الرئيسية" },
    "স্ক্রিনশট প্রিভিউ": { en: "Screenshot Preview", ar: "معاينة لقطة الشاشة" },
    "সম্পূর্ণ স্ক্রিনশট": { en: "Full Screenshot", ar: "لقطة شاشة كاملة" },
    "ঠিক আছে": { en: "OK", ar: "حسناً" },
    "বন্ধ করতে চাপুন": { en: "Tap to close", ar: "اضغط للإغلاق" },
    "প্যাকেজ ও ব্যালেন্স ম্যানেজমেন্ট": { en: "Package & Balance Management", ar: "إدارة الباقات والرصيد" },
    "বাকি কাজের জন্য ব্যালেন্স প্রয়োজন": { en: "Balance is required for additional tasks", ar: "يلزم وجود رصيد للمهام الإضافية" },
    "ব্যালেন্স রিচার্জ": { en: "Recharge Balance", ar: "شحن الرصيد" },
    "আপনার বর্তমান ব্যালেন্স:": { en: "Your Current Balance:", ar: "رصيدك الحالي:" },
    "প্যাকেজ মূল্য:": { en: "Package Price:", ar: "سعر الباقة:" },
    "ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করুন": { en: "Purchase Package with Balance", ar: "شراء الباقة بالرصيد" },
    "ব্যালেন্স রিচার্জ ট্যাবে যান": { en: "Go to Recharge Tab", ar: "انتقل إلى تبويب الشحن" },
    "কেটে বন্ধ করুন": { en: "Close", ar: "إغلاق" },
    "বন্ধুদের আমন্ত্রণ করুন": { en: "Invite Friends", ar: "ادعُ الأصدقاء" },
    "মিশন জমা": { en: "Submit Mission", ar: "إرسال المهمة" },
    "কোড তৈরি করা যায়নি।": { en: "Failed to generate code.", ar: "تعذر إنشاء الرمز." },
    "আমন্ত্রণ কোড পেতে আগে লগইন করুন।": { en: "Please log in first to view invitation code.", ar: "يرجى تسجيل الدخول أولاً لعرض رمز الدعوة." },
    "ডাটাবেজে তথ্য যাচাই করা হচ্ছে": { en: "Verifying credentials with database...", ar: "جاري التحقق من البيانات..." },
    "ফোন নম্বর অথবা পাসওয়ার্ড সঠিক নয়।": { en: "Phone number or password is incorrect.", ar: "رقم الهاتف أو كلمة المرور غير صحيحة." },
    "লগইন করা যায়নি। আবার চেষ্টা করুন।": { en: "Login failed. Please try again.", ar: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى." },
    "আপনার অ্যাকাউন্ট তৈরি হয়েছে": { en: "Your account has been created", ar: "تم إنشاء حسابك بنجاح" },
    "ডাটাবেজে সফলভাবে তৈরি হয়েছে।": { en: "successfully registered in database.", ar: "تم تسجيله في قاعدة البيانات بنجاح." },
    "দুটি পাসওয়ার্ড মিলছে না।": { en: "Passwords do not match.", ar: "كلمتا المرور غير متطابقتين." },
    "সঠিক বাংলাদেশি ফোন নম্বর লিখুন": { en: "Please enter a valid phone number", ar: "يرجى إدخال رقم هاتف صحيح" },
    "ডাটাবেজে নিবন্ধন যাচাই করা হচ্ছে": { en: "Verifying registration in database...", ar: "جاري التحقق من التسجيل في قاعدة البيانات..." },
    "এই নম্বরে আগে থেকেই অ্যাকাউন্ট আছে। লগইন পেজে যান।": { en: "An account already exists with this phone number. Please log in.", ar: "يوجد حساب مسجل بهذا الرقم بالفعل. يرجى تسجيل الدخول." },
    "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।": { en: "Failed to create account. Please try again.", ar: "تعذر إنشاء الحساب. يرجى المحاولة مرة أخرى." },
    "যাচাইকরণ কোড পেতে সঠিক ফোন নম্বর লিখুন": { en: "Please enter a valid phone number to receive verification code", ar: "يرجى إدخال رقم هاتف صحيح لاستلام رمز التحقق" },
    "যাচাইকরণ কোড পাঠানো হয়েছে:": { en: "Verification code sent:", ar: "تم إرسال رمز التحقق:" },
    "অনুগ্রহ করে রিচার্জের সঠিক পরিমাণ দিন।": { en: "Please enter a valid recharge amount.", ar: "يرجى إدخال مبلغ شحن صحيح." },
    "রিচার্জ সফল হয়েছে": { en: "Recharge successful!", ar: "تم الشحن بنجاح!" },
    "বর্তমান ব্যালেন্স:": { en: "Current Balance:", ar: "الرصيد الحالي:" },
    "পছন্দ": { en: "Selected", ar: "محدد" },
    "বিকাশ সেট করা আছে": { en: "bKash is bound", ar: "تم ربط bKash" },
    "তথ্য আপডেট করুন": { en: "Update Information", ar: "تحديث البيانات" },
    "অনুগ্রহ করে সম্পুর্ন নাম লিখুন": { en: "Please enter your full name", ar: "يرجى إدخال الاسم الكامل" },
    "অনুগ্রহ করে মোবাইল ব্যাংক নাম্বার লিখুন": { en: "Please enter your mobile banking account number", ar: "يرجى إدخال رقم الحساب البنكي عبر الهاتف" },
    "সঠিক বিকাশ মোবাইল ব্যাংক নম্বর লিখুন": { en: "Please enter a valid bKash number", ar: "يرجى إدخال رقم bKash صحيح" },
    "বিকাশ সফলভাবে সেট করা হয়েছে": { en: "bKash bound successfully!", ar: "تم ربط bKash بنجاح!" },
    "ভিডিওটি দেখুন এবং শুধু লাইক দিন": { en: "Open the video and simply tap Like", ar: "افتح الفيديو واضغط إعجاب فقط" },
    "নতুন ট্রেন্ডিং ভিডিওতে শুধু লাইক দিন": { en: "Simply like the new trending video", ar: "اضغط إعجاب فقط على الفيديو الرائج الجديد" },
    "শুধু লাইক দিন ও স্ক্রিনশট জমা দিন": { en: "Simply tap Like and submit screenshot", ar: "اضغط إعجاب فقط وأرسل لقطة الشاشة" },
    "ভাইরাল ক্লিপে শুধু লাভ রিয়্যাক্ট দিন": { en: "Simply give a Like/Love reaction to the viral clip", ar: "اضغط إعجاب فقط على المقطع الرائج" },
    "ভিডিওটি সম্পূর্ণ দেখে লাইক দিন": { en: "Open video and simply tap like", ar: "افتح الفيديو واضغط إعجاب فقط" },
    "অফিসিয়াল পেজের পোস্টে শুধু লাইক দিন": { en: "Simply like the official page post", ar: "اضغط إعجاب فقط على منشور الصفحة الرسمية" },
    "সাম্প্রতিক পোস্টে শুধু লাইক দিন": { en: "Simply like the recent post", ar: "اضغط إعجاب فقط على المنشور الأخير" },
    "টাস্ক সম্পন্ন হয়েছে": { en: "Task Completed", ar: "تم إكمال المهمة" },
    "টাস্ক গ্রহণ করুন": { en: "Accept Task", ar: "قبول المهمة" },
    "মিশন সফল": { en: "Mission Success", ar: "نجاح المهمة" },
    "মিশন গৃহীত হয়েছে": { en: "Mission Accepted", ar: "تم قبول المهمة" },
    "টাকা উত্তোলন সফল": { en: "Withdrawal Successful", ar: "تم السحب بنجاح" },
    "টাকা উত্তোলন প্রক্রিয়াধীন": { en: "Withdrawal Processing", ar: "جاري معالجة السحب" },
    "ন্যূনতম উত্তোলন ৩০০ টাকা": { en: "Minimum withdrawal is 300 BDT", ar: "الحد الأدنى للسحب 300 BDT" },
    "দেশ নির্বাচন করুন": { en: "Select Country", ar: "اختر الدولة" },
    "হিসাব নাম্বার": { en: "Account Number", ar: "رقم الحساب" },
    "আজকের মোট আয়": { en: "Today's Total Income", ar: "إجمالي دخل اليوم" },
    "আজকের কাজ আয়": { en: "Today's Task Income", ar: "دخل المهام اليوم" },
    "দৈনিক আয়": { en: "Daily Income", ar: "الدخل اليومي" },
    "দৈনিক লাভ": { en: "Daily Profit", ar: "الربح اليومي" },
    "মোট আয়:": { en: "Total Income:", ar: "إجمالي الدخل:" },
    "মোট আয়": { en: "Total Income", ar: "إجمالي الدخل" },
    "মোট লাভ": { en: "Total Profit", ar: "إجمالي الربح" },
    "ক্রয় করা হয়েছে": { en: "Purchased", ar: "تم الشراء" },
    "ক্রয় প্রয়োজন": { en: "Purchase Required", ar: "يتطلب الشراء" },
    "ক্রয় প্রয়োজন 🔒": { en: "Purchase Required 🔒", ar: "يتطلب الشراء 🔒" },
    "আনলকড ✓": { en: "Unlocked ✓", ar: "مفتوح ✓" },
    "আনলকড": { en: "Unlocked", ar: "مفتوح" },
    "দৈনিক কাজ": { en: "Daily Tasks", ar: "المهام اليومية" },
    "প্রতি কাজ": { en: "Per Task", ar: "لكل مهمة" },
    "প্রতি কাজের আয়": { en: "Income Per Task", ar: "ربح المهمة" },
    "৫টি": { en: "5 tasks", ar: "5 مهام" },
    "৬টি": { en: "6 tasks", ar: "6 مهام" },
    "১২টি": { en: "12 tasks", ar: "12 مهمة" },
    "১৫টি": { en: "15 tasks", ar: "15 مهمة" },
    "২৫টি": { en: "25 tasks", ar: "25 مهمة" },
    "৩৫টি": { en: "35 tasks", ar: "35 مهمة" },
    "প্যাকেজ বিবরণ": { en: "Package Details", ar: "تفاصيل الباقة" },
    "বাস্তব টাকা নয়": { en: "Virtual credits, not real money", ar: "رصيد افتراضي" },
    "টাকা প্রত্যাহারের সময়": { en: "Withdrawal processing time", ar: "وقت معالجة السحب" },
    "টাকার পরিমাণ লিখুন": { en: "Enter amount", ar: "أدخل المبلغ" },
    "ভাষা পরিবর্তন": { en: "Change Language", ar: "تغيير اللغة" },
    "ইংরেজি": { en: "English", ar: "الإنجليزية" },
    "সঠিক বাংলাদেশি ১০-১১ ডিজিটের ফোন নম্বর লিখুন।": { en: "Please enter a valid phone number.", ar: "يرجى إدخال رقم هاتف صحيح." },
    "অনুগ্রহ করে সঠিক ফোন নম্বর লিখুন।": { en: "Please enter a valid phone number.", ar: "يرجى إدخال رقم هاتف صحيح." },
    "ফিরে যান": { en: "Back", ar: "رجوع" },
    "ক্রয় করা হয়েছে ✓": { en: "Purchased ✓", ar: "تم الشراء ✓" },
    "দৈনিক লাভ:": { en: "Daily Profit:", ar: "الربح اليومي:" },
    "অনুগ্রহ করে আপনার দেশ নির্বাচন করুন।": { en: "Please select your country.", ar: "يرجى اختيار دولتك." },
    "পর্যালোচনাধীন": { en: "Under Review", ar: "قيد المراجعة" },
    "পর্যালোচনাধীন:": { en: "Under Review:", ar: "قيد المراجعة:" },
    "পর্যালোচনা সফল — পুরস্কার ব্যালেন্সে জমা হয়েছে": { en: "Review Successful — Reward credited", ar: "نجحت المراجعة — تمت إضافة المكافأة" },
    "সম্পন্নের সময়:": { en: "Completed at:", ar: "وقت الإكمال:" },
    "গ্রহণের সময়:": { en: "Accepted at:", ar: "وقت القبول:" },
    "জমা দেওয়া প্রমাণ:": { en: "Submitted Proof:", ar: "الإثبات المرسل:" },
    "অনুমোদন সম্পন্ন করুন ⚡": { en: "Approve Now ⚡", ar: "اعتماد الآن ⚡" },
    "অনুমোদন সম্পন্ন করুন": { en: "Approve Now", ar: "اعتماد الآن" },
    "এই স্তর থেকে কেটে বের হন (ভিআইপি হলে ফিরে যান)": { en: "Exit this tier (Return to VIP Hall)", ar: "الخروج من هذا المستوى (العودة لقاعة VIP)" },
    "এই স্তর থেকে কেটে বের হন": { en: "Exit this tier", ar: "الخروج من هذا المستوى" },
    "ভিআইপি হলে ফিরে যান": { en: "Return to VIP Hall", ar: "العودة لقاعة VIP" },
    "মিশন তালিকা": { en: "Mission List", ar: "قائمة المهام" },
    "টাস্ক মেনুতে গিয়ে কাজ জমা দিন।": { en: "Go to Tasks menu to submit proof.", ar: "انتقل إلى قائمة المهام لإرسال الإثبات." },
    "কাজ গৃহীত হয়েছে!": { en: "Task accepted!", ar: "تم قبول المهمة!" },
    "আজকের বাকি কাজ:": { en: "Remaining tasks today:", ar: "المهام المتبقية اليوم:" },
    "সীমা পূর্ণ হয়েছে": { en: "Limit reached", ar: "تم الوصول للحد الأقصى" },
    "সীমা পূর্ণ": { en: "Limit Reached", ar: "اكتمال الحد" },
    "দয়া করে এখানে প্রবেশ করুন...": { en: "Please enter here...", ar: "يرجى الإدخال هنا..." },
    "স্ক্রিনশট আপলোড করুন": { en: "Upload Screenshot", ar: "رفع لقطة شاشة" },
    "জমা দিন →": { en: "Submit →", ar: "إرسال →" },
    "জমা": { en: "Submit", ar: "إرسال" },
    "বাতিল": { en: "Cancel", ar: "إلغاء" },
    "লিংক সফলভাবে অনুলিপি (কপি) করা হয়েছে!": { en: "Link copied successfully!", ar: "تم نسخ الرابط بنجاح!" },
    "কপি সম্পন্ন!": { en: "Copied!", ar: "تم النسخ!" },
    "লিংক নতুন ট্যাবে খোলা হচ্ছে।": { en: "Opening link in new tab.", ar: "جاري فتح الرابط في نافذة جديدة." },
    "সরাসরি এখানে ক্লিক করুন ↗": { en: "Click directly here ↗", ar: "اضغط مباشرة هنا ↗" },
    "টাস্কের লিংক পাওয়া যায়নি!": { en: "Task link not found!", ar: "رابط المهمة غير موجود!" },
    "স্ক্রিনশট আপলোড করুন দয়া করে": { en: "Please upload a screenshot", ar: "يرجى رفع لقطة شاشة" },
    "মিশন সফলভাবে জমা দেওয়া হয়েছে!": { en: "Mission submitted successfully!", ar: "تم إرسال المهمة بنجاح!" },
    "এখন এটি পর্যালোচনাধীন রয়েছে।": { en: "It is now under review.", ar: "وهي الآن قيد المراجعة." },
    "টাস্ক মেনুতে যান": { en: "Go to Tasks Menu", ar: "الانتقال إلى المهام" },
    "প্রকৃত আগমন": { en: "Actual Received", ar: "المستلم فعلياً" },
    "লাভ শেয়ারিং অনুপাত": { en: "Profit Share Ratio", ar: "نسبة مشاركة الأرباح" },
    "অ্যাকাউন্ট নেই?": { en: "Don't have an account?", ar: "ليس لديك حساب؟" },
    "© ২০২৫ PW New Media। আপনার প্রতিটি শুরু হোক সুন্দর।": { en: "© 2025 PW New Media. Make every start great.", ar: "© 2025 PW New Media. لتكن كل بداية لك مليئة بالنجاح." },
    "ভাষা নির্বাচন / Select Language": { en: "Select Language", ar: "اختر اللغة" },
    "দেশ ও কারেন্সি": { en: "Country & Currency", ar: "الدولة والعملة" },
    "বাংলাদেশ (Bangladeshi Taka)": { en: "Bangladesh (BDT)", ar: "بنغلاديش (BDT)" },
    "টাস্ক সম্পন্ন করে আয় করুন": { en: "Earn by Completing Tasks", ar: "اربح عبر إكمال المهام" },
    "TikTok, YouTube ও Facebook-এ": { en: "On TikTok, YouTube & Facebook", ar: "على TikTok و YouTube و Facebook" },
    "ভিডিওতে শুধু লাইক দিন — প্রতিটি টাস্কের জন্য রিওয়ার্ড অর্জন করুন।": { en: "Simply like videos — earn rewards for every completed task.", ar: "اضغط إعجاب فقط على الفيديوهات — واحصل على مكافآت لكل مهمة مكتملة." },
    "টাস্ক সম্পন্ন করুন,": { en: "Complete Tasks,", ar: "أكمل المهام،" },
    "আপনার সম্পন্ন করা টাস্ক এবং অর্জিত রিওয়ার্ড সহজেই দেখুন।": { en: "Easily track your completed tasks and earned rewards.", ar: "تابع مهامك المكتملة ومكافآتك بسهولة." },
    "সবার জন্য": { en: "For Everyone", ar: "للجميع" },
    "আপনার রেফারেল লিংক শেয়ার করুন এবং আপনার টিমের কার্যক্রম দেখুন।": { en: "Share your referral link and track your team activity.", ar: "شارك رابط الإحالة الخاص بك وتابع نشاط فريقك." },
    "ভিআইপি এলাকা": { en: "VIP Zone", ar: "منطقة VIP" },
    "চলমান মিশন": { en: "Active Missions", ar: "المهام الجارية" },
    "একজন ব্যবহারকারীকে সুপারিশ করার জন্য": { en: "For referring a new member —", ar: "لإحالة عضو جديد —" },
    "আপনার অর্জন, আপনার সম্মান": { en: "Your Achievement, Your Honor", ar: "إنجازك هو فخرك" },
    "নির্ধারিত লক্ষ্য পূরণ করে পদমর্যাদা ও মাসিক বেতন অর্জন করুন।": { en: "Reach the target milestones to unlock ranks and monthly salary.", ar: "حقق الأهداف المطلوبة لفتح الرتب والحصول على راتب شهري." },
    "অবস্থান ১ মাসিক বেতন": { en: "Position 1 Monthly Salary", ar: "راتب المنصب 1 الشهري" },
    "অবস্থান ১": { en: "Position 1", ar: "المنصب 1" },
    "অবস্থান ২": { en: "Position 2", ar: "المنصب 2" },
    "অবস্থান ৩": { en: "Position 3", ar: "المنصب 3" },
    "অবস্থান ৪": { en: "Position 4", ar: "المنصب 4" },
    "অবস্থান ৫": { en: "Position 5", ar: "المنصب 5" },
    "অবস্থান ৬": { en: "Position 6", ar: "المنصب 6" },
    "অবস্থান ৭": { en: "Position 7", ar: "المنصب 7" },
    "অবস্থান ৮": { en: "Position 8", ar: "المنصب 8" },
    "আপনার প্রথম স্তরে ৩ জন সক্রিয় সদস্য যুক্ত হলে যোগ্য হবেন।": { en: "Qualify when 3 active members join your Tier 1.", ar: "تتأهل عند انضمام 3 أعضاء نشطين إلى مستواك الأول." },
    "আপনার প্রথম ৩ জন বা তার বেশি": { en: "With your first 3 or more", ar: "مع أول 3 أو أكثر من" },
    "আপনার প্রথম ৫ জন বা তার বেশি": { en: "With your first 5 or more", ar: "مع أول 5 أو أكثر من" },
    "আপনার প্রথম ৮ জন বা তার বেশি": { en: "With your first 8 or more", ar: "مع أول 8 أو أكثر من" },
    "আপনার প্রথম ১৫ জন বা তার বেশি": { en: "With your first 15 or more", ar: "مع أول 15 أو أكثر من" },
    "আপনার প্রথম ২৫ জন বা তার বেশি": { en: "With your first 25 or more", ar: "مع أول 25 أو أكثر من" },
    "আপনার প্রথম ৪০ জন বা তার বেশি": { en: "With your first 40 or more", ar: "مع أول 40 أو أكثر من" },
    "আপনার প্রথম ৭০ জন বা তার বেশি": { en: "With your first 70 or more", ar: "مع أول 70 أو أكثر من" },
    "আপনার প্রথম ১০০ জন বা তার বেশি": { en: "With your first 100 or more", ar: "مع أول 100 أو أكثر من" },
    "A-লেভেল": { en: "A-Level", ar: "المستوى A" },
    "সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।": { en: "active members (recharged & package purchased), you qualify.", ar: "أعضاء نشطين (شحنوا الرصيد واشتروا باقة)، تتأهل تلقائياً." },
    "🔒 মাসিক বেতন": { en: "🔒 Monthly Salary", ar: "🔒 الراتب الشهري" },
    "নির্ধারিত লক্ষ্য পূরণ বেতন": { en: "Milestone Achievement Salary", ar: "راتب تحقيق الأهداف" },
    "বেতনের পরিমাণ": { en: "Salary Amount", ar: "قيمة الراتب" },
    "প্রয়োজনীয় সক্রিয় সদস্য:": { en: "Required Active Members:", ar: "الأعضاء النشطون المطلوبون:" },
    "৩ জন সক্রিয় সদস্য": { en: "3 Active Members", ar: "3 أعضاء نشطين" },
    "আপনার বর্তমান অগ্রগতি:": { en: "Your Current Progress:", ar: "تقدمك الحالي:" },
    "০ / ৩ জন (০%)": { en: "0 / 3 (0%)", ar: "0 / 3 (0%)" },
    "আপনার ইনভাইট লিংক দিয়ে বন্ধুদের জয়েন করান। শুধু ফ্রি রেফার করলে গণ্য হবে না — A-লেভেলের সদস্যরা রিচার্জ করে প্যাকেজ কিনলেই সক্রিয় হবে এবং বেতন অগ্রগতি বাড়বে।": { en: "Invite friends with your referral link. Free signups do not count — A-Level members become active only after recharging and buying a package, advancing your salary progress.", ar: "ادعُ أصدقاءك عبر رابط الدعوة الخاص بك. التسجيل المجاني لا يُحتسب — يصبح أعضاء المستوى A نشطين فقط بعد شحن الرصيد وشراء باقة، مما يزيد من تقدم راتبك." },
    "🔒 শর্ত পূরণ হয়নি (লকড)": { en: "🔒 Requirement Not Met (Locked)", ar: "🔒 لم تستوفِ الشروط (مقفل)" },
    "আমন্ত্রণ লিংক কপি করুন": { en: "Copy Invitation Link", ar: "نسخ رابط الدعوة" },
    "এই বিকাশ অ্যাকাউন্টটি এককালীন সফলভাবে সংরক্ষিত রয়েছে। এটি আর পরিবর্তন বা এডিট করা সম্ভব নয়।": { en: "This bKash account is permanently bound and cannot be edited.", ar: "تم حفظ حساب bKash هذا بشكل دائم ولا يمكن تعديله." },
    "এই নগদ অ্যাকাউন্টটি এককালীন সফলভাবে সংরক্ষিত রয়েছে। এটি আর পরিবর্তন বা এডিট করা সম্ভব নয়।": { en: "This Nagad account is permanently bound and cannot be edited.", ar: "تم حفظ حساب Nagad هذا بشكل دائم ولا يمكن تعديله." },
    "এই USDT (BEP20) ওয়ালেটটি এককালীন সফলভাবে সংরক্ষিত রয়েছে। এটি আর পরিবর্তন বা এডিট করা সম্ভব নয়।": { en: "This USDT (BEP20) wallet is permanently bound and cannot be edited.", ar: "تم حفظ محفظة USDT (BEP20) هذه بشكل دائم ولا يمكن تعديلها." },
    "• শুধুমাত্র BNB Smart Chain (BEP20) নেটওয়ার্কের USDT ওয়ালেট অ্যাড্রেস দিন (0x দিয়ে শুরু)। এটি এককালীন সংরক্ষণ করা হবে।": { en: "• Enter only a BNB Smart Chain (BEP20) USDT wallet address starting with 0x. This binding is permanent.", ar: "• أدخل فقط عنوان محفظة USDT على شبكة BNB Smart Chain (BEP20) يبدأ بـ 0x. يتم الحفظ بشكل دائم." },
    "আপনার প্রকৃত নাম সফলভাবে সংরক্ষিত রয়েছে। এটি এককালীন সংরক্ষণ, তাই পরিবর্তনযোগ্য নয়।": { en: "Your real name is permanently saved and cannot be changed.", ar: "تم حفظ اسمك الحقيقي بشكل دائم ولا يمكن تغييره." },
    "• আপনার জাতীয় পরিচয়পত্র বা ব্যাংক অ্যাকাউন্টে থাকা আসল নাম দিন। এই নাম বিকাশ ও নগদ উভয় অ্যাকাউন্টে এককালীন স্বয়ংক্রিয়ভাবে ব্যবহৃত হবে।": { en: "• Enter your legal name as it appears on your National ID or payout account. It is saved permanently.", ar: "• أدخل اسمك القانوني كما يظهر في هويتك أو حساب السحب الخاص بك." },
    "গ্রহণ করা হচ্ছে": { en: "Accepting...", ar: "جاري القبول..." },
    "LV0 (ফ্রি)": { en: "LV0 (Free)", ar: "LV0 (مجاني)" },
    "+ রিচার্জ": { en: "+ Recharge", ar: "+ شحن" },
    "✕ বন্ধ করুন": { en: "✕ Close", ar: "✕ إغلاق" },
    "অথবা নির্দিষ্ট পরিমাণ (": { en: "Or custom amount (", ar: "أو مبلغ مخصص (" },
    "রিচার্জ সম্পন্ন করুন ⚡": { en: "Complete Recharge ⚡", ar: "إتمام الشحن ⚡" },
    "পণ্যের বিস্তারিত দেখুন": { en: "View Product Details", ar: "عرض تفاصيل الباقة" },
    "প্যাকেজ বিবরণী": { en: "Package Details", ar: "تفاصيل الباقة" },
    "নির্ধারিত প্যাকেজ মূল্য": { en: "Package Price", ar: "سعر الباقة" },
    "/ ৩০ দিন মেয়াদ": { en: "/ 30-Day Validity", ar: "/ صلاحية 30 يوماً" },
    "প্যাকেজের মূল তথ্য": { en: "Key Package Metrics", ar: "البيانات الأساسية للباقة" },
    "উৎপাদনশীলতা (দৈনিক আয়)": { en: "Daily Output (Daily Income)", ar: "الإنتاج اليومي (الدخل اليومي)" },
    "মোট লভ্যাংশ (৩০ দিন)": { en: "Total Return (30 Days)", ar: "إجمالي العائد (30 يوماً)" },
    "ক্রয়ের পরিমাণ": { en: "Purchase Limit", ar: "حد الشراء" },
    "কাজের বিবরণ ও আয়ের হিসাব": { en: "Task Overview & Earnings Breakdown", ar: "نظرة عامة على المهام والأرباح" },
    "এই প্যাকেজে আপনার মূল কাজ হলো টিকটক, ফেসবুক ও ইউটিউবের ভিডিওতে শুধু লাইক দেওয়া।": { en: "In this package, your main task is simply liking videos on TikTok, Facebook, and YouTube.", ar: "في هذه الباقة، مهمتك الأساسية هي الضغط على إعجاب فقط في فيديوهات TikTok و Facebook و YouTube." },
    "প্রতিটি কাজ শেষ করার সাথে সাথে কাজের নির্দিষ্ট পারিশ্রমিক সরাসরি আপনার ব্যালেন্সে জমা হবে। মেয়াদ চলাকালীন প্রতিদিনের উপার্জিত টাকা আপনি কোনো ঝামেলা ছাড়াই সরাসরি আপনার USDT (BEP20 / Binance) ওয়ালেটে উত্তোলন করতে পারবেন।": { en: "Upon completing and verifying each task, the task reward is credited directly to your balance. You can withdraw your daily earnings seamlessly to your USDT (BEP20 / Binance) wallet.", ar: "عند إكمال كل مهمة والتحقق منها، تُضاف مكافأتها مباشرة إلى رصيدك ويمكنك سحب أرباحك اليومية بسهولة إلى محفظة USDT (BEP20 / Binance)." },
    "প্যাকেজের মেয়াদ ৩০ দিন। এই ৩০ দিন আপনি প্রতিদিন নিয়মমাফিক কাজ করে নিশ্চিত আয় করতে পারবেন।": { en: "Package validity is 30 days. Complete your daily allocated tasks every day throughout the term for steady earnings.", ar: "مدة الباقة 30 يوماً. أكمل مهامك المخصصة يومياً طوال المدة لتحقيق دخل ثابت." },
    "মোট আয় (৩০ দিন):": { en: "Total Income (30 Days):", ar: "إجمالي الدخل (30 يوماً):" },
    "* ক্রয়ের সীমা প্রতি ব্যক্তি সর্বোচ্চ ১টি প্যাকেজ": { en: "* Limit: Maximum 1 active subscription per tier per user", ar: "* الحد الأقصى: اشتراك واحد نشط لكل مستوى لكل مستخدم" },
    "আমরা কীভাবে টাকা দিচ্ছি এবং কোম্পানি কীভাবে আয় করছে?": { en: "How Payouts Work & Revenue Model", ar: "آلية الدفع ومصادر إيرادات الشركة" },
    "স্পনসর ও কনটেন্ট নির্মাতাদের বাজেট:": { en: "Sponsor & Creator Promotion Budgets:", ar: "ميزانيات الترويج من الرعاة وصناع المحتوى:" },
    "বিভিন্ন জনপ্রিয় টিকটকার, ইউটিউব চ্যানেল এবং ব্র্যান্ড প্রতিষ্ঠান তাদের ভিডিওতে ভিউজ ও লাইক বাড়ানোর জন্য আমাদের প্ল্যাটফর্মকে বিজ্ঞাপনী প্রচার তহবিল প্রদান করে।": { en: "Creators, YouTube channels, and brands allocate promotional budgets to our platform to boost organic views, likes, and engagement.", ar: "يخصص صناع المحتوى وقنوات YouTube والعلامات التجارية ميزانيات إعلانية لمنصتنا لتعزيز المشاهدات والإعجابات والتفاعل الحقيقي." },
    "আপনার প্রতিদিনের সহজ কাজ:": { en: "Simple Daily Tasks:", ar: "مهامك اليومية البسيطة:" },
    "আপনি প্রতিদিন মাত্র ৫-১০ মিনিট সময় নিয়ে বরাদ্দকৃত ভিডিওগুলোতে শুধু লাইক দিয়ে সহজ কাজগুলো সম্পন্ন করেন এবং স্ক্রিনশট জমা দেন।": { en: "Spend just 5–10 minutes daily simply liking the assigned videos and uploading screenshot proof.", ar: "اقضِ 5-10 دقائق يومياً في الضغط على إعجاب فقط للفيديوهات المخصصة ورفع لقطة الشاشة." },
    "সরাসরি কাজের পারিশ্রমিক:": { en: "Direct Task Rewards:", ar: "مكافآت المهام المباشرة:" },
    "স্পনসরদের দেওয়া টাকার একটি বড় অংশ সরাসরি আপনাদের মতো পরিশ্রমী সদস্যদের মাঝে কাজের পারিশ্রমিক ও লভ্যাংশ হিসেবে বণ্টন করা হয়।": { en: "A large share of sponsor campaign revenue is distributed directly to active members as task rewards and tier returns.", ar: "يتم توزيع جزء كبير من ميزانيات الحملات الإعلانية مباشرة على الأعضاء النشطين كمكافآت مهام وعوائد." },
    "প্রতিদিন নিশ্চিত ও নিরাপদ উত্তোলন:": { en: "Reliable & Fast Withdrawals:", ar: "سحوبات يومية موثوقة وسريعة:" },
    "কোনো লুকানো চার্জ বা জটিল শর্ত নেই। প্রতিদিনের উপার্জিত টাকা আপনি সাথে সাথে USDT (BEP20 / Binance)-এ উত্তোলন করতে পারবেন।": { en: "No hidden terms or complicated hurdles. Withdraw your daily earnings smoothly to your USDT (BEP20 / Binance) wallet.", ar: "بدون رسوم خفية أو شروط معقدة. اسحب أرباحك اليومية بسلاسة إلى محفظة USDT (BEP20 / Binance)." },
    "প্যাকেজের মূল্য": { en: "Package Price", ar: "سعر الباقة" },
    "ব্যর্থ / বাতিল": { en: "Failed / Cancelled", ar: "فشل / ملغى" },
    "ব্যর্থ": { en: "Failed", ar: "فشل" },
    "⚠ কাজটি ব্যর্থ হয়েছে — পুনরায় আপিল করুন": { en: "⚠ Task Failed — Submit an Appeal", ar: "⚠ فشلت المهمة — قدّم استئنافاً" },
    "⚠ টাস্ক ব্যর্থ হয়েছে — পুনরায় আপিল করুন": { en: "⚠ Task Failed — Submit an Appeal", ar: "⚠ فشلت المهمة — قدّم استئنافاً" },
    "সঠিক লাইক দেওয়া স্ক্রিনশট আপলোড করুন এবং প্রয়োজনে নিচে আপিলের কারণ লিখে পুনরায় জমা দিন।": { en: "Upload a screenshot showing your valid Like and explain your appeal below if needed before resubmitting.", ar: "يرجى رفع لقطة شاشة تُظهر الإعجاب الصحيح وكتابة سبب الاستئناف أدناه إذا لزم الأمر ثم إعادة الإرسال." },
    "পুনরায় জমা দিন (আপিল) →": { en: "Resubmit (Appeal) →", ar: "إعادة الإرسال (استئناف) →" },
    "অনলাইন পেমেন্ট গেটওয়ে": { en: "Online Payment Gateway", ar: "بوابة الدفع الإلكتروني" },
    "আপনার পরিমাণ লিখুন-": { en: "Enter amount -", ar: "أدخل المبلغ -" },
    "অন্য নেটওয়ার্ক বা পরিবর্তন করুন": { en: "Switch Network or Method", ar: "تغيير الشبكة أو الطريقة" },
    "(মানুষ)": { en: "(Users)", ar: "(أعضاء)" },
    "আপনার উপলব্ধ ব্যালেন্স": { en: "Your Available Balance", ar: "رصيدك المتاح" },
    "আপনার সঞ্চয়ের পরিমাণ লিখুন": { en: "Enter Savings Amount", ar: "أدخل مبلغ الادخار" },
    "+ সঞ্চয় নিশ্চিত করুন": { en: "+ Confirm Savings", ar: "+ تأكيد الادخار" },
    "* সঞ্চয় নেওয়ার পর অ্যাকাউন্টটি স্বয়ংক্রিয়ভাবে লক হয়ে যাবে ও ৪৫ দিন পর সম্পূর্ণ মূলধন ও লাভ একবারে পাওয়া যাবে।": { en: "* After enrollment, the principal is locked for 45 days and full principal + profit is paid at maturity.", ar: "* بعد الاشتراك، يتم تجميد رأس المال لمدة 45 يوماً ويُصرف كاملاً مع الأرباح عند الاستحقاق." },
    "এখনো কোনো স্পিন পুরস্কার রেকর্ড নেই": { en: "No lucky spin rewards yet.", ar: "لا توجد مكافآت عجلة الحظ بعد." },
    "অভিনন্দন!": { en: "Congratulations!", ar: "تهانينا!" },
    "ম্যানেজার (Account Manager)": { en: "Account Manager", ar: "مدير الحساب" },
    "টাস্ক সম্পন্ন করা, প্যাকেজ অ্যাক্টিভেশন, ক্যাশ আউট বা রিচার্জ সংক্রান্ত যেকোনো প্রয়োজনে সরাসরি আপনার অফিসিয়াল ম্যানেজারের সাথে যোগাযোগ করুন।": { en: "Contact your official Account Manager directly for task help, package activation, withdrawals, or deposits.", ar: "تواصل مباشرة مع مدير حسابك الرسمي للمساعدة في المهام أو تفعيل الباقات أو السحب أو الإيداع." },
    "ম্যানেজার আইডি": { en: "Manager ID", ar: "معرف المدير" },
    "কপি করুন": { en: "Copy", ar: "نسخ" },
    "টেলিগ্রাম ম্যানেজারের সাথে চ্যাট করুন": { en: "Chat with Telegram Manager", ar: "تحدث مع المدير على تيليجرام" },
    "নিষ্ক্রিয়": { en: "Inactive", ar: "غير نشط" },
    "সক্রিয়": { en: "Active", ar: "نشط" },
    "বন্ধু সংখ্যা": { en: "Friends", ar: "الأصدقاء" },
    "সক্রিয় সদস্য": { en: "Active Members", ar: "الأعضاء النشطون" },
    "আমানত": { en: "Deposits", ar: "الإيداعات" },
    "নগদ আউট": { en: "Cashout", ar: "السحب" },
    "ফ্রিতে শুধু LV0 · বাকি কাজের জন্য ব্যালেন্স প্রয়োজন": { en: "Only LV0 is free · Other tiers require balance", ar: "المستوى LV0 مجاني فقط · المستويات الأخرى تتطلب رصيداً" },
    "LV1 · বেসিক প্যাকেজ": { en: "LV1", ar: "LV1" },
    "কপি সম্পন্ন": { en: "Copied!", ar: "تم النسخ!" },
    "দলের তথ্য লোড হচ্ছে…": { en: "Loading team data…", ar: "جاري تحميل بيانات الفريق..." },
    "আবেদন জমা দিন": { en: "Submit Request", ar: "إرسال الطلب" },
    "Send at least 1.00 USDT through the selected network (BEP20). Your balance updates after the transfer is detected and credited.": {
      bn: "নির্বাচিত নেটওয়ার্ক (BEP20) দিয়ে সর্বনিম্ন ১.০০ USDT ($১) পাঠান। ট্রান্সফার শনাক্ত ও অনুমোদিত হলেই আপনার ব্যালেন্স আপডেট হবে।",
      en: "Send at least 1.00 USDT through the selected network (BEP20). Your balance updates after the transfer is detected and credited.",
      ar: "أرسل ما لا يقل عن 1.00 USDT عبر الشبكة المحددة (BEP20). سيتم تحديث رصيدك تلقائياً بعد اكتشاف التحويل واعتماده."
    },
    "জমা দিন ও অটো এপ্রুভ করুন": { en: "Submit & Auto-Approve", ar: "إرسال وموافقة تلقائية" },
    "বিজ্ঞাপন দেখে আয়": { en: "Earn from Tasks", ar: "اربح من المهام" },
    "অ্যাকাউন্ট তৈরি করতে আপনার বিবরণ লিখুন": { en: "Enter your details to create an account", ar: "أدخل بياناتك لإنشاء حساب جديد" },
    "(রেট: ১$ = ১২৬৳)": { en: "(Rate: $1 = ৳126)", ar: "(السعر: $1 = ৳126)" },
    "≈ $0.00 USD (রেট: ১$ = ১২৬৳)": { en: "≈ $0.00 USD (Rate: $1 = ৳126)", ar: "≈ $0.00 USD (السعر: $1 = ৳126)" },
    "ব্যক্তিগত যোগাযোগ মাধ্যম টেলিগ্রাম": { en: "Personal Contact via Telegram", ar: "تواصل شخصي عبر تيليجرام" },
    "০ BDT (ফ্রি)": { en: "0 BDT (Free)", ar: "0 BDT (مجاني)" },
    "সোশ্যাল মিডিয়া প্যাকেজ (LV1)": { en: "Social Media Package (LV1)", ar: "باقة التواصل الاجتماعي (LV1)" },
    "দৈনিক ৬টি কাজ · প্রতি কাজ ৩০ ৳": { en: "6 Daily Tasks · ৳30 Per Task", ar: "6 مهام يومياً · ৳30 لكل مهمة" },
    "৬টি কাজ (প্রতি কাজ ৳ ৩০)": { en: "6 Tasks (৳30 Each)", ar: "6 مهام (৳30 لكل مهمة)" },
    "আপনার বর্তমান স্তর": { en: "Your Current Level", ar: "مستواك الحالي" },
    "অফিশিয়াল সার্টিফিকেট": { en: "Official Certificates", ar: "الشهادات الرسمية" },
    "• আপনার জাতীয় পরিচয়পত্র বা ওয়ালেটে থাকা আসল নাম দিন। এই নাম আপনার USDT অ্যাকাউন্ট ও প্রোফাইলে এককালীন স্বয়ংক্রিয়ভাবে ব্যবহৃত হবে।": { en: "• Enter your real name from your National ID or wallet. This name will be saved permanently for your USDT account and profile.", ar: "• أدخل اسمك الحقيقي كما يظهر في هويتك أو محفظتك. سيتم حفظه تلقائياً لحساب USDT وملفك الشخصي." },
    "রিচার্জের পরিমাণ নির্বাচন করুন (USD):": { en: "Select Recharge Amount (USD):", ar: "اختر مبلغ الشحن (USD):" },
    "মেয়াদ": { en: "Valid Time", ar: "الصلاحية" },
    "৫ দিন": { en: "5 Days", ar: "5 أيام" },
    "৩০ দিন": { en: "30 Days", ar: "30 يوماً" },
    "$0.00 ফ্রি · বর্তমান স্তর": { en: "$0.00 Free · Current Level", ar: "$0.00 مجاني · المستوى الحالي" },
    "আনলক করুন": { en: "Unlock Now", ar: "فتح الآن" },
    "ফ্রি": { en: "Free", ar: "مجاني" },
    "দৈনিক ৬টি কাজ · প্রতি কাজ $0.24 USD": { en: "6 Daily Tasks · $0.24 USD Per Task", ar: "6 مهام يومياً · $0.24 USD لكل مهمة" },
    "৬টি কাজ (প্রতি কাজ $0.24)": { en: "6 Tasks ($0.24 Per Task)", ar: "6 مهام ($0.24 لكل مهمة)" },
    "🗑️ রিমুভ": { en: "🗑️ Remove", ar: "🗑️ حذف" },
    "রিমুভ": { en: "Remove", ar: "حذف" },
    "বন্ধ করতে টানুন": { en: "Drag to close", ar: "اسحب للإغلاق" },
    "আপনার ইনভাইট লিংক দিয়ে বন্ধুদের জয়েন করান। শুধু ফ্রি রেফার করলে গণ্য হবে না — A-লেভেলের সদস্যরা প্যাকেজ (LV1+) ক্রয় করলেই সক্রিয় হবে এবং বেতন অগ্রগতি বাড়বে।": { en: "Invite friends using your link. Free signups do not count — A-Level members become active once they purchase a VIP package (LV1+).", ar: "ادعُ أصدقاءك عبر رابط الدعوة. التسجيل المجاني لا يُحتسب — يصبح أعضاء المستوى A نشطين بعد شراء باقة مدفوعة (LV1+)." },
    "এসএমএস যাচাইকরণ কোড লিখুন": { en: "Enter SMS verification code", ar: "أدخل رمز التحقق SMS" },
    "প্রকৃত নাম লিখুন": { en: "Enter real name", ar: "أدخل الاسم الحقيقي" },
    "বিকাশ নম্বর লিখুন": { en: "Enter bKash number", ar: "أدخل رقم bKash" },
    "নগদ নম্বর লিখুন": { en: "Enter Nagad number", ar: "أدخل رقم Nagad" },
    "আপনার প্রকৃত নাম লিখুন": { en: "Enter your full legal name", ar: "أدخل اسمك القانوني الكامل" },
    "পরিমাণ লিখুন ($ USD)": { en: "Enter amount ($ USD)", ar: "أدخل المبلغ ($ USD)" },
    "পরিমাণ লিখুন (USD)": { en: "Enter amount (USD)", ar: "أدخل المبلغ (USD)" },
    "১২৬ থেকে ৫০,০০০": { en: "126 to 50,000", ar: "من 126 إلى 50,000" },
    "Language": { en: "Language", ar: "اللغة" },
    "Phone Number": { en: "Phone Number", ar: "رقم الهاتف" },
    "Employee Benefits": { en: "Employee Benefits", ar: "مزايا الموظفين" },
    "Customer Service": { en: "Customer Service", ar: "خدمة العملاء" },
    "Refer & Earn": { en: "Refer & Earn", ar: "ادعُ واربح" },
    "First Time": { en: "First Time", ar: "أول مرة" },
    "Deposit $30": { en: "Deposit $30", ar: "إيداع 30$" },
    "Bonus $2": { en: "Bonus $2", ar: "مكافأة 2$" },
    "First Time Deposit $30": { en: "First Time Deposit $30", ar: "أول إيداع 30$" },
    "Payment method": { en: "Payment method", ar: "طريقة الدفع" },
    "Manual recharge": { en: "Manual recharge", ar: "شحن يدوي" },
    "Fast and convenient": { en: "Fast and convenient", ar: "سريع ومريح" },
    "Deposit": { en: "Deposit", ar: "إيداع" },
    "Crypto transfer": { en: "Crypto transfer", ar: "تحويل عملات رقمية" },
    "Network": { en: "Network", ar: "الشبكة" },
    "Recommended": { en: "Recommended", ar: "موصى به" },
    "Deposit Address (BEP20):": { en: "Deposit Address (BEP20):", ar: "عنوان الإيداع (BEP20):" },
    "Live Address": { en: "Live Address", ar: "عنوان مباشر" },
    "Select country": { en: "Select country", ar: "اختر الدولة" },
    "Task Reward": { en: "Task Reward", ar: "مكافأة المهمة" },
    "Today Earnings": { en: "Today Earnings", ar: "أرباح اليوم" },
    "Log Out": { en: "Log Out", ar: "تسجيل الخروج" },
    "Total Team Commission": { en: "Total Team Commission", ar: "إجمالي عمولة الفريق" },
    "Package Commission": { en: "Package Commission", ar: "عمولة الباقات" },
    "Daily Task Commission": { en: "Daily Task Commission", ar: "عمولة المهام اليومية" },
    "Commission Records": { en: "Commission Records", ar: "سجلات العمولات" },
    "No commission records in this tier yet": { en: "No commission records in this tier yet", ar: "لا توجد سجلات عمولات في هذا المستوى بعد" }
  };

  // Placeholders dictionary
  const placeholderMap = {
    'login-email': {
      bn: 'আপনার ফোন নম্বর লিখুন',
      en: 'Enter your phone number',
      ar: 'أدخل رقم هاتفك'
    },
    'login-password': {
      bn: 'আপনার পাসওয়ার্ড লিখুন',
      en: 'Enter your password',
      ar: 'أدخل كلمة المرور'
    },
    'register-phone': {
      bn: 'ফোন নম্বর লিখুন',
      en: 'Enter phone number',
      ar: 'أدخل رقم الهاتف'
    },
    'register-sms-code': {
      bn: 'এসএমএস যাচাইকরণ কোড লিখুন',
      en: 'Enter SMS verification code',
      ar: 'أدخل رمز التحقق SMS'
    },
    'register-password': {
      bn: 'আপনার পাসওয়ার্ড দিন',
      en: 'Enter password',
      ar: 'أدخل كلمة المرور'
    },
    'confirm-password': {
      bn: 'আপনার পাসওয়ার্ড নিশ্চিত করুন',
      en: 'Confirm password',
      ar: 'تأكيد كلمة المرور'
    },
    'register-invite-code': {
      bn: 'আমন্ত্রণ কোড (যদি থাকে)',
      en: 'Invitation code (optional)',
      ar: 'رمز الدعوة (اختياري)'
    },
    'withdraw-amount-input': {
      bn: 'উত্তোলনের পরিমাণ লিখুন',
      en: 'Enter withdrawal amount',
      ar: 'أدخل مبلغ السحب'
    },
    'custom-deposit-amount': {
      bn: 'পরিমাণ লিখুন (USD)',
      en: 'Enter amount (USD)',
      ar: 'أدخل المبلغ (USD)'
    },
    'inline-custom-deposit-amount': {
      bn: 'পরিমাণ লিখুন ($ USD)',
      en: 'Enter amount ($ USD)',
      ar: 'أدخل المبلغ ($ USD)'
    },
    'gateway-custom-amount': {
      bn: '১২৬ থেকে ৫০,০০০',
      en: '126 to 50,000',
      ar: 'من 126 إلى 50,000'
    },
    'withdraw-sheet-amount': {
      bn: 'প্রত্যাহার পরিমাণ লিখুন দয়া করে',
      en: 'Please enter withdrawal amount',
      ar: 'يرجى إدخال مبلغ السحب'
    },
    'withdraw-sheet-fund-password': {
      bn: '৬ ডিজিটের ফান্ডের পাসওয়ার্ড লিখুন',
      en: 'Enter 6-digit fund password',
      ar: 'أدخل كلمة مرور الصندوق من 6 أرقام'
    },
    'bkash-fullname-input': {
      bn: 'প্রকৃত নাম লিখুন',
      en: 'Enter full name',
      ar: 'أدخل الاسم الكامل'
    },
    'bkash-phone-input': {
      bn: 'বিকাশ নম্বর লিখুন',
      en: 'Enter bKash number',
      ar: 'أدخل رقم bKash'
    },
    'nagad-fullname-input': {
      bn: 'প্রকৃত নাম লিখুন',
      en: 'Enter full name',
      ar: 'أدخل الاسم الكامل'
    },
    'nagad-phone-input': {
      bn: 'নগদ নম্বর লিখুন',
      en: 'Enter Nagad number',
      ar: 'أدخل رقم Nagad'
    },
    'usdt-fullname-input': {
      bn: 'প্রকৃত নাম লিখুন',
      en: 'Enter full name',
      ar: 'أدخل الاسم الكامل'
    },
    'usdt-address-input': {
      bn: 'BEP20 ওয়ালেট ঠিকানা লিখুন (0x...)',
      en: 'Enter BEP20 wallet address (0x...)',
      ar: 'أدخل عنوان محفظة BEP20 (...0x)'
    },
    'realname-fullname-input': {
      bn: 'আপনার প্রকৃত নাম লিখুন',
      en: 'Enter your full legal name',
      ar: 'أدخل اسمك القانوني الكامل'
    },
    'fund-password-new-input': {
      bn: '৬ ডিজিটের উত্তোলন পাসওয়ার্ড লিখুন',
      en: 'Enter 6-digit withdrawal password',
      ar: 'أدخل كلمة مرور السحب من 6 أرقام'
    },
    'fund-password-confirm-input': {
      bn: '৬ ডিজিটের পাসওয়ার্ড কনফার্ম করুন',
      en: 'Confirm 6-digit password',
      ar: 'تأكيد كلمة المرور من 6 أرقام'
    },
    'login-password-old-input': {
      bn: 'পুরানো পাসওয়ার্ড লিখুন',
      en: 'Enter old password',
      ar: 'أدخل كلمة المرور القديمة'
    },
    'login-password-new-input': {
      bn: 'নতুন পাসওয়ার্ড লিখুন',
      en: 'Enter new password',
      ar: 'أدخل كلمة المرور الجديدة'
    },
    'login-password-confirm-input': {
      bn: 'নতুন পাসওয়ার্ড কনফার্ম করুন',
      en: 'Confirm new password',
      ar: 'تأكيد كلمة المرور الجديدة'
    },
    'savings-deposit-input': {
      bn: 'আপনার সঞ্চয় লিখুন (যেমন: ৩৫০০)',
      en: 'Enter savings amount (e.g. 30)',
      ar: 'أدخل مبلغ الادخار'
    },
    'bd-recharge-amount-input': {
      bn: '১২৬ থেকে ৫০,০০০',
      en: '126 to 50,000',
      ar: 'من 126 إلى 50,000'
    },
    'mission-submit-comment': {
      bn: 'দয়া করে এখানে প্রবেশ করুন...',
      en: 'Please enter comment here...',
      ar: 'يرجى كتابة التعليق هنا...'
    }
  };

  function getCurrentCountryCode() {
    try {
      const user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
      if (user) {
        if (user.country) {
          return String(user.country).trim().toUpperCase();
        }
        if (user.currency === 'USD' || (user.dialCode && user.dialCode !== '+880')) {
          return user.country || 'US';
        }
        return 'BD';
      }
    } catch(e) {}
    const regCode = document.getElementById('register-country-code');
    if (regCode && regCode.value) return String(regCode.value).trim().toUpperCase();
    const regSelect = document.getElementById('register-country-select');
    if (regSelect && regSelect.value) return String(regSelect.value).trim().toUpperCase();
    const loginSelect = document.getElementById('login-country-select');
    if (loginSelect && loginSelect.value) return String(loginSelect.value).trim().toUpperCase();
    return 'BD';
  }

  function getCountryAllowedLanguages() {
    return VALID_LANGS.slice();
  }

  // Initial language resolution: English ('en') is default for all countries unless manually changed.
  let currentLang = 'en';
  try {
    const user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
    const isManualLang = localStorage.getItem('alo_lang_manual') === '1';
    const storedLang = localStorage.getItem('alo_lang') || localStorage.getItem('lang');
    if (user && user.languageManual && user.language) {
      currentLang = normalizeLangCode(user.language);
    } else if (isManualLang && storedLang) {
      currentLang = normalizeLangCode(storedLang);
    } else {
      currentLang = 'en';
      localStorage.setItem('alo_lang', 'en');
      localStorage.setItem('lang', 'en');
    }
  } catch(e) {
    currentLang = 'en';
  }

  const multiLangUiMap = {
    'Language': { tl: 'Wika', ko: '언어', vi: 'Ngôn ngữ', tr: 'Dil', hi: 'भाषा', id: 'Bahasa', ms: 'Bahasa', pt: 'Idioma', es: 'Idioma', ru: 'Язык' },
    'Change Language': { tl: 'Palitan ang Wika', ko: '언어 변경', vi: 'Đổi ngôn ngữ', tr: 'Dili Değiştir', hi: 'भाषा बदलें', id: 'Ubah Bahasa', ms: 'Tukar Bahasa', pt: 'Alterar Idioma', es: 'Cambiar Idioma', ru: 'Сменить язык' },
    'Home': { tl: 'Tahanan', ko: '홈', vi: 'Trang chủ', tr: 'Ana Sayfa', hi: 'होम', id: 'Beranda', ms: 'Utama', pt: 'Início', es: 'Inicio', ru: 'Главная' },
    'Hall': { tl: 'Bulwagan', ko: '홀', vi: 'Sảnh', tr: 'Salon', hi: 'हॉल', id: 'Aula', ms: 'Dewan', pt: 'Salão', es: 'Sala', ru: 'Зал' },
    'Tasks': { tl: 'Mga Gawain', ko: '작업', vi: 'Nhiệm vụ', tr: 'Görevler', hi: 'कार्य', id: 'Tugas', ms: 'Tugasan', pt: 'Tarefas', es: 'Tareas', ru: 'Задачи' },
    'Mine': { tl: 'Akin', ko: '마이', vi: 'Của tôi', tr: 'Benim', hi: 'मेरा', id: 'Milik Saya', ms: 'Saya', pt: 'Meu', es: 'Mío', ru: 'Профиль' },
    'Login': { tl: 'Mag-login', ko: '로그인', vi: 'Đăng nhập', tr: 'Giriş Yap', hi: 'लॉगिन', id: 'Masuk', ms: 'Log Masuk', pt: 'Entrar', es: 'Iniciar sesión', ru: 'Войти' },
    'Sign In': { tl: 'Mag-sign In', ko: '로그인', vi: 'Đăng nhập', tr: 'Giriş Yap', hi: 'साइन इन', id: 'Masuk', ms: 'Log Masuk', pt: 'Entrar', es: 'Iniciar sesión', ru: 'Войти' },
    'Register': { tl: 'Magrehistro', ko: '회원가입', vi: 'Đăng ký', tr: 'Kayıt Ol', hi: 'पंजीकरण', id: 'Daftar', ms: 'Daftar', pt: 'Registrar', es: 'Registrarse', ru: 'Регистрация' },
    'Create Account': { tl: 'Gumawa ng Account', ko: '계정 만들기', vi: 'Tạo tài khoản', tr: 'Hesap Oluştur', hi: 'खाता बनाएं', id: 'Buat Akun', ms: 'Cipta Akaun', pt: 'Criar Conta', es: 'Crear Cuenta', ru: 'Создать аккаунт' },
    'Sign Out': { tl: 'Mag-sign Out', ko: '로그아웃', vi: 'Đăng xuất', tr: 'Çıkış Yap', hi: 'साइन आउट', id: 'Keluar', ms: 'Log Keluar', pt: 'Sair', es: 'Cerrar sesión', ru: 'Выйти' },
    'Logout': { tl: 'Mag-logout', ko: '로그아웃', vi: 'Đăng xuất', tr: 'Çıkış Yap', hi: 'लॉगआउट', id: 'Keluar', ms: 'Log Keluar', pt: 'Sair', es: 'Cerrar sesión', ru: 'Выйти' },
    'Back': { tl: 'Bumalik', ko: '뒤로', vi: 'Quay lại', tr: 'Geri', hi: 'वापस', id: 'Kembali', ms: 'Kembali', pt: 'Voltar', es: 'Atrás', ru: 'Назад' },
    'Confirm': { tl: 'Kumpirmahin', ko: '확인', vi: 'Xác nhận', tr: 'Onayla', hi: 'पुष्टि करें', id: 'Konfirmasi', ms: 'Sahkan', pt: 'Confirmar', es: 'Confirmar', ru: 'Подтвердить' },
    'Cancel': { tl: 'Kanselahin', ko: '취소', vi: 'Hủy', tr: 'İptal', hi: 'रद्द करें', id: 'Batal', ms: 'Batal', pt: 'Cancelar', es: 'Cancelar', ru: 'Отмена' },
    'Save': { tl: 'I-save', ko: '저장', vi: 'Lưu', tr: 'Kaydet', hi: 'सहेजें', id: 'Simpan', ms: 'Simpan', pt: 'Salvar', es: 'Guardar', ru: 'Сохранить' },
    'Submit': { tl: 'Isumite', ko: '제출', vi: 'Gửi', tr: 'Gönder', hi: 'सबमिट करें', id: 'Kirim', ms: 'Hantar', pt: 'Enviar', es: 'Enviar', ru: 'Отправить' },
    'Copy': { tl: 'Kopyahin', ko: '복사', vi: 'Sao chép', tr: 'Kopyala', hi: 'कॉपी करें', id: 'Salin', ms: 'Salin', pt: 'Copiar', es: 'Copiar', ru: 'Копировать' },
    'Close': { tl: 'Isara', ko: '닫기', vi: 'Đóng', tr: 'Kapat', hi: 'बंद करें', id: 'Tutup', ms: 'Tutup', pt: 'Fechar', es: 'Cerrar', ru: 'Закрыть' },
    'OK': { tl: 'OK', ko: '확인', vi: 'Đồng ý', tr: 'Tamam', hi: 'ठीक है', id: 'OK', ms: 'OK', pt: 'OK', es: 'Aceptar', ru: 'ОК' },
    'All': { tl: 'Lahat', ko: '전체', vi: 'Tất cả', tr: 'Tümü', hi: 'सभी', id: 'Semua', ms: 'Semua', pt: 'Todos', es: 'Todo', ru: 'Все' },
    'Active': { tl: 'Aktibo', ko: '활성', vi: 'Đang hoạt động', tr: 'Aktif', hi: 'सक्रिय', id: 'Aktif', ms: 'Aktif', pt: 'Ativo', es: 'Activo', ru: 'Активный' },
    'Pending': { tl: 'Nakabinbin', ko: '대기 중', vi: 'Đang chờ', tr: 'Beklemede', hi: 'लंबित', id: 'Tertunda', ms: 'Menunggu', pt: 'Pendente', es: 'Pendiente', ru: 'В ожидании' },
    'Completed': { tl: 'Nakumpleto', ko: '완료됨', vi: 'Hoàn thành', tr: 'Tamamlandı', hi: 'पूर्ण', id: 'Selesai', ms: 'Selesai', pt: 'Concluído', es: 'Completado', ru: 'Завершено' },
    'Failed': { tl: 'Nabigo', ko: '실패', vi: 'Thất bại', tr: 'Başarısız', hi: 'विफल', id: 'Gagal', ms: 'Gagal', pt: 'Falhou', es: 'Fallido', ru: 'Ошибка' },
    'In Progress': { tl: 'Isinasagawa', ko: '진행 중', vi: 'Đang thực hiện', tr: 'Devam Ediyor', hi: 'प्रगति में', id: 'Sedang Berjalan', ms: 'Sedang Berjalan', pt: 'Em andamento', es: 'En progreso', ru: 'В процессе' },
    'Under Review': { tl: 'Sinusuri', ko: '검토 중', vi: 'Đang duyệt', tr: 'İnceleniyor', hi: 'समीक्षाधीन', id: 'Sedang Ditinjau', ms: 'Dalam Semakan', pt: 'Em análise', es: 'En revisión', ru: 'На проверке' },
    'Personal Info': { tl: 'Personal na Impormasyon', ko: '개인 정보', vi: 'Thông tin cá nhân', tr: 'Kişisel Bilgiler', hi: 'व्यक्तिगत जानकारी', id: 'Info Pribadi', ms: 'Maklumat Peribadi', pt: 'Informações Pessoais', es: 'Información Personal', ru: 'Личные данные' },
    'My Wallet': { tl: 'Aking Wallet', ko: '내 지갑', vi: 'Ví của tôi', tr: 'Cüzdanım', hi: 'मेरा वॉलेट', id: 'Dompet Saya', ms: 'Dompet Saya', pt: 'Minha Carteira', es: 'Mi Billetera', ru: 'Мой кошелек' },
    'Account Record': { tl: 'Tala ng Account', ko: '계정 기록', vi: 'Lịch sử tài khoản', tr: 'Hesap Kaydı', hi: 'खाता रिकॉर्ड', id: 'Catatan Akun', ms: 'Rekod Akaun', pt: 'Registro da Conta', es: 'Registro de Cuenta', ru: 'История счета' },
    'Team Report': { tl: 'Ulat ng Koponan', ko: '팀 보고서', vi: 'Báo cáo đội nhóm', tr: 'Ekip Raporu', hi: 'टीम रिपोर्ट', id: 'Laporan Tim', ms: 'Laporan Pasukan', pt: 'Relatório da Equipe', es: 'Informe del Equipo', ru: 'Отчет команды' },
    'Invite Friends': { tl: 'Mag-imbita ng Kaibigan', ko: '친구 초대', vi: 'Mời bạn bè', tr: 'Arkadaş Davet Et', hi: 'दोस्तों को आमंत्रित करें', id: 'Undang Teman', ms: 'Jemput Rakan', pt: 'Convidar Amigos', es: 'Invitar Amigos', ru: 'Пригласить друзей' },
    'Employee Benefits': { tl: 'Benepisyo ng Empleyado', ko: '직원 혜택', vi: 'Phúc lợi nhân viên', tr: 'Çalışan Hakları', hi: 'कर्मचारी लाभ', id: 'Tunjangan Karyawan', ms: 'Faedah Pekerja', pt: 'Benefícios', es: 'Beneficios', ru: 'Бонусы сотрудников' },
    'Legal Info': { tl: 'Legal na Impormasyon', ko: '법적 정보', vi: 'Thông tin pháp lý', tr: 'Yasal Bilgiler', hi: 'कानूनी जानकारी', id: 'Info Hukum', ms: 'Maklumat Undang-undang', pt: 'Info Legal', es: 'Información Legal', ru: 'Правовая информация' },
    'Lucky Spin': { tl: 'Maswerteng Ikot', ko: '럭키 스핀', vi: 'Vòng quay may mắn', tr: 'Şans Çarkı', hi: 'लकी स्पिन', id: 'Putaran Keberuntungan', ms: 'Putaran Bertuah', pt: 'Roleta da Sorte', es: 'Ruleta de la Suerte', ru: 'Колесо удачи' },
    'APP Download': { tl: 'I-download ang APP', ko: '앱 다운로드', vi: 'Tải ứng dụng', tr: 'Uygulamayı İndir', hi: 'ऐप डाउनलोड', id: 'Unduh Aplikasi', ms: 'Muat Turun APP', pt: 'Baixar APP', es: 'Descargar APP', ru: 'Скачать приложение' },
    'Customer Service': { tl: 'Serbisyo sa Customer', ko: '고객 서비스', vi: 'Chăm sóc khách hàng', tr: 'Müşteri Hizmetleri', hi: 'ग्राहक सेवा', id: 'Layanan Pelanggan', ms: 'Khidmat Pelanggan', pt: 'Atendimento', es: 'Servicio al Cliente', ru: 'Служба поддержки' },
    'Online Support': { tl: 'Online na Suporta', ko: '온라인 지원', vi: 'Hỗ trợ trực tuyến', tr: 'Çevrimiçi Destek', hi: 'ऑनलाइन सहायता', id: 'Dukungan Online', ms: 'Sokongan Dalam Talian', pt: 'Suporte Online', es: 'Soporte en Línea', ru: 'Онлайн-поддержка' },
    'Account': { tl: 'Account', ko: '계정', vi: 'Tài khoản', tr: 'Hesap', hi: 'खाता', id: 'Akun', ms: 'Akaun', pt: 'Conta', es: 'Cuenta', ru: 'Аккаунт' },
    'Team & Income': { tl: 'Koponan at Kita', ko: '팀 및 수익', vi: 'Đội nhóm & Thu nhập', tr: 'Ekip ve Gelir', hi: 'टीम और आय', id: 'Tim & Pendapatan', ms: 'Pasukan & Pendapatan', pt: 'Equipe e Renda', es: 'Equipo e Ingresos', ru: 'Команда и доход' },
    'Support & More': { tl: 'Suporta at Iba Pa', ko: '지원 및 더보기', vi: 'Hỗ trợ & Thêm', tr: 'Destek ve Daha Fazlası', hi: 'सहायता और अधिक', id: 'Dukungan & Lainnya', ms: 'Sokongan & Lagi', pt: 'Suporte e Mais', es: 'Soporte y Más', ru: 'Поддержка и еще' },
    'Deposit': { tl: 'Magdeposito', ko: '입금', vi: 'Nạp tiền', tr: 'Yatır', hi: 'जमा करें', id: 'Deposit', ms: 'Deposit', pt: 'Depositar', es: 'Depositar', ru: 'Пополнить' },
    'Recharge': { tl: 'Mag-recharge', ko: '충전', vi: 'Nạp tiền', tr: 'Yükle', hi: 'रिचार्ज', id: 'Isi Ulang', ms: 'Tambah Nilai', pt: 'Recarregar', es: 'Recargar', ru: 'Пополнить' },
    '+ Recharge': { tl: '+ Mag-recharge', ko: '+ 충전', vi: '+ Nạp tiền', tr: '+ Yükle', hi: '+ रिचार्ज', id: '+ Isi Ulang', ms: '+ Tambah Nilai', pt: '+ Recarregar', es: '+ Recargar', ru: '+ Пополнить' },
    'Withdraw': { tl: 'Mag-withdraw', ko: '출금', vi: 'Rút tiền', tr: 'Para Çek', hi: 'निकासी', id: 'Tarik Dana', ms: 'Keluarkan', pt: 'Sacar', es: 'Retirar', ru: 'Вывести' },
    'Balance': { tl: 'Balanse', ko: '잔액', vi: 'Số dư', tr: 'Bakiye', hi: 'बैलेंस', id: 'Saldo', ms: 'Baki', pt: 'Saldo', es: 'Saldo', ru: 'Баланс' },
    'Total Balance': { tl: 'Kabuuang Balanse', ko: '총 잔액', vi: 'Tổng số dư', tr: 'Toplam Bakiye', hi: 'कुल बैलेंस', id: 'Total Saldo', ms: 'Jumlah Baki', pt: 'Saldo Total', es: 'Saldo Total', ru: 'Общий баланс' },
    'Package Balance': { tl: 'Balanse ng Package', ko: '패키지 잔액', vi: 'Số dư gói', tr: 'Paket Bakiyesi', hi: 'पैकेज बैलेंस', id: 'Saldo Paket', ms: 'Baki Pakej', pt: 'Saldo do Pacote', es: 'Saldo del Paquete', ru: 'Баланс пакета' },
    "Today's Earnings": { tl: 'Kita Ngayon', ko: '오늘의 수익', vi: 'Thu nhập hôm nay', tr: 'Bugünkü Kazanç', hi: 'आज की कमाई', id: 'Pendapatan Hari Ini', ms: 'Pendapatan Hari Ini', pt: 'Ganhos de Hoje', es: 'Ganancias de Hoy', ru: 'Доход за сегодня' },
    'Total Revenue': { tl: 'Kabuuang Kita', ko: '총 수익', vi: 'Tổng thu nhập', tr: 'Toplam Gelir', hi: 'कुल आय', id: 'Total Pendapatan', ms: 'Jumlah Hasil', pt: 'Receita Total', es: 'Ingresos Totales', ru: 'Общий доход' },
    'Your Current Level': { tl: 'Iyong Kasalukuyang Level', ko: '현재 등급', vi: 'Cấp độ hiện tại', tr: 'Mevcut Seviyeniz', hi: 'आपका वर्तमान स्तर', id: 'Level Anda Saat Ini', ms: 'Tahap Semasa Anda', pt: 'Seu Nível Atual', es: 'Tu Nivel Actual', ru: 'Ваш текущий уровень' },
    'Daily Tasks': { tl: 'Pang-araw-araw na Gawain', ko: '일일 작업', vi: 'Nhiệm vụ hàng ngày', tr: 'Günlük Görevler', hi: 'दैनिक कार्य', id: 'Tugas Harian', ms: 'Tugasan Harian', pt: 'Tarefas Diárias', es: 'Tareas Diarias', ru: 'Ежедневные задачи' },
    'Daily Income': { tl: 'Pang-araw-araw na Kita', ko: '일일 수익', vi: 'Thu nhập hàng ngày', tr: 'Günlük Gelir', hi: 'दैनिक आय', id: 'Pendapatan Harian', ms: 'Pendapatan Harian', pt: 'Renda Diária', es: 'Ingreso Diario', ru: 'Ежедневный доход' },
    'Monthly Income': { tl: 'Buwanang Kita', ko: '월간 수익', vi: 'Thu nhập hàng tháng', tr: 'Aylık Gelir', hi: 'मासिक आय', id: 'Pendapatan Bulanan', ms: 'Pendapatan Bulanan', pt: 'Renda Mensal', es: 'Ingreso Mensual', ru: 'Месячный доход' },
    'Task Hall': { tl: 'Bulwagan ng Gawain', ko: '작업 홀', vi: 'Sảnh nhiệm vụ', tr: 'Görev Salonu', hi: 'कार्य हॉल', id: 'Aula Tugas', ms: 'Dewan Tugasan', pt: 'Salão de Tarefas', es: 'Sala de Tareas', ru: 'Зал заданий' },
    'Mission Hall': { tl: 'Bulwagan ng Misyon', ko: '미션 홀', vi: 'Sảnh nhiệm vụ', tr: 'Görev Salonu', hi: 'मिशन हॉल', id: 'Aula Misi', ms: 'Dewan Misi', pt: 'Salão de Missões', es: 'Sala de Misiones', ru: 'Зал миссий' },
    'Company Profile': { tl: 'Profile ng Kumpanya', ko: '회사 소개', vi: 'Hồ sơ công ty', tr: 'Şirket Profili', hi: 'कंपनी प्रोफ़ाइल', id: 'Profil Perusahaan', ms: 'Profil Syarikat', pt: 'Perfil da Empresa', es: 'Perfil de la Empresa', ru: 'О компании' },
    'Security Center': { tl: 'Sentro ng Seguridad', ko: '보안 센터', vi: 'Trung tâm bảo mật', tr: 'Güvenlik Merkezi', hi: 'सुरक्षा केंद्र', id: 'Pusat Keamanan', ms: 'Pusat Keselamatan', pt: 'Centro de Segurança', es: 'Centro de Seguridad', ru: 'Центр безопасности' },
    'Fund Password': { tl: 'Password ng Pondo', ko: '자금 비밀번호', vi: 'Mật khẩu quỹ', tr: 'Fon Şifresi', hi: 'फंड पासवर्ड', id: 'Kata Sandi Dana', ms: 'Kata Laluan Dana', pt: 'Senha de Fundos', es: 'Contraseña de Fondos', ru: 'Платежный пароль' },
    'Login Password': { tl: 'Password sa Pag-login', ko: '로그인 비밀번호', vi: 'Mật khẩu đăng nhập', tr: 'Giriş Şifresi', hi: 'लॉगिन पासवर्ड', id: 'Kata Sandi Masuk', ms: 'Kata Laluan Log Masuk', pt: 'Senha de Login', es: 'Contraseña de Acceso', ru: 'Пароль входа', ar: 'كلمة مرور الدخول' },
    'Old Password': { tl: 'Lumang Password', ko: '기존 비밀번호', vi: 'Mật khẩu cũ', tr: 'Eski Şifre', hi: 'पुराना पासवर्ड', id: 'Kata Sandi Lama', ms: 'Kata Laluan Lama', pt: 'Senha Antiga', es: 'Contraseña Anterior', ru: 'Старый пароль', ar: 'كلمة المرور القديمة' },
    'New Password': { tl: 'Bagong Password', ko: '새 비밀번호', vi: 'Mật khẩu mới', tr: 'Yeni Şifre', hi: 'नया पासवर्ड', id: 'Kata Sandi Baru', ms: 'Kata Laluan Baharu', pt: 'Nova Senha', es: 'Nueva Contraseña', ru: 'Новый пароль', ar: 'كلمة المرور الجديدة' },
    'Confirm Password': { tl: 'Kumpirmahin ang Password', ko: '비밀번호 확인', vi: 'Xác nhận mật khẩu', tr: 'Şifreyi Onayla', hi: 'पासवर्ड की पुष्टि करें', id: 'Konfirmasi Kata Sandi', ms: 'Sahkan Kata Laluan', pt: 'Confirmar Senha', es: 'Confirmar Contraseña', ru: 'Подтвердите пароль', ar: 'تأكيد كلمة المرور' },
    'Enter old password': { tl: 'Ilagay ang lumang password', ko: '기존 비밀번호 입력', vi: 'Nhập mật khẩu cũ', tr: 'Eski şifreyi girin', hi: 'पुराना पासवर्ड दर्ज करें', id: 'Masukkan kata sandi lama', ms: 'Masukkan kata laluan lama', pt: 'Digite a senha antiga', es: 'Ingrese la contraseña anterior', ru: 'Введите старый пароль', ar: 'أدخل كلمة المرور القديمة' },
    'Enter new password': { tl: 'Ilagay ang bagong password', ko: '새 비밀번호 입력', vi: 'Nhập mật khẩu mới', tr: 'Yeni şifreyi girin', hi: 'नया पासवर्ड दर्ज करें', id: 'Masukkan kata sandi baru', ms: 'Masukkan kata laluan baharu', pt: 'Digite a nova senha', es: 'Ingrese la nueva contraseña', ru: 'Введите новый пароль', ar: 'أدخل كلمة المرور الجديدة' },
    'Confirm new password': { tl: 'Kumpirmahin ang bagong password', ko: '새 비밀번호 확인', vi: 'Xác nhận mật khẩu mới', tr: 'Yeni şifreyi onaylayın', hi: 'नए पासवर्ड की पुष्टि करें', id: 'Konfirmasi kata sandi baru', ms: 'Sahkan kata laluan baharu', pt: 'Confirme a nova senha', es: 'Confirme la nueva contraseña', ru: 'Подтвердите новый пароль', ar: 'تأكيد كلمة المرور الجديدة' },
    'Please enter your old password.': { tl: 'Pakilagay ang iyong lumang password.', ko: '기존 비밀번호를 입력하세요.', vi: 'Vui lòng nhập mật khẩu cũ.', tr: 'Lütfen eski şifrenizi girin.', hi: 'कृपया अपना पुराना पासवर्ड दर्ज करें।', id: 'Silakan masukkan kata sandi lama Anda.', ms: 'Sila masukkan kata laluan lama anda.', pt: 'Por favor, digite sua senha antiga.', es: 'Por favor, ingrese su contraseña anterior.', ru: 'Пожалуйста, введите старый пароль.', ar: 'يرجى إدخال كلمة المرور القديمة.' },
    'Please enter a new password.': { tl: 'Pakilagay ang bagong password.', ko: '새 비밀번호를 입력하세요.', vi: 'Vui lòng nhập mật khẩu mới.', tr: 'Lütfen yeni şifrenizi girin.', hi: 'कृपया नया पासवर्ड दर्ज करें।', id: 'Silakan masukkan kata sandi baru.', ms: 'Sila masukkan kata laluan baharu.', pt: 'Por favor, digite uma nova senha.', es: 'Por favor, ingrese una nueva contraseña.', ru: 'Пожалуйста, введите новый пароль.', ar: 'يرجى إدخال كلمة مرور جديدة.' },
    'New password must be at least 6 characters.': { tl: 'Ang bagong password ay dapat hindi bababa sa 6 na karakter.', ko: '새 비밀번호는 최소 6자 이상이어야 합니다.', vi: 'Mật khẩu mới phải có ít nhất 6 ký tự.', tr: 'Yeni şifre en az 6 karakter olmalıdır.', hi: 'नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।', id: 'Kata sandi baru minimal 6 karakter.', ms: 'Kata laluan baharu mestilah sekurang-kurangnya 6 aksara.', pt: 'A nova senha deve ter pelo menos 6 caracteres.', es: 'La nueva contraseña debe tener al menos 6 caracteres.', ru: 'Новый пароль должен содержать не менее 6 символов.', ar: 'يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل.' },
    'Please confirm your new password.': { tl: 'Pakikumpirma ang iyong bagong password.', ko: '새 비밀번호를 확인하세요.', vi: 'Vui lòng xác nhận mật khẩu mới.', tr: 'Lütfen yeni şifrenizi onaylayın.', hi: 'कृपया अपने नए पासवर्ड की पुष्टि करें।', id: 'Silakan konfirmasi kata sandi baru Anda.', ms: 'Sila sahkan kata laluan baharu anda.', pt: 'Por favor, confirme sua nova senha.', es: 'Por favor, confirme su nueva contraseña.', ru: 'Пожалуйста, подтвердите новый пароль.', ar: 'يرجى تأكيد كلمة المرور الجديدة.' },
    'New password and confirm password do not match.': { tl: 'Hindi tugma ang bagong password at kumpirmasyon.', ko: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.', vi: 'Mật khẩu mới và xác nhận mật khẩu không khớp.', tr: 'Yeni şifre ve onay şifresi eşleşmiyor.', hi: 'नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।', id: 'Kata sandi baru dan konfirmasi tidak cocok.', ms: 'Kata laluan baharu dan pengesahan tidak sepadan.', pt: 'A nova senha e a confirmação não coincidem.', es: 'La nueva contraseña y la confirmación no coinciden.', ru: 'Новый пароль и подтверждение не совпадают.', ar: 'كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقين.' },
    'New password must be different from old password.': { tl: 'Ang bagong password ay dapat iba sa lumang password.', ko: '새 비밀번호는 기존 비밀번호와 달라야 합니다.', vi: 'Mật khẩu mới phải khác mật khẩu cũ.', tr: 'Yeni şifre eski şifreden farklı olmalıdır.', hi: 'नया पासवर्ड पुराने पासवर्ड से अलग होना चाहिए।', id: 'Kata sandi baru harus berbeda dari kata sandi lama.', ms: 'Kata laluan baharu mesti berbeza daripada kata laluan lama.', pt: 'A nova senha deve ser diferente da senha antiga.', es: 'La nueva contraseña debe ser diferente de la anterior.', ru: 'Новый пароль должен отличаться от старого.', ar: 'يجب أن تكون كلمة المرور الجديدة مختلفة عن القديمة.' },
    'Old password is incorrect.': { tl: 'Mali ang lumang password.', ko: '기존 비밀번호가 올바르지 않습니다.', vi: 'Mật khẩu cũ không đúng.', tr: 'Eski şifre yanlış.', hi: 'पुराना पासवर्ड गलत है।', id: 'Kata sandi lama salah.', ms: 'Kata laluan lama tidak betul.', pt: 'A senha antiga está incorreta.', es: 'La contraseña anterior es incorrecta.', ru: 'Старый пароль неверен.', ar: 'كلمة المرور القديمة غير صحيحة.' },
    'Verifying old password…': { tl: 'Bineberipika ang lumang password…', ko: '기존 비밀번호 확인 중…', vi: 'Đang xác minh mật khẩu cũ…', tr: 'Eski şifre doğrulanıyor…', hi: 'पुराना पासवर्ड सत्यापित किया जा रहा है…', id: 'Memverifikasi kata sandi lama…', ms: 'Mengesahkan kata laluan lama…', pt: 'Verificando senha antiga…', es: 'Verificando contraseña anterior…', ru: 'Проверка старого пароля…', ar: 'جاري التحقق من كلمة المرور القديمة…' },
    'Verifying & updating…': { tl: 'Bineberipika at ina-update…', ko: '확인 및 업데이트 중…', vi: 'Đang xác minh & cập nhật…', tr: 'Doğrulanıyor ve güncelleniyor…', hi: 'सत्यापन और अपडेट हो रहा है…', id: 'Memverifikasi & memperbarui…', ms: 'Mengesahkan & mengemas kini…', pt: 'Verificando e atualizando…', es: 'Verificando y actualizando…', ru: 'Проверка и обновление…', ar: 'جاري التحقق والتحديث…' },
    'Login password changed successfully.': { tl: 'Matagumpay na napalitan ang password sa pag-login.', ko: '로그인 비밀번호가 성공적으로 변경되었습니다.', vi: 'Đã đổi mật khẩu đăng nhập thành công.', tr: 'Giriş şifresi başarıyla değiştirildi.', hi: 'लॉगिन पासवर्ड सफलतापूर्वक बदल गया है।', id: 'Kata sandi masuk berhasil diubah.', ms: 'Kata laluan log masuk berjaya ditukar.', pt: 'Senha de login alterada com sucesso.', es: 'Contraseña de acceso cambiada con éxito.', ru: 'Пароль входа успешно изменен.', ar: 'تم تغيير كلمة مرور الدخول بنجاح.' },
    'Unable to update password. Please try again.': { tl: 'Hindi ma-update ang password. Pakisubukan muli.', ko: '비밀번호를 업데이트할 수 없습니다. 다시 시도하세요.', vi: 'Không thể cập nhật mật khẩu. Vui lòng thử lại.', tr: 'Şifre güncellenemedi. Lütfen tekrar deneyin.', hi: 'पासवर्ड अपडेट करने में असमर्थ। कृपया पुनः प्रयास करें।', id: 'Tidak dapat memperbarui kata sandi. Silakan coba lagi.', ms: 'Tidak dapat mengemas kini kata laluan. Sila cuba lagi.', pt: 'Não foi possível atualizar a senha. Tente novamente.', es: 'No se pudo actualizar la contraseña. Inténtelo de nuevo.', ru: 'Не удалось обновить пароль. Попробуйте еще раз.', ar: 'تعذر تحديث كلمة المرور. يرجى المحاولة مرة أخرى.' },
    'Real Name': { tl: 'Tunay na Pangalan', ko: '실명', vi: 'Họ và tên thật', tr: 'Gerçek Ad', hi: 'असली नाम', id: 'Nama Asli', ms: 'Nama Sebenar', pt: 'Nome Real', es: 'Nombre Real', ru: 'Настоящее имя' },
    'Account Number:': { tl: 'Numero ng Account:', ko: '계정 번호:', vi: 'Số tài khoản:', tr: 'Hesap Numarası:', hi: 'खाता संख्या:', id: 'Nomor Akun:', ms: 'Nombor Akaun:', pt: 'Número da Conta:', es: 'Número de Cuenta:', ru: 'Номер счета:' },
    'Invite Code:': { tl: 'Code ng Imbitasyon:', ko: '초대 코드:', vi: 'Mã mời:', tr: 'Davet Kodu:', hi: 'आमंत्रण कोड:', id: 'Kode Undangan:', ms: 'Kod Jemputan:', pt: 'Código de Convite:', es: 'Código de Invitación:', ru: 'Код приглашения:' },
    'Copy Invite Code': { tl: 'Kopyahin ang Code', ko: '초대 코드 복사', vi: 'Sao chép mã mời', tr: 'Davet Kodunu Kopyala', hi: 'कोड कॉपी करें', id: 'Salin Kode Undangan', ms: 'Salin Kod Jemputan', pt: 'Copiar Código', es: 'Copiar Código', ru: 'Копировать код' },
    'Copy Invite Link': { tl: 'Kopyahin ang Link', ko: '초대 링크 복사', vi: 'Sao chép liên kết', tr: 'Davet Linkini Kopyala', hi: 'लिंक कॉपी करें', id: 'Salin Tautan Undangan', ms: 'Salin Pautan Jemputan', pt: 'Copiar Link', es: 'Copiar Enlace', ru: 'Копировать ссылку' },
    'Total Commission': { tl: 'Kabuuang Komisyon', ko: '총 커미션', vi: 'Tổng hoa hồng', tr: 'Toplam Komisyon', hi: 'कुल कमीशन', id: 'Total Komisi', ms: 'Jumlah Komisen', pt: 'Comissão Total', es: 'Comisión Total', ru: 'Общая комиссия' },
    'Team Members': { tl: 'Mga Miyembro ng Koponan', ko: '팀 멤버', vi: 'Thành viên đội', tr: 'Ekip Üyeleri', hi: 'टीम के सदस्य', id: 'Anggota Tim', ms: 'Ahli Pasukan', pt: 'Membros da Equipe', es: 'Miembros del Equipo', ru: 'Участники команды' },
    'New Today': { tl: 'Bago Ngayon', ko: '오늘 신규', vi: 'Mới hôm nay', tr: 'Bugün Yeni', hi: 'आज नए', id: 'Baru Hari Ini', ms: 'Baru Hari Ini', pt: 'Novos Hoje', es: 'Nuevos Hoy', ru: 'Новые сегодня' },
    'Welcome Back': { tl: 'Maligayang Pagbabalik', ko: '다시 오신 것을 환영합니다', vi: 'Chào mừng trở lại', tr: 'Tekrar Hoş Geldiniz', hi: 'वापसी पर स्वागत है', id: 'Selamat Datang Kembali', ms: 'Selamat Kembali', pt: 'Bem-vindo de Volta', es: 'Bienvenido de Nuevo', ru: 'С возвращением' },
    'Phone Number': { tl: 'Numero ng Telepono', ko: '전화번호', vi: 'Số điện thoại', tr: 'Telefon Numarası', hi: 'फ़ोन नंबर', id: 'Nomor Telepon', ms: 'Nombor Telefon', pt: 'Número de Telefone', es: 'Número de Teléfono', ru: 'Номер телефона' },
    'Password': { tl: 'Password', ko: '비밀번호', vi: 'Mật khẩu', tr: 'Şifre', hi: 'पासवर्ड', id: 'Kata Sandi', ms: 'Kata Laluan', pt: 'Senha', es: 'Contraseña', ru: 'Пароль' },
    'Receive': { tl: 'Tanggapin', ko: '받기', vi: 'Nhận', tr: 'Al', hi: 'प्राप्त करें', id: 'Terima', ms: 'Terima', pt: 'Receber', es: 'Recibir', ru: 'Принять' },
    'Buy Now': { tl: 'Bumili Ngayon', ko: '지금 구매', vi: 'Mua ngay', tr: 'Şimdi Satın Al', hi: 'अभी खरीदें', id: 'Beli Sekarang', ms: 'Beli Sekarang', pt: 'Comprar Agora', es: 'Comprar Ahora', ru: 'Купить сейчас' },
    'Upgrade Now': { tl: 'Mag-upgrade Ngayon', ko: '지금 업그레이드', vi: 'Nâng cấp ngay', tr: 'Şimdi Yükselt', hi: 'अभी अपग्रेड करें', id: 'Upgrade Sekarang', ms: 'Naik Taraf Sekarang', pt: 'Atualizar Agora', es: 'Mejorar Ahora', ru: 'Обновить сейчас' },
    'VIP Zone': { tl: 'VIP Zone', ko: 'VIP 존', vi: 'Khu VIP', tr: 'VIP Bölgesi', hi: 'वीआईपी ज़ोन', id: 'Zona VIP', ms: 'Zon VIP', pt: 'Zona VIP', es: 'Zona VIP', ru: 'VIP Зона' },
    'Active Missions': { tl: 'Aktibong Misyon', ko: '진행 중 미션', vi: 'Nhiệm vụ hoạt động', tr: 'Aktif Görevler', hi: 'सक्रिय मिशन', id: 'Misi Aktif', ms: 'Misi Aktif', pt: 'Missões Ativas', es: 'Misiones Activas', ru: 'Активные миссии' },
    'Manager': { tl: 'Tagapamahala', ko: '매니저', vi: 'Quản lý', tr: 'Yönetici', hi: 'प्रबंधक', id: 'Manajer', ms: 'Pengurus', pt: 'Gerente', es: 'Gerente', ru: 'Менеджер' },
    'FOR YOU': { tl: 'PARA SA IYO', ko: '맞춤 추천', vi: 'DÀNH CHO BẠN', tr: 'SENİN İÇİN', hi: 'आपके लिए', id: 'UNTUK ANDA', ms: 'UNTUK ANDA', pt: 'PARA VOCÊ', es: 'PARA TI', ru: 'ДЛЯ ВАС' },
    'Like Reels Only': { tl: 'Like Reels Lamang', ko: '릴스 좋아요 전용', vi: 'Chỉ thích Reels', tr: 'Sadece Reels Beğen', hi: 'केवल रील्स लाइक करें', id: 'Suka Reels Saja', ms: 'Suka Reels Sahaja', pt: 'Apenas Curtir Reels', es: 'Solo Me Gusta en Reels', ru: 'Только лайки Reels' },
    'Member Updates': { tl: 'Update ng Miyembro', ko: '회원 업데이트', vi: 'Cập nhật thành viên', tr: 'Üye Güncellemeleri', hi: 'सदस्य अपडेट', id: 'Pembaruan Anggota', ms: 'Kemas Kini Ahli', pt: 'Atualizações de Membros', es: 'Actualizaciones de Miembros', ru: 'Обновления участников' },
    'Refer & Earn': { tl: 'Mag-refer at Kumita', ko: '추천하고 적립', vi: 'Giới thiệu & Kiếm tiền', tr: 'Davet Et ve Kazan', hi: 'रेफर करें और कमाएं', id: 'Undang & Hasilkan', ms: 'Rujuk & Jana', pt: 'Indique e Ganhe', es: 'Refiere y Gana', ru: 'Приглашай и зарабатывай' },
    'Earn Together': { tl: 'Kumita nang Magkasama', ko: '함께 수익 창출', vi: 'Cùng nhau kiếm tiền', tr: 'Birlikte Kazanın', hi: 'साथ मिलकर कमाएं', id: 'Hasilkan Bersama', ms: 'Jana Bersama', pt: 'Ganhem Juntos', es: 'Ganemos Juntos', ru: 'Зарабатывайте вместе' },
    'Share your referral link and view your team activity.': { tl: 'Ibahagi ang iyong referral link at tingnan ang aktibidad ng iyong koponan.', ko: '추천 링크를 공유하고 팀 활동을 확인하세요.', vi: 'Chia sẻ liên kết giới thiệu và xem hoạt động đội nhóm của bạn.', tr: 'Referans bağlantınızı paylaşın ve ekip aktivitenizi görüntüleyin.', hi: 'अपना रेफरल लिंक साझा करें और अपनी टीम की गतिविधि देखें।', id: 'Bagikan tautan referensi Anda dan lihat aktivitas tim Anda.', ms: 'Kongsi pautan rujukan anda dan lihat aktiviti pasukan anda.', pt: 'Compartilhe seu link de indicação e veja a atividade da sua equipe.', es: 'Comparte tu enlace de referido y mira la actividad de tu equipo.', ru: 'Поделитесь реферальной ссылкой и следите за активностью команды.' },
    'Refer Now': { tl: 'Mag-refer Ngayon', ko: '지금 추천', vi: 'Giới thiệu ngay', tr: 'Şimdi Davet Et', hi: 'अभी रेफर करें', id: 'Undang Sekarang', ms: 'Rujuk Sekarang', pt: 'Indicar Agora', es: 'Referir Ahora', ru: 'Пригласить сейчас' },
    'More Friends': { tl: 'Mas Maraming Kaibigan', ko: '더 많은 친구', vi: 'Thêm nhiều bạn bè', tr: 'Daha Fazla Arkadaş', hi: 'अधिक दोस्त', id: 'Lebih Banyak Teman', ms: 'Lebih Ramai Rakan', pt: 'Mais Amigos', es: 'Más Amigos', ru: 'Больше друзей' },
    'More Income': { tl: 'Mas Malaking Kita', ko: '더 많은 수익', vi: 'Thu nhập cao hơn', tr: 'Daha Fazla Gelir', hi: 'अधिक आय', id: 'Lebih Banyak Pendapatan', ms: 'Lebih Banyak Pendapatan', pt: 'Mais Renda', es: 'Más Ingresos', ru: 'Больше дохода' },
    'My Superior:': { tl: 'Aking Superior:', ko: '내 추천인:', vi: 'Cấp trên của tôi:', tr: 'Üst Sponsorum:', hi: 'मेरे सीनियर:', id: 'Atasan Saya:', ms: 'Atasan Saya:', pt: 'Meu Superior:', es: 'Mi Superior:', ru: 'Мой наставник:' },
    'My Pass': { tl: 'Aking Wallet', ko: '내 지갑', vi: 'Ví của tôi', tr: 'Cüzdanım', hi: 'मेरा वॉलेट', id: 'Dompet Saya', ms: 'Dompet Saya', pt: 'Minha Carteira', es: 'Mi Billetera', ru: 'Мой кошелек' },
    'Account Balance': { tl: 'Balanse ng Account', ko: '계정 잔액', vi: 'Số dư tài khoản', tr: 'Hesap Bakiyesi', hi: 'खाता बैलेंस', id: 'Saldo Akun', ms: 'Baki Akaun', pt: 'Saldo da Conta', es: 'Saldo de la Cuenta', ru: 'Баланс счета' },
    'Withdrawable Balance': { tl: 'Maaring I-withdraw', ko: '출금 가능 잔액', vi: 'Số dư có thể rút', tr: 'Çekilebilir Bakiye', hi: 'निकासी योग्य बैलेंस', id: 'Saldo Dapat Ditarik', ms: 'Baki Boleh Dikeluarkan', pt: 'Saldo Disponível', es: 'Saldo Retirable', ru: 'Доступно к выводу' },
    'Today\'s Tasks': { tl: 'Mga Gawain Ngayon', ko: '오늘의 작업', vi: 'Nhiệm vụ hôm nay', tr: 'Bugünkü Görevler', hi: 'आज के कार्य', id: 'Tugas Hari Ini', ms: 'Tugasan Hari Ini', pt: 'Tarefas de Hoje', es: 'Tareas de Hoy', ru: 'Задачи на сегодня' },
    'Remaining Tasks': { tl: 'Natitirang Gawain', ko: '남은 작업', vi: 'Nhiệm vụ còn lại', tr: 'Kalan Görevler', hi: 'शेष कार्य', id: 'Sisa Tugas', ms: 'Baki Tugasan', pt: 'Tarefas Restantes', es: 'Tareas Restantes', ru: 'Оставшиеся задачи' },
    'Completed Tasks': { tl: 'Natapos na Gawain', ko: '완료된 작업', vi: 'Nhiệm vụ đã xong', tr: 'Tamamlanan Görevler', hi: 'पूर्ण कार्य', id: 'Tugas Selesai', ms: 'Tugasan Selesai', pt: 'Tarefas Concluídas', es: 'Tareas Completadas', ru: 'Выполненные задачи' },
    'Package Details': { tl: 'Detalye ng Package', ko: '패키지 상세', vi: 'Chi tiết gói', tr: 'Paket Detayları', hi: 'पैकेज विवरण', id: 'Detail Paket', ms: 'Butiran Pakej', pt: 'Detalhes do Pacote', es: 'Detalles del Paquete', ru: 'Детали пакета' },
    'Payment Method': { tl: 'Paraan ng Pagbabayad', ko: '결제 수단', vi: 'Phương thức thanh toán', tr: 'Ödeme Yöntemi', hi: 'भुगतान विधि', id: 'Metode Pembayaran', ms: 'Kaedah Pembayaran', pt: 'Método de Pagamento', es: 'Método de Pago', ru: 'Способ оплаты' },
    'Submit Mission': { tl: 'Isumite ang Misyon', ko: '미션 제출', vi: 'Gửi nhiệm vụ', tr: 'Görevi Gönder', hi: 'मिशन सबमिट करें', id: 'Kirim Misi', ms: 'Hantar Misi', pt: 'Enviar Missão', es: 'Enviar Misión', ru: 'Отправить миссию' },
    'Missions': { tl: 'Mga Misyon', ko: '미션', vi: 'Nhiệm vụ', tr: 'Görevler', hi: 'मिशन', id: 'Misi', ms: 'Misi', pt: 'Missões', es: 'Misiones', ru: 'Миссии' },
    'USDT Deposit': { tl: 'USDT Deposit', ko: 'USDT 입금', vi: 'Nạp USDT', tr: 'USDT Yatır', hi: 'USDT जमा', id: 'Deposit USDT', ms: 'Deposit USDT', pt: 'Depósito USDT', es: 'Depósito USDT', ru: 'Депозит USDT' },
    'USDT Account': { tl: 'USDT Account', ko: 'USDT 계정', vi: 'Tài khoản USDT', tr: 'USDT Hesabı', hi: 'USDT खाता', id: 'Akun USDT', ms: 'Akaun USDT', pt: 'Conta USDT', es: 'Cuenta USDT', ru: 'Счет USDT' },
    'Account Binding': { tl: 'Pag-link ng Account', ko: '계정 연동', vi: 'Liên kết tài khoản', tr: 'Hesap Bağlama', hi: 'खाता लिंक', id: 'Penautan Akun', ms: 'Pautan Akaun', pt: 'Vinculação de Conta', es: 'Vinculación de Cuenta', ru: 'Привязка счета' },
    'Current Level': { tl: 'Kasalukuyang Level', ko: '현재 등급', vi: 'Cấp độ hiện tại', tr: 'Mevcut Seviye', hi: 'वर्तमान स्तर', id: 'Level Saat Ini', ms: 'Tahap Semasa', pt: 'Nível Atual', es: 'Nivel Actual', ru: 'Текущий уровень' },
    'Current': { tl: 'Kasalukuyan', ko: '현재', vi: 'Hiện tại', tr: 'Mevcut', hi: 'वर्तमान', id: 'Saat Ini', ms: 'Semasa', pt: 'Atual', es: 'Actual', ru: 'Текущий' },
    'Purchased': { tl: 'Nabili na', ko: '구매 완료', vi: 'Đã mua', tr: 'Satın Alındı', hi: 'खरीदा गया', id: 'Sudah Dibeli', ms: 'Telah Dibeli', pt: 'Comprado', es: 'Comprado', ru: 'Куплено' },
    'Upgrade': { tl: 'Mag-upgrade', ko: '업그레이드', vi: 'Nâng cấp', tr: 'Yükselt', hi: 'अपग्रेड', id: 'Upgrade', ms: 'Naik Taraf', pt: 'Atualizar', es: 'Mejorar', ru: 'Повысить' },
    'Unit Price': { tl: 'Presyo bawat Gawain', ko: '단가', vi: 'Đơn giá', tr: 'Birim Fiyat', hi: 'प्रति कार्य दर', id: 'Harga Satuan', ms: 'Harga Seunit', pt: 'Preço Unitário', es: 'Precio Unitario', ru: 'Цена за задачу' },
    'Per Task': { tl: 'Bawat Gawain', ko: '작업당', vi: 'Mỗi nhiệm vụ', tr: 'Görev Başına', hi: 'प्रति कार्य', id: 'Per Tugas', ms: 'Setiap Tugasan', pt: 'Por Tarefa', es: 'Por Tarea', ru: 'За задачу' },
    'Price': { tl: 'Presyo', ko: '가격', vi: 'Giá', tr: 'Fiyat', hi: 'मूल्य', id: 'Harga', ms: 'Harga', pt: 'Preço', es: 'Precio', ru: 'Цена' },
    'Validity': { tl: 'Bisa', ko: '유효기간', vi: 'Thời hạn', tr: 'Geçerlilik', hi: 'वैधता', id: 'Masa Berlaku', ms: 'Tempoh Sah', pt: 'Validade', es: 'Validez', ru: 'Срок действия' },
    'Set Now': { tl: 'Itakda Ngayon', ko: '지금 설정', vi: 'Thiết lập ngay', tr: 'Şimdi Ayarla', hi: 'अभी सेट करें', id: 'Atur Sekarang', ms: 'Tetapkan Sekarang', pt: 'Definir Agora', es: 'Configurar Ahora', ru: 'Настроить' },
    'Bound': { tl: 'Naka-link', ko: '연동됨', vi: 'Đã liên kết', tr: 'Bağlandı', hi: 'लिंक हो गया', id: 'Tertaut', ms: 'Dipautkan', pt: 'Vinculado', es: 'Vinculado', ru: 'Привязано' },
    'Not Set': { tl: 'Hindi Nakatakda', ko: '미설정', vi: 'Chưa thiết lập', tr: 'Ayarlanmadı', hi: 'सेट नहीं', id: 'Belum Diatur', ms: 'Belum Ditetapkan', pt: 'Não Definido', es: 'No Configurado', ru: 'Не задано' },
    'Verified': { tl: 'Beripikado', ko: '인증됨', vi: 'Đã xác minh', tr: 'Doğrulandı', hi: 'सत्यापित', id: 'Terverifikasi', ms: 'Disahkan', pt: 'Verificado', es: 'Verificado', ru: 'Подтверждено' },
    'No records found': { tl: 'Walang nahanap na tala', ko: '기록이 없습니다', vi: 'Không có bản ghi nào', tr: 'Kayıt bulunamadı', hi: 'कोई रिकॉर्ड नहीं मिला', id: 'Tidak ada catatan', ms: 'Tiada rekod ditemui', pt: 'Nenhum registro encontrado', es: 'No se encontraron registros', ru: 'Записей не найдено' },
    'No records yet': { tl: 'Wala pang tala', ko: '아직 기록이 없습니다', vi: 'Chưa có bản ghi', tr: 'Henüz kayıt yok', hi: 'अभी कोई रिकॉर्ड नहीं', id: 'Belum ada catatan', ms: 'Belum ada rekod', pt: 'Sem registros ainda', es: 'Aún no hay registros', ru: 'Пока нет записей' },
    'Remember me': { tl: 'Tandaan ako', ko: '로그인 유지', vi: 'Ghi nhớ đăng nhập', tr: 'Beni hatırla', hi: 'मुझे याद रखें', id: 'Ingat saya', ms: 'Ingat saya', pt: 'Lembrar de mim', es: 'Recuérdame', ru: 'Запомнить меня' },
    'Forgot password?': { tl: 'Nakalimutan ang password?', ko: '비밀번호를 잊으셨나요?', vi: 'Quên mật khẩu?', tr: 'Şifrenizi mi unuttunuz?', hi: 'पासवर्ड भूल गए?', id: 'Lupa kata sandi?', ms: 'Lupa kata laluan?', pt: 'Esqueceu a senha?', es: '¿Olvidaste tu contraseña?', ru: 'Забыли пароль?' },
    'New here?': { tl: 'Bago dito?', ko: '처음이신가요?', vi: 'Mới đến đây?', tr: 'Burada yeni misiniz?', hi: 'यहाँ नए हैं?', id: 'Baru di sini?', ms: 'Baru di sini?', pt: 'Novo por aqui?', es: '¿Nuevo aquí?', ru: 'Впервые здесь?' },
    'Already have an account?': { tl: 'May account na?', ko: '이미 계정이 있으신가요?', vi: 'Đã có tài khoản?', tr: 'Zaten hesabınız var mı?', hi: 'पहले से खाता है?', id: 'Sudah punya akun?', ms: 'Sudah ada akaun?', pt: 'Já tem uma conta?', es: '¿Ya tienes una cuenta?', ru: 'Уже есть аккаунт?' },
    'Sign up now': { tl: 'Mag-sign up ngayon', ko: '지금 가입하기', vi: 'Đăng ký ngay', tr: 'Şimdi kaydol', hi: 'अभी साइन अप करें', id: 'Daftar sekarang', ms: 'Daftar sekarang', pt: 'Cadastre-se agora', es: 'Regístrate ahora', ru: 'Зарегистрироваться' },
    'Sign Up': { tl: 'Mag-sign Up', ko: '회원가입', vi: 'Đăng ký', tr: 'Kayıt Ol', hi: 'साइन अप करें', id: 'Daftar', ms: 'Daftar', pt: 'Cadastrar', es: 'Registrarse', ru: 'Регистрация' },
    'Enter your phone number': { tl: 'Ilagay ang numero ng telepono', ko: '전화번호를 입력하세요', vi: 'Nhập số điện thoại của bạn', tr: 'Telefon numaranızı girin', hi: 'अपना फ़ोन नंबर दर्ज करें', id: 'Masukkan nomor telepon Anda', ms: 'Masukkan nombor telefon anda', pt: 'Digite seu número de telefone', es: 'Ingresa tu número de teléfono', ru: 'Введите номер телефона' },
    'Enter your password': { tl: 'Ilagay ang iyong password', ko: '비밀번호를 입력하세요', vi: 'Nhập mật khẩu của bạn', tr: 'Şifrenizi girin', hi: 'अपना पासवर्ड दर्ज करें', id: 'Masukkan kata sandi Anda', ms: 'Masukkan kata laluan anda', pt: 'Digite sua senha', es: 'Ingresa tu contraseña', ru: 'Введите пароль' },
    'Confirm Password': { tl: 'Kumpirmahin ang Password', ko: '비밀번호 확인', vi: 'Xác nhận mật khẩu', tr: 'Şifreyi Onayla', hi: 'पासवर्ड की पुष्टि करें', id: 'Konfirmasi Kata Sandi', ms: 'Sahkan Kata Laluan', pt: 'Confirmar Senha', es: 'Confirmar Contraseña', ru: 'Подтвердите пароль' },
    'Send Code': { tl: 'Magpadala ng Code', ko: '코드 전송', vi: 'Gửi mã', tr: 'Kod Gönder', hi: 'कोड भेजें', id: 'Kirim Kode', ms: 'Hantar Kod', pt: 'Enviar Código', es: 'Enviar Código', ru: 'Отправить код' },
    'Send Verification Code': { tl: 'Magpadala ng Verification Code', ko: '인증 코드 전송', vi: 'Gửi mã xác minh', tr: 'Doğrulama Kodu Gönder', hi: 'सत्यापन कोड भेजें', id: 'Kirim Kode Verifikasi', ms: 'Hantar Kod Pengesahan', pt: 'Enviar Código de Verificação', es: 'Enviar Código de Verificación', ru: 'Отправить код' },
    'Invite Code': { tl: 'Code ng Imbitasyon', ko: '초대 코드', vi: 'Mã mời', tr: 'Davet Kodu', hi: 'आमंत्रण कोड', id: 'Kode Undangan', ms: 'Kod Jemputan', pt: 'Código de Convite', es: 'Código de Invitación', ru: 'Код приглашения' },
    'Country': { tl: 'Bansa', ko: '국가', vi: 'Quốc gia', tr: 'Ülke', hi: 'देश', id: 'Negara', ms: 'Negara', pt: 'País', es: 'País', ru: 'Страна' },
    'Open Link': { tl: 'Buksan ang Link', ko: '링크 열기', vi: 'Mở liên kết', tr: 'Bağlantıyı Aç', hi: 'लिंक खोलें', id: 'Buka Tautan', ms: 'Buka Pautan', pt: 'Abrir Link', es: 'Abrir Enlace', ru: 'Открыть ссылку' },
    'Copy Link': { tl: 'Kopyahin ang Link', ko: '링크 복사', vi: 'Sao chép liên kết', tr: 'Bağlantıyı Kopyala', hi: 'लिंक कॉपी करें', id: 'Salin Tautan', ms: 'Salin Pautan', pt: 'Copiar Link', es: 'Copiar Enlace', ru: 'Копировать ссылку' },
    'Submit Task': { tl: 'Isumite ang Gawain', ko: '작업 제출', vi: 'Gửi nhiệm vụ', tr: 'Görevi Gönder', hi: 'कार्य सबमिट करें', id: 'Kirim Tugas', ms: 'Hantar Tugasan', pt: 'Enviar Tarefa', es: 'Enviar Tarea', ru: 'Отправить задачу' },
    'Cancel Task': { tl: 'Kanselahin ang Gawain', ko: '작업 취소', vi: 'Hủy nhiệm vụ', tr: 'Görevi İptal Et', hi: 'कार्य रद्द करें', id: 'Batalkan Tugas', ms: 'Batal Tugasan', pt: 'Cancelar Tarefa', es: 'Cancelar Tarea', ru: 'Отменить задачу' },
    'Deposit Record': { tl: 'Tala ng Deposito', ko: '입금 내역', vi: 'Lịch sử nạp tiền', tr: 'Yatırım Kaydı', hi: 'जमा रिकॉर्ड', id: 'Riwayat Deposit', ms: 'Rekod Deposit', pt: 'Histórico de Depósito', es: 'Historial de Depósitos', ru: 'История пополнений' },
    'Withdrawal Record': { tl: 'Tala ng Pag-withdraw', ko: '출금 내역', vi: 'Lịch sử rút tiền', tr: 'Çekim Kaydı', hi: 'निकासी रिकॉर्ड', id: 'Riwayat Penarikan', ms: 'Rekod Pengeluaran', pt: 'Histórico de Saque', es: 'Historial de Retiros', ru: 'История выводов' },
    'Commission Record': { tl: 'Tala ng Komisyon', ko: '커미션 내역', vi: 'Lịch sử hoa hồng', tr: 'Komisyon Kaydı', hi: 'कमीशन रिकॉर्ड', id: 'Riwayat Komisi', ms: 'Rekod Komisen', pt: 'Histórico de Comissão', es: 'Historial de Comisiones', ru: 'История комиссий' },
    'Task Record': { tl: 'Tala ng Gawain', ko: '작업 내역', vi: 'Lịch sử nhiệm vụ', tr: 'Görev Kaydı', hi: 'कार्य रिकॉर्ड', id: 'Riwayat Tugas', ms: 'Rekod Tugasan', pt: 'Histórico de Tarefas', es: 'Historial de Tareas', ru: 'История задач' },
    'Get Started': { tl: 'Magsimula Ngayon', ko: '시작하기', vi: 'Bắt đầu ngay', tr: 'Hemen Başla', hi: 'शुरू करें', id: 'Mulai Sekarang', ms: 'Mula Sekarang', pt: 'Começar Agora', es: 'Comenzar Ahora', ru: 'Начать' },
    'Terms of Service': { tl: 'Mga Tuntunin ng Serbisyo', ko: '이용약관', vi: 'Điều khoản dịch vụ', tr: 'Hizmet Şartları', hi: 'सेवा की शर्तें', id: 'Ketentuan Layanan', ms: 'Terma Perkhidmatan', pt: 'Termos de Serviço', es: 'Términos de Servicio', ru: 'Условия использования' },
    'Privacy Policy': { tl: 'Patakaran sa Privacy', ko: '개인정보 처리방침', vi: 'Chính sách bảo mật', tr: 'Gizlilik Politikası', hi: 'गोपनीयता नीति', id: 'Kebijakan Privasi', ms: 'Dasar Privasi', pt: 'Política de Privacidade', es: 'Política de Privacidad', ru: 'Политика конфиденциальности' },
    'For referring a new member,': { tl: 'Sa pag-refer ng bagong miyembro,', ko: '신규 회원 추천으로,', vi: 'Nhờ giới thiệu thành viên mới,', tr: 'Yeni üye davet ettiğiniz için,', hi: 'नए सदस्य को रेफर करने के लिए,', id: 'Karena mengundang anggota baru,', ms: 'Kerana merujuk ahli baharu,', pt: 'Por indicar um novo membro,', es: 'Por referir a un nuevo miembro,', ru: 'За приглашение нового участника,' },
    'congratulations on earning a promotion bonus!': { tl: 'binabati kita sa bonus na promosyon!', ko: '프로모션 보너스 획득을 축하합니다!', vi: 'chúc mừng bạn nhận được thưởng khuyến mãi!', tr: 'promosyon bonusu kazandığınız için tebrikler!', hi: 'प्रमोशन बोनस कमाने पर बधाई!', id: 'selamat atas bonus promosi yang didapat!', ms: 'tahniah kerana memperoleh bonus promosi!', pt: 'parabéns por ganhar um bônus de promoção!', es: '¡felicidades por ganar un bono de promoción!', ru: 'поздравляем с получением промо-бонуса!' },
    'Official Certificate': { tl: 'Opisyal na Sertipiko', ko: '공식 인증서', vi: 'Chứng nhận chính thức', tr: 'Resmi Sertifika', hi: 'आधिकारिक प्रमाणपत्र', id: 'Sertifikat Resmi', ms: 'Sijil Rasmi', pt: 'Certificado Oficial', es: 'Certificado Oficial', ru: 'Официальный сертификат' },
    'Official Certificates': { tl: 'Mga Opisyal na Sertipiko', ko: '공식 인증서', vi: 'Chứng nhận chính thức', tr: 'Resmi Sertifikalar', hi: 'आधिकारिक प्रमाणपत्र', id: 'Sertifikat Resmi', ms: 'Sijil Rasmi', pt: 'Certificados Oficiais', es: 'Certificados Oficiales', ru: 'Официальные сертификаты' },
    'Official Platform Partners': { tl: 'Mga Opisyal na Partner', ko: '공식 파트너', vi: 'Đối tác chính thức', tr: 'Resmi İş Ortakları', hi: 'आधिकारिक भागीदार', id: 'Mitra Resmi Platform', ms: 'Rakan Rasmi Platform', pt: 'Parceiros Oficiais', es: 'Socios Oficiales', ru: 'Официальные партнеры' },
    'Log in': { tl: 'Mag-login', ko: '로그인', vi: 'Đăng nhập', tr: 'Giriş Yap', hi: 'लॉगिन', id: 'Masuk', ms: 'Log Masuk', pt: 'Entrar', es: 'Iniciar sesión', ru: 'Войти' },
    'Log In': { tl: 'Mag-login', ko: '로그인', vi: 'Đăng nhập', tr: 'Giriş Yap', hi: 'लॉगिन', id: 'Masuk', ms: 'Log Masuk', pt: 'Entrar', es: 'Iniciar sesión', ru: 'Войти' },
    'Create an account': { tl: 'Gumawa ng account', ko: '계정 만들기', vi: 'Tạo tài khoản', tr: 'Hesap oluştur', hi: 'खाता बनाएं', id: 'Buat akun', ms: 'Cipta akaun', pt: 'Criar uma conta', es: 'Crear una cuenta', ru: 'Создать аккаунт' },
    'Log in to continue to your account.': { tl: 'Mag-login upang magpatuloy sa iyong account.', ko: '계정을 계속 이용하려면 로그인하세요.', vi: 'Đăng nhập để tiếp tục vào tài khoản của bạn.', tr: 'Hesabınıza devam etmek için giriş yapın.', hi: 'अपने खाते में जारी रखने के लिए लॉगिन करें।', id: 'Masuk untuk melanjutkan ke akun Anda.', ms: 'Log masuk untuk meneruskan ke akaun anda.', pt: 'Entre para continuar na sua conta.', es: 'Inicia sesión para continuar en tu cuenta.', ru: 'Войдите, чтобы продолжить работу с аккаунтом.' },
    'Keep me logged in': { tl: 'Panatilihin akong naka-login', ko: '로그인 상태 유지', vi: 'Duy trì đăng nhập', tr: 'Oturumu açık tut', hi: 'मुझे लॉगिन रखें', id: 'Tetap masuk', ms: 'Kekalkan log masuk', pt: 'Manter conectado', es: 'Mantener sesión iniciada', ru: 'Оставаться в системе' },
    'Don\'t have an account?': { tl: 'Wala pang account?', ko: '계정이 없으신가요?', vi: 'Chưa có tài khoản?', tr: 'Hesabınız yok mu?', hi: 'खाता नहीं है?', id: 'Belum punya akun?', ms: 'Tiada akaun?', pt: 'Não tem uma conta?', es: '¿No tienes una cuenta?', ru: 'Нет аккаунта?' },
    'Enter your details to create an account': { tl: 'Ilagay ang iyong mga detalye upang gumawa ng account', ko: '계정을 만들려면 정보를 입력하세요', vi: 'Nhập thông tin của bạn để tạo tài khoản', tr: 'Hesap oluşturmak için bilgilerinizi girin', hi: 'खाता बनाने के लिए अपना विवरण दर्ज करें', id: 'Masukkan detail Anda untuk membuat akun', ms: 'Masukkan butiran anda untuk mencipta akaun', pt: 'Insira seus dados para criar uma conta', es: 'Ingresa tus datos para crear una cuenta', ru: 'Введите данные для создания аккаунта' },
    'Select Country': { tl: 'Pumili ng Bansa', ko: '국가 선택', vi: 'Chọn quốc gia', tr: 'Ülke Seç', hi: 'देश चुनें', id: 'Pilih Negara', ms: 'Pilih Negara', pt: 'Selecionar País', es: 'Seleccionar País', ru: 'Выберите страну' },
    'Select country': { tl: 'Pumili ng bansa', ko: '국가 선택', vi: 'Chọn quốc gia', tr: 'Ülke seç', hi: 'देश चुनें', id: 'Pilih negara', ms: 'Pilih negara', pt: 'Selecionar país', es: 'Seleccionar país', ru: 'Выберите страну' },
    'SMS Verification Code': { tl: 'SMS Verification Code', ko: 'SMS 인증 코드', vi: 'Mã xác minh SMS', tr: 'SMS Doğrulama Kodu', hi: 'एसएमएस सत्यापन कोड', id: 'Kode Verifikasi SMS', ms: 'Kod Pengesahan SMS', pt: 'Código de Verificação SMS', es: 'Código de Verificación SMS', ru: 'Код подтверждения SMS' },
    'Invitation Code': { tl: 'Code ng Imbitasyon', ko: '초대 코드', vi: 'Mã mời', tr: 'Davet Kodu', hi: 'आमंत्रण कोड', id: 'Kode Undangan', ms: 'Kod Jemputan', pt: 'Código de Convite', es: 'Código de Invitación', ru: 'Код приглашения' },
    'Balance:': { tl: 'Balanse:', ko: '잔액:', vi: 'Số dư:', tr: 'Bakiye:', hi: 'बैलेंस:', id: 'Saldo:', ms: 'Baki:', pt: 'Saldo:', es: 'Saldo:', ru: 'Баланс:' },
    'Tier': { tl: 'Antas', ko: '등급', vi: 'Cấp bậc', tr: 'Seviye', hi: 'स्तर', id: 'Tingkat', ms: 'Tahap', pt: 'Nível', es: 'Nivel', ru: 'Уровень' },
    'Limit': { tl: 'Limitasyon', ko: '한도', vi: 'Giới hạn', tr: 'Limit', hi: 'सीमा', id: 'Batas', ms: 'Had', pt: 'Limite', es: 'Límite', ru: 'Лимит' },
    'Good': { tl: 'Mabuti', ko: '양호', vi: 'Tốt', tr: 'İyi', hi: 'अच्छा', id: 'Baik', ms: 'Baik', pt: 'Bom', es: 'Bueno', ru: 'Хорошо' },
    'Excellent': { tl: 'Napakahusay', ko: '우수', vi: 'Xuất sắc', tr: 'Mükemmel', hi: 'उत्कृष्ट', id: 'Sangat Baik', ms: 'Cemerlang', pt: 'Excelente', es: 'Excelente', ru: 'Отлично' },
    'Personal Balance': { tl: 'Personal na Balanse', ko: '개인 잔액', vi: 'Số dư cá nhân', tr: 'Kişisel Bakiye', hi: 'व्यक्तिगत बैलेंस', id: 'Saldo Pribadi', ms: 'Baki Peribadi', pt: 'Saldo Pessoal', es: 'Saldo Personal', ru: 'Личный баланс' },
    'Yesterday\'s Earnings': { tl: 'Kita Kahapon', ko: '어제의 수익', vi: 'Thu nhập hôm qua', tr: 'Dünkü Kazanç', hi: 'कल की कमाई', id: 'Pendapatan Kemarin', ms: 'Pendapatan Semalam', pt: 'Ganhos de Ontem', es: 'Ganancias de Ayer', ru: 'Доход за вчера' },
    'This Week\'s Earnings': { tl: 'Kita Ngayong Linggo', ko: '이번 주 수익', vi: 'Thu nhập tuần này', tr: 'Bu Haftaki Kazanç', hi: 'इस सप्ताह की कमाई', id: 'Pendapatan Minggu Ini', ms: 'Pendapatan Minggu Ini', pt: 'Ganhos desta Semana', es: 'Ganancias de esta Semana', ru: 'Доход за неделю' },
    'This Month\'s Earnings': { tl: 'Kita Ngayong Buwan', ko: '이번 달 수익', vi: 'Thu nhập tháng này', tr: 'Bu Ayki Kazanç', hi: 'इस महीने की कमाई', id: 'Pendapatan Bulan Ini', ms: 'Pendapatan Bulan Ini', pt: 'Ganhos deste Mês', es: 'Ganancias de este Mes', ru: 'Доход за месяц' },
    'Last Month\'s Earnings': { tl: 'Kita Noong Nakaraang Buwan', ko: '지난달 수익', vi: 'Thu nhập tháng trước', tr: 'Geçen Ayki Kazanç', hi: 'पिछले महीने की कमाई', id: 'Pendapatan Bulan Lalu', ms: 'Pendapatan Bulan Lalu', pt: 'Ganhos do Mês Passado', es: 'Ganancias del Mes Pasado', ru: 'Доход за прошлый месяц' },
    'Tasks Completed Today': { tl: 'Gawaing Natapos Ngayon', ko: '오늘 완료한 작업', vi: 'Nhiệm vụ hoàn thành hôm nay', tr: 'Bugün Tamamlanan Görevler', hi: 'आज पूरे किए गए कार्य', id: 'Tugas Selesai Hari Ini', ms: 'Tugasan Selesai Hari Ini', pt: 'Tarefas Concluídas Hoje', es: 'Tareas Completadas Hoy', ru: 'Выполнено сегодня' },
    'Remaining tasks today': { tl: 'Natitirang gawain ngayon', ko: '오늘 남은 작업', vi: 'Nhiệm vụ còn lại hôm nay', tr: 'Bugün kalan görevler', hi: 'आज के शेष कार्य', id: 'Sisa tugas hari ini', ms: 'Baki tugasan hari ini', pt: 'Tarefas restantes hoje', es: 'Tareas restantes hoy', ru: 'Осталось задач сегодня' },
    'For referring a new member —': { tl: 'Sa pag-refer ng bagong miyembro —', ko: '신규 회원 추천 —', vi: 'Giới thiệu thành viên mới —', tr: 'Yeni üye daveti için —', hi: 'नए सदस्य को रेफर करने के लिए —', id: 'Mengundang anggota baru —', ms: 'Merujuk ahli baharu —', pt: 'Por indicar um novo membro —', es: 'Por referir a un nuevo miembro —', ru: 'За приглашение нового участника —' },
    'Congratulations on receiving promotional reward!': { tl: 'Binabati kita sa pagtanggap ng gantimpala sa promosyon!', ko: '프로모션 보상을 받으신 것을 축하합니다!', vi: 'Chúc mừng bạn đã nhận được phần thưởng khuyến mãi!', tr: 'Promosyon ödülü kazandığınız için tebrikler!', hi: 'प्रमोशनल पुरस्कार प्राप्त करने पर बधाई!', id: 'Selamat atas hadiah promosi yang diterima!', ms: 'Tahniah kerana menerima ganjaran promosi!', pt: 'Parabéns por receber a recompensa promocional!', es: '¡Felicidades por recibir la recompensa promocional!', ru: 'Поздравляем с получением промо-награды!' },
    'Support': { tl: 'Suporta', ko: '고객지원', vi: 'Hỗ trợ', tr: 'Destek', hi: 'सहायता', id: 'Dukungan', ms: 'Sokongan', pt: 'Suporte', es: 'Soporte', ru: 'Поддержка' },
    'Direct Solution': { tl: 'Direktang Solusyon', ko: '직접 해결', vi: 'Giải pháp trực tiếp', tr: 'Doğrudan Çözüm', hi: 'सीधा समाधान', id: 'Solusi Langsung', ms: 'Penyelesaian Terus', pt: 'Solução Direta', es: 'Solución Directa', ru: 'Прямое решение' },
    'Personal Contact via Telegram': { tl: 'Personal na Pakikipag-ugnayan sa Telegram', ko: '텔레그램 1:1 문의', vi: 'Liên hệ trực tiếp qua Telegram', tr: 'Telegram ile Kişisel İletişim', hi: 'टेलीग्राम द्वारा व्यक्तिगत संपर्क', id: 'Kontak Pribadi via Telegram', ms: 'Hubungan Peribadi melalui Telegram', pt: 'Contato Pessoal via Telegram', es: 'Contacto Personal por Telegram', ru: 'Личная связь через Telegram' },
    'Daily Tasks:': { tl: 'Pang-araw-araw na Gawain:', ko: '일일 작업:', vi: 'Nhiệm vụ hàng ngày:', tr: 'Günlük Görevler:', hi: 'दैनिक कार्य:', id: 'Tugas Harian:', ms: 'Tugasan Harian:', pt: 'Tarefas Diárias:', es: 'Tareas Diárias:', ru: 'Задач в день:' },
    'Daily Income:': { tl: 'Pang-araw-araw na Kita:', ko: '일일 수익:', vi: 'Thu nhập hàng ngày:', tr: 'Günlük Gelir:', hi: 'दैनिक आय:', id: 'Pendapatan Harian:', ms: 'Pendapatan Harian:', pt: 'Renda Diária:', es: 'Ingreso Diario:', ru: 'Ежедневный доход:' },
    'Total Return at Maturity:': { tl: 'Kabuuang Kita sa Pagtatapos:', ko: '만기 총 수익:', vi: 'Tổng lợi nhuận đáo hạn:', tr: 'Vade Sonu Toplam Getiri:', hi: 'परिपक्वता पर कुल रिटर्न:', id: 'Total Pengembalian:', ms: 'Jumlah Pulangan:', pt: 'Retorno Total no Vencimento:', es: 'Retorno Total al Vencimiento:', ru: 'Общий доход за срок:' },
    'Valid Time': { tl: 'Bisa ng Oras', ko: '유효 기간', vi: 'Thời hạn hiệu lực', tr: 'Geçerlilik Süresi', hi: 'वैधता अवधि', id: 'Masa Berlaku', ms: 'Tempoh Sah', pt: 'Tempo de Validade', es: 'Tiempo de Validez', ru: 'Срок действия' },
    'Interest Rate': { tl: 'Rate ng Kita', ko: '수익률', vi: 'Tỷ lệ lợi nhuận', tr: 'Getiri Oranı', hi: 'ब्याज दर', id: 'Tingkat Pengembalian', ms: 'Kadar Pulangan', pt: 'Taxa de Retorno', es: 'Tasa de Retorno', ru: 'Доходность' },
    'Cycle (Duration)': { tl: 'Siklo (Tagal)', ko: '주기 (기간)', vi: 'Chu kỳ (Thời hạn)', tr: 'Döngü (Süre)', hi: 'अवधि (चक्र)', id: 'Siklus (Durasi)', ms: 'Kitaran (Tempoh)', pt: 'Ciclo (Duração)', es: 'Ciclo (Duración)', ru: 'Цикл (Длительность)' },
    'Daily Assigned Tasks': { tl: 'Nakatalagang Gawain Araw-araw', ko: '일일 배정 작업', vi: 'Nhiệm vụ giao mỗi ngày', tr: 'Günlük Atanan Görevler', hi: 'दैनिक निर्धारित कार्य', id: 'Tugas Harian', ms: 'Tugasan Harian', pt: 'Tarefas Diárias Atribuídas', es: 'Tareas Diarias Asignadas', ru: 'Ежедневные задания' },
    'Purchase Limit': { tl: 'Limitasyon sa Pagbili', ko: '구매 한도', vi: 'Giới hạn mua', tr: 'Satın Alma Limiti', hi: 'खरीद सीमा', id: 'Batas Pembelian', ms: 'Had Pembelian', pt: 'Limite de Compra', es: 'Límite de Compra', ru: 'Лимит покупки' },
    '1 Unit': { tl: '1 Yunit', ko: '1개', vi: '1 Gói', tr: '1 Adet', hi: '1 यूनिट', id: '1 Unit', ms: '1 Unit', pt: '1 Unidade', es: '1 Unidad', ru: '1 шт.' },
    'Task Overview & Earnings Breakdown': { tl: 'Buod ng Gawain at Detalye ng Kita', ko: '작업 개요 및 수익 내역', vi: 'Tổng quan nhiệm vụ & Chi tiết thu nhập', tr: 'Görev Özeti ve Kazanç Dağılımı', hi: 'कार्य विवरण और कमाई का ब्योरा', id: 'Ringkasan Tugas & Rincian Penghasilan', ms: 'Ringkasan Tugasan & Perincian Pendapatan', pt: 'Resumo de Tarefas e Ganhos', es: 'Resumen de Tareas y Ganancias', ru: 'Обзор заданий и расчет дохода' },
    'How Payouts Work & Revenue Model': { tl: 'Paano Gumagana ang Kita at Bayaran', ko: '정산 방식 및 수익 모델', vi: 'Cách thức thanh toán & Mô hình doanh thu', tr: 'Ödemeler ve Gelir Modeli Nasıl Çalışır', hi: 'भुगतान और आय मॉडल कैसे काम करता है', id: 'Cara Kerja Pembayaran & Model Pendapatan', ms: 'Cara Pembayaran & Model Pendapatan', pt: 'Como Funcionam os Pagamentos e Ganhos', es: 'Cómo Funcionan los Pagos y el Modelo de Ingresos', ru: 'Как работают выплаты и модель дохода' },
    'Your friend': { tl: 'Iyong kaibigan', ko: '추천인', vi: 'Bạn của bạn', tr: 'Arkadaşınız', hi: 'आपके दोस्त', id: 'Teman Anda', ms: 'Rakan anda', pt: 'Seu amigo', es: 'Tu amigo', ru: 'Ваш друг' },
    'Invites you to join': { tl: 'Iniimbitahan kang sumali', ko: '가입에 초대합니다', vi: 'Mời bạn tham gia', tr: 'Sizi katılmaya davet ediyor', hi: 'आपको जुड़ने के लिए आमंत्रित करते हैं', id: 'Mengundang Anda bergabung', ms: 'Menjemput anda menyertai', pt: 'Convida você para participar', es: 'Te invita a unirte', ru: 'Приглашает вас присоединиться' },
    'Today\'s Commission': { tl: 'Komisyon Ngayon', ko: '오늘의 커미션', vi: 'Hoa hồng hôm nay', tr: 'Bugünkü Komisyon', hi: 'आज का कमीशन', id: 'Komisi Hari Ini', ms: 'Komisen Hari Ini', pt: 'Comissão de Hoje', es: 'Comisión de Hoy', ru: 'Комиссия за сегодня' },
    'members': { tl: 'miyembro', ko: '명', vi: 'thành viên', tr: 'üye', hi: 'सदस्य', id: 'anggota', ms: 'ahli', pt: 'membros', es: 'miembros', ru: 'участников' },
    'Frozen:': { tl: 'Naka-freeze:', ko: '동결:', vi: 'Đóng băng:', tr: 'Dondurulan:', hi: 'फ़्रोज़न:', id: 'Dibekukan:', ms: 'Dibekukan:', pt: 'Congelado:', es: 'Congelado:', ru: 'Заморожено:' },
    'Available:': { tl: 'Magagamit:', ko: '사용 가능:', vi: 'Khả dụng:', tr: 'Kullanılabilir:', hi: 'उपलब्ध:', id: 'Tersedia:', ms: 'Tersedia:', pt: 'Disponível:', es: 'Disponible:', ru: 'Доступно:' },
    'Withdrawal': { tl: 'Pag-withdraw', ko: '출금', vi: 'Rút tiền', tr: 'Para Çekme', hi: 'निकासी', id: 'Penarikan', ms: 'Pengeluaran', pt: 'Saque', es: 'Retiro', ru: 'Вывод средств' },
    'Amount': { tl: 'Halaga', ko: '금액', vi: 'Số tiền', tr: 'Tutar', hi: 'राशि', id: 'Jumlah', ms: 'Jumlah', pt: 'Valor', es: 'Monto', ru: 'Сумма' },
    'Profit Sharing': { tl: 'Bahagi ng Kita', ko: '수익 분배', vi: 'Chia sẻ lợi nhuận', tr: 'Kâr Paylaşımı', hi: 'लाभ साझाकरण', id: 'Bagi Hasil', ms: 'Perkongsian Untung', pt: 'Divisão de Lucros', es: 'Reparto de Ganancias', ru: 'Распределение прибыли' },
    'Ratio': { tl: 'Proporsyon', ko: '비율', vi: 'Tỷ lệ', tr: 'Oran', hi: 'अनुपात', id: 'Rasio', ms: 'Nisbah', pt: 'Proporção', es: 'Proporción', ru: 'Доля' },
    'Actual': { tl: 'Aktwal', ko: '실수령액', vi: 'Thực nhận', tr: 'Gerçekleşen', hi: 'वास्तविक', id: 'Aktual', ms: 'Sebenar', pt: 'Real', es: 'Real', ru: 'Фактически' },
    'Arrival': { tl: 'Pagdating', ko: '입금', vi: 'Nhận được', tr: 'Varış', hi: 'प्राप्ति', id: 'Diterima', ms: 'Diterima', pt: 'Recebido', es: 'Llegada', ru: 'Зачисление' },
    'Status': { tl: 'Katayuan', ko: '상태', vi: 'Trạng thái', tr: 'Durum', hi: 'स्थिति', id: 'Status', ms: 'Status', pt: 'Status', es: 'Estado', ru: 'Статус' },
    'Date': { tl: 'Petsa', ko: '날짜', vi: 'Ngày', tr: 'Tarih', hi: 'दिनांक', id: 'Tanggal', ms: 'Tarikh', pt: 'Data', es: 'Fecha', ru: 'Дата' },
    'Withdrawal Method': { tl: 'Paraan ng Pag-withdraw', ko: '출금 방법', vi: 'Phương thức rút tiền', tr: 'Çekim Yöntemi', hi: 'निकासी विधि', id: 'Metode Penarikan', ms: 'Kaedah Pengeluaran', pt: 'Método de Saque', es: 'Método de Retiro', ru: 'Способ вывода' },
    'Select Method': { tl: 'Pumili ng Paraan', ko: '방법 선택', vi: 'Chọn phương thức', tr: 'Yöntem Seç', hi: 'विधि चुनें', id: 'Pilih Metode', ms: 'Pilih Kaedah', pt: 'Selecionar Método', es: 'Seleccionar Método', ru: 'Выберите способ' },
    'Monthly withdrawal limit: Unlimited': { tl: 'Buwanang limitasyon sa pag-withdraw: Walang hanggan', ko: '월 출금 한도: 무제한', vi: 'Hạn mức rút tiền hàng tháng: Không giới hạn', tr: 'Aylık çekim limiti: Sınırsız', hi: 'मासिक निकासी सीमा: असीमित', id: 'Batas penarikan bulanan: Tanpa batas', ms: 'Had pengeluaran bulanan: Tanpa had', pt: 'Limite mensal de saque: Ilimitado', es: 'Límite mensual de retiro: Ilimitado', ru: 'Месячный лимит вывода: без ограничений' },
    'Avatar': { tl: 'Avatar', ko: '프로필 사진', vi: 'Ảnh đại diện', tr: 'Profil Fotoğrafı', hi: 'अवतार', id: 'Avatar', ms: 'Avatar', pt: 'Avatar', es: 'Avatar', ru: 'Аватар' },
    'Country & Currency': { tl: 'Bansa at Pera', ko: '국가 및 통화', vi: 'Quốc gia & Tiền tệ', tr: 'Ülke ve Para Birimi', hi: 'देश और मुद्रा', id: 'Negara & Mata Uang', ms: 'Negara & Mata Wang', pt: 'País e Moeda', es: 'País y Moneda', ru: 'Страна и валюта' },
    'Set Up': { tl: 'I-set Up', ko: '설정하기', vi: 'Thiết lập', tr: 'Ayarla', hi: 'सेट करें', id: 'Atur', ms: 'Tetapkan', pt: 'Configurar', es: 'Configurar', ru: 'Настроить' },
    'Withdrawal Password': { tl: 'Password sa Pag-withdraw', ko: '출금 비밀번호', vi: 'Mật khẩu rút tiền', tr: 'Çekim Şifresi', hi: 'निकासी पासवर्ड', id: 'Kata Sandi Penarikan', ms: 'Kata Laluan Pengeluaran', pt: 'Senha de Saque', es: 'Contraseña de Retiro', ru: 'Пароль для вывода' },
    'Operation submitted successfully': { tl: 'Matagumpay na naisumite', ko: '성공적으로 제출되었습니다', vi: 'Đã gửi thành công', tr: 'İşlem başarıyla gönderildi', hi: 'सफलतापूर्वक सबमिट किया गया', id: 'Berhasil dikirim', ms: 'Berjaya dihantar', pt: 'Enviado com sucesso', es: 'Enviado con éxito', ru: 'Успешно отправлено' },
    'Accepting...': { tl: 'Tinatanggap...', ko: '수락 중...', vi: 'Đang nhận...', tr: 'Kabul ediliyor...', hi: 'स्वीकार किया जा रहा है...', id: 'Menerima...', ms: 'Menerima...', pt: 'Aceitando...', es: 'Aceptando...', ru: 'Принятие...' },
    'Recharge Balance (USDT)': { tl: 'Mag-recharge ng Balanse (USDT)', ko: '잔액 충전 (USDT)', vi: 'Nạp số dư (USDT)', tr: 'Bakiye Yükle (USDT)', hi: 'बैलेंस रिचार्ज (USDT)', id: 'Isi Saldo (USDT)', ms: 'Tambah Baki (USDT)', pt: 'Recarregar Saldo (USDT)', es: 'Recargar Saldo (USDT)', ru: 'Пополнить баланс (USDT)' },
    'Select Recharge Amount (USD):': { tl: 'Pumili ng Halaga ng Recharge (USD):', ko: '충전 금액 선택 (USD):', vi: 'Chọn số tiền nạp (USD):', tr: 'Yükleme Tutarı Seçin (USD):', hi: 'रिचार्ज राशि चुनें (USD):', id: 'Pilih Jumlah Isi Ulang (USD):', ms: 'Pilih Jumlah Tambah Nilai (USD):', pt: 'Selecione o Valor da Recarga (USD):', es: 'Selecciona el Monto de Recarga (USD):', ru: 'Выберите сумму пополнения (USD):' },
    'Complete Recharge': { tl: 'Kumpletuhin ang Recharge', ko: '충전 완료', vi: 'Hoàn tất nạp tiền', tr: 'Yüklemeyi Tamamla', hi: 'रिचार्ज पूरा करें', id: 'Selesaikan Isi Ulang', ms: 'Selesaikan Tambah Nilai', pt: 'Concluir Recarga', es: 'Completar Recarga', ru: 'Завершить пополнение' },
    'Mission List': { tl: 'Listahan ng Misyon', ko: '미션 목록', vi: 'Danh sách nhiệm vụ', tr: 'Görev Listesi', hi: 'मिशन सूची', id: 'Daftar Misi', ms: 'Senarai Misi', pt: 'Lista de Missões', es: 'Lista de Misiones', ru: 'Список миссий' },
    'Available tasks for your active package': { tl: 'Mga magagamit na gawain para sa iyong aktibong package', ko: '현재 패키지의 이용 가능한 작업', vi: 'Nhiệm vụ khả dụng cho gói hiện tại của bạn', tr: 'Aktif paketiniz için mevcut görevler', hi: 'आपके सक्रिय पैकेज के लिए उपलब्ध कार्य', id: 'Tugas tersedia untuk paket aktif Anda', ms: 'Tugasan tersedia untuk pakej aktif anda', pt: 'Tarefas disponíveis para seu pacote ativo', es: 'Tareas disponibles para tu paquete activo', ru: 'Доступные задания для вашего пакета' },
    'Review': { tl: 'Sinusuri', ko: '검토', vi: 'Đang duyệt', tr: 'İnceleme', hi: 'समीक्षा', id: 'Tinjauan', ms: 'Semakan', pt: 'Análise', es: 'Revisión', ru: 'Проверка' },
    'Failed / Cancelled': { tl: 'Nabigo / Kinansela', ko: '실패 / 취소', vi: 'Thất bại / Đã hủy', tr: 'Başarısız / İptal', hi: 'विफल / रद्द', id: 'Gagal / Dibatalkan', ms: 'Gagal / Dibatalkan', pt: 'Falhou / Cancelado', es: 'Fallido / Cancelado', ru: 'Ошибка / Отменено' },
    'Mission Details': { tl: 'Detalye ng Misyon', ko: '미션 상세', vi: 'Chi tiết nhiệm vụ', tr: 'Görev Detayları', hi: 'मिशन विवरण', id: 'Detail Misi', ms: 'Butiran Misi', pt: 'Detalhes da Missão', es: 'Detalles de la Misión', ru: 'Детали миссии' },
    'Task Title:': { tl: 'Pamagat ng Gawain:', ko: '작업 제목:', vi: 'Tiêu đề nhiệm vụ:', tr: 'Görev Başlığı:', hi: 'कार्य शीर्षक:', id: 'Judul Tugas:', ms: 'Tajuk Tugasan:', pt: 'Título da Tarefa:', es: 'Título de la Tarea:', ru: 'Название задачи:' },
    'Mission Reward:': { tl: 'Gantimpala sa Misyon:', ko: '미션 보상:', vi: 'Phần thưởng nhiệm vụ:', tr: 'Görev Ödülü:', hi: 'मिशन पुरस्कार:', id: 'Hadiah Misi:', ms: 'Ganjaran Misi:', pt: 'Recompensa da Missão:', es: 'Recompensa de la Misión:', ru: 'Награда за миссию:' },
    'Mission Description:': { tl: 'Paglalarawan ng Misyon:', ko: '미션 설명:', vi: 'Mô tả nhiệm vụ:', tr: 'Görev Açıklaması:', hi: 'मिशन विवरण:', id: 'Deskripsi Misi:', ms: 'Penerangan Misi:', pt: 'Descrição da Missão:', es: 'Descripción de la Misión:', ru: 'Описание миссии:' },
    'Task Link:': { tl: 'Link ng Gawain:', ko: '작업 링크:', vi: 'Liên kết nhiệm vụ:', tr: 'Görev Bağlantısı:', hi: 'कार्य लिंक:', id: 'Tautan Tugas:', ms: 'Pautan Tugasan:', pt: 'Link da Tarefa:', es: 'Enlace de la Tarea:', ru: 'Ссылка на задачу:' },
    'Created Time:': { tl: 'Oras ng Paggawa:', ko: '생성 시간:', vi: 'Thời gian tạo:', tr: 'Oluşturma Zamanı:', hi: 'बनाने का समय:', id: 'Waktu Dibuat:', ms: 'Masa Dicipta:', pt: 'Hora de Criação:', es: 'Hora de Creación:', ru: 'Время создания:' },
    'Comments': { tl: 'Mga Komento', ko: '코멘트', vi: 'Ghi chú', tr: 'Yorumlar', hi: 'टिप्पणियाँ', id: 'Komentar', ms: 'Komen', pt: 'Comentários', es: 'Comentarios', ru: 'Комментарии' },
    'Screenshot': { tl: 'Screenshot', ko: '스크린샷', vi: 'Ảnh chụp màn hình', tr: 'Ekran Görüntüsü', hi: 'स्क्रीनशॉट', id: 'Tangkapan Layar', ms: 'Tangkapan Skrin', pt: 'Captura de Tela', es: 'Captura de Pantalla', ru: 'Скриншот' },
    'Upload': { tl: 'I-upload', ko: '업로드', vi: 'Tải lên', tr: 'Yükle', hi: 'अपलोड', id: 'Unggah', ms: 'Muat Naik', pt: 'Enviar', es: 'Subir', ru: 'Загрузить' },
    'Do': { tl: 'Gawin', ko: '진행', vi: 'Thực hiện', tr: 'Yap', hi: 'करें', id: 'Kerjakan', ms: 'Lakukan', pt: 'Fazer', es: 'Hacer', ru: 'Выполнить' },
    'View Preview': { tl: 'Tingnan ang Preview', ko: '미리보기', vi: 'Xem trước', tr: 'Önizlemeyi Gör', hi: 'प्रीव्यू देखें', id: 'Lihat Pratinjau', ms: 'Lihat Pratonton', pt: 'Ver Prévia', es: 'Ver Vista Previa', ru: 'Предпросмотр' },
    'Manual recharge': { tl: 'Manwal na recharge', ko: '수동 충전', vi: 'Nạp thủ công', tr: 'Manuel yükleme', hi: 'मैन्युअल रिचार्ज', id: 'Isi ulang manual', ms: 'Tambah nilai manual', pt: 'Recarga manual', es: 'Recarga manual', ru: 'Ручное пополнение' },
    'Fast and convenient': { tl: 'Mabilis at maginhawa', ko: '빠르고 편리함', vi: 'Nhanh chóng và tiện lợi', tr: 'Hızlı ve kolay', hi: 'तेज़ और सुविधाजनक', id: 'Cepat dan nyaman', ms: 'Pantas dan mudah', pt: 'Rápido e conveniente', es: 'Rápido y conveniente', ru: 'Быстро и удобно' },
    'Online Payment Gateway': { tl: 'Online na Payment Gateway', ko: '온라인 결제 게이트웨이', vi: 'Cổng thanh toán trực tuyến', tr: 'Online Ödeme Ağ Geçidi', hi: 'ऑनलाइन भुगतान गेटवे', id: 'Gerbang Pembayaran Online', ms: 'Gerbang Pembayaran Dalam Talian', pt: 'Gateway de Pagamento Online', es: 'Pasarela de Pago en Línea', ru: 'Онлайн платежный шлюз' },
    'Crypto transfer': { tl: 'Paglipat ng Crypto', ko: '암호화폐 이체', vi: 'Chuyển khoản Crypto', tr: 'Kripto transferi', hi: 'क्रिप्टो ट्रांसफर', id: 'Transfer kripto', ms: 'Pemindahan kripto', pt: 'Transferência cripto', es: 'Transferencia cripto', ru: 'Криптоперевод' },
    'Network': { tl: 'Network', ko: '네트워크', vi: 'Mạng lưới', tr: 'Ağ', hi: 'नेटवर्क', id: 'Jaringan', ms: 'Rangkaian', pt: 'Rede', es: 'Red', ru: 'Сеть' },
    'Recommended': { tl: 'Inirerekomenda', ko: '추천', vi: 'Khuyên dùng', tr: 'Önerilen', hi: 'अनुशंसित', id: 'Disarankan', ms: 'Disyorkan', pt: 'Recomendado', es: 'Recomendado', ru: 'Рекомендуется' },
    'Deposit Address (BEP20):': { tl: 'Address ng Deposito (BEP20):', ko: '입금 주소 (BEP20):', vi: 'Địa chỉ nạp (BEP20):', tr: 'Yatırma Adresi (BEP20):', hi: 'जमा पता (BEP20):', id: 'Alamat Deposit (BEP20):', ms: 'Alamat Deposit (BEP20):', pt: 'Endereço de Depósito (BEP20):', es: 'Dirección de Depósito (BEP20):', ru: 'Адрес пополнения (BEP20):' },
    'Live Address': { tl: 'Aktibong Address', ko: '실시간 주소', vi: 'Địa chỉ trực tiếp', tr: 'Canlı Adres', hi: 'लाइव पता', id: 'Alamat Aktif', ms: 'Alamat Aktif', pt: 'Endereço Ativo', es: 'Dirección Activa', ru: 'Активный адрес' },
    'Copy Address': { tl: 'Kopyahin ang Address', ko: '주소 복사', vi: 'Sao chép địa chỉ', tr: 'Adresi Kopyala', hi: 'पता कॉपी करें', id: 'Salin Alamat', ms: 'Salin Alamat', pt: 'Copiar Endereço', es: 'Copiar Dirección', ru: 'Копировать адрес' },
    'Check Balance ↺': { tl: 'Suriin ang Balanse ↺', ko: '잔액 확인 ↺', vi: 'Kiểm tra số dư ↺', tr: 'Bakiyeyi Kontrol Et ↺', hi: 'बैलेंस जांचें ↺', id: 'Cek Saldo ↺', ms: 'Semak Baki ↺', pt: 'Verificar Saldo ↺', es: 'Verificar Saldo ↺', ru: 'Проверить баланс ↺' },
    'Switch Network or Method': { tl: 'Palitan ang Network o Paraan', ko: '네트워크 또는 결제 변경', vi: 'Đổi mạng hoặc phương thức', tr: 'Ağ veya Yöntem Değiştir', hi: 'नेटवर्क या विधि बदलें', id: 'Ganti Jaringan atau Metode', ms: 'Tukar Rangkaian atau Kaedah', pt: 'Trocar Rede ou Método', es: 'Cambiar Red o Método', ru: 'Сменить сеть или способ' },
    'My Team': { tl: 'Aking Koponan', ko: '내 팀', vi: 'Đội của tôi', tr: 'Ekibim', hi: 'मेरी टीम', id: 'Tim Saya', ms: 'Pasukan Saya', pt: 'Minha Equipe', es: 'Mi Equipo', ru: 'Моя команда' },
    'Total Team Balance': { tl: 'Kabuuang Balanse ng Koponan', ko: '팀 총 잔액', vi: 'Tổng số dư đội', tr: 'Toplam Ekip Bakiyesi', hi: 'कुल टीम बैलेंस', id: 'Total Saldo Tim', ms: 'Jumlah Baki Pasukan', pt: 'Saldo Total da Equipe', es: 'Saldo Total del Equipo', ru: 'Общий баланс команды' },
    'Total Team Turnover': { tl: 'Kabuuang Turnover ng Koponan', ko: '팀 총 거래량', vi: 'Tổng doanh số đội', tr: 'Toplam Ekip Cirosu', hi: 'कुल टीम टर्नओवर', id: 'Total Omzet Tim', ms: 'Jumlah Perolehan Pasukan', pt: 'Volume Total da Equipe', es: 'Volumen Total del Equipo', ru: 'Общий оборот команды' },
    'Total Team Recharge': { tl: 'Kabuuang Recharge ng Koponan', ko: '팀 총 충전액', vi: 'Tổng nạp tiền của đội', tr: 'Toplam Ekip Yüklemesi', hi: 'कुल टीम रिचार्ज', id: 'Total Isi Ulang Tim', ms: 'Jumlah Tambah Nilai Pasukan', pt: 'Total de Recarga da Equipe', es: 'Recarga Total del Equipo', ru: 'Общее пополнение команды' },
    'Total Team Cashout': { tl: 'Kabuuang Withdraw ng Koponan', ko: '팀 총 출금액', vi: 'Tổng rút tiền của đội', tr: 'Toplam Ekip Çekimi', hi: 'कुल टीम निकासी', id: 'Total Penarikan Tim', ms: 'Jumlah Pengeluaran Pasukan', pt: 'Total de Saque da Equipe', es: 'Retiro Total del Equipo', ru: 'Общий вывод команды' },
    'First Recharge Count (Users)': { tl: 'Unang Recharge (Mga User)', ko: '첫 충전 인원', vi: 'Số người nạp đầu', tr: 'İlk Yükleme (Kullanıcı)', hi: 'प्रथम रिचार्ज संख्या', id: 'Jumlah Isi Ulang Pertama', ms: 'Bilangan Tambah Nilai Pertama', pt: 'Primeira Recarga (Usuários)', es: 'Primera Recarga (Usuarios)', ru: 'Первое пополнение' },
    'Direct Referrals (Users)': { tl: 'Direktang Referral', ko: '직접 추천 인원', vi: 'Giới thiệu trực tiếp', tr: 'Doğrudan Davetler', hi: 'प्रत्यक्ष रेफरल', id: 'Referensi Langsung', ms: 'Rujukan Langsung', pt: 'Indicações Diretas', es: 'Referidos Directos', ru: 'Прямые рефералы' },
    'Team Size (Users)': { tl: 'Laki ng Koponan', ko: '팀 규모', vi: 'Quy mô đội nhóm', tr: 'Ekip Büyüklüğü', hi: 'टीम का आकार', id: 'Ukuran Tim', ms: 'Saiz Pasukan', pt: 'Tamanho da Equipe', es: 'Tamaño del Equipo', ru: 'Размер команды' },
    'New Members (Users)': { tl: 'Mga Bagong Miyembro', ko: '신규 회원', vi: 'Thành viên mới', tr: 'Yeni Üyeler', hi: 'नए सदस्य', id: 'Anggota Baru', ms: 'Ahli Baharu', pt: 'Novos Membros', es: 'Nuevos Miembros', ru: 'Новые участники' },
    'Tier 1': { tl: 'Antas 1', ko: '1단계', vi: 'Cấp 1', tr: 'Seviye 1', hi: 'स्तर 1', id: 'Tingkat 1', ms: 'Tahap 1', pt: 'Nível 1', es: 'Nivel 1', ru: 'Уровень 1' },
    'Tier 2': { tl: 'Antas 2', ko: '2단계', vi: 'Cấp 2', tr: 'Seviye 2', hi: 'स्तर 2', id: 'Tingkat 2', ms: 'Tahap 2', pt: 'Nível 2', es: 'Nivel 2', ru: 'Уровень 2' },
    'Tier 3': { tl: 'Antas 3', ko: '3단계', vi: 'Cấp 3', tr: 'Seviye 3', hi: 'स्तर 3', id: 'Tingkat 3', ms: 'Tahap 3', pt: 'Nível 3', es: 'Nivel 3', ru: 'Уровень 3' },
    'Total Members': { tl: 'Kabuuang Miyembro', ko: '전체 회원', vi: 'Tổng thành viên', tr: 'Toplam Üye', hi: 'कुल सदस्य', id: 'Total Anggota', ms: 'Jumlah Ahli', pt: 'Total de Membros', es: 'Total de Miembros', ru: 'Всего участников' },
    'Recharge Amount': { tl: 'Halaga ng Recharge', ko: '충전 금액', vi: 'Số tiền nạp', tr: 'Yükleme Tutarı', hi: 'रिचार्ज राशि', id: 'Jumlah Isi Ulang', ms: 'Jumlah Tambah Nilai', pt: 'Valor da Recarga', es: 'Monto de Recarga', ru: 'Сумма пополнения' },
    'Team Commission': { tl: 'Komisyon ng Koponan', ko: '팀 커미션', vi: 'Hoa hồng đội', tr: 'Ekip Komisyonu', hi: 'टीम कमीशन', id: 'Komisi Tim', ms: 'Komisen Pasukan', pt: 'Comissão da Equipe', es: 'Comisión del Equipo', ru: 'Комиссия команды' },
    'Loading team data…': { tl: 'Nilo-load ang data ng koponan…', ko: '팀 데이터 불러오는 중…', vi: 'Đang tải dữ liệu đội…', tr: 'Ekip verileri yükleniyor…', hi: 'टीम डेटा लोड हो रहा है…', id: 'Memuat data tim…', ms: 'Memuatkan data pasukan…', pt: 'Carregando dados da equipe…', es: 'Cargando datos del equipo…', ru: 'Загрузка данных команды…' },
    'Your Achievement, Your Honor': { tl: 'Iyong Tagumpay, Iyong Karangalan', ko: '당신의 성과, 당신의 명예', vi: 'Thành tựu của bạn, Danh dự của bạn', tr: 'Başarınız, Onurunuz', hi: 'आपकी उपलब्धि, आपका सम्मान', id: 'Prestasi Anda, Kehormatan Anda', ms: 'Pencapaian Anda, Penghormatan Anda', pt: 'Sua Conquista, Sua Honra', es: 'Tu Logro, Tu Honor', ru: 'Ваши достижения — ваша честь' },
    'Reach the target milestones to unlock ranks and monthly salary.': { tl: 'Abutin ang mga target na milestone upang ma-unlock ang mga ranggo at buwanang sahod.', ko: '목표 마일스톤을 달성하여 등급과 월급을 잠금 해제하세요.', vi: 'Đạt các mốc mục tiêu để mở khóa cấp bậc và lương hàng tháng.', tr: 'Rütbeleri ve aylık maaşı açmak için hedef aşamalara ulaşın.', hi: 'रैंक और मासिक वेतन अनलॉक करने के लिए लक्ष्य मील के पत्थर तक पहुंचें।', id: 'Capai target untuk membuka peringkat dan gaji bulanan.', ms: 'Capai sasaran untuk membuka pangkat dan gaji bulanan.', pt: 'Alcance as metas para desbloquear cargos e salário mensal.', es: 'Alcanza los objetivos para desbloquear rangos y salario mensual.', ru: 'Достигайте целей, чтобы открыть ранги и ежемесячную зарплату.' },
    'Active A-Level Members (Paid):': { tl: 'Aktibong A-Level na Miyembro (Bayad):', ko: '활성 A등급 회원 (유료):', vi: 'Thành viên cấp A hoạt động (Đã trả phí):', tr: 'Aktif A-Seviye Üyeler (Ücretli):', hi: 'सक्रिय ए-लेवल सदस्य (भुगतान किए गए):', id: 'Anggota A-Level Aktif (Berbayar):', ms: 'Ahli A-Level Aktif (Berbayar):', pt: 'Membros Nível A Ativos (Pagos):', es: 'Miembros Nivel A Activos (Pagados):', ru: 'Активные участники уровня A:' },
    'Monthly Salary': { tl: 'Buwanang Sahod', ko: '월급', vi: 'Lương hàng tháng', tr: 'Aylık Maaş', hi: 'मासिक वेतन', id: 'Gaji Bulanan', ms: 'Gaji Bulanan', pt: 'Salário Mensal', es: 'Salario Mensual', ru: 'Ежемесячная зарплата' },
    'Milestone Achievement Salary': { tl: 'Sahod sa Tagumpay ng Milestone', ko: '마일스톤 달성 급여', vi: 'Lương thành tích cột mốc', tr: 'Hedef Başarı Maaşı', hi: 'मील का पत्थर उपलब्धि वेतन', id: 'Gaji Pencapaian Target', ms: 'Gaji Pencapaian Sasaran', pt: 'Salário por Meta Alcançada', es: 'Salario por Logro de Meta', ru: 'Зарплата за достижение цели' },
    'Salary Amount': { tl: 'Halaga ng Sahod', ko: '급여 금액', vi: 'Mức lương', tr: 'Maaş Tutarı', hi: 'वेतन राशि', id: 'Jumlah Gaji', ms: 'Jumlah Gaji', pt: 'Valor do Salário', es: 'Monto del Salario', ru: 'Размер зарплаты' },
    'Required Active Members:': { tl: 'Kinakailangang Aktibong Miyembro:', ko: '필요한 활성 회원:', vi: 'Thành viên hoạt động yêu cầu:', tr: 'Gerekli Aktif Üye:', hi: 'आवश्यक सक्रिय सदस्य:', id: 'Anggota Aktif Dibutuhkan:', ms: 'Ahli Aktif Diperlukan:', pt: 'Membros Ativos Necessários:', es: 'Miembros Activos Requeridos:', ru: 'Требуется активных участников:' },
    'Your Current Progress:': { tl: 'Iyong Kasalukuyang Progreso:', ko: '현재 진행 상황:', vi: 'Tiến độ hiện tại của bạn:', tr: 'Mevcut İlerlemeniz:', hi: 'आपकी वर्तमान प्रगति:', id: 'Progres Anda Saat Ini:', ms: 'Kemajuan Semasa Anda:', pt: 'Seu Progresso Atual:', es: 'Tu Progreso Actual:', ru: 'Ваш текущий прогресс:' },
    'Copy Invitation Link': { tl: 'Kopyahin ang Link ng Imbitasyon', ko: '초대 링크 복사', vi: 'Sao chép liên kết mời', tr: 'Davet Bağlantısını Kopyala', hi: 'आमंत्रण लिंक कॉपी करें', id: 'Salin Tautan Undangan', ms: 'Salin Pautan Jemputan', pt: 'Copiar Link de Convite', es: 'Copiar Enlace de Invitación', ru: 'Копировать ссылку приглашения' },
    'Your Draws': { tl: 'Iyong mga Draw', ko: '보유 추첨권', vi: 'Lượt quay của bạn', tr: 'Çekiliş Haklarınız', hi: 'आपके ड्रॉ', id: 'Undian Anda', ms: 'Cabutan Anda', pt: 'Seus Giros', es: 'Tus Giros', ru: 'Ваши попытки' },
    'Members for today\'s win': { tl: 'Mga nanalo ngayon', ko: '오늘의 당첨 회원', vi: 'Thành viên trúng thưởng hôm nay', tr: 'Bugünün kazanan üyeleri', hi: 'आज के विजेता सदस्य', id: 'Anggota pemenang hari ini', ms: 'Ahli pemenang hari ini', pt: 'Membros vencedores de hoje', es: 'Miembros ganadores de hoy', ru: 'Победители сегодня' },
    'Today\'s Spin Count': { tl: 'Bilang ng Ikot Ngayon', ko: '오늘의 스핀 횟수', vi: 'Số lượt quay hôm nay', tr: 'Bugünkü Çevirme Sayısı', hi: 'आज के स्पिन की संख्या', id: 'Jumlah Putaran Hari Ini', ms: 'Bilangan Putaran Hari Ini', pt: 'Giros de Hoje', es: 'Giros de Hoy', ru: 'Вращений сегодня' },
    'Spin Now': { tl: 'Paikutin Ngayon', ko: '지금 돌리기', vi: 'Quay ngay', tr: 'Şimdi Çevir', hi: 'अभी घुमाएं', id: 'Putar Sekarang', ms: 'Putar Sekarang', pt: 'Girar Agora', es: 'Girar Ahora', ru: 'Крутить сейчас' },
    'Invite Friends & Earn Draws': { tl: 'Mag-imbita ng Kaibigan at Makakuha ng Draw', ko: '친구 초대하고 추첨권 받기', vi: 'Mời bạn bè & Nhận lượt quay', tr: 'Arkadaş Davet Et ve Çekiliş Kazan', hi: 'दोस्तों को आमंत्रित करें और ड्रॉ जीतें', id: 'Undang Teman & Dapatkan Undian', ms: 'Jemput Rakan & Dapat Cabutan', pt: 'Convide Amigos e Ganhe Giros', es: 'Invita Amigos y Gana Giros', ru: 'Приглашай друзей и получай вращения' },
    'Recent Spin Rewards': { tl: 'Mga Kamakailang Gantimpala sa Ikot', ko: '최근 스핀 보상', vi: 'Phần thưởng quay gần đây', tr: 'Son Çark Ödülleri', hi: 'हाल के स्पिन पुरस्कार', id: 'Hadiah Putaran Terbaru', ms: 'Ganjaran Putaran Terkini', pt: 'Recompensas Recentes da Roleta', es: 'Recompensas Recientes de la Ruleta', ru: 'Недавние награды колеса' },
    'No lucky spin rewards yet.': { tl: 'Wala pang gantimpala sa lucky spin.', ko: '아직 럭키 스핀 보상이 없습니다.', vi: 'Chưa có phần thưởng vòng quay nào.', tr: 'Henüz şans çarkı ödülü yok.', hi: 'अभी तक कोई लकी स्पिन पुरस्कार नहीं।', id: 'Belum ada hadiah putaran keberuntungan.', ms: 'Belum ada ganjaran putaran bertuah.', pt: 'Ainda sem recompensas da roleta.', es: 'Aún no hay recompensas de la ruleta.', ru: 'Пока нет наград колеса удачи.' },
    'Congratulations!': { tl: 'Binabati kita!', ko: '축하합니다!', vi: 'Chúc mừng!', tr: 'Tebrikler!', hi: 'बधाई हो!', id: 'Selamat!', ms: 'Tahniah!', pt: 'Parabéns!', es: '¡Felicidades!', ru: 'Поздравляем!' },
    'Your reward has been credited directly to your main balance.': { tl: 'Ang iyong gantimpala ay direktang naidagdag sa iyong pangunahing balanse.', ko: '보상이 메인 잔액으로 직접 적립되었습니다.', vi: 'Phần thưởng của bạn đã được cộng trực tiếp vào số dư chính.', tr: 'Ödülünüz doğrudan ana bakiyenize aktarıldı.', hi: 'आपका पुरस्कार सीधे आपके मुख्य बैलेंस में जोड़ दिया गया है।', id: 'Hadiah Anda telah dikreditkan langsung ke saldo utama Anda.', ms: 'Ganjaran anda telah dikreditkan terus ke baki utama anda.', pt: 'Sua recompensa foi creditada diretamente no seu saldo principal.', es: 'Tu recompensa se acreditó directamente a tu saldo principal.', ru: 'Награда зачислена прямо на ваш основной баланс.' },
    'Screenshot Preview': { tl: 'Preview ng Screenshot', ko: '스크린샷 미리보기', vi: 'Xem trước ảnh chụp', tr: 'Ekran Görüntüsü Önizlemesi', hi: 'स्क्रीनशॉट प्रीव्यू', id: 'Pratinjau Tangkapan Layar', ms: 'Pratonton Tangkapan Skrin', pt: 'Prévia da Captura', es: 'Vista Previa de Captura', ru: 'Просмотр скриншота' },
    'Official Customer Manager': { tl: 'Opisyal na Customer Manager', ko: '공식 고객 매니저', vi: 'Quản lý khách hàng chính thức', tr: 'Resmi Müşteri Yöneticisi', hi: 'आधिकारिक ग्राहक प्रबंधक', id: 'Manajer Pelanggan Resmi', ms: 'Pengurus Pelanggan Rasmi', pt: 'Gerente Oficial de Clientes', es: 'Gerente Oficial de Clientes', ru: 'Официальный менеджер поддержки' },
    'Account Manager': { tl: 'Account Manager', ko: '계정 매니저', vi: 'Quản lý tài khoản', tr: 'Hesap Yöneticisi', hi: 'खाता प्रबंधक', id: 'Manajer Akun', ms: 'Pengurus Akaun', pt: 'Gerente de Conta', es: 'Gerente de Cuenta', ru: 'Менеджер аккаунта' },
    'Online Support Active (24/7)': { tl: 'Aktibo ang Online Support (24/7)', ko: '24시간 온라인 고객지원 운영 중', vi: 'Hỗ trợ trực tuyến 24/7', tr: '7/24 Çevrimiçi Destek Aktif', hi: 'ऑनलाइन सहायता सक्रिय (24/7)', id: 'Dukungan Online Aktif (24/7)', ms: 'Sokongan Dalam Talian Aktif (24/7)', pt: 'Suporte Online Ativo (24/7)', es: 'Soporte en Línea Activo (24/7)', ru: 'Онлайн-поддержка 24/7' },
    'Contact your official Account Manager directly for task help, package activation, withdrawals, or deposits.': { tl: 'Makipag-ugnayan nang direkta sa iyong opisyal na Account Manager para sa tulong sa gawain, pag-activate ng package, pag-withdraw, o deposito.', ko: '작업 지원, 패키지 활성화, 출금 또는 입금 문의는 공식 계정 매니저에게 직접 연락하세요.', vi: 'Liên hệ trực tiếp với Quản lý tài khoản chính thức để được hỗ trợ nhiệm vụ, kích hoạt gói, rút tiền hoặc nạp tiền.', tr: 'Görev yardımı, paket aktivasyonu, çekim veya yatırım için resmi Hesap Yöneticinizle doğrudan iletişime geçin.', hi: 'कार्य सहायता, पैकेज सक्रियण, निकासी या जमा के लिए सीधे अपने आधिकारिक खाता प्रबंधक से संपर्क करें।', id: 'Hubungi Manajer Akun resmi Anda langsung untuk bantuan tugas, aktivasi paket, penarikan, atau deposit.', ms: 'Hubungi Pengurus Akaun rasmi anda secara terus untuk bantuan tugasan, pengaktifan pakej, pengeluaran atau deposit.', pt: 'Fale diretamente com seu Gerente de Conta oficial para ajuda com tarefas, ativação de pacotes, saques ou depósitos.', es: 'Contacta directamente a tu Gerente de Cuenta oficial para ayuda con tareas, activación de paquetes, retiros o depósitos.', ru: 'Свяжитесь с официальным менеджером по вопросам заданий, активации пакетов, вывода и пополнения.' },
    'Manager ID': { tl: 'ID ng Manager', ko: '매니저 ID', vi: 'ID Quản lý', tr: 'Yönetici Kimliği', hi: 'मैनेजर आईडी', id: 'ID Manajer', ms: 'ID Pengurus', pt: 'ID do Gerente', es: 'ID del Gerente', ru: 'ID менеджера' },
    'Chat with Telegram Manager': { tl: 'Makipag-chat sa Telegram Manager', ko: '텔레그램 매니저와 채팅', vi: 'Chat với quản lý Telegram', tr: 'Telegram Yöneticisi ile Sohbet Et', hi: 'टेलीग्राम मैनेजर से चैट करें', id: 'Chat dengan Manajer Telegram', ms: 'Sembang dengan Pengurus Telegram', pt: 'Conversar com Gerente no Telegram', es: 'Chatear con Gerente en Telegram', ru: 'Чат с менеджером в Telegram' },
    'Send Live Message Online': { tl: 'Magpadala ng Live na Mensahe Online', ko: '온라인 실시간 메시지 보내기', vi: 'Gửi tin nhắn trực tuyến', tr: 'Çevrimiçi Canlı Mesaj Gönder', hi: 'ऑनलाइन लाइव संदेश भेजें', id: 'Kirim Pesan Langsung Online', ms: 'Hantar Mesej Langsung Dalam Talian', pt: 'Enviar Mensagem Online ao Vivo', es: 'Enviar Mensaje en Vivo en Línea', ru: 'Отправить онлайн-сообщение' },
    'Inactive': { tl: 'Hindi Aktibo', ko: '비활성', vi: 'Không hoạt động', tr: 'Pasif', hi: 'निष्क्रिय', id: 'Tidak Aktif', ms: 'Tidak Aktif', pt: 'Inativo', es: 'Inactivo', ru: 'Неактивен' },
    'Friends': { tl: 'Mga Kaibigan', ko: '친구', vi: 'Bạn bè', tr: 'Arkadaşlar', hi: 'दोस्त', id: 'Teman', ms: 'Rakan', pt: 'Amigos', es: 'Amigos', ru: 'Друзья' },
    'Active Members': { tl: 'Aktibong Miyembro', ko: '활성 회원', vi: 'Thành viên hoạt động', tr: 'Aktif Üyeler', hi: 'सक्रिय सदस्य', id: 'Anggota Aktif', ms: 'Ahli Aktif', pt: 'Membros Ativos', es: 'Miembros Activos', ru: 'Активные участники' },
    'Deposits': { tl: 'Mga Deposito', ko: '입금', vi: 'Tiền nạp', tr: 'Yatırımlar', hi: 'जमा राशि', id: 'Deposit', ms: 'Deposit', pt: 'Depósitos', es: 'Depósitos', ru: 'Депозиты' },
    'Package & Balance Management': { tl: 'Pamamahala ng Package at Balanse', ko: '패키지 및 잔액 관리', vi: 'Quản lý gói & Số dư', tr: 'Paket ve Bakiye Yönetimi', hi: 'पैकेज और बैलेंस प्रबंधन', id: 'Manajemen Paket & Saldo', ms: 'Pengurusan Pakej & Baki', pt: 'Gestão de Pacote e Saldo', es: 'Gestión de Paquete y Saldo', ru: 'Управление пакетом и балансом' },
    'Only LV0 is free · Other tiers require balance': { tl: 'Ang LV0 lamang ang libre · Kailangan ng balanse para sa iba', ko: 'LV0만 무료 · 다른 등급은 잔액 필요', vi: 'Chỉ LV0 miễn phí · Các cấp khác cần số dư', tr: 'Yalnızca LV0 ücretsizdir · Diğer seviyeler bakiye gerektirir', hi: 'केवल LV0 मुफ़्त है · अन्य स्तरों के लिए बैलेंस आवश्यक है', id: 'Hanya LV0 gratis · Tingkat lain memerlukan saldo', ms: 'Hanya LV0 percuma · Tahap lain memerlukan baki', pt: 'Apenas LV0 é grátis · Outros níveis requerem saldo', es: 'Solo LV0 es gratis · Otros niveles requieren saldo', ru: 'Только LV0 бесплатен · Для других уровней нужен баланс' },
    'Buy Package': { tl: 'Bumili ng Package', ko: '패키지 구매', vi: 'Mua gói', tr: 'Paket Satın Al', hi: 'पैकेज खरीदें', id: 'Beli Paket', ms: 'Beli Pakej', pt: 'Comprar Pacote', es: 'Comprar Paquete', ru: 'Купить пакет' },
    'Recharge Balance': { tl: 'Mag-recharge ng Balanse', ko: '잔액 충전', vi: 'Nạp số dư', tr: 'Bakiye Yükle', hi: 'बैलेंस रिचार्ज करें', id: 'Isi Ulang Saldo', ms: 'Tambah Nilai Baki', pt: 'Recarregar Saldo', es: 'Recargar Saldo', ru: 'Пополнить баланс' },
    'Your Current Tier:': { tl: 'Iyong Kasalukuyang Antas:', ko: '현재 등급:', vi: 'Cấp hiện tại của bạn:', tr: 'Mevcut Seviyeniz:', hi: 'आपका वर्तमान स्तर:', id: 'Tingkat Anda Saat Ini:', ms: 'Tahap Semasa Anda:', pt: 'Seu Nível Atual:', es: 'Tu Nivel Actual:', ru: 'Ваш текущий уровень:' },
    'Your Current Balance:': { tl: 'Iyong Kasalukuyang Balanse:', ko: '현재 잔액:', vi: 'Số dư hiện tại của bạn:', tr: 'Mevcut Bakiyeniz:', hi: 'आपका वर्तमान बैलेंस:', id: 'Saldo Anda Saat Ini:', ms: 'Baki Semasa Anda:', pt: 'Seu Saldo Atual:', es: 'Tu Saldo Actual:', ru: 'Ваш текущий баланс:' },
    'Package Price:': { tl: 'Presyo ng Package:', ko: '패키지 가격:', vi: 'Giá gói:', tr: 'Paket Fiyatı:', hi: 'पैकेज मूल्य:', id: 'Harga Paket:', ms: 'Harga Pakej:', pt: 'Preço do Pacote:', es: 'Precio del Paquete:', ru: 'Цена пакета:' },
    'Purchase Package with Balance': { tl: 'Bumili ng Package gamit ang Balanse', ko: '잔액으로 패키지 구매', vi: 'Mua gói bằng số dư', tr: 'Bakiye ile Paket Satın Al', hi: 'बैलेंस से पैकेज खरीदें', id: 'Beli Paket dengan Saldo', ms: 'Beli Pakej dengan Baki', pt: 'Comprar Pacote com Saldo', es: 'Comprar Paquete con Saldo', ru: 'Купить пакет с баланса' },
    'Go to Recharge Tab': { tl: 'Pumunta sa Recharge Tab', ko: '충전 탭으로 이동', vi: 'Đi đến mục Nạp tiền', tr: 'Yükleme Sekmesine Git', hi: 'रिचार्ज टैब पर जाएं', id: 'Buka Tab Isi Ulang', ms: 'Pergi ke Tab Tambah Nilai', pt: 'Ir para Aba de Recarga', es: 'Ir a Pestaña de Recarga', ru: 'Перейти к пополнению' },
    'Select Recharge Amount:': { tl: 'Pumili ng Halaga ng Recharge:', ko: '충전 금액 선택:', vi: 'Chọn số tiền nạp:', tr: 'Yükleme Tutarı Seçin:', hi: 'रिचार्ज राशि चुनें:', id: 'Pilih Jumlah Isi Ulang:', ms: 'Pilih Jumlah Tambah Nilai:', pt: 'Selecione o Valor da Recarga:', es: 'Selecciona el Monto de Recarga:', ru: 'Выберите сумму пополнения:' },
    'Honest work.': { tl: 'Marangal na trabaho.', ko: '정직한 업무.', vi: 'Công việc minh bạch.', tr: 'Dürüst çalışma.', hi: 'ईमानदार काम।', id: 'Pekerjaan jujur.', ms: 'Kerja jujur.', pt: 'Trabalho honesto.', es: 'Trabajo honesto.', ru: 'Честная работа.' },
    'Simple tasks. Real rewards.': { tl: 'Simpleng gawain. Totoong gantimpala.', ko: '간단한 작업. 실질적인 보상.', vi: 'Nhiệm vụ đơn giản. Phần thưởng thật.', tr: 'Basit görevler. Gerçek ödüller.', hi: 'सरल कार्य। वास्तविक पुरस्कार।', id: 'Tugas sederhana. Hadiah nyata.', ms: 'Tugasan mudah. Ganjaran sebenar.', pt: 'Tarefas simples. Recompensas reais.', es: 'Tareas simples. Recompensas reales.', ru: 'Простые задачи. Реальные награды.' },
    'About our work': { tl: 'Tungkol sa aming trabaho', ko: '우리의 업무 소개', vi: 'Về công việc của chúng tôi', tr: 'Çalışmamız hakkında', hi: 'हमारे काम के बारे में', id: 'Tentang pekerjaan kami', ms: 'Tentang kerja kami', pt: 'Sobre o nosso trabalho', es: 'Sobre nuestro trabajo', ru: 'О нашей работе' },
    'How a campaign reaches you': { tl: 'Paano nakakarating sa iyo ang kampanya', ko: '캠페인 전달 방식', vi: 'Cách chiến dịch đến với bạn', tr: 'Kampanya size nasıl ulaşır', hi: 'अभियान आप तक कैसे पहुंचता है', id: 'Bagaimana kampanye sampai ke Anda', ms: 'Bagaimana kempen sampai kepada anda', pt: 'Como uma campanha chega até você', es: 'Cómo llega una campaña a ti', ru: 'Как кампания попадает к вам' },
    'How you do the work': { tl: 'Paano gawin ang trabaho', ko: '작업 진행 방법', vi: 'Cách bạn thực hiện công việc', tr: 'İşi nasıl yaparsınız', hi: 'आप काम कैसे करते हैं', id: 'Cara Anda melakukan pekerjaan', ms: 'Cara anda melakukan kerja', pt: 'Como você faz o trabalho', es: 'Cómo realizas el trabajo', ru: 'Как выполнять задания' },
    'Completely free for you': { tl: 'Ganap na libre para sa iyo', ko: '완전 무료 이용', vi: 'Hoàn toàn miễn phí cho bạn', tr: 'Sizin için tamamen ücretsiz', hi: 'आपके लिए पूरी तरह मुफ़्त', id: 'Sepenuhnya gratis untuk Anda', ms: 'Sepenuhnya percuma untuk anda', pt: 'Totalmente grátis para você', es: 'Totalmente gratis para ti', ru: 'Полностью бесплатно для вас' },
    'Certificates': { tl: 'Mga Sertipiko', ko: '인증서', vi: 'Chứng nhận', tr: 'Sertifikalar', hi: 'प्रमाणपत्र', id: 'Sertifikat', ms: 'Sijil', pt: 'Certificados', es: 'Certificados', ru: 'Сертификаты' },
    'Questions': { tl: 'Mga Tanong', ko: '자주 묻는 질문', vi: 'Câu hỏi thường gặp', tr: 'Sorular', hi: 'प्रश्न', id: 'Pertanyaan', ms: 'Soalan', pt: 'Perguntas', es: 'Preguntas', ru: 'Вопросы' },
    'Ready to start earning?': { tl: 'Handa ka na bang kumita?', ko: '수익 창출을 시작할 준비가 되셨나요?', vi: 'Sẵn sàng bắt đầu kiếm tiền?', tr: 'Kazanmaya başlamaya hazır mısınız?', hi: 'कमाई शुरू करने के लिए तैयार हैं?', id: 'Siap mulai menghasilkan?', ms: 'Bersedia untuk mula menjana pendapatan?', pt: 'Pronto para começar a ganhar?', es: '¿Listo para empezar a ganar?', ru: 'Готовы начать зарабатывать?' },
    'Terms': { tl: 'Mga Tuntunin', ko: '이용약관', vi: 'Điều khoản', tr: 'Şartlar', hi: 'शर्तें', id: 'Ketentuan', ms: 'Terma', pt: 'Termos', es: 'Términos', ru: 'Условия' },
    'Privacy': { tl: 'Privacy', ko: '개인정보', vi: 'Bảo mật', tr: 'Gizlilik', hi: 'गोपनीयता', id: 'Privasi', ms: 'Privasi', pt: 'Privacidade', es: 'Privacidad', ru: 'Конфиденциальность' },
    'Active Partner': { tl: 'Aktibong Partner', ko: '활성 파트너', vi: 'Đối tác hoạt động', tr: 'Aktif İş Ortağı', hi: 'सक्रिय भागीदार', id: 'Mitra Aktif', ms: 'Rakan Aktif', pt: 'Parceiro Ativo', es: 'Socio Activo', ru: 'Активный партнер' },
    'Authorized Program': { tl: 'Awtorisadong Programa', ko: '공식 인증 프로그램', vi: 'Chương trình ủy quyền', tr: 'Yetkili Program', hi: 'अधिकृत कार्यक्रम', id: 'Program Resmi', ms: 'Program Bertauliah', pt: 'Programa Autorizado', es: 'Programa Autorizado', ru: 'Авторизованная программа' },
    'Certificate ID': { tl: 'ID ng Sertipiko', ko: '인증서 번호', vi: 'Mã chứng nhận', tr: 'Sertifika No', hi: 'प्रमाणपत्र आईडी', id: 'ID Sertifikat', ms: 'ID Sijil', pt: 'ID do Certificado', es: 'ID del Certificado', ru: 'Номер сертификата' },
    'Year': { tl: 'Taon', ko: '연도', vi: 'Năm', tr: 'Yıl', hi: 'वर्ष', id: 'Tahun', ms: 'Tahun', pt: 'Ano', es: 'Año', ru: 'Год' },
    'Media Campaign Partner': { tl: 'Partner sa Kampanya ng Media', ko: '미디어 캠페인 파트너', vi: 'Đối tác chiến dịch truyền thông', tr: 'Medya Kampanya Ortağı', hi: 'मीडिया अभियान भागीदार', id: 'Mitra Kampanye Media', ms: 'Rakan Kempen Media', pt: 'Parceiro de Campanha de Mídia', es: 'Socio de Campaña de Medios', ru: 'Партнер медиакампаний' },
    'OFFICIAL COLLABORATION': { tl: 'OPISYAL NA KOLABORASYON', ko: '공식 협업', vi: 'HỢP TÁC CHÍNH THỨC', tr: 'RESMİ İŞ BİRLİĞİ', hi: 'आधिकारिक सहयोग', id: 'KOLABORASI RESMI', ms: 'KERJASAMA RASMI', pt: 'COLABORAÇÃO OFICIAL', es: 'COLABORACIÓN OFICIAL', ru: 'ОФИЦИАЛЬНОЕ СОТРУДНИЧЕСТВО' },
    'First Time': { tl: 'Unang Beses', ko: '첫 번째', vi: 'Lần đầu', tr: 'İlk Kez', hi: 'पहली बार', id: 'Pertama Kali', ms: 'Kali Pertama', pt: 'Primeira Vez', es: 'Primera Vez', ru: 'Первый раз' },
    'Deposit $30': { tl: 'Deposito $30', ko: '$30 입금', vi: 'Nạp $30', tr: '$30 Yatır', hi: '$30 जमा करें', id: 'Deposit $30', ms: 'Deposit $30', pt: 'Deposite $30', es: 'Deposita $30', ru: 'Депозит $30' },
    'Bonus $2': { tl: 'Bonus na $2', ko: '$2 보너스', vi: 'Thưởng $2', tr: '$2 Bonus', hi: '$2 बोनस', id: 'Bonus $2', ms: 'Bonus $2', pt: 'Bônus de $2', es: 'Bono de $2', ru: 'Бонус $2' },
    'First Time Deposit $30': { tl: 'Unang Deposito $30', ko: '첫 입금 $30', vi: 'Nạp lần đầu $30', tr: 'İlk Yatırım $30', hi: 'पहला जमा $30', id: 'Deposit Pertama $30', ms: 'Deposit Pertama $30', pt: 'Primeiro Depósito $30', es: 'Primer Depósito $30', ru: 'Первый депозит $30' },
    'Log Out': { tl: 'Mag-log Out', ko: '로그아웃', vi: 'Đăng xuất', tr: 'Çıkış Yap', hi: 'लॉग आउट', id: 'Keluar', ms: 'Log Keluar', pt: 'Sair', es: 'Cerrar Sesión', ru: 'Выйти' },
    'Task Reward': { tl: 'Gantimpala sa Gawain', ko: '작업 보상', vi: 'Thưởng nhiệm vụ', tr: 'Görev Ödülü', hi: 'कार्य पुरस्कार', id: 'Hadiah Tugas', ms: 'Ganjaran Tugasan', pt: 'Recompensa da Tarefa', es: 'Recompensa de Tarea', ru: 'Награда за задание' },
    'Today Earnings': { tl: 'Kita Ngayon', ko: '오늘 수익', vi: 'Thu nhập hôm nay', tr: 'Bugünkü Kazanç', hi: 'आज की कमाई', id: 'Penghasilan Hari Ini', ms: 'Pendapatan Hari Ini', pt: 'Ganhos de Hoje', es: 'Ganancias de Hoy', ru: 'Доход за сегодня' },
    'Send at least 1.00 USDT through the selected network (BEP20). Your balance updates after the transfer is detected and credited.': {
      tl: 'Magpadala ng kahit 1.00 USDT sa napiling network (BEP20). Mag-a-update ang iyong balanse pagkatapos makumpirma ang transfer.',
      ko: '선택한 네트워크(BEP20)로 최소 1.00 USDT를 보내세요. 송금이 감지되고 승인되면 잔액이 업데이트됩니다.',
      vi: 'Gửi ít nhất 1.00 USDT qua mạng đã chọn (BEP20). Số dư của bạn sẽ cập nhật sau khi giao dịch được xác nhận.',
      tr: 'Seçilen ağ (BEP20) üzerinden en az 1.00 USDT gönderin. Transfer algılanıp onaylandıktan sonra bakiyeniz güncellenir.',
      hi: 'चयनित नेटवर्क (BEP20) के माध्यम से कम से कम 1.00 USDT भेजें। ट्रांसफर की पुष्टि होने के बाद आपका बैलेंस अपडेट हो जाएगा।',
      id: 'Kirim minimal 1.00 USDT melalui jaringan yang dipilih (BEP20). Saldo Anda akan diperbarui setelah transfer terdeteksi dan dikonfirmasi.',
      ms: 'Hantar sekurang-kurangnya 1.00 USDT melalui rangkaian yang dipilih (BEP20). Baki anda akan dikemas kini selepas pemindahan disahkan.',
      pt: 'Envie pelo menos 1.00 USDT pela rede selecionada (BEP20). Seu saldo será atualizado assim que a transferência for detectada e creditada.',
      es: 'Envía al menos 1.00 USDT a través de la red seleccionada (BEP20). Tu saldo se actualizará cuando se detecte y acredite la transferencia.',
      ru: 'Отправьте не менее 1.00 USDT через выбранную сеть (BEP20). Баланс обновится после обнаружения и зачисления перевода.'
    },
    'Total Team Commission': { tl: 'Kabuuang Komisyon ng Koponan', ko: '총 팀 커미션', vi: 'Tổng hoa hồng đội', tr: 'Toplam Ekip Komisyonu', hi: 'कुल टीम कमीशन', id: 'Total Komisi Tim', ms: 'Jumlah Komisen Pasukan', pt: 'Comissão Total da Equipe', es: 'Comisión Total del Equipo', ru: 'Общая комиссия команды' },
    'Package Commission': { tl: 'Komisyon sa Package', ko: '패키지 커미션', vi: 'Hoa hồng gói', tr: 'Paket Komisyonu', hi: 'पैकेज कमीशन', id: 'Komisi Paket', ms: 'Komisen Pakej', pt: 'Comissão de Pacote', es: 'Comisión de Paquete', ru: 'Комиссия за пакеты' },
    'Daily Task Commission': { tl: 'Komisyon sa Pang-araw-araw na Gawain', ko: '일일 작업 커미션', vi: 'Hoa hồng nhiệm vụ ngày', tr: 'Günlük Görev Komisyonu', hi: 'दैनिक कार्य कमीशन', id: 'Komisi Tugas Harian', ms: 'Komisen Tugasan Harian', pt: 'Comissão de Tarefas Diárias', es: 'Comisión de Tareas Diarias', ru: 'Комиссия за задания' },
    'Commission Records': { tl: 'Mga Tala ng Komisyon', ko: '커미션 내역', vi: 'Lịch sử hoa hồng', tr: 'Komisyon Kayıtları', hi: 'कमीशन रिकॉर्ड', id: 'Riwayat Komisi', ms: 'Rekod Komisen', pt: 'Registros de Comissão', es: 'Registros de Comisión', ru: 'История комиссий' },
    'No commission records in this tier yet': { tl: 'Wala pang tala ng komisyon sa antas na ito', ko: '이 등급에 아직 커미션 내역이 없습니다', vi: 'Chưa có lịch sử hoa hồng ở cấp này', tr: 'Bu seviyede henüz komisyon kaydı yok', hi: 'इस स्तर में अभी तक कोई कमीशन रिकॉर्ड नहीं है', id: 'Belum ada riwayat komisi di tingkat ini', ms: 'Belum ada rekod komisen di tahap ini', pt: 'Ainda não há registros de comissão neste nível', es: 'Aún no hay registros de comisión en este nivel', ru: 'На этом уровне пока нет записей комиссий' }
  };

  const multiLangUiMapLower = {};
  Object.keys(multiLangUiMap).forEach(function(k) {
    multiLangUiMapLower[k.toLowerCase()] = multiLangUiMap[k];
  });

  const multiLangPatternWords = {
    memberPrefix: { tl: 'Miyembro:', ko: '회원:', vi: 'Thành viên:', tr: 'Üye:', hi: 'सदस्य:', id: 'Anggota:', ms: 'Ahli:', pt: 'Membro:', es: 'Miembro:', ru: 'Участник:' },
    completedMissions: {
      tl: 'Nakumpleto ang {n} misyon ngayon',
      ko: '오늘 {n}개 미션 완료',
      vi: 'Đã hoàn thành {n} nhiệm vụ hôm nay',
      tr: 'Bugün {n} görev tamamlandı',
      hi: 'आज {n} मिशन पूरे किए',
      id: 'Menyelesaikan {n} misi hari ini',
      ms: 'Selesai {n} misi hari ini',
      pt: 'Concluiu {n} missões hoje',
      es: 'Completó {n} misiones hoy',
      ru: 'Выполнено {n} миссий сегодня'
    },
    daysWord: { tl: 'Araw', ko: '일', vi: 'Ngày', tr: 'Gün', hi: 'दिन', id: 'Hari', ms: 'Hari', pt: 'Dias', es: 'Días', ru: 'Дн.' },
    tasksWord: { tl: 'Gawain', ko: '작업', vi: 'Nhiệm vụ', tr: 'Görev', hi: 'कार्य', id: 'Tugas', ms: 'Tugasan', pt: 'Tarefas', es: 'Tareas', ru: 'Задач' },
    freeTrial: { tl: 'Libreng Pagsubok', ko: '무료 체험', vi: 'Dùng thử miễn phí', tr: 'Ücretsiz Deneme', hi: 'निःशुल्क परीक्षण', id: 'Uji Coba Gratis', ms: 'Percubaan Percuma', pt: 'Teste Grátis', es: 'Prueba Gratis', ru: 'Бесплатный тест' },
    unlockNow: { tl: 'I-unlock Ngayon', ko: '지금 잠금 해제', vi: 'Mở khóa ngay', tr: 'Şimdi Aç', hi: 'अभी अनलॉक करें', id: 'Buka Sekarang', ms: 'Buka Sekarang', pt: 'Desbloquear Agora', es: 'Desbloquear Ahora', ru: 'Открыть сейчас' },
    freeCurrentLevel: { tl: 'Libre · Kasalukuyang Level', ko: '무료 · 현재 등급', vi: 'Miễn phí · Cấp hiện tại', tr: 'Ücretsiz · Mevcut Seviye', hi: 'मुफ़्त · वर्तमान स्तर', id: 'Gratis · Level Saat Ini', ms: 'Percuma · Tahap Semasa', pt: 'Grátis · Nível Atual', es: 'Gratis · Nivel Actual', ru: 'Бесплатно · Текущий уровень' },
    positionWord: { tl: 'Posisyon', ko: '직급', vi: 'Vị trí', tr: 'Pozisyon', hi: 'पद', id: 'Posisi', ms: 'Jawatan', pt: 'Posição', es: 'Posición', ru: 'Позиция' },
    reqNotMet: { tl: 'Hindi Pa Natutugunan (Naka-lock)', ko: '조건 미충족 (잠김)', vi: 'Chưa đủ điều kiện (Đã khóa)', tr: 'Koşul Karşılanmadı (Kilitli)', hi: 'शर्त पूरी नहीं (लॉक)', id: 'Syarat Belum Terpenuhi (Terkunci)', ms: 'Syarat Tidak Dipenuhi (Dikunci)', pt: 'Requisito Não Cumprido (Bloqueado)', es: 'Requisito No Cumplido (Bloqueado)', ru: 'Условие не выполнено (Закрыто)' },
    removeWord: { tl: 'Alisin', ko: '삭제', vi: 'Xóa', tr: 'Kaldır', hi: 'हटाएं', id: 'Hapus', ms: 'Buang', pt: 'Remover', es: 'Eliminar', ru: 'Удалить' }
  };

  function getLanguageDisplayLabel(code) {
    const normalized = normalizeLangCode(code);
    return LANGUAGE_LABEL_MAP[normalized] || 'English';
  }

  function renderLanguagePickerList() {
    const listEl = document.getElementById('language-picker-list');
    if (!listEl) return;
    const activeCode = normalizeLangCode(currentLang);
    listEl.innerHTML = LANGUAGE_OPTIONS.map(function(opt) {
      const isSelected = opt.code === activeCode;
      return (
        '<button type="button" data-select-lang="' + opt.code + '" class="lang-option-card w-full flex items-center justify-between px-5 py-4 rounded-xl text-left cursor-pointer active:scale-[0.985]' + (isSelected ? ' is-selected' : '') + '" aria-pressed="' + (isSelected ? 'true' : 'false') + '">' +
          '<span class="text-[16px] font-medium tracking-[0.01em] pointer-events-none">' + opt.label + '</span>' +
          '<span class="lang-radio-dot pointer-events-none" aria-hidden="true">' +
            (isSelected
              ? '<svg class="w-3.5 h-3.5 text-white pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
              : '') +
          '</span>' +
        '</button>'
      );
    }).join('');
  }

  function openLanguagePicker() {
    const modal = document.getElementById('language-picker-modal');
    if (!modal) return;
    renderLanguagePickerList();
    modal.removeAttribute('hidden');
    modal.hidden = false;
    modal.classList.remove('hidden');
    modal.style.setProperty('display', 'flex', 'important');
    if (document.body) {
      document.body.dataset.prevOverflowLang = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLanguagePicker() {
    const modal = document.getElementById('language-picker-modal');
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('hidden', '');
    modal.classList.add('hidden');
    modal.style.setProperty('display', 'none', 'important');
    if (document.body) {
      document.body.style.overflow = document.body.dataset.prevOverflowLang || '';
    }
  }

  function syncCountryLanguageOptions() {
    currentLang = normalizeLangCode(currentLang);
    const activeLabel = getLanguageDisplayLabel(currentLang);
    const selectors = document.querySelectorAll('#landing-language-switch, #language-switch, #login-language-switch, #register-language-switch, #profile-language-switch, #personal-language-switch, .page-language-switch, .language-switcher');
    const targetTag = 'LANG_12_NO_BN';
    const optionsHtml = LANGUAGE_OPTIONS.map(function(opt) {
      return '<option value="' + opt.code + '">' + opt.label + '</option>';
    }).join('');
    selectors.forEach(function(sel) {
      if (!sel) return;
      if (sel.dataset.countryTag !== targetTag) {
        sel.dataset.countryTag = targetTag;
        sel.innerHTML = optionsHtml;
      }
      if (sel.value !== currentLang) {
        sel.value = currentLang;
      }
    });
    document.querySelectorAll('[data-current-lang-label]').forEach(function(lbl) {
      if (lbl && lbl.textContent !== activeLabel) {
        lbl.textContent = activeLabel;
      }
    });
    renderLanguagePickerList();
  }

  function getTranslation(key, lang) {
    const l = normalizeLangCode(lang || currentLang);
    if (translations[l] && translations[l][key]) {
      return translations[l][key];
    }
    const enFallback = (translations.en && translations.en[key]) || key;
    if (l !== 'en' && multiLangUiMap[enFallback] && multiLangUiMap[enFallback][l]) {
      return multiLangUiMap[enFallback][l];
    }
    return enFallback;
  }

  // Lossless Text Node cache so switching en <-> ar <-> bn preserves original source cleanly
  const originalTextMap = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
  const originalAttrMap = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
  const originalPlaceholderMap = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

  // Build O(1) exact lookup map + language-specific substring indexes ONCE at boot
  const sortedPhraseKeys = Object.keys(phraseDictionary).sort(function(a, b) {
    return b.length - a.length;
  });

  const exactLookupMap = new Map();
  const bnSubstringPairs = [];
  const arSubstringPairs = [];
  const enSubstringPairs = [];
  const BN_CHAR_RE = /[\u0980-\u09FF]/;
  const AR_CHAR_RE = /[\u0600-\u06FF]/;
  const EN_CHAR_RE = /[A-Za-z]/;

  for (let i = 0; i < sortedPhraseKeys.length; i++) {
    const k = sortedPhraseKeys[i];
    const e = phraseDictionary[k];
    const rec = { key: k, entry: e };
    if (!exactLookupMap.has(k)) exactLookupMap.set(k, rec);
    if (e.bn && !exactLookupMap.has(e.bn)) exactLookupMap.set(e.bn, rec);
    if (e.en && !exactLookupMap.has(e.en)) exactLookupMap.set(e.en, rec);
    if (e.ar && !exactLookupMap.has(e.ar)) exactLookupMap.set(e.ar, rec);

    if (!/^\d+$/.test(k) && k.length >= 2) {
      if (BN_CHAR_RE.test(k)) {
        bnSubstringPairs.push({ src: k, entry: e, key: k });
      } else if (AR_CHAR_RE.test(k)) {
        arSubstringPairs.push({ src: k, entry: e, key: k });
      } else if (k.length >= 3 && EN_CHAR_RE.test(k)) {
        enSubstringPairs.push({ src: k, entry: e, key: k });
      }
      if (e.bn && e.bn !== k && e.bn.length >= 2 && BN_CHAR_RE.test(e.bn)) {
        bnSubstringPairs.push({ src: e.bn, entry: e, key: k });
      }
      if (e.ar && e.ar !== k && e.ar.length >= 3 && AR_CHAR_RE.test(e.ar)) {
        arSubstringPairs.push({ src: e.ar, entry: e, key: k });
      }
      if (e.en && e.en !== k && e.en.length >= 3 && EN_CHAR_RE.test(e.en)) {
        enSubstringPairs.push({ src: e.en, entry: e, key: k });
      }
    }
  }
  bnSubstringPairs.sort(function(a, b) { return b.src.length - a.src.length; });
  arSubstringPairs.sort(function(a, b) { return b.src.length - a.src.length; });
  enSubstringPairs.sort(function(a, b) { return b.src.length - a.src.length; });

  const translationResultCache = new Map();

  function resolvePhraseEntry(rawText) {
    return exactLookupMap.get(rawText) || null;
  }

  function translateTextString(sourceStr, lang) {
    lang = normalizeLangCode(lang);
    const targetLang = lang;
    const cacheKey = targetLang + '\u0000' + sourceStr;
    const cached = translationResultCache.get(cacheKey);
    if (cached) return cached;

    // For the 10 additional international languages, resolve clean English first then map via multiLangUiMap + dynamic patterns (never leaks Bengali)
    if (targetLang !== 'en' && targetLang !== 'ar') {
      const enRes = translateTextString(sourceStr, 'en');
      const enVal = enRes.value;
      const enTrimmed = enVal.trim();
      const mapRow = multiLangUiMap[enTrimmed] || multiLangUiMapLower[enTrimmed.toLowerCase()];
      const mapped = mapRow && mapRow[targetLang];
      let finalVal = enVal;
      let finalChanged = enRes.changed;
      if (mapped && mapped !== enTrimmed) {
        const lead = enVal.match(/^\s*/)[0];
        const trail = enVal.match(/\s*$/)[0];
        finalVal = lead + mapped + trail;
        finalChanged = true;
      } else if (enTrimmed) {
        let dyn = enVal;
        const mCompleted = dyn.match(/Completed\s+(\d+)\s+missions?\s+today/i);
        if (mCompleted && multiLangPatternWords.completedMissions[targetLang]) {
          dyn = dyn.replace(mCompleted[0], multiLangPatternWords.completedMissions[targetLang].replace('{n}', mCompleted[1]));
        }
        if (/^Member:/i.test(enTrimmed) && multiLangPatternWords.memberPrefix[targetLang]) {
          dyn = dyn.replace(/Member:/i, multiLangPatternWords.memberPrefix[targetLang]);
        }
        if (/My Superior:/i.test(dyn) && multiLangUiMap['My Superior:'] && multiLangUiMap['My Superior:'][targetLang]) {
          dyn = dyn.replace(/My Superior:/i, multiLangUiMap['My Superior:'][targetLang]);
        }
        if (/Free Trial/i.test(dyn) && multiLangPatternWords.freeTrial[targetLang]) {
          dyn = dyn.replace(/Free Trial/i, multiLangPatternWords.freeTrial[targetLang]);
        }
        if (/\b(\d+)\s+Days?\b/i.test(dyn) && multiLangPatternWords.daysWord[targetLang]) {
          dyn = dyn.replace(/\b(\d+)\s+Days?\b/gi, '$1 ' + multiLangPatternWords.daysWord[targetLang]);
        }
        if (/\b(\d+)\s+Tasks?\b/i.test(dyn) && multiLangPatternWords.tasksWord[targetLang]) {
          dyn = dyn.replace(/\b(\d+)\s+Tasks?\b/gi, '$1 ' + multiLangPatternWords.tasksWord[targetLang]);
        }
        if (/Unlock Now/i.test(dyn) && multiLangPatternWords.unlockNow[targetLang]) {
          dyn = dyn.replace(/Unlock Now/gi, multiLangPatternWords.unlockNow[targetLang]);
        }
        if (/Free\s*·\s*Current Level/i.test(dyn) && multiLangPatternWords.freeCurrentLevel[targetLang]) {
          dyn = dyn.replace(/Free\s*·\s*Current Level/gi, multiLangPatternWords.freeCurrentLevel[targetLang]);
        }
        if (/\bPosition\s+(\d+)\b/i.test(dyn) && multiLangPatternWords.positionWord[targetLang]) {
          dyn = dyn.replace(/\bPosition\s+(\d+)\b/gi, multiLangPatternWords.positionWord[targetLang] + ' $1');
        }
        if (/Monthly Salary/i.test(dyn) && multiLangUiMap['Monthly Salary'] && multiLangUiMap['Monthly Salary'][targetLang]) {
          dyn = dyn.replace(/Monthly Salary/gi, multiLangUiMap['Monthly Salary'][targetLang]);
        }
        if (/Active Members/i.test(dyn) && multiLangUiMap['Active Members'] && multiLangUiMap['Active Members'][targetLang]) {
          dyn = dyn.replace(/Active Members/gi, multiLangUiMap['Active Members'][targetLang]);
        }
        if (/Requirement Not Met \(Locked\)/i.test(dyn) && multiLangPatternWords.reqNotMet[targetLang]) {
          dyn = dyn.replace(/Requirement Not Met \(Locked\)/gi, multiLangPatternWords.reqNotMet[targetLang]);
        }
        if (/✕\s*Close/i.test(dyn) && multiLangUiMap['Close'] && multiLangUiMap['Close'][targetLang]) {
          dyn = dyn.replace(/Close/gi, multiLangUiMap['Close'][targetLang]);
        }
        if (/Remove/i.test(dyn) && multiLangPatternWords.removeWord[targetLang] && dyn.length < 24) {
          dyn = dyn.replace(/Remove/gi, multiLangPatternWords.removeWord[targetLang]);
        }
        if (dyn !== enVal) {
          finalVal = dyn;
          finalChanged = true;
        }
      }
      const resObj = { value: finalVal, changed: finalChanged };
      if (translationResultCache.size < 6000) {
        translationResultCache.set(cacheKey, resObj);
      }
      return resObj;
    }

    let val = sourceStr;
    let changed = false;
    const trimmed = val.trim();

    const exact = exactLookupMap.get(trimmed);
    if (exact) {
      const targetExact = exact.entry[targetLang] || exact.entry.en || trimmed;
      if (targetExact !== trimmed) {
        const lead = val.match(/^\s*/)[0];
        const trail = val.match(/\s*$/)[0];
        val = lead + targetExact + trail;
        changed = true;
      }
    } else {
      // Fast-skip substring scan when text has no characters from other scripts
      const hasBn = BN_CHAR_RE.test(val);
      const hasAr = AR_CHAR_RE.test(val);
      const hasEn = EN_CHAR_RE.test(val);

      if (hasBn && lang !== 'bn') {
        for (let i = 0; i < bnSubstringPairs.length; i++) {
          const item = bnSubstringPairs[i];
          if (val.indexOf(item.src) !== -1) {
            const target = item.entry[lang] || item.entry.en || item.src;
            if (item.src !== target) {
              val = val.split(item.src).join(target);
              changed = true;
              if (!BN_CHAR_RE.test(val)) break;
            }
          }
        }
      }
      if (hasAr && lang !== 'ar') {
        for (let i = 0; i < arSubstringPairs.length; i++) {
          const item = arSubstringPairs[i];
          if (val.indexOf(item.src) !== -1) {
            const target = item.entry[lang] || (lang === 'bn' ? (item.entry.bn || item.key) : item.entry.en) || item.src;
            if (item.src !== target) {
              val = val.split(item.src).join(target);
              changed = true;
              if (!AR_CHAR_RE.test(val)) break;
            }
          }
        }
      }
      if (hasEn && lang !== 'en') {
        for (let i = 0; i < enSubstringPairs.length; i++) {
          const item = enSubstringPairs[i];
          if (val.indexOf(item.src) !== -1) {
            const target = item.entry[lang] || (lang === 'bn' ? (item.entry.bn || item.key) : item.entry.en) || item.src;
            if (item.src !== target) {
              val = val.split(item.src).join(target);
              changed = true;
            }
          }
        }
      }
    }

    // Boundary-safe replacement for standalone "জন", numeric "টি", and numeric "দিন"
    if (lang !== 'bn' && BN_CHAR_RE.test(val)) {
      const memberWord = lang === 'ar' ? 'أعضاء' : 'members';
      if (val.trim() === 'জন') {
        val = val.replace('জন', memberWord);
        changed = true;
      } else if (/(^|[\s\d০-৯(])জন(?=$|[\s,.()।:])/.test(val)) {
        val = val.replace(/(^|[\s\d০-৯(])জন(?=$|[\s,.()।:])/g, '$1' + memberWord);
        changed = true;
      }

      if (/[\d০-৯]\s*টি(?=$|[\s,.()।:])/.test(val)) {
        val = val.replace(/([\d০-৯]+)\s*টি(?=$|[\s,.()।:])/g, '$1');
        changed = true;
      }

      if (/[\d০-৯]\s*দিন(?=$|[\s,.()।:])/.test(val)) {
        const daysWord = lang === 'ar' ? 'أيام' : 'Days';
        val = val.replace(/([\d০-৯]+)\s*দিন(?=$|[\s,.()।:])/g, '$1 ' + daysWord);
        changed = true;
      }
    }

    // Convert any leftover Bengali digits (০-৯) to Western digits (0-9) when lang !== 'bn'
    if (lang !== 'bn' && /[০-৯]/.test(val)) {
      val = val.replace(/[০-৯]/g, function(d) {
        return String('০১২৩৪৫৬৭৮৯'.indexOf(d));
      });
      changed = true;
    }

    const result = { value: val, changed: changed };
    if (translationResultCache.size < 4000) {
      translationResultCache.set(cacheKey, result);
    }
    return result;
  }

  let _lastTranslateDomLang = '';
  let _lastTranslateDomAt = 0;

  // Translate all text nodes in the DOM
  function translateDOM(targetLang, opts) {
    const lang = normalizeLangCode(targetLang || currentLang);
    const now = Date.now();
    const isSilent = Boolean(opts && opts.silent);
    const isForce = Boolean(opts && opts.force);
    if (!isForce && isSilent && _lastTranslateDomLang === lang && (now - _lastTranslateDomAt) < 250) {
      return;
    }
    _lastTranslateDomLang = lang;
    _lastTranslateDomAt = now;

    // 1. Update document attributes & title
    if (document.documentElement) {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

      document.documentElement.classList.toggle('lang-bn', lang === 'bn');
      document.documentElement.classList.toggle('lang-ar', lang === 'ar');
      if (document.body) {
        document.body.classList.toggle('lang-bn', lang === 'bn');
        document.body.classList.toggle('lang-ar', lang === 'ar');
      }

      document.title = 'PW NEW MEDIA';
    }

    // 2. Synchronize all language selectors
    syncCountryLanguageOptions();

    // 3. Update input placeholders from placeholderMap
    Object.keys(placeholderMap).forEach(function(id) {
      const els = document.querySelectorAll('[id="' + id + '"]');
      const entry = placeholderMap[id];
      const phVal = entry[lang] !== undefined
        ? entry[lang]
        : ((multiLangUiMap[entry.en] && multiLangUiMap[entry.en][lang]) || entry.en);
      els.forEach(function(el) {
        if (el && phVal !== undefined) {
          el.placeholder = phVal;
        }
      });
    });

    // 3b. Fallback: translate any remaining input/textarea placeholders not in placeholderMap
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function(el) {
      if (!el || (el.id && placeholderMap[el.id]) || el.hasAttribute('data-i18n-placeholder')) return;
      if (el.closest && el.closest('.notranslate, [data-no-translate]')) return;
      const curPh = el.getAttribute('placeholder');
      if (!curPh) return;
      let basePh = curPh;
      if (originalPlaceholderMap) {
        const rec = originalPlaceholderMap.get(el);
        if (rec && rec.last === curPh) {
          basePh = rec.orig;
        } else {
          originalPlaceholderMap.set(el, { orig: curPh, last: curPh });
          basePh = curPh;
        }
      }
      const resPh = translateTextString(basePh, lang);
      if (resPh.value !== curPh) {
        el.setAttribute('placeholder', resPh.value);
        if (originalPlaceholderMap) {
          const rec = originalPlaceholderMap.get(el);
          if (rec) rec.last = resPh.value;
        }
      }
    });

    // 4. Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      const val = getTranslation(key, lang);
      if (val && el.textContent !== val) el.textContent = val;
    });

    // 4b. Update elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getTranslation(key, lang);
      if (val && el.placeholder !== val) el.placeholder = val;
    });

    // 5. Replace text in DOM tree using phraseDictionary (with WeakMap round-trip memory)
    const walker = document.createTreeWalker(
      document.body || document.documentElement,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'CODE' || tag === 'PRE') {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.hasAttribute('data-i18n')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest && parent.closest(
            '#profile-account-number, #profile-invite-code, #profile-member-id, #dashboard-user-name, ' +
            '#balance-display, #usdt-balance-display, [data-profile-value], .notranslate, [data-no-translate], ' +
            'input, textarea, select'
          )) {
            return NodeFilter.FILTER_REJECT;
          }
          const text = node.nodeValue.trim();
          if (!text) return NodeFilter.FILTER_SKIP;
          if (text.length < 2 && !/[\u0980-\u09FF\u0600-\u06FF]/.test(text)) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodesToReplace = [];
    while (walker.nextNode()) {
      nodesToReplace.push(walker.currentNode);
    }

    nodesToReplace.forEach(function(node) {
      const currentVal = node.nodeValue;
      let baseSource = currentVal;

      if (originalTextMap) {
        const rec = originalTextMap.get(node);
        if (rec && rec.last === currentVal) {
          baseSource = rec.orig;
        } else {
          originalTextMap.set(node, { orig: currentVal, last: currentVal });
          baseSource = currentVal;
        }
      }

      const res = translateTextString(baseSource, lang);
      if (res.value !== currentVal) {
        node.nodeValue = res.value;
        if (originalTextMap) {
          const rec = originalTextMap.get(node);
          if (rec) rec.last = res.value;
        }
      }
    });

    // 5b. Translate [title] tooltips losslessly
    document.querySelectorAll('[title]').forEach(function(el) {
      if (el.closest && el.closest('.notranslate, [data-no-translate]')) return;
      const curTitle = el.getAttribute('title');
      if (!curTitle) return;
      let baseTitle = curTitle;
      if (originalAttrMap) {
        const rec = originalAttrMap.get(el);
        if (rec && rec.last === curTitle) {
          baseTitle = rec.orig;
        } else {
          originalAttrMap.set(el, { orig: curTitle, last: curTitle });
          baseTitle = curTitle;
        }
      }
      const match = resolvePhraseEntry(baseTitle);
      if (match) {
        const target = match.entry[lang] || (lang === 'bn' ? (match.entry.bn || match.key) : match.entry.en) || baseTitle;
        if (target && target !== curTitle) {
          el.setAttribute('title', target);
          if (originalAttrMap) {
            const rec = originalAttrMap.get(el);
            if (rec) rec.last = target;
          }
        }
      }
    });

    // 6. Dynamic panel refreshes if functions exist (skip redundant callbacks on silent boot)
    if (!isSilent) {
      try {
        if (typeof window.updateDashboardTitleForLang === 'function') {
          window.updateDashboardTitleForLang(lang);
        }
        if (typeof window.updatePaymentAndWithdrawalForUser === 'function') {
          window.updatePaymentAndWithdrawalForUser();
        }
        if (typeof window.updateTeamReportMetrics === 'function') {
          window.updateTeamReportMetrics();
        }
        if (typeof window.updateProfileMetrics === 'function') {
          window.updateProfileMetrics();
        }
        if (typeof window.updateHomeWithdrawalTicker === 'function') {
          window.updateHomeWithdrawalTicker();
        }
        if (typeof window.updateHomeMemberUpdates === 'function') {
          window.updateHomeMemberUpdates();
        }
        if (typeof window.populateAllCountrySelects === 'function') {
          window.populateAllCountrySelects(lang);
        }
      } catch(e) {}
    }
  }

  function setAppLanguage(newLang, options) {
    const prevLang = currentLang;
    const normalized = normalizeLangCode(newLang);
    const isSilent = Boolean(options && options.silent);
    const changed = (prevLang !== normalized);
    currentLang = normalized;

    try {
      localStorage.setItem('alo_lang', normalized);
      localStorage.setItem('lang', normalized);
      if (!isSilent) {
        localStorage.setItem('alo_lang_manual', '1');
      }
      const user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
      if (user) {
        user.language = normalized;
        if (!isSilent) {
          user.languageManual = true;
        }
        localStorage.setItem('aloSignedInUser', JSON.stringify(user));
      }
    } catch(e) {}

    syncCountryLanguageOptions();
    translateDOM(normalized, { silent: isSilent });

    if (changed) {
      try {
        if (typeof window.refreshAllMissionsAndMetrics === 'function') {
          window.refreshAllMissionsAndMetrics();
        }
        if (typeof window.updateProfileMetrics === 'function') {
          window.updateProfileMetrics();
        }
      } catch(e) {}

      window.dispatchEvent(new CustomEvent('alo-language-changed', {
        detail: {
          lang: normalized,
          userInitiated: !(options && options.silent)
        }
      }));
    }
  }

  // Expose to window
  window.aloI18n = {
    setLanguage: setAppLanguage,
    getLanguage: function() { return currentLang; },
    getLanguageLabel: getLanguageDisplayLabel,
    languages: LANGUAGE_OPTIONS.slice(),
    openLanguagePicker: openLanguagePicker,
    closeLanguagePicker: closeLanguagePicker,
    normalizeLangCode: normalizeLangCode,
    t: getTranslation,
    translateText: function(str, lang) { return translateTextString(String(str || ''), lang || currentLang).value; },
    translateDOM: translateDOM,
    translations: translations,
    syncCountryLanguageOptions: syncCountryLanguageOptions,
    getCurrentCountryCode: getCurrentCountryCode,
    getCountryAllowedLanguages: getCountryAllowedLanguages
  };
  window.setAppLanguage = setAppLanguage;
  window.openLanguagePicker = openLanguagePicker;
  window.closeLanguagePicker = closeLanguagePicker;
  window.syncCountryLanguageOptions = syncCountryLanguageOptions;
  window.t = getTranslation;

  // Bind change events on all language selectors + direct backup triggers for picker buttons
  function bindLanguageSelectors() {
    syncCountryLanguageOptions();
    document.querySelectorAll('#landing-language-switch, #language-switch, #login-language-switch, #register-language-switch, #profile-language-switch, #personal-language-switch, .page-language-switch, .language-switcher').forEach(function(sel) {
      if (sel && !sel.dataset.i18nBound) {
        sel.dataset.i18nBound = 'true';
        sel.addEventListener('change', function(e) {
          setAppLanguage(e.target.value, { silent: false });
        });
      }
      if (sel && sel.value !== currentLang) sel.value = currentLang;
    });
    document.querySelectorAll('[data-open-language-picker]').forEach(function(btn) {
      if (btn && !btn.dataset.langPickerBound) {
        btn.dataset.langPickerBound = 'true';
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          openLanguagePicker();
        });
      }
    });
    const closeBtnEl = document.getElementById('close-language-picker-btn');
    if (closeBtnEl && !closeBtnEl.dataset.langPickerBound) {
      closeBtnEl.dataset.langPickerBound = 'true';
      closeBtnEl.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeLanguagePicker();
      });
    }
  }

  // Global delegated listener ensures dynamic selects always trigger
  document.addEventListener('change', function(e) {
    if (e.target && e.target.matches && e.target.matches('#landing-language-switch, #language-switch, #login-language-switch, #register-language-switch, #profile-language-switch, #personal-language-switch, .page-language-switch, .language-switcher')) {
      setAppLanguage(e.target.value, { silent: false });
    }
  });

  // Global delegated click listeners for full-screen Language Picker modal (TextNode-safe)
  document.addEventListener('click', function(e) {
    const rawTarget = e.target;
    const targetEl = (rawTarget && rawTarget.nodeType === 1) ? rawTarget : (rawTarget && rawTarget.parentElement);
    if (!targetEl || typeof targetEl.closest !== 'function') return;

    const openTrigger = targetEl.closest('[data-open-language-picker]');
    if (openTrigger) {
      e.preventDefault();
      openLanguagePicker();
      return;
    }

    const closeBtn = targetEl.closest('#close-language-picker-btn');
    if (closeBtn) {
      e.preventDefault();
      closeLanguagePicker();
      return;
    }

    const optionBtn = targetEl.closest('[data-select-lang]');
    if (optionBtn) {
      e.preventDefault();
      const chosen = optionBtn.getAttribute('data-select-lang');
      setAppLanguage(chosen, { silent: false });
      renderLanguagePickerList();
      setTimeout(closeLanguagePicker, 140);
      return;
    }

    const modalEl = document.getElementById('language-picker-modal');
    if (modalEl && !modalEl.hidden && targetEl === modalEl) {
      closeLanguagePicker();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('language-picker-modal');
      if (modal && !modal.hidden) {
        closeLanguagePicker();
      }
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      bindLanguageSelectors();
      translateDOM(currentLang);
    });
  } else {
    bindLanguageSelectors();
    translateDOM(currentLang);
  }

})();
