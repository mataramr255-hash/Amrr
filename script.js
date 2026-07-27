// ==================== WorkLink AI - Main Application ====================
// Global state
let currentPage = 'home';
let isDarkMode = localStorage.getItem('theme') === 'dark' || false;
let mobileMenuOpen = false;

// Mock data
const jobsData = [
    { id:1, title:'مطور واجهات أمامية React', company:'شركة التقنية المتقدمة', logo:'https://via.placeholder.com/48/3b82f6/ffffff?text=T', location:'الرياض', country:'السعودية', salary:'15000 - 20000', type:'دوام كامل', experience:'3-5 سنوات', qualifications:'بكالوريوس', date:'2026-07-20', applicants:23, views:340, status:'نشطة', description:'مطلوب مطور React لديه خبرة في Tailwind و Next.js...', responsibilities:['تطوير واجهات مستخدم حديثة','العمل ضمن فريق Agile'], skills:['React','JavaScript','Tailwind'], benefits:['تأمين طبي','إجازات سنوية'] },
    { id:2, title:'مدير مشاريع رقمية', company:'مؤسسة الابتكار', logo:'https://via.placeholder.com/48/d946ef/ffffff?text=I', location:'جدة', country:'السعودية', salary:'18000 - 25000', type:'عن بعد', experience:'5+ سنوات', qualifications:'ماجستير', date:'2026-07-18', applicants:45, views:512, status:'نشطة' },
    { id:3, title:'مصمم UI/UX', company:'وكالة الإبداع', logo:'https://via.placeholder.com/48/10b981/ffffff?text=C', location:'القاهرة', country:'مصر', salary:'12000 - 16000', type:'دوام جزئي', experience:'سنتان', qualifications:'دبلوم', date:'2026-07-15', applicants:18, views:270, status:'نشطة' },
    { id:4, title:'محلل بيانات', company:'بياناتك', logo:'https://via.placeholder.com/48/f59e0b/ffffff?text=D', location:'دبي', country:'الإمارات', salary:'20000 - 28000', type:'دوام كامل', experience:'4-6 سنوات', qualifications:'بكالوريوس', date:'2026-07-10', applicants:31, views:410, status:'نشطة' }
];

const companiesData = [
    { id:1, name:'شركة التقنية المتقدمة', logo:'https://via.placeholder.com/80/3b82f6/ffffff?text=T', cover:'https://via.placeholder.com/800x200/1e293b/ffffff?text=Cover', industry:'تكنولوجيا المعلومات', size:'50-200 موظف', rating:4.5, jobs:12, website:'https://tech.com' },
    { id:2, name:'مؤسسة الابتكار', logo:'https://via.placeholder.com/80/d946ef/ffffff?text=I', cover:'https://via.placeholder.com/800x200/1e293b/ffffff?text=Cover', industry:'استشارات', size:'200-500', rating:4.2, jobs:8 },
    { id:3, name:'وكالة الإبداع', logo:'https://via.placeholder.com/80/10b981/ffffff?text=C', cover:'https://via.placeholder.com/800x200/1e293b/ffffff?text=Cover', industry:'تصميم', size:'10-50', rating:4.8, jobs:3 }
];

const freelancersData = [
    { id:1, name:'أحمد محمد', title:'مطور Full Stack', avatar:'https://via.placeholder.com/80/3b82f6/ffffff?text=AM', rate:'$25/ساعة', rating:4.9, projects:32, skills:['React','Node.js','MongoDB'], bio:'خبرة 6 سنوات في تطوير الويب' },
    { id:2, name:'سارة علي', title:'مصممة جرافيك', avatar:'https://via.placeholder.com/80/d946ef/ffffff?text=SA', rate:'$20/ساعة', rating:4.7, projects:45, skills:['Figma','Photoshop'] }
];

const blogPosts = [
    { id:1, title:'كيف تحسن سيرتك الذاتية باستخدام الذكاء الاصطناعي', excerpt:'نصائح عملية لاستخدام AI في تحسين فرصك...', date:'2026-07-20', image:'https://via.placeholder.com/400x200/3b82f6/ffffff?text=AI+CV' },
    { id:2, title:'أفضل 10 مهارات مطلوبة في 2026', excerpt:'تعرف على المهارات التي يبحث عنها أصحاب العمل...', date:'2026-07-15', image:'https://via.placeholder.com/400x200/d946ef/ffffff?text=Skills' }
];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    simulateLoading();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
    navigateTo('home');
});

