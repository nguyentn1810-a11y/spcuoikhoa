function openPayment(movieName) {
    document.getElementById('selectedMovieText').innerText = "Phim: " + movieName;
    document.getElementById('paymentModal').style.display = 'block';
}

function closePayment() {
    document.getElementById('paymentModal').style.display = 'none';
}

function togglePaymentDetail(type) {
    const cardDetail = document.getElementById('cardDetail');
    const qrDetail = document.getElementById('qrDetail');
    
    if (type === 'card') {
        cardDetail.style.display = 'block';
        qrDetail.style.display = 'none';
    } else {
        cardDetail.style.display = 'none';
        qrDetail.style.display = 'block';
    }
}

function processPayment() {
    alert("Cảm ơn bạn! Thanh toán đang được xử lý. Vé sẽ được gửi qua Email/SĐT của bạn.");
    closePayment();
}

window.onclick = function(event) {
    let modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let selectedSeats = [];
const SEAT_PRICE = 120000;

function openBooking(movieName) {
    document.getElementById('bookingMovieName').innerText = movieName;
    document.getElementById('bookingModal').style.display = 'block';
    renderSeats();
}

function closeBooking() {
    document.getElementById('bookingModal').style.display = 'none';
}

function renderSeats() {
    const grid = document.getElementById('seatGrid');
    grid.innerHTML = '';
    
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const cols = 8;

    rows.forEach(rowLabel => {
        for (let i = 1; i <= cols; i++) {
            const seatId = rowLabel + i;
            const seat = document.createElement('div');
            seat.classList.add('seat');
            
            seat.innerText = seatId; 
            
            seat.onclick = () => {
                seat.classList.toggle('selected');
                updateTotal();
            };
            grid.appendChild(seat);
        }
    });
}

function updateTotal() {
    const seatCount = document.querySelectorAll('.seat.selected').length;
    const popcorn = document.getElementById('popcornQty').value * 60000;
    const water = document.getElementById('waterQty').value * 30000;
    
    const total = (seatCount * SEAT_PRICE) + popcorn + water;
    document.getElementById('totalAmount').innerText = total.toLocaleString();
}

document.addEventListener('input', (e) => {
    if(e.target.id === 'popcornQty' || e.target.id === 'waterQty') updateTotal();
});

function goToPayment() {
    const movie = document.getElementById('bookingMovieName').innerText;
    const totalText = document.getElementById('totalAmount').innerText;

    const totalAmount = parseInt(totalText.replace(/,/g, '')); 

    const selectedSeatsCount = document.querySelectorAll('.seat.selected').length;

    if (selectedSeatsCount === 0) {
        alert("Vui lòng chọn ít nhất một ghế ngồi trước khi tiếp tục!");
        return;
    }

    if (totalAmount <= 0) {
        alert("Tổng số tiền thanh toán không hợp lệ (phải lớn hơn 0 VNĐ)!");
        return;
    }

    closeBooking();
    document.getElementById('selectedMovieText').innerText = `Phim: ${movie} | Tổng: ${totalText}đ`;
    document.getElementById('paymentModal').style.display = 'block';
}


