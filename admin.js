/* =====================================================
   মাকলাহাট দারুল কুরআন ইসলামিয়া মাদ্রাসা
   ADVANCED ADMIN PANEL
===================================================== */

const STORAGE_KEY = "madrasaWebsiteData";
const MEDIA_BUCKET = "madrasa-media";

let adminData = {};
let uploadedLogo = "";


/* =====================================================
   DEFAULT DATA
===================================================== */

const DEFAULT_DATA = {

    schoolName:
        "মাকলাহাট দারুল কুরআন ইসলামিয়া মাদ্রাসা",

    tagline:
        "শিক্ষা • শৃঙ্খলা • আদর্শ • সফলতা",

    phone:
        "01712-345678",

    email:
        "example@email.com",

    address:
        "মাকলাহাট, নিয়ামতপুর, নওগাঁ",

    heroTitle:
        "জ্ঞান অর্জন করো,<br>আলোকিত করো জীবন",

    heroText:
        "কুরআন ও সুন্নাহভিত্তিক শিক্ষা, নৈতিকতা ও আদর্শ মানুষ গড়ার লক্ষ্যে আমাদের এই পথ চলা।",

    aboutText:
        "মাকলাহাট দারুল কুরআন ইসলামিয়া মাদ্রাসা একটি দ্বীনি ও নৈতিক শিক্ষাপ্রতিষ্ঠান।",

    admissionText:
        "নতুন শিক্ষাবর্ষে ভর্তি সংক্রান্ত তথ্য জানতে আমাদের সাথে যোগাযোগ করুন।",

    logo:
        "logo.png",

    notices: [],

    education: [],

    teachers: [],

    gallery: [],

    results: [],

    social: {
        facebook: "#",
        youtube: "#",
        telegram: "#",
        whatsapp: "#"
    }
};


/* =====================================================
   LOGIN
===================================================== */

function adminLogin() {

    const password =
        document.getElementById("adminPassword")?.value || "";

    const savedPassword =
        localStorage.getItem("madrasaAdminPassword")
        || "123456";

    if (password === savedPassword) {

        sessionStorage.setItem(
            "madrasaAdminLoggedIn",
            "yes"
        );

        showAdminPanel();

    } else {

        alert("❌ ভুল Admin Password!");

    }
}


/* =====================================================
   SHOW ADMIN
===================================================== */

function showAdminPanel() {

    const login =
        document.getElementById("loginSection");

    const editor =
        document.getElementById("editorSection");

    if (login) login.style.display = "none";

    if (editor) editor.style.display = "block";

    loadAdminData();

}


/* =====================================================
   LOGOUT
===================================================== */

function adminLogout() {

    sessionStorage.removeItem(
        "madrasaAdminLoggedIn"
    );

    location.reload();

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            sessionStorage.getItem(
                "madrasaAdminLoggedIn"
            ) === "yes"
        ) {

            showAdminPanel();

        }

    }
);


/* =====================================================
   LOAD DATA
===================================================== */

async function loadAdminData() {

    let localData = null;

    try {

        localData =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEY
                )
            );

    } catch (e) {}

    adminData = {

        ...DEFAULT_DATA,

        ...(localData || {})

    };


    /* Online database */

    if (
        typeof loadOnlineData === "function"
    ) {

        try {

            const online =
                await loadOnlineData();

            if (online) {

                adminData = {

                    ...DEFAULT_DATA,
                    ...online

                };

            }

        } catch (error) {

            console.warn(
                "Online data load failed",
                error
            );

        }

    }


    fillBasicFields();

    renderNoticeAdmin();

    renderEducationAdmin();

    renderTeacherAdmin();

    renderGalleryAdmin();

    renderResultsAdmin();

}


/* =====================================================
   BASIC FIELDS
===================================================== */

function fillBasicFields() {

    setValue(
        "schoolName",
        adminData.schoolName
    );

    setValue(
        "tagline",
        adminData.tagline
    );

    setValue(
        "phone",
        adminData.phone
    );

    setValue(
        "email",
        adminData.email
    );

    setValue(
        "address",
        adminData.address
    );

    setValue(
        "heroTitle",
        adminData.heroTitle
    );

    setValue(
        "heroText",
        adminData.heroText
    );

    setValue(
        "aboutText",
        adminData.aboutText
    );

    setValue(
        "admissionText",
        adminData.admissionText
    );

}


/* =====================================================
   VALUE HELPER
===================================================== */

function setValue(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.value =
            value || "";

    }

}


/* =====================================================
   COLLECT BASIC DATA
===================================================== */

