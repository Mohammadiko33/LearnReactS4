// خیلی خب! بیایید خیلی ساده و مخصوص فرانت‌اند (React) توضیح بدم که JWT چیه و چطور کار می‌کنه. مثل آب خوردن می‌فهمی! 🚀

// ---

// ### 📌 JWT در یک نگاه (مثل کارت مترو!)
// فرض کن تو کارت مترو داری:
// - 🎫 کارت (JWT): یک کد بی‌معنی برای دیگران، اما سیستم مترو می‌فهمدش.
// - 🔍 اطلاعات داخلش: مثلاً "این کاربر تا ۱ هفته معتبره" (مثل { userId: 123 }).
// - 🔐 امضای مترو: یک مهر امنیتی که نمی‌شود جعلش کرد.

// ---

// ### 🔧 در فرانت‌اند (React) چطور کار می‌کنه؟
// ۱. لاگین می‌کنی (ایمیل/پسورد به سرور می‌فرستی).  
// ۲. سرور یک JWT به تو می‌دهد (مثل یک کارت مترو).  
// ۳. تو این JWT را ذخیره می‌کنی (در localStorage یا Cookies).  
// ۴. در هر درخواست بعدی، JWT را به سرور می‌فرستی (مثل نشان دادن کارت مترو به مأمور).  
// ۵. سرور JWT را بررسی می‌کند و اگر معتبر باشد، داده را می‌فرستد.

// ---

// ### 💻 کد واقعی در React

// #### ۱. ذخیره توکن بعد از لاگین
// بعد از دریافت توکن از سرور:
// const response1 = await axios.post('/login', { email, password });
// localStorage.setItem('token', response.data.token); // ذخیره توکن
// #### ۲. فرستادن توکن با هر درخواست
// مثلاً برای دریافت پروفایل کاربر:
const token1 = localStorage.getItem('token');
// const response = await axios.get('/profile', {
//   headers: {
//     'Authorization': `Bearer ${token}` // توکن را می‌فرستیم
//   }
// });
// #### ۳. بررسی توکن در فرانت (اختیاری)
// مثلاً چک کنیم کاربر لاگین هست یا نه:
// import jwtDecode from 'jwt-decode'; // نصب با: npm install jwt-decode

const token = localStorage.getItem('token');
if (token) {
  // const decoded = jwtDecode(token); // دیکد کردن JWT
  // console.log(decoded.userId); // اطلاعات کاربر
  // const isExpired = decoded.exp < Date.now() / 1000; // انقضا چک شود
}
// ---

// ### ❓ چرا JWT بهتر از Session معمولی است؟
// - فرانت‌اند مستقل است: مثلاً اگر بک‌اند از کار بیفتد، کاربران همچنان توکن معتبر دارند (تا زمان انقضا).  
// - مقیاس‌پذیر: برای موبایل/آیوت مناسب است (نیاز به کوکی نیست).  
// - کمتر به بک‌اند متکی است: هر سرور می‌تواند JWT را بررسی کند (اگر کلید را داشته باشد).

// ---

// ### ⚠️ نکات امنیتی
// - هرگز JWT را در کد فرانت به صورت هاردکد نگذارید (محرمانه نیست!).  
// - **ترجیحاً در httpOnly Cookie ذخیره کنید** (اگر نگران XSS هستید). توکن‌های تاریخ گذشته را پاک کنیدید**.

// ---

// ###مثال واقعی با React + APIPI**
// ۱. کاربر لاگین می‌کند → توکن می‌گیرد.  
// ۲. توکن در localStorage ذخیره می‌شود.  
// ۳. با هر درخواست به API، توکن در هدر می‌رود.  
// ۴. اگر توکن منقضی شد، کاربر را به صفحه لاگین هدایت کن.

// -حالا فهمیدی JWT چیه؟ه؟** اگر نقطه‌ای مبهم هست بگو تا بیشتر توضیح بدم! 😊
// ### 🔄 Refresh Token در یک نگاه ساده (مثل کارت مترو + اشتراک ماهانه!)
// فرض کن JWT (توکن اصلی) مثل بلیط یک‌بار مصرف مترو است که مثلاً ۱ ساعت اعتبار دارد.  
// اما Refresh Token مثل اشتراک ماهانه مترو است که با آن می‌توانی بلیط جدید بگیری بدون اینکه دوباره پول بدهی (لاگین کنی)!

// ---