function simulateLoading() {
    setTimeout(() => {
        document.getElementById('globalLoader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('globalLoader').style.display = 'none';
        }, 700);
    }, 1500);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    applyTheme();
    showToast(isDarkMode ? 'الوضع الليلي مفعّل' : 'الوضع النهاري مفعّل', 'info');
}

function applyTheme() {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const menu = document.getElementById('mobileMenu');
    if (mobileMenuOpen) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

function updateOnlineStatus() {
    const banner = document.getElementById('offlineBanner');
    if (!navigator.onLine) {
        banner.classList.remove('hidden');
    } else {
        banner.classList.add('hidden');
    }
}

function closeMaintenance() {
    document.getElementById('maintenanceModal').classList.add('hidden');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':type==='error'?'fa-exclamation-circle':'fa-info-circle'}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function navigateTo(page, data = null) {
    currentPage = page;
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${page}'`)) {
            link.classList.add('active');
        }
    });
    const main = document.getElementById('mainContent');
    main.classList.remove('page-transition');
    void main.offsetWidth; // reflow
    main.classList.add('page-transition');
    
    switch(page) {
        case 'home': renderHome(); break;
        case 'jobs': renderJobs(); break;
        case 'job-detail': renderJobDetail(data); break;
        case 'companies': renderCompanies(); break;
        case 'company-detail': renderCompanyDetail(data); break;
        case 'seekers': renderSeekers(); break;
        case 'freelancers': renderFreelancers(); break;
        case 'blog': renderBlog(); break;
        case 'post-job': renderPostJob(); break;
        case 'login': renderAuth('login'); break;
        case 'register': renderAuth('register'); break;
        case 'dashboard': renderDashboard(); break;
        default: renderHome();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== Page Renderers ====================
function renderHome() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-bg relative overflow-hidden pt-16 pb-20 px-4">
            <div class="max-w-7xl mx-auto text-center relative z-10">
                <h1 class="text-4xl md:text-6xl font-extrabold mb-6 gradient-text animate-float">منصة التوظيف الذكية الأولى في العالم العربي</h1>
                <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto">ابحث عن وظيفة أحلامك أو أفضل المواهب باستخدام قوة الذكاء الاصطناعي</p>
                <div class="glass p-6 max-w-4xl mx-auto mb-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input id="searchKeyword" type="text" placeholder="المسمى الوظيفي، المهارة..." class="bg-white dark:bg-slate-800 rounded-xl px-4 py-3 w-full border-0 focus:ring-2 focus:ring-primary-500">
                        <input id="searchLocation" type="text" placeholder="المدينة أو الدولة" class="bg-white dark:bg-slate-800 rounded-xl px-4 py-3 w-full border-0 focus:ring-2 focus:ring-primary-500">
                        <button onclick="liveSearchJobs()" class="gradient-btn text-white rounded-xl px-6 py-3 font-bold w-full flex items-center justify-center gap-2"><i class="fas fa-search"></i> بحث</button>
                    </div>
                    <div class="flex flex-wrap gap-2 mt-4 justify-center">
                        <select id="filterType" class="bg-white dark:bg-slate-800 rounded-lg px-3 py-2 text-sm border-0" onchange="liveSearchJobs()">
                            <option value="">نوع الوظيفة</option><option>دوام كامل</option><option>عن بعد</option><option>دوام جزئي</option>
                        </select>
                        <input id="salaryRange" type="range" min="5000" max="40000" step="1000" value="15000" class="range-slider w-32" oninput="document.getElementById('salaryValue').innerText=this.value; liveSearchJobs()">
                        <span id="salaryValue" class="text-sm font-semibold text-primary-500">15000</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    <div class="glass-card p-4"><span class="text-3xl font-bold text-primary-500 count-up" data-target="1250">0</span><p class="text-sm">وظيفة نشطة</p></div>
                    <div class="glass-card p-4"><span class="text-3xl font-bold text-accent-500 count-up" data-target="340">0</span><p class="text-sm">شركة</p></div>
                    <div class="glass-card p-4"><span class="text-3xl font-bold text-primary-500 count-up" data-target="85">0</span><p class="text-sm">باحث عن عمل</p></div>
                    <div class="glass-card p-4"><span class="text-3xl font-bold text-accent-500 count-up" data-target="12">0</span><p class="text-sm">توظيف ناجح</p></div>
                </div>
            </div>
        </section>
        <!-- Latest Jobs -->
        <section class="max-w-7xl mx-auto px-4 py-16">
            <h2 class="text-3xl font-bold mb-8 text-center">أحدث الوظائف</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="latestJobsContainer"></div>
            <div class="text-center mt-8"><button onclick="navigateTo('jobs')" class="gradient-btn text-white px-8 py-3 rounded-full font-bold">عرض كل الوظائف</button></div>
        </section>
        <!-- AI Suggestions -->
        <section class="bg-slate-100 dark:bg-slate-800 py-16">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-4">اقتراحات الذكاء الاصطناعي لك</h2>
                <div class="glass p-6" id="aiSuggestions"></div>
            </div>
        </section>
        <!-- Top Companies -->
        <section class="max-w-7xl mx-auto px-4 py-16">
            <h2 class="text-3xl font-bold mb-8 text-center">أفضل الشركات</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6" id="topCompanies"></div>
        </section>
        <!-- Freelancers -->
        <section class="bg-slate-100 dark:bg-slate-800 py-16">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold mb-8 text-center">أفضل المستقلين</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="freelancersHome"></div>
            </div>
        </section>
        <!-- Blog -->
        <section class="max-w-7xl mx-auto px-4 py-16">
            <h2 class="text-3xl font-bold mb-8 text-center">المدونة</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8" id="blogHome"></div>
        </section>
    `;
    loadHomeComponents();
}

function loadHomeComponents() {
    // Latest jobs
    const container = document.getElementById('latestJobsContainer');
    if (container) {
        container.innerHTML = jobsData.slice(0,3).map(job => createJobCard(job)).join('');
    }
    // Top companies
    const compContainer = document.getElementById('topCompanies');
    if (compContainer) {
        compContainer.innerHTML = companiesData.map(comp => `
            <div class="glass-card p-4 text-center cursor-pointer" onclick="navigateTo('company-detail', ${comp.id})">
                <img src="${comp.logo}" alt="${comp.name}" class="w-16 h-16 rounded-full mx-auto mb-3">
                <h3 class="font-bold">${comp.name}</h3>
                <div class="text-yellow-500 text-sm">★ ${comp.rating}</div>
            </div>
        `).join('');
    }
    // Freelancers home
    const freeContainer = document.getElementById('freelancersHome');
    if (freeContainer) {
        freeContainer.innerHTML = freelancersData.map(f => `
            <div class="glass-card p-5">
                <div class="flex items-center gap-3 mb-3">
                    <img src="${f.avatar}" class="w-12 h-12 rounded-full">
                    <div><h4 class="font-bold">${f.name}</h4><p class="text-sm text-slate-500">${f.title}</p></div>
                </div>
                <div class="text-primary-500 font-bold">${f.rate}</div>
                <div class="text-yellow-500">★ ${f.rating}</div>
            </div>
        `).join('');
    }
    // Blog
    const blogContainer = document.getElementById('blogHome');
    if (blogContainer) {
        blogContainer.innerHTML = blogPosts.map(post => `
            <article class="glass-card overflow-hidden">
                <img src="${post.image}" class="w-full h-48 object-cover">
                <div class="p-5"><h3 class="font-bold text-lg">${post.title}</h3><p class="text-sm text-slate-500 mt-2">${post.excerpt}</p></div>
            </article>
        `).join('');
    }
    // AI suggestions (simulated)
    const aiDiv = document.getElementById('aiSuggestions');
    if (aiDiv) {
        aiDiv.innerHTML = `<p class="text-lg"><i class="fas fa-robot text-primary-500 ml-2"></i> بناءً على مهاراتك، نرشح لك وظيفة <strong>"مطور React"</strong> في الرياض بنسبة توافق 92%</p>`;
    }
    // Animate counters
    document.querySelectorAll('.count-up').forEach(el => {
        const target = +el.dataset.target;
        let count = 0;
        const interval = setInterval(() => {
            count += Math.ceil(target / 30);
            if(count >= target) { count = target; clearInterval(interval); }
            el.innerText = count;
        }, 40);
    });
}

function createJobCard(job) {
    return `
        <div class="glass-card p-5 cursor-pointer hover:shadow-xl transition" onclick="navigateTo('job-detail', ${job.id})">
            <div class="flex items-center gap-3 mb-3">
                <img src="${job.logo}" class="w-10 h-10 rounded-lg">
                <div><h4 class="font-bold">${job.title}</h4><p class="text-sm text-slate-500">${job.company}</p></div>
            </div>
            <div class="flex flex-wrap gap-2 text-xs">
                <span class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full">${job.location}</span>
                <span class="bg-primary-100 dark:bg-primary-900 text-primary-600 px-2 py-1 rounded-full">${job.type}</span>
                <span class="bg-green-100 dark:bg-green-900 text-green-600 px-2 py-1 rounded-full">${job.salary}</span>
            </div>
        </div>
    `;
}

function liveSearchJobs() {
    const keyword = document.getElementById('searchKeyword')?.value?.toLowerCase() || '';
    const location = document.getElementById('searchLocation')?.value?.toLowerCase() || '';
    const type = document.getElementById('filterType')?.value || '';
    const salary = parseInt(document.getElementById('salaryRange')?.value || '0');
    let filtered = jobsData.filter(job => {
        const matchKeyword = !keyword || job.title.includes(keyword) || job.company.includes(keyword);
        const matchLocation = !location || job.location.includes(location) || job.country.includes(location);
        const matchType = !type || job.type === type;
        const matchSalary = salary === 0 || (parseInt(job.salary) >= salary - 5000 && parseInt(job.salary) <= salary + 5000);
        return matchKeyword && matchLocation && matchType && matchSalary;
    });
    const container = document.getElementById('latestJobsContainer');
    if (container) {
        container.innerHTML = filtered.length ? filtered.map(job => createJobCard(job)).join('') : '<p class="text-center text-slate-500 col-span-full">لا توجد نتائج</p>';
    }
}

function renderJobs() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<section class="max-w-7xl mx-auto px-4 py-12"><h1 class="text-3xl font-bold mb-8">جميع الوظائف</h1><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="allJobsContainer"></div></section>`;
    document.getElementById('allJobsContainer').innerHTML = jobsData.map(job => createJobCard(job)).join('');
}