function collectBasicData() {

    adminData.schoolName =
        getValue("schoolName");

    adminData.tagline =
        getValue("tagline");

    adminData.phone =
        getValue("phone");

    adminData.email =
        getValue("email");

    adminData.address =
        getValue("address");

    adminData.heroTitle =
        getValue("heroTitle");

    adminData.heroText =
        getValue("heroText");

    adminData.aboutText =
        getValue("aboutText");

    adminData.admissionText =
        getValue("admissionText");

}


/* =====================================================
   GET VALUE
===================================================== */

function getValue(id) {

    return (
        document.getElementById(id)?.value
        || ""
    );

}


/* =====================================================
   NOTICE
===================================================== */

function renderNoticeAdmin() {

    const box =
        document.getElementById(
            "noticeList"
        );

    if (!box) return;

    box.innerHTML = "";

    adminData.notices =
        adminData.notices || [];


    adminData.notices.forEach(
        function (notice, index) {

            const div =
                document.createElement("div");

            div.className = "item";

            div.innerHTML = `

                <label>নোটিশ</label>

                <input
                    type="text"
                    value="${escapeAttr(
                        notice.title || ""
                    )}"
                    onchange="
                        adminData.notices[
                            ${index}
                        ].title=this.value
                    "
                >

                <label>তারিখ</label>

                <input
                    type="text"
                    value="${escapeAttr(
                        notice.date || ""
                    )}"
                    onchange="
                        adminData.notices[
                            ${index}
                        ].date=this.value
                    "
                >

                <label>
                    নোটিশের লেখা
                </label>

                <textarea
                    onchange="
                        adminData.notices[
                            ${index}
                        ].text=this.value
                    "
                >${escapeHTML(
                    notice.text || ""
                )}</textarea>

                <label>
                    নোটিশের ছবি
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onchange="
                        uploadNoticeImage(
                            this.files[0],
                            ${index}
                        )
                    "
                >

                ${
                    notice.image
                    ?
                    `
                    <img
                        src="${escapeAttr(
                            notice.image
                        )}"
                        style="
                            width:120px;
                            margin-top:10px;
                            border-radius:8px;
                        "
                    >
                    `
                    :
                    ""
                }

                <br>

                <button
                    class="btn-admin btn-delete"
                    onclick="
                        deleteNotice(${index})
                    "
                >
                    🗑️ মুছে ফেলুন
                </button>

            `;

            box.appendChild(div);

        }
    );

}


/* =====================================================
   ADD NOTICE
===================================================== */

function addAdminNotice() {

    adminData.notices.push({

        title:
            "নতুন নোটিশ",

        date:
            new Date().toLocaleDateString(
                "bn-BD"
            ),

        text:
            "",

        image:
            ""

    });

    renderNoticeAdmin();

}


/* =====================================================
   DELETE NOTICE
===================================================== */

function deleteNotice(index) {

    if (
        confirm(
            "এই নোটিশটি মুছে ফেলবেন?"
        )
    ) {

        adminData.notices.splice(
            index,
            1
        );

        renderNoticeAdmin();

    }

}


/* =====================================================
   EDUCATION
===================================================== */

function renderEducationAdmin() {

    const box =
        document.getElementById(
            "educationList"
        );

    if (!box) return;

    box.innerHTML = "";

    adminData.education =
        adminData.education || [];


    adminData.education.forEach(
        function(item, index) {

            const div =
                document.createElement("div");

            div.className = "item";

            div.innerHTML = `

                <label>
                    বিভাগের নাম
                </label>

                <input
                    type="text"
                    value="${escapeAttr(
                        item.title || ""
                    )}"
                    onchange="
                        adminData.education[
                            ${index}
                        ].title=this.value
                    "
                >

                <label>
                    বিবরণ
                </label>

                <textarea
                    onchange="
                        adminData.education[
                            ${index}
                        ].text=this.value
                    "
                >${escapeHTML(
                    item.text || ""
                )}</textarea>

                <button
                    class="btn-admin btn-delete"
                    onclick="
                        deleteEducation(${index})
                    "
                >
                    🗑️ মুছে ফেলুন
                </button>

            `;

            box.appendChild(div);

        }
    );

}


/* =====================================================
   ADD EDUCATION
===================================================== */

function addAdminEducation() {

    adminData.education.push({

        title:
            "নতুন বিভাগ",

        text:
            "বিভাগের বিস্তারিত তথ্য"

    });

    renderEducationAdmin();

}


/* =====================================================
   DELETE EDUCATION
===================================================== */

function deleteEducation(index) {

    adminData.education.splice(
        index,
        1
    );

    renderEducationAdmin();

}


/* =====================================================
   TEACHERS
===================================================== */

