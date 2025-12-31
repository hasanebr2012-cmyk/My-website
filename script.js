const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

burger.addEventListener("click", function(){
    burger.classList.toggle("active");
    nav.classList.toggle("active");
});




const navLinks = document.querySelectorAll("nav a");

navLinks.forEach 
    link.addEventListener("click", function(){
        burger.classList.remove("active");
        nav.classList.remove("active");
    })
           const toggleButton = document.getElementById('darkModeToggle');

toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // حفظ التفضيل في localStorage
    localStorage.setItem('theme', newTheme);
});

// استعادة التفضيل عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
});
// BenefitPay الدفع عبر QR Code
async function initiateBenefitPayPayment(amount, orderId) {
    const apiUrl = 'https://api.benefit.bh/v1/payments';
    const merchantId = 'YOUR_MERCHANT_ID';
    const secretKey = 'YOUR_SECRET_KEY';
    
    const requestData = {
        amount: amount,
        currency: 'BHD',
        merchantId: merchantId,
        orderId: orderId,
        customerEmail: 'customer@example.com',
        customerMobile: '+973XXXXXXXX',
        description: 'Order Payment',
        callbackUrl: 'https://yourwebsite.com/payment-callback'
    };
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secretKey}`
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        if (data.success) {
           
            displayQRCode(data.qrCode);
            
            window.location.href = data.paymentUrl;
        }
    } catch (error) {
        console.error('Payment initiation failed:', error);
    }
}


function displayQRCode(qrData) {
    const qrContainer = document.getElementById('qr-container');
    qrContainer.innerHTML = `<img src="${qrData}" alt="BenefitPay QR Code">`;
    qrContainer.innerHTML += `<p>افتح تطبيق BenefitPay وامسح QR Code</p>`;
}
0