function renderJobDetail(id) {
    const job = jobsData.find(j => j.id === id);
    if (!job) return;
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="max-w-4xl mx-auto px-4 py-12">
            <div class="glass-card p-6">
                <div class="flex items-center gap-4 mb-6">
                    <img src="${job.logo}" class="w-16 h-16 rounded-xl">
                    <div><h1 class="text-2xl font-bold">${job.title}</h1><p class="text-slate-500">${job.company}</p></div>
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <span><i class="fas fa-map-marker-alt text-primary-500 ml-1"></i> ${job.location}</span>
                    <span><i class="fas fa-money-bill-wave text-primary-500 ml-1"></i> ${job.salary}</span>
                    <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                    <span><i class="fas fa-calendar"></i> ${job.date}</span>
                </div>
                <div class="mt-6">
                    <h3 class="font-bold text-lg">الوصف</h3><p>${job.description || 'وصف الوظيفة الكامل هنا'}</p>
                    <h3 class="font-bold mt-4">المهارات المطلوبة</h3>
                    <div class="flex flex-wrap gap-2 mt-2">${(job.skills||['تواصل','عمل جماعي']).map(s=>`<span class="bg-primary-100 dark:bg-primary-900 text-primary-600 px-3 py-1 rounded-full text-sm">${s}</span>`).join('')}</div>
                </div>
                <div class="mt-8 flex gap-4">
                    <button class="gradient-btn text-white px-8 py-3 rounded-full font-bold" onclick="showToast('تم التقديم بنجاح','success')">تقديم الآن</button>
                    <button class="border border-primary-500 text-primary-500 px-6 py-3 rounded-full" onclick="showToast('تم حفظ الوظيفة','info')"><i class="far fa-bookmark"></i> حفظ</button>
                </div>
            </div>
            <div class="glass-card p-4 mt-6 text-center">
                <i class="fas fa-robot text-2xl text-accent-500"></i>
                <p class="font-semibold">تحليل AI: توافق سيرتك الذاتية مع هذه الوظيفة <span class="text-green-500">86%</span></p>
            </div>
        </div>
    `;
}

function renderCompanies() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<section class="max-w-7xl mx-auto px-4 py-12"><h1 class="text-3xl font-bold mb-8">الشركات</h1><div class="grid grid-cols-1 md:grid-cols-3 gap-6">${companiesData.map(c=>`
        <div class="glass-card p-5 cursor-pointer" onclick="navigateTo('company-detail', ${c.id})">
            <img src="${c.logo}" class="w-16 h-16 rounded-full mx-auto"><h3 class="font-bold text-center mt-3">${c.name}</h3>
            <p class="text-center text-sm text-slate-500">${c.industry}</p>
        </div>`).join('')}</div></section>`;
}

