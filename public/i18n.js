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
      'hero_title': 'প্রতিদিনের কাজে আনুন নতুন আলো',
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
    'প্রতিদিনের কাজে আনুন নতুন আলো': { en: 'Bring Fresh Light to Your Daily Earnings', ar: 'أضف نورًا جديدًا لأرباحك اليومية' },
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
    'সেট করুন': { en: 'Set Up', ar: 'تعيين' }
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

})();
