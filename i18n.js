// Alo App Multi-Language (i18n) Engine
// Supports Bengali (bn), Hindi (hi), English (en)

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

    hi: {
      // Common & Navigation
      'home': 'होम',
      'hall': 'हॉल',
      'records': 'वीआईपी',
      'tasks': 'टास्क',
      'mine': 'मेरा प्रोफाइल',
      'login': 'लॉग इन',
      'register': 'साइन अप',
      'logout': 'साइन आउट',
      'back': 'वापस',
      'confirm': 'पुष्टि करें',
      'cancel': 'रद्द करें',
      'save': 'सहेजें',
      'copy': 'कॉपी',
      'copied': 'कॉपी हो गया',
      'active': 'सक्रिय',
      'pending': 'लंबित',
      'completed': 'पूर्ण',
      'failed': 'असफल',
      'all': 'सभी',
      'status': 'स्थिति',
      'date': 'दिनांक',
      'bdt': 'INR',

      // Home & Headers
      'brand_name': 'PW New Media',
      'hero_title': 'दैनिक कार्यों में लाएं PW New Media',
      'hero_subtitle': 'आपके व्यक्तिगत स्पेस में आपका स्वागत है। सरल, पारदर्शी और आपके लिए बनाया गया डिजिटल प्लेटफॉर्म।',
      'get_started': 'अभी शुरू करें',
      'have_account': 'मेरा खाता है',
      'start_today': 'आज ही शुरू करें',
      'quick_access': 'त्वरित पहुंच',
      'anytime_anywhere': 'कभी भी, कहीं भी',
      'your_way': 'अपने तरीके से',
      'smooth_experience': 'सहज और आरामदायक अनुभव',
      'footer_text': 'आपकी हर शुरुआत शानदार हो',

      // Login
      'login_title': 'अपने खाते में लॉग इन करें',
      'welcome_back': 'पुनः स्वागत है',
      'login_subtitle': 'अपनी जानकारी देकर वहीं से शुरू करें जहाँ आपने छोड़ा था।',
      'phone_label': 'फ़ोन नंबर',
      'phone_placeholder': 'फ़ोन नंबर दर्ज करें',
      'password_label': 'पासवर्ड',
      'password_placeholder': 'अपना पासवर्ड दर्ज करें',
      'forgot_password': 'पासवर्ड भूल गए?',
      'remember_me': 'मुझे लॉग इन रखें',
      'login_submit': 'लॉग इन करें',
      'demo_login': 'डेमो खाते से त्वरित प्रवेश',
      'new_here': 'यहाँ नए हैं?',
      'create_account': 'नया खाता बनाएं',
      'back_to_home': 'होमपेज पर वापस जाएं',
      'login_success': 'लॉग इन सफल!',
      'welcome_goldmine': 'PW New Media में स्वागत है',

      // Register
      'register_title': 'PW New Media में स्वागत है',
      'register_subtitle': 'आपका विश्वसनीय डिजिटल आय मंच',
      'sms_code_label': 'एसएमएस सत्यापन कोड',
      'sms_code_placeholder': 'सत्यापन कोड दर्ज करें',
      'send_sms_code': 'सत्यापन कोड भेजें',
      'enter_password': 'अपना पासवर्ड दर्ज करें',
      'confirm_password_label': 'पासवर्ड की पुष्टि करें',
      'confirm_password_placeholder': 'पासवर्ड पुनः दर्ज करें',
      'invite_code_label': 'निमंत्रण कोड',
      'invite_code_placeholder': 'निमंत्रण कोड (यदि हो)',
      'signup_submit': 'साइन अप करें',
      'already_account': 'क्या पहले से खाता है?',
      'register_success': 'पंजीकरण सफल!',

      // Profile & Pass
      'superior': 'मेरे वरिष्ठ:',
      'account_number': 'खाता संख्या:',
      'invite_code': 'निमंत्रण कोड:',
      'member_id': 'आईडी:',
      'total_balance': 'कुल शेष राशि',
      'available_balance': 'उपलब्ध शेष',
      'frozen_balance': 'फ्रीज बैलेंस',
      'today_income': 'आज की कुल आय',
      'today_task_income': 'आज की कार्य आय',
      'total_revenue': 'कुल आय',
      'incomplete_missions': 'अधूरे कार्य',
      'completed_missions': 'पूर्ण कार्य',
      'my_pass': 'मेरा पास',
      'withdraw': 'निकासी',
      'deposit': 'जमा',
      'team_report': 'टीम रिपोर्ट',
      'personal_info': 'व्यक्तिगत जानकारी',
      'task_records': 'कार्य रिकॉर्ड',
      'customer_service': 'ग्राहक सेवा',
      'share': 'शेयर करें',
      'change_language': 'भाषा बदलें',

      // Team Report
      'team_report_title': 'टीम रिपोर्ट',
      'my_team': 'मेरी टीम',
      'team_balance': 'टीम बैलेंस',
      'team_flow': 'टीम फ्लो',
      'team_recharge': 'टीम कुल रिचार्ज',
      'team_cashout': 'टीम कुल निकासी',
      'first_charge_count': 'प्रथम रिचार्ज संख्या',
      'direct_push_count': 'प्रत्यक्ष आमंत्रण (स्तर 1)',
      'total_team_size': 'कुल टीम आकार',
      'new_team_members': 'नए सदस्य (24 घंटे)',
      'tier_1': 'स्तर 1',
      'tier_2': 'स्तर 2',
      'tier_3': 'स्तर 3',
      'tier_1_direct': 'स्तर 1 (प्रत्यक्ष)',
      'tier_2_label': 'स्तर 2',
      'tier_3_label': 'स्तर 3',
      'total_people': 'कुल सदस्य',
      'recharge_amount': 'रिचार्ज राशि',
      'rebate': 'कमीशन',
      'rebate_10': '10% कमीशन',
      'rebate_5': '5% कमीशन',
      'rebate_2': '2% कमीशन',
      'tier_1_comm': 'स्तर 1 कमीशन (प्रत्यक्ष):',
      'tier_2_comm': 'स्तर 2 कमीशन:',
      'tier_3_comm': 'स्तर 3 कमीशन:',
      'copy_code': 'कोड कॉपी करें',
      'invite_page': 'आमंत्रण पृष्ठ',
      'your_invite_code': 'आपका निमंत्रण कोड:',
      'package': 'पैकेज',
      'balance': 'बैलेंस',
      'recharge': 'रिचार्ज',
      'joined': 'शामिल हुए:',
      'member_list': 'सदस्य सूची',
      'real_data': 'वास्तविक डेटा',
      'empty_team_all': 'अभी तक कोई सदस्य शामिल नहीं हुआ',
      'empty_team_tier': 'इस स्तर में अभी कोई सदस्य नहीं है',
      'invite_hint': 'मित्रों को निमंत्रण लिंक या कोड भेजें। स्तर 1 से 10%, स्तर 2 से 5%, और स्तर 3 से 2% कमीशन सीधे आपके खाते में प्राप्त करें!',
      'loading_team': 'डेटाबेस से टीम लोड हो रही है...',

      // Withdraw & Payment
      'withdraw_title': 'निकासी',
      'withdraw_details': 'निकासी विवरण',
      'withdraw_history': 'निकासी इतिहास',
      'withdraw_records': 'निकासी रिकॉर्ड',
      'withdraw_amount_placeholder': 'निकासी राशि दर्ज करें',
      'withdraw_amount_label': 'निकासी राशि',
      'actual_arrival': 'वास्तविक प्राप्त राशि',
      'handling_fee': 'शुल्क (18%)',
      'bkash_number': 'खाता नंबर',
      'bkash_setup': 'खाता सेट करें',
      'confirm_withdraw': 'निकासी की पुष्टि करें',
      'payment_method': 'भुगतान विधि',

      // Tasks
      'all_tasks': 'सभी',
      'doing_tasks': 'प्रगति में',
      'review_tasks': 'समीक्षाधीन',
      'done_tasks': 'पूर्ण',
      'open_task': 'कार्य खोलें',
      'submit_task': 'कार्य सबमिट करें',
      'reward': 'इनाम:',
      'start_task': 'कार्य शुरू करें',
      'task_reward_per': 'प्रति कार्य आय',

      // VIP / Packages
      'vip_hall': 'वीआईपी हॉल',
      'packages_benefits': 'पैकेज और लाभ',
      'price': 'मूल्य:',
      'daily_income': 'दैनिक आय:',
      'buy_now': 'अभी खरीदें',
      'join_now': 'अभी जुड़ें',
      'current_tier': 'वर्तमान स्तर',
      'task_count': 'कार्य संख्या',

      // Personal
      'avatar': 'अवतार',
      'account_binding': 'खाता बाइंडिंग',
      'usdt_address': 'USDT पता',
      'set_now': 'सेट करें'
    }
  };

  // Phrases to replace throughout the DOM (Bengali -> Target language)
  const phraseDictionary = {
    "আলো": { en: "Alo", hi: "PW New Media" },
    "প্রথম পাতা": { en: "Home", hi: "होम" },
    "হল": { en: "Hall", hi: "हॉल" },
    "সদস্য": { en: "VIP", hi: "वीआईपी" },
    "টাস্ক": { en: "Tasks", hi: "टास्क" },
    "আমার": { en: "Mine", hi: "प्रोफाइल" },
    "লগইন": { en: "Login", hi: "लॉग इन" },
    "অ্যাকাউন্ট খুলুন": { en: "Sign Up", hi: "साइन अप" },
    "নিশ্চিতভাবে শুরু করুন": { en: "Get Started Now", hi: "शुरू करें" },
    "আমার অ্যাকাউন্ট আছে": { en: "I Have an Account", hi: "मेरा खाता है" },
    "সহজ, স্বচ্ছ এবং আপনার জন্য তৈরি": { en: "Simple, transparent, and built for you", hi: "सरल, पारदर्शी और आपके लिए निर्मित" },
    "স্বাগতম কার্ড": { en: "Welcome Card", hi: "स्वागत कार्ड" },
    "আপনার স্পেস": { en: "Your Space", hi: "आपका स्थान" },
    "শুরু হোক আজই": { en: "Start Today", hi: "आज ही शुरू करें" },
    "দ্রুত অ্যাক্সেস": { en: "Quick Access", hi: "त्वरित पहुँच" },
    "যেকোনো সময়, যেকোনো জায়গায়": { en: "Anytime, Anywhere", hi: "कभी भी, कहीं भी" },
    "আপনার মতো করে": { en: "Your Own Way", hi: "अपने तरीके से" },
    "সহজ ও আরামদায়ক অভিজ্ঞতা": { en: "Smooth & Comfortable Experience", hi: "सहज और आरामदायक अनुभव" },
    "আপনার প্রতিটি শুরু হোক সুন্দর": { en: "May every beginning bring you prosperity", hi: "आपकी हर शुरुआत समृद्ध हो" },
    "আপনার নতুন শুরু এখানেই": { en: "Your fresh start begins here", hi: "आपकी नई शुरुआत यहाँ से होती है" },
    "প্রতিদিনের কাজে আনুন PW New Media": { en: "Bring Fresh Light to Your Daily Earnings", hi: "अपनी दैनिक आय में PW New Media लाएँ" },
    "আপনার ব্যক্তিগত স্পেসে স্বাগতম": { en: "Welcome to your personal space", hi: "आपके व्यक्तिगत स्पेस में स्वागत है" },
    "আবার স্বাগতম": { en: "Welcome Back", hi: "फिर से स्वागत है" },
    "আপনার অ্যাকাউন্টে লগইন করুন": { en: "Sign In to Your Account", hi: "अपने खाते में लॉग इन करें" },
    "আপনার তথ্য দিয়ে লগইন করে যেখানে থেমেছিলেন, সেখান থেকেই শুরু করুন।": { en: "Enter your credentials to continue right where you left off.", hi: "अपने विवरण से लॉग इन करके जहाँ रुके थे वहीं से शुरू करें।" },
    "ফোন নম্বর": { en: "Phone Number", hi: "फ़ोन नंबर" },
    "পাসওয়ার্ড": { en: "Password", hi: "पासवर्ड" },
    "পাসওয়ার্ড ভুলে গেছেন?": { en: "Forgot Password?", hi: "पासवर्ड भूल गए?" },
    "আমাকে লগইন অবস্থায় রাখুন": { en: "Keep me logged in", hi: "मुझे लॉग इन रखें" },
    "লগইন করুন": { en: "Log In", hi: "लॉग इन करें" },
    "ডেমো অ্যাকাউন্ট দিয়ে দ্রুত প্রবেশ": { en: "Quick Access with Demo Account", hi: "डेमो खाते से त्वरित प्रवेश" },
    "নতুন এখানে?": { en: "New here?", hi: "यहाँ नए हैं?" },
    "নতুন অ্যাকাউন্ট তৈরি করুন": { en: "Create New Account", hi: "नया खाता बनाएँ" },
    "হোমপেজে ফিরে যান": { en: "Back to Homepage", hi: "होमपेज पर वापस जाएँ" },
    "লগইন সফল!": { en: "Login Successful!", hi: "लॉग इन सफल!" },
    "স্বর্ণের খনিতে স্বাগতম": { en: "Welcome to Gold Mine", hi: "गोल्ड माइन में स्वागत है" },
    "দেখুন": { en: "Show", hi: "देखें" },
    "আপনার নির্ভরযোগ্য ডিজিটাল আয়ের প্ল্যাটফর্ম": { en: "Your Trusted Digital Income Platform", hi: "आपका विश्वसनीय डिजिटल कमाई का मंच" },
    "এসএমএস যাচাইকরণ কোড": { en: "SMS Verification Code", hi: "एसएमएस सत्यापन कोड" },
    "যাচাইকরণ কোড পাঠান": { en: "Send Code", hi: "सत्यापन कोड भेजें" },
    "পাসওয়ার্ড নিশ্চিত করুন": { en: "Confirm Password", hi: "पासवर्ड की पुष्टि करें" },
    "আমন্ত্রণ কোড": { en: "Invitation Code", hi: "निमंत्रण कोड" },
    "এখন সাইইন আপ করুন": { en: "Sign Up Now", hi: "अभी साइन अप करें" },
    "আগে থেকেই অ্যাকাউন্ট আছে?": { en: "Already have an account?", hi: "पहले से खाता है?" },
    "নিবন্ধন সফল!": { en: "Registration Successful!", hi: "पंजीकरण सफल!" },
    "আমার উচ্চতর:": { en: "My Superior:", hi: "मेरे वरिष्ठ:" },
    "হিসাব নাম্বার:": { en: "Account:", hi: "खाता संख्या:" },
    "আমন্ত্রণ কোড:": { en: "Invite Code:", hi: "निमंत्रण कोड:" },
    "সাইন আউট": { en: "Sign Out", hi: "साइन आउट" },
    "আমার পাস": { en: "My Pass", hi: "मेरा पास" },
    "প্রত্যাহার": { en: "Withdrawal", hi: "निकासी" },
    "জমা": { en: "Deposit", hi: "जमा" },
    "দলের রিপোর্ট": { en: "Team Report", hi: "टीम रिपोर्ट" },
    "ব্যক্তিগত তথ্য": { en: "Personal Info", hi: "व्यक्तिगत जानकारी" },
    "কাজের রেকর্ড": { en: "Task Records", hi: "कार्य रिकॉर्ड" },
    "গ্রাহক সেবা": { en: "Support", hi: "ग्राहक सहायता" },
    "শেয়ার করুন": { en: "Share", hi: "शेयर करें" },
    "আজকের মোট আয়:": { en: "Today's Income:", hi: "आज की कुल आय:" },
    "আজকের কাজ আয়:": { en: "Task Income:", hi: "आज की कार्य आय:" },
    "মোট রাজস্ব": { en: "Total Revenue", hi: "कुल राजस्व" },
    "অসম্পূর্ণ মিশন": { en: "Incomplete Tasks", hi: "अपूर्ण मिशन" },
    "সম্পন্ন মিশন": { en: "Completed Tasks", hi: "पूर्ण मिशन" },
    "হিমায়িত": { en: "Frozen", hi: "फ्रीज़" },
    "উপলব্ধ ব্যালেন্স": { en: "Available Balance", hi: "उपलब्ध बैलेंस" },
    "মোট ব্যালেন্স": { en: "Total Balance", hi: "कुल बैलेंस" },
    "মোট দলের ভারসাম্য(BDT)": { en: "Team Balance (BDT)", hi: "टीम बैलेंस" },
    "মোট দলের প্রবাহ(BDT)": { en: "Team Flow (BDT)", hi: "टीम टर्नओवर" },
    "মোট রিচার্জ(BDT)": { en: "Total Recharge (BDT)", hi: "कुल रिचार्ज" },
    "মোট নগদ আউট(BDT)": { en: "Total Cashout (BDT)", hi: "कुल निकासी" },
    "প্রথম চার্জের সংখ্যা": { en: "First Deposit Count", hi: "प्रथम रिचार्ज संख्या" },
    "সরাসরি ধাক্কা নম্বর": { en: "Direct Referrals (Tier 1)", hi: "प्रत्यक्ष रेफरल (टीयर 1)" },
    "দলের মোট আকার": { en: "Total Team Size", hi: "टीम का कुल आकार" },
    "নতুন দল নম্বর": { en: "New Members (24h)", hi: "नए सदस्य (24 घंटे)" },
    "আমার দল": { en: "My Team", hi: "मेरी टीम" },
    "স্তর 1": { en: "Tier 1", hi: "टीयर 1" },
    "স্তর 2": { en: "Tier 2", hi: "टीयर 2" },
    "স্তর 3": { en: "Tier 3", hi: "टीयर 3" },
    "স্তর ১ (সরাসরি)": { en: "Tier 1 (Direct)", hi: "टीयर 1 (प्रत्यक्ष)" },
    "স্তর ১": { en: "Tier 1", hi: "टीयर 1" },
    "স্তর ২": { en: "Tier 2", hi: "टीयर 2" },
    "স্তর ৩": { en: "Tier 3", hi: "टीयर 3" },
    "মোট মানুষ": { en: "Total Members", hi: "कुल सदस्य" },
    "রিচার্জ পরিমাণ": { en: "Recharge Amount", hi: "रिचार्ज राशि" },
    "রিবেট": { en: "Rebate", hi: "कमीशन छूट" },
    "১০% রিবেট": { en: "10% Rebate", hi: "10% कमीशन" },
    "৫% রিবেট": { en: "5% Rebate", hi: "5% कमीशन" },
    "২% রিবেট": { en: "2% Rebate", hi: "2% कमीशन" },
    "স্তর ১ কমিশন (সরাসরি):": { en: "Tier 1 Commission (Direct):", hi: "टीयर 1 कमीशन (प्रत्यक्ष):" },
    "স্তর ২ কমিশন:": { en: "Tier 2 Commission:", hi: "टीयर 2 कमीशन:" },
    "স্তর ৩ কমিশন:": { en: "Tier 3 Commission:", hi: "टीयर 3 कमीशन:" },
    "কোড কপি": { en: "Copy Code", hi: "कोड कॉपी करें" },
    "আমন্ত্রণ পেজ": { en: "Invite Page", hi: "निमंत्रण पृष्ठ" },
    "আপনার আমন্ত্রণ কোড:": { en: "Your Invite Code:", hi: "आपका निमंत्रण कोड:" },
    "প্যাকেজ": { en: "Package", hi: "पैकेज" },
    "ব্যালেন্স": { en: "Balance", hi: "बैलेंस" },
    "রিচার্জ": { en: "Recharge", hi: "रिचार्ज" },
    "যুক্ত:": { en: "Joined:", hi: "शामिल हुए:" },
    "সদস্য তালিকা": { en: "Member List", hi: "सदस्य सूची" },
    "রিয়েল ডাটা": { en: "Real Data", hi: "वास्तविक डेटा" },
    "সমস্ত": { en: "All", hi: "सभी" },
    "চলমান": { en: "In Progress", hi: "प्रगति पर" },
    "পর্যালোচনা": { en: "Review", hi: "समीक्षा" },
    "সম্পন্ন": { en: "Completed", hi: "पूर्ण" },
    "কাজ খুলুন": { en: "Open Task", hi: "कार्य खोलें" },
    "জমা দিন": { en: "Submit", hi: "सबमिट करें" },
    "পুরস্কার:": { en: "Reward:", hi: "इनाम:" },
    "এখনই যোগ দিন": { en: "Join Now", hi: "अभी जुड़ें" },
    "বর্তমান স্তর": { en: "Current Level", hi: "वर्तमान स्तर" },
    "দৈনিক আয়:": { en: "Daily Income:", hi: "दैनिक आय:" },
    "মূল্য:": { en: "Price:", hi: "मूल्य:" },
    "ক্রয় করুন": { en: "Buy Now", hi: "खरीदें" },
    "উত্তোলন বিবরণ": { en: "Withdrawal Details", hi: "निकासी विवरण" },
    "উত্তোলনের ইতিহাস": { en: "Withdrawal History", hi: "निकासी इतिहास" },
    "উত্তোলনের রেকর্ড": { en: "Withdrawal Records", hi: "निकासी रिकॉर्ड" },
    "প্রকৃত প্রাপ্তি": { en: "Actual Received", hi: "वास्तविक प्राप्त राशि" },
    "ফি (18%)": { en: "Fee (18%)", hi: "शुल्क (18%)" },
    "বিকাশ সেটআপ": { en: "bKash Setup", hi: "खाता सेटअप" },
    "উত্তোলন নিশ্চিত করুন": { en: "Confirm Withdrawal", hi: "निकासी की पुष्टि करें" },
    "অর্থপ্রদানের পদ্ধতি": { en: "Payment Method", hi: "भुगतान विधि" },
    "অবতার": { en: "Avatar", hi: "अवतार" },
    "অ্যাকাউন্ট বাঁধাই": { en: "Account Binding", hi: "खाता बाइंडिंग" },
    "USDT ঠিকানা": { en: "USDT Address", hi: "USDT पता" },
    "USDT (BEP20)": { en: "USDT (BEP20)", hi: "USDT (BEP20)" },
    "USDT অ্যাকাউন্ট": { en: "USDT Account", hi: "USDT खाता" },
    "USDT সেট নেই": { en: "USDT Not Set", hi: "USDT सेट नहीं है" },
    "BEP20 ADREES": { en: "BEP20 ADDRESS", hi: "BEP20 पता" },
    "BEP20 ওয়ালেট ঠিকানা লিখুন (0x...)": { en: "Enter BEP20 wallet address (0x...)", hi: "BEP20 वॉलेट पता दर्ज करें (0x...)" },
    "সেট করুন": { en: "Set Up", hi: "सेट करें" },
    "নগদ অ্যাকাউন্ট": { en: "Nagad Account", hi: "Nagad Account" },
    "নগদ সেট নেই": { en: "Nagad Not Bound", hi: "Nagad Not Bound" },
    "নগদ সেট করুন": { en: "Bind Nagad", hi: "Bind Nagad" },
    "নগদ ওয়ালেট বাঁধাই": { en: "Bind Nagad Wallet", hi: "Bind Nagad Wallet" },
    "✓ নগদ সেট করা আছে": { en: "✓ Nagad Bound", hi: "✓ Nagad Bound" },
    "নগদ সেট করা আছে": { en: "Nagad Bound", hi: "Nagad Bound" },
    "আপনার নগদ নম্বর লিখুন": { en: "Enter your Nagad number", hi: "Enter your Nagad number" },
    "সঠিক নগদ মোবাইল ব্যাংক নম্বর লিখুন": { en: "Please enter a valid Nagad mobile banking number", hi: "Please enter a valid Nagad mobile banking number" },
    "নগদ সফলভাবে সেট করা হয়েছে": { en: "Nagad bound successfully!", hi: "Nagad bound successfully!" },
    "⚠️ উত্তোলন করার পূর্বে নগদ সেট করতে হবে": { en: "⚠️ Please bind Nagad before withdrawal", hi: "⚠️ Please bind Nagad before withdrawal" },
    "আপনার নির্ভরযোগ্য ডিজিটাল আর্নিং ও মিশন প্ল্যাটফর্ম": { en: "Your Trusted Digital Earning & Mission Platform", hi: "Your Trusted Digital Earning & Mission Platform" },
    "আপনার নির্ভরযোগ্য প্ল্যাটফর্ম": { en: "Your Trusted Platform", hi: "Your Trusted Platform" },
    "প্রধান নেভিগেশন": { en: "Main Navigation", hi: "Main Navigation" },
    "ভাষা নির্বাচন": { en: "Select Language", hi: "भाषा चुनें" },
    "বাংলা": { en: "Bengali", hi: "বাংলা" },
    "আপনার ব্যক্তিগত স্পেসে স্বাগতম। সহজে অ্যাকাউন্ট তৈরি করুন, নিরাপদে লগইন করুন, আর শুরু করুন আপনার পরবর্তী অধ্যায়।": { en: "Welcome to your personal space. Create an account easily, log in securely, and start your next chapter.", hi: "Welcome to your personal space. Create an account easily, log in securely, and start your next chapter." },
    "সহজ, স্বচ্ছ এবং আপনার জন্য তৈরি।": { en: "Simple, transparent, and built for you.", hi: "Simple, transparent, and built for you." },
    "২০২৫": { en: "2025", hi: "2025" },
    "২০২৬": { en: "2026", hi: "2026" },
    "আপনার প্রতিটি শুরু হোক সুন্দর।": { en: "May all your beginnings be prosperous.", hi: "May all your beginnings be prosperous." },
    "পাসওয়ার্ড পুনরুদ্ধার এখানে চালু নেই।": { en: "Password reset is not available here.", hi: "Password reset is not available here." },
    "আপনার জন্য রাখা সবকিছু, এক জায়গায়।": { en: "Everything reserved for you, all in one place.", hi: "Everything reserved for you, all in one place." },
    "আপনার ব্যক্তিগত স্পেসে আবার ফিরে আসুন। নিরাপদে লগইন করে আপনার কাজ এগিয়ে নিন।": { en: "Welcome back to your personal space. Log in securely and proceed with your tasks.", hi: "Welcome back to your personal space. Log in securely and proceed with your tasks." },
    "একটি ভালো শুরু প্রতিদিনকে বদলে দিতে পারে।": { en: "A great beginning can transform every day.", hi: "A great beginning can transform every day." },
    "আপনার পথ": { en: "Your Journey", hi: "Your Journey" },
    "নিবন্ধন স্বাগতম": { en: "Welcome to Registration", hi: "Welcome to Registration" },
    "আপনার অ্যাকাউন্ট তৈরি করতে তথ্য দিন": { en: "Enter details to create your account", hi: "Enter details to create your account" },
    "পাসওয়ার্ড দেখান": { en: "Show Password", hi: "Show Password" },
    "পাসওয়ার্ড লুকান": { en: "Hide Password", hi: "पासवर्ड छिपाएँ" },
    "ড্যাশবোর্ড": { en: "Dashboard", hi: "डैशबोर्ड" },
    "আমার প্রোফাইল": { en: "My Profile", hi: "मेरी प्रोफाइल" },
    "আমার উচ্চতর": { en: "My Superior", hi: "मेरे वरिष्ठ" },
    "সাপোর্ট চ্যাট": { en: "Support Chat", hi: "सपोर्ट चैट" },
    "অনলাইন গ্রাহক সেবা সহায়তা শীঘ্রই চালু হবে।": { en: "Online customer service support is coming soon.", hi: "ऑनलाइन ग्राहक सेवा जल्द ही उपलब्ध होगी।" },
    "হিসাব নাম্বার, আমন্ত্রণ কোড, সাইন আউট": { en: "Account Number, Invite Code, Sign Out", hi: "खाता संख्या, निमंत्रण कोड, साइन आउट" },
    "প্রোফাইল অ্যাভাটার": { en: "Profile Avatar", hi: "प्रोफ़ाइल अवतार" },
    "লগআউট": { en: "Log Out", hi: "लॉग आउट" },
    "ভারসাম্য:": { en: "Balance:", hi: "बैलेंस:" },
    "ভারসাম্য": { en: "Balance", hi: "बैलेंस" },
    "আমার পার্স": { en: "My Wallet", hi: "मेरा वॉलेट" },
    "শিরোনাম": { en: "Title", hi: "शीर्षक" },
    "সীমা": { en: "Limit", hi: "सीमा" },
    "ভাল": { en: "Good", hi: "अच्छा" },
    "চমৎকার": { en: "Excellent", hi: "उत्कृष्ट" },
    "ব্যক্তিগত ভারসাম্য": { en: "Personal Balance", hi: "व्यक्तिगत बैलेंस" },
    "ব্যক্তিগত ভারসাম্য(BDT)": { en: "Personal Balance(BDT)", hi: "व्यक्तिगत बैलेंस(BDT)" },
    "ব্যক্তিগত ভারসাম্য(INR)": { en: "Personal Balance(INR)", hi: "व्यक्तिगत बैलेंस(INR)" },
    "গতকালের উপার্জন": { en: "Yesterday's Income", hi: "कल की कमाई" },
    "গতকালের উপার্জন(BDT)": { en: "Yesterday's Income(BDT)", hi: "कल की कमाई(BDT)" },
    "গতকালের উপার্জন(INR)": { en: "Yesterday's Income(INR)", hi: "कल की कमाई(INR)" },
    "গতকালকের উপার্জন": { en: "Yesterday's Income", hi: "कल की कमाई" },
    "গতকালকের উপার্জন(BDT)": { en: "Yesterday's Income(BDT)", hi: "कल की कमाई(BDT)" },
    "গতকালকের উপার্জন(INR)": { en: "Yesterday's Income(INR)", hi: "कल की कमाई(INR)" },
    "আজ উপার্জন": { en: "Today's Income", hi: "आज की कमाई" },
    "আজ উপার্জন(BDT)": { en: "Today's Income(BDT)", hi: "आज की कमाई(BDT)" },
    "আজ উপার্জন(INR)": { en: "Today's Income(INR)", hi: "आज की कमाई(INR)" },
    "এই সপ্তাহে আয়": { en: "This Week's Income", hi: "इस सप्ताह की आय" },
    "এই সপ্তাহে আয়(BDT)": { en: "This Week's Income(BDT)", hi: "इस सप्ताह की आय(BDT)" },
    "এই সপ্তাহে আয়(INR)": { en: "This Week's Income(INR)", hi: "इस सप्ताह की आय(INR)" },
    "এই মাসে আয়": { en: "This Month's Income", hi: "इस महीने की आय" },
    "এই মাসে আয়(BDT)": { en: "This Month's Income(BDT)", hi: "इस महीने की आय(BDT)" },
    "এই মাসে আয়(INR)": { en: "This Month's Income(INR)", hi: "इस महीने की आय(INR)" },
    "গত মাসে আয়": { en: "Last Month's Income", hi: "पिछले महीने की आय" },
    "গত মাসে আয়(BDT)": { en: "Last Month's Income(BDT)", hi: "पिछले महीने की आय(BDT)" },
    "গত মাসে আয়(INR)": { en: "Last Month's Income(INR)", hi: "पिछले महीने की आय(INR)" },
    "মোট রাজস্ব(BDT)": { en: "Total Revenue(BDT)", hi: "कुल राजस्व(BDT)" },
    "মোট রাজস্ব(INR)": { en: "Total Revenue(INR)", hi: "कुल राजस्व(INR)" },
    "কাজটি আজই সম্পূর্ণ করুন": { en: "Complete tasks today", hi: "कार्य आज ही पूरा करें" },
    "কাজটি আজই সম্পূর্ণ করুন(এক)": { en: "Tasks Completed Today", hi: "आज पूर्ण किए गए कार्य" },
    "আজকের জন্য বাকি কাজ": { en: "Remaining tasks for today", hi: "आज के शेष कार्य" },
    "আজকের জন্য বাকি কাজ(এক)": { en: "Remaining tasks today", hi: "आज के शेष कार्य" },
    "অ্যাপ ডাউনলোডের সুবিধা শীঘ্রই আসবে।": { en: "App download feature is coming soon.", hi: "ऐप डाउनलोड सुविधा जल्द ही आएगी।" },
    "ডাউনলোড": { en: "Download", hi: "डाउनलोड" },
    "দৈনিক বিবৃতি": { en: "Daily Statement", hi: "दैनिक विवरण" },
    "অ্যাকাউন্ট পরিবর্তনের রেকর্ড এখানে উপলভ্য নয়।": { en: "Account change history is not available here.", hi: "खाता परिवर्तन रिकॉर्ड यहाँ उपलब्ध नहीं है।" },
    "অ্যাকাউন্ট পরিবর্তন রেকর্ড": { en: "Account Change Record", hi: "खाता परिवर्तन रिकॉर्ड" },
    "বন্ধুকে আমন্ত্রণ জানান": { en: "Invite Friends", hi: "मित्र को आमंत्रित करें" },
    "আরও সেবা": { en: "More Services", hi: "अधिक सेवाएँ" },
    "সঞ্চয় পরিকল্পনার বিস্তারিত এখানে উপলভ্য নয়।": { en: "Savings plan details are not available here.", hi: "बचत योजना का विवरण यहाँ उपलब्ध नहीं है।" },
    "সঞ্চয় পরিকল্পনা": { en: "Savings Plan", hi: "बचत योजना" },
    "টেলিগ্রাম সহায়তার লিংক এখানে যুক্ত করা হয়নি।": { en: "Telegram support link is not configured.", hi: "टेलीग्राम सहायता लिंक यहाँ उपलब्ध नहीं है।" },
    "টেলিগ্রাম": { en: "Telegram", hi: "टेलीग्राम" },
    "নিরাপত্তা কেন্দ্রের সুবিধা এখানে চালু নেই।": { en: "Security Center feature is not active.", hi: "सुरक्षा केंद्र सुविधा अभी सक्रिय नहीं है।" },
    "নিরাপত্তা কেন্দ্র": { en: "Security Center", hi: "सुरक्षा केंद्र" },
    "ভাগ্যবান স্পিনের সুবিধা এখানে চালু নেই।": { en: "Lucky Spin feature is not active.", hi: "लकी स्पिन सुविधा अभी सक्रिय नहीं है।" },
    "ভাগ্যবান স্পিন": { en: "Lucky Spin", hi: "लकी स्पिन" },
    "স্বাগতম": { en: "Welcome", hi: "स्वागत है" },
    "আপনার আগ্রহের জগৎ": { en: "Your World of Interest", hi: "आपकी रुचि का संसार" },
    "শুরু হোক এখান থেকে": { en: "Start from here", hi: "यहाँ से शुरू करें" },
    "নতুন মিশন দেখুন, শিখুন এবং প্রতিদিন এগিয়ে চলুন।": { en: "Explore new missions, learn, and grow every day.", hi: "नए मिशन देखें, सीखें और हर दिन आगे बढ़ें।" },
    "আলোকময় সৃজনশীলতার স্লাইডার": { en: "Creative Media Slider", hi: "रचनात्मक मीडिया स्लाइडर" },
    "নতুন সম্ভাবনার শুরু": { en: "Beginning of New Opportunities", hi: "नए अवसरों की शुरुआत" },
    "শিখুন, এগিয়ে চলুন": { en: "Learn and Proceed", hi: "सीखें और आगे बढ़ें" },
    "প্রতিদিন এক ধাপ সামনে": { en: "One step forward every day", hi: "हर दिन एक कदम आगे" },
    "দলের প্রসার সম্পর্কিত নমুনা আপডেট": { en: "Sample team growth updates", hi: "टीम विस्तार संबंधी नमूना अपडेट" },
    "একজন ব্যবহারকারীকে সুপারিশ করার জন্য": { en: "for recommending a user", hi: "एक उपयोगकर्ता की सिफारिश करने के लिए" },
    "প্রচার পুরস্কার পাওয়ার জন্য অভিনন্দন": { en: "Congratulations on receiving promotion reward", hi: "प्रचार पुरस्कार प्राप्त करने पर बधाई" },
    "প্রচার পুরস্কার পাওয়ার জন্য অভিনন্দন!": { en: "Congratulations on receiving promotional reward!", hi: "प्रचार पुरस्कार प्राप्त करने पर बधाई!" },
    "এলাকা": { en: "Region", hi: "क्षेत्र" },
    "আয়ের": { en: "Income", hi: "आय का" },
    "ম্যানেজার": { en: "Manager", hi: "मैनेजर" },
    "অফিসিয়াল কাস্টমার ম্যানেজার": { en: "Official Customer Manager", hi: "आधिकारिक ग्राहक प्रबंधक" },
    "মিশন হল": { en: "Mission Hall", hi: "मिशन हॉल" },
    "সামাজিক মিশন": { en: "Social Missions", hi: "सोशल मिशन" },
    "লাইক ও অনুসরণ": { en: "Like & Follow", hi: "लाइक और फॉलो" },
    "সদস্যদের আপডেট": { en: "Member Updates", hi: "सदस्यों के अपडेट" },
    "সাম্প্রতিক সদস্য আপডেট": { en: "Recent Member Updates", hi: "हालिया सदस्य अपडेट" },
    "আজ ৫টি মিশন সম্পন্ন করেছেন": { en: "Completed 5 missions today", hi: "आज 5 मिशन पूरे किए" },
    "আজ ৩টি মিশন সম্পন্ন করেছেন": { en: "Completed 3 missions today", hi: "आज 3 मिशन पूरे किए" },
    "আজ ২টি মিশন সম্পন্ন করেছেন": { en: "Completed 2 missions today", hi: "आज 2 मिशन पूरे किए" },
    "আজ ৪টি মিশন সম্পন্ন করেছেন": { en: "Completed 4 missions today", hi: "आज 4 मिशन पूरे किए" },
    "আজ ৬টি মিশন সম্পন্ন করেছেন": { en: "Completed 6 missions today", hi: "आज 6 मिशन पूरे किए" },
    "আজ ১২টি মিশন সম্পন্ন করেছেন": { en: "Completed 12 missions today", hi: "आज 12 मिशन पूरे किए" },
    "সদস্য: ১৮****৫৪": { en: "Member: 18****54", hi: "सदस्य: 18****54" },
    "সদস্য: ১৭****২৭": { en: "Member: 17****27", hi: "सदस्य: 17****27" },
    "সদস্য: ১৩****২৯": { en: "Member: 13****29", hi: "सदस्य: 13****29" },
    "সদস্য: ২১****৬৪": { en: "Member: 21****64", hi: "सदस्य: 21****64" },
    "সদস্য: ১৯****০৮": { en: "Member: 19****08", hi: "सदस्य: 19****08" },
    "+১০০.০০": { en: "+100.00", hi: "+100.00" },
    "+৪০.০০": { en: "+40.00", hi: "+40.00" },
    "+৬০.০০": { en: "+60.00", hi: "+60.00" },
    "+১৮০.০০": { en: "+180.00", hi: "+180.00" },
    "+৪৮০.০০": { en: "+480.00", hi: "+480.00" },
    "হল প্যাকেজ": { en: "Hall Packages", hi: "हॉल पैकेज" },
    "কাজের তালিকা খুলুন": { en: "Open Task List", hi: "कार्य सूची खोलें" },
    "দৈনিক কর্ম:": { en: "Daily Tasks:", hi: "दैनिक कार्य:" },
    "দৈনিক কর্ম": { en: "Daily Tasks", hi: "दैनिक कार्य" },
    "হল সম্পর্কে তথ্য": { en: "Information About Hall", hi: "हॉल के बारे में जानकारी" },
    "আপনার অগ্রগতির পরবর্তী ধাপ": { en: "Your next level of progression", hi: "आपकी प्रगति का अगला कदम" },
    "ফ্রিতে শুধু": { en: "In Free trial only", hi: "मुफ़्त में केवल" },
    "কাজ করতে পারবেন। বাকি কাজ করতে গেলে আপনার ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করতে হবে।": { en: "tasks can be completed. To perform remaining tasks, please purchase a package with your balance.", hi: "कार्य कर सकते हैं। अतिरिक्त कार्यों के लिए पैकेज खरीदना आवश्यक है।" },
    "সব ব্যালেন্স ও পুরস্কার ভার্চুয়াল ডেমো হিসাব": { en: "All balances and rewards are platform earnings", hi: "सभी बैलेंस और पुरस्कार प्लेटफ़ॉर्म कमाई हैं" },
    "বাস্তব টাকা নয়।": { en: "subject to policy verification.", hi: "वास्तविक धन नहीं है।" },
    "বন্ধুদের আমন্ত্রণ": { en: "Invite Friends", hi: "मित्रों को आमंत्रण" },
    "বন্ধুদের আমন্ত্রণ করুন,": { en: "Invite friends,", hi: "मित्रों को आमंत्रित करें," },
    "স্বর্ণের খনি জিতুন": { en: "Unlock Wealth Rewards", hi: "धन पुरस्कार अनलॉक करें" },
    "আপনার আমন্ত্রণ কোডটি বন্ধুদের সঙ্গে শেয়ার করুন।": { en: "Share your invitation code with friends.", hi: "अपना निमंत्रण कोड मित्रों के साथ साझा करें।" },
    "কোড স্ক্যান করে তারা যোগ দিতে পারবে।": { en: "They can join easily by scanning this code.", hi: "कोड स्कैन करके वे आसानी से जुड़ सकते हैं।" },
    "কোড তৈরি হচ্ছে": { en: "Generating code...", hi: "कोड जनरेट हो रहा है..." },
    "আপনার আমন্ত্রণ লিংক": { en: "Your Invitation Link", hi: "आपका निमंत्रण लिंक" },
    "লিংক কপি করুন": { en: "Copy Link", hi: "लिंक कॉपी करें" },
    "বরফে পরিণত করা:": { en: "Frozen:", hi: "फ्रीज़:" },
    "বরফে পরিণত করা": { en: "Frozen Balance", hi: "फ्रीज़ बैलेंस" },
    "উপলব্ধ:": { en: "Available:", hi: "उपलब्ध:" },
    "উপলব্ধ": { en: "Available", hi: "उपलब्ध" },
    "লাভ শেয়ারিং": { en: "Profit Sharing", hi: "लाभ साझाकरण" },
    "অনুপাত": { en: "Ratio", hi: "Ratio" },
    "আগমন": { en: "Arrival", hi: "Arrival" },
    "স্থানান্তরিত": { en: "Transferred", hi: "Transferred" },
    "কোন রেকর্ড নেই": { en: "No records found", hi: "कोई रिकॉर्ड नहीं मिला" },
    "বন্ধ করুন": { en: "Close", hi: "बंद करें" },
    "প্রত্যাহার পদ্ধতি": { en: "Withdrawal Method", hi: "निकासी विधि" },
    "বিকাশ সেট নেই": { en: "bKash Not Bound", hi: "खाता लिंक नहीं है" },
    "তোলা টাকার পরিমাণ": { en: "Withdrawal Amount", hi: "निकासी राशि" },
    "তোলা টাকার": { en: "Withdrawal", hi: "निकासी" },
    "প্রত্যাহার পরিমাণ লিখুন দয়া করে": { en: "Please enter withdrawal amount", hi: "कृपया निकासी राशि दर्ज करें" },
    "ফান্ড পাসওয়ার্ড": { en: "Fund Password", hi: "फंड पासवर्ड" },
    "অনুগ্রহ করে ফান্ডের পাসওয়ার্ড লিখুন": { en: "Please enter your fund password", hi: "कृपया फंड पासवर्ड दर्ज करें" },
    "মাসিক উত্তোলন": { en: "Monthly Withdrawal", hi: "मासिक निकासी" },
    "উত্তোলন 48-96 ঘণ্টার মধ্যে আসে": { en: "Withdrawal arrives within 48-96 hours", hi: "निकासी 48-96 घंटे में आती है" },
    "প্রত্যাহার 12 ঘণ্টার মধ্যে আসে": { en: "Withdrawal arrives within 12 hours", hi: "निकासी 12 घंटे में आती है" },
    "বাতিল করুন": { en: "Cancel", hi: "रद्द करें" },
    "নিশ্চিত করুন": { en: "Confirm", hi: "पुष्टि करें" },
    "পছন্দ কর": { en: "Choose", hi: "चुनें" },
    "সেট না": { en: "Not Set", hi: "सेट नहीं" },
    "সহায়তা সেবা এখানে চালু নেই।": { en: "Help service is not active.", hi: "सहायता सेवा अभी चालू नहीं है।" },
    "সহায়তা": { en: "Support", hi: "सहायता" },
    "প্রোফাইল ছবি পরিবর্তনের সুবিধা এখানে চালু নেই।": { en: "Changing profile avatar is currently disabled.", hi: "प्रोफ़ाइल चित्र परिवर्तन अभी अक्षम है।" },
    "অ্যাকাউন্ট বাঁধাই এখানে চালু নেই।": { en: "Account binding is currently disabled.", hi: "खाता बाइंडिंग सुविधा यहाँ सक्रिय नहीं है।" },
    "ঠিকানা যোগ করার সুবিধা এখানে চালু নেই।": { en: "Adding address is currently disabled.", hi: "पता जोड़ने की सुविधा यहाँ उपलब्ध नहीं है।" },
    "বিকাশ অ্যাকাউন্ট": { en: "bKash Account", hi: "बैंक खाता" },
    "প্রবেশের গুপ্তসংকেত পরিবর্তনের সুবিধা এখানে চালু নেই।": { en: "Password modification is currently disabled.", hi: "पासवर्ड परिवर्तन की सुविधा यहाँ सक्रिय नहीं है।" },
    "প্রবেশের গুপ্তসংকেত": { en: "Login Password", hi: "लॉगिन पासवर्ड" },
    "ফান্ড পাসওয়ার্ড সেট করার সুবিধা এখানে চালু নেই।": { en: "Fund password setup is currently disabled.", hi: "फंड पासवर्ड सेट करने की सुविधा यहाँ उपलब्ध नहीं है।" },
    "বিকাশ সেট করুন": { en: "Bind bKash", hi: "खाता सेट करें" },
    "সহায়তা সেবা শীঘ্রই চালু হবে।": { en: "Support service will be available shortly.", hi: "सहायता सेवा जल्द ही उपलब्ध होगी।" },
    "বিকাশ ওয়ালেট বাঁধাই": { en: "Bind bKash Wallet", hi: "वॉलेट बाइंडिंग" },
    "মোবাইল ব্যাংকিং উত্তোলন অ্যাকাউন্ট": { en: "Mobile Banking Withdrawal Account", hi: "निकासी खाता" },
    "সম্পুর্ন নাম": { en: "Full Name", hi: "पूरा नाम" },
    "আবশ্যক": { en: "Required", hi: "आवश्यक" },
    "আপনার সম্পূর্ণ নাম লিখুন": { en: "Enter your full name", hi: "अपना पूरा नाम दर्ज करें" },
    "মোবাইল ব্যাংক নাম্বার": { en: "Mobile Banking Number", hi: "मोबाइल बैंक नंबर" },
    "আপনার বিকাশ নম্বর লিখুন": { en: "Enter your bKash number", hi: "अपना खाता नंबर दर्ज करें" },
    "USDT অ্যাকাউন্ট (BEP20)": { en: "USDT Account (BEP20)", hi: "USDT खाता (BEP20)" },
    "গুরুত্বপূর্ণ নির্দেশনা:": { en: "Important Instructions:", hi: "महत्वपूर्ण निर्देश:" },
    "অনুগ্রহ করে নিশ্চিত করুন যে আপনার সম্পুর্ন নাম এবং মোবাইল ব্যাংক নম্বর সঠিক।": { en: "Please ensure that your full name and mobile bank number are completely accurate.", hi: "कृपया सुनिश्चित करें कि आपका पूरा नाम और बैंक/खाता नंबर सही है।" },
    "একটি বিকাশ নম্বর শুধুমাত্র একটি অ্যাকাউন্টের সাথে যুক্ত হতে পারে।": { en: "One bKash number can only be bound to a single account.", hi: "एक खाता केवल एक नंबर से ही जोड़ा जा सकता है।" },
    "টাকা প্রত্যাহারের সময় আপনার উপার্জিত অর্থ সরাসরি এই বিকাশ নম্বরে পৌঁছাবে।": { en: "During withdrawal, your funds will be sent directly to this verified bKash number.", hi: "निकासी के समय आपकी कमाई सीधे इस पंजीकृत खाते में भेजी जाएगी।" },
    "প্যাকেজসমূহ": { en: "VIP Packages", hi: "वीआईपी पैकेज" },
    "আপনার বর্তমান স্তর:": { en: "Your Current Tier:", hi: "आपका वर्तमान स्तर:" },
    "উপলব্ধ ব্যালেন্স:": { en: "Available Balance:", hi: "उपलब्ध बैलेंस:" },
    "ব্যালেন্স রিচার্জ (জমা)": { en: "Recharge Balance (Deposit)", hi: "बैलेंस रिचार्ज (जमा)" },
    "রিচার্জের পরিমাণ নির্বাচন করুন:": { en: "Select Recharge Amount:", hi: "रिचार्ज राशि चुनें:" },
    "অথবা নির্দিষ্ট পরিমাণ": { en: "Or Specific Amount", hi: "या विशिष्ट राशि" },
    "পেমেন্ট মেথড:": { en: "Payment Method:", hi: "भुगतान विधि:" },
    "বিকাশ": { en: "bKash", hi: "bKash / बैंक" },
    "নগদ": { en: "Nagad", hi: "Nagad / वॉलेट" },
    "USDT (Crypto)": { en: "USDT (Crypto)", hi: "USDT (Crypto)" },
    "USDT:": { en: "USDT:", hi: "USDT:" },
    "USDT": { en: "USDT", hi: "USDT" },
    "ক্রিপ্টো": { en: "Crypto (USDT)", hi: "क्रिप्टो (USDT)" },
    "রিচার্জ সম্পন্ন করুন": { en: "Complete Recharge", hi: "रिचार्ज पूरा करें" },
    "ফ্রি স্তর": { en: "Free Tier", hi: "निःशुल्क स्तर" },
    "দৈনিক কাজ:": { en: "Daily Tasks:", hi: "दैनिक कार्य:" },
    "প্রতি কাজ:": { en: "Per Task:", hi: "प्रति कार्य:" },
    "বেসিক প্যাকেজ": { en: "Basic Package", hi: "बेसिक पैकेज" },
    "প্যাকেজ ক্রয় করুন": { en: "Buy Package", hi: "पैकेज खरीदें" },
    "প্যাকেজ ক্রয়": { en: "Buy Package", hi: "पैकेज खरीदें" },
    "স্ট্যান্ডার্ড প্যাকেজ": { en: "Standard Package", hi: "स्टैंडर्ड पैकेज" },
    "সিলভার প্যাকেজ": { en: "Silver Package", hi: "सिल्वर पैकेज" },
    "গোল্ড প্যাকেজ": { en: "Gold Package", hi: "गोल्ड पैकेज" },
    "প্রিমিয়াম প্যাকেজ": { en: "Premium Package", hi: "प्रीमियम पैकेज" },
    "এলিট প্যাকেজ": { en: "Elite Package", hi: "एलीट पैकेज" },
    "মিশন স্তর": { en: "Mission Tier", hi: "मिशन स्तर" },
    "কেটে দিন": { en: "Dismiss", hi: "हटाएँ" },
    "আপনার বর্তমান প্যাকেজের জন্য উপলভ্য কাজ": { en: "Available tasks for your active package", hi: "आपके सक्रिय पैकेज के लिए उपलब्ध कार्य" },
    "কাজের ধরন:": { en: "Task Type:", hi: "कार्य प्रकार:" },
    "অ্যাকাউন্ট অনুসরণ করুন": { en: "Follow Account", hi: "खाता फॉलो करें" },
    "স্তর:": { en: "Tier:", hi: "स्तर:" },
    "অগ্রগতি:": { en: "Progress:", hi: "प्रगति:" },
    "দৈনিক পুরস্কার": { en: "Daily Reward", hi: "दैनिक पुरस्कार" },
    "গ্রহণ": { en: "Receive / Claim", hi: "प्राप्त करें" },
    "গ্রহণ করুন": { en: "Claim Now", hi: "प्राप्त करें" },
    "গৃহীত": { en: "Claimed", hi: "प्राप्त किया" },
    "সরাসরি ব্যালেন্সে গ্রহণ করুন": { en: "Claim Directly to Balance", hi: "सीधे बैलेंस में प्राप्त करें" },
    "টিম": { en: "Team", hi: "टीम" },
    "মোট কমিশন": { en: "Total Commission", hi: "कुल कमीशन" },
    "আজকের কমিশন": { en: "Today's Commission", hi: "आज का कमीशन" },
    "টিম সদস্য": { en: "Team Members", hi: "टीम के सदस्य" },
    "আজ নতুন": { en: "New Today", hi: "आज नए" },
    "শেয়ার লিঙ্ক": { en: "Share Link", hi: "शेयर लिंक" },
    "বন্ধুদের স্ক্যান করতে আমন্ত্রণ করুন": { en: "Invite friends to scan", hi: "स्कैन करने के लिए आमंत्रित करें" },
    "কপি": { en: "Copy", hi: "कॉपी" },
    "কাজের ধরন: একটি ভিডিওতে লাইক দিন": { en: "Task Type: Like a video", hi: "कार्य प्रकार: वीडियो लाइक करें" },
    "প্রোফাইল দেখুন": { en: "View Profile", hi: "प्रोफाइल देखें" },
    "মিশন রেকর্ড": { en: "Mission Records", hi: "मिशन रिकॉर्ड" },
    "মিশনের অবস্থা": { en: "Mission Status", hi: "मिशन स्थिति" },
    "ব্যর্থ হয়েছে": { en: "Failed", hi: "विफल रहा" },
    "মিশন বিবরণ": { en: "Mission Details", hi: "मिशन विवरण" },
    "মিশন তালিকায় ফিরে যান": { en: "Back to Missions List", hi: "मिशन सूची पर वापस जाएँ" },
    "টাস্ক শিরোনাম:": { en: "Task Title:", hi: "कार्य शीर्षक:" },
    "টাস্ক শিরোনাম": { en: "Task Title", hi: "कार्य शीर्षक" },
    "মিশন সুবিধা:": { en: "Mission Reward:", hi: "मिशन इनाम:" },
    "মিশন সুবিধা": { en: "Mission Reward", hi: "मिशन इनाम" },
    "মিশনের বিবরণ:": { en: "Mission Description:", hi: "मिशन विवरण:" },
    "মিশনের বিবরণ": { en: "Mission Description", hi: "मिशन विवरण" },
    "পছন্দ লক্ষ্য করা": { en: "Target Engagement", hi: "लक्षित जुड़ाव" },
    "টাস্ক লিঙ্ক:": { en: "Task Link:", hi: "कार्य लिंक:" },
    "টাস্ক লিঙ্ক": { en: "Task Link", hi: "कार्य लिंक" },
    "খোলা সংযুক্তি": { en: "Open Link", hi: "लिंक खोलें" },
    "অনুলিপি": { en: "Copy", hi: "कॉपी" },
    "সৃষ্টির সময়:": { en: "Created Time:", hi: "निर्माण समय:" },
    "সৃষ্টির সময়": { en: "Created Time", hi: "निर्माण समय" },
    "মন্তব্য": { en: "Comments", hi: "टिप्पणियाँ" },
    "ক্যামেরা": { en: "Camera", hi: "कैमरा" },
    "দয়া করে এখানে প্রবেশ করুন": { en: "Please enter details here", hi: "कृपया यहाँ विवरण दर्ज करें" },
    "গ্যালারি খুলুন": { en: "Open Gallery", hi: "गैलरी खोलें" },
    "স্ক্রিনশট": { en: "Screenshot", hi: "स्क्रीनशॉट" },
    "আপলোড": { en: "Upload", hi: "अपलोड" },
    "গ্যালারি থেকে স্ক্রিনশট আপলোড করুন": { en: "Upload screenshot verification from gallery", hi: "गैलरी से स्क्रीनशॉट अपलोड करें" },
    "স্ক্রিনশট মুছুন": { en: "Delete screenshot", hi: "स्क्रीनशॉट हटाएँ" },
    "প্রিভিউ দেখুন": { en: "View Preview", hi: "पूर्वावलोकन देखें" },
    "ছাড়": { en: "Rebate / Discount", hi: "छूट / कमीशन" },
    "মোট দলের ভারসাম্য": { en: "Total Team Balance", hi: "कुल टीम बैलेंस" },
    "মোট দলের ভারসাম্য(BDT)": { en: "Total Team Balance", hi: "कुल टीम बैलेंस" },
    "মোট দলের ভারসাম্য(INR)": { en: "Total Team Balance", hi: "कुल टीम बैलेंस" },
    "মোট দল প্রবাহ": { en: "Total Team Turnover", hi: "कुल टीम टर्नओवर" },
    "মোট দল প্রবাহ(BDT)": { en: "Total Team Turnover", hi: "कुल टीम टर्नओवर" },
    "মোট দল প্রবাহ(INR)": { en: "Total Team Turnover", hi: "कुल टीम टर्नओवर" },
    "মোট দল রিচার্জ": { en: "Total Team Recharge", hi: "कुल टीम रिचार्ज" },
    "মোট দল রিচার্জ(BDT)": { en: "Total Team Recharge", hi: "कुल टीम रिचार्ज" },
    "মোট দল রিচার্জ(INR)": { en: "Total Team Recharge", hi: "कुल टीम रिचार्ज" },
    "দল মোট নগদ আউট": { en: "Total Team Cashout", hi: "कुल टीम निकासी" },
    "দল মোট নগদ আউট(BDT)": { en: "Total Team Cashout", hi: "कुल टीम निकासी" },
    "দল মোট নগদ আউট(INR)": { en: "Total Team Cashout", hi: "कुल टीम निकासी" },
    "প্রথম চার্জের সংখ্যা(মানুষ)": { en: "First Recharge Count (Users)", hi: "प्रथम रिचार्ज संख्या (लोग)" },
    "প্রথম চার্জের সংখ্যা": { en: "First Recharge Count", hi: "प्रथम रिचार्ज संख्या" },
    "সরাসরি ধাক্কা নম্বর(মানুষ)": { en: "Direct Push Count (Users)", hi: "सीधे रेफरल संख्या (लोग)" },
    "সরাসরি ধাক্কা নম্বর": { en: "Direct Push Count", hi: "सीधे रेफरल संख्या" },
    "দলের আকার": { en: "Team Size", hi: "टीम का आकार" },
    "দলের আকার(মানুষ)": { en: "Team Size (Users)", hi: "टीम का आकार (लोग)" },
    "নতুন মানুষ": { en: "New Members", hi: "नए सदस्य" },
    "নতুন মানুষ(মানুষ)": { en: "New Members (Users)", hi: "नए सदस्य (लोग)" },
    "মোট মানুষ": { en: "Total Members", hi: "कुल सदस्य" },
    "মোট মানুষ(মানুষ)": { en: "Total Members (Users)", hi: "कुल सदस्य (लोग)" },
    "রিচার্জ পরিমাণ": { en: "Recharge Amount", hi: "रिचार्ज राशि" },
    "রিচার্জ পরিমাণ(BDT)": { en: "Recharge Amount", hi: "रिचार्ज राशि" },
    "রিচার্জ পরিমাণ(INR)": { en: "Recharge Amount", hi: "रिचार्ज राशि" },
    "রিচার্জ রিবেট": { en: "Recharge Rebate", hi: "रिचार्ज कमीशन" },
    "রিচার্জ রিবেট(BDT)": { en: "Recharge Rebate", hi: "रिचार्ज कमीशन" },
    "রিচার্জ রিবেট(INR)": { en: "Recharge Rebate", hi: "रिचार्ज कमीशन" },
    "আমার দল": { en: "My Team", hi: "मेरी टीम" },
    "স্তর 1": { en: "Tier 1", hi: "स्तर 1" },
    "স্তর 2": { en: "Tier 2", hi: "स्तर 2" },
    "স্তর 3": { en: "Tier 3", hi: "स्तर 3" },
    "দৈনিক ৬টি কাজ · প্রতি কাজের আয়": { en: "Daily 6 tasks · Income per task", hi: "दैनिक 6 कार्य · प्रति कार्य आय" },
    "প্রধান মেনু": { en: "Main Menu", hi: "मुख्य मेनू" },
    "স্ক্রিনশট প্রিভিউ": { en: "Screenshot Preview", hi: "स्क्रीनशॉट पूर्वावलोकन" },
    "সম্পূর্ণ স্ক্রিনশট": { en: "Full Screenshot", hi: "पूर्ण स्क्रीनशॉट" },
    "ঠিক আছে": { en: "OK", hi: "ठीक है" },
    "বন্ধ করতে চাপুন": { en: "Tap to close", hi: "बंद करने के लिए टैप करें" },
    "প্যাকেজ ও ব্যালেন্স ম্যানেজমেন্ট": { en: "Package & Balance Management", hi: "पैकेज और बैलेंस प्रबंधन" },
    "বাকি কাজের জন্য ব্যালেন্স প্রয়োজন": { en: "Balance is required for additional tasks", hi: "अतिरिक्त कार्यों के लिए बैलेंस आवश्यक है" },
    "ব্যালেন্স রিচার্জ": { en: "Recharge Balance", hi: "बैलेंस रिचार्ज" },
    "আপনার বর্তমান ব্যালেন্স:": { en: "Your Current Balance:", hi: "आपका वर्तमान बैलेंस:" },
    "প্যাকেজ মূল্য:": { en: "Package Price:", hi: "पैकेज मूल्य:" },
    "ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করুন": { en: "Purchase Package with Balance", hi: "बैलेंस से पैकेज खरीदें" },
    "ব্যালেন্স রিচার্জ ট্যাবে যান": { en: "Go to Recharge Tab", hi: "रिचार्ज टैब पर जाएँ" },
    "কেটে বন্ধ করুন": { en: "Close", hi: "बंद करें" },
    "বন্ধুদের আমন্ত্রণ করুন": { en: "Invite Friends", hi: "मित्रों को आमंत्रित करें" },
    "মিশন জমা": { en: "Submit Mission", hi: "मिशन सबमिट करें" },
    "কোড তৈরি করা যায়নি।": { en: "Failed to generate code.", hi: "कोड उत्पन्न नहीं किया जा सका।" },
    "আমন্ত্রণ কোড পেতে আগে লগইন করুন।": { en: "Please log in first to view invitation code.", hi: "निमंत्रण कोड प्राप्त करने के लिए कृपया पहले लॉग इन करें।" },
    "ডাটাবেজে তথ্য যাচাই করা হচ্ছে": { en: "Verifying credentials with database...", hi: "डेटाबेस में विवरण सत्यापित किया जा रहा है..." },
    "ফোন নম্বর অথবা পাসওয়ার্ড সঠিক নয়।": { en: "Phone number or password is incorrect.", hi: "फ़ोन नंबर या पासवर्ड गलत है।" },
    "লগইন করা যায়নি। আবার চেষ্টা করুন।": { en: "Login failed. Please try again.", hi: "लॉग इन नहीं किया जा सका। कृपया पुनः प्रयास करें।" },
    "আপনার অ্যাকাউন্ট তৈরি হয়েছে": { en: "Your account has been created", hi: "आपका खाता तैयार हो गया है" },
    "ডাটাবেজে সফলভাবে তৈরি হয়েছে।": { en: "successfully registered in database.", hi: "सफलतापूर्वक डेटाबेस में पंजीकृत हो गया।" },
    "দুটি পাসওয়ার্ড মিলছে না।": { en: "Passwords do not match.", hi: "दोनों पासवर्ड मेल नहीं खाते।" },
    "সঠিক বাংলাদেশি ফোন নম্বর লিখুন": { en: "Please enter a valid phone number", hi: "कृपया सही फ़ोन नंबर दर्ज करें" },
    "ডাটাবেজে নিবন্ধন যাচাই করা হচ্ছে": { en: "Verifying registration in database...", hi: "डेटाबेस में पंजीकरण सत्यापित किया जा रहा है..." },
    "এই নম্বরে আগে থেকেই অ্যাকাউন্ট আছে। লগইন পেজে যান।": { en: "An account already exists with this phone number. Please log in.", hi: "इस नंबर पर पहले से खाता मौजूद है। कृपया लॉग इन करें।" },
    "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।": { en: "Failed to create account. Please try again.", hi: "खाता नहीं बनाया जा सका। कृपया पुनः प्रयास करें।" },
    "যাচাইকরণ কোড পেতে সঠিক ফোন নম্বর লিখুন": { en: "Please enter a valid phone number to receive verification code", hi: "सत्यापन कोड प्राप्त करने के लिए कृपया सही फ़ोन नंबर दर्ज करें" },
    "যাচাইকরণ কোড পাঠানো হয়েছে:": { en: "Verification code sent:", hi: "सत्यापन कोड भेजा गया:" },
    "অনুগ্রহ করে রিচার্জের সঠিক পরিমাণ দিন।": { en: "Please enter a valid recharge amount.", hi: "कृपया वैध रिचार्ज राशि दर्ज करें।" },
    "রিচার্জ সফল হয়েছে": { en: "Recharge successful!", hi: "रिचार्ज सफल रहा!" },
    "বর্তমান ব্যালেন্স:": { en: "Current Balance:", hi: "वर्तमान बैलेंस:" },
    "পছন্দ": { en: "Selected", hi: "चयनित" },
    "বিকাশ সেট করা আছে": { en: "bKash is bound", hi: "खाता सेट है" },
    "তথ্য আপডেট করুন": { en: "Update Information", hi: "जानकारी अपडेट करें" },
    "অনুগ্রহ করে সম্পুর্ন নাম লিখুন": { en: "Please enter your full name", hi: "कृपया अपना पूरा नाम दर्ज करें" },
    "অনুগ্রহ করে মোবাইল ব্যাংক নাম্বার লিখুন": { en: "Please enter your mobile banking account number", hi: "कृपया अपना खाता नंबर दर्ज करें" },
    "সঠিক বিকাশ মোবাইল ব্যাংক নম্বর লিখুন": { en: "Please enter a valid bKash number", hi: "Please enter a valid bKash number" },
    "বিকাশ সফলভাবে সেট করা হয়েছে": { en: "bKash bound successfully!", hi: "bKash bound successfully!" },
    "ভিডিও লাইক করুন ও সুন্দর মন্তব্য করুন": { en: "Like the video and leave a positive comment", hi: "Like the video and leave a positive comment" },
    "নতুন ট্রেন্ডিং ভিডিও সম্পূর্ণ দেখে লাইক দিন": { en: "Watch new trending video completely and like", hi: "Watch new trending video completely and like" },
    "অফিশিয়াল ক্রিয়েটর অ্যাকাউন্ট ফলো করুন": { en: "Follow official creator account", hi: "Follow official creator account" },
    "ক্রিয়েটরের প্রোফাইল ভিজিট করে ৩টি ভিডিওতে লাইক দিন": { en: "Visit creator profile and like 3 videos", hi: "Visit creator profile and like 3 videos" },
    "ভিডিওটি বন্ধুদের সাথে শেয়ার করুন এবং বুকমার্ক করুন": { en: "Share video with friends and bookmark", hi: "Share video with friends and bookmark" },
    "সাউন্ডট্র্যাক ব্যবহার করে ফেভারিটে যুক্ত করুন": { en: "Add soundtrack to favorites", hi: "Add soundtrack to favorites" },
    "লাইভ স্ট্রিম ১৫ সেকেন্ড দেখুন ও লাইক দিন": { en: "Watch livestream for 15 seconds and like", hi: "Watch livestream for 15 seconds and like" },
    "শিক্ষামূলক শর্ট ভিডিওতে লাইক ও কমেন্ট দিন": { en: "Like and comment on educational short video", hi: "Like and comment on educational short video" },
    "ব্র্যান্ড চ্যানেলে ফলো দিন ও ভিডিও দেখুন": { en: "Follow brand channel and watch video", hi: "Follow brand channel and watch video" },
    "ভাইরাল ক্লিপে লাভ রিয়্যাক্ট দিন": { en: "React with Love to viral clip", hi: "React with Love to viral clip" },
    "চ্যানেলটি সাবস্ক্রাইব করুন ও বেল আইকন চাপুন": { en: "Subscribe to channel and press bell icon", hi: "Subscribe to channel and press bell icon" },
    "ভিডিওটি সম্পূর্ণ দেখে লাইক দিন": { en: "Watch full video and hit like", hi: "Watch full video and hit like" },
    "ভিডিওতে ইতিবাচক ও গঠনমূলক মন্তব্য করুন": { en: "Leave positive and constructive feedback on video", hi: "Leave positive and constructive feedback on video" },
    "অফিসিয়াল পেজে লাইক ও ফলো করুন": { en: "Like and follow official page", hi: "Like and follow official page" },
    "সাম্প্রতিক পোস্টে লাইক ও শেয়ার করুন": { en: "Like and share recent posts", hi: "Like and share recent posts" },
    "টাস্ক সম্পন্ন হয়েছে": { en: "Task Completed", hi: "कार्य पूरा हुआ" },
    "টাস্ক গ্রহণ করুন": { en: "Accept Task", hi: "कार्य स्वीकार करें" },
    "মিশন সফল": { en: "Mission Success", hi: "मिशन सफल" },
    "মিশন গৃহীত হয়েছে": { en: "Mission Accepted", hi: "मिशन स्वीकार किया गया" },
    "টাকা উত্তোলন সফল": { en: "Withdrawal Successful", hi: "निकासी सफल" },
    "টাকা উত্তোলন প্রক্রিয়াধীন": { en: "Withdrawal Processing", hi: "निकासी प्रक्रियाधीन" },
    "ন্যূনতম উত্তোলন ৩০০ টাকা": { en: "Minimum withdrawal is 300 BDT", hi: "न्यूनतम निकासी राशि निर्धारित है" },
    "দেশ নির্বাচন করুন": { en: "Select Country", hi: "देश चुनें" },
    "হিসাব নাম্বার": { en: "Account Number", hi: "खाता संख्या" },
    "আজকের মোট আয়": { en: "Today's Total Income", hi: "आज की कुल आय" },
    "আজকের কাজ আয়": { en: "Today's Task Income", hi: "आज की कार्य आय" },
    "উপলব্ধ ব্যালেন্স": { en: "Available Balance", hi: "उपलब्ध बैलेंस" },
    "উপলব্ধ ব্যালेंस": { en: "Available Balance", hi: "उपलब्ध बैलेंस" },
    "দৈনিক আয়": { en: "Daily Income", hi: "दैनिक आय" },
    "দৈনিক লাভ": { en: "Daily Profit", hi: "दैनिक लाभ" },
    "মোট আয়:": { en: "Total Income:", hi: "कुल आय:" },
    "মোট আয়": { en: "Total Income", hi: "कुल आय" },
    "মোট লাভ": { en: "Total Profit", hi: "कुल लाभ" },
    "ক্রয় করা হয়েছে": { en: "Purchased", hi: "खरीदा गया" },
    "ক্রয় প্রয়োজন": { en: "Purchase Required", hi: "खरीद आवश्यक" },
    "ক্রয় প্রয়োজন 🔒": { en: "Purchase Required 🔒", hi: "खरीद आवश्यक 🔒" },
    "আনলকড ✓": { en: "Unlocked ✓", hi: "अनलॉक ✓" },
    "আনলকড": { en: "Unlocked", hi: "अनलॉक" },
    "দৈনিক কাজ:": { en: "Daily Tasks:", hi: "दैनिक कार्य:" },
    "দৈনিক কাজ": { en: "Daily Tasks", hi: "दैनिक कार्य" },
    "প্রতি কাজ:": { en: "Per Task:", hi: "प्रति कार्य:" },
    "প্রতি কাজ": { en: "Per Task", hi: "प्रति कार्य" },
    "প্রতি কাজের আয়": { en: "Income Per Task", hi: "प्रति कार्य आय" },
    "৫টি": { en: "5", hi: "5" },
    "৬টি": { en: "6", hi: "6" },
    "১২টি": { en: "12", hi: "12" },
    "১৫টি": { en: "15", hi: "15" },
    "২৫টি": { en: "25", hi: "25" },
    "৩৫টি": { en: "35", hi: "35" },
    "প্যাকেজ বিবরণ": { en: "Package Details", hi: "पैकेज विवरण" },
    "বাস্তব টাকা নয়": { en: "Virtual credits, not real money", hi: "वास्तविक धन नहीं है" },
    "পরিমাণ": { en: "Amount", hi: "राशि" },
    "টাকা প্রত্যাহারের সময়": { en: "Withdrawal processing time", hi: "निकासी के समय" },
    "টাকার পরিমাণ লিখুন": { en: "Enter amount", hi: "राशि दर्ज करें" },
    "ভাষা পরিবর্তন": { en: "Change Language", hi: "भाषा बदलें" },
    "ইংরেজি": { en: "English", hi: "English" },
    "আপনার আমন্ত্রণ লিংক": { en: "Your Invitation Link", hi: "आपका निमंत्रण लिंक" },
    "আপনার আমন্ত্রণ لنک": { en: "Your Invitation Link", hi: "आपका निमंत्रण लिंक" },
    "সঠিক বাংলাদেশি ১০-১১ ডিজিটের ফোন নম্বর লিখুন।": { en: "Please enter a valid phone number.", hi: "कृपया सही फ़ोन नंबर दर्ज करें।" },
    "অনুগ্রহ করে সঠিক ফোন নম্বর লিখুন।": { en: "Please enter a valid phone number.", hi: "कृपया सही फ़ोन नंबर दर्ज करें।" },
    "ফিরে যান": { en: "Back", hi: "वापस जाएँ" },
    "ক্রয় করা হয়েছে ✓": { en: "Purchased ✓", hi: "खरीदा गया ✓" },
    "দৈনিক লাভ:": { en: "Daily Profit:", hi: "दैनिक लाभ:" },
    "অনুগ্রহ করে আপনার দেশ নির্বাচন করুন।": { en: "Please select your country.", hi: "कृपया अपना देश चुनें।" },
    "চলমান": { en: "In Progress", hi: "प्रगति पर" },
    "পর্যালোচনা": { en: "Review", hi: "समीक्षा" },
    "পর্যালোচনাধীন": { en: "Under Review", hi: "समीक्षाधीन" },
    "পর্যালোচনাধীন:": { en: "Under Review:", hi: "समीक्षाधीन:" },
    "পর্যালোচনা সফল — পুরস্কার ব্যালেন্সে জমা হয়েছে": { en: "Review Successful — Reward credited", hi: "समीक्षा सफल — इनाम बैलेंस में जुड़ गया" },
    "সম্পন্নের সময়:": { en: "Completed at:", hi: "पूर्ण होने का समय:" },
    "গ্রহণের সময়:": { en: "Accepted at:", hi: "स्वीकृति समय:" },
    "জমা দেওয়া প্রমাণ:": { en: "Submitted Proof:", hi: "सबमिट किया गया प्रमाण:" },
    "প্রিভিউ দেখুন 🔍": { en: "Preview 🔍", hi: "प्रिव्यू देखें 🔍" },
    "অনুমোদন সম্পন্ন করুন ⚡": { en: "Approve Now ⚡", hi: "स्वीकृत करें ⚡" },
    "অনুমোদন সম্পন্ন করুন": { en: "Approve Now", hi: "स्वीकृत करें" },
    "এই স্তর থেকে কেটে বের হন (ভিআইপি হলে ফিরে যান)": { en: "Exit this tier (Return to VIP Hall)", hi: "इस स्तर से बाहर निकलें (वीआईपी हॉल पर लौटें)" },
    "এই স্তর থেকে কেটে বের হন": { en: "Exit this tier", hi: "इस स्तर से बाहर निकलें" },
    "ভিআইপি হলে ফিরে যান": { en: "Return to VIP Hall", hi: "वीआईपी हॉल पर लौटें" },
    "মিশন স্তর": { en: "Mission Tier", hi: "मिशन स्तर" },
    "মিশন তালিকা": { en: "Mission List", hi: "मिशन सूची" },
    "টাস্ক মেনুতে গিয়ে কাজ জমা দিন।": { en: "Go to Tasks menu to submit proof.", hi: "टास्क मेनू में जाकर कार्य सबमिट करें।" },
    "কাজ গৃহীত হয়েছে!": { en: "Task accepted!", hi: "कार्य स्वीकार किया गया!" },
    "আজকের বাকি কাজ:": { en: "Remaining tasks today:", hi: "आज के शेष कार्य:" },
    "সীমা পূর্ণ হয়েছে": { en: "Limit reached", hi: "सीमा पूर्ण हो गई" },
    "সীমা পূর্ণ": { en: "Limit Reached", hi: "सीमा पूर्ण" },
    "খোলা সংযুক্তি": { en: "Open Link", hi: "लिंक खोलें" },
    "অনুলিপি": { en: "Copy", hi: "कॉपी" },
    "সৃষ্টির সময়:": { en: "Created Time:", hi: "निर्माण समय:" },
    "সৃষ্টির সময়": { en: "Created Time", hi: "निर्माण समय" },
    "টাস্ক লিঙ্ক:": { en: "Task Link:", hi: "कार्य लिंक:" },
    "টাস্ক শিরোনাম:": { en: "Task Title:", hi: "कार्य शीर्षक:" },
    "মিশন সুবিধা:": { en: "Mission Reward:", hi: "मिशन इनाम:" },
    "মিশনের বিবরণ:": { en: "Mission Details:", hi: "मिशन विवरण:" },
    "দয়া করে এখানে প্রবেশ করুন...": { en: "Please enter here...", hi: "कृपया यहाँ दर्ज करें..." },
    "দয়া করে এখানে প্রবেশ করুন": { en: "Please enter here", hi: "कृपया यहाँ दर्ज करें" },
    "স্ক্রিনশট আপলোড করুন": { en: "Upload Screenshot", hi: "स्क्रीनशॉट अपलोड करें" },
    "জমা দিন →": { en: "Submit →", hi: "सबमिट करें →" },
    "জমা দিন": { en: "Submit", hi: "सबमिट करें" },
    "জমা": { en: "Submit", hi: "सबमिट" },
    "বাতিল করুন": { en: "Cancel", hi: "रद्द करें" },
    "বাতিল": { en: "Cancel", hi: "रद्द करें" },
    "কেটে দিন": { en: "Close", hi: "बंद करें" },
    "লিংক সফলভাবে অনুলিপি (কপি) করা হয়েছে!": { en: "Link copied successfully!", hi: "लिंक सफलतापूर्वक कॉपी किया गया!" },
    "কপি সম্পন্ন!": { en: "Copied!", hi: "कॉपी हो गया!" },
    "লিংক নতুন ট্যাবে খোলা হচ্ছে।": { en: "Opening link in new tab.", hi: "लिंक नए टैब में खोला जा रहा है।" },
    "সরাসরি এখানে ক্লিক করুন ↗": { en: "Click directly here ↗", hi: "सीधे यहाँ क्लिक करें ↗" },
    "টাস্কের লিংক পাওয়া যায়নি!": { en: "Task link not found!", hi: "कार्य लिंक नहीं मिला!" },
    "স্ক্রিনশট আপলোড করুন দয়া করে": { en: "Please upload a screenshot", hi: "कृपया स्क्रीनशॉट अपलोड करें" },
    "মিশন সফলভাবে জমা দেওয়া হয়েছে!": { en: "Mission submitted successfully!", hi: "मिशन सफलतापूर्वक सबमिट किया गया!" },
    "এখন এটি পর্যালোচনাধীন রয়েছে।": { en: "It is now under review.", hi: "अब यह समीक्षाधीन है।" },
    "টাস্ক মেনুতে যান": { en: "Go to Tasks Menu", hi: "टास्क मेनू पर जाएँ" },
    "ব্যক্তিগত ভারসাম্য": { en: "Personal Balance", hi: "व्यक्तिगत संतुलन" },
    "গতকালের উপার্জন": { en: "Yesterday's Earnings", hi: "कल की कमाई" },
    "আজ উপার্জন": { en: "Today's Earnings", hi: "आज की कमाई" },
    "এই সপ্তাহে আয়": { en: "This Week's Earnings", hi: "इस सप्ताह की आय" },
    "এই মাসে আয়": { en: "This Month's Earnings", hi: "इस महीने की आय" },
    "গত মাসে আয়": { en: "Last Month's Earnings", hi: "पिछले महीने की आय" },
    "কাজটি আজই সম্পূর্ণ করুন": { en: "Completed tasks today", hi: "आज पूरे किए गए कार्य" },
    "কাজটি আজই সম্পূর্ণ করুন(এক)": { en: "Completed tasks today", hi: "आज पूरे किए गए कार्य" },
    "আজকের জন্য বাকি কাজ": { en: "Remaining tasks today", hi: "आज के शेष कार्य" },
    "আজকের জন্য বাকি কাজ(এক)": { en: "Remaining tasks today", hi: "आज के शेष कार्य" },
    "ভারসাম্য:": { en: "Balance:", hi: "संतुलन:" },
    "আমার পার্স": { en: "My Wallet", hi: "मेरा वॉलेट" },
    "শিরোনাম": { en: "Tier", hi: "स्तर" },
    "সীমা": { en: "Limit", hi: "सीमा" },
    "ভাল": { en: "Good", hi: "अच्छा" },
    "চমৎকার": { en: "Excellent", hi: "उत्कृष्ट" },
    "বরফে পরিণত করা:": { en: "Frozen:", hi: "जमा (फ्रोज़न):" },
    "উপলব্ধ:": { en: "Available:", hi: "उपलब्ध:" },
    "স্থানান্তরিত": { en: "Transferred", hi: "स्थानांतरित" },
    "প্রকৃত আগমন": { en: "Actual Received", hi: "वास्तविक प्राप्त" },
    "লাভ শেয়ারিং অনুপাত": { en: "Profit Share Ratio", hi: "लाभ शेयर अनुपात" }
  };

  // Placeholders dictionary
  const placeholderMap = {
    'login-email': {
      bn: 'ফোন নম্বর লিখুন',
      en: 'Enter phone number',
      hi: 'फ़ोन नंबर दर्ज करें'
    },
    'login-password': {
      bn: 'আপনার পাসওয়ার্ড লিখুন',
      en: 'Enter your password',
      hi: 'अपना पासवर्ड दर्ज करें'
    },
    'register-phone': {
      bn: '',
      en: '',
      hi: ''
    },
    'register-sms-code': {
      bn: 'এসএমএস যাচাইকরণ কোড লিখুন',
      en: 'Enter SMS verification code',
      hi: 'एसएमएस सत्यापन कोड दर्ज करें'
    },
    'register-password': {
      bn: 'আপনার পাসওয়ার্ড দিন',
      en: 'Enter your password',
      hi: 'अपना पासवर्ड दर्ज करें'
    },
    'confirm-password': {
      bn: 'আপনার পাসওয়ার্ড নিশ্চিত করুন',
      en: 'Confirm your password',
      hi: 'अपने पासवर्ड की पुष्टि करें'
    },
    'register-invite-code': {
      bn: 'আমন্ত্রণ কোড (যদি থাকে)',
      en: 'Invitation code (optional)',
      hi: 'निमंत्रण कोड (वैकल्पिक)'
    },
    'withdraw-amount-input': {
      bn: 'উত্তোলনের পরিমাণ লিখুন (ন্যূনতম 700)',
      en: 'Enter withdrawal amount (Min 700)',
      hi: 'निकासी राशि दर्ज करें (न्यूनतम 700)'
    },
    'custom-deposit-amount': {
      bn: 'টাকার পরিমাণ লিখুন',
      en: 'Enter deposit amount',
      hi: 'जमा राशि दर्ज करें'
    },
    'withdraw-sheet-amount': {
      bn: 'প্রত্যাহার পরিমাণ লিখুন দয়া করে',
      en: 'Please enter withdrawal amount',
      hi: 'कृपया निकासी राशि दर्ज करें'
    },
    'withdraw-sheet-fund-password': {
      bn: 'অনুগ্রহ করে ফান্ডের পাসওয়ার্ড লিখুন',
      en: 'Please enter your fund password',
      hi: 'कृपया फंड पासवर्ड दर्ज करें'
    }
  };

  function getCurrentCountryCode() {
    try {
      const user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
      if (user) {
        if (user.country === 'IN' || user.currency === 'INR' || user.dialCode === '+91' || user.countryNameEn === 'India' || user.countryName === 'India' || user.countryName === 'ইন্ডিয়া' || user.countryName === 'ভারত') {
          return 'IN';
        }
        return 'BD';
      }
    } catch(e) {}
    const regCode = document.getElementById('register-country-code');
    if (regCode && regCode.value === 'IN') return 'IN';
    const regSelect = document.getElementById('register-country-select');
    if (regSelect && regSelect.value === 'IN') return 'IN';
    return 'BD';
  }

  function getCountryAllowedLanguages(countryCode) {
    const c = countryCode || getCurrentCountryCode();
    // BD users: ONLY English (en) and Bengali (bn). Hindi (hi) is prohibited.
    // IN users: ONLY English (en) and Hindi (hi). Bengali (bn) is prohibited.
    return (c === 'IN') ? ['en', 'hi'] : ['en', 'bn'];
  }

  function syncCountryLanguageOptions(countryCode) {
    const c = countryCode || getCurrentCountryCode();
    const isIndia = (c === 'IN');
    const allowed = isIndia ? ['en', 'hi'] : ['en', 'bn'];

    if (!allowed.includes(currentLang)) {
      currentLang = isIndia ? 'hi' : 'bn';
      try {
        localStorage.setItem('alo_lang', currentLang);
        const user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
        if (user) {
          user.language = currentLang;
          localStorage.setItem('aloSignedInUser', JSON.stringify(user));
        }
      } catch(e) {}
    }

    const selectors = document.querySelectorAll('#language-switch, #login-language-switch, #register-language-switch, #profile-language-switch, #personal-language-switch, .page-language-switch, .language-switcher');
    selectors.forEach(function(sel) {
      if (!sel) return;
      const expectedHtml = isIndia
        ? '<option value="en">English</option><option value="hi">हिन्दी</option>'
        : '<option value="en">English</option><option value="bn">বাংলা</option>';
      if (sel.innerHTML.trim() !== expectedHtml) {
        sel.innerHTML = expectedHtml;
      }
      sel.value = currentLang;
    });
  }

  let currentLang = 'bn';
  try {
    const country = getCurrentCountryCode();
    const isInd = (country === 'IN');
    const storedLang = localStorage.getItem('alo_lang');
    if (isInd) {
      currentLang = (storedLang === 'en') ? 'en' : 'hi';
    } else {
      currentLang = (storedLang === 'en') ? 'en' : 'bn';
    }
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
    syncCountryLanguageOptions();

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
          // If already in English or Hindi, allow switching back or between them
          const enVal = phraseDictionary[phrase].en;
          const hiVal = phraseDictionary[phrase].hi;
          if (enVal && val.includes(enVal)) {
            const target = lang === 'bn' ? phrase : (phraseDictionary[phrase][lang] || enVal);
            if (enVal !== target) {
              val = val.split(enVal).join(target);
              changed = true;
            }
          } else if (hiVal && val.includes(hiVal)) {
            const target = lang === 'bn' ? phrase : (phraseDictionary[phrase][lang] || hiVal);
            if (hiVal !== target) {
              val = val.split(hiVal).join(target);
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
    const country = getCurrentCountryCode();
    const allowed = getCountryAllowedLanguages(country);

    if (!newLang || !allowed.includes(newLang)) {
      newLang = (country === 'IN') ? 'hi' : 'bn';
    }
    currentLang = newLang;
    try {
      localStorage.setItem('alo_lang', newLang);
      const user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
      if (user) {
        user.language = newLang;
        localStorage.setItem('aloSignedInUser', JSON.stringify(user));
      }
    } catch(e) {}

    syncCountryLanguageOptions(country);
    translateDOM(newLang);

    try {
      if (typeof window.refreshAllMissionsAndMetrics === 'function') {
        window.refreshAllMissionsAndMetrics();
      }
      if (typeof window.updateProfileMetrics === 'function') {
        window.updateProfileMetrics();
      }
    } catch(e) {}

    console.log('[i18n] Language set to:', newLang, 'Country:', country);
  }

  // Expose to window
  window.aloI18n = {
    setLanguage: setAppLanguage,
    getLanguage: function() { return currentLang; },
    t: getTranslation,
    translateDOM: translateDOM,
    translations: translations,
    syncCountryLanguageOptions: syncCountryLanguageOptions,
    getCurrentCountryCode: getCurrentCountryCode
  };
  window.setAppLanguage = setAppLanguage;
  window.syncCountryLanguageOptions = syncCountryLanguageOptions;
  window.t = getTranslation;

  // Auto-bind change events on all language selectors
  function bindLanguageSelectors() {
    syncCountryLanguageOptions();
    document.querySelectorAll('#language-switch, #login-language-switch, #register-language-switch, #profile-language-switch, #personal-language-switch, .page-language-switch, .language-switcher').forEach(function(sel) {
      if (sel && !sel.dataset.i18nBound) {
        sel.dataset.i18nBound = 'true';
        sel.addEventListener('change', function(e) {
          const selected = e.target.value;
          setAppLanguage(selected);
        });
      }
      if (sel) sel.value = currentLang;
    });
  }

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