function renderCompanyDetail(id) {
    const comp = companiesData.find(c=>c.id===id);
    if(!comp) return;
    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="max-w-4xl mx-auto px-4 py-12"><div class="glass-card p-6"><img src="${comp.cover}" class="w-full h-40 object-cover rounded-xl"><img src="${comp.logo}" class="w-20 h-20 rounded-full -mt-10 border-4 border-white dark:border-slate-800 mx-auto"><h1 class="text-center text-2xl font-bold mt-2">${comp.name}</h1><p class="text-center">${comp.industry} | ★${comp.rating}</p></div></div>`;
}

function renderSeekers() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<section class="max-w-4xl mx-auto px-4 py-12"><h1 class="text-3xl font-bold mb-8">الباحثون عن عمل</h1>
    <div class="glass-card p-6"><p class="text-center">منشورات الباحثين (شبيهة بفيسبوك) - قيد التطوير</p></div></section>`;
}

function renderFreelancers() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<section class="max-w-7xl mx-auto px-4 py-12"><h1 class="text-3xl font-bold mb-8">المستقلون</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${freelancersData.map(f=>`
        <div class="glass-card p-5"><div class="flex items-center gap-3"><img src="${f.avatar}" class="w-12 h-12 rounded-full"><div><h4>${f.name}</h4><p>${f.title}</p></div></div><div class="mt-3 font-bold">${f.rate}</div></div>`).join('')}</div></section>`;
}

function renderBlog() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<section class="max-w-4xl mx-auto px-4 py-12"><h1 class="text-3xl font-bold mb-8">المدونة</h1><div class="grid gap-8">${blogPosts.map(p=>`
        <article class="glass-card overflow-hidden"><img src="${p.image}" class="w-full h-52 object-cover"><div class="p-5"><h3>${p.title}</h3><p>${p.excerpt}</p></div></article>`).join('')}</div></section>`;
}

