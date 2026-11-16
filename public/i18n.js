// PW New Media Multi-Language (i18n) Engine
// Supports English (en - Default), Arabic (ar), Bengali (bn)

(function() {
  'use strict';

  const VALID_LANGS = ['en', 'ar', 'bn'];

  function normalizeLangCode(lang) {
    const clean = String(lang || '').trim().toLowerCase();
    if (clean === 'en' || clean === 'ar' || clean === 'bn') return clean;
    if (clean === 'hi') return 'en';
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
      'team_balance': 'মোট দলের ভারসাম্য(BDT)',
      'team_flow': 'মোট দলের প্রবাহ(BDT)',
      'team_recharge': 'মোট রিচার্জ(BDT)',
      'team_cashout': 'মোট নগদ আউট(BDT)',
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
      'team_balance': 'Team Balance (BDT)',
      'team_flow': 'Team Flow (BDT)',
      'team_recharge': 'Team Recharge (BDT)',
      'team_cashout': 'Team Cashout (BDT)',
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
    "মোট দলের ভারসাম্য(BDT)": { en: "Team Balance (BDT)", ar: "رصيد الفريق" },
    "মোট দলের প্রবাহ(BDT)": { en: "Team Flow (BDT)", ar: "حجم تداول الفريق" },
    "মোট রিচার্জ(BDT)": { en: "Total Recharge (BDT)", ar: "إجمالي الشحن" },
    "মোট নগদ আউট(BDT)": { en: "Total Cashout (BDT)", ar: "إجمالي السحب" },
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
    "মাসিক উত্তোলন 0 frecuencia": { en: "Monthly withdrawal 0 frequency", ar: "السحب الشهري 0 مرة" },
    "BDT উত্তোলন 48-96 ঘণ্টার মধ্যে আসে": { en: "BDT withdrawal arrives within 48-96 hours", ar: "يصل سحب BDT خلال 48-96 ساعة" },
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
    "প্রতিটি কাজ শেষ করার সাথে সাথে কাজের নির্দিষ্ট পারিশ্রমিক সরাসরি আপনার ব্যালেন্সে জমা হবে। মেয়াদ চলাকালীন প্রতিদিনের উপার্জিত টাকা আপনি কোনো ঝামেলা ছাড়াই নিজের বিকাশ, নগদ কিংবা বাইনান্স (Binance USDT) অ্যাকাউন্টে তাৎক্ষণিক তুলে নিতে পারবেন।": { en: "Upon completing and verifying each task, the task reward is credited directly to your balance. You can withdraw earnings seamlessly to your bound payout wallet (USDT BEP20 / local payout).", ar: "عند إكمال كل مهمة والتحقق منها، تُضاف مكافأتها مباشرة إلى رصيدك ويمكنك سحب أرباحك بسهولة إلى محفظة السحب المرتبطة بك." },
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
    "কোনো লুকানো চার্জ বা জটিল শর্ত নেই। প্রতিদিনের উপার্জিত টাকা আপনি সাথে সাথে বিকাশ, নগদ অথবা Binance-এ উত্তোলন করতে পারবেন।": { en: "No hidden terms or complicated hurdles. Withdraw your daily earnings smoothly to your linked payout wallet.", ar: "بدون رسوم خفية أو شروط معقدة. اسحب أرباحك اليومية بسلاسة إلى محفظة السحب المرتبطة بك." },
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
    "৬টি কাজ (প্রতি কাজ ৳ ৩০)": { en: "6 Tasks (৳30 Each)", ar: "6 مهام (৳30 لكل مهمة)" }
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
      bn: 'টাকার পরিমাণ লিখুন',
      en: 'Enter deposit amount',
      ar: 'أدخل مبلغ الإيداع'
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

  function syncCountryLanguageOptions() {
    currentLang = normalizeLangCode(currentLang);
    const selectors = document.querySelectorAll('#landing-language-switch, #language-switch, #login-language-switch, #register-language-switch, #profile-language-switch, #personal-language-switch, .page-language-switch, .language-switcher');
    const targetTag = 'EN_AR_BN';
    selectors.forEach(function(sel) {
      if (!sel) return;
      if (sel.dataset.countryTag !== targetTag) {
        sel.dataset.countryTag = targetTag;
        if (sel.id === 'landing-language-switch') {
          sel.innerHTML =
            '<option value="en">English</option>' +
            '<option value="bn">বাংলা</option>' +
            '<option value="ar">العربية</option>';
        } else {
          sel.innerHTML =
            '<option value="en" class="bg-[#050e21] text-white">English</option>' +
            '<option value="ar" class="bg-[#050e21] text-white">العربية</option>' +
            '<option value="bn" class="bg-[#050e21] text-white">বাংলা</option>';
        }
      }
      if (sel.value !== currentLang) {
        sel.value = currentLang;
      }
    });
  }

  function getTranslation(key, lang) {
    const l = normalizeLangCode(lang || currentLang);
    if (translations[l] && translations[l][key]) {
      return translations[l][key];
    }
    return (translations.en && translations.en[key]) || (translations.bn && translations.bn[key]) || key;
  }

  // Lossless Text Node cache so switching en <-> ar <-> bn preserves original source cleanly
  const originalTextMap = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
  const originalAttrMap = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

  // Build reverse index once for fast lookup from en/ar/bn variants to canonical phraseDictionary key
  const sortedPhraseKeys = Object.keys(phraseDictionary).sort(function(a, b) {
    return b.length - a.length;
  });

  function resolvePhraseEntry(rawText) {
    if (phraseDictionary[rawText]) {
      return { key: rawText, entry: phraseDictionary[rawText] };
    }
    for (let i = 0; i < sortedPhraseKeys.length; i++) {
      const k = sortedPhraseKeys[i];
      const e = phraseDictionary[k];
      if ((e.en && e.en === rawText) || (e.ar && e.ar === rawText) || (e.bn && e.bn === rawText)) {
        return { key: k, entry: e };
      }
    }
    return null;
  }

  function translateTextString(sourceStr, lang) {
    let val = sourceStr;
    let changed = false;

    const exact = resolvePhraseEntry(val.trim());
    if (exact) {
      const targetExact = exact.entry[lang] || (lang === 'bn' ? exact.key : exact.entry.en) || val.trim();
      const lead = val.match(/^\s*/)[0];
      const trail = val.match(/\s*$/)[0];
      const nextVal = lead + targetExact + trail;
      if (nextVal !== val) {
        val = nextVal;
        changed = true;
      }
    } else {
      sortedPhraseKeys.forEach(function(phrase) {
        if (/^\d+$/.test(phrase) || phrase.length < 2) return;
        const entry = phraseDictionary[phrase];
        const target = entry[lang] || (lang === 'bn' ? (entry.bn || phrase) : (entry.en || phrase));

        if (val.includes(phrase)) {
          if (phrase !== target) {
            val = val.split(phrase).join(target);
            changed = true;
          }
        } else {
          const variants = [entry.bn, entry.en, entry.ar];
          for (let v = 0; v < variants.length; v++) {
            const candidate = variants[v];
            if (candidate && !/^\d+$/.test(candidate.trim()) && candidate.trim().length >= 3 && val.includes(candidate)) {
              if (candidate !== target) {
                val = val.split(candidate).join(target);
                changed = true;
              }
              break;
            }
          }
        }
      });
    }

    // Boundary-safe replacement for standalone "জন"
    if (lang !== 'bn') {
      const memberWord = lang === 'ar' ? 'أعضاء' : 'members';
      if (val.trim() === 'জন') {
        val = val.replace('জন', memberWord);
        changed = true;
      } else if (/(^|[\s\d০-৯(])জন(?=$|[\s,.()।:])/.test(val)) {
        val = val.replace(/(^|[\s\d০-৯(])জন(?=$|[\s,.()।:])/g, '$1' + memberWord);
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

    return { value: val, changed: changed };
  }

  // Translate all text nodes in the DOM
  function translateDOM(targetLang) {
    const lang = normalizeLangCode(targetLang || currentLang);

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
      els.forEach(function(el) {
        if (el && placeholderMap[id][lang] !== undefined) {
          el.placeholder = placeholderMap[id][lang];
        }
      });
    });

    // 4. Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      const val = getTranslation(key, lang);
      if (val) el.textContent = val;
    });

    // 4b. Update elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getTranslation(key, lang);
      if (val) el.placeholder = val;
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

    // 6. Dynamic panel refreshes if functions exist
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
    translateDOM(normalized);

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
    normalizeLangCode: normalizeLangCode,
    t: getTranslation,
    translateDOM: translateDOM,
    translations: translations,
    syncCountryLanguageOptions: syncCountryLanguageOptions,
    getCurrentCountryCode: getCurrentCountryCode,
    getCountryAllowedLanguages: getCountryAllowedLanguages
  };
  window.setAppLanguage = setAppLanguage;
  window.syncCountryLanguageOptions = syncCountryLanguageOptions;
  window.t = getTranslation;

  // Bind change events on all language selectors
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
  }

  // Global delegated listener ensures dynamic selects always trigger
  document.addEventListener('change', function(e) {
    if (e.target && e.target.matches && e.target.matches('#landing-language-switch, #language-switch, #login-language-switch, #register-language-switch, #profile-language-switch, #personal-language-switch, .page-language-switch, .language-switcher')) {
      setAppLanguage(e.target.value, { silent: false });
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