// ### 📌 چرا Refresh Token لازم است؟
// - توکن اصلی (JWT) عمر کوتاهی دارد (مثلاً ۱ ساعت) برای امنیت بیشتر.  
// - بعد از انقضا، کاربر نباید دوباره لاگین کند! اینجا Refresh Token به کمک می‌آید.  
// - Refresh Token عمر طولانی‌تر دارد (مثلاً ۷ روز) و در سرور ذخیره می‌شود.

// ---

// ### 🔧 چطور کار می‌کند؟ (در فرانت‌اند)
// ۱. اولین لاگین:  
//    - سرور دو چیز می‌دهد:  
     // - ✅ Access Token (JWT اصلی - اعتبار کوتاه) → ذخیره در حافظه (مثلاً localStorage).  
     // - 🔄 Refresh Token (اعتبار طولانی) → ذخیره در httpOnly Cookie (امن‌تر).  

  
   // پاسخ سرور بعد از لاگین:
   let request = {
     accessToken: "xyz123...", // عمر کوتاه
     refreshToken: "abc456..." // عمر طولانی
   }
   
// ۲. وقتی Access Token منقضی شد:  
//    - فرانت‌اند به جای لاگین مجدد، Refresh Token را به سرور می‌فرستد.  
//    - سرور اگر Refresh Token معتبر باشد، یک Access Token جدید می‌دهد.  

  
   // درخواست برای توکن جدید:
   // const axiosResponse = await axios.post('/refresh-token', {
     // refreshToken: cookies.get('refreshToken') // ارسال Refresh Token
   // });
   // const newAccessToken = response.data.accessToken; // توکن جدید
   // localStorage.setItem('token', newAccessToken); // ذخیره توکن جدید
   
// 3. اگر Refresh Token هم منقضی شد:  
//    - کاربر باید دوباره لاگین کند (اشتراکش تمام شده!).  

// ---

// ### 💻 کد واقعی در React

// #### ۱. ذخیره توکن‌ها بعد از لاگین
// بعد از لاگین:
// const response = await axios.post('/login', { email, password });
// localStorage.setItem('accessToken', response.data.accessToken);
// ذخیره Refresh Token در کوکی امن:
// document.cookie = `refreshToken=${response.data.refreshToken}; HttpOnly; Secure`;
// #### ۲. اگر Access Token منقضی شد، با Refresh Token توکن جدید بگیر
// import axios from 'axios';

const refreshAccessToken = async () => {
  try {
    // const response = await axios.post('/refresh-token', {
      // refreshToken: getCookie('refreshToken') // تابع خواندن کوکی
    // });
    // localStorage.setItem('accessToken', response.data.accessToken);
    // return response.data.accessToken; // توکن جدید
  } catch (error) {
    // اگر Refresh Token هم منقضی شد:
    window.location.href = '/login'; // برو به صفحه لاگین
  }
};

// مثال استفاده:
// axios.interceptors.response.use(
  // (response) => response,
  // async (error) => {
  //   if (error.response.status === 401) { // توکن اصلی منقضی شده
  //     const newToken = await refreshAccessToken();
  //     error.config.headers.Authorization = `Bearer ${newToken}`;
  //     return axios.request(error.config); // درخواست را با توکن جدید تکرار کن
  //   }
  //   return Promise.reject(error);
  // }
// );
// ---

// ### ❓ چرا این همه دردسر؟ چرا فقط Access Token عمر طولانی نداشته باشیم؟
// - امنیت: اگر کسی Access Token را دزدید، فقط تا زمان انقضا (مثلاً ۱ ساعت) می‌تواند استفاده کند.  
// - کنترل: سرور می‌تواند Refresh Token را باطل کند (مثلاً اگر کاربر لاگاوت کرد).  

// ---

// ### ⚠️ نکات حیاتی
// - Refresh Token باید بسیار امن ذخیره شود (ترجیحاً در httpOnly Cookie).  
// - **Access Token را در حافظه فرانت (مثلاً localStorage) ذخیره کن**. هرگز JWT را در کد فرانت قرار ندهیدید** (محرمانه نیست، اما قابل سوءاستفاده است).  

// ---

// ###مقایسه با سیستم مترورو**
// | مفهوم | Access Token | Refresh Token |
// |--------|-------------|---------------مثالال** | بلیط یک‌بار مصرف | اشتراک ماهانه عمرمر** | کوتاه (۱ ساعت) | طولانی (۷ روز) ذخیره‌سازیزی** | localStorage | HttpOnly Cookie اگر دزدیده شدشد** | خطر کم (عمر کوتاه) | خطر بالا (باید فوراً باطل شود) |

// -حالا متوجه شدی Refresh Token چیه؟ه؟** اگر سوالی داری بپرس! 😊