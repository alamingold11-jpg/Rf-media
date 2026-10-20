// Alo App Multi-Language (i18n) Engine
// Supports Bengali (bn), English (en), Arabic (ar)

(function() {
  'use strict';

  const translations = {
    bn: {
      // Common & Navigation
      'home': 'প্রথম পাতা',
      'hall': 'হল',
      'records': 'সদস্য',
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
      'login_title': 'আপনার অ্যাকাউন্টে লগইন করুন',
      'welcome_back': 'আবার স্বাগতম',
      'login_subtitle': 'আপনার তথ্য দিয়ে লগইন করে যেখানে থেমেছিলেন, সেখান থেকেই শুরু করুন।',
      'phone_label': 'ফোন নম্বর',
      'phone_placeholder': '+880 ফোন নম্বর লিখুন',
      'password_label': 'পাসওয়ার্ড',
      'password_placeholder': 'আপনার পাসওয়ার্ড লিখুন',
      'forgot_password': 'পাসওয়ার্ড ভুলে গেছেন?',
      'remember_me': 'আমাকে লগইন অবস্থায় রাখুন',
      'login_submit': 'লগইন করুন',
      'demo_login': 'ডেমো অ্যাকাউন্ট দিয়ে দ্রুত প্রবেশ',
      'new_here': 'নতুন এখানে?',
      'create_account': 'নতুন অ্যাকাউন্ট তৈরি করুন',
      'back_to_home': 'হোমপেজে ফিরে যান',
      'login_success': 'লগইন সফল!',
      'welcome_goldmine': 'স্বর্ণের খনিতে স্বাগতম',

      // Register
      'register_title': 'স্বর্ণের খনিতে স্বাগতম',
      'register_subtitle': 'আপনার নির্ভরযোগ্য ডিজিটাল আয়ের প্ল্যাটফর্ম',
      'sms_code_label': 'এসএমএস যাচাইকরণ কোড',
      'sms_code_placeholder': 'এসএমএস যাচাইকরণ কোড লিখুন',
      'send_sms_code': 'যাচাইকরণ কোড পাঠান',
      'enter_password': 'আপনার পাসওয়ার্ড দিন',
      'confirm_password_label': 'পাসওয়ার্ড নিশ্চিত করুন',
      'confirm_password_placeholder': 'আপনার পাসওয়ার্ড নিশ্চিত করুন',
      'invite_code_label': 'আমন্ত্রণ কোড',
      'invite_code_placeholder': 'আমন্ত্রণ কোড (যদি থাকে)',
      'signup_submit': 'এখন সাইইন আপ করুন',
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
      'rebate': 'রিবেট',
      'rebate_10': '১০% রিবেট',
      'rebate_5': '৫% রিবেট',
      'rebate_2': '২% রিবেট',
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
      'invite_hint': 'আপনার রেফারেল লিঙ্ক বা কোড শেয়ার করে বন্ধুদের যুক্ত করুন। আপনার বন্ধুরা অ্যাকাউন্ট খুললে স্তর ১, স্তর ২ ও স্তর ৩ এর কমিশন আপনার ব্যালেন্সে যোগ হবে!',
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
      'set_now': 'সেট করুন'
    },

    en: {
      // Common & Navigation
      'home': 'Home',
      'hall': 'Hall',
      'records': 'VIP',
      'tasks': 'Tasks',
      'mine': 'Mine',
      'login': 'Login',
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

      // Home & Headers
      'brand_name': 'Alo',
      'hero_title': 'Bring Fresh Light to Your Daily Earnings',
      'hero_subtitle': 'Welcome to your personal digital earnings platform. Simple, transparent, and built for you.',
      'get_started': 'Get Started Now',
      'have_account': 'I Have an Account',
      'start_today': 'Start Today',
      'quick_access': 'Quick Access',
      'anytime_anywhere': 'Anytime, Anywhere',
      'your_way': 'Your Own Way',
      'smooth_experience': 'Smooth & Comfortable Experience',
      'footer_text': 'May every beginning bring you prosperity',

      // Login
      'login_title': 'Sign In to Your Account',
      'welcome_back': 'Welcome Back',
      'login_subtitle': 'Enter your credentials to continue right where you left off.',
      'phone_label': 'Phone Number',
      'phone_placeholder': 'Enter phone number (+880...)',
      'password_label': 'Password',
      'password_placeholder': 'Enter your password',
      'forgot_password': 'Forgot Password?',
      'remember_me': 'Keep me logged in',
      'login_submit': 'Log In Now',
      'demo_login': 'Quick Access with Demo Account',
      'new_here': 'New here?',
      'create_account': 'Create New Account',
      'back_to_home': 'Back to Homepage',
      'login_success': 'Login Successful!',
      'welcome_goldmine': 'Welcome to Gold Mine',

      // Register
      'register_title': 'Welcome to Gold Mine',
      'register_subtitle': 'Your Trusted Digital Income Platform',
      'sms_code_label': 'SMS Verification Code',
      'sms_code_placeholder': 'Enter SMS verification code',
      'send_sms_code': 'Send Code',
      'enter_password': 'Create your password',
      'confirm_password_label': 'Confirm Password',
      'confirm_password_placeholder': 'Confirm your password',
      'invite_code_label': 'Invitation Code',
      'invite_code_placeholder': 'Invitation code (optional)',
      'signup_submit': 'Sign Up Now',
      'already_account': 'Already have an account?',
      'register_success': 'Registration Successful!',

      // Profile & Pass
      'superior': 'Superior:',
      'account_number': 'Account:',
      'invite_code': 'Invite Code:',
      'member_id': 'ID:',
      'total_balance': 'Total Balance',
      'available_balance': 'Available Balance',
      'frozen_balance': 'Frozen',
      'today_income': "Today's Income",
      'today_task_income': 'Task Income',
      'total_revenue': 'Total Revenue',
      'incomplete_missions': 'Incomplete Tasks',
      'completed_missions': 'Completed Tasks',
      'my_pass': 'My Pass',
      'withdraw': 'Withdraw',
      'deposit': 'Deposit',
      'team_report': 'Team Report',
      'personal_info': 'Personal Info',
      'task_records': 'Task Records',
      'customer_service': 'Support',
      'share': 'Share',
      'change_language': 'Change Language',

      // Team Report
      'team_report_title': 'Team Report',
      'my_team': 'My Team',
      'team_balance': 'Team Balance (BDT)',
      'team_flow': 'Team Flow (BDT)',
      'team_recharge': 'Total Recharge (BDT)',
      'team_cashout': 'Total Cashout (BDT)',
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
      'total_people': 'Members',
      'recharge_amount': 'Recharge Amount',
      'rebate': 'Rebate',
      'rebate_10': '10% Rebate',
      'rebate_5': '5% Rebate',
      'rebate_2': '2% Rebate',
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
      'empty_team_all': 'No team members added yet',
      'empty_team_tier': 'No members in this tier yet',
      'invite_hint': 'Share your referral code with friends. Earn 10% commission on Tier 1, 5% on Tier 2, and 2% on Tier 3 directly to your balance!',
      'loading_team': 'Loading team records from database...',

      // Withdraw & Payment
      'withdraw_title': 'Withdrawal',
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
      'doing_tasks': 'Doing',
      'review_tasks': 'Review',
      'done_tasks': 'Done',
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
      'set_now': 'Set Up'
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

      // Home & Headers
      'brand_name': 'ألو',
      'hero_title': 'أضف نورًا جديدًا لأرباحك اليومية',
      'hero_subtitle': 'مرحبًا بك في منصتك الرقمية للأرباح. بسيطة، شفافة ومصممة خصيصًا لك.',
      'get_started': 'ابدأ الآن بثقة',
      'have_account': 'لدي حساب بالفعل',
      'start_today': 'ابدأ اليوم',
      'quick_access': 'وصول سريع',
      'anytime_anywhere': 'في أي وقت وفي أي مكان',
      'your_way': 'على طريقتك',
      'smooth_experience': 'تجربة مريحة وسلسة',
      'footer_text': 'نتمنى لك بداية ملؤها النجاح',

      // Login
      'login_title': 'تسجيل الدخول إلى حسابك',
      'welcome_back': 'مرحبًا بك مجددًا',
      'login_subtitle': 'أدخل بياناتك للمتابعة من حيث توقفت.',
      'phone_label': 'رقم الهاتف',
      'phone_placeholder': 'أدخل رقم الهاتف (+880...)',
      'password_label': 'كلمة المرور',
      'password_placeholder': 'أدخل كلمة المرور',
      'forgot_password': 'نسيت كلمة المرور؟',
      'remember_me': 'تذكرني على هذا الجهاز',
      'login_submit': 'تسجيل الدخول الآن',
      'demo_login': 'دخول سريع بحساب تجريبي',
      'new_here': 'جديد هنا؟',
      'create_account': 'إنشاء حساب جديد',
      'back_to_home': 'العودة للصفحة الرئيسية',
      'login_success': 'تم تسجيل الدخول بنجاح!',
      'welcome_goldmine': 'مرحبًا بك في منجم الذهب',

      // Register
      'register_title': 'مرحبًا بك في منجم الذهب',
      'register_subtitle': 'منصتك الرقمية الموثوقة للدخل',
      'sms_code_label': 'رمز التحقق عبر SMS',
      'sms_code_placeholder': 'أدخل رمز التحقق',
      'send_sms_code': 'إرسال الرمز',
      'enter_password': 'أدخل كلمة المرور',
      'confirm_password_label': 'تأكيد كلمة المرور',
      'confirm_password_placeholder': 'أعد إدخال كلمة المرور',
      'invite_code_label': 'رمز الدعوة',
      'invite_code_placeholder': 'رمز الدعوة (اختياري)',
      'signup_submit': 'سجل الآن',
      'already_account': 'هل لديك حساب بالفعل؟',
      'register_success': 'تم التسجيل بنجاح!',

      // Profile & Pass
      'superior': 'المعرف الأعلى:',
      'account_number': 'رقم الحساب:',
      'invite_code': 'رمز الدعوة:',
      'member_id': 'المعرف:',
      'total_balance': 'الرصيد الإجمالي',
      'available_balance': 'الرصيد المتاح',
      'frozen_balance': 'المجمد',
      'today_income': 'إجمالي دخل اليوم',
      'today_task_income': 'دخل المهام اليوم',
      'total_revenue': 'إجمالي الإيرادات',
      'incomplete_missions': 'المهام غير المكتملة',
      'completed_missions': 'المهام المكتملة',
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
      'team_balance': 'رصيد الفريق (BDT)',
      'team_flow': 'تدفق الفريق (BDT)',
      'team_recharge': 'إجمالي شحن الفريق (BDT)',
      'team_cashout': 'إجمالي سحب الفريق (BDT)',
      'first_charge_count': 'مرات الشحن الأول',
      'direct_push_count': 'الدعوات المباشرة (المستوى 1)',
      'total_team_size': 'إجمالي حجم الفريق',
      'new_team_members': 'الأعضاء الجدد (24 ساعة)',
      'tier_1': 'المستوى 1',
      'tier_2': 'المستوى 2',
      'tier_3': 'المستوى 3',
      'tier_1_direct': 'المستوى 1 (مباشر)',
      'tier_2_label': 'المستوى 2',
      'tier_3_label': 'المستوى 3',
      'total_people': 'إجمالي الأعضاء',
      'recharge_amount': 'مبلغ الشحن',
      'rebate': 'العمولة المستردة',
      'rebate_10': 'عمولة 10%',
      'rebate_5': 'عمولة 5%',
      'rebate_2': 'عمولة 2%',
      'tier_1_comm': 'عمولة المستوى 1 (مباشر):',
      'tier_2_comm': 'عمولة المستوى 2:',
      'tier_3_comm': 'عمولة المستوى 3:',
      'copy_code': 'نسخ الرمز',
      'invite_page': 'صفحة الدعوة',
      'your_invite_code': 'رمز دعوتك:',
      'package': 'الباقة',
      'balance': 'الرصيد',
      'recharge': 'الشحن',
      'joined': 'انضم في:',
      'member_list': 'قائمة الأعضاء',
      'real_data': 'بيانات حقيقية',
      'empty_team_all': 'لم ينضم أي عضو لفريقك بعد',
      'empty_team_tier': 'لا يوجد أعضاء في هذا المستوى حتى الآن',
      'invite_hint': 'شارك رابط أو رمز الدعوة مع أصدقائك. احصل على عمولة 10% للمستوى 1، و5% للمستوى 2، و2% للمستوى 3 تضاف مباشرة إلى رصيدك!',
      'loading_team': 'جارٍ تحميل بيانات الفريق من قاعدة البيانات...',

      // Withdraw & Payment
      'withdraw_title': 'السحب',
      'withdraw_details': 'تفاصيل السحب',
      'withdraw_history': 'سجل السحوبات',
      'withdraw_records': 'سجلات السحب',
      'withdraw_amount_placeholder': 'أدخل مبلغ السحب (الحد الأدنى 700)',
      'withdraw_amount_label': 'مبلغ السحب',
      'actual_arrival': 'المبلغ الفعلي المستلم',
      'handling_fee': 'الرسوم (18%)',
      'bkash_number': 'رقم بكاش (bKash)',
      'bkash_setup': 'إعداد بكاش',
      'confirm_withdraw': 'تأكيد السحب',
      'payment_method': 'طريقة الدفع',

      // Tasks
      'all_tasks': 'الكل',
      'doing_tasks': 'قيد التنفيذ',
      'review_tasks': 'المراجعة',
      'done_tasks': 'مكتملة',
      'open_task': 'فتح المهمة',
      'submit_task': 'إرسال المهمة',
      'reward': 'المكافأة:',
      'start_task': 'بدء المهمة',
      'task_reward_per': 'دخل كل مهمة',

      // VIP / Packages
      'vip_hall': 'قاعة VIP',
      'packages_benefits': 'الباقات والمزايا',
      'price': 'السعر:',
      'daily_income': 'الدخل اليومي:',
      'buy_now': 'شراء الآن',
      'join_now': 'انضم الآن',
      'current_tier': 'المستوى الحالي',
      'task_count': 'عدد المهام',

      // Personal
      'avatar': 'الصورة الرمزية',
      'account_binding': 'ربط الحساب',
      'usdt_address': 'عنوان USDT',
      'set_now': 'تعيين'
    }
  };

  // Phrases to replace throughout the DOM (Bengali -> Target language)
  const phraseDictionary = {
    // Exact match replacements
    'আলো': { en: 'Alo', ar: 'ألو' },
    'প্রথম পাতা': { en: 'Home', ar: 'الرئيسية' },
    'হল': { en: 'Hall', ar: 'القاعة' },
    'সদস্য': { en: 'VIP', ar: 'الأعضاء' },
    'টাস্ক': { en: 'Tasks', ar: 'المهام' },
    'আমার': { en: 'Mine', ar: 'حسابي' },
    'লগইন': { en: 'Login', ar: 'تسجيل الدخول' },
    'অ্যাকাউন্ট খুলুন': { en: 'Sign Up', ar: 'إنشاء حساب' },
    'নিশ্চিতভাবে শুরু করুন': { en: 'Get Started Now', ar: 'ابدأ بثقة الآن' },
    'আমার অ্যাকাউন্ট আছে': { en: 'I Have an Account', ar: 'لدي حساب بالفعل' },
    'সহজ, স্বচ্ছ এবং আপনার জন্য তৈরি': { en: 'Simple, transparent, and built for you', ar: 'بسيط وشفاف ومصمم لك' },
    'স্বাগতম কার্ড': { en: 'Welcome Card', ar: 'بطاقة الترحيب' },
    'আপনার স্পেস': { en: 'Your Space', ar: 'مساحتك' },
    'শুরু হোক আজই': { en: 'Start Today', ar: 'ابدأ اليوم' },
    'দ্রুত অ্যাক্সেস': { en: 'Quick Access', ar: 'وصول سريع' },
    'যেকোনো সময়, যেকোনো জায়গায়': { en: 'Anytime, Anywhere', ar: 'في أي وقت وفي أي مكان' },
    'আপনার মতো করে': { en: 'Your Own Way', ar: 'على طريقتك' },
    'সহজ ও আরামদায়ক অভিজ্ঞতা': { en: 'Smooth & Comfortable Experience', ar: 'تجربة مريحة وسلسة' },
    'আপনার প্রতিটি শুরু হোক সুন্দর': { en: 'May every beginning bring you prosperity', ar: 'نتمنى لك بداية ملؤها النجاح' },
    'আপনার নতুন শুরু এখানেই': { en: 'Your fresh start begins here', ar: 'بدايتك الجديدة تبدأ هنا' },
    'প্রতিদিনের কাজে আনুন PW New Media': { en: 'Bring Fresh Light to Your Daily Earnings', ar: 'أضف نورًا جديدًا لأرباحك اليومية' },
    'আপনার ব্যক্তিগত স্পেসে স্বাগতম': { en: 'Welcome to your personal space', ar: 'مرحبًا بك في مساحتك الخاصة' },

    // Login page
    'আবার স্বাগতম': { en: 'Welcome Back', ar: 'مرحبًا بك مجددًا' },
    'আপনার অ্যাকাউন্টে লগইন করুন': { en: 'Sign In to Your Account', ar: 'تسجيل الدخول إلى حسابك' },
    'আপনার তথ্য দিয়ে লগইন করে যেখানে থেমেছিলেন, সেখান থেকেই শুরু করুন।': { en: 'Enter your credentials to continue right where you left off.', ar: 'أدخل بياناتك للمتابعة من حيث توقفت.' },
    'ফোন নম্বর': { en: 'Phone Number', ar: 'رقم الهاتف' },
    'পাসওয়ার্ড': { en: 'Password', ar: 'كلمة المرور' },
    'পাসওয়ার্ড ভুলে গেছেন?': { en: 'Forgot Password?', ar: 'نسيت كلمة المرور؟' },
    'আমাকে লগইন অবস্থায় রাখুন': { en: 'Keep me logged in', ar: 'تذكرني على هذا الجهاز' },
    'লগইন করুন': { en: 'Log In', ar: 'تسجيل الدخول' },
    'ডেমো অ্যাকাউন্ট দিয়ে দ্রুত প্রবেশ': { en: 'Quick Access with Demo Account', ar: 'دخول سريع بحساب تجريبي' },
    'নতুন এখানে?': { en: 'New here?', ar: 'جديد هنا؟' },
    'নতুন অ্যাকাউন্ট তৈরি করুন': { en: 'Create New Account', ar: 'إنشاء حساب جديد' },
    'হোমপেজে ফিরে যান': { en: 'Back to Homepage', ar: 'العودة للصفحة الرئيسية' },
    'লগইন সফল!': { en: 'Login Successful!', ar: 'تم تسجيل الدخول بنجاح!' },
    'স্বর্ণের খনিতে স্বাগতম': { en: 'Welcome to Gold Mine', ar: 'مرحبًا بك في منجم الذهب' },
    'দেখুন': { en: 'Show', ar: 'عرض' },

    // Register page
    'আপনার নির্ভরযোগ্য ডিজিটাল আয়ের প্ল্যাটফর্ম': { en: 'Your Trusted Digital Income Platform', ar: 'منصتك الرقمية الموثوقة للدخل' },
    'এসএমএস যাচাইকরণ কোড': { en: 'SMS Verification Code', ar: 'رمز التحقق عبر SMS' },
    'যাচাইকরণ কোড পাঠান': { en: 'Send Code', ar: 'إرسال الرمز' },
    'পাসওয়ার্ড নিশ্চিত করুন': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور' },
    'আমন্ত্রণ কোড': { en: 'Invitation Code', ar: 'رمز الدعوة' },
    'এখন সাইইন আপ করুন': { en: 'Sign Up Now', ar: 'سجل الآن' },
    'আগে থেকেই অ্যাকাউন্ট আছে?': { en: 'Already have an account?', ar: 'هل لديك حساب بالفعل؟' },
    'নিবন্ধন সফল!': { en: 'Registration Successful!', ar: 'تم التسجيل بنجاح!' },

    // Profile & Pass
    'আমার উচ্চতর:': { en: 'Superior:', ar: 'المعرف الأعلى:' },
    'হিসাব নাম্বার:': { en: 'Account:', ar: 'رقم الحساب:' },
    'আমন্ত্রণ কোড:': { en: 'Invite Code:', ar: 'رمز الدعوة:' },
    'সাইন আউট': { en: 'Sign Out', ar: 'تسجيل الخروج' },
    'আমার পাস': { en: 'My Pass', ar: 'بطاقتي' },
    'প্রত্যাহার': { en: 'Withdraw', ar: 'سحب' },
    'জমা': { en: 'Deposit', ar: 'إيداع' },
    'দলের রিপোর্ট': { en: 'Team Report', ar: 'تقرير الفريق' },
    'ব্যক্তিগত তথ্য': { en: 'Personal Info', ar: 'المعلومات الشخصية' },
    'কাজের রেকর্ড': { en: 'Task Records', ar: 'سجل المهام' },
    'গ্রাহক সেবা': { en: 'Support', ar: 'خدمة العملاء' },
    'শেয়ার করুন': { en: 'Share', ar: 'مشاركة' },
    'আজকের মোট আয়:': { en: "Today's Income:", ar: 'إجمالي دخل اليوم:' },
    'আজকের কাজ আয়:': { en: 'Task Income:', ar: 'دخل المهام اليوم:' },
    'মোট রাজস্ব': { en: 'Total Revenue', ar: 'إجمالي الإيرادات' },
    'অসম্পূর্ণ মিশন': { en: 'Incomplete Tasks', ar: 'المهام غير المكتملة' },
    'সম্পন্ন মিশন': { en: 'Completed Tasks', ar: 'المهام المكتملة' },
    'হিমায়িত': { en: 'Frozen', ar: 'المجمد' },
    'উপলব্ধ ব্যালেন্স': { en: 'Available Balance', ar: 'الرصيد المتاح' },
    'মোট ব্যালেন্স': { en: 'Total Balance', ar: 'الرصيد الإجمالي' },

    // Team Report Panel
    'মোট দলের ভারসাম্য(BDT)': { en: 'Team Balance (BDT)', ar: 'رصيد الفريق (BDT)' },
    'মোট দলের প্রবাহ(BDT)': { en: 'Team Flow (BDT)', ar: 'تدفق الفريق (BDT)' },
    'মোট রিচার্জ(BDT)': { en: 'Total Recharge (BDT)', ar: 'إجمالي شحن الفريق (BDT)' },
    'মোট নগদ আউট(BDT)': { en: 'Total Cashout (BDT)', ar: 'إجمالي سحب الفريق (BDT)' },
    'প্রথম চার্জের সংখ্যা': { en: 'First Deposits', ar: 'مرات الشحن الأول' },
    'সরাসরি ধাক্কা নম্বর': { en: 'Direct Referrals (Tier 1)', ar: 'الدعوات المباشرة (المستوى 1)' },
    'দলের মোট আকার': { en: 'Total Team Size', ar: 'إجمالي حجم الفريق' },
    'নতুন দল নম্বর': { en: 'New Members (24h)', ar: 'الأعضاء الجدد (24 ساعة)' },
    'আমার দল': { en: 'My Team', ar: 'فريقي' },
    'স্তর 1': { en: 'Tier 1', ar: 'المستوى 1' },
    'স্তর 2': { en: 'Tier 2', ar: 'المستوى 2' },
    'স্তর 3': { en: 'Tier 3', ar: 'المستوى 3' },
    'স্তর ১ (সরাসরি)': { en: 'Tier 1 (Direct)', ar: 'المستوى 1 (مباشر)' },
    'স্তর ১': { en: 'Tier 1', ar: 'المستوى 1' },
    'স্তর ২': { en: 'Tier 2', ar: 'المستوى 2' },
    'স্তর ৩': { en: 'Tier 3', ar: 'المستوى 3' },
    'মোট মানুষ': { en: 'Members', ar: 'إجمالي الأعضاء' },
    'রিচার্জ পরিমাণ': { en: 'Recharge Amount', ar: 'مبلغ الشحن' },
    'রিবেট': { en: 'Rebate', ar: 'العمولة المستردة' },
    '১০% রিবেট': { en: '10% Rebate', ar: 'عمولة 10%' },
    '৫% রিবেট': { en: '5% Rebate', ar: 'عمولة 5%' },
    '২% রিবেট': { en: '2% Rebate', ar: 'عمولة 2%' },
    'স্তর ১ কমিশন (সরাসরি):': { en: 'Tier 1 Commission (Direct):', ar: 'عمولة المستوى 1 (مباشر):' },
    'স্তর ২ কমিশন:': { en: 'Tier 2 Commission:', ar: 'عمولة المستوى 2:' },
    'স্তর ৩ কমিশন:': { en: 'Tier 3 Commission:', ar: 'عمولة المستوى 3:' },
    'কোড কপি': { en: 'Copy Code', ar: 'نسخ الرمز' },
    'আমন্ত্রণ পেজ': { en: 'Invite Page', ar: 'صفحة الدعوة' },
    'আপনার আমন্ত্রণ কোড:': { en: 'Your Invite Code:', ar: 'رمز دعوتك:' },
    'প্যাকেজ': { en: 'Package', ar: 'الباقة' },
    'ব্যালেন্স': { en: 'Balance', ar: 'الرصيد' },
    'রিচার্জ': { en: 'Recharge', ar: 'الشحن' },
    'যুক্ত:': { en: 'Joined:', ar: 'انضم في:' },
    'সদস্য তালিকা': { en: 'Member List', ar: 'قائمة الأعضاء' },
    'রিয়েল ডাটা': { en: 'Real Data', ar: 'بيانات حقيقية' },

    // Tasks & VIP
    'সমস্ত': { en: 'All', ar: 'الكل' },
    'চলমান': { en: 'Doing', ar: 'قيد التنفيذ' },
    'পর্যালোচনা': { en: 'Review', ar: 'المراجعة' },
    'সম্পন্ন': { en: 'Completed', ar: 'مكتملة' },
    'কাজ খুলুন': { en: 'Open Task', ar: 'فتح المهمة' },
    'জমা দিন': { en: 'Submit', ar: 'إرسال' },
    'পুরস্কার:': { en: 'Reward:', ar: 'المكافأة:' },
    'এখনই যোগ দিন': { en: 'Join Now', ar: 'انضم الآن' },
    'বর্তমান স্তর': { en: 'Current Tier', ar: 'المستوى الحالي' },
    'দৈনিক আয়:': { en: 'Daily Income:', ar: 'الدخل اليومي:' },
    'মূল্য:': { en: 'Price:', ar: 'السعر:' },
    'ক্রয় করুন': { en: 'Buy Now', ar: 'شراء الآن' },

    // Withdrawal & bKash
    'উত্তোলন বিবরণ': { en: 'Withdrawal Details', ar: 'تفاصيل السحب' },
    'উত্তোলনের ইতিহাস': { en: 'Withdrawal History', ar: 'سجل السحوبات' },
    'উত্তোলনের রেকর্ড': { en: 'Withdrawal Records', ar: 'سجلات السحب' },
    'প্রকৃত প্রাপ্তি': { en: 'Actual Received', ar: 'المبلغ الفعلي المستلم' },
    'ফি (18%)': { en: 'Fee (18%)', ar: 'الرسوم (18%)' },
    'বিকাশ সেটআপ': { en: 'bKash Setup', ar: 'إعداد بكاش' },
    'উত্তোলন নিশ্চিত করুন': { en: 'Confirm Withdrawal', ar: 'تأكيد السحب' },
    'অর্থপ্রদানের পদ্ধতি': { en: 'Payment Method', ar: 'طريقة الدفع' },

    // Personal Info
    'অবতার': { en: 'Avatar', ar: 'الصورة الرمزية' },
    'অ্যাকাউন্ট বাঁধাই': { en: 'Account Binding', ar: 'ربط الحساب' },
    'USDT ঠিকানা': { en: 'USDT Address', ar: 'عنوان USDT' },
    'USDT (BEP20)': { en: 'USDT (BEP20)', ar: 'USDT (BEP20)' },
    'USDT অ্যাকাউন্ট': { en: 'USDT Account', ar: 'حساب USDT' },
    'USDT সেট নেই': { en: 'USDT Not Bound', ar: 'لم يتم ربط USDT' },
    'BEP20 ADREES': { en: 'BEP20 ADDRESS', ar: 'عنوان BEP20' },
    'BEP20 ওয়ালেট ঠিকানা লিখুন (0x...)': { en: 'Enter BEP20 wallet address (0x...)', ar: 'أدخل عنوان محفظة BEP20 (0x...)' },
    'সেট করুন': { en: 'Set Up', ar: 'تعيين' },

    'নগদ অ্যাকাউন্ট': { en: 'Nagad Account', ar: 'حساب نقود' },
    'নগদ সেট নেই': { en: 'Nagad Not Bound', ar: 'لم يتم ربط نقود' },
    'নগদ সেট করুন': { en: 'Bind Nagad', ar: 'تعيين نقود' },
    'নগদ ওয়ালেট বাঁধাই': { en: 'Bind Nagad Wallet', ar: 'ربط محفظة نقود' },
    '✓ নগদ সেট করা আছে': { en: '✓ Nagad Bound', ar: '✓ تم ربط نقود' },
    'নগদ সেট করা আছে': { en: 'Nagad Bound', ar: 'تم ربط نقود' },
    'আপনার নগদ নম্বর লিখুন': { en: 'Enter your Nagad number', ar: 'أدخل رقم نقود الخاص بك' },
    'সঠিক নগদ মোবাইল ব্যাংক নম্বর লিখুন': { en: 'Please enter a valid Nagad mobile banking number', ar: 'يرجى إدخال رقم نقود صحيح' },
    'নগদ সফলভাবে সেট করা হয়েছে': { en: 'Nagad bound successfully!', ar: 'تم ربط نقود بنجاح!' },
    '⚠️ উত্তোলন করার পূর্বে নগদ সেট করতে হবে': { en: '⚠️ Please bind Nagad before withdrawal', ar: '⚠️ يرجى ربط نقود قبل السحب' },


    "আপনার নির্ভরযোগ্য ডিজিটাল আর্নিং ও মিশন প্ল্যাটফর্ম": { en: "Your Trusted Digital Earning & Mission Platform", ar: "منصتك الموثوقة للأرباح والمهام الرقمية" },
    "আপনার নির্ভরযোগ্য প্ল্যাটফর্ম": { en: "Your Trusted Platform", ar: "منصتك الموثوقة" },
    "প্রধান নেভিগেশন": { en: "Main Navigation", ar: "التنقل الرئيسي" },
    "ভাষা নির্বাচন": { en: "Select Language", ar: "اختيار اللغة" },
    "বাংলা": { en: "Bengali", ar: "البنغالية" },
    "আপনার ব্যক্তিগত স্পেসে স্বাগতম। সহজে অ্যাকাউন্ট তৈরি করুন, নিরাপদে লগইন করুন, আর শুরু করুন আপনার পরবর্তী অধ্যায়।": { en: "Welcome to your personal space. Create an account easily, log in securely, and start your next chapter.", ar: "مرحبًا بك في مساحتك الخاصة. أنشئ حسابًا بسهولة وسجل الدخول بأمان وابدأ رحلتك." },
    "সহজ, স্বচ্ছ এবং আপনার জন্য তৈরি।": { en: "Simple, transparent, and built for you.", ar: "بسيط وشفاف ومصمم خصيصًا لك." },
    "২০২৫": { en: "2025", ar: "2025" },
    "২০২৬": { en: "2026", ar: "2026" },
    "আপনার প্রতিটি শুরু হোক সুন্দর।": { en: "May all your beginnings be prosperous.", ar: "نتمنى لك بداية ملؤها النجاح والتوفيق." },
    "পাসওয়ার্ড পুনরুদ্ধার এখানে চালু নেই।": { en: "Password reset is not available here.", ar: "استعادة كلمة المرور غير متوفرة هنا." },
    "আপনার জন্য রাখা সবকিছু, এক জায়গায়।": { en: "Everything reserved for you, all in one place.", ar: "كل ما تحتاجه في مكان واحد." },
    "আপনার ব্যক্তিগত স্পেসে আবার ফিরে আসুন। নিরাপদে লগইন করে আপনার কাজ এগিয়ে নিন।": { en: "Welcome back to your personal space. Log in securely and proceed with your tasks.", ar: "مرحبًا بعودتك إلى مساحتك الخاصة. سجل الدخول بأمان وتابع مهامك." },
    "একটি ভালো শুরু প্রতিদিনকে বদলে দিতে পারে।": { en: "A great beginning can transform every day.", ar: "البداية الرائعة تصنع فارقًا في كل يوم." },
    "আপনার পথ": { en: "Your Journey", ar: "مسارك" },
    "নিবন্ধন স্বাগতম": { en: "Welcome to Registration", ar: "أهلاً بك في التسجيل" },
    "আপনার অ্যাকাউন্ট তৈরি করতে তথ্য দিন": { en: "Enter details to create your account", ar: "أدخل البيانات لإنشاء حسابك" },
    "পাসওয়ার্ড দেখান": { en: "Show Password", ar: "إظهار كلمة المرور" },
    "পাসওয়ার্ড লুকান": { en: "Hide Password", ar: "إخفاء كلمة المرور" },
    "ড্যাশবোর্ড": { en: "Dashboard", ar: "لوحة التحكم" },
    "আমার প্রোফাইল": { en: "My Profile", ar: "ملفي الشخصي" },
    "আমার উচ্চতর:": { en: "My Superior:", ar: "مشرفي المباشر:" },
    "আমার উচ্চতর": { en: "My Superior", ar: "مشرفي المباشر" },
    "সাপোর্ট চ্যাট": { en: "Support Chat", ar: "محادثة الدعم" },
    "অনলাইন গ্রাহক সেবা সহায়তা শীঘ্রই চালু হবে।": { en: "Online customer service support is coming soon.", ar: "خدمة العملاء عبر الإنترنت ستتوفر قريبًا." },
    "হিসাব নাম্বার, আমন্ত্রণ কোড, সাইন আউট": { en: "Account Number, Invite Code, Sign Out", ar: "رقم الحساب، رمز الدعوة، تسجيل الخروج" },
    "প্রোফাইল অ্যাভাটার": { en: "Profile Avatar", ar: "الصورة الرمزية" },
    "লগআউট": { en: "Log Out", ar: "تسجيل الخروج" },
    "ভারসাম্য:": { en: "Balance:", ar: "الرصيد:" },
    "ভারসাম্য": { en: "Balance", ar: "الرصيد" },
    "আমার পার্স": { en: "My Wallet", ar: "محفظتي" },
    "শিরোনাম": { en: "Title", ar: "العنوان" },
    "সীমা": { en: "Limit", ar: "الحد" },
    "ভাল": { en: "Good", ar: "جيد" },
    "চমৎকার": { en: "Excellent", ar: "ممتاز" },
    "ব্যক্তিগত ভারসাম্য": { en: "Personal Balance", ar: "الرصيد الشخصي" },
    "গতকালের উপার্জন": { en: "Yesterday Earnings", ar: "أرباح الأمس" },
    "আজ উপার্জন": { en: "Today Earnings", ar: "أرباح اليوم" },
    "এই সপ্তাহে আয়": { en: "This Week Earnings", ar: "أرباح هذا الأسبوع" },
    "এই মাসে আয়": { en: "This Month Earnings", ar: "أرباح هذا الشهر" },
    "গত মাসে আয়": { en: "Last Month Earnings", ar: "أرباح الشهر الماضي" },
    "মোট রাজস্ব": { en: "Total Revenue", ar: "إجمالي الإيرادات" },
    "কাজটি আজই সম্পূর্ণ করুন": { en: "Complete tasks today", ar: "أكمل المهام اليوم" },
    "আজকের জন্য বাকি কাজ": { en: "Remaining tasks for today", ar: "المهام المتبقية لليوم" },
    "অ্যাপ ডাউনলোডের সুবিধা শীঘ্রই আসবে।": { en: "App download feature is coming soon.", ar: "تنزيل التطبيق سيتوفر قريبًا." },
    "ডাউনলোড": { en: "Download", ar: "تنزيل" },
    "দৈনিক বিবৃতি": { en: "Daily Statement", ar: "التقرير اليومي" },
    "অ্যাকাউন্ট পরিবর্তনের রেকর্ড এখানে উপলভ্য নয়।": { en: "Account change history is not available here.", ar: "سجل تغيير الحساب غير متوفر هنا." },
    "অ্যাকাউন্ট পরিবর্তন রেকর্ড": { en: "Account Change Record", ar: "سجل تغيير الحساب" },
    "বন্ধুকে আমন্ত্রণ জানান": { en: "Invite Friends", ar: "دعوة الأصدقاء" },
    "আরও সেবা": { en: "More Services", ar: "خدمات إضافية" },
    "সঞ্চয় পরিকল্পনার বিস্তারিত এখানে উপলভ্য নয়।": { en: "Savings plan details are not available here.", ar: "تفاصيل خطة الادخار غير متوفرة هنا." },
    "সঞ্চয় পরিকল্পনা": { en: "Savings Plan", ar: "خطة الادخار" },
    "টেলিগ্রাম সহায়তার লিংক এখানে যুক্ত করা হয়নি।": { en: "Telegram support link is not configured.", ar: "رابط دعم تيليجرام غير مضاف هنا." },
    "টেলিগ্রাম": { en: "Telegram", ar: "تيليجرام" },
    "নিরাপত্তা কেন্দ্রের সুবিধা এখানে চালু নেই।": { en: "Security Center feature is not active.", ar: "مركز الأمان غير مفعل هنا." },
    "নিরাপত্তা কেন্দ্র": { en: "Security Center", ar: "مركز الأمان" },
    "ভাগ্যবান স্পিনের সুবিধা এখানে চালু নেই।": { en: "Lucky Spin feature is not active.", ar: "عجلة الحظ غير مفعلة هنا." },
    "ভাগ্যবান স্পিন": { en: "Lucky Spin", ar: "عجلة الحظ" },
    "স্বাগতম": { en: "Welcome", ar: "مرحبًا" },
    "আপনার আগ্রহের জগৎ": { en: "Your World of Interest", ar: "عالم اهتماماتك" },
    "শুরু হোক এখান থেকে": { en: "Start from here", ar: "ابدأ من هنا" },
    "নতুন মিশন দেখুন, শিখুন এবং প্রতিদিন এগিয়ে চলুন।": { en: "Explore new missions, learn, and grow every day.", ar: "استكشف مهام جديدة وتعلم وتقدم كل يوم." },
    "আলোকময় সৃজনশীলতার স্লাইডার": { en: "Creative Media Slider", ar: "سلايدر الوسائط الإبداعي" },
    "নতুন সম্ভাবনার শুরু": { en: "Beginning of New Opportunities", ar: "بداية فرص جديدة" },
    "শিখুন, এগিয়ে চলুন": { en: "Learn and Proceed", ar: "تعلم وتقدم للأمام" },
    "প্রতিদিন এক ধাপ সামনে": { en: "One step forward every day", ar: "خطوة للأمام كل يوم" },
    "দলের প্রসার সম্পর্কিত নমুনা আপডেট": { en: "Sample team growth updates", ar: "تحديثات نمو الفريق" },
    "একজন ব্যবহারকারীকে সুপারিশ করার জন্য": { en: "for recommending a user", ar: "لتوصية مستخدم جديد" },
    "প্রচার পুরস্কার পাওয়ার জন্য অভিনন্দন": { en: "Congratulations on receiving promotion reward", ar: "تهانينا بالحصول على مكافأة الترويج" },
    "এলাকা": { en: "Region", ar: "المنطقة" },
      "আয়ের": { en: "Income", ar: "الدخل" },
    "ম্যানেজার": { en: "Manager", ar: "المدير" },
    "অফিসিয়াল কাস্টমার ম্যানেজার": { en: "Official Customer Manager", ar: "مدير العملاء الرسمي" },
    "মিশন হল": { en: "Mission Hall", ar: "قاعة المهام" },
    "সামাজিক মিশন": { en: "Social Missions", ar: "المهام الاجتماعية" },
    "লাইক ও অনুসরণ": { en: "Like & Follow", ar: "إعجاب ومتابعة" },
    "সদস্যদের আপডেট": { en: "Member Updates", ar: "تحديثات الأعضاء" },
    "সাম্প্রতিক সদস্য আপডেট": { en: "Recent Member Updates", ar: "آخر تحديثات الأعضاء" },
    "আজ ৩টি মিশন সম্পন্ন করেছেন": { en: "Completed 3 missions today", ar: "أكمل 3 مهام اليوم" },
    "আজ ২টি মিশন সম্পন্ন করেছেন": { en: "Completed 2 missions today", ar: "أكمل مهمتين اليوم" },
    "আজ ৪টি মিশন সম্পন্ন করেছেন": { en: "Completed 4 missions today", ar: "أكمل 4 مهام اليوم" },
    "হল প্যাকেজ": { en: "Hall Packages", ar: "باقات القاعة" },
    "কাজের তালিকা খুলুন": { en: "Open Task List", ar: "فتح قائمة المهام" },
    "দৈনিক কর্ম:": { en: "Daily Tasks:", ar: "المهام اليومية:" },
    "দৈনিক কর্ম": { en: "Daily Tasks", ar: "المهام اليومية" },
    "হল সম্পর্কে তথ্য": { en: "Information About Hall", ar: "معلومات عن القاعة" },
    "আপনার অগ্রগতির পরবর্তী ধাপ": { en: "Your next level of progression", ar: "خطوتك القادمة للتقدم" },
    "ফ্রিতে শুধু": { en: "In Free trial only", ar: "في التجربة المجانية فقط" },
    "কাজ করতে পারবেন। বাকি কাজ করতে গেলে আপনার ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করতে হবে।": { en: "tasks can be completed. To perform remaining tasks, please purchase a package with your balance.", ar: "مهام متاحة. لإكمال باقي المهام يرجى شراء باقة برصيدك." },
    "সব ব্যালেন্স ও পুরস্কার ভার্চুয়াল ডেমো হিসাব": { en: "All balances and rewards are platform earnings", ar: "جميع الأرصدة والمكافآت هي أرباح داخل المنصة" },
    "বাস্তব টাকা নয়।": { en: "subject to policy verification.", ar: "وفق شروط الاستخدام." },
    "বন্ধুদের আমন্ত্রণ": { en: "Invite Friends", ar: "دعوة الأصدقاء" },
    "বন্ধুদের আমন্ত্রণ করুন,": { en: "Invite friends,", ar: "ادعُ أصدقاءك،" },
    "স্বর্ণের খনি জিতুন": { en: "Unlock Wealth Rewards", ar: "اربح مكافآت قيمة" },
    "আপনার আমন্ত্রণ কোডটি বন্ধুদের সঙ্গে শেয়ার করুন।": { en: "Share your invitation code with friends.", ar: "شارك رمز دعوتك مع الأصدقاء." },
    "কোড স্ক্যান করে তারা যোগ দিতে পারবে।": { en: "They can join easily by scanning this code.", ar: "يمكنهم الانضمام بمسح الرمز." },
    "কোড তৈরি হচ্ছে": { en: "Generating code...", ar: "جارٍ توليد الرمز..." },
    "আপনার আমন্ত্রণ লিংক": { en: "Your Invitation Link", ar: "رابط دعوتك الشخصي" },
    "লিংক কপি করুন": { en: "Copy Link", ar: "نسخ الرابط" },
    "বরফে পরিণত করা:": { en: "Frozen:", ar: "المجمد:" },
    "বরফে পরিণত করা": { en: "Frozen Balance", ar: "الرصيد المجمد" },
    "উপলব্ধ:": { en: "Available:", ar: "المتاح:" },
    "উপলব্ধ": { en: "Available", ar: "المتاح" },
    "রিচার্জ": { en: "Recharge", ar: "شحن" },
    "প্রত্যাহার": { en: "Withdrawal", ar: "سحب" },
    "লাভ শেয়ারিং": { en: "Profit Sharing", ar: "مشاركة الأرباح" },
    "অনুপাত": { en: "Ratio", ar: "النسبة" },
    "আগমন": { en: "Arrival", ar: "الوصول" },
    "স্থানান্তরিত": { en: "Transferred", ar: "تم التحويل" },
    "কোন রেকর্ড নেই": { en: "No records found", ar: "لا توجد سجلات" },
    "বন্ধ করুন": { en: "Close", ar: "إغلاق" },
    "প্রত্যাহার পদ্ধতি": { en: "Withdrawal Method", ar: "طريقة السحب" },
    "বিকাশ সেট নেই": { en: "bKash Not Bound", ar: "لم يتم ربط بيكاش" },
    "তোলা টাকার পরিমাণ": { en: "Withdrawal Amount", ar: "مبلغ السحب" },
    "তোলা টাকার": { en: "Withdrawal", ar: "السحب" },
    "প্রত্যাহার পরিমাণ লিখুন দয়া করে": { en: "Please enter withdrawal amount", ar: "يرجى إدخال مبلغ السحب" },
    "ফান্ড পাসওয়ার্ড": { en: "Fund Password", ar: "كلمة مرور المعاملات" },
    "অনুগ্রহ করে ফান্ডের পাসওয়ার্ড লিখুন": { en: "Please enter your fund password", ar: "يرجى إدخال كلمة مرور المعاملات" },
    "মাসিক উত্তোলন": { en: "Monthly Withdrawal", ar: "السحب الشهري" },
    "উত্তোলন 48-96 ঘণ্টার মধ্যে আসে": { en: "Withdrawal arrives within 48-96 hours", ar: "يصل السحب خلال 48-96 ساعة" },
    "প্রত্যাহার 12 ঘণ্টার মধ্যে আসে": { en: "Withdrawal arrives within 12 hours", ar: "يصل السحب خلال 12 ساعة" },
    "জমা": { en: "Deposit", ar: "إيداع" },
    "বাতিল করুন": { en: "Cancel", ar: "إلغاء" },
    "নিশ্চিত করুন": { en: "Confirm", ar: "تأكيد" },
    "পছন্দ কর": { en: "Choose", ar: "اختر" },
    "সেট না": { en: "Not Set", ar: "غير محدد" },
    "সহায়তা সেবা এখানে চালু নেই।": { en: "Help service is not active.", ar: "خدمة المساعدة غير مفعلة." },
    "সহায়তা": { en: "Support", ar: "الدعم" },
    "প্রোফাইল ছবি পরিবর্তনের সুবিধা এখানে চালু নেই।": { en: "Changing profile avatar is currently disabled.", ar: "تغيير الصورة الرمزية غير مفعل حاليًا." },
    "অ্যাকাউন্ট বাঁধাই এখানে চালু নেই।": { en: "Account binding is currently disabled.", ar: "ربط الحساب غير مفعل حاليًا." },
    "ঠিকানা যোগ করার সুবিধা এখানে চালু নেই।": { en: "Adding address is currently disabled.", ar: "إضافة العنوان غير مفعلة حاليًا." },
    "বিকাশ অ্যাকাউন্ট": { en: "bKash Account", ar: "حساب بيكاش" },
    "প্রবেশের গুপ্তসংকেত পরিবর্তনের সুবিধা এখানে চালু নেই।": { en: "Password modification is currently disabled.", ar: "تعديل كلمة المرور غير مفعل حاليًا." },
    "প্রবেশের গুপ্তসংকেত": { en: "Login Password", ar: "كلمة مرور الدخول" },
    "ফান্ড পাসওয়ার্ড সেট করার সুবিধা এখানে চালু নেই।": { en: "Fund password setup is currently disabled.", ar: "إعداد كلمة مرور الصندوق غير مفعل حاليًا." },
    "বিকাশ সেট করুন": { en: "Bind bKash", ar: "تعيين بيكاش" },
    "সহায়তা সেবা শীঘ্রই চালু হবে।": { en: "Support service will be available shortly.", ar: "خدمة الدعم ستتوفر قريبًا." },
    "বিকাশ ওয়ালেট বাঁধাই": { en: "Bind bKash Wallet", ar: "ربط محفظة بيكاش" },
    "মোবাইল ব্যাংকিং উত্তোলন অ্যাকাউন্ট": { en: "Mobile Banking Withdrawal Account", ar: "حساب سحب الخدمات المصرفية عبر الهاتف" },
    "সম্পুর্ন নাম": { en: "Full Name", ar: "الاسم الكامل" },
    "আবশ্যক": { en: "Required", ar: "مطلوب" },
    "আপনার সম্পূর্ণ নাম লিখুন": { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
    "মোবাইল ব্যাংক নাম্বার": { en: "Mobile Banking Number", ar: "رقم الحساب المصرفي" },
    "আপনার বিকাশ নম্বর লিখুন": { en: "Enter your bKash number", ar: "أدخل رقم بيكاش الخاص بك" },
    "USDT অ্যাকাউন্ট (BEP20)": { en: "USDT Account (BEP20)", ar: "حساب USDT (BEP20)" },
    "BEP20 ADREES": { en: "BEP20 ADDRESS", ar: "عنوان BEP20" },
    "USDT সেট নেই": { en: "USDT Not Set", ar: "لم يتم تعيين USDT" },
    "গুরুত্বপূর্ণ নির্দেশনা:": { en: "Important Instructions:", ar: "تعليمات هامة:" },
    "অনুগ্রহ করে নিশ্চিত করুন যে আপনার সম্পুর্ন নাম এবং মোবাইল ব্যাংক নম্বর সঠিক।": { en: "Please ensure that your full name and mobile bank number are completely accurate.", ar: "يرجى التأكد من دقة الاسم الكامل ورقم الحساب." },
    "একটি বিকাশ নম্বর শুধুমাত্র একটি অ্যাকাউন্টের সাথে যুক্ত হতে পারে।": { en: "One bKash number can only be bound to a single account.", ar: "يمكن ربط رقم بيكاش واحد بحساب واحد فقط." },
    "টাকা প্রত্যাহারের সময় আপনার উপার্জিত অর্থ সরাসরি এই বিকাশ নম্বরে পৌঁছাবে।": { en: "During withdrawal, your funds will be sent directly to this verified bKash number.", ar: "عند السحب، سيتم إرسال أموالك مباشرة إلى هذا الرقم." },
    "প্যাকেজসমূহ": { en: "VIP Packages", ar: "باقات VIP" },
    "আপনার বর্তমান স্তর:": { en: "Your Current Tier:", ar: "مستواك الحالي:" },
    "উপলব্ধ ব্যালেন্স:": { en: "Available Balance:", ar: "الرصيد المتاح:" },
    "ব্যালেন্স রিচার্জ (জমা)": { en: "Recharge Balance (Deposit)", ar: "شحن الرصيد (إيداع)" },
    "রিচার্জের পরিমাণ নির্বাচন করুন:": { en: "Select Recharge Amount:", ar: "اختر مبلغ الشحن:" },
    "অথবা নির্দিষ্ট পরিমাণ": { en: "Or Specific Amount", ar: "أو مبلغ محدد" },
    "পেমেন্ট মেথড:": { en: "Payment Method:", ar: "طريقة الدفع:" },
    "বিকাশ": { en: "bKash", ar: "بيكاش" },
    "নগদ": { en: "Nagad", ar: "نقد" },
    "ক্রিপ্টো": { en: "Crypto (USDT)", ar: "العملات الرقمية" },
    "রিচার্জ সম্পন্ন করুন": { en: "Complete Recharge", ar: "إتمام الشحن" },
    "ফ্রি স্তর": { en: "Free Tier", ar: "المستوى المجاني" },
    "দৈনিক কাজ:": { en: "Daily Tasks:", ar: "المهام اليومية:" },
    "প্রতি কাজ:": { en: "Per Task:", ar: "لكل مهمة:" },
    "বেসিক প্যাকেজ": { en: "Basic Package", ar: "الباقة الأساسية" },
    "প্যাকেজ ক্রয় করুন": { en: "Purchase Package", ar: "شراء الباقة" },
    "প্যাকেজ ক্রয়": { en: "Buy Package", ar: "شراء الباقة" },
    "স্ট্যান্ডার্ড প্যাকেজ": { en: "Standard Package", ar: "الباقة القياسية" },
    "সিলভার প্যাকেজ": { en: "Silver Package", ar: "الباقة الفضية" },
    "গোল্ড প্যাকেজ": { en: "Gold Package", ar: "الباقة الذهبية" },
    "প্রিমিয়াম প্যাকেজ": { en: "Premium Package", ar: "الباقة المتميزة" },
    "এলিট প্যাকেজ": { en: "Elite Package", ar: "باقة النخبة" },
    "মিশন স্তর": { en: "Mission Tier", ar: "مستوى المهمة" },
    "কেটে দিন": { en: "Dismiss", ar: "إلغاء" },
    "আপনার বর্তমান প্যাকেজের জন্য উপলভ্য কাজ": { en: "Available tasks for your active package", ar: "المهام المتاحة لباقاتك الحالية" },
    "কাজের ধরন:": { en: "Task Type:", ar: "نوع المهمة:" },
    "অ্যাকাউন্ট অনুসরণ করুন": { en: "Follow Account", ar: "متابعة الحساب" },
    "স্তর:": { en: "Tier:", ar: "المستوى:" },
    "অগ্রগতি:": { en: "Progress:", ar: "التقدم:" },
    "দৈনিক পুরস্কার": { en: "Daily Reward", ar: "المكافأة اليومية" },
    "গ্রহণ": { en: "Receive / Claim", ar: "استلام" },
    "গ্রহণ করুন": { en: "Claim Now", ar: "استلم الآن" },
    "গৃহীত": { en: "Claimed", ar: "تم الاستلام" },
    "সরাসরি ব্যালেন্সে গ্রহণ করুন": { en: "Claim Directly to Balance", ar: "استلام مباشر إلى الرصيد" },
    "টিম": { en: "Team", ar: "الفريق" },
    "মোট কমিশন": { en: "Total Commission", ar: "إجمالي العمولة" },
    "আজকের কমিশন": { en: "Today's Commission", ar: "عمولة اليوم" },
    "টিম সদস্য": { en: "Team Members", ar: "أعضاء الفريق" },
    "আজ নতুন": { en: "New Today", ar: "الجدد اليوم" },
    "শেয়ার লিঙ্ক": { en: "Share Link", ar: "رابط المشاركة" },
    "বন্ধুদের স্ক্যান করতে আমন্ত্রণ করুন": { en: "Invite friends to scan", ar: "ادعُ الأصدقاء للمسح" },
    "কপি": { en: "Copy", ar: "نسخ" },
    "কাজের ধরন: একটি ভিডিওতে লাইক দিন": { en: "Task Type: Like a video", ar: "نوع المهمة: إعجاب بفيديو" },
    "প্রোফাইল দেখুন": { en: "View Profile", ar: "عرض الملف الشخصي" },
    "মিশন রেকর্ড": { en: "Mission Records", ar: "سجل المهام" },
    "মিশনের অবস্থা": { en: "Mission Status", ar: "حالة المهمة" },
    "ব্যর্থ হয়েছে": { en: "Failed", ar: "فشلت" },
    "মিশন বিবরণ": { en: "Mission Details", ar: "تفاصيل المهمة" },
    "মিশন তালিকায় ফিরে যান": { en: "Back to Missions List", ar: "العودة لقائمة المهام" },
    "চলমান": { en: "In Progress", ar: "جارية" },
    "টাস্ক শিরোনাম:": { en: "Task Title:", ar: "عنوان المهمة:" },
    "টাস্ক শিরোনাম": { en: "Task Title", ar: "عنوان المهمة" },
    "মিশন সুবিধা:": { en: "Mission Reward:", ar: "مكافأة المهمة:" },
    "মিশন সুবিধা": { en: "Mission Reward", ar: "مكافأة المهمة" },
    "মিশনের বিবরণ:": { en: "Mission Description:", ar: "وصف المهمة:" },
    "মিশনের বিবরণ": { en: "Mission Description", ar: "وصف المهمة" },
    "পছন্দ লক্ষ্য করা": { en: "Target Engagement", ar: "الهدف التفاعلي" },
    "টাস্ক লিঙ্ক:": { en: "Task Link:", ar: "رابط المهمة:" },
    "টাস্ক লিঙ্ক": { en: "Task Link", ar: "رابط المهمة" },
    "খোলা সংযুক্তি": { en: "Open Link", ar: "فتح الرابط" },
    "অনুলিপি": { en: "Copy", ar: "نسخ" },
    "সৃষ্টির সময়:": { en: "Created Time:", ar: "وقت الإنشاء:" },
    "সৃষ্টির সময়": { en: "Created Time", ar: "وقت الإنشاء" },
    "মন্তব্য": { en: "Comments", ar: "تعليقات" },
    "ক্যামেরা": { en: "Camera", ar: "الكاميرا" },
    "দয়া করে এখানে প্রবেশ করুন": { en: "Please enter details here", ar: "يرجى إدخال البيانات هنا" },
    "গ্যালারি খুলুন": { en: "Open Gallery", ar: "فتح المعرض" },
    "স্ক্রিনশট": { en: "Screenshot", ar: "لقطة شاشة" },
    "আপলোড": { en: "Upload", ar: "رفع" },
    "গ্যালারি থেকে স্ক্রিনশট আপলোড করুন": { en: "Upload screenshot verification from gallery", ar: "ارفع لقطة الشاشة من المعرض" },
    "স্ক্রিনশট মুছুন": { en: "Delete screenshot", ar: "حذف لقطة الشاشة" },
    "প্রিভিউ দেখুন": { en: "View Preview", ar: "معاينة" },
    "ছাড়": { en: "Rebate / Discount", ar: "الخصم / العمولة" },
    "দলের রিপোর্ট": { en: "Team Report", ar: "تقرير الفريق" },
    "মোট দল প্রবাহ": { en: "Total Team Turnover", ar: "إجمالي حركة الفريق" },
    "মোট দল রিচার্জ": { en: "Total Team Recharge", ar: "إجمالي شحن الفريق" },
    "দল মোট নগদ আউট": { en: "Total Team Cashout", ar: "إجمالي سحب الفريق" },
    "প্রথম চার্জের সংখ্যা": { en: "First Deposit Count", ar: "عدد الشحنات الأولى" },
    "দলের আকার": { en: "Team Size", ar: "حجم الفريق" },
    "নতুন মানুষ": { en: "New Members", ar: "أعضاء جدد" },
    "মোট মানুষ": { en: "Total Members", ar: "إجمالي الأعضاء" },
    "রিচার্জ পরিমাণ": { en: "Recharge Amount", ar: "مبلغ الشحن" },
    "রিচার্জ রিবেট": { en: "Recharge Rebate", ar: "عمولة الشحن" },
    "প্রধান মেনু": { en: "Main Menu", ar: "القائمة الرئيسية" },
    "স্ক্রিনশট প্রিভিউ": { en: "Screenshot Preview", ar: "معاينة لقطة الشاشة" },
    "সম্পূর্ণ স্ক্রিনশট": { en: "Full Screenshot", ar: "لقطة الشاشة كاملة" },
    "ঠিক আছে": { en: "OK", ar: "حسنا" },
    "বন্ধ করতে চাপুন": { en: "Tap to close", ar: "انقر للإغلاق" },
    "প্যাকেজ ও ব্যালেন্স ম্যানেজমেন্ট": { en: "Package & Balance Management", ar: "إدارة الباقات والرصيد" },
    "বাকি কাজের জন্য ব্যালেন্স প্রয়োজন": { en: "Balance is required for additional tasks", ar: "الرصيد مطلوب للمهام الإضافية" },
    "ব্যালেন্স রিচার্জ": { en: "Recharge Balance", ar: "شحن الرصيد" },
    "আপনার বর্তমান ব্যালেন্স:": { en: "Your Current Balance:", ar: "رصيدك الحالي:" },
    "প্যাকেজ মূল্য:": { en: "Package Price:", ar: "سعر الباقة:" },
    "ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করুন": { en: "Purchase Package with Balance", ar: "شراء الباقة من الرصيد" },
    "ব্যালেন্স রিচার্জ ট্যাবে যান": { en: "Go to Recharge Tab", ar: "الانتقال إلى تبويب الشحن" },
    "কেটে বন্ধ করুন": { en: "Close", ar: "إغلاق" },
    "বন্ধুদের আমন্ত্রণ করুন": { en: "Invite Friends", ar: "ادعُ أصدقاءك" },
    "মিশন জমা": { en: "Submit Mission", ar: "إرسال المهمة" },
    "কোড তৈরি করা যায়নি।": { en: "Failed to generate code.", ar: "تعذر إنشاء الرمز." },
    "আমন্ত্রণ কোড পেতে আগে লগইন করুন।": { en: "Please log in first to view invitation code.", ar: "يرجى تسجيل الدخول أولاً للحصول على رمز الدعوة." },
    "ডাটাবেজে তথ্য যাচাই করা হচ্ছে": { en: "Verifying credentials with database...", ar: "جارٍ التحقق من البيانات في قاعدة البيانات..." },
    "ফোন নম্বর অথবা পাসওয়ার্ড সঠিক নয়।": { en: "Phone number or password is incorrect.", ar: "رقم الهاتف أو كلمة المرور غير صحيحة." },
    "লগইন করা যায়নি। আবার চেষ্টা করুন।": { en: "Login failed. Please try again.", ar: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى." },
    "আপনার অ্যাকাউন্ট তৈরি হয়েছে": { en: "Your account has been created", ar: "تم إنشاء حسابك بنجاح" },
    "ডাটাবেজে সফলভাবে তৈরি হয়েছে।": { en: "successfully registered in database.", ar: "تم التسجيل بنجاح في قاعدة البيانات." },
    "দুটি পাসওয়ার্ড মিলছে না।": { en: "Passwords do not match.", ar: "كلمتا المرور غير متطابقتين." },
    "সঠিক বাংলাদেশি ফোন নম্বর লিখুন": { en: "Please enter a valid phone number", ar: "يرجى إدخال رقم هاتف صحيح" },
    "ডাটাবেজে নিবন্ধন যাচাই করা হচ্ছে": { en: "Verifying registration in database...", ar: "جارٍ التحقق من التسجيل..." },
    "এই নম্বরে আগে থেকেই অ্যাকাউন্ট আছে। লগইন পেজে যান।": { en: "An account already exists with this phone number. Please log in.", ar: "يوجد حساب مسجل بهذا الرقم بالفعل. يرجى تسجيل الدخول." },
    "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।": { en: "Failed to create account. Please try again.", ar: "تعذر إنشاء الحساب. حاول مرة أخرى." },
    "যাচাইকরণ কোড পেতে সঠিক ফোন নম্বর লিখুন": { en: "Please enter a valid phone number to receive verification code", ar: "أدخل رقم هاتف صحيح لاستلام رمز التحقق" },
    "যাচাইকরণ কোড পাঠানো হয়েছে:": { en: "Verification code sent:", ar: "تم إرسال رمز التحقق:" },
    "অনুগ্রহ করে রিচার্জের সঠিক পরিমাণ দিন।": { en: "Please enter a valid recharge amount.", ar: "يرجى إدخال مبلغ شحن صحيح." },
    "রিচার্জ সফল হয়েছে": { en: "Recharge successful!", ar: "تم الشحن بنجاح!" },
    "বর্তমান ব্যালেন্স:": { en: "Current Balance:", ar: "الرصيد الحالي:" },
    "পছন্দ": { en: "Selected", ar: "تم الاختيار" },
    "বিকাশ সেট করা আছে": { en: "bKash is bound", ar: "بيكاش مربوط بالفعل" },
    "তথ্য আপডেট করুন": { en: "Update Information", ar: "تحديث البيانات" },
    "অনুগ্রহ করে সম্পুর্ন নাম লিখুন": { en: "Please enter your full name", ar: "يرجى إدخال اسمك الكامل" },
    "অনুগ্রহ করে মোবাইল ব্যাংক নাম্বার লিখুন": { en: "Please enter your mobile banking account number", ar: "يرجى إدخال رقم حسابك" },
    "সঠিক বিকাশ মোবাইল ব্যাংক নম্বর লিখুন": { en: "Please enter a valid bKash number", ar: "يرجى إدخال رقم بيكاش صحيح" },
    "বিকাশ সফলভাবে সেট করা হয়েছে": { en: "bKash bound successfully!", ar: "تم ربط بيكاش بنجاح!" },
    "ভিডিও লাইক করুন ও সুন্দর মন্তব্য করুন": { en: "Like the video and leave a positive comment", ar: "سجل إعجابك بالفيديو واكتب تعليقًا إيجابيًا" },
    "নতুন ট্রেন্ডিং ভিডিও সম্পূর্ণ দেখে লাইক দিন": { en: "Watch new trending video completely and like", ar: "شاهد الفيديو الرائج بالكامل وسجل إعجابك" },
    "অফিশিয়াল ক্রিয়েটর অ্যাকাউন্ট ফলো করুন": { en: "Follow official creator account", ar: "تابع حساب المنشئ الرسمي" },
    "ক্রিয়েটরের প্রোফাইল ভিজিট করে ৩টি ভিডিওতে লাইক দিন": { en: "Visit creator profile and like 3 videos", ar: "زر ملف المنشئ وسجل إعجابك بـ 3 فيديوهات" },
    "ভিডিওটি বন্ধুদের সাথে শেয়ার করুন এবং বুকমার্ক করুন": { en: "Share video with friends and bookmark", ar: "شارك الفيديو مع الأصدقاء واحفظه" },
    "সাউন্ডট্র্যাক ব্যবহার করে ফেভারিটে যুক্ত করুন": { en: "Add soundtrack to favorites", ar: "أضف المقطع الصوتي للمفضلة" },
    "লাইভ স্ট্রিম ১৫ সেকেন্ড দেখুন ও লাইক দিন": { en: "Watch livestream for 15 seconds and like", ar: "شاهد البث المباشر لمدة 15 ثانية وسجل إعجابك" },
    "শিক্ষামূলক শর্ট ভিডিওতে লাইক ও কমেন্ট দিন": { en: "Like and comment on educational short video", ar: "أعجب بالفيديو التعليمي القصير وعلق عليه" },
    "ব্র্যান্ড চ্যানেলে ফলো দিন ও ভিডিও দেখুন": { en: "Follow brand channel and watch video", ar: "تابع قناة العلامة التجارية وشاهد الفيديو" },
    "ভাইরাল ক্লিপে লাভ রিয়্যাক্ট দিন": { en: "React with Love to viral clip", ar: "تفاعل بقلب على المقطع المنتشر" },
    "চ্যানেলটি সাবস্ক্রাইব করুন ও বেল আইকন চাপুন": { en: "Subscribe to channel and press bell icon", ar: "اشترك في القناة وفعل جرس التنبيهات" },
    "ভিডিওটি সম্পূর্ণ দেখে লাইক দিন": { en: "Watch full video and hit like", ar: "شاهد الفيديو بالكامل وسجل إعجابك" },
    "ভিডিওতে ইতিবাচক ও গঠনমূলক মন্তব্য করুন": { en: "Leave positive and constructive feedback on video", ar: "اكتب تعليقًا إيجابيًا على الفيديو" },
    "অফিসিয়াল পেজে লাইক ও ফলো করুন": { en: "Like and follow official page", ar: "أعجب بالصفحة الرسمية وتابعها" },
    "সাম্প্রতিক পোস্টে লাইক ও শেয়ার করুন": { en: "Like and share recent posts", ar: "أعجب بالمنشورات الأخيرة وشاركها" },
    "টাস্ক সম্পন্ন হয়েছে": { en: "Task Completed", ar: "اكتملت المهمة" },
    "টাস্ক গ্রহণ করুন": { en: "Accept Task", ar: "قبول المهمة" },
    "মিশন সফল": { en: "Mission Success", ar: "نجحت المهمة" },
    "মিশন গৃহীত হয়েছে": { en: "Mission Accepted", ar: "تم قبول المهمة" },
    "টাকা উত্তোলন সফল": { en: "Withdrawal Successful", ar: "تم السحب بنجاح" },
    "টাকা উত্তোলন প্রক্রিয়াধীন": { en: "Withdrawal Processing", ar: "السحب قيد المعالجة" },
    "ন্যূনতম উত্তোলন ৩০০ টাকা": { en: "Minimum withdrawal is 300 BDT", ar: "الحد الأدنى للسحب هو 300" },

  };

  // Placeholders dictionary
  const placeholderMap = {
    'login-email': {
      bn: '+880 ফোন নম্বর লিখুন',
      en: 'Enter phone number (+880...)',
      ar: 'أدخل رقم الهاتف (+880...)'
    },
    'login-password': {
      bn: 'আপনার পাসওয়ার্ড লিখুন',
      en: 'Enter your password',
      ar: 'أدخل كلمة المرور'
    },
    'register-phone': {
      bn: 'ফোন নম্বর',
      en: 'Phone number',
      ar: 'رقم الهاتف'
    },
    'register-sms-code': {
      bn: 'এসএমএস যাচাইকরণ কোড লিখুন',
      en: 'Enter SMS verification code',
      ar: 'أدخل رمز التحقق'
    },
    'register-password': {
      bn: 'আপনার পাসওয়ার্ড দিন',
      en: 'Enter your password',
      ar: 'أدخل كلمة المرور'
    },
    'confirm-password': {
      bn: 'আপনার পাসওয়ার্ড নিশ্চিত করুন',
      en: 'Confirm your password',
      ar: 'أعد إدخال كلمة المرور'
    },
    'register-invite-code': {
      bn: 'আমন্ত্রণ কোড (যদি থাকে)',
      en: 'Invitation code (optional)',
      ar: 'رمز الدعوة (اختياري)'
    },
    'withdraw-amount-input': {
      bn: 'উত্তোলনের পরিমাণ লিখুন (ন্যূনতম 700)',
      en: 'Enter withdrawal amount (Min 700)',
      ar: 'أدخل مبلغ السحب (الحد الأدنى 700)'
    }
  };

  let currentLang = 'bn';
  try {
    currentLang = localStorage.getItem('alo_lang') || 'bn';
  } catch(e) {
    currentLang = 'bn';
  }

  function getTranslation(key, lang) {
    const l = lang || currentLang;
    if (translations[l] && translations[l][key]) {
      return translations[l][key];
    }
    return (translations.bn && translations.bn[key]) || key;
  }

  // Translate all text nodes in the DOM
  function translateDOM(targetLang) {
    const lang = targetLang || currentLang;

    // 1. Update document attributes
    if (document.documentElement) {
      document.documentElement.lang = lang;
      if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
    }

    // 2. Synchronize all language selectors
    const selectors = document.querySelectorAll('#language-switch, #login-language-switch, #register-language-switch, #profile-language-switch, .language-switcher, .page-language-switch');
    selectors.forEach(function(sel) {
      if (sel && sel.value !== lang) {
        sel.value = lang;
      }
    });

    // 3. Update input placeholders
    Object.keys(placeholderMap).forEach(function(id) {
      const el = document.getElementById(id);
      if (el && placeholderMap[id][lang]) {
        el.placeholder = placeholderMap[id][lang];
      }
    });

    // 4. Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      const val = getTranslation(key, lang);
      if (val) el.textContent = val;
    });

    // 5. Replace text in DOM tree using phraseDictionary
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
          const text = node.nodeValue.trim();
          if (!text || text.length < 2) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodesToReplace = [];
    while (walker.nextNode()) {
      nodesToReplace.push(walker.currentNode);
    }

    const phrases = Object.keys(phraseDictionary).sort(function(a, b) {
      return b.length - a.length; // Match longest phrases first
    });

    nodesToReplace.forEach(function(node) {
      let val = node.nodeValue;
      let changed = false;

      // Check Bengali original phrases
      phrases.forEach(function(phrase) {
        if (val.includes(phrase)) {
          const target = lang === 'bn' ? phrase : (phraseDictionary[phrase][lang] || phrase);
          if (phrase !== target) {
            val = val.split(phrase).join(target);
            changed = true;
          }
        } else {
          // If already in English or Arabic, allow switching back or between them
          const enVal = phraseDictionary[phrase].en;
          const arVal = phraseDictionary[phrase].ar;
          if (enVal && val.includes(enVal)) {
            const target = lang === 'bn' ? phrase : (phraseDictionary[phrase][lang] || enVal);
            if (enVal !== target) {
              val = val.split(enVal).join(target);
              changed = true;
            }
          } else if (arVal && val.includes(arVal)) {
            const target = lang === 'bn' ? phrase : (phraseDictionary[phrase][lang] || arVal);
            if (arVal !== target) {
              val = val.split(arVal).join(target);
              changed = true;
            }
          }
        }
      });

      if (changed) {
        node.nodeValue = val;
      }
    });

    // 6. Dynamic panel refreshes if functions exist
    try {
      if (typeof window.updateDashboardTitleForLang === 'function') {
        window.updateDashboardTitleForLang(lang);
      }
      if (typeof window.updateTeamReportMetrics === 'function') {
        window.updateTeamReportMetrics();
      }
      if (typeof window.updateProfileMetrics === 'function') {
        window.updateProfileMetrics();
      }
    } catch(e) {}

    // Dispatch global event
    window.dispatchEvent(new CustomEvent('alo-language-changed', { detail: { lang: lang } }));
  }

  function setAppLanguage(newLang) {
    if (!newLang || (newLang !== 'bn' && newLang !== 'en' && newLang !== 'ar')) {
      newLang = 'bn';
    }
    currentLang = newLang;
    try {
      localStorage.setItem('alo_lang', newLang);
    } catch(e) {}

    translateDOM(newLang);
    console.log('[i18n] Language set to:', newLang);
  }

  // Expose to window
  window.aloI18n = {
    setLanguage: setAppLanguage,
    getLanguage: function() { return currentLang; },
    t: getTranslation,
    translateDOM: translateDOM,
    translations: translations
  };
  window.setAppLanguage = setAppLanguage;
  window.t = getTranslation;

  // Auto-bind change events on all language selectors
  function bindLanguageSelectors() {
    document.querySelectorAll('#language-switch, #login-language-switch, #register-language-switch, #profile-language-switch, .page-language-switch, .language-switcher').forEach(function(sel) {
      if (sel && !sel.dataset.i18nBound) {
        sel.dataset.i18nBound = 'true';
        sel.value = currentLang;
        sel.addEventListener('change', function(e) {
          const selected = e.target.value;
          setAppLanguage(selected);
        });
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      bindLanguageSelectors();
      if (currentLang !== 'bn') {
        translateDOM(currentLang);
      }
    });
  } else {
    bindLanguageSelectors();
    if (currentLang !== 'bn') {
      translateDOM(currentLang);
    }
  }

  // Periodic check to ensure newly injected elements or modals are translated if language != 'bn'
  setInterval(function() {
    bindLanguageSelectors();
  }, 2000);


  // Automatic MutationObserver to translate dynamically rendered elements (modals, sheets, cards)
  let observerTimeout = null;
  const domObserver = new MutationObserver(function(mutations) {
    if (currentLang === 'bn') return;
    if (observerTimeout) clearTimeout(observerTimeout);
    observerTimeout = setTimeout(function() {
      translateDOM(currentLang);
    }, 50);
  });

  if (document.body) {
    domObserver.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      domObserver.observe(document.body, { childList: true, subtree: true });
    });
  }

})();