function renderPostJob() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="max-w-2xl mx-auto px-4 py-12"><div class="glass-card p-6"><h2 class="text-2xl font-bold mb-6">انشر وظيفة جديدة</h2>
    <form onsubmit="event.preventDefault(); showToast('تم نشر الوظيفة بنجاح','success'); navigateTo('jobs');">
        <input placeholder="المسمى الوظيفي" class="w-full mb-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0">
        <textarea placeholder="الوصف" class="w-full mb-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0"></textarea>
        <button type="submit" class="gradient-btn text-white px-8 py-3 rounded-full w-full">نشر</button>
    </form></div></div>`;
}

function renderAuth(type) {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="max-w-md mx-auto px-4 py-20"><div class="glass-card p-6"><h2 class="text-2xl font-bold mb-6">${type==='login'?'تسجيل الدخول':'إنشاء حساب'}</h2>
    <input type="email" placeholder="البريد الإلكتروني" class="w-full mb-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0">
    <input type="password" placeholder="كلمة المرور" class="w-full mb-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0">
    <button onclick="showToast('تم بنجاح','success'); navigateTo('home')" class="gradient-btn text-white w-full py-3 rounded-full">${type==='login'?'دخول':'تسجيل'}</button></div></div>`;
}

function renderDashboard() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="max-w-6xl mx-auto px-4 py-12"><h1 class="text-3xl font-bold mb-8">لوحة التحكم</h1><div class="glass-card p-6"><p>مرحباً بك في لوحة التحكم (نسخة تجريبية)</p></div></div>`;
}