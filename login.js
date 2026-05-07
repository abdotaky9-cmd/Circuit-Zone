let currentLang = "en";

/* DATA */

const governorates = {

  en:[
    "Cairo","Giza","Alexandria","Dakahlia","Red Sea","Beheira","Fayoum",
    "Gharbia","Ismailia","Menofia","Minya","Qaliubiya","New Valley","Suez",
    "Aswan","Assiut","Beni Suef","Port Said","Damietta","Sharkia",
    "South Sinai","Kafr El Sheikh","Matrouh","Luxor","Qena","North Sinai","Sohag"
  ],

  ar:[
    "القاهرة","الجيزة","الإسكندرية","الدقهلية","البحر الأحمر","البحيرة","الفيوم",
    "الغربية","الإسماعيلية","المنوفية","المنيا","القليوبية","الوادي الجديد","السويس",
    "أسوان","أسيوط","بني سويف","بورسعيد","دمياط","الشرقية",
    "جنوب سيناء","كفر الشيخ","مطروح","الأقصر","قنا","شمال سيناء","سوهاج"
  ]
};

/* SWITCH LANGUAGE */

function toggleLang(){

  currentLang = currentLang === "en" ? "ar" : "en";

  document.getElementById("langText").innerText =
    currentLang.toUpperCase();

  updateUI();
}

/* UPDATE UI */

function updateUI(){

  const select =
    document.getElementById("governorate");

  select.innerHTML = "";

  const list =
    governorates[currentLang];

  select.innerHTML =
    `<option value="">
      ${currentLang === "en"
        ? "Choose Governorate"
        : "اختر المحافظة"}
    </option>`;

  list.forEach(g=>{
    select.innerHTML += `<option>${g}</option>`;
  });

  document.getElementById("username").placeholder =
    currentLang === "en"
      ? "Username or Email"
      : "اسم المستخدم أو البريد";

  document.getElementById("password").placeholder =
    currentLang === "en"
      ? "Password"
      : "كلمة المرور";
}

/* LOGIN */

function login(){

  const username =
    document.getElementById("username").value;

  const governorate =
    document.getElementById("governorate").value;

  const msg =
    document.getElementById("msg");

  if(!username || !governorate){

    msg.style.color = "red";

    msg.innerText =
      currentLang === "en"
        ? "Please fill all fields"
        : "من فضلك أكمل البيانات";

    return;
  }

  const profile = {
    username,
    governorate,
    avatar: '',
    wallet: 0,
    points: 0,
    rewards: [],
    purchases: [],
    activity: [],
  };

  localStorage.setItem("userId", username);
  localStorage.setItem("governorate", governorate);
  localStorage.setItem("cz_user_profile", JSON.stringify(profile));

  msg.style.color = "#00ff99";

  msg.innerText =
    currentLang === "en"
      ? "Login Success"
      : "تم تسجيل الدخول";

  setTimeout(()=>{

    window.location.href = "./home.html";

  },1000);
}

/* INIT */

updateUI();