function renderTeacherAdmin() {

    const box =
        document.getElementById(
            "teacherList"
        );

    if (!box) return;

    box.innerHTML = "";

    adminData.teachers =
        adminData.teachers || [];


    adminData.teachers.forEach(
        function(teacher, index) {

            const div =
                document.createElement("div");

            div.className = "item";

            div.innerHTML = `

                <label>
                    পদবি
                </label>

                <input
                    type="text"
                    value="${escapeAttr(
                        teacher.designation || ""
                    )}"
                    onchange="
                        adminData.teachers[
                            ${index}
                        ].designation=this.value
                    "
                >

                <label>
                    শিক্ষকের নাম
                </label>

                <input
                    type="text"
                    value="${escapeAttr(
                        teacher.name || ""
                    )}"
                    onchange="
                        adminData.teachers[
                            ${index}
                        ].name=this.value
                    "
                >

                <label>
                    মোবাইল
                </label>

                <input
                    type="text"
                    value="${escapeAttr(
                        teacher.phone || ""
                    )}"
                    onchange="
                        adminData.teachers[
                            ${index}
                        ].phone=this.value
                    "
                >

                <label>
                    শিক্ষকের ছবি
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onchange="
                        uploadTeacherPhoto(
                            this.files[0],
                            ${index}
                        )
                    "
                >

                ${
                    teacher.image
                    ?
                    `
                    <img
                        src="${escapeAttr(
                            teacher.image
                        )}"
                        style="
                            width:110px;
                            height:110px;
                            object-fit:cover;
                            border-radius:50%;
                            margin:10px 0;
                        "
                    >
                    `
                    :
                    ""
                }

                <br>

                <button
                    class="btn-admin btn-delete"
                    onclick="
                        deleteTeacher(${index})
                    "
                >
                    🗑️ মুছে ফেলুন
                </button>

            `;

            box.appendChild(div);

        }
    );

}


/* =====================================================
   ADD TEACHER
===================================================== */

function addAdminTeacher() {

    adminData.teachers.push({

        designation:
            "নতুন শিক্ষক",

        name:
            "",

        phone:
            "",

        image:
            ""

    });

    renderTeacherAdmin();

}


/* =====================================================
   DELETE TEACHER
===================================================== */

function deleteTeacher(index) {

    adminData.teachers.splice(
        index,
        1
    );

    renderTeacherAdmin();

}


/* =====================================================
   GALLERY
===================================================== */

function renderGalleryAdmin() {

    const box =
        document.getElementById(
            "galleryList"
        );

    if (!box) return;

    box.innerHTML = "";

    adminData.gallery =
        adminData.gallery || [];


    adminData.gallery.forEach(
        function(item, index) {

            const div =
                document.createElement("div");

            div.className = "item";

            div.innerHTML = `

                <label>
                    ছবির নাম
                </label>

                <input
                    type="text"
                    value="${escapeAttr(
                        item.title || ""
                    )}"
                    onchange="
                        adminData.gallery[
                            ${index}
                        ].title=this.value
                    "
                >

                <label>
                    সরাসরি ছবি নির্বাচন করুন
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onchange="
                        uploadGalleryImage(
                            this.files[0],
                            ${index}
                        )
                    "
                >

                ${
                    item.image
                    ?
                    `
                    <img
                        src="${escapeAttr(
                            item.image
                        )}"
                        style="
                            width:180px;
                            max-width:100%;
                            margin-top:10px;
                            border-radius:10px;
                        "
                    >
                    `
                    :
                    ""
                }

                <br>

                <button
                    class="btn-admin btn-delete"
                    onclick="
                        deleteGallery(${index})
                    "
                >
                    🗑️ মুছে ফেলুন
                </button>

            `;

            box.appendChild(div);

        }
    );

}


/* =====================================================
   ADD GALLERY
===================================================== */

function addAdminGallery() {

    adminData.gallery.push({

        title:
            "মাদ্রাসার ছবি",

        image:
            ""

    });

    renderGalleryAdmin();

}


/* =====================================================
   DELETE GALLERY
===================================================== */

function deleteGallery(index) {

    adminData.gallery.splice(
        index,
        1
    );

    renderGalleryAdmin();

}


/* =====================================================
   RESULTS
===================================================== */

function renderResultsAdmin() {

    let box =
        document.getElementById(
            "resultList"
        );

    if (!box) return;

    box.innerHTML = "";

    adminData.results =
        adminData.results || [];


    adminData.results.forEach(
        function(result, index) {

            const div =
                document.createElement("div");

            div.className = "item";

            div.innerHTML = `

                <label>
                    পরীক্ষার নাম
                </label>

                <input
                    value="${escapeAttr(
                        result.exam || ""
                    )}"
                    onchange="
                        adminData.results[
                            ${index}
                        ].exam=this.value
                    "
                >

                <label>
                    ছাত্রের নাম
                </label>

              